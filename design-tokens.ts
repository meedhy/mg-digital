export const colors = {
  blueNight: "#0A1172",
  skyBlue: "#4DA6FF",
  offWhite: "#F8F8F6",
  softBlack: "#0D0D0D",
  gray: "#6B7280",
  whatsappGreen: "#25D366",
} as const;

export const fonts = {
  display: "Playfair Display",
  handwriting: "Caveat",
  body: "Inter",
} as const;

export const fontWeights = {
  display: [400, 700, 800] as const,
  displayItalic: [800] as const,
  handwriting: [400, 700] as const,
  body: [300, 400, 500, 600] as const,
};

export const shadows = {
  "blue-sm": "0 2px 8px rgba(10, 17, 114, 0.08)",
  "blue-md": "0 4px 16px rgba(10, 17, 114, 0.12)",
  "blue-lg": "0 8px 32px rgba(10, 17, 114, 0.16)",
  "blue-xl": "0 16px 48px rgba(10, 17, 114, 0.22)",
  "card-hover": "0 12px 40px rgba(10, 17, 114, 0.18)",
} as const;

export const transitions = {
  fast: "150ms",
  default: "200ms",
  slow: "350ms",
} as const;

export const borderRadius = {
  sm: "2px",
  md: "6px",
  lg: "8px",
  full: "9999px",
} as const;

const designTokens = {
  colors,
  fonts,
  fontWeights,
  shadows,
  transitions,
  borderRadius,
};

export default designTokens;
