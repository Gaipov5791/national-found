import type { Lang } from "@/lib/lang";

export type L10nText = Record<Lang, string>;

export function pickL10n(value: L10nText, lang: Lang): string {
  return value[lang] ?? value.RU;
}
