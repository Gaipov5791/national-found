export const SCENE_IMAGES = {
  /** Full vertical strip — JPEG fallback. */
  panorama: "/images/горы-панорама.jpeg",
  /** Full vertical strip — WebP (desktop + mobile). */
  panoramaWebp: "/images/горы-панорама.webp",
  /**
   * First-viewport crop of the peaks band (matches object-position center 14%).
   * Used for LCP / preload so the tall strip does not block first paint.
   */
  hero: "/images/горы-панорама-hero.jpg",
  heroWebp: "/images/горы-панорама-hero.webp",
} as const;
