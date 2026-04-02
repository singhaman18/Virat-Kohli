import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Intersection Observer hook that returns whether an element is in the viewport.
 * Falls back to immediately returning true if IntersectionObserver is not supported.
 *
 * @param options - IntersectionObserver configuration
 * @returns [ref, inView] - A ref to attach to the target element and a boolean indicating visibility
 */
export function useInView(options: UseInViewOptions = {}): [RefObject<HTMLDivElement | null>, boolean] {
  const { threshold = 0, rootMargin = '0px', triggerOnce = false } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Fallback: if IntersectionObserver is not supported, immediately return true
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);

        if (isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView];
}
