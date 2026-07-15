export const SECTION_SCENE_LABELS = [
  "sc_hero",
  "sc_about",
  "sc_finance",
  "sc_directions",
  "sc_msb",
  "sc_partners",
  "sc_news",
  "sc_footer",
] as const;

export type SectionSceneLabel = (typeof SECTION_SCENE_LABELS)[number];

export function getSectionSceneLabel(hash: string): SectionSceneLabel | null {
  const label = hash.replace(/^#/, "");

  return SECTION_SCENE_LABELS.includes(label as SectionSceneLabel)
    ? (label as SectionSceneLabel)
    : null;
}
