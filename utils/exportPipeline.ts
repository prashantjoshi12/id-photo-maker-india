/**
 * Orchestrates crop → optional signature cleanup → resize → background → adjustments
 * → optional A4 print tiling → compression / format export.
 */

import type { PresetId } from "@/config/presets";
import { isKbPreset, isMmPreset, presets } from "@/config/presets";
import {
  mmToPixels,
  drawToSize,
  canvasToJpegBlob,
  compressToKbBand,
} from "@/utils/imageProcessing";
import type { PrintDpi } from "@/utils/dpiController";
import { applyBackgroundColor } from "@/utils/backgroundProcessor";
import {
  applyAdjustments,
  type AdjustmentValues,
  DEFAULT_ADJUSTMENTS,
} from "@/utils/imageAdjustments";
import {
  processSignatureCanvas,
  type SignatureProcessOptions,
  DEFAULT_SIGNATURE_OPTIONS,
} from "@/utils/signatureProcessor";
import { compressToTargetKb } from "@/utils/sizeController";
import { buildPrintSheet, type LayoutCount } from "@/utils/layoutGenerator";

export type FileSizeMode = "auto" | "kb20" | "kb30" | "kb50" | "custom";
export type DownloadFormat = "jpeg" | "png";

export type ExportPipelineInput = {
  cropped: HTMLCanvasElement;
  presetId: PresetId;
  printDpi: PrintDpi;
  backgroundColor: string;
  adjustments?: AdjustmentValues;
  layoutCount: LayoutCount;
  downloadFormat: DownloadFormat;
  fileSizeMode: FileSizeMode;
  customTargetKb: number;
  signature?: Partial<SignatureProcessOptions> & { enabled: boolean };
  previewMode: boolean;
};

export type PipelineResult = {
  blob: Blob;
  width: number;
  height: number;
  effectiveDpi: number;
  formatLabel: string;
};

function resolveTargetKb(
  mode: FileSizeMode,
  custom: number
): number | null {
  switch (mode) {
    case "auto":
      return null;
    case "kb20":
      return 20;
    case "kb30":
      return 30;
    case "kb50":
      return 50;
    case "custom":
      return Math.max(5, Math.min(800, custom));
    default:
      return null;
  }
}

async function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("PNG_EXPORT_FAILED"))),
      "image/png"
    );
  });
}

export async function runExportPipeline(
  input: ExportPipelineInput
): Promise<PipelineResult> {
  const {
    cropped,
    presetId,
    printDpi,
    backgroundColor,
    layoutCount,
    downloadFormat,
    fileSizeMode,
    customTargetKb,
    previewMode,
  } = input;
  const adjustments = input.adjustments ?? DEFAULT_ADJUSTMENTS;
  const preset = presets[presetId];

  let working = cropped;
  if (presetId === "signature" && input.signature?.enabled) {
    const sigOpts: SignatureProcessOptions = {
      ...DEFAULT_SIGNATURE_OPTIONS,
      ...input.signature,
    };
    working = processSignatureCanvas(working, sigOpts);
  }

  let outW: number;
  let outH: number;
  if (isMmPreset(preset)) {
    outW = mmToPixels(preset.width, printDpi);
    outH = mmToPixels(preset.height, printDpi);
  } else if (isKbPreset(preset)) {
    outW = preset.widthPx;
    outH = preset.heightPx;
  } else {
    throw new Error("UNKNOWN_PRESET");
  }

  let canvas = drawToSize(working, outW, outH);
  canvas = applyBackgroundColor(canvas, outW, outH, backgroundColor);
  canvas = applyAdjustments(canvas, adjustments);

  const layoutDpi =
    previewMode && layoutCount > 1 ? (72 as PrintDpi) : printDpi;
  if (layoutCount > 1) {
    canvas = buildPrintSheet(
      canvas,
      layoutCount,
      layoutDpi,
      backgroundColor,
      "#ffffff"
    );
  }

  const targetKb = resolveTargetKb(fileSizeMode, customTargetKb);
  const fmt = downloadFormat === "png" ? "png" : "jpeg";

  let blob: Blob;
  if (previewMode) {
    if (fmt === "jpeg") {
      blob = await canvasToJpegBlob(canvas, 0.82);
    } else {
      blob = await canvasToPngBlob(canvas);
    }
  } else if (targetKb != null) {
    try {
      blob = await compressToTargetKb(canvas, targetKb, fmt);
    } catch {
      throw new Error("COMPRESSION_FAILED");
    }
  } else if (isKbPreset(preset)) {
    if (fmt === "jpeg") {
      blob = await compressToKbBand(canvas, preset.minKB, preset.maxKB);
    } else {
      const mid = Math.round((preset.minKB + preset.maxKB) / 2);
      blob = await compressToTargetKb(canvas, mid, "png");
    }
  } else if (fmt === "jpeg") {
    blob = await canvasToJpegBlob(canvas, 0.92);
  } else {
    blob = await canvasToPngBlob(canvas);
  }

  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    effectiveDpi: printDpi,
    formatLabel: fmt === "jpeg" ? "JPEG" : "PNG",
  };
}
