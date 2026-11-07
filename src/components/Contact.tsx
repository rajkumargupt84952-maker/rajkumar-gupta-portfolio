import { lazy, Suspense, useState, type FormEvent } from "react";
import { Download, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { PROFILE } from "../data/profile";
import { useInView, useIsMobile, usePrefersReducedMotion } from "../hooks/useEnv";
import Magnetic from "./ui/Magnetic";
import Reveal, { SectionHeading } from "./ui/Reveal";

const ContactScene = lazy(() => import("./scene/ContactScene"));

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };

const field =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan/70 focus:bg-white/10 focus:shadow-glow";

/**
 * Optional: set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to POST submissions.
 * Without it the form opens the visitor's email app with the message pre-filled.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

export default function Contact() {
  const mobile = useIsMobile();
  const reduce = usePrefersReducedMotion();
  const { ref, visible, seen } = useInView<HTMLElement>("300px");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const resumeHref = PROFILE.resume || `mailto:${PROFILE.email}?subject=${encodeURIComponent("Resume request")}`;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.website) return; // honeypot

    if (ENDPOINT) {
      setStatus({ kind: "sending" });
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error();
        form.reset();
        setStatus({ kind: "ok", msg: "Message sent — I’ll get back to you soon." });
      } catch {
        setStatus({ kind: "error", msg: `Couldn’t send. Please email me at ${PROFILE.email}.` });
      }
      return;
    }

    const body = `${data.message}\n\n— ${data.name} (${data.email})`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "ok", msg: "Opening your email app with the message ready to send." });
  };

  return (
    <section id="contact" ref={ref} className="section overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/60 to-void" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-electric/20 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet/20 blur-[130px]" />
        {!mobile && seen && (
          <Suspense fallback={null}>
            <ContactScene active={visible} reduce={reduce} />
          </Suspense>
        )}
      </div>

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Contact"
          title={<>Let’s build something <span className="text-gradient">remarkable</span>.</>}
          text="Open to full-time roles, freelance work and product ideas. Send a message and I’ll reply soon."
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <form onSubmit={onSubmit} className="glass glow-border space-y-4 rounded-[2rem] p-6 sm:p-8" aria-label="Contact form">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-mist">Name</span>
                  <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-mist">Email</span>
                  <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm text-mist">Subject</span>
                <input name="subject" required placeholder="What’s this about?" className={field} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-mist">Message</span>
                <textarea name="message" required rows={5} placeholder="Tell me about your project or role…" className={`${field} resize-none`} />
              </label>
              {/* honeypot: hidden from people, tempting to bots */}
              <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Magnetic>
                  <button type="submit" disabled={status.kind === "sending"} className="btn btn-primary disabled:opacity-60">
                    {status.kind === "sending" ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
                    {status.kind === "sending" ? "Sending…" : "Send message"}
                  </button>
                </Magnetic>
                <p role="status" aria-live="polite" className={`text-sm ${status.kind === "error" ? "text-red-400" : "text-cyan"}`}>
                  {status.msg}
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="grid content-start gap-4">
            {[
              { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
              { icon: Linkedin, label: "LinkedIn", value: "rajkumar-gupta", href: PROFILE.linkedin },
              { icon: Github, label: "GitHub", value: "rajkumargupt84952-maker", href: PROFILE.github },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass glow-border group flex items-center gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-electric to-violet text-white shadow-glow">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-widest text-mist">{label}</span>
                  <span className="block truncate font-medium text-white">{value}</span>
                </span>
              </a>
            ))}

            <Magnetic>
              <a href={resumeHref} {...(PROFILE.resume ? { download: true } : {})} className="btn btn-ghost w-full">
                <Download size={18} aria-hidden="true" /> {PROFILE.resume ? "Download Resume" : "Request Resume"}
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
