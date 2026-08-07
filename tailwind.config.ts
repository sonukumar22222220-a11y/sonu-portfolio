import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050a08",
        surface: "#0b1310",
        accent: "#00FF87",
        accent2: "#10b981",
        line: "rgba(0,255,135,0.12)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glow: {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        gridpan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "48px 48px" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        glow: "glow 3s ease-in-out infinite",
        gridpan: "gridpan 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
