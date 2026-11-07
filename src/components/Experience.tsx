import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2 } from "lucide-react";
import { EXPERIENCE } from "../data/profile";
import { usePrefersReducedMotion } from "../hooks/useEnv";
import { SectionHeading } from "./ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      // The glowing line draws itself as you scroll
      gsap.fromTo(
        ".tl-fill",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl-wrap", start: "top 70%", end: "bottom 60%", scrub: 0.6 } }
      );
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((el) => {
        gsap.from(el, { opacity: 0, x: 60, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%" } });
        gsap.from(el.querySelector(".tl-dot"), { scale: 0, duration: 0.6, ease: "back.out(3)", scrollTrigger: { trigger: el, start: "top 82%" } });
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="experience" className="section" ref={root}>
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title={<>The <span className="text-gradient">journey</span> so far.</>}
        />

        <div className="tl-wrap relative ml-3 sm:ml-6">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/10" aria-hidden="true" />
          <div className="tl-fill absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-cyan via-electric to-violet shadow-[0_0_14px_2px_rgba(47,123,255,0.8)]" aria-hidden="true" />

          <ol className="space-y-12">
            {EXPERIENCE.map((job) => (
              <li key={job.company} className="tl-item relative pl-10 sm:pl-14">
                <span className="tl-dot absolute -left-[9px] top-6 grid h-[19px] w-[19px] place-items-center rounded-full bg-void ring-2 ring-cyan shadow-[0_0_18px_4px_rgba(34,211,238,0.65)]" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-cyan" />
                </span>
                <div className="glass glow-border rounded-3xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{job.role}</h3>
                      <p className="mt-1 flex items-center gap-2 text-cyan"><Building2 size={16} aria-hidden="true" /> {job.company}</p>
                    </div>
                    <span className="chip">{job.period}</span>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-slate-300">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
