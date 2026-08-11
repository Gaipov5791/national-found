/** Responsive panorama + peaks hero used for LCP / seamless preload handoff. */
export const SCENE_IMAGES = {
  /** Desktop / default LCP panorama (responsive WebP). */
  panorama: "/images/горы-панорама-1920.webp",
  panoramaAvif: "/images/горы-панорама-1920.avif",
  /** Mobile panorama (narrower decode). */
  panoramaMobile: "/images/горы-панорама-1280.webp",
  panoramaMobileAvif: "/images/горы-панорама-1280.avif",
  /**
   * First-frame crop of the tall panorama at peaks stop (object-cover + 14% on 1920×1080).
   * Used as the home preload / fallback so the swap onto the live panorama is invisible.
   */
  peaksHero: "/images/горы-панорама-peaks-hero.webp",
  peaksHeroAvif: "/images/горы-панорама-peaks-hero.avif",
  peaksHeroJpg: "/images/горы-панорама-peaks-hero.jpg",
} as const;

/**
 * Storytelling % into the vertical strip.
 * Desktop uses these as `object-position` Y%; mobile maps them onto a translateY track.
 */
export const PANORAMA_STOPS = {
  peaks: 14,
  sonKul: 35,
  industrial: 50,
  pastures: 62,
  fields: 76,
} as const;

/** CSS object-position for the desktop peaks first frame (and matching hero crop). */
export const PANORAMA_PEAKS_OBJECT_POSITION = `center ${PANORAMA_STOPS.peaks}%` as const;
