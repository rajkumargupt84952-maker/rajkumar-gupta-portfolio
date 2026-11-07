import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

/** Fades and lifts content in as it scrolls into view. */
export default function Reveal({ children, delay = 0, className, y = 36 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg text-mist">{text}</p>}
    </Reveal>
  );
}
