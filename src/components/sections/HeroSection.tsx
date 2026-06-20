import { forwardRef, type RefObject } from "react";
import { SCENE_IMAGES } from "./sceneImages";

export type HeroSectionProps = {
  heroBgRef: RefObject<HTMLImageElement | null>;
  cloudDriftRef: RefObject<HTMLDivElement | null>;
};

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(function HeroSection(
  { heroBgRef, cloudDriftRef },
  _ref
) {
  return (
    <>
      <div ref={cloudDriftRef} className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <div
          className="absolute left-[-10%] top-[12%] h-[28vh] w-[55vw] rounded-full bg-gradient-to-t from-white/70 via-white/40 to-transparent blur-[150px] scale-150"
          style={{ maskImage: "radial-gradient(ellipse 100% 100% at center, white 60%, transparent 100%)" }}
        />
        <div
          className="absolute right-[-8%] top-[22%] h-[24vh] w-[45vw] rounded-full bg-gradient-to-t from-white/60 via-white/30 to-transparent blur-[150px] scale-150"
          style={{ maskImage: "radial-gradient(ellipse 100% 100% at center, white 60%, transparent 100%)" }}
        />
        <div
          className="absolute left-[20%] top-[6%] h-[18vh] w-[35vw] rounded-full bg-gradient-to-t from-white/50 via-white/25 to-transparent blur-[150px] scale-150"
          style={{ maskImage: "radial-gradient(ellipse 100% 100% at center, white 60%, transparent 100%)" }}
        />
      </div>

      <img
        ref={heroBgRef}
        src={SCENE_IMAGES.hero}
        alt="Горы"
        className="scene-gpu-layer absolute inset-0 z-0 h-full w-full object-cover object-bottom will-change-[transform,opacity]"
        style={{ transformOrigin: "50% 70%" }}
      />
    </>
  );
});
