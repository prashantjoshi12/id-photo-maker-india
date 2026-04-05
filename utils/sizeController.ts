/**
 * Target file-size control using iterative JPEG quality search + browser-image-compression.
 * PNG targets use resize + compression passes (lossless PNG is harder to cap tightly).
 */

import imageCompression from "browser-image-compression";

function blobKB(blob: Blob): number {
  return blob.size / 1024;
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not export image"))),
      type,
      quality
    );
  });
}

export type CompressFormat = "jpeg" | "png";

/**
 * Produces a blob close to targetKb (±~12%) using multiple passes when needed.
 */
export async function compressToTargetKb(
  canvas: HTMLCanvasElement,
  targetKb: number,
  format: CompressFormat
): Promise<Blob> {
  const target = Math.max(5, Math.min(500, targetKb));
  const maxKb = target * 1.12;

  if (format === "jpeg") {
    let lo = 0.22;
    let hi = 0.94;
    let best = await canvasToBlob(canvas, "image/jpeg", lo);
    for (let i = 0; i < 16; i++) {
      const mid = (lo + hi) / 2;
      const blob = await canvasToBlob(canvas, "image/jpeg", mid);
      if (blobKB(blob) <= target) {
        best = blob;
        lo = mid;
      } else {
        hi = mid;
      }
    }
    let file = new File([best], "out.jpg", { type: "image/jpeg" });
    for (let pass = 0; pass < 5 && blobKB(file) > maxKb; pass++) {
      file = await imageCompression(file, {
        maxSizeMB: target / 1024,
        useWebWorker: true,
        fileType: "image/jpeg",
        initialQuality: 0.75,
      });
    }
    if (blobKB(file) > maxKb) {
      let c = canvas;
      for (let i = 0; i < 5 && blobKB(file) > maxKb; i++) {
        c = downscaleCanvas(c, 0.9);
        file = new File(
          [await canvasToBlob(c, "image/jpeg", 0.68)],
          "out.jpg",
          { type: "image/jpeg" }
        );
        file = await imageCompression(file, {
          maxSizeMB: target / 1024,
          useWebWorker: true,
          fileType: "image/jpeg",
        });
      }
    }
    return file;
  }

  let work = canvas;
  let blob = await canvasToBlob(work, "image/png");
  let scale = 1;
  for (let pass = 0; pass < 8 && blobKB(blob) > maxKb; pass++) {
    scale *= 0.9;
    work = downscaleCanvas(canvas, scale);
    let f = new File(
      [await canvasToBlob(work, "image/png")],
      "out.png",
      { type: "image/png" }
    );
    f = await imageCompression(f, {
      maxSizeMB: target / 1024,
      useWebWorker: true,
      fileType: "image/png",
    });
    blob = f;
  }
  return blob;
}

function downscaleCanvas(
  source: HTMLCanvasElement,
  factor: number
): HTMLCanvasElement {
  const w = Math.max(1, Math.round(source.width * factor));
  const h = Math.max(1, Math.round(source.height * factor));
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d");
  if (!x) throw new Error("Could not get canvas context");
  x.imageSmoothingEnabled = true;
  x.imageSmoothingQuality = "high";
  x.drawImage(source, 0, 0, w, h);
  return c;
}
