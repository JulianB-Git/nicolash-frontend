"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingSpinner from "@/components/LoadingSpinner";
import { publicApiClient } from "@/lib/api";
import { Attendee, GroupWithMembers, GroupRSVPRequest } from "@/types";
import { GroupRSVPSchema, type GroupRSVPFormData } from "@/lib/validations";

interface GroupRSVPFormProps {
  attendee: Attendee; // The attendee who initiated the group RSVP
  onSuccess: (updatedGroup: GroupWithMembers) => void;
  onCancel: () => void;
}

export default function GroupRSVPForm({
  attendee,
  onSuccess,
  onCancel,
}: GroupRSVPFormProps) {
  const [group, setGroup] = useState<GroupWithMembers | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<GroupRSVPFormData>({
    resolver: zodResolver(GroupRSVPSchema),
    defaultValues: {
      responses: {},
    },
  });

  // Load group information
  useEffect(() => {
    const loadGroup = async () => {
      if (!attendee.groupId) {
        setError("This attendee is not part of a group");
        setIsLoading(false);
        return;
      }

      try {
        const groupData = await publicApiClient.getGroup(attendee.groupId);

        setGroup(groupData);

        // Set default values based on current RSVP statuses and dietary requirements
        const defaultResponses: Record<
          string,
          {
            status?: "accepted" | "declined";
            dietaryRequirements?: "Vegan" | "Vegetarian" | "Other" | "None";
          }
        > = {};
        groupData.members.forEach((member) => {
          // Initialize all members with their current values or defaults
          defaultResponses[member.id] = {
            status:
              member.rsvpStatus === "accepted" ||
              member.rsvpStatus === "declined"
                ? member.rsvpStatus
                : undefined,
            dietaryRequirements: member.dietaryRequirements || "None",
          };
        });
        form.reset({ responses: defaultResponses });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load group information",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadGroup();
  }, [attendee.groupId, form]);

  const onSubmit = async (data: GroupRSVPFormData) => {
    if (!group) return;

    console.log("Form data being submitted:", data);

    setIsSubmitting(true);
    setError(null);

    try {
      // Convert form data to API format - backend expects rsvpStatus, not status
      const groupRSVPRequest: GroupRSVPRequest = {
        responses: Object.entries(data.responses).map(
          ([attendeeId, responseData]) => ({
            attendeeId,
            rsvpStatus: responseData.status, // Backend expects rsvpStatus
            dietaryRequirements: responseData.dietaryRequirements || "None",
          }),
        ),
      };

      console.log("Submitting group RSVP request:", groupRSVPRequest);
      await publicApiClient.submitGroupRSVP(group.id, groupRSVPRequest);

      // Create updated group object for confirmation
      const updatedGroup: GroupWithMembers = {
        ...group,
        members: group.members.map((member) => ({
          ...member,
          rsvpStatus: data.responses[member.id]?.status || member.rsvpStatus,
          dietaryRequirements:
            data.responses[member.id]?.dietaryRequirements ||
            member.dietaryRequirements ||
            "None",
          updatedAt: new Date().toISOString(),
        })),
      };

      setIsSubmitted(true);
      onSuccess(updatedGroup);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit group RSVP",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='max-w-2xl mx-auto text-center py-12'>
        <div className='space-y-6'>
          <LoadingSpinner text='' />
          <p className='text-stone-500 font-light tracking-wide'>
            Loading group information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-lg mx-auto text-center space-y-6'>
        <div className='space-y-4'>
          <div className='flex justify-center'>
            <div className='w-12 h-px bg-stone-300'></div>
          </div>
          <p className='text-rose-600 font-light'>{error}</p>
        </div>
        <Button
          onClick={onCancel}
          variant='outline'
          className='px-8 py-3 border-stone-300 text-stone-600 hover:bg-stone-50 font-light tracking-wide rounded-full transition-all duration-200'
        >
          Back
        </Button>
      </div>
    );
  }

  if (!group) {
    return (
      <div className='max-w-lg mx-auto text-center space-y-6'>
        <div className='space-y-4'>
          <div className='flex justify-center'>
            <div className='w-12 h-px bg-stone-300'></div>
          </div>
          <p className='text-rose-600 font-light'>
            Group information not available
          </p>
        </div>
        <Button
          onClick={onCancel}
          variant='outline'
          className='px-8 py-3 border-stone-300 text-stone-600 hover:bg-stone-50 font-light tracking-wide rounded-full transition-all duration-200'
        >
          Back
        </Button>
      </div>
    );
  }

  if (isSubmitted) {
    const responses = form.getValues("responses");
    const acceptedCount = Object.values(responses).filter(
      (response) => response.status === "accepted",
    ).length;
    const declinedCount = Object.values(responses).filter(
      (response) => response.status === "declined",
    ).length;

    return (
      <div className='max-w-lg mx-auto text-center space-y-8'>
        <div className='space-y-6'>
          <div className='flex justify-center'>
            <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center'>
              <span className='text-2xl text-emerald-600'>✓</span>
            </div>
          </div>

          <div className='space-y-4'>
            <h2 className='text-3xl font-serif text-stone-800'>
              Group RSVP Submitted Successfully
            </h2>
            <div className='flex justify-center'>
              <div className='w-12 h-px bg-stone-300'></div>
            </div>
          </div>

          <div className='space-y-4 text-stone-600'>
            <p className='text-lg font-light'>
              Thank you! Your group RSVP for "{group.name}" has been updated.
            </p>
            <div className='text-stone-500 font-light space-y-1'>
              <p>
                <span className='font-medium'>Accepted:</span> {acceptedCount}{" "}
                member{acceptedCount !== 1 ? "s" : ""}
              </p>
              <p>
                <span className='font-medium'>Declined:</span> {declinedCount}{" "}
                member{declinedCount !== 1 ? "s" : ""}
              </p>
            </div>
            <p className='text-xs text-stone-400 font-light'>
              Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <Button
          onClick={onCancel}
          variant='outline'
          className='px-8 py-3 border-stone-300 text-stone-600 hover:bg-stone-50 font-light tracking-wide rounded-full transition-all duration-200'
        >
          Back to Search
        </Button>
      </div>
    );
  }

  return (
    <div className='max-w-3xl mx-auto space-y-8'>
      <div className='text-center space-y-4'>
        <h2 className='text-3xl font-serif text-stone-800'>
          Group RSVP for "{group.name}"
        </h2>
        <div className='flex justify-center'>
          <div className='w-12 h-px bg-stone-300'></div>
        </div>
        <p className='text-stone-600 font-light leading-relaxed max-w-lg mx-auto'>
          Please respond for each member of your group. You can set different
          responses for each person.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Form validation errors:", errors);
            setError("Please select an RSVP status for all members");
          })}
          className='space-y-8'
        >
          <div className='space-y-6'>
            {group.members.map((member) => (
              <div
                key={member.id}
                className='bg-white/80 backdrop-blur-sm border border-stone-200 rounded-xl p-6 space-y-6 shadow-sm'
              >
                <div className='text-center space-y-2'>
                  <h4 className='text-xl font-serif text-stone-800'>
                    {member.firstName} {member.lastName}
                  </h4>
                  <p className='text-sm text-stone-500 font-light'>
                    {member.email}
                  </p>
                  {member.rsvpStatus !== "pending" && (
                    <p className='text-xs text-stone-400 font-light'>
                      Current status:{" "}
                      <span className='capitalize font-medium'>
                        {member.rsvpStatus}
                      </span>
                    </p>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name={`responses.${member.id}.status`}
                  render={({ field }) => (
                    <FormItem className='space-y-4'>
                      <FormLabel className='text-stone-700 font-light text-center block'>
                        Will {member.firstName} be attending?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className='space-y-3'
                        >
                          <div className='flex items-center space-x-4 p-4 border-2 border-stone-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-200 cursor-pointer'>
                            <RadioGroupItem
                              value='accepted'
                              id={`${member.id}-accepted`}
                              className='border-emerald-400 text-emerald-600'
                            />
                            <Label
                              htmlFor={`${member.id}-accepted`}
                              className='flex-1 cursor-pointer'
                            >
                              <div className='font-light text-emerald-700'>
                                Yes, attending 🎉
                              </div>
                            </Label>
                          </div>
                          <div className='flex items-center space-x-4 p-4 border-2 border-stone-200 rounded-lg hover:border-rose-300 hover:bg-rose-50/50 transition-all duration-200 cursor-pointer'>
                            <RadioGroupItem
                              value='declined'
                              id={`${member.id}-declined`}
                              className='border-rose-400 text-rose-600'
                            />
                            <Label
                              htmlFor={`${member.id}-declined`}
                              className='flex-1 cursor-pointer'
                            >
                              <div className='font-light text-rose-700'>
                                Sorry, can't make it 😔
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`responses.${member.id}.dietaryRequirements`}
                  render={({ field }) => (
                    <FormItem className='space-y-4'>
                      <FormLabel className='text-stone-700 font-light text-center block'>
                        Dietary requirements for {member.firstName}?
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || "None"}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger className='w-full h-12 px-4 text-center text-base font-light bg-white border-stone-200 rounded-lg shadow-sm focus:border-stone-400 focus:ring-stone-400/20'>
                            <SelectValue placeholder='Select dietary requirements' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='None'>
                              <span className='font-light'>
                                No dietary requirements
                              </span>
                            </SelectItem>
                            <SelectItem value='Vegan'>
                              <span className='font-light'>Vegan 🌱</span>
                            </SelectItem>
                            <SelectItem value='Vegetarian'>
                              <span className='font-light'>Vegetarian 🥗</span>
                            </SelectItem>
                            <SelectItem value='Other'>
                              <span className='font-light'>
                                Other dietary needs
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          {error && (
            <div className='p-4 border border-rose-200 rounded-lg bg-rose-50 max-w-lg mx-auto'>
              <p className='text-rose-600 text-sm font-light text-center'>
                {error}
              </p>
            </div>
          )}

          <div className='flex gap-4 max-w-lg mx-auto'>
            <Button
              type='button'
              variant='outline'
              onClick={onCancel}
              disabled={isSubmitting}
              className='flex-1 py-3 border-stone-300 text-stone-600 hover:bg-stone-50 font-light tracking-wide rounded-full transition-all duration-200'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-white font-light tracking-wide rounded-full transition-all duration-200'
            >
              {isSubmitting ? (
                <div className='flex items-center gap-2'>
                  <LoadingSpinner size='sm' />
                  Submitting...
                </div>
              ) : (
                "Submit Group RSVP"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
