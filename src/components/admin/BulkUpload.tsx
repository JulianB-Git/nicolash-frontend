"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, AlertCircle, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { BulkUploadSchema } from "@/lib/validations";
import { BulkUploadResult, UploadError } from "@/types";

interface BulkUploadProps {
  onUpload: (file: File) => Promise<BulkUploadResult>;
  isUploading: boolean;
}

interface UploadState {
  file: File | null;
  validationError: string | null;
  uploadResult: BulkUploadResult | null;
  progress: number;
}

export function BulkUpload({ onUpload, isUploading }: BulkUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    validationError: null,
    uploadResult: null,
    progress: 0,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file using Zod schema
    const validation = BulkUploadSchema.safeParse({ file });

    if (!validation.success) {
      setUploadState((prev) => ({
        ...prev,
        file: null,
        validationError: validation.error.issues[0]?.message || "Invalid file",
        uploadResult: null,
      }));
      return;
    }

    setUploadState((prev) => ({
      ...prev,
      file,
      validationError: null,
      uploadResult: null,
      progress: 0,
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!uploadState.file) return;

    try {
      setUploadState((prev) => ({ ...prev, progress: 10 }));

      const result = await onUpload(uploadState.file);

      setUploadState((prev) => ({
        ...prev,
        uploadResult: result,
        progress: 100,
      }));
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadState((prev) => ({
        ...prev,
        validationError:
          error instanceof Error ? error.message : "Upload failed",
        progress: 0,
      }));
    }
  };

  const clearFile = () => {
    setUploadState({
      file: null,
      validationError: null,
      uploadResult: null,
      progress: 0,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className='space-y-6'>
      {/* File Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload CSV File</CardTitle>
          <CardDescription>
            Upload a CSV file containing attendee information. Maximum file
            size: 50MB, up to 10,000 records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!uploadState.file ? (
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                }
              `}
            >
              <input {...getInputProps()} />
              <Upload className='mx-auto h-12 w-12 text-muted-foreground mb-4' />
              {isDragActive ? (
                <p className='text-lg'>Drop the CSV file here...</p>
              ) : (
                <div>
                  <p className='text-lg mb-2'>
                    Drag & drop a CSV file here, or click to select
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Supports CSV files up to 50MB with a maximum of 10,000
                    records
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='flex items-center justify-between p-4 border rounded-lg'>
                <div className='flex items-center space-x-3'>
                  <FileText className='h-8 w-8 text-blue-500' />
                  <div>
                    <p className='font-medium'>{uploadState.file.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {formatFileSize(uploadState.file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={clearFile}
                  disabled={isUploading}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>

              {isUploading && (
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>Uploading...</span>
                    <span>{uploadState.progress}%</span>
                  </div>
                  <Progress value={uploadState.progress} />
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className='w-full'
              >
                {isUploading ? "Uploading..." : "Upload File"}
              </Button>
            </div>
          )}

          {uploadState.validationError && (
            <Alert className='mt-4' variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertDescription>{uploadState.validationError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Upload Results */}
      {uploadState.uploadResult && (
        <UploadResults result={uploadState.uploadResult} />
      )}
    </div>
  );
}

interface UploadResultsProps {
  result: BulkUploadResult;
}

function UploadResults({ result }: UploadResultsProps) {
  const hasGroups =
    (result.groupsCreated && result.groupsCreated.length > 0) ||
    (result.groupsUpdated && result.groupsUpdated.length > 0);

  // Categorize errors by type for better display
  const errorsByType = result.errors.reduce((acc, error) => {
    const category =
      error.field === "email"
        ? "validation"
        : error.message.toLowerCase().includes("duplicate")
        ? "duplicate"
        : "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(error);
    return acc;
  }, {} as Record<string, UploadError[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <CheckCircle className='h-5 w-5 text-green-500' />
          <span>Upload Results</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Summary Statistics */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='text-center p-3 bg-blue-50 rounded-lg'>
            <div className='text-2xl font-bold text-blue-600'>
              {result.totalRecords}
            </div>
            <div className='text-sm text-blue-600'>Total Records</div>
          </div>
          <div className='text-center p-3 bg-green-50 rounded-lg'>
            <div className='text-2xl font-bold text-green-600'>
              {result.successfulCreations}
            </div>
            <div className='text-sm text-green-600'>Created</div>
          </div>
          <div className='text-center p-3 bg-yellow-50 rounded-lg'>
            <div className='text-2xl font-bold text-yellow-600'>
              {result.duplicates}
            </div>
            <div className='text-sm text-yellow-600'>Duplicates</div>
          </div>
          <div className='text-center p-3 bg-red-50 rounded-lg'>
            <div className='text-2xl font-bold text-red-600'>
              {result.failures}
            </div>
            <div className='text-sm text-red-600'>Failures</div>
          </div>
        </div>

        {/* Success Message */}
        {result.successfulCreations > 0 && (
          <Alert>
            <CheckCircle className='h-4 w-4' />
            <AlertDescription>
              Successfully created {result.successfulCreations} attendee
              {result.successfulCreations !== 1 ? "s" : ""}.
              {hasGroups && " Group assignments have been processed."}
            </AlertDescription>
          </Alert>
        )}

        {/* Group Information */}
        {hasGroups && (
          <div className='space-y-3'>
            <h4 className='font-medium text-blue-600'>Group Operations</h4>
            <div className='grid gap-3'>
              {result.groupsCreated && result.groupsCreated.length > 0 && (
                <div className='p-3 bg-blue-50 rounded-lg'>
                  <div className='font-medium text-blue-700 mb-2'>
                    New Groups Created ({result.groupsCreated.length})
                  </div>
                  <div className='space-y-1'>
                    {result.groupsCreated.map((group) => (
                      <div key={group.id} className='text-sm text-blue-600'>
                        • {group.name} ({group.members.length} member
                        {group.members.length !== 1 ? "s" : ""})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.groupsUpdated && result.groupsUpdated.length > 0 && (
                <div className='p-3 bg-green-50 rounded-lg'>
                  <div className='font-medium text-green-700 mb-2'>
                    Existing Groups Updated ({result.groupsUpdated.length})
                  </div>
                  <div className='space-y-1'>
                    {result.groupsUpdated.map((group) => (
                      <div key={group.id} className='text-sm text-green-600'>
                        • {group.name} (now {group.members.length} member
                        {group.members.length !== 1 ? "s" : ""})
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categorized Error Details */}
        {result.errors.length > 0 && (
          <div className='space-y-4'>
            <h4 className='font-medium text-red-600'>
              Issues Found ({result.errors.length})
            </h4>

            {/* Validation Errors */}
            {errorsByType.validation && (
              <div className='space-y-2'>
                <h5 className='text-sm font-medium text-red-500'>
                  Validation Errors ({errorsByType.validation.length})
                </h5>
                <div className='max-h-40 overflow-y-auto space-y-2'>
                  {errorsByType.validation.map((error, index) => (
                    <ErrorItem key={`validation-${index}`} error={error} />
                  ))}
                </div>
              </div>
            )}

            {/* Duplicate Errors */}
            {errorsByType.duplicate && (
              <div className='space-y-2'>
                <h5 className='text-sm font-medium text-yellow-600'>
                  Duplicate Records ({errorsByType.duplicate.length})
                </h5>
                <div className='max-h-40 overflow-y-auto space-y-2'>
                  {errorsByType.duplicate.map((error, index) => (
                    <ErrorItem
                      key={`duplicate-${index}`}
                      error={error}
                      variant='warning'
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other Errors */}
            {errorsByType.other && (
              <div className='space-y-2'>
                <h5 className='text-sm font-medium text-red-500'>
                  Other Issues ({errorsByType.other.length})
                </h5>
                <div className='max-h-40 overflow-y-auto space-y-2'>
                  {errorsByType.other.map((error, index) => (
                    <ErrorItem key={`other-${index}`} error={error} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Created Attendees Preview */}
        {result.createdAttendees.length > 0 && (
          <div className='space-y-3'>
            <h4 className='font-medium text-green-600'>
              Created Attendees ({result.createdAttendees.length})
            </h4>
            <div className='max-h-40 overflow-y-auto'>
              <div className='grid gap-2'>
                {result.createdAttendees.slice(0, 10).map((attendee) => (
                  <div
                    key={attendee.id}
                    className='flex items-center justify-between p-2 bg-green-50 rounded'
                  >
                    <div className='flex items-center space-x-2'>
                      <span className='text-sm font-medium'>
                        {attendee.firstName} {attendee.lastName}
                      </span>
                      {attendee.groupId && (
                        <Badge variant='outline' className='text-xs'>
                          Group Member
                        </Badge>
                      )}
                    </div>
                    {attendee.email && (
                      <span className='text-xs text-muted-foreground'>
                        {attendee.email}
                      </span>
                    )}
                  </div>
                ))}
                {result.createdAttendees.length > 10 && (
                  <div className='text-sm text-muted-foreground text-center p-2'>
                    ... and {result.createdAttendees.length - 10} more
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Download Template Link */}
        <div className='pt-4 border-t'>
          <div className='flex items-center justify-between'>
            <div className='text-sm text-muted-foreground'>
              Need help with CSV format?
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => downloadCSVTemplate()}
            >
              Download Template
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ErrorItemProps {
  error: UploadError;
  variant?: "error" | "warning";
}

function ErrorItem({ error, variant = "error" }: ErrorItemProps) {
  const isWarning = variant === "warning";

  return (
    <div
      className={`flex items-start space-x-3 p-3 rounded-lg ${
        isWarning ? "bg-yellow-50" : "bg-red-50"
      }`}
    >
      <AlertCircle
        className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
          isWarning ? "text-yellow-500" : "text-red-500"
        }`}
      />
      <div className='flex-1 min-w-0'>
        <div className='flex items-center space-x-2 mb-1'>
          <Badge
            variant={isWarning ? "secondary" : "destructive"}
            className='text-xs'
          >
            Row {error.row}
          </Badge>
          <Badge variant='outline' className='text-xs'>
            {error.field}
          </Badge>
        </div>
        <p
          className={`text-sm ${
            isWarning ? "text-yellow-700" : "text-red-700"
          }`}
        >
          {error.message}
        </p>
        {error.value && (
          <p
            className={`text-xs mt-1 font-mono px-2 py-1 rounded ${
              isWarning
                ? "text-yellow-600 bg-yellow-100"
                : "text-red-600 bg-red-100"
            }`}
          >
            Value: &quot;{error.value}&quot;
          </p>
        )}
      </div>
    </div>
  );
}

// CSV Template Download Function
function downloadCSVTemplate() {
  const csvContent = [
    "firstName,lastName,email,groupName",
    "John,Doe,john.doe@example.com,Smith Family",
    "Jane,Smith,jane.smith@example.com,Smith Family",
    "Bob,Johnson,bob.johnson@example.com,",
    "Alice,Brown,,Friends Group",
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "attendees_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
