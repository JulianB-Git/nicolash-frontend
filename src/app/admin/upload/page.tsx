"use client";

import { useState } from "react";
import { BulkUpload } from "@/components/admin/BulkUpload";
import { useAuthenticatedApi } from "@/lib/useAuthenticatedApi";
import { BulkUploadResult } from "@/types";
import { toast } from "sonner";

export default function AdminUploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const { apiClient } = useAuthenticatedApi();

  const handleUpload = async (file: File): Promise<BulkUploadResult> => {
    setIsUploading(true);
    try {
      const result = await apiClient.bulkUploadAttendees(file);

      // Show success toast
      toast.success(
        `Upload completed! Created ${result.successfulCreations} attendees.`
      );

      return result;
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again."
      );
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold mb-2'>Bulk Upload</h2>
        <p className='text-muted-foreground'>
          Upload attendees from a CSV file to quickly populate your guest list.
        </p>
      </div>

      <BulkUpload onUpload={handleUpload} isUploading={isUploading} />
    </div>
  );
}
