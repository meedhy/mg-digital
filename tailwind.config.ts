import type { Config } from "tailwindcss";
import { colors, shadows, borderRadius } from "./design-tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-night": colors.blueNight,
        "sky-blue": colors.skyBlue,
        "off-white": colors.offWhite,
        "soft-black": colors.softBlack,
        gray: colors.gray,
        whatsapp: colors.whatsappGreen,
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        handwriting: ["var(--font-caveat)", "cursive"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": "clamp(1.75rem, 3vw, 2.5rem)",
        "display-md": "clamp(2.5rem, 5vw, 4rem)",
        "display-lg": "clamp(2.75rem, 8vw, 6.875rem)",
      },
      boxShadow: {
        "blue-sm": shadows["blue-sm"],
        "blue-md": shadows["blue-md"],
        "blue-lg": shadows["blue-lg"],
        "blue-xl": shadows["blue-xl"],
        "card-hover": shadows["card-hover"],
      },
      borderRadius: {
        sm: borderRadius.sm,
        md: borderRadius.md,
        lg: borderRadius.lg,
        full: borderRadius.full,
      },
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "200ms",
        slow: "350ms",
      },
    },
  },
  plugins: [],
};

export default config;
