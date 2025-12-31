"use client";

import { useState, Suspense, lazy } from "react";
import { useAuthenticatedApi } from "@/lib/useAuthenticatedApi";
import { BulkUploadResult } from "@/types";
import { toast } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { BulkUploadFallback } from "@/components/FallbackUI";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load the BulkUpload component
const BulkUpload = lazy(() =>
  import("@/components/admin/BulkUpload").then((module) => ({
    default: module.BulkUpload,
  }))
);

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

      <ErrorBoundary context='Bulk Upload' fallback={<BulkUploadFallback />}>
        <Suspense
          fallback={<LoadingSpinner text='Loading upload interface...' />}
        >
          <BulkUpload onUpload={handleUpload} isUploading={isUploading} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
