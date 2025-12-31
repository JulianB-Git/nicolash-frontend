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
import { logApiError } from "@/lib/errorLogging";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Helper function to parse API error responses
async function parseAPIError(response: Response): Promise<APIError> {
  let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
  let errorData: any = {};

  try {
    errorData = await response.json();

    // Parse the nested error structure from the backend
    if (errorData.error && errorData.error.message) {
      errorMessage = errorData.error.message;
    } else if (errorData.message) {
      errorMessage = errorData.message;
    } else if (typeof errorData === "string") {
      errorMessage = errorData;
    }
  } catch (parseError) {
    // If JSON parsing fails, use the default error message
    console.warn("Failed to parse error response:", parseError);
  }

  return new APIError(errorMessage, response.status, errorData);
}

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

// Enhanced fetchAPI function with authentication support and error logging
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options.method || "GET";

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
      const error = new AuthenticationError("Authentication required");
      logApiError(error, endpoint, method, response.status);
      throw error;
    }

    if (response.status === 403) {
      const error = new AuthorizationError(
        "Access denied - user not on allowlist"
      );
      logApiError(error, endpoint, method, response.status);
      throw error;
    }

    if (!response.ok) {
      const error = await parseAPIError(response);
      logApiError(error, endpoint, method, response.status, error.response);
      throw error;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    const networkError = new APIError("Network error occurred", 0, error);
    logApiError(networkError, endpoint, method);
    throw networkError;
  }
}

// Authenticated API client class for admin operations
class AuthenticatedAPIClient {
  constructor(private getToken: () => Promise<string | null>) {}

  // Admin-only attendee operations (require authentication)
  async getAttendees(page = 1, limit = 20): Promise<AttendeesResponse> {
    const token = await this.getToken();
    console.log("TOKEN", token);
    const response = await fetchAPI<any>(
      `/attendees?page=${page}&limit=${limit}`,
      {},
      token
    );

    // Handle the API response format: { success: true, data: { attendees: [...], total: 7, ... } }
    if (response && response.data) {
      return {
        attendees: response.data.attendees || [],
        total: response.data.total || 0,
        page: response.data.page || page,
        limit: response.data.limit || limit,
      };
    }

    // Fallback for direct response format
    return response;
  }

  async createAttendee(data: CreateAttendeeRequest): Promise<Attendee> {
    const token = await this.getToken();
    const response = await fetchAPI<any>(
      "/attendees",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      token
    );

    // Handle the API response format: { success: true, data: { ...attendeeData } }
    if (response && response.data) {
      return response.data;
    } else {
      return response;
    }
  }

  async updateAttendee(
    id: string,
    data: UpdateAttendeeRequest
  ): Promise<Attendee> {
    const token = await this.getToken();
    const response = await fetchAPI<any>(
      `/attendees/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      token
    );

    // Handle the API response format: { success: true, data: { ...attendeeData } }
    if (response && response.data) {
      return response.data;
    } else {
      return response;
    }
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
    const response = await fetchAPI<any>(`/groups/${id}`, {}, token);

    // Handle the API response format: { success: true, data: { ...groupData } }
    if (response && response.data) {
      return response.data;
    } else {
      return response;
    }
  }

  async getAllGroups(): Promise<Group[]> {
    const token = await this.getToken();
    const response = await fetchAPI<any>("/groups", {}, token);

    // Handle the API response format: { success: true, data: [...] }
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response)) {
      return response;
    } else {
      console.warn("Unexpected groups API response format:", response);
      return [];
    }
  }

  async updateGroupMembers(id: string, memberIds: string[]): Promise<void> {
    const token = await this.getToken();
    return fetchAPI<void>(
      `/groups/${id}/members`,
      {
        method: "PUT",
        body: JSON.stringify({ attendeeIds: memberIds }),
      },
      token
    );
  }

  async addGroupMembers(id: string, memberIds: string[]): Promise<void> {
    const token = await this.getToken();
    return fetchAPI<void>(
      `/groups/${id}/members`,
      {
        method: "PUT",
        body: JSON.stringify({
          attendeeIds: memberIds,
          action: "add",
        }),
      },
      token
    );
  }

  async removeGroupMembers(id: string, memberIds: string[]): Promise<void> {
    const token = await this.getToken();
    return fetchAPI<void>(
      `/groups/${id}/members`,
      {
        method: "PUT",
        body: JSON.stringify({
          attendeeIds: memberIds,
          action: "remove",
        }),
      },
      token
    );
  }

  async deleteGroup(id: string): Promise<void> {
    const token = await this.getToken();
    return fetchAPI<void>(
      `/groups/${id}`,
      {
        method: "DELETE",
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
      throw await parseAPIError(response);
    }

    const responseData = await response.json();

    // Handle the nested response structure from the API
    // API returns: { success: boolean, data: { success: boolean, result: BulkUploadResult } }
    if (responseData && responseData.data && responseData.data.result) {
      return responseData.data.result;
    } else if (responseData && responseData.result) {
      // Fallback for direct result format
      return responseData.result;
    } else {
      // Fallback for direct response format
      return responseData;
    }
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
