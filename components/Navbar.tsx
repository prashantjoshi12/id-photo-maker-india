"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/#tools", label: t("nav.tools") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    const base = href.split("#")[0];
    return base !== "/" && pathname.startsWith(base);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm shadow-slate-200/50">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6">

        {/* Brand */}
        <Link
          href="/"
          className="group flex min-h-11 min-w-0 flex-1 items-center gap-2.5 rounded-lg pr-1 outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 sm:flex-initial"
          aria-label="ID Photo Maker India — Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-icon.svg"
            alt=""
            width={40}
            height={40}
            className="size-9 shrink-0 sm:size-10 transition-transform group-hover:scale-105"
          />
          <div className="min-w-0 hidden sm:block">
            <span className="block text-base font-extrabold leading-tight tracking-tight text-[#111827] md:text-lg">
              ID Photo Maker
              <span className="ml-1.5 rounded bg-orange-100 px-1.5 py-0.5 text-xs font-bold tracking-wider text-orange-600 align-middle">
                INDIA
              </span>
            </span>
          </div>
          <span className="min-w-0 line-clamp-2 text-left text-xs font-bold leading-tight text-[#111827] sm:hidden">
            ID Photo Maker India
          </span>
        </Link>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 sm:flex" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-all min-h-10 inline-flex items-center justify-center",
                  isActive(l.href)
                    ? "bg-blue-50 text-[#2563EB]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#2563EB]" />
                )}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="mx-auto flex max-w-6xl justify-center gap-1 border-t border-slate-100 px-2 py-1.5 sm:hidden"
        aria-label="Main navigation mobile"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "min-h-10 flex-1 rounded-lg px-2 py-1.5 text-center text-xs font-semibold transition-colors",
              isActive(l.href)
                ? "bg-blue-50 text-[#2563EB]"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
