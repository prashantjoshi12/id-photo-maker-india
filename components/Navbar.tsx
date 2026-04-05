"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { brandColors } from "@/styles/colors";

export function Navbar() {
  const { t } = useI18n();

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/#tools", label: t("nav.tools") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-lg pr-1 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-initial sm:min-w-0"
          style={{ outlineColor: brandColors.primary }}
          aria-label="ID Photo Maker India — Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-icon.svg"
            alt=""
            width={40}
            height={40}
            className="size-9 shrink-0 sm:size-10"
          />
          <span className="min-w-0 line-clamp-2 text-left text-xs font-bold leading-tight tracking-tight text-[#111827] sm:line-clamp-none sm:text-base sm:leading-normal md:text-lg">
            ID Photo Maker India
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-0.5 sm:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#2563EB]",
                  "min-h-11 inline-flex items-center justify-center"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
      <nav
        className="mx-auto flex max-w-6xl justify-center gap-1 border-t border-slate-100 px-2 py-2 sm:hidden"
        aria-label="Main mobile"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="min-h-12 flex-1 rounded-lg px-2 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
