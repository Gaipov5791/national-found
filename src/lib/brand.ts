import type { Lang } from "@/lib/lang";

export const BRAND_NAME: Record<Lang, string> = {
  RU: "Национальный инвестиционный фонд Кыргызской Республики",
  KG: "Кыргыз Республикасынын Улуттук Инвестициялык Фонду",
  EN: "National Investment Fund of the Kyrgyz Republic",
};

export function getBrandName(lang: Lang) {
  return BRAND_NAME[lang] ?? BRAND_NAME.RU;
}

