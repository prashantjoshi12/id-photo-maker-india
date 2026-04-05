/**
 * Fills the output canvas with a solid background, then draws the photo on top.
 * Transparent pixels in the source show the selected colour (passport-style mattes).
 */

export function applyBackgroundColor(
  source: HTMLCanvasElement,
  outW: number,
  outH: number,
  backgroundCss: string
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  ctx.fillStyle = backgroundCss;
  ctx.fillRect(0, 0, outW, outH);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, outW, outH);
  return canvas;
}
