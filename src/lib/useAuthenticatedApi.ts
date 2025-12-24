"use client";

import { useAuth } from "@clerk/nextjs";
import { AuthenticatedAPIClient } from "./api";
import { useMemo } from "react";

/**
 * Hook that provides an authenticated API client for admin operations.
 * This hook integrates with Clerk authentication to automatically include
 * Bearer tokens in API requests.
 *
 * @returns AuthenticatedAPIClient instance configured with Clerk token
 */
export function useAuthenticatedApi(): AuthenticatedAPIClient {
  const { getToken } = useAuth();

  const apiClient = useMemo(() => {
    return new AuthenticatedAPIClient(async () => {
      try {
        // Get the token from Clerk
        const token = await getToken();
        return token;
      } catch (error) {
        console.error("Failed to get authentication token:", error);
        return null;
      }
    });
  }, [getToken]);

  return apiClient;
}
