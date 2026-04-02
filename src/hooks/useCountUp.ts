import { useState, useEffect, useRef } from 'react';

/**
 * requestAnimationFrame-based counter that animates from 0 to a target value.
 * Used by LoadingScreen counter and StatsSection animated numbers.
 *
 * @param target  - The final number to reach
 * @param duration - Animation duration in milliseconds
 * @param enabled - Whether the animation should start
 * @returns The current animated value (integer)
 */
export function useCountUp(target: number, duration: number, enabled: boolean): number {
  const [value, setValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const previousValueRef = useRef(0);

  useEffect(() => {
    if (!enabled || target <= 0 || duration <= 0) {
      if (enabled && target === 0) {
        setValue(0);
      }
      return;
    }

    // Reset when starting
    setValue(0);
    previousValueRef.current = 0;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const nextValue = Math.min(Math.round(progress * target), target);

      // Ensure monotonic increase
      const monotonicValue = Math.max(nextValue, previousValueRef.current);
      previousValueRef.current = monotonicValue;
      setValue(monotonicValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, enabled]);

  return value;
}
