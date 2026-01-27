import { useInView } from "react-intersection-observer";

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, triggerOnce = true } = options;

  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  return { ref, inView };
}
