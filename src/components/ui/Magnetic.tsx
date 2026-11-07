import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMedia } from "../../hooks/useEnv";

/** Wraps children so they pull toward the pointer. Disabled on touch / reduced motion. */
export default function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const off = useMedia("(pointer: coarse), (prefers-reduced-motion: reduce)");

  const move = (e: React.PointerEvent) => {
    if (off || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x, y, display: "inline-block" }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.div>
  );
}
