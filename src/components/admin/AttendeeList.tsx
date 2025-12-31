"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthenticatedApi } from "@/lib/useAuthenticatedApi";
import { Attendee, AttendeesResponse } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import AttendeeForm from "./AttendeeForm";
import ConfirmDialog from "./ConfirmDialog";
import { adminToasts } from "@/lib/toastUtils";

interface AttendeeListProps {
  className?: string;
}

export default function AttendeeList({ className }: AttendeeListProps) {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  // Form and dialog states
  const [showAttendeeForm, setShowAttendeeForm] = useState(false);
  const [editingAttendee, setEditingAttendee] = useState<Attendee | undefined>(
    undefined
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingAttendee, setDeletingAttendee] = useState<
    Attendee | undefined
  >(undefined);
  const [isDeleting, setIsDeleting] = useState(false);

  const { apiClient: api } = useAuthenticatedApi();

  const fetchAttendees = useCallback(
    async (page: number, limit: number) => {
      try {
        setLoading(true);
        setError(null);

        const response: AttendeesResponse = await api.getAttendees(page, limit);

        setAttendees(response.attendees);
        setTotalAttendees(response.total);
        setCurrentPage(response.page);
        setTotalPages(Math.ceil(response.total / limit));
      } catch (err) {
        console.error("Failed to fetch attendees:", err);
        const errorMessage = "Failed to load attendees. Please try again.";
        setError(errorMessage);
        adminToasts.loadingError("attendees");
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  useEffect(() => {
    fetchAttendees(currentPage, pageSize);
  }, [currentPage, pageSize, fetchAttendees]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "accepted":
        return "default"; // Green
      case "declined":
        return "destructive"; // Red
      case "pending":
        return "secondary"; // Gray
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // CRUD operation handlers
  const handleCreateAttendee = () => {
    setEditingAttendee(undefined);
    setShowAttendeeForm(true);
  };

  const handleEditAttendee = (attendee: Attendee) => {
    setEditingAttendee(attendee);
    setShowAttendeeForm(true);
  };

  const handleDeleteAttendee = (attendee: Attendee) => {
    setDeletingAttendee(attendee);
    setShowDeleteDialog(true);
  };

  const handleAttendeeFormSuccess = (attendee: Attendee) => {
    // Refresh the attendee list to show the updated data
    fetchAttendees(currentPage, pageSize);
  };

  const confirmDeleteAttendee = async () => {
    if (!deletingAttendee) return;

    try {
      setIsDeleting(true);
      await api.deleteAttendee(deletingAttendee.id);

      // Refresh the attendee list
      await fetchAttendees(currentPage, pageSize);

      adminToasts.attendeeDeleted(
        `${deletingAttendee.firstName} ${deletingAttendee.lastName}`
      );
      setShowDeleteDialog(false);
      setDeletingAttendee(undefined);
    } catch (err) {
      console.error("Failed to delete attendee:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete attendee";
      adminToasts.attendeeError("delete", errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Users className='h-5 w-5' />
            Attendees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex space-x-4 animate-pulse'>
                <div className='h-4 bg-muted rounded w-32' />
                <div className='h-4 bg-muted rounded w-48' />
                <div className='h-4 bg-muted rounded w-24' />
                <div className='h-4 bg-muted rounded w-20' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className='pt-6'>
          <div className='text-center'>
            <p className='text-destructive text-sm mb-4'>{error}</p>
            <Button
              onClick={() => fetchAttendees(currentPage, pageSize)}
              variant='outline'
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <Users className='h-5 w-5' />
            Attendees ({totalAttendees})
          </CardTitle>

          <div className='flex items-center gap-4'>
            {/* Create Attendee Button */}
            <Button onClick={handleCreateAttendee} size='sm'>
              <Plus className='h-4 w-4 mr-2' />
              Add Attendee
            </Button>

            {/* Page Size Selector */}
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>Show:</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className='border rounded px-2 py-1 text-sm'
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {attendees?.length === 0 ? (
          <div className='text-center py-8'>
            <Users className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
            <p className='text-muted-foreground'>No attendees found.</p>
          </div>
        ) : (
          <>
            {/* Attendees Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees?.map((attendee) => (
                  <TableRow key={attendee.id}>
                    <TableCell className='font-medium'>
                      {attendee.firstName} {attendee.lastName}
                    </TableCell>
                    <TableCell>{attendee.email || "No email"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(attendee.rsvpStatus)}
                      >
                        {attendee.rsvpStatus.charAt(0).toUpperCase() +
                          attendee.rsvpStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {attendee.groupId ? (
                        <span className='text-sm text-muted-foreground'>
                          Group {attendee.groupId.slice(-8)}
                        </span>
                      ) : (
                        <span className='text-sm text-muted-foreground'>
                          Individual
                        </span>
                      )}
                    </TableCell>
                    <TableCell className='text-sm text-muted-foreground'>
                      {formatDate(attendee.createdAt)}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEditAttendee(attendee)}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleDeleteAttendee(attendee)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className='flex items-center justify-between mt-6'>
                <div className='text-sm text-muted-foreground'>
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, totalAttendees)} of{" "}
                  {totalAttendees} attendees
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className='h-4 w-4' />
                    Previous
                  </Button>

                  <div className='flex items-center gap-1'>
                    {/* Show page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size='sm'
                          onClick={() => handlePageChange(pageNum)}
                          className='w-8 h-8 p-0'
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      {/* Attendee Form Modal */}
      <AttendeeForm
        open={showAttendeeForm}
        onOpenChange={setShowAttendeeForm}
        attendee={editingAttendee}
        onSuccess={handleAttendeeFormSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title='Delete Attendee'
        description={
          deletingAttendee
            ? `Are you sure you want to delete ${deletingAttendee.firstName} ${deletingAttendee.lastName}? This action cannot be undone.`
            : "Are you sure you want to delete this attendee?"
        }
        confirmText='Delete'
        cancelText='Cancel'
        onConfirm={confirmDeleteAttendee}
        isLoading={isDeleting}
        variant='destructive'
      />
    </Card>
  );
}
