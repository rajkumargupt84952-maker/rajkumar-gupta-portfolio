import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import { PROFILE, ROLES } from "../data/profile";
import { useInView, useIsMobile, usePrefersReducedMotion } from "../hooks/useEnv";
import Magnetic from "./ui/Magnetic";

const HeroScene = lazy(() => import("./scene/HeroScene"));

function RoleRotator() {
  const reduce = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <span className="relative inline-block min-w-[2ch] align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          className="inline-block font-semibold text-cyan"
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.35 }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const reduce = usePrefersReducedMotion();
  const { ref: viewRef, visible } = useInView<HTMLDivElement>("0px");

  // Cinematic headline reveal, once the loader has gone
  useLayoutEffect(() => {
    if (!ready || reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-fade", { opacity: 0, y: 24, duration: 0.8, stagger: 0.12 })
        .from(".hero-word", { yPercent: 115, rotate: 4, duration: 1, stagger: 0.09 }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, "-=0.4");
    }, root);
    return () => ctx.revert();
  }, [ready, reduce]);

  const headline = PROFILE.tagline.split(" ");

  return (
    <section id="top" ref={root} className="relative flex min-h-screen items-center overflow-hidden">
      {/* ambient light */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-electric/25 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-violet/25 blur-[140px]" aria-hidden="true" />

      {/* 3D scene */}
      <div ref={viewRef} className="absolute inset-0 opacity-50 sm:opacity-100 lg:left-[28%]">
        {ready && (
          <Suspense fallback={null}>
            <HeroScene active={visible} mobile={mobile} reduce={reduce} />
          </Suspense>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent lg:via-void/40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" aria-hidden="true" />

      <div className="container-x relative z-10 pb-24 pt-32">
        <div className="max-w-3xl">
          <p className="hero-fade mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs text-cyan">
            <Sparkles size={14} aria-hidden="true" /> Open to new opportunities
          </p>

          <p className="hero-fade font-display text-xl font-semibold text-mist sm:text-2xl">Hi, I’m</p>
          <h2 className="hero-fade text-gradient font-display text-4xl font-extrabold leading-tight sm:text-6xl">{PROFILE.name}</h2>

          <h1 aria-label={PROFILE.tagline} className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {headline.map((w, i) => (
              <span key={i} aria-hidden="true" className="mr-[0.25em] inline-block overflow-hidden pb-1 align-top">
                <span className="hero-word inline-block">{w}</span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-6 max-w-xl text-lg text-mist">
            {PROFILE.subtitle}
          </p>
          <p className="hero-fade mt-3 text-lg text-slate-300">
            I craft <RoleRotator />
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <div className="hero-cta">
              <Magnetic>
                <a href="#work" className="btn btn-primary">
                  Explore My Work <ArrowRight size={18} aria-hidden="true" />
                </a>
              </Magnetic>
            </div>
            <div className="hero-cta">
              <Magnetic>
                <a href="#contact" className="btn btn-ghost">
                  Let’s Connect
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <a href="#about" aria-label="Scroll to About section" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <span className="flex h-11 w-7 justify-center rounded-full border border-white/30 pt-2">
          <span className="h-2 w-1 animate-scroll-dot rounded-full bg-cyan" />
        </span>
      </a>
    </section>
  );
}
