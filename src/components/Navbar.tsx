import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/profile";

export default function Navbar({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
    >
      <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${scrolled ? "glass shadow-glow" : "border border-transparent"}`}>
        <a href="#top" aria-label="Back to top" className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-electric to-violet font-display text-sm font-extrabold text-white shadow-glow">
          RG
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === l.href ? "text-white" : "text-mist hover:text-white"}`}
            >
              {active === l.href && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="grid h-10 w-10 place-items-center rounded-full glass text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={`block border-b border-white/5 px-6 py-4 text-base font-medium last:border-0 ${active === l.href ? "text-cyan" : "text-slate-200"}`}>
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
