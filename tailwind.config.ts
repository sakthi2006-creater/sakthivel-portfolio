import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        text: {
          primary: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
        },
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        border: "hsla(var(--border) / var(--border-opacity))",
        neon: {
          blue: "hsl(var(--primary))",
          purple: "hsl(var(--secondary))",
          cyan: "hsl(var(--accent))",
        },
        glass: {
          white: "rgba(255,255,255,0.04)",
          border: "rgba(255,255,255,0.08)",
        },
      },
      boxShadow: {
        glow: "0 0 30px hsla(var(--accent) / 0.35)",
        "glow-blue": "0 0 30px hsla(var(--primary) / 0.35)",
        "glow-purple": "0 0 30px hsla(var(--secondary) / 0.35)",
        glass: "0 8px 32px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "neon-gradient": "linear-gradient(135deg, #2B7CFF, #8B5CFF, #27F7FF)",
        "dark-gradient": "linear-gradient(180deg, #000 0%, #050510 100%)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.5s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
