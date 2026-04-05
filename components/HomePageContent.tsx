"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { toolCards } from "@/config/tools";
import { useI18n } from "@/lib/i18n";

export function HomePageContent() {
  const { t } = useI18n();

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-[#2563EB] sm:text-4xl md:text-5xl">
            {t("home.hero.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-slate-600 sm:text-xl">
            {t("home.hero.sub")}
          </p>
          <Button size="lg" className="mt-8 min-h-14 touch-manipulation px-8 text-lg" asChild>
            <Link href="#tools" className="gap-2">
              {t("home.hero.cta")}
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <section
        id="tools"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16"
      >
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#2563EB] sm:text-3xl">
            {t("home.tools.title")}
          </h2>
          <p className="mt-2 text-slate-600">{t("home.tools.sub")}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {toolCards.map((tc) => (
            <ToolCard
              key={tc.id}
              title={t(`tool.${tc.id}.title`)}
              description={t(`tool.${tc.id}.desc`)}
              href={tc.href}
              icon={tc.icon}
            />
          ))}
        </div>
      </section>
    </>
  );
}
