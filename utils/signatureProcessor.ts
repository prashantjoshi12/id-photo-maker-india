/**
 * Signature-specific Canvas processing: lighten background removal, binarisation,
 * optional pure black, simple “thickness” via morphological dilation on ink.
 */

export type SignatureProcessOptions = {
  removeLightBg: boolean;
  /** Lightness threshold 0–255; above → treated as background */
  bgThreshold: number;
  pureBlack: boolean;
  /** 1–3 pixel dilation passes */
  thickness: number;
  /** 0–100, scales contrast on ink channel */
  contrastBoost: number;
};

export const DEFAULT_SIGNATURE_OPTIONS: SignatureProcessOptions = {
  removeLightBg: true,
  bgThreshold: 210,
  pureBlack: true,
  thickness: 1,
  contrastBoost: 35,
};

export function processSignatureCanvas(
  source: HTMLCanvasElement,
  opts: SignatureProcessOptions
): HTMLCanvasElement {
  const w = source.width;
  const h = source.height;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  ctx.drawImage(source, 0, 0);
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const thr = opts.bgThreshold;
  const cBoost = 1 + opts.contrastBoost / 100;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const a = d[i + 3];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    let ink = 255 - lum;
    ink = (ink - 128) * cBoost + 128;
    ink = Math.max(0, Math.min(255, ink));

    if (opts.removeLightBg && lum > thr) {
      d[i] = 255;
      d[i + 1] = 255;
      d[i + 2] = 255;
      d[i + 3] = a < 250 ? a : 0;
      continue;
    }

    const v = Math.round(255 - ink);
    if (opts.pureBlack) {
      const t = 140;
      if (lum < t) {
        d[i] = 0;
        d[i + 1] = 0;
        d[i + 2] = 0;
        d[i + 3] = 255;
      } else {
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
    } else {
      d[i] = v;
      d[i + 1] = v;
      d[i + 2] = v;
      d[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);

  const passes = Math.max(1, Math.min(3, Math.round(opts.thickness)));
  for (let p = 0; p < passes - 1; p++) {
    dilateDarkInk(canvas);
  }

  return canvas;
}

function dilateDarkInk(canvas: HTMLCanvasElement): void {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const src = ctx.getImageData(0, 0, w, h);
  const d = src.data;
  const out = new Uint8ClampedArray(d);
  const ink = (i: number) => {
    const lum =
      0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    return lum < 128;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (ink(i)) continue;
      let any = false;
      for (let dy = -1; dy <= 1 && !any; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const j = (ny * w + nx) * 4;
          if (ink(j)) {
            any = true;
            break;
          }
        }
      }
      if (any) {
        out[i] = 0;
        out[i + 1] = 0;
        out[i + 2] = 0;
        out[i + 3] = 255;
      }
    }
  }
  const img = new ImageData(out, w, h);
  ctx.putImageData(img, 0, 0);
}
