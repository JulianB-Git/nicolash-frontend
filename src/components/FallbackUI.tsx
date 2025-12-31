"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Users,
  Upload,
  Search,
  Settings,
} from "lucide-react";

interface FallbackUIProps {
  title?: string;
  description?: string;
  errorId?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  showHomeButton?: boolean;
  variant?: "default" | "compact" | "inline";
}

export function FallbackUI({
  title = "Something went wrong",
  description = "We encountered an unexpected error. Please try again.",
  errorId,
  onRetry,
  onGoHome,
  showHomeButton = true,
  variant = "default",
}: FallbackUIProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = "/";
    }
  };

  if (variant === "inline") {
    return (
      <Alert variant='destructive' className='my-4'>
        <AlertTriangle className='h-4 w-4' />
        <AlertDescription className='flex items-center justify-between'>
          <div>
            <div className='font-medium'>{title}</div>
            <div className='text-sm mt-1'>{description}</div>
            {errorId && (
              <div className='text-xs mt-2 opacity-75'>Error ID: {errorId}</div>
            )}
          </div>
          <Button onClick={handleRetry} size='sm' variant='outline'>
            <RefreshCw className='h-3 w-3 mr-1' />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (variant === "compact") {
    return (
      <Card className='max-w-sm mx-auto'>
        <CardContent className='pt-6 text-center space-y-4'>
          <AlertTriangle className='h-8 w-8 text-destructive mx-auto' />
          <div>
            <h3 className='font-medium text-destructive'>{title}</h3>
            <p className='text-sm text-muted-foreground mt-1'>{description}</p>
          </div>
          {errorId && (
            <div className='text-xs text-muted-foreground bg-muted p-2 rounded'>
              Error ID: {errorId}
            </div>
          )}
          <div className='flex gap-2'>
            <Button onClick={handleRetry} size='sm' className='flex-1'>
              <RefreshCw className='h-3 w-3 mr-1' />
              Retry
            </Button>
            {showHomeButton && (
              <Button onClick={handleGoHome} size='sm' variant='outline'>
                <Home className='h-3 w-3' />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <div className='min-h-[400px] flex items-center justify-center p-4'>
      <Card className='max-w-md w-full'>
        <CardHeader>
          <CardTitle className='text-destructive flex items-center gap-2'>
            <AlertTriangle className='h-5 w-5' />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-muted-foreground'>{description}</p>

          {errorId && (
            <div className='text-xs text-muted-foreground bg-muted p-2 rounded'>
              Error ID: {errorId}
            </div>
          )}

          <div className='flex gap-2'>
            <Button onClick={handleRetry} className='flex-1'>
              <RefreshCw className='h-4 w-4 mr-2' />
              Try Again
            </Button>
            {showHomeButton && (
              <Button
                onClick={handleGoHome}
                variant='outline'
                className='flex-1'
              >
                <Home className='h-4 w-4 mr-2' />
                Go Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Specific fallback components for different sections
export function AdminFallback({ errorId }: { errorId?: string }) {
  return (
    <FallbackUI
      title='Admin Dashboard Error'
      description='There was an error loading the admin dashboard. Please check your permissions and try again.'
      errorId={errorId}
      onGoHome={() => (window.location.href = "/admin")}
    />
  );
}

export function AttendeeListFallback({ errorId }: { errorId?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Users className='h-5 w-5' />
          Attendees
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FallbackUI
          title='Failed to load attendees'
          description='There was an error loading the attendee list. This might be a temporary issue.'
          errorId={errorId}
          variant='compact'
          showHomeButton={false}
          onRetry={() => window.location.reload()}
        />
      </CardContent>
    </Card>
  );
}

export function BulkUploadFallback({ errorId }: { errorId?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Upload className='h-5 w-5' />
          Bulk Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FallbackUI
          title='Upload system error'
          description='There was an error with the bulk upload system. Please try refreshing the page.'
          errorId={errorId}
          variant='compact'
          showHomeButton={false}
        />
      </CardContent>
    </Card>
  );
}

export function RSVPSearchFallback({ errorId }: { errorId?: string }) {
  return (
    <div className='max-w-2xl mx-auto'>
      <FallbackUI
        title='RSVP Search Error'
        description='There was an error with the RSVP search system. Please try refreshing the page or contact support if the issue persists.'
        errorId={errorId}
        variant='default'
      />
    </div>
  );
}

export function GroupManagementFallback({ errorId }: { errorId?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Users className='h-5 w-5' />
          Group Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FallbackUI
          title='Group management error'
          description='There was an error loading the group management system.'
          errorId={errorId}
          variant='compact'
          showHomeButton={false}
        />
      </CardContent>
    </Card>
  );
}

export function FormFallback({
  formName,
  errorId,
}: {
  formName: string;
  errorId?: string;
}) {
  return (
    <FallbackUI
      title={`${formName} Error`}
      description={`There was an error with the ${formName.toLowerCase()}. Please try again.`}
      errorId={errorId}
      variant='inline'
      showHomeButton={false}
    />
  );
}

// Generic loading error fallback
export function LoadingErrorFallback({
  resource,
  errorId,
}: {
  resource: string;
  errorId?: string;
}) {
  return (
    <Alert variant='destructive'>
      <AlertTriangle className='h-4 w-4' />
      <AlertDescription>
        <div className='font-medium'>Failed to load {resource}</div>
        <div className='text-sm mt-1'>
          There was an error loading the {resource}. Please try refreshing the
          page.
        </div>
        {errorId && (
          <div className='text-xs mt-2 opacity-75'>Error ID: {errorId}</div>
        )}
      </AlertDescription>
    </Alert>
  );
}
