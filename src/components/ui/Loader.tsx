import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/useEnv";

/** Short branded intro. Waits for fonts, never blocks longer than ~2s, locks scroll while visible. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const reduce = usePrefersReducedMotion();
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const total = reduce ? 300 : 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
        Promise.race([fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 600))]).then(() => setGone(true));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = ""; onDone(); }}>
      {!gone && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-void"
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="relative grid h-28 w-28 place-items-center">
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan border-r-violet"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
            />
            <span className="font-display text-2xl font-extrabold text-gradient">RG</span>
          </div>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.35em] text-mist">Initialising experience</p>
          <div className="mt-5 h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-gradient-to-r from-cyan via-electric to-violet" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-3 font-mono text-sm text-white">{pct}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
