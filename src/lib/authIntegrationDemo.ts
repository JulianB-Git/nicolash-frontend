/**
 * Demonstration of the Clerk authentication integration with the API client.
 * This file shows how to use the new authenticated API client in practice.
 */

import { useAuthenticatedApi } from "./useAuthenticatedApi";
import {
  handleAPIError,
  isAuthenticationError,
  isAuthorizationError,
} from "./apiUtils";
import { publicApiClient } from "./api";

/**
 * Example function showing how to use the authenticated API client
 * in a React component for admin operations.
 */
export function useAdminOperations() {
  const { apiClient } = useAuthenticatedApi();

  const fetchAttendees = async (page = 1, limit = 20) => {
    try {
      const response = await apiClient.getAttendees(page, limit);
      return { success: true, data: response };
    } catch (error) {
      const message = handleAPIError(
        error,
        () => {
          // Handle authentication error - redirect to sign-in
          console.log("User needs to authenticate");
        },
        () => {
          // Handle authorization error - show access denied
          console.log("User not authorized");
        }
      );
      return { success: false, error: message };
    }
  };

  const createAttendee = async (attendeeData: {
    firstName: string;
    lastName: string;
    email: string;
    groupId?: string;
  }) => {
    try {
      const attendee = await apiClient.createAttendee(attendeeData);
      return { success: true, data: attendee };
    } catch (error) {
      const message = handleAPIError(error);
      return { success: false, error: message };
    }
  };

  const bulkUploadAttendees = async (file: File) => {
    try {
      const result = await apiClient.bulkUploadAttendees(file);
      return { success: true, data: result };
    } catch (error) {
      if (isAuthenticationError(error)) {
        return { success: false, error: "Please sign in to upload files" };
      }
      if (isAuthorizationError(error)) {
        return {
          success: false,
          error: "You don't have permission to upload files",
        };
      }
      const message = handleAPIError(error);
      return { success: false, error: message };
    }
  };

  return {
    fetchAttendees,
    createAttendee,
    bulkUploadAttendees,
  };
}

/**
 * Example function showing how to use the public API client
 * for guest operations (no authentication required).
 */
export const guestOperations = {
  searchAttendees: async (name: string) => {
    try {
      const attendees = await publicApiClient.searchAttendees(name);
      return { success: true, data: attendees };
    } catch (error) {
      const message = handleAPIError(error);
      return { success: false, error: message };
    }
  },

  submitRSVP: async (attendeeId: string, status: "accepted" | "declined") => {
    try {
      await publicApiClient.submitRSVP(attendeeId, status);
      return { success: true };
    } catch (error) {
      const message = handleAPIError(error);
      return { success: false, error: message };
    }
  },

  submitGroupRSVP: async (
    groupId: string,
    responses: Array<{
      attendeeId: string;
      status: "accepted" | "declined";
    }>
  ) => {
    try {
      // Convert to the correct format expected by the API
      const groupRSVPRequest = {
        responses: responses.map(({ attendeeId, status }) => ({
          attendeeId,
          rsvpStatus: status,
        })),
      };
      await publicApiClient.submitGroupRSVP(groupId, groupRSVPRequest);
      return { success: true };
    } catch (error) {
      const message = handleAPIError(error);
      return { success: false, error: message };
    }
  },
};

/**
 * Validation function to check if the authentication integration is properly set up.
 * This can be used in development to verify the setup.
 */
export function validateAuthIntegration() {
  const checks = {
    authenticatedApiClientExists: typeof useAuthenticatedApi === "function",
    publicApiClientExists: typeof publicApiClient === "object",
    errorHandlingExists: typeof handleAPIError === "function",
    errorTypesExist:
      typeof isAuthenticationError === "function" &&
      typeof isAuthorizationError === "function",
  };

  const allChecksPass = Object.values(checks).every(Boolean);

  return {
    isValid: allChecksPass,
    checks,
    summary: allChecksPass
      ? "✅ Clerk authentication integration is properly set up"
      : "❌ Some authentication integration components are missing",
  };
}
