"use client";

import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GroupWithMembers, GroupRSVPRequest, RSVPStatus } from "@/types";
import { publicApiClient } from "@/lib/api";
import { toast } from "sonner";
import { Users, Check, X } from "lucide-react";

interface GroupRSVPFormProps {
  group: GroupWithMembers | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function GroupRSVPForm({
  group,
  open,
  onOpenChange,
  onSuccess,
}: GroupRSVPFormProps) {
  const [memberResponses, setMemberResponses] = useState<
    Record<string, RSVPStatus>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize member responses when group changes
  useState(() => {
    if (group) {
      const initialResponses: Record<string, RSVPStatus> = {};
      (group.members || []).forEach((member) => {
        initialResponses[member.id] = member.rsvpStatus;
      });
      setMemberResponses(initialResponses);
    }
  });

  const handleResponseChange = (memberId: string, status: RSVPStatus) => {
    setMemberResponses((prev) => ({
      ...prev,
      [memberId]: status,
    }));
  };

  const handleSubmitGroupRSVP = async () => {
    if (!group) return;

    setIsLoading(true);
    try {
      // Prepare the group RSVP request
      const responses = Object.entries(memberResponses)
        .filter(([_, status]) => status !== "pending") // Only submit non-pending responses
        .map(([attendeeId, rsvpStatus]) => ({
          attendeeId,
          rsvpStatus: rsvpStatus as "accepted" | "declined",
        }));

      if (responses.length === 0) {
        toast.error("Please select RSVP status for at least one member");
        return;
      }

      const groupRSVPRequest: GroupRSVPRequest = { responses };

      await publicApiClient.submitGroupRSVP(group.id, groupRSVPRequest);
      toast.success(`Group RSVP submitted for ${responses.length} member(s)`);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting group RSVP:", error);
      toast.error("Failed to submit group RSVP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkAction = (action: "accept" | "decline") => {
    const newResponses: Record<string, RSVPStatus> = {};
    (group?.members || []).forEach((member) => {
      newResponses[member.id] = action === "accept" ? "accepted" : "declined";
    });
    setMemberResponses(newResponses);
  };

  const getRSVPStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      accepted: "default",
      declined: "destructive",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  if (!group) return null;

  const hasChanges = (group.members || []).some(
    (member) =>
      memberResponses[member.id] &&
      memberResponses[member.id] !== member.rsvpStatus
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Users className='h-5 w-5' />
            Group RSVP - {group.name}
          </DialogTitle>
          <DialogDescription>
            Submit RSVP responses for all group members at once
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Bulk Actions */}
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handleBulkAction("accept")}
            >
              <Check className='h-4 w-4 mr-2' />
              Accept All
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handleBulkAction("decline")}
            >
              <X className='h-4 w-4 mr-2' />
              Decline All
            </Button>
          </div>

          {/* Members Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead>New Response</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(group.members || []).map((member) => (
                <TableRow key={member.id}>
                  <TableCell className='font-medium'>
                    {member.firstName} {member.lastName}
                  </TableCell>
                  <TableCell>{getRSVPStatusBadge(member.rsvpStatus)}</TableCell>
                  <TableCell>
                    <Select
                      value={memberResponses[member.id] || member.rsvpStatus}
                      onValueChange={(value: RSVPStatus) =>
                        handleResponseChange(member.id, value)
                      }
                    >
                      <SelectTrigger className='w-32'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='pending'>Pending</SelectItem>
                        <SelectItem value='accepted'>Accept</SelectItem>
                        <SelectItem value='declined'>Decline</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitGroupRSVP}
            disabled={isLoading || !hasChanges}
          >
            {isLoading ? "Submitting..." : "Submit Group RSVP"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
