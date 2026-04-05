"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import enDefault from "@/locales/en.json";

export type Lang = "en" | "hi" | "gu";

type Dict = Record<string, string>;

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  ready: boolean;
};

const I18nContext = createContext<I18nContextValue | null>(null);

async function loadDict(lang: Lang): Promise<Dict> {
  switch (lang) {
    case "hi":
      return (await import("@/locales/hi.json")).default as Dict;
    case "gu":
      return (await import("@/locales/gu.json")).default as Dict;
    default:
      return (await import("@/locales/en.json")).default as Dict;
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [dict, setDict] = useState<Dict>(() => enDefault as Dict);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("gpm-lang") as Lang | null;
    if (stored === "hi" || stored === "gu" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (lang === "en") {
      setDict(enDefault as Dict);
      setReady(true);
      return;
    }
    setReady(false);
    loadDict(lang).then((d) => {
      if (!cancelled) {
        setDict(d);
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("gpm-lang", l);
    document.documentElement.lang = l === "en" ? "en" : l;
  }, []);

  const t = useCallback(
    (key: string) => dict[key] ?? key,
    [dict]
  );

  const value = useMemo(
    () => ({ lang, setLang, t, ready }),
    [lang, setLang, t, ready]
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
