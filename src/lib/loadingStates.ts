/**
 * Loading states utility functions and types for consistent async operation feedback
 */

export type LoadingState = "idle" | "loading" | "success" | "error";

export interface AsyncOperationState<T = any> {
  state: LoadingState;
  data?: T;
  error?: string;
}

export interface LoadingStateManager<T = any> {
  state: AsyncOperationState<T>;
  setLoading: () => void;
  setSuccess: (data?: T) => void;
  setError: (error: string) => void;
  setIdle: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
}

/**
 * Create a loading state manager for async operations
 */
export function createLoadingStateManager<T = any>(
  initialState: AsyncOperationState<T> = { state: "idle" }
): LoadingStateManager<T> {
  let currentState = { ...initialState };
  const listeners: Array<(state: AsyncOperationState<T>) => void> = [];

  const notify = () => {
    listeners.forEach((listener) => listener(currentState));
  };

  const setLoading = () => {
    currentState = { state: "loading", error: undefined };
    notify();
  };

  const setSuccess = (data?: T) => {
    currentState = { state: "success", data, error: undefined };
    notify();
  };

  const setError = (error: string) => {
    currentState = { state: "error", error, data: undefined };
    notify();
  };

  const setIdle = () => {
    currentState = { state: "idle", error: undefined, data: undefined };
    notify();
  };

  return {
    get state() {
      return currentState;
    },
    setLoading,
    setSuccess,
    setError,
    setIdle,
    get isLoading() {
      return currentState.state === "loading";
    },
    get isSuccess() {
      return currentState.state === "success";
    },
    get isError() {
      return currentState.state === "error";
    },
    get isIdle() {
      return currentState.state === "idle";
    },
  };
}

/**
 * Async operation wrapper with automatic loading state management
 */
export async function withLoadingState<T>(
  operation: () => Promise<T>,
  stateManager: LoadingStateManager<T>
): Promise<T> {
  try {
    stateManager.setLoading();
    const result = await operation();
    stateManager.setSuccess(result);
    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    stateManager.setError(errorMessage);
    throw error;
  }
}

/**
 * Debounced loading state for search operations
 */
export function createDebouncedLoader<T>(
  operation: (query: string) => Promise<T>,
  delay: number = 300
) {
  let timeoutId: NodeJS.Timeout | null = null;
  let currentQuery = "";

  return {
    load: (query: string): Promise<T> => {
      currentQuery = query;

      return new Promise((resolve, reject) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(async () => {
          // Only proceed if this is still the current query
          if (query === currentQuery) {
            try {
              const result = await operation(query);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }
        }, delay);
      });
    },
    cancel: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    },
  };
}

/**
 * Progress tracking for file uploads and long operations
 */
export interface ProgressTracker {
  progress: number;
  stage: string;
  isComplete: boolean;
  error?: string;
}

export function createProgressTracker(stages: string[] = []): {
  tracker: ProgressTracker;
  setProgress: (progress: number, stage?: string) => void;
  nextStage: (stage?: string) => void;
  setError: (error: string) => void;
  complete: () => void;
  reset: () => void;
} {
  let currentTracker: ProgressTracker = {
    progress: 0,
    stage: stages[0] || "Starting...",
    isComplete: false,
  };

  let currentStageIndex = 0;

  const setProgress = (progress: number, stage?: string) => {
    currentTracker = {
      ...currentTracker,
      progress: Math.max(0, Math.min(100, progress)),
      stage: stage || currentTracker.stage,
      error: undefined,
    };
  };

  const nextStage = (stage?: string) => {
    currentStageIndex = Math.min(currentStageIndex + 1, stages.length - 1);
    const nextStageName = stage || stages[currentStageIndex] || "Processing...";
    const progressIncrement = 100 / stages.length;

    setProgress(
      Math.min((currentStageIndex + 1) * progressIncrement, 95),
      nextStageName
    );
  };

  const setError = (error: string) => {
    currentTracker = {
      ...currentTracker,
      error,
      isComplete: false,
    };
  };

  const complete = () => {
    currentTracker = {
      ...currentTracker,
      progress: 100,
      stage: "Complete",
      isComplete: true,
      error: undefined,
    };
  };

  const reset = () => {
    currentTracker = {
      progress: 0,
      stage: stages[0] || "Starting...",
      isComplete: false,
      error: undefined,
    };
    currentStageIndex = 0;
  };

  return {
    get tracker() {
      return currentTracker;
    },
    setProgress,
    nextStage,
    setError,
    complete,
    reset,
  };
}

/**
 * Retry mechanism with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error");

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
