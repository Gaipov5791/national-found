import type { RefObject } from "react";
import { SCENE_IMAGES } from "./sceneImages";

/** Same initial framing before and after the animation module loads. */
export function PanoramaImage({ imageRef }: { imageRef?: RefObject<HTMLImageElement | null> }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={SCENE_IMAGES.panoramaPreview}
        alt=""
        aria-hidden
        className="panorama-image absolute inset-0"
      />
      <picture className="absolute inset-0 block h-full w-full overflow-hidden">
        <source media="(max-width: 767px)" srcSet={SCENE_IMAGES.panoramaMobile} type="image/webp" />
        <img
          ref={imageRef}
          src={SCENE_IMAGES.panorama}
          alt=""
          className="panorama-image will-change-[transform,object-position]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="pointer-events-none absolute inset-0 bg-ink/20" aria-hidden />
    </div>
  );
}