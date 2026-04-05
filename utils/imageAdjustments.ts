/**
 * Lightweight Canvas pixel adjustments (brightness / contrast / sharpen kernel).
 */

export type AdjustmentValues = {
  /** 0–200, 100 = no change */
  brightness: number;
  /** 0–200, 100 = no change */
  contrast: number;
  /** 0–100, 0 = off */
  sharpness: number;
};

export const DEFAULT_ADJUSTMENTS: AdjustmentValues = {
  brightness: 100,
  contrast: 100,
  sharpness: 0,
};

export function applyAdjustments(
  source: HTMLCanvasElement,
  values: AdjustmentValues
): HTMLCanvasElement {
  const { brightness, contrast, sharpness } = values;
  const noBC = brightness === 100 && contrast === 100;
  const noSharp = sharpness < 1;
  if (noBC && noSharp) return source;

  const w = source.width;
  const h = source.height;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  ctx.drawImage(source, 0, 0);

  if (!noBC) {
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    const bMul = brightness / 100;
    const cMul = contrast / 100;
    for (let i = 0; i < d.length; i += 4) {
      let r = d[i] * bMul;
      let g = d[i + 1] * bMul;
      let b = d[i + 2] * bMul;
      r = (r - 128) * cMul + 128;
      g = (g - 128) * cMul + 128;
      b = (b - 128) * cMul + 128;
      d[i] = clamp255(r);
      d[i + 1] = clamp255(g);
      d[i + 2] = clamp255(b);
    }
    ctx.putImageData(img, 0, 0);
  }

  if (!noSharp) {
    const src = ctx.getImageData(0, 0, w, h);
    const out = ctx.createImageData(w, h);
    const s = src.data;
    const o = out.data;
    const k = (sharpness / 100) * 0.35;
    const kernel = [
      [0, -k, 0],
      [-k, 1 + 4 * k, -k],
      [0, -k, 0],
    ] as const;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let r = 0,
          g = 0,
          b = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const px = Math.min(w - 1, Math.max(0, x + kx));
            const py = Math.min(h - 1, Math.max(0, y + ky));
            const j = (py * w + px) * 4;
            const wgt = kernel[ky + 1][kx + 1];
            r += s[j] * wgt;
            g += s[j + 1] * wgt;
            b += s[j + 2] * wgt;
          }
        }
        const i = (y * w + x) * 4;
        o[i] = clamp255(r);
        o[i + 1] = clamp255(g);
        o[i + 2] = clamp255(b);
        o[i + 3] = s[i + 3];
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  return canvas;
}

function clamp255(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}
