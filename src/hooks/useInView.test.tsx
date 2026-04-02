import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { useInView } from './useInView';

describe('useInView', () => {
  let capturedCallback: IntersectionObserverCallback | null = null;
  let mockObserve: ReturnType<typeof vi.fn>;
  let mockUnobserve: ReturnType<typeof vi.fn>;
  const originalIO = globalThis.IntersectionObserver;

  beforeEach(() => {
    capturedCallback = null;
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();

    // Use a class so `new IntersectionObserver(...)` works
    class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        capturedCallback = callback;
      }
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = vi.fn();
      root = null;
      rootMargin = '0px';
      thresholds = [0];
      takeRecords = () => [] as IntersectionObserverEntry[];
    }

    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
    vi.restoreAllMocks();
  });

  function TestComponent({ options = {} }: { options?: Parameters<typeof useInView>[0] }) {
    const [ref, inView] = useInView(options);
    return (
      <div ref={ref} data-testid="target" data-inview={String(inView)}>
        {inView ? 'visible' : 'hidden'}
      </div>
    );
  }

  it('should start with inView as false', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('target').dataset.inview).toBe('false');
  });

  it('should observe the element on mount', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(mockObserve).toHaveBeenCalledWith(getByTestId('target'));
  });

  it('should set inView to true when element intersects', () => {
    const { getByTestId } = render(<TestComponent />);

    act(() => {
      capturedCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(getByTestId('target').dataset.inview).toBe('true');
    expect(getByTestId('target').textContent).toBe('visible');
  });

  it('should set inView back to false when element leaves viewport', () => {
    const { getByTestId } = render(<TestComponent />);

    act(() => {
      capturedCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(getByTestId('target').dataset.inview).toBe('true');

    act(() => {
      capturedCallback!(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(getByTestId('target').dataset.inview).toBe('false');
  });

  it('should return true immediately when IntersectionObserver is not supported', () => {
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('target').dataset.inview).toBe('true');

    globalThis.IntersectionObserver = originalIO;
  });

  it('should unobserve after first intersection when triggerOnce is true', () => {
    const { getByTestId } = render(<TestComponent options={{ triggerOnce: true }} />);
    const element = getByTestId('target');

    act(() => {
      capturedCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(element.dataset.inview).toBe('true');
    expect(mockUnobserve).toHaveBeenCalledWith(element);
  });
});
