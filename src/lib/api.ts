import {
  Attendee,
  AttendeesResponse,
  CreateAttendeeRequest,
  UpdateAttendeeRequest,
  GroupRSVPRequest,
  CreateGroupRequest,
  GroupWithMembers,
  BulkUploadResult,
  RSVPStatus,
  Group,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Base API Error class
class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "APIError";
  }
}

// Authentication Error class for 401 responses
class AuthenticationError extends APIError {
  constructor(message: string = "Authentication required") {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

// Authorization Error class for 403 responses
class AuthorizationError extends APIError {
  constructor(message: string = "Access denied - user not on allowlist") {
    super(message, 403);
    this.name = "AuthorizationError";
  }
}

// Enhanced fetchAPI function with authentication support
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  // Add Bearer token for authenticated requests
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 401) {
      throw new AuthenticationError("Authentication required");
    }

    if (response.status === 403) {
      throw new AuthorizationError("Access denied - user not on allowlist");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError("Network error occurred", 0, error);
  }
}

// Authenticated API client class for admin operations
class AuthenticatedAPIClient {
  constructor(private getToken: () => Promise<string | null>) {}

  // Admin-only attendee operations (require authentication)
  async getAttendees(page = 1, limit = 20): Promise<AttendeesResponse> {
    const token = await this.getToken();
    return fetchAPI<AttendeesResponse>(
      `/attendees?page=${page}&limit=${limit}`,
      {},
      token
    );
  }

  async createAttendee(data: CreateAttendeeRequest): Promise<Attendee> {
    const token = await this.getToken();
    return fetchAPI<Attendee>(
      "/attendees",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      token
    );
  }

