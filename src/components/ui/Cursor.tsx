import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMedia } from "../../hooks/useEnv";

const HOT = "a, button, input, textarea, [data-cursor='hot']";

/** Glowing dot + lagging ring. Only on fine pointers without reduced motion. */
export default function Cursor() {
  const enabled = useMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);
  const [shown, setShown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setShown(true);
    };
    const over = (e: PointerEvent) => setHot(!!(e.target as Element)?.closest?.(HOT));
    const d = () => setDown(true);
    const u = () => setDown(false);
    const leave = () => setShown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerdown", d);
    document.addEventListener("pointerup", u);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerdown", d);
      document.removeEventListener("pointerup", u);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]" style={{ opacity: shown ? 1 : 0 }}>
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-cyan/70 mix-blend-screen"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hot ? 64 : down ? 22 : 36, height: hot ? 64 : down ? 22 : 36, backgroundColor: hot ? "rgba(34,211,238,0.15)" : "rgba(34,211,238,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      <motion.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-cyan shadow-[0_0_14px_3px_rgba(34,211,238,0.9)]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}
