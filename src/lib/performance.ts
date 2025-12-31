/**
 * Performance optimization utilities
 */

// Debounce utility for search inputs and API calls
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for scroll events and resize handlers
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Memory usage monitoring (development only)
export function logMemoryUsage(label: string): void {
  if (process.env.NODE_ENV === "development" && "memory" in performance) {
    const memory = (performance as any).memory;
    console.log(`Memory Usage - ${label}:`, {
      used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`,
    });
  }
}

// Performance timing utility
export function measurePerformance<T>(
  name: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  const start = performance.now();

  const result = fn();

  if (result instanceof Promise) {
    return result.finally(() => {
      const end = performance.now();
      console.log(`Performance - ${name}: ${(end - start).toFixed(2)}ms`);
    });
  } else {
    const end = performance.now();
    console.log(`Performance - ${name}: ${(end - start).toFixed(2)}ms`);
    return result;
  }
}

// Image optimization utility
export function getOptimizedImageUrl(
  src: string,
  width?: number,
  height?: number,
  quality: number = 75
): string {
  // For Next.js Image optimization
  if (src.startsWith("/")) {
    const params = new URLSearchParams();
    if (width) params.set("w", width.toString());
    if (height) params.set("h", height.toString());
    params.set("q", quality.toString());

    return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`;
  }

  return src;
}

// Preload critical resources
export function preloadResource(href: string, as: string, type?: string): void {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  if (type) link.type = type;

  document.head.appendChild(link);
}

// Prefetch next page resources
export function prefetchPage(href: string): void {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;

  document.head.appendChild(link);
}

// Bundle size analyzer (development only)
export function analyzeBundleSize(): void {
  if (process.env.NODE_ENV === "development") {
    // Log loaded modules for bundle analysis
    const scripts = Array.from(document.querySelectorAll("script[src]"));
    const totalSize = scripts.reduce((acc, script) => {
      const src = (script as HTMLScriptElement).src;
      if (src.includes("/_next/static/")) {
        console.log("Loaded script:", src);
      }
      return acc;
    }, 0);

    console.log("Total scripts loaded:", scripts.length);
  }
}

// Cache management utilities
export class CacheManager {
  private cache = new Map<
    string,
    { data: any; timestamp: number; ttl: number }
  >();

  set(key: string, data: any, ttlMs: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);

    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Global cache instance
export const globalCache = new CacheManager();

// Viewport utilities for responsive behavior
export function getViewportSize(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function isMobile(): boolean {
  return window.innerWidth < 768;
}

export function isTablet(): boolean {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isDesktop(): boolean {
  return window.innerWidth >= 1024;
}

// Network information (if available)
export function getNetworkInfo(): {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
} {
  if ("connection" in navigator) {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
    };
  }
  return {};
}

// Adaptive loading based on network conditions
export function shouldLoadHighQualityImages(): boolean {
  const networkInfo = getNetworkInfo();

  // Load high quality on fast connections
  if (
    networkInfo.effectiveType === "4g" &&
    networkInfo.downlink &&
    networkInfo.downlink > 1.5
  ) {
    return true;
  }

  // Default to lower quality on slower connections
  return false;
}
