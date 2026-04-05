"use client";

import type { LayoutCount } from "@/utils/layoutGenerator";
import { cn } from "@/lib/utils";

const OPTIONS: { count: LayoutCount; labelKey: string }[] = [
  { count: 1, labelKey: "tool.print.1" },
  { count: 2, labelKey: "tool.print.2" },
  { count: 4, labelKey: "tool.print.4" },
  { count: 6, labelKey: "tool.print.6" },
  { count: 8, labelKey: "tool.print.8" },
];

type Props = {
  value: LayoutCount;
  onChange: (n: LayoutCount) => void;
  t: (key: string) => string;
};

export function LayoutSelector({ value, onChange, t }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
      {OPTIONS.map((o) => (
        <label
          key={o.count}
          className={cn(
            "flex min-h-12 cursor-pointer items-center justify-center rounded-lg border-2 px-2 text-center text-xs font-semibold touch-manipulation",
            value === o.count
              ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
          )}
        >
          <input
            type="radio"
            name="print-layout"
            className="sr-only"
            checked={value === o.count}
            onChange={() => onChange(o.count)}
          />
          {t(o.labelKey)}
        </label>
      ))}
    </div>
  );
}
