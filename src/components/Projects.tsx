import { ExternalLink, Github, Lock } from "lucide-react";
import { PROFILE, PROJECTS, type Project } from "../data/profile";
import Reveal, { SectionHeading } from "./ui/Reveal";
import Tilt from "./ui/Tilt";

/** Generated thumbnail: gradient + grid + browser chrome + initials. No image files to ship. */
function Thumb({ p }: { p: Project }) {
  const [a, b] = p.accent;
  const initials = p.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} role="img" aria-label={`${p.name} preview artwork`}>
      <div className="absolute inset-0 bg-grid opacity-40 mix-blend-overlay" />
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/25 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-black/40 blur-3xl" />
      <div className="absolute inset-x-[10%] top-[14%] bottom-[-12%] rounded-t-xl border border-white/25 bg-void/70 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
          <span className="h-2 w-2 rounded-full bg-green-400/80" />
          <span className="ml-3 h-2 w-1/3 rounded-full bg-white/10" />
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          <span className="col-span-2 h-14 rounded-lg bg-white/10" />
          <span className="h-14 rounded-lg" style={{ background: `${a}66` }} />
          <span className="h-8 rounded-lg bg-white/5" />
          <span className="h-8 rounded-lg bg-white/5" />
          <span className="h-8 rounded-lg" style={{ background: `${b}66` }} />
        </div>
      </div>
      <span className="absolute right-4 top-3 font-display text-5xl font-extrabold text-white/80 drop-shadow-lg">{initials}</span>
    </div>
  );
}

function ProjectCard({ p, featured }: { p: Project; featured: boolean }) {
  return (
    <Tilt max={5} className="h-full">
      <article className={`glass glow-border flex h-full flex-col gap-6 rounded-[2rem] p-5 sm:p-6 ${featured ? "lg:grid lg:grid-cols-2 lg:gap-10 lg:p-8" : ""}`}>
        <Thumb p={p} />
        <div className="flex flex-1 flex-col">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan">{p.domain}</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">{p.name}</h3>
          <p className="mt-3 text-mist">{p.summary}</p>

          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {p.live ? (
              <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary !px-5 !py-2.5">
                Live Demo <ExternalLink size={16} aria-hidden="true" />
              </a>
            ) : (
              <span className="btn btn-ghost cursor-not-allowed !px-5 !py-2.5 opacity-60" aria-disabled="true" title="This project is not publicly hosted">
                <Lock size={15} aria-hidden="true" /> Private build
              </span>
            )}
            <a href={p.github ?? PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-ghost !px-5 !py-2.5" aria-label={`${p.name} on GitHub`}>
              <Github size={16} aria-hidden="true" /> GitHub
            </a>
          </div>
        </div>
      </article>
    </Tilt>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Featured projects"
          title={<>Products I’ve <span className="text-gradient">built &amp; shipped</span>.</>}
          text="From regulated fintech flows to developer tools — real products with real users."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08} className={i === 0 ? "lg:col-span-2" : ""}>
              <ProjectCard p={p} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
