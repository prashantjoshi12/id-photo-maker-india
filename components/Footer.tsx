"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  const footerLinks = [
    { href: "/about", label: t("footer.about") },
    { href: "/privacy-policy", label: t("footer.privacy") },
    { href: "/terms-and-conditions", label: t("footer.termsAndConditions") },
    { href: "/contact", label: t("footer.contact") },
  ];

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">

        {/* Top row */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-icon.svg"
                alt=""
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-lg"
              />
              <div>
                <p className="text-sm font-bold text-white sm:text-base">
                  ID Photo Maker India
                </p>
                <p className="text-xs text-slate-400">
                  Government-ready photos in seconds
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <nav
            className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 sm:justify-end"
            aria-label="Footer navigation"
          >
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="min-h-10 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-slate-800" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-slate-500">
            {t("footer.copy")} · All image processing runs entirely in your browser. No files are uploaded.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FF9933]" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-white"     aria-hidden />
            <span className="h-2 w-2 rounded-full bg-[#138808]" aria-hidden />
            <span className="ml-1 text-xs text-slate-500">Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
