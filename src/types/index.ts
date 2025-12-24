export interface Attendee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  rsvpStatus: "pending" | "accepted" | "declined";
  groupId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  members: Attendee[];
  createdAt: string;
  updatedAt: string;
}

export interface BulkUploadResult {
  totalRecords: number;
  successfulCreations: number;
  failures: number;
  duplicates: number;
  errors: UploadError[];
  createdAttendees: Attendee[];
}

export interface UploadError {
  row: number;
  field: string;
  value: string;
  message: string;
}

export interface AttendeesResponse {
  attendees: Attendee[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateAttendeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  groupId?: string;
}

export interface UpdateAttendeeRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  groupId?: string;
}

export interface GroupRSVPRequest {
  responses: Array<{
    attendeeId: string;
    rsvpStatus: "accepted" | "declined"; // Backend expects rsvpStatus, not status
  }>;
}

export interface CreateGroupRequest {
  name: string;
  memberIds?: string[];
}

export interface GroupWithMembers extends Group {
  members: Attendee[];
}

export type RSVPStatus = "pending" | "accepted" | "declined";
