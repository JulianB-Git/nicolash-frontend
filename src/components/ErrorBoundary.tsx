"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
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
              <CardTitle className='text-destructive'>
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                We encountered an unexpected error. Please try refreshing the
                page.
              </p>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className='text-xs'>
                  <summary className='cursor-pointer text-muted-foreground'>
                    Error details
                  </summary>
                  <pre className='mt-2 p-2 bg-muted rounded text-xs overflow-auto'>
                    {this.state.error.message}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              <Button
                onClick={() => window.location.reload()}
                className='w-full'
              >
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
