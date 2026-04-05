/**
 * Image resizing & compression (client-only)
 * ------------------------------------------
 * 1) Cropper.js supplies a source canvas (cropped region, user keeps face centred).
 * 2) We draw into a fresh canvas at exact output dimensions (Canvas 2D) to avoid
 *    accidental aspect drift and keep edges sharp for government uploads.
 * 3) For mm presets we scale from physical mm using dpi → pixels.
 * 4) For KB-range presets we binary-search JPEG quality on the final canvas until
 *    the blob sits inside [minKB, maxKB] (browser-image-compression optional path
 *    for coarse downscale; final tuning uses canvas.toBlob for predictable sizes).
 */

import imageCompression from "browser-image-compression";
import {
  type PresetId,
  isKbPreset,
  isMmPreset,
  presets,
} from "@/config/presets";
import { UploadValidationError } from "@/utils/uploadErrors";

const MM_PER_INCH = 25.4;

export function mmToPixels(mm: number, dpi: number): number {
  return Math.max(1, Math.round((mm / MM_PER_INCH) * dpi));
}

export function drawToSize(
  source: HTMLCanvasElement,
  outW: number,
  outH: number
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, outW, outH);
  return canvas;
}

function blobSizeKB(blob: Blob): number {
  return blob.size / 1024;
}

export async function canvasToJpegBlob(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("JPEG export failed"))),
      "image/jpeg",
      quality
    );
  });
}

/**
 * Find highest JPEG quality such that size ≤ maxKB (binary search).
 * If even minimum quality exceeds maxKB, returns the smallest blob we could produce.
 */
export async function fitMaxKb(
  canvas: HTMLCanvasElement,
  maxKB: number
): Promise<Blob> {
  let lo = 0.35;
  let hi = 0.92;
  let best = await canvasToJpegBlob(canvas, lo);
  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2;
    const blob = await canvasToJpegBlob(canvas, mid);
    const kb = blobSizeKB(blob);
    if (kb <= maxKB) {
      best = blob;
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return best;
}

/**
 * If blob is below minKB, bump quality upward where possible without exceeding maxKB.
 */
export async function liftMinKb(
  canvas: HTMLCanvasElement,
  blob: Blob,
  minKB: number,
  maxKB: number
): Promise<Blob> {
  if (blobSizeKB(blob) >= minKB) return blob;
  let q = 0.93;
  let last = blob;
  while (q <= 0.98 && blobSizeKB(last) < minKB) {
    const attempt = await canvasToJpegBlob(canvas, q);
    if (blobSizeKB(attempt) > maxKB) break;
    last = attempt;
    q += 0.01;
  }
  return last;
}

export type ProcessResult = { blob: Blob; width: number; height: number };

/** JPEG size within [minKB, maxKB] using the same search as SSC/signature presets. */
export async function compressToKbBand(
  canvas: HTMLCanvasElement,
  minKB: number,
  maxKB: number
): Promise<Blob> {
  let blob = await fitMaxKb(canvas, maxKB);
  blob = await liftMinKb(canvas, blob, minKB, maxKB);
  if (blobSizeKB(blob) > maxKB) {
    const coarse = await imageCompression(
      await blobToFile(blob, "coarse.jpg"),
      {
        maxSizeMB: maxKB / 1024,
        useWebWorker: true,
        fileType: "image/jpeg",
      }
    );
    const img = await loadImageFromFile(coarse);
    const c = drawToSize(imageToCanvas(img), canvas.width, canvas.height);
    blob = await fitMaxKb(c, maxKB);
    blob = await liftMinKb(c, blob, minKB, maxKB);
  }
  return blob;
}

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export function assertValidUpload(file: File): void {
  const okType =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.name.toLowerCase().endsWith(".jpg") ||
    file.name.toLowerCase().endsWith(".jpeg") ||
    file.name.toLowerCase().endsWith(".png");
  if (!okType) {
    throw new UploadValidationError("UNSUPPORTED_TYPE");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadValidationError("FILE_TOO_LARGE");
  }
}

/**
 * End-to-end: cropped canvas from Cropper → sized output → optional KB windowing.
 */
export async function processCroppedCanvas(
  cropped: HTMLCanvasElement,
  presetId: PresetId
): Promise<ProcessResult> {
  const preset = presets[presetId];

  let outW: number;
  let outH: number;

  if (isMmPreset(preset)) {
    outW = mmToPixels(preset.width, preset.dpi);
    outH = mmToPixels(preset.height, preset.dpi);
  } else if (isKbPreset(preset)) {
    outW = preset.widthPx;
    outH = preset.heightPx;
  } else {
    throw new Error("Unknown preset shape");
  }

  const sized = drawToSize(cropped, outW, outH);

  if (isKbPreset(preset)) {
    let blob = await fitMaxKb(sized, preset.maxKB);
    blob = await liftMinKb(sized, blob, preset.minKB, preset.maxKB);
    if (blobSizeKB(blob) > preset.maxKB) {
      const coarse = await imageCompression(
        await blobToFile(blob, "coarse.jpg"),
        {
          maxSizeMB: preset.maxKB / 1024,
          useWebWorker: true,
          fileType: "image/jpeg",
        }
      );
      const img = await loadImageFromFile(coarse);
      const c = drawToSize(imageToCanvas(img), outW, outH);
      blob = await fitMaxKb(c, preset.maxKB);
      blob = await liftMinKb(c, blob, preset.minKB, preset.maxKB);
    }
    return { blob, width: outW, height: outH };
  }

  const blob = await canvasToJpegBlob(sized, 0.92);
  return { blob, width: outW, height: outH };
}

async function blobToFile(blob: Blob, name: string): Promise<File> {
  return new File([blob], name, { type: blob.type || "image/jpeg" });
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image"));
    };
    img.src = url;
  });
}

function imageToCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  ctx.drawImage(img, 0, 0);
  return c;
}
