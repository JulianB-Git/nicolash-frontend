"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { CreateGroupRequest, GroupWithMembers } from "@/types";
import { AuthenticatedAPIClient } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

const groupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
});

type GroupFormData = z.infer<typeof groupSchema>;

interface GroupFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (group: GroupWithMembers) => void;
  group?: GroupWithMembers;
}

export default function GroupForm({
  open,
  onOpenChange,
  onSuccess,
  group,
}: GroupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const form = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: group?.name || "",
    },
  });

  const onSubmit = async (data: GroupFormData) => {
    setIsLoading(true);
    try {
      const apiClient = new AuthenticatedAPIClient(getToken);
      const groupData: CreateGroupRequest = {
        name: data.name,
      };

      const newGroup = await apiClient.createGroup(groupData);
      toast.success("Group created successfully");
      onSuccess(newGroup);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create group");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{group ? "Edit Group" : "Create New Group"}</DialogTitle>
          <DialogDescription>
            {group
              ? "Update the group information."
              : "Create a new group for managing related attendees."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., Smith Family, College Friends'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? "Creating..." : group ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
