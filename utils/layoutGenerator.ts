import { a4Pixels } from "@/utils/dpiController";

export type LayoutCount = 1 | 2 | 4 | 6 | 8;

function gridFor(n: LayoutCount): [number, number] {
  switch (n) {
    case 1:
      return [1, 1];
    case 2:
      return [1, 2];
    case 4:
      return [2, 2];
    case 6:
      return [2, 3];
    case 8:
      return [2, 4];
    default:
      return [1, 1];
  }
}

/**
 * Tiles the same passport/ID cell onto an A4 canvas for home printing.
 */
export function buildPrintSheet(
  photo: HTMLCanvasElement,
  count: LayoutCount,
  dpi: number,
  cellBackground: string,
  sheetBackground: string
): HTMLCanvasElement {
  const { width: pw, height: ph } = a4Pixels(dpi);
  const [cols, rows] = gridFor(count);
  const total = count;
  const canvas = document.createElement("canvas");
  canvas.width = pw;
  canvas.height = ph;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.fillStyle = sheetBackground;
  ctx.fillRect(0, 0, pw, ph);

  const margin = Math.max(12, Math.round(dpi * 0.1));
  const gap = Math.max(8, Math.round(dpi * 0.05));
  const innerW = pw - margin * 2 - gap * (cols - 1);
  const innerH = ph - margin * 2 - gap * (rows - 1);
  const cellW = innerW / cols;
  const cellH = innerH / rows;

  let placed = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (placed >= total) break;
      const x = margin + col * (cellW + gap);
      const y = margin + row * (cellH + gap);
      ctx.fillStyle = cellBackground;
      ctx.fillRect(x, y, cellW, cellH);
      const sc = Math.min(cellW / photo.width, cellH / photo.height);
      const dw = photo.width * sc;
      const dh = photo.height * sc;
      const dx = x + (cellW - dw) / 2;
      const dy = y + (cellH - dh) / 2;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(photo, dx, dy, dw, dh);
      placed++;
    }
  }

  return canvas;
}
