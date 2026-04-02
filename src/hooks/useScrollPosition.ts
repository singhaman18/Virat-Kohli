import { useState, useEffect } from 'react';

/**
 * Tracks the current vertical scroll position of the window.
 * Used by Navbar to determine when to apply backdrop blur (threshold > 50px).
 *
 * @returns The current window.scrollY value
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Set initial value
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollY;
}
