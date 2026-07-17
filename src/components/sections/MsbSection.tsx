import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { useT } from "@/lib/lang";
import { DetailLinkButton } from "./DetailLinkButton";
import {
  SECTION_CTA_MARGIN,
  SECTION_HEADING,
  SECTION_HEADING_HERO,
  SECTION_SHELL,
  SECTION_SUBTEXT_MARGIN,
  SECTION_SUBTEXT_ON_IMAGE,
  SECTION_TOP_COMPACT,
} from "./sectionLayout";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type MsbSceneRefs = {
  msbRef: RefObject<HTMLDivElement | null>;
};

export function prepareMsbScene(refs: MsbSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.msbRef.current, { ...text.idle, xPercent: 0, x: 0 });
}

export function animateMsbScene(tl: SceneTimeline, refs: MsbSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const { msbEnterT, msbExitT, enterDur, exitDur } = timings;

  tl.fromTo(refs.msbRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, msbEnterT);
  tl.to(refs.msbRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, msbExitT);
}

export type MsbSectionProps = {
  msbRef: RefObject<HTMLDivElement | null>;
};

export const MsbSection = forwardRef<HTMLDivElement, MsbSectionProps>(function MsbSection({ msbRef }, _ref) {
  const t = useT();

  return (
    <div ref={msbRef} className={`${SECTION_SHELL} ${SECTION_TOP_COMPACT}`}>
      <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO}`}>{t.msb.heading}</h2>
      <p className={`${SECTION_SUBTEXT_ON_IMAGE} ${SECTION_SUBTEXT_MARGIN} text-white/90`}>{t.msb.blurb}</p>
      <DetailLinkButton to="/msb" originSection="sc_msb" containerClassName={SECTION_CTA_MARGIN} />
    </div>
  );
});
