/**
 * Shared layout for scrollytelling section blocks.
 * Section headings sit below the fixed fund name with a small gap (per TZ).
 *
 * Mobile: every content section shares one vertical anchor near mid-viewport
 * (no CSS translate — GSAP owns transform via yPercent).
 */

/** Matches Navbar brandRef vertical anchor. */
export const BRAND_TOP_CLASS = "top-[5.5rem] sm:top-[6rem] md:top-[7.75rem]";

/**
 * Unified mobile section top — visually mid-screen so content isn't stuck
 * under the nav with a large empty gap below.
 */
export const SECTION_TOP_MOBILE = "top-[42%] sm:top-[44%]";

/** Shared horizontal padding for section shells. */
export const SECTION_PAD_X = "px-3 sm:px-6";

/** Gap below heading before subtext. */
export const SECTION_SUBTEXT_MARGIN = "mt-2 sm:mt-3";

/** Gap below section copy before CTA. */
export const SECTION_CTA_MARGIN = "mt-3 sm:mt-4";

/**
 * Tall sections (cards, multiple buttons): same mobile center as others;
 * from md+ anchored below the logo.
 */
export const SECTION_TOP_AFTER_BRAND =
  `${SECTION_TOP_MOBILE} md:top-[13.75rem] lg:top-[14.25rem]`;

/**
 * Compact text sections: same mobile center;
 * from md+ keep a mild CSS center offset under the brand.
 */
export const SECTION_TOP_SIMPLE_CENTER =
  `${SECTION_TOP_MOBILE} md:top-[46%] md:-translate-y-1/2`;

/** Default section block top. */
export const SECTION_TOP_DEFAULT = SECTION_TOP_AFTER_BRAND;

/** Sections with card grids below the heading. */
export const SECTION_TOP_WITH_CARDS = SECTION_TOP_AFTER_BRAND;

/** Compact text sections (text + button). */
export const SECTION_TOP_COMPACT = SECTION_TOP_SIMPLE_CENTER;

/** News section block position. */
export const SECTION_TOP_NEWS = SECTION_TOP_AFTER_BRAND;

/** Shell classes shared by most scrollytelling sections. */
export const SECTION_SHELL =
  `pointer-events-none absolute inset-x-0 z-30 text-center opacity-0 will-change-[transform,opacity] ${SECTION_PAD_X}`;

/** Keeps long hero titles on one line without changing the shared heading scale. */
export const SECTION_HEADING_SINGLE_LINE =
  "whitespace-nowrap md:tracking-[0.14em] lg:tracking-[0.16em] xl:tracking-[0.18em]";

/** Heading scale shared with News for consistent logo-to-title spacing. */
export const SECTION_HEADING_HERO =
  "text-xl text-white sm:text-4xl md:text-6xl md:tracking-[0.18em] lg:text-7xl";

/** Gap below section subtext before card grid. */
export const SECTION_CARDS_GRID_MARGIN = "mt-3 sm:mt-4";

/**
 * Top padding on card scroller — room for icons above card edge without pushing the heading.
 * Must cover SectionCardIcon compact offsets (-top-11 / sm:-top-14); overflow-x on the
 * scroller forces vertical clipping, so insufficient pt cuts icons at the top.
 */
export const SECTION_CARDS_SCROLLER_PT = "pt-12 sm:pt-16";

/**
 * Detail-page grids with overhanging card icons: keep column gap modest, but give
 * rows enough space so icons from the next row don't cover the card above.
 */
export const DETAIL_CARDS_GRID =
  "grid grid-cols-1 gap-x-5 gap-y-20 pt-16 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-24 sm:pt-20";

export const SECTION_HEADING =
  "font-display font-bold tracking-tighter drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)]";

export const SECTION_SUBTEXT =
  "mx-auto max-w-2xl px-1 text-xs leading-relaxed tracking-tight sm:px-0 sm:text-sm md:text-[15px] md:tracking-normal";

/** Stronger shadow for white copy on photographic backgrounds. */
export const SECTION_SUBTEXT_ON_IMAGE =
  `${SECTION_SUBTEXT} drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]`;
