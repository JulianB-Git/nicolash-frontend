"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
  variant?: "default" | "primary" | "success" | "warning" | "error";
}

export default function LoadingSpinner({
  size = "md",
  className,
  text,
  variant = "default",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const variantClasses = {
    default: "border-gray-900",
    primary: "border-blue-600",
    success: "border-green-600",
    warning: "border-yellow-600",
    error: "border-red-600",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-b-2",
          sizeClasses[size],
          variantClasses[variant]
        )}
        role='status'
        aria-label={text || "Loading"}
      />
      {text && (
        <p className='text-muted-foreground mt-2 text-sm' aria-live='polite'>
          {text}
        </p>
      )}
    </div>
  );
}

// Additional loading components for specific use cases

interface LoadingButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  loadingText?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function LoadingButton({
  children,
  isLoading,
  loadingText,
  disabled,
  className,
  onClick,
  type = "button",
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      aria-disabled={isLoading || disabled}
    >
      {isLoading && <LoadingSpinner size='xs' />}
      {isLoading ? loadingText || "Loading..." : children}
    </button>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  children: React.ReactNode;
  className?: string;
}

export function LoadingOverlay({
  isLoading,
  text,
  children,
  className,
}: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className='absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10'>
          <LoadingSpinner text={text} />
        </div>
      )}
    </div>
  );
}

interface ProgressIndicatorProps {
  progress: number;
  text?: string;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressIndicator({
  progress,
  text,
  className,
  showPercentage = true,
}: ProgressIndicatorProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={cn("space-y-2", className)}>
      {(text || showPercentage) && (
        <div className='flex justify-between items-center text-sm'>
          {text && <span className='text-muted-foreground'>{text}</span>}
          {showPercentage && (
            <span className='font-medium'>{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}
      <div className='w-full bg-gray-200 rounded-full h-2'>
        <div
          className='bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out'
          style={{ width: `${clampedProgress}%` }}
          role='progressbar'
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
