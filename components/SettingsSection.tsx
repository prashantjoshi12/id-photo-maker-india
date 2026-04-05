"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

/** Collapsible block to keep the settings panel scannable on mobile. */
export function SettingsSection({
  title,
  children,
  defaultOpen = true,
  className,
}: SettingsSectionProps) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        "group rounded-lg border border-slate-200 bg-slate-50/40 shadow-sm",
        className
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-3.5 text-sm font-semibold text-[#2563EB] min-h-[3rem] touch-manipulation [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <ChevronDown className="size-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-3 border-t border-slate-200/80 px-3 py-3">
        {children}
      </div>
    </details>
  );
}
