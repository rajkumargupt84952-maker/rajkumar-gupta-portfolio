import { PROFILE } from "../data/profile";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-8 text-center text-sm text-mist">
      © {new Date().getFullYear()} {PROFILE.name}. Crafted with React, Three.js, GSAP &amp; Framer Motion.
    </footer>
  );
}
