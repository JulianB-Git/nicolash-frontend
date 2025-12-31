"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuthenticatedApi } from "@/lib/useAuthenticatedApi";
import { AttendeeSchema, type AttendeeFormData } from "@/lib/validations";
import { Attendee, Group } from "@/types";
import { adminToasts } from "@/lib/toastUtils";

interface AttendeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attendee?: Attendee; // If provided, we're editing; if not, we're creating
  onSuccess: (attendee: Attendee) => void;
}

export default function AttendeeForm({
  open,
  onOpenChange,
  attendee,
  onSuccess,
}: AttendeeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);

  const { apiClient: api } = useAuthenticatedApi();
  const isEditing = !!attendee;

  const form = useForm<AttendeeFormData>({
    resolver: zodResolver(AttendeeSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      groupId: "none",
    },
  });

  // Load groups for the select dropdown
  const loadGroups = useCallback(async () => {
    try {
      setLoadingGroups(true);
      const groupsData = await api.getAllGroups();
      setGroups(groupsData);
    } catch (err) {
      console.error("Failed to load groups:", err);
      adminToasts.loadingError("groups");
    } finally {
      setLoadingGroups(false);
    }
  }, [api]);

  useEffect(() => {
    if (open) {
      loadGroups();
    }
  }, [open, loadGroups]);

  // Reset form when attendee changes or dialog opens
  useEffect(() => {
    if (open) {
      if (attendee) {
        form.reset({
          firstName: attendee.firstName,
          lastName: attendee.lastName,
          email: attendee.email,
          groupId: attendee.groupId || "none",
        });
      } else {
        form.reset({
          firstName: "",
          lastName: "",
          email: "",
          groupId: "none",
        });
      }
      setError(null);
    }
  }, [attendee, open, form]);

  // Clear server errors when user starts typing
  const handleInputChange = () => {
    if (error) {
      setError(null);
    }
  };

  const onSubmit = async (data: AttendeeFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      let result: Attendee;

      if (isEditing && attendee) {
        // Update existing attendee
        result = await api.updateAttendee(attendee.id, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email || undefined, // Convert empty string to undefined
          groupId: data.groupId === "none" ? "" : data.groupId,
        });
        console.log("Update attendee API response:", result);
        adminToasts.attendeeUpdated(
          `${result?.data?.firstName || result?.firstName || data.firstName} ${
            result?.data?.lastName || result?.lastName || data.lastName
          }`
        );
      } else {
        // Create new attendee
        result = await api.createAttendee({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email || undefined, // Convert empty string to undefined
          groupId: data.groupId === "none" ? undefined : data.groupId,
        });
        console.log("Create attendee API response:", result);
        adminToasts.attendeeCreated(
          `${result?.data?.firstName || result?.firstName || data.firstName} ${
            result?.data?.lastName || result?.lastName || data.lastName
          }`
        );
      }

      onSuccess(result);
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to save attendee:", err);

      let errorMessage = "Failed to save attendee";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      adminToasts.attendeeError(isEditing ? "update" : "create", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Attendee" : "Create New Attendee"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the attendee information below."
              : "Add a new attendee to the guest list."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='min-h-[80px]'>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter first name'
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange();
                        }}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem className='min-h-[80px]'>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter last name'
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange();
                        }}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='min-h-[80px]'>
                  <FormLabel>Email Address (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Enter email address (optional)'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange();
                      }}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='groupId'
              render={({ field }) => (
                <FormItem className='min-h-[80px]'>
                  <FormLabel>Group (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting || loadingGroups}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a group (optional)' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='none'>
                        No Group (Individual)
                      </SelectItem>
                      {Array.isArray(groups) &&
                        groups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {loadingGroups && (
                    <p className='text-sm text-muted-foreground'>
                      Loading groups...
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div
                className='p-3 border border-red-200 rounded-md bg-red-50'
                role='alert'
              >
                <p className='text-red-600 text-sm'>{error}</p>
              </div>
            )}

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? (
                  <div className='flex items-center gap-2'>
                    <LoadingSpinner size='sm' />
                    {isEditing ? "Updating..." : "Creating..."}
                  </div>
                ) : isEditing ? (
                  "Update Attendee"
                ) : (
                  "Create Attendee"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
