"use client";

import type { Lang } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "hi", label: "हि" },
  { id: "gu", label: "ગુ" },
];

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1"
      role="group"
      aria-label={t("nav.lang")}
    >
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          onClick={() => setLang(l.id)}
          className={cn(
            "min-h-9 min-w-9 rounded-md px-2 text-xs font-bold touch-manipulation",
            lang === l.id
              ? "bg-[#2563EB] text-white ring-2 ring-[#F97316] ring-offset-1 ring-offset-white"
              : "text-slate-600 hover:bg-slate-100"
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
