/**
 * Enhanced error logging and tracking utilities
 */

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  additionalData?: Record<string, any>;
}

export interface ErrorReport {
  id: string;
  timestamp: string;
  message: string;
  stack?: string;
  context: ErrorContext;
  userAgent: string;
  url: string;
  level: "error" | "warning" | "info";
}

class ErrorLogger {
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Log an error with context information
   */
  logError(
    error: Error | string,
    context: ErrorContext = {},
    level: "error" | "warning" | "info" = "error"
  ): string {
    const errorId = this.generateErrorId();
    const errorMessage = typeof error === "string" ? error : error.message;
    const errorStack = typeof error === "string" ? undefined : error.stack;

    const errorReport: ErrorReport = {
      id: errorId,
      timestamp: new Date().toISOString(),
      message: errorMessage,
      stack: errorStack,
      context: {
        ...context,
        sessionId: this.sessionId,
      },
      userAgent: navigator.userAgent,
      url: window.location.href,
      level,
    };

    // Log to console with structured format
    this.logToConsole(errorReport);

    // In production, send to error tracking service
    if (process.env.NODE_ENV === "production") {
      this.sendToErrorService(errorReport);
    }

    return errorId;
  }

  /**
   * Log API errors with additional context
   */
  logApiError(
    error: Error,
    endpoint: string,
    method: string,
    statusCode?: number,
    responseData?: any
  ): string {
    return this.logError(error, {
      component: "API Client",
      action: `${method} ${endpoint}`,
      additionalData: {
        statusCode,
        responseData: responseData ? JSON.stringify(responseData) : undefined,
      },
    });
  }

  /**
   * Log component errors with component context
   */
  logComponentError(
    error: Error,
    componentName: string,
    action?: string,
    props?: Record<string, any>
  ): string {
    return this.logError(error, {
      component: componentName,
      action,
      additionalData: {
        props: props ? JSON.stringify(props) : undefined,
      },
    });
  }

  /**
   * Log form validation errors
   */
  logFormError(
    error: Error | string,
    formName: string,
    fieldName?: string,
    fieldValue?: any
  ): string {
    return this.logError(
      error,
      {
        component: "Form Validation",
        action: `${formName}${fieldName ? ` - ${fieldName}` : ""}`,
        additionalData: {
          fieldValue: fieldValue ? JSON.stringify(fieldValue) : undefined,
        },
      },
      "warning"
    );
  }

  /**
   * Log authentication errors
   */
  logAuthError(error: Error, action: string): string {
    return this.logError(error, {
      component: "Authentication",
      action,
    });
  }

  /**
   * Log user actions for debugging
   */
  logUserAction(action: string, data?: Record<string, any>): string {
    return this.logError(
      `User action: ${action}`,
      {
        component: "User Interaction",
        action,
        additionalData: data,
      },
      "info"
    );
  }

  private logToConsole(errorReport: ErrorReport): void {
    const { level, context, message, stack, id } = errorReport;

    const logMethod =
      level === "error"
        ? console.error
        : level === "warning"
        ? console.warn
        : console.info;

    console.group(
      `🚨 ${level.toUpperCase()}: ${context.component || "Application"}`
    );
    console.log("Error ID:", id);
    console.log("Message:", message);
    console.log("Context:", context);
    console.log("Timestamp:", errorReport.timestamp);
    console.log("URL:", errorReport.url);

    if (stack) {
      console.log("Stack:", stack);
    }

    if (context.additionalData) {
      console.log("Additional Data:", context.additionalData);
    }

    console.groupEnd();
  }

  private async sendToErrorService(errorReport: ErrorReport): Promise<void> {
    try {
      // Example: Send to error tracking service
      // Replace with your actual error tracking service (Sentry, LogRocket, etc.)

      // For now, we'll just store in localStorage for debugging
      const existingErrors = JSON.parse(
        localStorage.getItem("errorLogs") || "[]"
      );

      existingErrors.push(errorReport);

      // Keep only the last 50 errors to prevent storage bloat
      if (existingErrors.length > 50) {
        existingErrors.splice(0, existingErrors.length - 50);
      }

      localStorage.setItem("errorLogs", JSON.stringify(existingErrors));

      // In a real implementation, you would send to your error tracking service:
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorReport),
      // });
    } catch (err) {
      console.error("Failed to send error report:", err);
    }
  }

  /**
   * Get stored error logs (for debugging)
   */
  getStoredErrors(): ErrorReport[] {
    try {
      return JSON.parse(localStorage.getItem("errorLogs") || "[]");
    } catch {
      return [];
    }
  }

  /**
   * Clear stored error logs
   */
  clearStoredErrors(): void {
    localStorage.removeItem("errorLogs");
  }
}

// Export singleton instance
export const errorLogger = new ErrorLogger();

// Convenience functions for common error types
export const logError = (error: Error | string, context?: ErrorContext) =>
  errorLogger.logError(error, context);

export const logApiError = (
  error: Error,
  endpoint: string,
  method: string,
  statusCode?: number,
  responseData?: any
) => errorLogger.logApiError(error, endpoint, method, statusCode, responseData);

export const logComponentError = (
  error: Error,
  componentName: string,
  action?: string,
  props?: Record<string, any>
) => errorLogger.logComponentError(error, componentName, action, props);

export const logFormError = (
  error: Error | string,
  formName: string,
  fieldName?: string,
  fieldValue?: any
) => errorLogger.logFormError(error, formName, fieldName, fieldValue);

export const logAuthError = (error: Error, action: string) =>
  errorLogger.logAuthError(error, action);

export const logUserAction = (action: string, data?: Record<string, any>) =>
  errorLogger.logUserAction(action, data);
