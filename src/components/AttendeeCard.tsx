"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Attendee } from "@/types";

interface AttendeeCardProps {
  attendee: Attendee;
  onRSVPClick: () => void;
  onGroupRSVPClick?: () => void;
  showRSVPButton?: boolean;
}

export default function AttendeeCard({
  attendee,
  onRSVPClick,
  onGroupRSVPClick,
  showRSVPButton = true,
}: AttendeeCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "declined":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "declined":
        return "Declined";
      default:
        return "Awaiting Response";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <span>
            {attendee.firstName} {attendee.lastName}
          </span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
              attendee.rsvpStatus
            )}`}
          >
            {getStatusText(attendee.rsvpStatus)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <p className='text-sm text-muted-foreground'>Email</p>
          <p className='font-medium'>{attendee.email}</p>
        </div>

        {attendee.rsvpStatus !== "pending" && (
          <div>
            <p className='text-sm text-muted-foreground'>
              {attendee.rsvpStatus === "accepted"
                ? "Accepted on"
                : "Declined on"}
            </p>
            <p className='font-medium'>{formatDate(attendee.updatedAt)}</p>
          </div>
        )}

        {attendee.groupId && (
          <div>
            <p className='text-sm text-muted-foreground'>Invitation Type</p>
            <p className='font-medium'>Group invitation</p>
            <p className='text-xs text-muted-foreground mt-1'>
              You can RSVP for yourself or for your entire group
            </p>
          </div>
        )}

        {showRSVPButton && (
          <div className='pt-4 space-y-3'>
            <Button onClick={onRSVPClick} className='w-full'>
              {attendee.rsvpStatus === "pending"
                ? "Submit Individual RSVP"
                : "Update Individual RSVP"}
            </Button>
            {attendee.groupId && onGroupRSVPClick && (
              <Button
                onClick={onGroupRSVPClick}
                variant='outline'
                className='w-full'
              >
                {attendee.rsvpStatus === "pending"
                  ? "Submit Group RSVP"
                  : "Update Group RSVP"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
