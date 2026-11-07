import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useMedia } from "../../hooks/useEnv";

interface Props {
  children: ReactNode;
  className?: string;
  max?: number;
}

/** 3D tilt that follows the pointer, with a moving glare. */
export default function Tilt({ children, className = "", max = 9 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const off = useMedia("(pointer: coarse), (prefers-reduced-motion: reduce)");
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(380px circle at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 60%)`;
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 140, damping: 20 });

  const move = (e: React.PointerEvent) => {
    if (off || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx.set((0.5 - py) * max * 2);
    ry.set((px - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
    glareOpacity.set(1);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: glare, opacity: glareOpacity }}
      />
    </motion.div>
  );
}
