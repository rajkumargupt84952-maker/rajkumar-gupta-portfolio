import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/useEnv";

/** Counts from 0 to `to` the first time it scrolls into view. */
export default function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = usePrefersReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
