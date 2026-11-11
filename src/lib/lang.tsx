import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getMessages, loadMessages, peekMessages, type Messages } from "@/lib/i18n/messages";

export const LANGS = ["RU", "KG", "EN", "ZH"] as const;
export type Lang = (typeof LANGS)[number];

/** UI label for language buttons (ZH is shown as CN). */
export function langDisplayLabel(lang: Lang): string {
  return lang === "ZH" ? "CN" : lang;
}

const HTML_LANG: Record<Lang, string> = {
  RU: "ru",
  KG: "ky",
  EN: "en",
  ZH: "zh-CN",
};

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Messages;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  children,
  initialLang = "RU",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [t, setT] = useState<Messages>(() => getMessages(initialLang));
  const requestId = useRef(0);

  const setLang = useCallback((next: Lang) => {
    const cached = peekMessages(next);
    if (cached) {
      requestId.current += 1;
      setLangState(next);
      setT(cached);
      return;
    }

    const id = ++requestId.current;
    void loadMessages(next).then((messages) => {
      if (requestId.current !== id) return;
      setLangState(next);
      setT(messages);
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  const value = useMemo<LangContextValue>(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

/** Localized copy for the active language. */
export function useT() {
  return useLang().t;
}
