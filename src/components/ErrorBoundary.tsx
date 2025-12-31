"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  context?: string; // Context for better error tracking
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Generate a unique error ID for tracking
    const errorId = `err_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    return { hasError: true, error, errorId };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { context, onError } = this.props;
    const { errorId } = this.state;

    // Enhanced error logging with context
    const errorDetails = {
      errorId,
      context: context || "Unknown",
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Log to console with structured data
    console.group(`🚨 Error Boundary: ${context || "Application Error"}`);
    console.error("Error ID:", errorId);
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Full Details:", errorDetails);
    console.groupEnd();

    // Enhanced error logging
    try {
      // Import error logger dynamically to avoid circular dependencies
      import("@/lib/errorLogging").then(({ errorLogger }) => {
        errorLogger.logComponentError(
          error,
          `ErrorBoundary - ${context || "Unknown"}`,
          "Component Error",
          {
            componentStack: errorInfo.componentStack,
            errorId,
          }
        );
      });
    } catch (loggingError) {
      console.error("Failed to log error:", loggingError);
    }

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === "production") {
      // Example: Send to error tracking service
      // errorTrackingService.captureException(error, errorDetails);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='min-h-screen flex items-center justify-center p-4'>
          <Card className='max-w-md w-full'>
            <CardHeader>
              <CardTitle className='text-destructive flex items-center gap-2'>
                <AlertTriangle className='h-5 w-5' />
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                We encountered an unexpected error in the{" "}
                {this.props.context || "application"}. Please try refreshing the
                page or go back to the home page.
              </p>

              {/* Error ID for support */}
              {this.state.errorId && (
                <div className='text-xs text-muted-foreground bg-muted p-2 rounded'>
                  Error ID: {this.state.errorId}
                </div>
              )}

              {/* Development error details */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className='text-xs'>
                  <summary className='cursor-pointer text-muted-foreground hover:text-foreground'>
                    Error details (development only)
                  </summary>
                  <pre className='mt-2 p-2 bg-muted rounded text-xs overflow-auto max-h-32'>
                    {this.state.error.message}
                    {"\n\n"}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className='flex gap-2'>
                <Button
                  onClick={() => window.location.reload()}
                  className='flex-1'
                  variant='default'
                >
                  <RefreshCw className='h-4 w-4 mr-2' />
                  Refresh Page
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant='outline'
                  className='flex-1'
                >
                  <Home className='h-4 w-4 mr-2' />
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
