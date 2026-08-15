export const MOUNTAINS_SRC = "/images/mountains.jpg";

export const SCENE_IMAGES = {
  panorama: "/images/горы-панорама.jpeg",
  panoramaMobile: "/images/горы-панорама.webp",
} as const;

const decodedImages = new Set<string>();
const inflight = new Map<string, Promise<void>>();

/** DevTools filter: `[nif-bg]`. Kept on so we can confirm flicker sources in preview. */
export function logBg(event: string, detail?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  console.info(`[nif-bg] ${event}`, {
    t: Math.round(performance.now()),
    href: `${window.location.pathname}${window.location.hash}`,
    ...detail,
  });
}

export function isImageDecoded(src: string) {
  return decodedImages.has(src);
}

export function getPanoramaSrc() {
  if (typeof window === "undefined") return SCENE_IMAGES.panorama;
  return window.matchMedia("(max-width: 767px)").matches
    ? SCENE_IMAGES.panoramaMobile
    : SCENE_IMAGES.panorama;
}

export function preloadDecodedImage(src: string): Promise<void> {
  const existing = inflight.get(src);
  if (existing) return existing;

  const promise = (async () => {
    logBg("image:preload-start", { src, alreadyDecoded: decodedImages.has(src) });
    const img = new Image();
    img.decoding = "async";
    img.src = src;

    try {
      if (typeof img.decode === "function") {
        await img.decode();
      } else {
        await new Promise<void>((resolve, reject) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load ${src}`));
        });
      }
      decodedImages.add(src);
      logBg("image:decoded", {
        src,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    } catch (error) {
      logBg("image:error", { src, error: String(error) });
      throw error;
    }
  })();

  inflight.set(src, promise);
  return promise;
}

export function preloadSceneBackgrounds() {
  const panoramaSrc = getPanoramaSrc();
  logBg("preload:scene-backgrounds", { mountains: MOUNTAINS_SRC, panoramaSrc });
  return Promise.allSettled([preloadDecodedImage(MOUNTAINS_SRC), preloadDecodedImage(panoramaSrc)]);
}
