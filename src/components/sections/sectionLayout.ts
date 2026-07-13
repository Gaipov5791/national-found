/**
 * Shared layout for scrollytelling section blocks.
 * Section headings sit below the fixed fund name with a small gap (per TZ).
 */

/** Matches Navbar brandRef vertical anchor. */
export const BRAND_TOP_CLASS = "top-[5.5rem] sm:top-[6rem] md:top-[7.75rem]";

/**
 * Tall sections (cards, multiple buttons): anchor below the logo without vertical centering
 * so headings never slide under the brand mark.
 */
export const SECTION_TOP_AFTER_BRAND =
  "top-[10rem] sm:top-[11.25rem] md:top-[13.75rem] lg:top-[14.25rem]";

/**
 * Compact text sections: visually centered on screen, shifted upward from geometric center.
 */
export const SECTION_TOP_SIMPLE_CENTER =
  "top-[44%] sm:top-[45%] md:top-[46%] -translate-y-1/2";

/** Default section block top. */
export const SECTION_TOP_DEFAULT = SECTION_TOP_AFTER_BRAND;

/** Sections with card grids below the heading. */
export const SECTION_TOP_WITH_CARDS = SECTION_TOP_AFTER_BRAND;

/** Compact text sections (text + button). */
export const SECTION_TOP_COMPACT = SECTION_TOP_SIMPLE_CENTER;

/** News section block position. */
export const SECTION_TOP_NEWS = SECTION_TOP_AFTER_BRAND;

/** Keeps long hero titles on one line without changing the shared heading scale. */
export const SECTION_HEADING_SINGLE_LINE =
  "whitespace-nowrap md:tracking-[0.14em] lg:tracking-[0.16em] xl:tracking-[0.18em]";

/** Heading scale shared with News for consistent logo-to-title spacing. */
export const SECTION_HEADING_HERO =
  "text-xl text-white sm:text-4xl md:text-6xl md:tracking-[0.18em] lg:text-7xl";

/** Gap below section subtext before card grid. */
export const SECTION_CARDS_GRID_MARGIN = "mt-3 sm:mt-4";

/** Top padding on card scroller — room for icons above card edge without pushing the heading. */
export const SECTION_CARDS_SCROLLER_PT = "pt-7 md:pt-10 lg:pt-10";

/** Gap below partners copy before logo strip. */
export const SECTION_PARTNERS_LOGOS_MARGIN = "mt-5 sm:mt-6 md:mt-8";

export const SECTION_HEADING =
  "font-display font-bold tracking-tighter drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)]";

export const SECTION_SUBTEXT =
  "mx-auto max-w-2xl px-1 text-[11px] leading-relaxed tracking-tight sm:px-0 sm:text-sm md:text-base md:tracking-normal";

/** Stronger shadow for white copy on photographic backgrounds. */
export const SECTION_SUBTEXT_ON_IMAGE =
  `${SECTION_SUBTEXT} drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]`;
