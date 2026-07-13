/**
 * Shared layout for scrollytelling section blocks.
 * Section headings sit below the fixed fund name with a small gap (per TZ).
 */

/** Matches Navbar brandRef vertical anchor. */
export const BRAND_TOP_CLASS = "top-[5.5rem] sm:top-[6rem] md:top-[7.75rem]";

/**
 * Vertically center section content on the viewport with extra clearance below the fixed logo.
 */
export const SECTION_CENTER_VIEWPORT =
  "top-[54%] sm:top-[55%] md:top-[56%] -translate-y-1/2";

/** Logo-to-heading anchor — vertically centered with logo clearance. */
export const SECTION_TOP_AFTER_BRAND = SECTION_CENTER_VIEWPORT;

/** Default section block position. */
export const SECTION_TOP_DEFAULT = SECTION_CENTER_VIEWPORT;

/** Sections with card grids below the heading. */
export const SECTION_TOP_WITH_CARDS = SECTION_CENTER_VIEWPORT;

/** Sections with compact content below the heading. */
export const SECTION_TOP_COMPACT = SECTION_CENTER_VIEWPORT;

/** News section block position. */
export const SECTION_TOP_NEWS = SECTION_CENTER_VIEWPORT;

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
