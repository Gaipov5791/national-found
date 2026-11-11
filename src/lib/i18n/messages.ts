import type { Lang } from "@/lib/lang";
import { ru } from "@/lib/i18n/ru";
import type { Messages } from "@/lib/i18n/types";

export type { Messages } from "@/lib/i18n/types";

const cache: Partial<Record<Lang, Messages>> = { RU: ru };

export function peekMessages(lang: Lang): Messages | undefined {
  return cache[lang];
}

/** Dictionary for `lang` once it has been loaded. Russian is always available. */
export function getMessages(lang: Lang): Messages {
  return cache[lang] ?? ru;
}

export async function loadMessages(lang: Lang): Promise<Messages> {
  const cached = cache[lang];
  if (cached) return cached;

  const messages =
    lang === "KG"
      ? (await import("@/lib/i18n/kg")).kg
      : lang === "EN"
        ? (await import("@/lib/i18n/en")).en
        : lang === "ZH"
          ? (await import("@/lib/i18n/zh")).zh
          : ru;

  cache[lang] = messages;
  return messages;
}
