"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { GroupWithMembers, Attendee, AttendeesResponse } from "@/types";
import { AuthenticatedAPIClient } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  UserPlus,
  UserMinus,
  Users,
  MessageSquare,
  Trash2,
} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import GroupRSVPForm from "./GroupRSVPForm";

interface GroupDetailsProps {
  group: GroupWithMembers | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGroupUpdated: () => void;
}

export default function GroupDetails({
  group,
  open,
  onOpenChange,
  onGroupUpdated,
}: GroupDetailsProps) {
  const [currentGroup, setCurrentGroup] = useState<GroupWithMembers | null>(
    group
  );
  const [availableAttendees, setAvailableAttendees] = useState<Attendee[]>([]);
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAttendees, setIsLoadingAttendees] = useState(false);
  const [showGroupRSVP, setShowGroupRSVP] = useState(false);
  const { getToken } = useAuth();

  const fetchAvailableAttendees = async () => {
    if (!currentGroup) return;

    setIsLoadingAttendees(true);
    try {
      const apiClient = new AuthenticatedAPIClient(getToken);

      // Fetch all attendees by paginating through all pages
      let allAttendees: Attendee[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        const response: AttendeesResponse = await apiClient.getAttendees(
          currentPage,
          100
        );
        allAttendees = [...allAttendees, ...response.attendees];

        // Check if there are more pages
        const totalPages = Math.ceil(response.total / 100);
        hasMorePages = currentPage < totalPages;
        currentPage++;
      }

      // Filter out attendees already in this group AND attendees already in other groups
      const currentMemberIds = (currentGroup.members || []).map(
        (member) => member.id
      );

      const available = allAttendees.filter((attendee) => {
        const notInCurrentGroup = !currentMemberIds.includes(attendee.id);
        const notInAnyGroup = !attendee.groupId;

        return notInCurrentGroup && notInAnyGroup;
      });

      setAvailableAttendees(available);
    } catch (error) {
      console.error("Error fetching available attendees:", error);
      toast.error("Failed to load available attendees");
    } finally {
      setIsLoadingAttendees(false);
    }
  };

  const refreshGroupData = async () => {
    if (!currentGroup) return;

    try {
      const apiClient = new AuthenticatedAPIClient(getToken);
      const updatedGroup = await apiClient.getGroup(currentGroup.id);
      setCurrentGroup(updatedGroup);
    } catch (error) {
      console.error("Error refreshing group data:", error);
      toast.error("Failed to refresh group data");
    }
  };

  useEffect(() => {
    setCurrentGroup(group);
  }, [group]);

  useEffect(() => {
    if (open && currentGroup) {
      fetchAvailableAttendees();
      setSelectedAttendees([]);
      setSelectedMembers([]);
    }
  }, [open, currentGroup]);

  const handleAddMembers = async () => {
    if (!currentGroup || selectedAttendees.length === 0) return;

    setIsLoading(true);
    try {
      const apiClient = new AuthenticatedAPIClient(getToken);

      await apiClient.addGroupMembers(currentGroup.id, selectedAttendees);
      toast.success(`Added ${selectedAttendees.length} member(s) to group`);

      // Refresh group data and available attendees
      await refreshGroupData();
      await fetchAvailableAttendees();

      onGroupUpdated();
      setSelectedAttendees([]);
    } catch (error: any) {
      console.error("Error adding members:", error);

      // Handle specific error for attendees already in other groups
      if (error?.message?.includes("already in other groups")) {
        toast.error(
          "Some attendees are already in other groups. Only attendees without group membership can be added."
        );
      } else {
        toast.error("Failed to add members to group");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!currentGroup) return;

    setIsLoading(true);
    try {
      const apiClient = new AuthenticatedAPIClient(getToken);

      await apiClient.removeGroupMembers(currentGroup.id, [memberId]);
      toast.success("Member removed from group");

      // Refresh group data and available attendees
      await refreshGroupData();
      await fetchAvailableAttendees();

      onGroupUpdated();
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member from group");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkRemoveMembers = async () => {
    if (!currentGroup || selectedMembers.length === 0) return;

    setIsLoading(true);
    try {
      const apiClient = new AuthenticatedAPIClient(getToken);

      await apiClient.removeGroupMembers(currentGroup.id, selectedMembers);
      toast.success(`Removed ${selectedMembers.length} member(s) from group`);

      // Refresh group data and available attendees
      await refreshGroupData();
      await fetchAvailableAttendees();

      onGroupUpdated();
      setSelectedMembers([]);
    } catch (error) {
      console.error("Error removing members:", error);
      toast.error("Failed to remove members from group");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttendeeSelection = (attendeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedAttendees((prev) => [...prev, attendeeId]);
    } else {
      setSelectedAttendees((prev) => prev.filter((id) => id !== attendeeId));
    }
  };

  const handleMemberSelection = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers((prev) => [...prev, memberId]);
    } else {
      setSelectedMembers((prev) => prev.filter((id) => id !== memberId));
    }
  };

  const handleSelectAllMembers = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(
        (currentGroup?.members || []).map((member) => member.id)
      );
    } else {
      setSelectedMembers([]);
    }
  };

  const handleSelectAllAttendees = (checked: boolean) => {
    if (checked) {
      setSelectedAttendees(availableAttendees.map((attendee) => attendee.id));
    } else {
      setSelectedAttendees([]);
    }
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

  if (!currentGroup) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className='!max-w-[60vw] w-full max-h-[90vh] overflow-hidden flex flex-col'
          style={{ maxWidth: "60vw" }}
        >
          <DialogHeader className='flex-shrink-0'>
            <DialogTitle className='flex items-center gap-2'>
              <Users className='h-5 w-5' />
              {currentGroup.name}
            </DialogTitle>
            <DialogDescription>
              Manage group members and view their RSVP statuses
            </DialogDescription>
          </DialogHeader>

          <div className='flex-1 overflow-y-auto space-y-6 pr-2'>
            {/* Group Actions */}
            <div className='flex gap-2'>
              <Button
                onClick={() => setShowGroupRSVP(true)}
                variant='default'
                size='sm'
              >
                <MessageSquare className='h-4 w-4 mr-2' />
                Group RSVP
              </Button>
            </div>

            {/* Current Members */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-lg flex items-center justify-between'>
                  Current Members ({(currentGroup.members || []).length})
                  {selectedMembers.length > 0 && (
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={handleBulkRemoveMembers}
                      disabled={isLoading}
                    >
                      <Trash2 className='h-4 w-4 mr-2' />
                      Remove Selected ({selectedMembers.length})
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-0'>
                {(currentGroup.members || []).length === 0 ? (
                  <p className='text-muted-foreground text-center py-8'>
                    No members in this group yet
                  </p>
                ) : (
                  <div className='border rounded-md overflow-x-auto'>
                    <Table className='table-auto min-w-full'>
                      <TableHeader>
                        <TableRow>
                          <TableHead className='w-12'>
                            <Checkbox
                              checked={
                                selectedMembers.length ===
                                (currentGroup.members || []).length
                              }
                              onCheckedChange={handleSelectAllMembers}
                            />
                          </TableHead>
                          <TableHead className='min-w-[120px]'>Name</TableHead>
                          <TableHead className='min-w-[180px]'>Email</TableHead>
                          <TableHead className='min-w-[100px]'>
                            RSVP Status
                          </TableHead>
                          <TableHead className='min-w-[80px] text-right'>
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(currentGroup.members || []).map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedMembers.includes(member.id)}
                                onCheckedChange={(checked) =>
                                  handleMemberSelection(
                                    member.id,
                                    checked as boolean
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell className='font-medium'>
                              {member.firstName} {member.lastName}
                            </TableCell>
                            <TableCell className='text-sm'>
                              {member.email || "N/A"}
                            </TableCell>
                            <TableCell>
                              {getRSVPStatusBadge(member.rsvpStatus)}
                            </TableCell>
                            <TableCell className='text-right'>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() => handleRemoveMember(member.id)}
                                disabled={isLoading}
                              >
                                <UserMinus className='h-4 w-4 mr-1' />
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Add Members */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-lg flex items-center justify-between'>
                  Add Members
                  {selectedAttendees.length > 0 && (
                    <Button
                      onClick={handleAddMembers}
                      disabled={isLoading}
                      size='sm'
                    >
                      <UserPlus className='h-4 w-4 mr-2' />
                      Add Selected ({selectedAttendees.length})
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-0'>
                {isLoadingAttendees ? (
                  <div className='flex items-center justify-center py-8'>
                    <LoadingSpinner />
                  </div>
                ) : availableAttendees.length === 0 ? (
                  <p className='text-muted-foreground text-center py-8'>
                    No available attendees to add
                  </p>
                ) : (
                  <div className='border rounded-md overflow-x-auto'>
                    <div className='max-h-80 overflow-y-auto'>
                      <Table className='table-auto min-w-full'>
                        <TableHeader className='sticky top-0 bg-background'>
                          <TableRow>
                            <TableHead className='w-12'>
                              <Checkbox
                                checked={
                                  selectedAttendees.length ===
                                  availableAttendees.length
                                }
                                onCheckedChange={handleSelectAllAttendees}
                              />
                            </TableHead>
                            <TableHead className='min-w-[120px]'>
                              Name
                            </TableHead>
                            <TableHead className='min-w-[180px]'>
                              Email
                            </TableHead>
                            <TableHead className='min-w-[100px]'>
                              RSVP Status
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {availableAttendees.map((attendee) => (
                            <TableRow key={attendee.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedAttendees.includes(
                                    attendee.id
                                  )}
                                  onCheckedChange={(checked) =>
                                    handleAttendeeSelection(
                                      attendee.id,
                                      checked as boolean
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell className='font-medium'>
                                {attendee.firstName} {attendee.lastName}
                              </TableCell>
                              <TableCell className='text-sm'>
                                {attendee.email || "N/A"}
                              </TableCell>
                              <TableCell>
                                {getRSVPStatusBadge(attendee.rsvpStatus)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <GroupRSVPForm
        group={currentGroup}
        open={showGroupRSVP}
        onOpenChange={setShowGroupRSVP}
        onSuccess={onGroupUpdated}
      />
    </>
  );
}
