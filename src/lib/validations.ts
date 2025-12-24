import { z } from "zod";

export const AttendeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  groupId: z.string().optional(),
});

export const RSVPSearchSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters"),
});

export const RSVPSubmissionSchema = z.object({
  status: z.enum(["accepted", "declined"], {
    message: "Please select your RSVP status",
  }),
});

export const GroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  memberIds: z.array(z.string()).optional(),
});

export const BulkUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 50 * 1024 * 1024,
      "File size must be less than 50MB"
    )
    .refine(
      (file) => file.type === "text/csv" || file.name.endsWith(".csv"),
      "File must be a CSV file"
    )
    .refine((file) => {
      // Estimate max records based on average row size (assuming ~100 bytes per row)
      const estimatedRows = file.size / 100;
      return estimatedRows <= 10000;
    }, "File appears to contain more than 10,000 records"),
});

export type AttendeeFormData = z.infer<typeof AttendeeSchema>;
export type RSVPSearchFormData = z.infer<typeof RSVPSearchSchema>;
export type RSVPSubmissionFormData = z.infer<typeof RSVPSubmissionSchema>;
export type GroupFormData = z.infer<typeof GroupSchema>;
export type BulkUploadFormData = z.infer<typeof BulkUploadSchema>;
