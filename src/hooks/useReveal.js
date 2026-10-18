import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element once, the first time it enters the viewport.
 *
 * Deliberately one-shot: content that re-animates every time it scrolls back
 * into view is distracting, and re-running observers costs more than it gains.
 *
 * Under prefers-reduced-motion the element starts visible and no observer is
 * created at all.
 *
 * @param {{ rootMargin?: string, threshold?: number }} options
 * @returns {[React.RefObject, boolean]} ref to attach, and whether it is shown
 */
export default function useReveal({ rootMargin = '0px 0px -10% 0px', threshold = 0.1 } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => {
    if (typeof window === 'undefined') return true; // SSR / smoke tests
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browser) — show immediately.
    if (!('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shown, rootMargin, threshold]);

  return [ref, shown];
}
