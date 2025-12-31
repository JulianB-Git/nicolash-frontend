/**
 * Toast notification utilities for consistent user feedback
 */

import { toast } from "sonner";

export interface ToastOptions {
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  dismissible?: boolean;
}

/**
 * Success toast with consistent styling and messaging
 */
export const showSuccessToast = (message: string, options?: ToastOptions) => {
  return toast.success(message, {
    duration: options?.duration || 4000,
    position: options?.position,
    dismissible: options?.dismissible !== false,
  });
};

/**
 * Error toast with consistent styling and messaging
 */
export const showErrorToast = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    duration: options?.duration || 6000, // Longer duration for errors
    position: options?.position,
    dismissible: options?.dismissible !== false,
  });
};

/**
 * Info toast for general information
 */
export const showInfoToast = (message: string, options?: ToastOptions) => {
  return toast.info(message, {
    duration: options?.duration || 4000,
    position: options?.position,
    dismissible: options?.dismissible !== false,
  });
};

/**
 * Warning toast for important notices
 */
export const showWarningToast = (message: string, options?: ToastOptions) => {
  return toast.warning(message, {
    duration: options?.duration || 5000,
    position: options?.position,
    dismissible: options?.dismissible !== false,
  });
};

/**
 * Loading toast that can be updated
 */
export const showLoadingToast = (message: string, options?: ToastOptions) => {
  return toast.loading(message, {
    duration: options?.duration || Infinity, // Keep loading until dismissed
    position: options?.position,
    dismissible: options?.dismissible !== false,
  });
};

/**
 * Promise toast that automatically updates based on promise state
 */
export const showPromiseToast = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  },
  options?: ToastOptions
) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
    duration: options?.duration,
    position: options?.position,
    dismissible: options?.dismissible !== false,
  });
};

/**
 * RSVP-specific toast messages
 */
export const rsvpToasts = {
  searchSuccess: (count: number) =>
    showSuccessToast(`Found ${count} invitation${count !== 1 ? "s" : ""}`),

  searchEmpty: () =>
    showInfoToast(
      "No invitations found with that name. Please try a different spelling."
    ),

  searchError: (error?: string) =>
    showErrorToast(
      error || "Failed to search for attendees. Please try again."
    ),

  rsvpSubmitted: (name: string, status: "accepted" | "declined") =>
    showSuccessToast(`RSVP ${status} successfully! Thank you, ${name}.`),

  rsvpError: (error?: string) =>
    showErrorToast(error || "Failed to submit RSVP. Please try again."),

  attendeeSelected: (name: string) =>
    showInfoToast(`Selected ${name}`, { duration: 2000 }),
};

/**
 * Admin-specific toast messages
 */
export const adminToasts = {
  attendeeCreated: (name: string) =>
    showSuccessToast(`${name} created successfully`),

  attendeeUpdated: (name: string) =>
    showSuccessToast(`${name} updated successfully`),

  attendeeDeleted: (name: string) =>
    showSuccessToast(`${name} deleted successfully`),

  attendeeError: (action: string, error?: string) =>
    showErrorToast(error || `Failed to ${action} attendee`),

  groupCreated: (name: string) =>
    showSuccessToast(`Group "${name}" created successfully`),

  groupUpdated: (name: string) =>
    showSuccessToast(`Group "${name}" updated successfully`),

  groupDeleted: (name: string) =>
    showSuccessToast(`Group "${name}" deleted successfully`),

  groupError: (action: string, error?: string) =>
    showErrorToast(error || `Failed to ${action} group`),

  membersAdded: (count: number) =>
    showSuccessToast(`Added ${count} member${count !== 1 ? "s" : ""} to group`),

  membersRemoved: (count: number) =>
    showSuccessToast(
      `Removed ${count} member${count !== 1 ? "s" : ""} from group`
    ),

  uploadStarted: () =>
    showInfoToast("Starting file upload...", { duration: 2000 }),

  uploadCompleted: (created: number, total: number) =>
    showSuccessToast(
      `Upload completed! Created ${created} of ${total} attendees.`
    ),

  uploadError: (error?: string) =>
    showErrorToast(error || "Upload failed. Please try again."),

  loadingError: (resource: string) =>
    showErrorToast(`Failed to load ${resource}. Please refresh the page.`),
};

/**
 * Form validation toast messages
 */
export const validationToasts = {
  invalidInput: (field: string) =>
    showWarningToast(`Please check the ${field} field and try again.`),

  requiredField: (field: string) => showWarningToast(`${field} is required.`),

  invalidEmail: () => showWarningToast("Please enter a valid email address."),

  invalidName: () =>
    showWarningToast(
      "Names can only contain letters, spaces, hyphens, and apostrophes."
    ),

  fileTooLarge: (maxSize: string) =>
    showWarningToast(`File size must be less than ${maxSize}.`),

  invalidFileType: (allowedTypes: string) =>
    showWarningToast(`Please select a ${allowedTypes} file.`),
};

/**
 * Network and API toast messages
 */
export const networkToasts = {
  connectionError: () =>
    showErrorToast("Connection error. Please check your internet connection."),

  serverError: () => showErrorToast("Server error. Please try again later."),

  authenticationError: () =>
    showErrorToast("Authentication required. Please sign in."),

  authorizationError: () =>
    showErrorToast("Access denied. Please contact the administrator."),

  rateLimitError: () =>
    showWarningToast("Too many requests. Please wait a moment and try again."),

  timeoutError: () => showErrorToast("Request timed out. Please try again."),
};

/**
 * Utility to dismiss all toasts
 */
export const dismissAllToasts = () => {
  toast.dismiss();
};

/**
 * Utility to dismiss a specific toast by ID
 */
export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};
