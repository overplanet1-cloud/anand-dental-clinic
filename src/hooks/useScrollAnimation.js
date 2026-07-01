import { useState, useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────────
   useScrollAnimation
   –  Scroll-triggered visibility hook powered by
      IntersectionObserver.
   ───────────────────────────────────────────────── */

/**
 * Detects when a referenced DOM element enters the viewport.
 *
 * @param {Object}  options
 * @param {number}  [options.threshold=0.1]      – visibility ratio (0‑1) needed to trigger
 * @param {string}  [options.rootMargin='0px']   – margin around the root (CSS-style)
 * @param {boolean} [options.triggerOnce=true]    – if true, unobserves after first intersection
 *
 * @returns {[React.MutableRefObject, boolean]}  [ref, isInView]
 *
 * @example
 * const [ref, isInView] = useScrollAnimation({ threshold: 0.2 });
 * return (
 *   <div ref={ref} className={isInView ? 'opacity-100' : 'opacity-0'}>
 *     Hello
 *   </div>
 * );
 */
const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
} = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Keep a stable ref to the observer so we can disconnect cleanly
  const observerRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const [entry] = entries;
      if (!entry) return;

      if (entry.isIntersecting) {
        setIsInView(true);

        if (triggerOnce && observerRef.current && ref.current) {
          observerRef.current.unobserve(ref.current);
        }
      } else if (!triggerOnce) {
        // Allow toggling back to false when element leaves viewport
        setIsInView(false);
      }
    },
    [triggerOnce],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Guard: IntersectionObserver may not exist in SSR / very old browsers
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true); // graceful fallback – always visible
      return;
    }

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    observerRef.current = observer;
    observer.observe(node);

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [threshold, rootMargin, handleIntersect]);

  return [ref, isInView];
};

export default useScrollAnimation;
