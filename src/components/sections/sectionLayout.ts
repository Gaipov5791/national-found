/**
 * Shared layout for scrollytelling section blocks.
 * Section headings sit below the fixed fund name with a small gap (per TZ).
 */

/** Matches Navbar brandRef vertical anchor. */
export const BRAND_TOP_CLASS = "top-[5.5rem] sm:top-[6rem] md:top-[7.75rem]";

/** Section block top — fund name bottom + small margin. */
export const SECTION_TOP_DEFAULT =
  "top-[9rem] sm:top-[10rem] md:top-[13rem] lg:top-[13.5rem]";

/** Sections with card grids share the same heading anchor. */
export const SECTION_TOP_WITH_CARDS = SECTION_TOP_DEFAULT;

/** Text-only sections without extra content below. */
export const SECTION_TOP_COMPACT = SECTION_TOP_DEFAULT;

export const SECTION_HEADING =
  "font-display font-bold tracking-tighter drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)]";
export const SECTION_SUBTEXT =
  "mx-auto max-w-2xl px-1 text-[11px] leading-relaxed tracking-tight sm:px-0 sm:text-sm md:text-base md:tracking-normal";
