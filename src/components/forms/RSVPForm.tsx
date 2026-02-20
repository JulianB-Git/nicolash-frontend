"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import {
  RSVPSubmissionSchema,
  type RSVPSubmissionFormData,
} from "@/lib/validations";
import { publicApiClient } from "@/lib/api";
import { Attendee } from "@/types";
import { rsvpToasts } from "@/lib/toastUtils";

interface RSVPFormProps {
  attendee: Attendee;
  onSuccess: (updatedAttendee: Attendee) => void;
  onCancel: () => void;
}

export default function RSVPForm({
  attendee,
  onSuccess,
  onCancel,
}: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<RSVPSubmissionFormData>({
    resolver: zodResolver(RSVPSubmissionSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      status:
        attendee.rsvpStatus !== "pending" ? attendee.rsvpStatus : undefined,
      dietaryRequirements: attendee.dietaryRequirements || "None",
    },
  });

  const onSubmit = async (data: RSVPSubmissionFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await publicApiClient.submitRSVP(
        attendee.id,
        data.status,
        data.dietaryRequirements,
      );

      // Create updated attendee object for confirmation
      const updatedAttendee: Attendee = {
        ...attendee,
        rsvpStatus: data.status,
        dietaryRequirements: data.dietaryRequirements || "None",
        updatedAt: new Date().toISOString(),
      };

      setIsSubmitted(true);

      // Show success toast
      rsvpToasts.rsvpSubmitted(attendee.firstName, data.status);

      onSuccess(updatedAttendee);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit RSVP";
      setError(errorMessage);
      rsvpToasts.rsvpError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    const status = form.getValues("status");
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
              RSVP Submitted Successfully
            </h2>
            <div className='flex justify-center'>
              <div className='w-12 h-px bg-stone-300'></div>
            </div>
          </div>

          <div className='space-y-3 text-stone-600'>
            <p className='text-lg font-light'>
              Thank you, {attendee.firstName}! Your RSVP has been updated.
            </p>
            <p className='text-stone-500 font-light'>
              Status:{" "}
              <span className='font-medium capitalize'>
                {status === "accepted" ? "Accepted" : "Declined"}
              </span>
            </p>
            {form.getValues("dietaryRequirements") &&
              form.getValues("dietaryRequirements") !== "None" && (
                <p className='text-stone-500 font-light'>
                  Dietary Requirements:{" "}
                  <span className='font-medium'>
                    {form.getValues("dietaryRequirements")}
                  </span>
                </p>
              )}
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
    <div className='max-w-lg mx-auto space-y-8'>
      <div className='text-center space-y-4'>
        <h2 className='text-2xl font-serif text-stone-800'>
          RSVP for {attendee.firstName} {attendee.lastName}
        </h2>
        <div className='flex justify-center'>
          <div className='w-12 h-px bg-stone-300'></div>
        </div>
        <p className='text-stone-600 font-light leading-relaxed'>
          Please let us know if you&apos;ll be able to attend our wedding.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem className='space-y-6'>
                <FormLabel className='text-lg font-light text-stone-700 text-center block'>
                  Will you be attending?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Clear any previous errors when user makes a selection
                      if (error) setError(null);
                    }}
                    value={field.value}
                    className='space-y-4'
                  >
                    <div className='relative'>
                      <div className='flex items-center space-x-4 p-6 border-2 border-stone-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-200 cursor-pointer'>
                        <RadioGroupItem
                          value='accepted'
                          id='accepted'
                          className='border-emerald-400 text-emerald-600'
                        />
                        <Label
                          htmlFor='accepted'
                          className='flex-1 cursor-pointer'
                        >
                          <div className='space-y-1'>
                            <div className='text-lg font-light text-emerald-700'>
                              Yes, I&apos;ll be there! 🎉
                            </div>
                            <div className='text-sm text-stone-500 font-light'>
                              I&apos;m excited to celebrate with you
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>

                    <div className='relative'>
                      <div className='flex items-center space-x-4 p-6 border-2 border-stone-200 rounded-xl hover:border-rose-300 hover:bg-rose-50/50 transition-all duration-200 cursor-pointer'>
                        <RadioGroupItem
                          value='declined'
                          id='declined'
                          className='border-rose-400 text-rose-600'
                        />
                        <Label
                          htmlFor='declined'
                          className='flex-1 cursor-pointer'
                        >
                          <div className='space-y-1'>
                            <div className='text-lg font-light text-rose-700'>
                              Sorry, I can&apos;t make it 😔
                            </div>
                            <div className='text-sm text-stone-500 font-light'>
                              I&apos;ll be thinking of you on your special day
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='dietaryRequirements'
            render={({ field }) => (
              <FormItem className='space-y-4'>
                <FormLabel className='text-lg font-light text-stone-700 text-center block'>
                  Do you have any dietary requirements?
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className='w-full h-14 px-6 text-center text-base font-light bg-white/80 border-stone-200 rounded-full shadow-sm focus:border-stone-400 focus:ring-stone-400/20'>
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
                        <span className='font-light'>Other dietary needs</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div
              className='p-4 border border-rose-200 rounded-lg bg-rose-50'
              role='alert'
            >
              <p className='text-rose-600 text-sm font-light text-center'>
                {error}
              </p>
            </div>
          )}

          <div className='flex gap-4'>
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
              disabled={isSubmitting || !form.formState.isValid}
              className='flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-white font-light tracking-wide rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? (
                <div className='flex items-center gap-2'>
                  <LoadingSpinner size='sm' />
                  Submitting...
                </div>
              ) : (
                "Submit RSVP"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
