import type { Lang } from "@/lib/lang";

/** Display lines matching the original logo lockup (uppercase). */
export const BRAND_NAME_LINES: Record<Lang, readonly [string, string, string]> = {
  RU: ["НАЦИОНАЛЬНЫЙ", "ИНВЕСТИЦИОННЫЙ ФОНД", "КЫРГЫЗСКОЙ РЕСПУБЛИКИ"],
  KG: ["КЫРГЫЗ РЕСПУБЛИКАСЫНЫН", "УЛУТТУК ИНВЕСТИЦИЯЛЫК", "ФОНДУ"],
  EN: ["NATIONAL", "INVESTMENT FUND", "OF THE KYRGYZ REPUBLIC"],
  ZH: ["吉尔吉斯共和国", "国家投资", "基金"],
};

export const BRAND_NAME: Record<Lang, string> = {
  RU: BRAND_NAME_LINES.RU.join(" "),
  KG: BRAND_NAME_LINES.KG.join(" "),
  EN: BRAND_NAME_LINES.EN.join(" "),
  ZH: "吉尔吉斯共和国国家投资基金",
};

export const BRAND_SHORT: Record<Lang, string> = {
  RU: "НИФ КР",
  KG: "КР УИФ",
  EN: "NIF KR",
  ZH: "国家投资基金",
};

export function getBrandName(lang: Lang) {
  return BRAND_NAME[lang] ?? BRAND_NAME.RU;
}

export function getBrandNameLines(lang: Lang) {
  return BRAND_NAME_LINES[lang] ?? BRAND_NAME_LINES.RU;
}

export function getBrandShort(lang: Lang) {
  return BRAND_SHORT[lang] ?? BRAND_SHORT.RU;
}
