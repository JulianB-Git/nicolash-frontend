"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { Group, GroupWithMembers } from "@/types";
import { AuthenticatedAPIClient } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Eye, Users, Trash2 } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ConfirmDialog from "./ConfirmDialog";

interface GroupListProps {
  onViewGroup: (group: GroupWithMembers) => void;
  refreshTrigger?: number;
}

export default function GroupList({
  onViewGroup,
  refreshTrigger,
}: GroupListProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingGroupId, setDeletingGroupId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingGroup, setDeletingGroup] = useState<Group | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { getToken } = useAuth();

  const fetchGroups = async () => {
    setIsLoading(true);
    try {
      const apiClient = new AuthenticatedAPIClient(getToken);
      const groupsData = await apiClient.getAllGroups();
      setGroups(groupsData);
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("Failed to load groups");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [refreshTrigger]);

  const handleViewGroup = async (groupId: string) => {
    try {
      const apiClient = new AuthenticatedAPIClient(getToken);
      const groupWithMembers = await apiClient.getGroup(groupId);
      onViewGroup(groupWithMembers);
    } catch (error) {
      console.error("Error fetching group details:", error);
      toast.error("Failed to load group details");
    }
  };

  const handleDeleteGroup = (group: Group) => {
    setDeletingGroup(group);
    setShowDeleteDialog(true);
  };

  const confirmDeleteGroup = async () => {
    if (!deletingGroup) return;

    try {
      setIsDeleting(true);
      setDeletingGroupId(deletingGroup.id);
      const apiClient = new AuthenticatedAPIClient(getToken);
      await apiClient.deleteGroup(deletingGroup.id);
      toast.success("Group deleted successfully");
      fetchGroups(); // Refresh the list
      setShowDeleteDialog(false);
      setDeletingGroup(null);
    } catch (error) {
      console.error("Error deleting group:", error);
      toast.error("Failed to delete group");
    } finally {
      setIsDeleting(false);
      setDeletingGroupId(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-8'>
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  if (groups.length === 0) {
    return (
      <Card>
        <CardContent className='text-center py-8'>
          <Users className='mx-auto h-12 w-12 text-muted-foreground mb-4' />
          <p className='text-muted-foreground'>No groups found</p>
          <p className='text-sm text-muted-foreground mt-2'>
            Create your first group to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Groups ({groups.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className='font-medium'>{group.name}</TableCell>
                <TableCell>
                  <Badge variant='secondary'>
                    {group.members?.length || 0} members
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(group.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex gap-2 justify-end'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleViewGroup(group.id)}
                    >
                      <Eye className='h-4 w-4 mr-2' />
                      View
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleDeleteGroup(group)}
                      disabled={deletingGroupId === group.id}
                      className='text-destructive hover:text-destructive'
                    >
                      <Trash2 className='h-4 w-4 mr-2' />
                      {deletingGroupId === group.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title='Delete Group'
        description={
          deletingGroup
            ? `Are you sure you want to delete the group "${deletingGroup.name}"? This will remove all member associations and cannot be undone.`
            : "Are you sure you want to delete this group?"
        }
        confirmText='Delete'
        cancelText='Cancel'
        onConfirm={confirmDeleteGroup}
        isLoading={isDeleting}
        variant='destructive'
      />
    </Card>
  );
}
