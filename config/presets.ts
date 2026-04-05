/**
 * Preset system
 * --------------
 * Government portals expect fixed dimensions (mm) and/or JPEG file-size bands (KB).
 * Add new forms here, then register a route + tool card (config/tools.ts).
 * Optional `category` groups tools for future filters; core dimensions stay authoritative.
 */

export type PresetId =
  | "passport"
  | "pan"
  | "ssc"
  | "signature"
  | "aadhaar"
  | "railway"
  | "upsc";

/** Millimetre-based photo presets (passport, PAN). */
export type MmPreset = {
  width: number;
  height: number;
  unit: "mm";
  /** Default print resolution in config; user DPI overrides at export. */
  dpi: number;
};

/** Pixel + file-size presets (SSC upload rules, signature scans). */
export type KbPreset = {
  minKB: number;
  maxKB: number;
  widthPx: number;
  heightPx: number;
};

export const presets = {
  passport: {
    width: 35,
    height: 45,
    unit: "mm" as const,
    dpi: 300,
  },
  pan: {
    width: 35,
    height: 25,
    unit: "mm" as const,
    dpi: 300,
  },
  /** SSC commonly specifies a JPEG between ~20–50 KB with typical portal dimensions. */
  ssc: {
    minKB: 20,
    maxKB: 50,
    widthPx: 200,
    heightPx: 230,
  },
  signature: {
    minKB: 10,
    maxKB: 20,
    widthPx: 300,
    heightPx: 100,
  },
  /** Same physical size as passport on many UIDAI / update flows (verify on portal). */
  aadhaar: {
    width: 35,
    height: 45,
    unit: "mm" as const,
    dpi: 300,
  },
  /** Typical railway recruitment portal photo band (verify current notification). */
  railway: {
    minKB: 20,
    maxKB: 50,
    widthPx: 200,
    heightPx: 230,
  },
  /** Common UPSC / competitive exam upload pattern (verify notification). */
  upsc: {
    minKB: 20,
    maxKB: 50,
    widthPx: 200,
    heightPx: 230,
  },
} as const;

export type PresetValue = (typeof presets)[PresetId];

export function isMmPreset(
  p: PresetValue
): p is Extract<PresetValue, { unit: "mm" }> {
  return "unit" in p && p.unit === "mm";
}

export function isKbPreset(
  p: PresetValue
): p is Extract<PresetValue, { minKB: number }> {
  return "minKB" in p && "maxKB" in p;
}

/** Aspect ratio width/height for Cropper.js. */
export function getAspectRatio(presetId: PresetId): number {
  const p = presets[presetId];
  if (isMmPreset(p)) {
    return p.width / p.height;
  }
  return p.widthPx / p.heightPx;
}
