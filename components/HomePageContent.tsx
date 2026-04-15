"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Smartphone, IndianRupee } from "lucide-react";
import { ToolCard, type AccentKey } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { toolCards } from "@/config/tools";
import { useI18n } from "@/lib/i18n";

const toolAccents: Record<string, AccentKey> = {
  passport: "blue",
  ssc:      "violet",
  pan:      "emerald",
  signature: "orange",
  aadhaar:  "teal",
  railway:  "rose",
  upsc:     "indigo",
};

const features = [
  {
    icon: ShieldCheck,
    label: "100% Private",
    sub: "Photos never leave your device",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Zap,
    label: "Instant",
    sub: "All processing in your browser",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Smartphone,
    label: "Mobile Ready",
    sub: "Works on any screen size",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: IndianRupee,
    label: "Always Free",
    sub: "No sign-up, no hidden costs",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
];

const steps = [
  {
    step: "1",
    title: "Upload Photo",
    desc: "Select any photo from your device.",
    color: "bg-blue-600",
  },
  {
    step: "2",
    title: "Crop & Adjust",
    desc: "Resize, crop, and set background.",
    color: "bg-violet-600",
  },
  {
    step: "3",
    title: "Download",
    desc: "Get your government-ready file instantly.",
    color: "bg-emerald-600",
  },
];

export function HomePageContent() {
  const { t } = useI18n();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200/80">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50/40" />
        <div className="absolute -top-32 -right-32 size-[520px] rounded-full bg-blue-100/50 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-32 size-[480px] rounded-full bg-orange-100/30 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">

          {/* India badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/80 px-4 py-1.5 text-sm font-semibold text-orange-700 shadow-sm backdrop-blur-sm">
            <span className="text-base">🇮🇳</span>
            Made for India
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl md:text-6xl">
            {t("home.hero.title")}
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-500 sm:text-xl">
            {t("home.hero.sub")}
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="min-h-14 touch-manipulation gap-2 px-8 text-base shadow-md shadow-blue-200" asChild>
              <Link href="#tools">
                {t("home.hero.cta")}
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </Button>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-white/80 hover:text-slate-900"
            >
              Learn more →
            </Link>
          </div>

          {/* Trust pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {["🔒 No uploads to server", "✅ No sign-up needed", "📱 Works on mobile", "⚡ Instant results"].map(
              (pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm"
                >
                  {pill}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Why choose us ──────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.label}
                className={`flex flex-col items-center gap-2 rounded-xl border ${f.border} ${f.bg} px-4 py-5 text-center`}
              >
                <div className={`flex size-10 items-center justify-center rounded-full bg-white shadow-sm ${f.color}`}>
                  <f.icon className="size-5" aria-hidden />
                </div>
                <p className="text-sm font-bold text-[#111827]">{f.label}</p>
                <p className="text-xs text-slate-500 leading-snug">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="mb-8 text-center text-xl font-bold text-[#111827] sm:text-2xl">
            How it works
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.step} className="relative flex items-start gap-4">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full ${s.color} text-sm font-bold text-white shadow-md`}
                >
                  {s.step}
                </div>
                {/* Connector line (hidden on last) */}
                {i < steps.length - 1 && (
                  <div className="absolute left-10 top-5 hidden h-0.5 w-[calc(100%-2.5rem+1.5rem)] -translate-y-0.5 bg-slate-200 sm:block" aria-hidden />
                )}
                <div>
                  <p className="font-semibold text-[#111827]">{s.title}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools grid ─────────────────────────────────────────── */}
      <section
        id="tools"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16"
      >
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600">
            Tools
          </span>
          <h2 className="text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
            {t("home.tools.title")}
          </h2>
          <p className="mt-2 text-slate-500">{t("home.tools.sub")}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {toolCards.map((tc) => (
            <ToolCard
              key={tc.id}
              title={t(`tool.${tc.id}.title`)}
              description={t(`tool.${tc.id}.desc`)}
              href={tc.href}
              icon={tc.icon}
              accent={toolAccents[tc.id] ?? "blue"}
            />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA banner ──────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-12 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <div>
            <p className="text-xl font-bold text-white">
              Ready to create your government-ready photo?
            </p>
            <p className="mt-1 text-sm text-blue-200">
              Free • Instant • 100% Private — processed only on your device.
            </p>
          </div>
          <Button
            size="lg"
            className="shrink-0 bg-white text-blue-700 shadow-lg hover:bg-blue-50 hover:text-blue-800 min-h-12"
            asChild
          >
            <Link href="#tools" className="gap-2">
              Get Started
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