  async updateAttendee(
    id: string,
    data: UpdateAttendeeRequest
  ): Promise<Attendee> {
    const token = await this.getToken();
    return fetchAPI<Attendee>(
      `/attendees/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      token
    );
  }

  async deleteAttendee(id: string): Promise<void> {
    const token = await this.getToken();
    return fetchAPI<void>(
      `/attendees/${id}`,
      {
        method: "DELETE",
      },
      token
    );
  }

  async getAttendee(id: string): Promise<Attendee> {
    const token = await this.getToken();
    return fetchAPI<Attendee>(`/attendees/${id}`, {}, token);
  }

  // Admin-only group operations (require authentication)
  async createGroup(data: CreateGroupRequest): Promise<GroupWithMembers> {
    const token = await this.getToken();
    return fetchAPI<GroupWithMembers>(
      "/groups",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      token
    );
  }

  async getGroup(id: string): Promise<GroupWithMembers> {
    const token = await this.getToken();
    return fetchAPI<GroupWithMembers>(`/groups/${id}`, {}, token);
  }

  async getAllGroups(): Promise<Group[]> {
    const token = await this.getToken();
    return fetchAPI<Group[]>("/groups", {}, token);
  }

  async updateGroupMembers(id: string, memberIds: string[]): Promise<void> {
    const token = await this.getToken();
    return fetchAPI<void>(
      `/groups/${id}/members`,
      {
        method: "PUT",
        body: JSON.stringify({ memberIds }),
      },
      token
    );
  }

  // Admin-only bulk operations (require authentication)
  async bulkUploadAttendees(file: File): Promise<BulkUploadResult> {
    const token = await this.getToken();
    const formData = new FormData();
    formData.append("file", file);

    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/attendees/bulk-upload`, {
      method: "POST",
      body: formData,
      headers,
    });

    if (response.status === 401) {
      throw new AuthenticationError("Authentication required");
    }

    if (response.status === 403) {
      throw new AuthorizationError("Access denied - user not on allowlist");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  }
}

// Public API client for guest operations (no authentication required)
export const publicApiClient = {
  // Public RSVP operations
  async searchAttendees(name: string): Promise<Attendee[]> {
    const encodedName = encodeURIComponent(name);
    console.log("Making API request to:", `/rsvp/search?name=${encodedName}`);
    const response = await fetchAPI<any>(`/rsvp/search?name=${encodedName}`);

    console.log("Raw API response:", response);
    console.log("Response type:", typeof response);
    console.log("Is array:", Array.isArray(response));

    // Handle the actual API response format: { success: true, data: { attendees: [...] } }
    if (response && response.data && Array.isArray(response.data.attendees)) {
      console.log(
        "Using response.data.attendees format, length:",
        response.data.attendees.length
      );
      return response.data.attendees;
    } else if (response && response.data && Array.isArray(response.data)) {
      console.log("Using response.data format, length:", response.data.length);
      return response.data;
    } else if (Array.isArray(response)) {
      console.log("Using direct array format, length:", response.length);
      return response;
    } else {
      console.warn("Unexpected API response format:", response);
      return [];
    }
  },

  async submitRSVP(id: string, status: RSVPStatus): Promise<void> {
    return fetchAPI<void>(`/rsvp/${id}/respond`, {
      method: "POST",
      body: JSON.stringify({ rsvpStatus: status }),
    });
  },

  async submitGroupRSVP(
    groupId: string,
    responses: GroupRSVPRequest
  ): Promise<void> {
    return fetchAPI<void>(`/rsvp/group/${groupId}/respond`, {
      method: "POST",
      body: JSON.stringify(responses),
    });
  },

  // Get group information (public endpoint as per API documentation)
  async getGroup(groupId: string): Promise<GroupWithMembers> {
    console.log("Making API request to:", `/groups/${groupId}`);
    const response = await fetchAPI<any>(`/groups/${groupId}`);

    console.log("Raw group API response:", response);

    // Handle the API response format: { success: true, data: { ...groupData } }
    if (response && response.data) {
      console.log("Using response.data format for group");
      return response.data;
    } else {
      console.log("Using direct response format for group");
      return response;
    }
  },
};

// Legacy export for backward compatibility (now uses public client)
export const apiClient = {
  ...publicApiClient,
  // Note: Admin operations moved to AuthenticatedAPIClient
  // These will throw errors if used without proper authentication setup
  async getAttendees(): Promise<AttendeesResponse> {
    throw new AuthenticationError(
      "Admin operations require authentication. Use AuthenticatedAPIClient instead."
    );
  },
  async createAttendee(): Promise<Attendee> {
    throw new AuthenticationError(
      "Admin operations require authentication. Use AuthenticatedAPIClient instead."
    );
  },
  async updateAttendee(): Promise<Attendee> {
    throw new AuthenticationError(
      "Admin operations require authentication. Use AuthenticatedAPIClient instead."
    );
  },
  async deleteAttendee(): Promise<void> {
    throw new AuthenticationError(
      "Admin operations require authentication. Use AuthenticatedAPIClient instead."
    );
  },
  async getAttendee(): Promise<Attendee> {
    throw new AuthenticationError(
      "Admin operations require authentication. Use AuthenticatedAPIClient instead."
    );
  },
  async createGroup(): Promise<GroupWithMembers> {
    throw new AuthenticationError(
      "Admin operations require authentication. Use AuthenticatedAPIClient instead."
    );
  },
  async getGroup(): Promise<GroupWithMembers> {
    throw new AuthenticationError(
      "Admin operations require authentication. Use AuthenticatedAPIClient instead."
    );
  },
  async updateGroupMembers(): Promise<void> {
    throw new AuthenticationError(
      "Admin operations require authentication. Use AuthenticatedAPIClient instead."
    );
  },
  async bulkUploadAttendees(): Promise<BulkUploadResult> {
    throw new AuthenticationError(
      "Admin operations require authentication. Use AuthenticatedAPIClient instead."
    );
  },
};

export {
  APIError,
  AuthenticationError,
  AuthorizationError,
  AuthenticatedAPIClient,
};
