"use client";

import { cn } from "@/lib/utils";

const PRESETS = [
  { key: "tool.bg.white", value: "#ffffff" },
  { key: "tool.bg.lightBlue", value: "#e8f0fe" },
  { key: "tool.bg.grey", value: "#e5e7eb" },
] as const;

type Props = {
  value: string;
  onChange: (hex: string) => void;
  t: (key: string) => string;
};

export function BackgroundSelector({ value, onChange, t }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => onChange(p.value)}
            className={cn(
              "min-h-12 min-w-[4.5rem] rounded-lg border-2 px-3 py-2 text-xs font-medium transition-colors touch-manipulation",
              value.toLowerCase() === p.value.toLowerCase()
                ? "border-[#2563EB] ring-2 ring-[#2563EB]/20"
                : "border-slate-200 hover:border-slate-300"
            )}
            style={{ backgroundColor: p.value }}
            title={t(p.key)}
          >
            <span className="sr-only">{t(p.key)}</span>
            <span className="pointer-events-none text-slate-800 mix-blend-multiply">
              {t(p.key)}
            </span>
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-1 text-xs text-slate-600">
        <span className="font-medium text-slate-700">{t("tool.bg.custom")}</span>
        <input
          type="color"
          value={value.startsWith("#") && value.length >= 7 ? value.slice(0, 7) : "#ffffff"}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full max-w-[8rem] cursor-pointer rounded-md border border-slate-200 bg-white"
        />
      </label>
    </div>
  );
}
