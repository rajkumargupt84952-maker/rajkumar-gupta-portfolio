import { Atom, Database, Gauge, Layers, Plug, Server, Workflow, type LucideIcon } from "lucide-react";
import { SERVICES } from "../data/profile";
import Reveal, { SectionHeading } from "./ui/Reveal";
import Tilt from "./ui/Tilt";

const ICONS: Record<(typeof SERVICES)[number]["icon"], LucideIcon> = {
  layers: Layers,
  plug: Plug,
  server: Server,
  atom: Atom,
  database: Database,
  workflow: Workflow,
  gauge: Gauge,
};

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title={<>How I can <span className="text-gradient">help you</span>.</>}
          text="Whether it’s a new product or an existing system that needs to scale, these are the things I do best."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 4) * 0.07} className={i === 0 ? "lg:col-span-2" : ""}>
                <Tilt max={10} className="h-full">
                  <div className="group glass glow-border flex h-full flex-col rounded-3xl p-6 transition-shadow duration-500 hover:shadow-glow">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-electric/80 to-violet/80 text-white shadow-glow transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm text-mist">{s.text}</p>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
