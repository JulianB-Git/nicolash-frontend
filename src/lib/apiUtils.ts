import { APIError, AuthenticationError, AuthorizationError } from "./api";

/**
 * Utility function to handle API errors consistently across the application.
 * This function provides user-friendly error handling for different types of API errors.
 *
 * @param error - The error thrown by the API client
 * @param onAuthError - Optional callback for authentication errors
 * @param onAuthzError - Optional callback for authorization errors
 * @returns User-friendly error message
 */
export function handleAPIError(
  error: unknown,
  onAuthError?: () => void,
  onAuthzError?: () => void
): string {
  if (error instanceof AuthenticationError) {
    onAuthError?.();
    return "Authentication required. Please sign in to continue.";
  }

  if (error instanceof AuthorizationError) {
    onAuthzError?.();
    return "Access denied. Please contact the administrator to be added to the allowlist.";
  }

  if (error instanceof APIError) {
    return error.message || "An error occurred while processing your request.";
  }

  console.error("Unexpected error:", error);
  return "An unexpected error occurred. Please try again.";
}

/**
 * Type guard to check if an error is an authentication error
 */
export function isAuthenticationError(
  error: unknown
): error is AuthenticationError {
  return error instanceof AuthenticationError;
}

/**
 * Type guard to check if an error is an authorization error
 */
export function isAuthorizationError(
  error: unknown
): error is AuthorizationError {
  return error instanceof AuthorizationError;
}

/**
 * Type guard to check if an error is any API error
 */
export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError;
}
