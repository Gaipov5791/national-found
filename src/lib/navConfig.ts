import type { SectionSceneLabel } from "@/lib/sectionNavigation";

export const NAV_CONFIG = [
  { id: "home", scene: "sc_hero" },
  { id: "about", scene: "sc_about" },
  { id: "finance", scene: "sc_finance" },
  { id: "directions", scene: "sc_directions" },
  { id: "msb", scene: "sc_msb" },
  { id: "partners", scene: "sc_partners" },
  { id: "news", scene: "sc_news" },
  { id: "contacts", scene: "sc_footer" },
] as const;

export type NavId = (typeof NAV_CONFIG)[number]["id"];

export const NAV_SCENE_BY_ID: Record<NavId, SectionSceneLabel> = {
  home: "sc_hero",
  about: "sc_about",
  finance: "sc_finance",
  directions: "sc_directions",
  msb: "sc_msb",
  partners: "sc_partners",
  news: "sc_news",
  contacts: "sc_footer",
};
