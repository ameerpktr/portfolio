import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Manrope", "sans-serif"],
        display: ["var(--font-display)", "Manrope", "sans-serif"]
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        accent: "hsl(var(--accent))",
        card: "hsl(var(--card))",
        "card-soft": "hsl(var(--card-soft))"
      },
      boxShadow: {
        glow: "0 0 60px rgba(59, 130, 246, 0.26)",
        violet: "0 0 90px rgba(168, 85, 247, 0.22)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 1px 1px, rgba(255,255,255,.13) 1px, transparent 0)"
      }
    }
  },
  plugins: [animate]
};

export default config;
