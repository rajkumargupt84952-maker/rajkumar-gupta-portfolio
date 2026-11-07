import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan via-electric to-violet shadow-[0_0_12px_rgba(47,123,255,0.9)]"
      style={{ scaleX }}
    />
  );
}
