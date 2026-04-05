"use client";

/**
 * Tool page: upload → lazy Cropper → debounced live preview → prepare → download.
 * Options flow through utils/exportPipeline.ts (background, DPI, layout, KB, format).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, ScanFace } from "lucide-react";
import type { PresetId } from "@/config/presets";
import { getAspectRatio, isKbPreset, isMmPreset, presets } from "@/config/presets";
import { BackgroundSelector } from "@/components/BackgroundSelector";
import { CropperDynamic } from "@/components/CropperDynamic";
import { DownloadButton } from "@/components/DownloadButton";
import type { FileDetails } from "@/components/FileDetailsPanel";
import { FileDetailsPanel } from "@/components/FileDetailsPanel";
import { ImageAdjustmentSliders } from "@/components/ImageAdjustmentSliders";
import { ImageUploader } from "@/components/ImageUploader";
import { LayoutSelector } from "@/components/LayoutSelector";
import { PreviewBox } from "@/components/PreviewBox";
import { SettingsSection } from "@/components/SettingsSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CropperWrapperHandle } from "@/components/CropperWrapper";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  DEFAULT_ADJUSTMENTS,
  type AdjustmentValues,
} from "@/utils/imageAdjustments";
import { assertValidUpload } from "@/utils/imageProcessing";
import {
  runExportPipeline,
  type DownloadFormat,
  type FileSizeMode,
} from "@/utils/exportPipeline";
import { PRINT_DPI_OPTIONS, type PrintDpi, isPrintDpi } from "@/utils/dpiController";
import type { LayoutCount } from "@/utils/layoutGenerator";
import { UploadValidationError } from "@/utils/uploadErrors";

export type PhotoToolClientProps = {
  presetId: PresetId;
  title: string;
  description: string;
  downloadFileName: string;
  downloadLabel?: string;
};

export function PhotoToolClient({
  presetId,
  title,
  description,
  downloadFileName,
  downloadLabel,
}: PhotoToolClientProps) {
  const { t } = useI18n();
  const dlLabel = downloadLabel ?? t("tool.download");

  const cropperRef = useRef<CropperWrapperHandle>(null);
  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileDetails, setFileDetails] = useState<FileDetails | null>(null);

  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [printDpi, setPrintDpi] = useState<PrintDpi>(300);
  const [layoutCount, setLayoutCount] = useState<LayoutCount>(1);
  const [downloadFormat, setDownloadFormat] =
    useState<DownloadFormat>("jpeg");
  const [fileSizeMode, setFileSizeMode] = useState<FileSizeMode>("auto");
  const [customTargetKb, setCustomTargetKb] = useState(35);
  const [adjustments, setAdjustments] = useState<AdjustmentValues>({
    ...DEFAULT_ADJUSTMENTS,
  });

  const [sigEnabled, setSigEnabled] = useState(presetId === "signature");
  const [sigPureBlack, setSigPureBlack] = useState(true);
  const [sigRemoveBg, setSigRemoveBg] = useState(true);
  const [sigThickness, setSigThickness] = useState(2);
  const [sigContrast, setSigContrast] = useState(35);

  const [autoFace, setAutoFace] = useState(true);
  const autoFaceOnce = useRef(false);

  const previewTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const optsRef = useRef({
    presetId,
    printDpi,
    backgroundColor,
    adjustments,
    layoutCount,
    downloadFormat,
    fileSizeMode,
    customTargetKb,
    signature: {
      enabled: sigEnabled,
      pureBlack: sigPureBlack,
      removeLightBg: sigRemoveBg,
      thickness: sigThickness,
      contrastBoost: sigContrast,
    },
  });

  optsRef.current = {
    presetId,
    printDpi,
    backgroundColor,
    adjustments,
    layoutCount,
    downloadFormat,
    fileSizeMode,
    customTargetKb,
    signature: {
      enabled: sigEnabled,
      pureBlack: sigPureBlack,
      removeLightBg: sigRemoveBg,
      thickness: sigThickness,
      contrastBoost: sigContrast,
    },
  };

  useEffect(() => {
    if (!file) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const runPreview = useCallback(async () => {
    const cropped = cropperRef.current?.getCroppedCanvas();
    if (!cropped) return;
    const o = optsRef.current;
    try {
      const r = await runExportPipeline({
        cropped,
        presetId: o.presetId,
        printDpi: o.printDpi,
        backgroundColor: o.backgroundColor,
        adjustments: o.adjustments,
        layoutCount: o.layoutCount,
        downloadFormat: o.downloadFormat,
        fileSizeMode: o.fileSizeMode,
        customTargetKb: o.customTargetKb,
        signature: o.signature,
        previewMode: true,
      });
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(r.blob);
      });
    } catch {
      /* live preview is best-effort */
    }
  }, []);

  const schedulePreview = useCallback(() => {
    if (!objectUrl) return;
    clearTimeout(previewTimer.current);
    previewTimer.current = setTimeout(() => void runPreview(), 300);
  }, [objectUrl, runPreview]);

  useEffect(() => {
    schedulePreview();
  }, [
    backgroundColor,
    printDpi,
    layoutCount,
    downloadFormat,
    fileSizeMode,
    customTargetKb,
    adjustments,
    sigEnabled,
    sigPureBlack,
    sigRemoveBg,
    sigThickness,
    sigContrast,
    schedulePreview,
  ]);

  useEffect(() => {
    if (!objectUrl || !autoFace || autoFaceOnce.current) return;
    const timer = setTimeout(async () => {
      const r = await cropperRef.current?.tryAutoCenterFace();
      autoFaceOnce.current = true;
      if (r?.ok) schedulePreview();
    }, 700);
    return () => clearTimeout(timer);
  }, [objectUrl, autoFace, schedulePreview]);

  const onPickFile = useCallback(
    (f: File) => {
      try {
        assertValidUpload(f);
        setError(null);
        setSuccess(false);
        setOutputBlob(null);
        setFileDetails(null);
        autoFaceOnce.current = false;
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setFile(f);
      } catch (e) {
        setFile(null);
        if (e instanceof UploadValidationError) {
          setError(t(`errors.${e.code}`));
        } else {
          setError(t("errors.PROCESS_FAILED"));
        }
      }
    },
    [previewUrl, t]
  );

  const aspect = getAspectRatio(presetId);
  const preset = presets[presetId];

  const presetLines = (() => {
    if (isMmPreset(preset)) {
      return [
        `${t("tool.details.w")}: ${preset.width} mm`,
        `${t("tool.details.h")}: ${preset.height} mm`,
        `DPI: ${printDpi}`,
        `${t("tool.details.format")}: JPEG / PNG`,
      ];
    }
    if (isKbPreset(preset)) {
      return [
        `${t("tool.details.w")}: ${preset.widthPx} px`,
        `${t("tool.details.h")}: ${preset.heightPx} px`,
        `${preset.minKB}–${preset.maxKB} KB (${t("tool.fs.auto")})`,
      ];
    }
    return [];
  })();

  const mapPipelineError = (msg?: string) => {
    if (msg === "NO_CROP" || msg === "NO_CROPPER") return t("errors.NO_CROP");
    if (msg === "NO_FACE") return t("errors.NO_FACE");
    if (msg === "FACE_LOAD_FAILED") return t("errors.FACE_FAILED");
    if (msg === "PNG_EXPORT_FAILED" || msg === "COMPRESSION_FAILED") {
      return t("errors.COMPRESSION_FAILED");
    }
    return t("errors.PROCESS_FAILED");
  };

  const handlePrepare = async () => {
    setError(null);
    setSuccess(false);
    const cropped = cropperRef.current?.getCroppedCanvas() ?? null;
    if (!cropped) {
      setError(t("errors.NO_CROP"));
      return;
    }
    setProcessing(true);
    try {
      const o = optsRef.current;
      const r = await runExportPipeline({
        cropped,
        presetId: o.presetId,
        printDpi: o.printDpi,
        backgroundColor: o.backgroundColor,
        adjustments: o.adjustments,
        layoutCount: o.layoutCount,
        downloadFormat: o.downloadFormat,
        fileSizeMode: o.fileSizeMode,
        customTargetKb: o.customTargetKb,
        signature: o.signature,
        previewMode: false,
      });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const p = URL.createObjectURL(r.blob);
      setPreviewUrl(p);
      setOutputBlob(r.blob);
      setFileDetails({
        widthPx: r.width,
        heightPx: r.height,
        sizeKb: r.blob.size / 1024,
        dpi: r.effectiveDpi,
        formatLabel: r.formatLabel,
      });
      setSuccess(true);
      schedulePreview();
    } catch (e) {
      setOutputBlob(null);
      setFileDetails(null);
      const msg = e instanceof Error ? e.message : "";
      setError(mapPipelineError(msg));
    } finally {
      setProcessing(false);
    }
  };

  const handleManualFace = async () => {
    setError(null);
    const r = await cropperRef.current?.tryAutoCenterFace();
    if (r?.ok) {
      schedulePreview();
    } else {
      setError(mapPipelineError(r?.message));
    }
  };

  const handleDownload = () => {
    if (!outputBlob) return;
    const ext = downloadFormat === "png" ? ".png" : ".jpg";
    const base = downloadFileName.replace(/\.(jpe?g|png)$/i, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(outputBlob);
    a.download = `${base}${ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const resetUpload = () => {
    setFile(null);
    setOutputBlob(null);
    setSuccess(false);
    setError(null);
    setFileDetails(null);
    autoFaceOnce.current = false;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 sm:px-6 md:pb-10 lg:py-10">
      <header className="mb-8 text-center lg:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-[#2563EB] sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-slate-600 lg:mx-0">
          {description}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col gap-4">
          {!objectUrl ? (
            <ImageUploader onFile={onPickFile} disabled={processing} />
          ) : (
            <>
              <CropperDynamic
                ref={cropperRef}
                src={objectUrl}
                aspectRatio={aspect}
                onCropEvent={schedulePreview}
              />
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-12 w-full touch-manipulation sm:flex-1"
                  onClick={resetUpload}
                  disabled={processing}
                >
                  {t("tool.chooseOther")}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="min-h-12 w-full touch-manipulation sm:flex-1"
                  onClick={() => void handleManualFace()}
                  disabled={processing}
                >
                  <ScanFace className="size-5" aria-hidden />
                  {t("tool.face.auto")}
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#2563EB]">
                {t("tool.settings.title")}
              </CardTitle>
              <CardDescription>{t("tool.preset.hint")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                  <SettingsSection title={t("tool.preset.title")} defaultOpen>
                    <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 marker:text-[#2563EB]">
                      {presetLines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </SettingsSection>

                  <SettingsSection
                    title={t("tool.background.title")}
                    defaultOpen={false}
                  >
                    <BackgroundSelector
                      value={backgroundColor}
                      onChange={setBackgroundColor}
                      t={t}
                    />
                  </SettingsSection>

                  <SettingsSection
                    title={t("tool.fileSize.title")}
                    defaultOpen={false}
                  >
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {(
                        [
                          ["auto", t("tool.fs.auto")],
                          ["kb20", t("tool.fs.20")],
                          ["kb30", t("tool.fs.30")],
                          ["kb50", t("tool.fs.50")],
                          ["custom", t("tool.fs.custom")],
                        ] as const
                      ).map(([mode, label]) => (
                        <label
                          key={mode}
                          className={cn(
                            "flex min-h-12 cursor-pointer items-center justify-center rounded-lg border-2 px-2 text-center text-xs font-semibold",
                            fileSizeMode === mode
                              ? "border-[#2563EB] bg-[#2563EB]/5"
                              : "border-slate-200"
                          )}
                        >
                          <input
                            type="radio"
                            name="fs"
                            className="sr-only"
                            checked={fileSizeMode === mode}
                            onChange={() => setFileSizeMode(mode as FileSizeMode)}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                    {fileSizeMode === "custom" && (
                      <input
                        type="number"
                        min={5}
                        max={800}
                        value={customTargetKb}
                        onChange={(e) =>
                          setCustomTargetKb(Number(e.target.value) || 35)
                        }
                        className="mt-2 w-full min-h-12 rounded-lg border border-slate-200 px-3 text-sm"
                        placeholder={t("tool.fs.customPh")}
                      />
                    )}
                  </SettingsSection>

                  <SettingsSection
                    title={t("tool.print.title")}
                    defaultOpen={false}
                  >
                    <LayoutSelector
                      value={layoutCount}
                      onChange={setLayoutCount}
                      t={t}
                    />
                  </SettingsSection>

                  <SettingsSection
                    title={t("tool.dpi.title")}
                    defaultOpen={false}
                  >
                    <select
                      value={printDpi}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (isPrintDpi(v)) setPrintDpi(v);
                      }}
                      className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium"
                    >
                      {PRINT_DPI_OPTIONS.map((d) => (
                        <option key={d} value={d}>
                          {d === 72
                            ? t("tool.dpi.72")
                            : d === 150
                              ? t("tool.dpi.150")
                              : t("tool.dpi.300")}
                        </option>
                      ))}
                    </select>
                  </SettingsSection>

                  <SettingsSection
                    title={t("tool.format.title")}
                    defaultOpen={false}
                  >
                    <select
                      value={downloadFormat}
                      onChange={(e) =>
                        setDownloadFormat(e.target.value as DownloadFormat)
                      }
                      className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium"
                    >
                      <option value="jpeg">{t("tool.format.jpg")}</option>
                      <option value="png">{t("tool.format.png")}</option>
                    </select>
                  </SettingsSection>

                  <SettingsSection
                    title={t("tool.adjust.title")}
                    defaultOpen={false}
                  >
                    <ImageAdjustmentSliders
                      value={adjustments}
                      onChange={setAdjustments}
                      t={t}
                    />
                  </SettingsSection>

                  <SettingsSection
                    title={t("tool.face.title")}
                    defaultOpen={false}
                  >
                    <label className="flex min-h-12 cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={autoFace}
                        onChange={(e) => {
                          setAutoFace(e.target.checked);
                          autoFaceOnce.current = false;
                        }}
                        className="size-4 accent-[#2563EB]"
                      />
                      {t("tool.face.auto")}
                    </label>
                    <p className="text-xs text-slate-500">{t("tool.face.hint")}</p>
                  </SettingsSection>

                  {presetId === "signature" && (
                    <SettingsSection
                      title={t("tool.sig.title")}
                      defaultOpen={false}
                    >
                      <label className="flex min-h-11 items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={sigEnabled}
                          onChange={(e) => setSigEnabled(e.target.checked)}
                          className="size-4 accent-[#2563EB]"
                        />
                        {t("tool.sig.enable")}
                      </label>
                      <label className="flex min-h-11 items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={sigPureBlack}
                          onChange={(e) => setSigPureBlack(e.target.checked)}
                          disabled={!sigEnabled}
                          className="size-4 accent-[#2563EB]"
                        />
                        {t("tool.sig.black")}
                      </label>
                      <label className="flex min-h-11 items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={sigRemoveBg}
                          onChange={(e) => setSigRemoveBg(e.target.checked)}
                          disabled={!sigEnabled}
                          className="size-4 accent-[#2563EB]"
                        />
                        {t("tool.sig.removeBg")}
                      </label>
                      <label className="flex flex-col gap-1 text-xs">
                        <span>{t("tool.sig.thickness")}</span>
                        <input
                          type="range"
                          min={1}
                          max={3}
                          step={1}
                          value={sigThickness}
                          disabled={!sigEnabled}
                          onChange={(e) =>
                            setSigThickness(Number(e.target.value))
                          }
                          className="accent-[#2563EB]"
                        />
                      </label>
                      <label className="flex flex-col gap-1 text-xs">
                        <span>{t("tool.sig.contrast")}</span>
                        <input
                          type="range"
                          min={0}
                          max={80}
                          value={sigContrast}
                          disabled={!sigEnabled}
                          onChange={(e) =>
                            setSigContrast(Number(e.target.value))
                          }
                          className="accent-[#2563EB]"
                        />
                      </label>
                    </SettingsSection>
                  )}

              <p className="text-xs text-slate-500">{t("tool.privacyLine")}</p>
            </CardContent>
          </Card>

          <Card className="relative border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#2563EB]">
                {t("tool.preview.title")}
              </CardTitle>
              <CardDescription>{t("tool.preview.sub")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              {processing && (
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm"
                  role="status"
                  aria-live="polite"
                >
                  <Loader2
                    className="size-10 animate-spin text-[#2563EB]"
                    aria-hidden
                  />
                  <span className="mt-2 text-sm font-medium text-slate-700">
                    {t("tool.processing")}
                  </span>
                </div>
              )}
              <PreviewBox src={previewUrl} />
              <FileDetailsPanel details={fileDetails} t={t} />
              {success && (
                <p className="text-center text-sm font-medium text-[#15803D]">
                  {t("tool.success")}
                </p>
              )}
              {error && (
                <p className="text-center text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
              <div className="hidden w-full flex-col gap-3 md:flex">
                <Button
                  type="button"
                  variant="secondary"
                  className="min-h-14 w-full touch-manipulation text-base"
                  onClick={() => void handlePrepare()}
                  disabled={!objectUrl || processing}
                >
                  {t("tool.prepare")}
                </Button>
                <DownloadButton
                  onClick={handleDownload}
                  disabled={!outputBlob}
                  loading={false}
                  label={dlLabel}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md md:hidden"
        role="region"
        aria-label={t("tool.download")}
      >
        <Button
          type="button"
          variant="secondary"
          className="min-h-14 flex-1 touch-manipulation text-base font-semibold"
          onClick={() => void handlePrepare()}
          disabled={!objectUrl || processing}
        >
          {t("tool.prepare")}
        </Button>
        <DownloadButton
          onClick={handleDownload}
          disabled={!outputBlob}
          loading={false}
          label={dlLabel}
          className="min-h-14 flex-1"
        />
      </div>
    </div>
  );
}
