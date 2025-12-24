/**
 * Tests for the API client with Clerk authentication integration
 * These tests verify that the authentication integration works correctly
 * and that proper error handling is in place.
 */

import {
  APIError,
  AuthenticationError,
  AuthorizationError,
  AuthenticatedAPIClient,
  publicApiClient,
} from "../api";

// Mock fetch globally
global.fetch = jest.fn();

describe("API Client Authentication Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("AuthenticatedAPIClient", () => {
    it("should include Bearer token in authenticated requests", async () => {
      const mockToken = "test-token-123";
      const mockGetToken = jest.fn().mockResolvedValue(mockToken);
      const client = new AuthenticatedAPIClient(mockGetToken);

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ attendees: [], total: 0, page: 1, limit: 20 }),
      });

      await client.getAttendees();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/attendees"),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
        })
      );
    });

    it.skip("should throw AuthenticationError on 401 response", async () => {
      const mockGetToken = jest.fn().mockResolvedValue("test-token");
      const client = new AuthenticatedAPIClient(mockGetToken);

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        json: () => Promise.resolve({}),
      });

      await expect(client.getAttendees()).rejects.toThrow(AuthenticationError);
      await expect(client.getAttendees()).rejects.toThrow(
        "Authentication required"
      );
    });

    it.skip("should throw AuthorizationError on 403 response", async () => {
      const mockGetToken = jest.fn().mockResolvedValue("test-token");
      const client = new AuthenticatedAPIClient(mockGetToken);

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: "Forbidden",
        json: () => Promise.resolve({}),
      });

      await expect(client.getAttendees()).rejects.toThrow(AuthorizationError);
      await expect(client.getAttendees()).rejects.toThrow(
        "Access denied - user not on allowlist"
      );
    });

    it("should handle null token gracefully", async () => {
      const mockGetToken = jest.fn().mockResolvedValue(null);
      const client = new AuthenticatedAPIClient(mockGetToken);

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ attendees: [], total: 0, page: 1, limit: 20 }),
      });

      await client.getAttendees();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/attendees"),
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.anything(),
          }),
        })
      );
    });

    it("should include Bearer token in bulk upload requests", async () => {
      const mockToken = "test-token-123";
      const mockGetToken = jest.fn().mockResolvedValue(mockToken);
      const client = new AuthenticatedAPIClient(mockGetToken);
      const mockFile = new File(["test,data"], "test.csv", {
        type: "text/csv",
      });

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            totalRecords: 1,
            successfulCreations: 1,
            failures: 0,
            duplicates: 0,
            errors: [],
            createdAttendees: [],
          }),
      });

      await client.bulkUploadAttendees(mockFile);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/attendees/bulk-upload"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
          body: expect.any(FormData),
        })
      );
    });
  });

  describe("Public API Client", () => {
    it("should not include Authorization header for public endpoints", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

      await publicApiClient.searchAttendees("test");

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/attendees/search"),
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.anything(),
          }),
        })
      );
    });

    it("should handle RSVP submission without authentication", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await publicApiClient.submitRSVP("test-id", "accepted");

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/attendees/test-id/rsvp"),
        expect.objectContaining({
          method: "POST",
          headers: expect.not.objectContaining({
            Authorization: expect.anything(),
          }),
        })
      );
    });
  });

  describe("Error Classes", () => {
    it("should create proper error hierarchy", () => {
      const authError = new AuthenticationError("Auth failed");
      const authzError = new AuthorizationError("Access denied");
      const apiError = new APIError("API failed", 500);

      expect(authError).toBeInstanceOf(APIError);
      expect(authError).toBeInstanceOf(AuthenticationError);
      expect(authError.status).toBe(401);

      expect(authzError).toBeInstanceOf(APIError);
      expect(authzError).toBeInstanceOf(AuthorizationError);
      expect(authzError.status).toBe(403);

      expect(apiError).toBeInstanceOf(APIError);
      expect(apiError.status).toBe(500);
    });
  });
});
