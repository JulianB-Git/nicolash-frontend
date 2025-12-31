"use client";

import { useEffect } from "react";
import { logMemoryUsage, analyzeBundleSize } from "@/lib/performance";

interface PerformanceMonitorProps {
  enabled?: boolean;
}

export default function PerformanceMonitor({
  enabled = process.env.NODE_ENV === "development",
}: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enabled) return;

    // Log initial performance metrics
    logMemoryUsage("Initial Load");
    analyzeBundleSize();

    // Monitor Core Web Vitals
    if ("web-vital" in window) {
      // This would integrate with a real performance monitoring service
      console.log("Performance monitoring enabled");
    }

    // Monitor memory usage periodically
    const memoryInterval = setInterval(() => {
      logMemoryUsage("Periodic Check");
    }, 30000); // Every 30 seconds

    // Monitor page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        logMemoryUsage("Page Visible");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(memoryInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);

  // This component doesn't render anything
  return null;
}

// Web Vitals reporting (for production monitoring)
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === "production") {
    // In production, you would send these metrics to your analytics service
    console.log("Web Vital:", metric);

    // Example: Send to analytics service
    // analytics.track('Web Vital', {
    //   name: metric.name,
    //   value: metric.value,
    //   id: metric.id,
    //   label: metric.label,
    // });
  }
}
