import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        glass: "0 0 0 1px rgba(255,255,255,0.75), 0 0 0 1.5px rgba(160,165,175,0.1) inset, 0 2px 8px rgba(0,0,0,0.04)",
        "glass-lg": "0 0 0 1px rgba(255,255,255,0.85), 0 0 0 1.5px rgba(160,165,175,0.12) inset, 0 8px 28px rgba(0,0,0,0.08)",
        card: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        "card-hover": "0 24px 64px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.08)",
        soft: "0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "hero-fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hero-fade-in-slow": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.5s ease both",
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 30s linear infinite",
        "hero-fade-in": "hero-fade-in 0.6s ease forwards",
        "hero-fade-in-slow": "hero-fade-in-slow 0.9s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
