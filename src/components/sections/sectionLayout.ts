/**
 * Shared layout for scrollytelling section blocks.
 * Section headings sit below the fixed fund name with a small gap (per TZ).
 */

/** Matches Navbar brandRef vertical anchor. */
export const BRAND_TOP_CLASS = "top-[5.5rem] sm:top-[6rem] md:top-[7.75rem]";

/**
 * Logo-to-heading anchor — starts just below logo-blue.png (h-10 … 2xl:h-16).
 * Calibrated against the News section rhythm.
 */
export const SECTION_TOP_AFTER_BRAND =
  "top-[8.75rem] sm:top-[9.75rem] md:top-[12rem] lg:top-[12.5rem]";

/** Default section block top (matches News rhythm). */
export const SECTION_TOP_DEFAULT = SECTION_TOP_AFTER_BRAND;

/** Sections with card grids below the heading. */
export const SECTION_TOP_WITH_CARDS = SECTION_TOP_AFTER_BRAND;

/** Sections with compact content below the heading (e.g. map). */
export const SECTION_TOP_COMPACT = SECTION_TOP_AFTER_BRAND;

/** News section heading — reference rhythm for logo-to-title gap. */
export const SECTION_TOP_NEWS = SECTION_TOP_AFTER_BRAND;

/** Heading scale shared with News for consistent logo-to-title spacing. */
export const SECTION_HEADING_HERO =
  "text-xl text-white sm:text-4xl md:text-6xl md:tracking-[0.18em] lg:text-7xl";

/** Gap below section subtext before card grid. */
export const SECTION_CARDS_GRID_MARGIN = "mt-3 sm:mt-4";

/** Top padding on card scroller — room for icons above card edge without pushing the heading. */
export const SECTION_CARDS_SCROLLER_PT = "pt-7 md:pt-10 lg:pt-10";

/** Gap below partners copy before logo strip. */
export const SECTION_PARTNERS_LOGOS_MARGIN = "mt-9 sm:mt-11 md:mt-14";

export const SECTION_HEADING =
  "font-display font-bold tracking-tighter drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)]";
export const SECTION_SUBTEXT =
  "mx-auto max-w-2xl px-1 text-[11px] leading-relaxed tracking-tight sm:px-0 sm:text-sm md:text-base md:tracking-normal";
