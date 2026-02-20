import { z } from "zod";

// Enhanced validation schemas with comprehensive error messages and real-time validation

export const AttendeeSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes",
    )
    .transform((val) => val.trim()),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes",
    )
    .transform((val) => val.trim()),
  email: z
    .string()
    .optional()
    .refine((email) => {
      // If email is provided and not empty, it must be valid
      if (email && email.trim().length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
      }
      return true;
    }, "Please enter a valid email address"),
  dietaryRequirements: z
    .enum(["Vegan", "Vegetarian", "Other", "None"])
    .optional()
    .default("None"),
  groupId: z.string().optional(),
});

export const RSVPSearchSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter at least 2 characters")
    .max(100, "Search term is too long")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Search can only contain letters, spaces, hyphens, and apostrophes",
    )
    .transform((val) => val.trim()),
});

export const RSVPSubmissionSchema = z.object({
  status: z.enum(["accepted", "declined"], {
    message: "Please select your RSVP status",
  }),
  dietaryRequirements: z
    .enum(["Vegan", "Vegetarian", "Other", "None"])
    .optional()
    .default("None"),
});

export const GroupSchema = z.object({
  name: z
    .string()
    .min(1, "Group name is required")
    .max(100, "Group name must be less than 100 characters")
    .regex(
      /^[a-zA-Z0-9\s'&.-]+$/,
      "Group name can only contain letters, numbers, spaces, and common punctuation",
    )
    .transform((val) => val.trim()),
  memberIds: z.array(z.string()).optional(),
});

export const BulkUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Please select a file")
    .refine(
      (file) => file.size <= 50 * 1024 * 1024,
      "File size must be less than 50MB",
    )
    .refine(
      (file) => file.type === "text/csv" || file.name.endsWith(".csv"),
      "File must be a CSV file (.csv extension required)",
    )
    .refine((file) => {
      // Estimate max records based on average row size (assuming ~100 bytes per row)
      const estimatedRows = file.size / 100;
      return estimatedRows <= 10000;
    }, "File appears to contain more than 10,000 records"),
});

// Additional validation schemas for enhanced form validation

export const GroupRSVPSchema = z.object({
  responses: z.record(
    z.string(),
    z.object({
      status: z.enum(["accepted", "declined"], {
        message: "Please select an RSVP status for each member",
      }),
      dietaryRequirements: z
        .enum(["Vegan", "Vegetarian", "Other", "None"])
        .optional()
        .default("None"),
    }),
  ),
});

// Real-time validation helpers
export const validateNameField = (value: string): string | undefined => {
  if (!value || value.trim().length === 0) {
    return "This field is required";
  }
  if (value.length > 50) {
    return "Must be less than 50 characters";
  }
  if (!/^[a-zA-Z\s'-]+$/.test(value)) {
    return "Can only contain letters, spaces, hyphens, and apostrophes";
  }
  return undefined;
};

export const validateEmailField = (value: string): string | undefined => {
  if (!value || value.trim().length === 0) {
    return undefined; // Email is optional
  }

  const trimmedValue = value.trim();

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedValue)) {
    return "Please enter a valid email address";
  }

  // Additional validation for common issues
  if (trimmedValue.length > 254) {
    return "Email address is too long";
  }

  if (trimmedValue.includes("..")) {
    return "Email address cannot contain consecutive dots";
  }

  if (trimmedValue.startsWith(".") || trimmedValue.endsWith(".")) {
    return "Email address cannot start or end with a dot";
  }

  return undefined;
};

export const validateSearchField = (value: string): string | undefined => {
  if (!value || value.trim().length === 0) {
    return "Please enter a search term";
  }
  if (value.length < 2) {
    return "Please enter at least 2 characters";
  }
  if (value.length > 100) {
    return "Search term is too long";
  }
  if (!/^[a-zA-Z\s'-]+$/.test(value)) {
    return "Search can only contain letters, spaces, hyphens, and apostrophes";
  }
  return undefined;
};

export const validateGroupNameField = (value: string): string | undefined => {
  if (!value || value.trim().length === 0) {
    return "Group name is required";
  }
  if (value.length > 100) {
    return "Group name must be less than 100 characters";
  }
  if (!/^[a-zA-Z0-9\s'&.-]+$/.test(value)) {
    return "Group name can only contain letters, numbers, spaces, and common punctuation";
  }
  return undefined;
};

export type AttendeeFormData = z.infer<typeof AttendeeSchema>;
export type RSVPSearchFormData = z.infer<typeof RSVPSearchSchema>;
export type RSVPSubmissionFormData = z.infer<typeof RSVPSubmissionSchema>;
export type GroupFormData = z.infer<typeof GroupSchema>;
export type BulkUploadFormData = z.infer<typeof BulkUploadSchema>;
export type GroupRSVPFormData = z.infer<typeof GroupRSVPSchema>;
