import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#06060a",
        surface: {
          DEFAULT: "#0d0d14",
          light: "#13131f",
          lighter: "#1a1a2e",
        },
        accent: {
          DEFAULT: "#4f8fea",
          light: "#6ba3f5",
          dark: "#3a6fc2",
          cyan: "#38bdf8",
          purple: "#a78bfa",
          "purple-light": "#c4b5fd",
        },
        muted: {
          DEFAULT: "#64748b",
          light: "#94a3b8",
          dark: "#475569",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: [
          "var(--font-jetbrains)",
          "JetBrains Mono",
          "Fira Code",
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 20px rgba(79,143,234,0.15), 0 0 60px rgba(79,143,234,0.05)",
        "glow-lg": "0 0 30px rgba(79,143,234,0.25), 0 0 80px rgba(79,143,234,0.1)",
        "glow-purple": "0 0 20px rgba(167,139,250,0.15), 0 0 60px rgba(167,139,250,0.05)",
        "glow-purple-lg": "0 0 30px rgba(167,139,250,0.25), 0 0 80px rgba(167,139,250,0.1)",
        "glow-cyan": "0 0 20px rgba(56,189,248,0.15), 0 0 60px rgba(56,189,248,0.05)",
      },
      animation: {
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "grid-float": "gridFloat 20s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(79,143,234,0.15), 0 0 60px rgba(79,143,234,0.05)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(79,143,234,0.3), 0 0 80px rgba(79,143,234,0.12)",
          },
        },
        gridFloat: {
          "0%, 100%": { transform: "translateY(0) rotateX(0)" },
          "50%": { transform: "translateY(-20px) rotateX(2deg)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
