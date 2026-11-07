import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Heavy 3D libs live in their own cacheable chunk, lazy-loaded after first paint
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          motion: ["framer-motion", "gsap"],
        },
      },
    },
  },
});
