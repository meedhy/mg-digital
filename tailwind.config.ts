import type { Config } from "tailwindcss";
import { colors } from "./design-tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: colors.background,
        "canvas-soft": colors.backgroundSoft,
        ink: colors.textPrimary,
        accent: colors.accent,
        "accent-secondary": colors.accentSecondary,
        success: colors.success,
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        editorial: ["var(--font-instrument-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "8px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
