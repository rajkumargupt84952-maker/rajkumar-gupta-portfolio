import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Cog, Database, Wrench } from "lucide-react";
import { SKILL_GROUPS } from "../data/profile";
import Reveal, { SectionHeading } from "./ui/Reveal";
import Tilt from "./ui/Tilt";

const ICONS = { frontend: Code2, backend: Cog, database: Database, tools: Wrench } as const;
const TOTAL = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);

/** Skills orbiting a core — labels counter-rotate so they stay readable. */
function Orbit({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="relative mx-auto hidden h-[300px] w-[300px] sm:block" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
      <div className="absolute inset-8 rounded-full border border-white/5" />
      <div className="absolute inset-[88px] grid place-items-center rounded-full bg-gradient-to-br from-electric/40 to-violet/40 text-center font-display text-sm font-bold text-white shadow-glow backdrop-blur">
        {label}
      </div>
      <div className="absolute inset-0 animate-spin-slow">
        {items.map((it, i) => {
          const a = (360 / items.length) * i;
          return (
            <div key={it} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateY(-150px)` }}>
              <div style={{ transform: `rotate(${-a}deg)` }}>
                <div className="animate-spin-rev">
                  <span className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-cyan/40 bg-void/80 px-3 py-1 font-mono text-[11px] text-cyan">
                    {it}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeId, setActiveId] = useState(SKILL_GROUPS[0].id);
  const active = SKILL_GROUPS.find((g) => g.id === activeId) ?? SKILL_GROUPS[0];

  return (
    <section id="skills" className="section">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Technical skills"
          title={<>The toolkit behind <span className="text-gradient">every build</span>.</>}
          text="Pick a category. Bars show how much of my stack each one covers — real counts, not made-up percentages."
        />

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div role="tablist" aria-label="Skill categories" className="grid gap-3">
            {SKILL_GROUPS.map((g, i) => {
              const Icon = ICONS[g.id as keyof typeof ICONS];
              const on = g.id === activeId;
              return (
                <Reveal key={g.id} delay={i * 0.07}>
                  <Tilt max={6}>
                    <button
                      role="tab"
                      id={`tab-${g.id}`}
                      aria-selected={on}
                      aria-controls="skill-panel"
                      onClick={() => setActiveId(g.id)}
                      className={`glass w-full rounded-2xl p-5 text-left transition-all duration-300 ${on ? "glow-border shadow-glow" : "opacity-75 hover:opacity-100"}`}
                    >
                      <span className="flex items-center gap-4">
                        <span className={`grid h-11 w-11 place-items-center rounded-xl ${on ? "bg-gradient-to-br from-electric to-violet text-white" : "bg-white/5 text-cyan"}`}>
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="flex-1">
                          <span className="block font-display text-lg font-semibold text-white">{g.title}</span>
                          <span className="block text-sm text-mist">{g.items.length} technologies</span>
                        </span>
                      </span>
                      <span className="mt-4 block h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.span
                          className="block h-full rounded-full bg-gradient-to-r from-cyan via-electric to-violet"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(g.items.length / TOTAL) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </span>
                    </button>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div id="skill-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} className="glass glow-border min-h-[420px] rounded-[2rem] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-2xl font-bold text-white">{active.title}</h3>
                  <p className="mt-2 max-w-md text-mist">{active.blurb}</p>

                  <div className="my-8">
                    <Orbit items={active.items} label={active.title} />
                  </div>

                  <ul className="flex flex-wrap gap-2.5">
                    {active.items.map((it, i) => (
                      <motion.li
                        key={it}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.05 * i, type: "spring", stiffness: 260, damping: 20 }}
                        whileHover={{ y: -4, scale: 1.06 }}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:border-cyan/60 hover:shadow-glow"
                      >
                        {it}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
