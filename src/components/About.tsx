import { GraduationCap, MapPin, Briefcase } from "lucide-react";
import photo from "../assets/rajkumar.jpg";
import { PROFILE, STATS } from "../data/profile";
import Counter from "./ui/Counter";
import Reveal, { SectionHeading } from "./ui/Reveal";
import Tilt from "./ui/Tilt";

const JOURNEY = [
  "Started in full stack development as an intern, learning to ship across the whole MERN stack.",
  "Grew into building fintech products — investing flows, KYC / UCC onboarding and RTA data pipelines.",
  "Now designing REST APIs and backends for complex business logic, and adding AI to real products.",
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="About me"
          title={<>Engineer by craft, <span className="text-gradient">product thinker</span> by habit.</>}
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Tilt max={7} className="mx-auto max-w-sm">
              <div className="glass glow-border relative overflow-hidden rounded-[2rem] p-3 shadow-glow">
                <img src={photo} alt="Portrait of Raj Kumar Gupta" width={480} height={600} loading="lazy" className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top" />
                <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-2">
                  <span className="chip glass inline-flex items-center gap-1.5"><MapPin size={12} aria-hidden="true" />{PROFILE.location}</span>
                  <span className="chip glass inline-flex items-center gap-1.5"><Briefcase size={12} aria-hidden="true" />{PROFILE.years}+ yrs</span>
                </div>
              </div>
            </Tilt>
          </Reveal>

          <div>
            <Reveal delay={0.05}>
              <p className="text-lg leading-relaxed text-slate-300">
                I’m a Full Stack developer with <strong className="text-white">{PROFILE.years}+ years</strong> of experience building scalable web applications,
                complex backend systems and REST APIs — mostly for financial-technology products where correctness matters. I enjoy turning messy business rules
                into clean architecture, and wrapping them in interfaces people actually enjoy using.
              </p>
              <p className="mt-4 flex items-center gap-2 text-mist">
                <GraduationCap size={18} className="text-cyan" aria-hidden="true" /> {PROFILE.education}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <ol className="mt-8 space-y-4 border-l border-white/10 pl-6">
                {JOURNEY.map((j) => (
                  <li key={j} className="relative text-slate-300">
                    <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_12px_3px_rgba(34,211,238,0.7)]" aria-hidden="true" />
                    {j}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <Tilt max={10}>
                <div className="glass glow-border rounded-3xl p-6 text-center">
                  <p className="text-gradient font-display text-4xl font-extrabold sm:text-5xl">
                    {s.value !== undefined ? <Counter to={s.value} suffix={s.suffix} /> : s.text}
                  </p>
                  <p className="mt-2 text-sm text-mist">{s.label}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
