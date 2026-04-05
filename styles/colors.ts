/**
 * Brand palette — ID Photo Maker India.
 * Use for UI that should track official marketing / PWA theme colors.
 */
export const brandColors = {
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  accentSaffron: "#F97316",
  accentGreen: "#16A34A",
  accentGreenHover: "#15803D",
  textPrimary: "#111827",
  background: "#FFFFFF",
  border: "#E5E7EB",
} as const;

export type BrandColors = typeof brandColors;
