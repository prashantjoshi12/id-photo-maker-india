import { mmToPixels } from "@/utils/imageProcessing";

/** User-selectable print resolution; drives mm-based output pixel dimensions. */
export const PRINT_DPI_OPTIONS = [72, 150, 300] as const;
export type PrintDpi = (typeof PRINT_DPI_OPTIONS)[number];

export function isPrintDpi(n: number): n is PrintDpi {
  return (PRINT_DPI_OPTIONS as readonly number[]).includes(n);
}

export function pixelsForMm(
  widthMm: number,
  heightMm: number,
  dpi: number
): { width: number; height: number } {
  return {
    width: mmToPixels(widthMm, dpi),
    height: mmToPixels(heightMm, dpi),
  };
}

/** A4 sheet size in pixels at given DPI (for printable layouts). */
export function a4Pixels(dpi: number): { width: number; height: number } {
  return pixelsForMm(210, 297, dpi);
}
