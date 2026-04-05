"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  const footerLinks = [
    { href: "/about", label: t("footer.about") },
    { href: "/privacy-policy", label: t("footer.privacy") },
    { href: "/terms-of-use", label: t("footer.terms") },
  ];

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-icon.svg"
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0"
            />
            <p className="text-sm font-semibold text-[#111827] sm:text-base">
              {t("footer.copy")}
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="min-h-11 text-sm font-medium text-slate-600 underline-offset-4 hover:text-[#2563EB] hover:underline"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
