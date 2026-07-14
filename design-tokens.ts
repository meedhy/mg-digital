export const colors = {
  background: "#050507",
  backgroundSoft: "#0B0B10",
  surface: "rgba(255, 255, 255, 0.055)",
  surfaceStrong: "rgba(255, 255, 255, 0.09)",
  textPrimary: "#F5F5F7",
  textSecondary: "rgba(245, 245, 247, 0.68)",
  textMuted: "rgba(245, 245, 247, 0.46)",
  border: "rgba(255, 255, 255, 0.11)",
  accent: "#7C6CFF",
  accentSecondary: "#3D8BFF",
  success: "#59D98E",
} as const;

export const fonts = {
  body: "Manrope",
  editorial: "Instrument Serif",
} as const;

const designTokens = { colors, fonts };

export default designTokens;
