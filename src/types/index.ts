export interface Attendee {
  id: string;
  firstName: string;
  lastName: string;
  email?: string; // Made optional
  rsvpStatus: "pending" | "accepted" | "declined";
  dietaryRequirements?: "Vegan" | "Vegetarian" | "Other" | "None";
  groupId?: string;
  createdAt: string;
  updatedAt: string;
}

export type DietaryRequirement = "Vegan" | "Vegetarian" | "Other" | "None";

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
  groupsCreated?: Group[];
  groupsUpdated?: Group[];
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
  email?: string; // Made optional
  dietaryRequirements?: DietaryRequirement;
  groupId?: string;
}

export interface UpdateAttendeeRequest {
  firstName?: string;
  lastName?: string;
  email?: string; // Already optional, but confirming it stays optional
  dietaryRequirements?: DietaryRequirement;
  groupId?: string;
}

export interface GroupRSVPRequest {
  responses: Array<{
    attendeeId: string;
    rsvpStatus: "accepted" | "declined"; // Backend expects rsvpStatus, not status
    dietaryRequirements?: DietaryRequirement;
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
