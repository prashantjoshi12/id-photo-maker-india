"use client";

import type { AdjustmentValues } from "@/utils/imageAdjustments";

type Props = {
  value: AdjustmentValues;
  onChange: (v: AdjustmentValues) => void;
  t: (key: string) => string;
};

export function ImageAdjustmentSliders({ value, onChange, t }: Props) {
  const row = (
    label: string,
    k: keyof AdjustmentValues,
    min: number,
    max: number,
    step: number
  ) => (
    <label className="flex flex-col gap-1">
      <span className="flex justify-between text-xs font-medium text-slate-700">
        {label}
        <span className="tabular-nums text-slate-500">{value[k]}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[k]}
        onChange={(e) =>
          onChange({ ...value, [k]: Number(e.target.value) })
        }
        className="h-2 w-full cursor-pointer accent-[#2563EB]"
      />
    </label>
  );

  return (
    <div className="space-y-4">
      {row(t("tool.adjust.brightness"), "brightness", 60, 140, 1)}
      {row(t("tool.adjust.contrast"), "contrast", 60, 140, 1)}
      {row(t("tool.adjust.sharpness"), "sharpness", 0, 100, 1)}
    </div>
  );
}
