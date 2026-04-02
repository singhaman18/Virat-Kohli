import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountUp } from './useCountUp';

describe('useCountUp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return 0 when not enabled', () => {
    const { result } = renderHook(() => useCountUp(100, 2700, false));
    expect(result.current).toBe(0);
  });

  it('should return 0 initially when enabled', () => {
    const { result } = renderHook(() => useCountUp(100, 2700, true));
    // Before any animation frame fires, value starts at 0
    expect(result.current).toBe(0);
  });

  it('should reach target value after duration', async () => {
    const { result } = renderHook(() => useCountUp(100, 1000, true));

    // Advance past the full duration
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    expect(result.current).toBe(100);
  });

  it('should handle target of 0', () => {
    const { result } = renderHook(() => useCountUp(0, 1000, true));
    expect(result.current).toBe(0);
  });

  it('should animate to a small target value', async () => {
    const { result } = renderHook(() => useCountUp(5, 500, true));

    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    expect(result.current).toBe(5);
  });

  it('should start animating when enabled changes to true', async () => {
    const { result, rerender } = renderHook(
      ({ enabled }) => useCountUp(100, 1000, enabled),
      { initialProps: { enabled: false } }
    );

    expect(result.current).toBe(0);

    rerender({ enabled: true });

    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    expect(result.current).toBe(100);
  });

  it('should produce monotonically increasing values', async () => {
    const values: number[] = [];
    const { result } = renderHook(() => useCountUp(100, 1000, true));

    values.push(result.current);

    for (let i = 0; i < 20; i++) {
      await act(async () => {
        vi.advanceTimersByTime(60);
      });
      values.push(result.current);
    }

    // Verify monotonic increase
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });
});
