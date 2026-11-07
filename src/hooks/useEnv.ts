import { useEffect, useState } from "react";

/** Subscribes to a media query. SSR-safe, updates live. */
export function useMedia(query: string, initial = false) {
  const [match, setMatch] = useState(() =>
    typeof window === "undefined" ? initial : window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** Small screens / touch devices get a lighter 3D scene. */
export const useIsMobile = () => useMedia("(max-width: 767px), (pointer: coarse)");
export const usePrefersReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");

/** True once the element has been on screen (and stays true), plus live visibility. */
export function useInView<T extends Element>(rootMargin = "200px") {
  const [el, setEl] = useState<T | null>(null);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [el, rootMargin]);
  return { ref: setEl, visible, seen };
}
