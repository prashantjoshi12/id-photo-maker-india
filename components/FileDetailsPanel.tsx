"use client";

export type FileDetails = {
  widthPx: number;
  heightPx: number;
  sizeKb: number;
  dpi: number;
  formatLabel: string;
};

type Props = {
  details: FileDetails | null;
  t: (key: string) => string;
};

export function FileDetailsPanel({ details, t }: Props) {
  if (!details) return null;
  return (
    <div className="w-full max-w-xs rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm">
      <p className="mb-2 font-semibold text-[#2563EB]">{t("tool.details.title")}</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-slate-700">
        <dt className="text-slate-500">{t("tool.details.w")}</dt>
        <dd className="tabular-nums text-right">{details.widthPx} px</dd>
        <dt className="text-slate-500">{t("tool.details.h")}</dt>
        <dd className="tabular-nums text-right">{details.heightPx} px</dd>
        <dt className="text-slate-500">{t("tool.details.size")}</dt>
        <dd className="tabular-nums text-right">{details.sizeKb.toFixed(1)} KB</dd>
        <dt className="text-slate-500">{t("tool.details.dpi")}</dt>
        <dd className="tabular-nums text-right">{details.dpi}</dd>
        <dt className="text-slate-500">{t("tool.details.format")}</dt>
        <dd className="text-right">{details.formatLabel}</dd>
      </dl>
    </div>
  );
}
