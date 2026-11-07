/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#02030A",
        ink: "#060A18",
        navy: "#0A1130",
        electric: "#2F7BFF",
        violet: "#8B5CF6",
        cyan: "#22D3EE",
        mist: "#A5B0D0",
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(47,123,255,0.55)",
        "glow-violet": "0 0 40px -8px rgba(139,92,246,0.55)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        gradient: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
        scrollDot: { "0%": { transform: "translateY(0)", opacity: 1 }, "100%": { transform: "translateY(16px)", opacity: 0 } },
        spinSlow: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        spinRev: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(-360deg)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        gradient: "gradient 6s linear infinite",
        "scroll-dot": "scrollDot 1.6s ease-in-out infinite",
        "spin-slow": "spinSlow 40s linear infinite",
        "spin-rev": "spinRev 40s linear infinite",
      },
    },
  },
  plugins: [],
};
