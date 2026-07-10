import type { RefObject } from "react";
import gsap from "gsap";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type HeroSceneRefs = {
  brandRef: RefObject<HTMLDivElement | null>;
};

export function prepareHeroScene(refs: HeroSceneRefs, ctx: SceneAnimationContext) {
  const { brandStartY } = ctx;
  gsap.set(refs.brandRef.current, { autoAlpha: 0, y: brandStartY, scale: 0.97 });
}

export function animateHeroScene(tl: SceneTimeline, refs: HeroSceneRefs, ctx: SceneAnimationContext) {
  const { brandStartY, text } = ctx;
  const brandDockDur = 0.08;

  tl.fromTo(
    refs.brandRef.current,
    { autoAlpha: 0, y: brandStartY, scale: 0.97 },
    { autoAlpha: 1, y: 0, scale: 1, duration: brandDockDur, ease: text.enterEase },
    0
  );
}

export const HeroSection = function HeroSection() {
  return null;
};
