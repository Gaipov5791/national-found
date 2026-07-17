import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { useT } from "@/lib/lang";
import { SECTION_PAD_X, SECTION_SUBTEXT_ON_IMAGE, SECTION_TOP_SIMPLE_CENTER } from "./sectionLayout";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type DecreeSceneRefs = {
  decreeRef: RefObject<HTMLDivElement | null>;
};

export function prepareDecreeScene(refs: DecreeSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.decreeRef.current, { ...text.idle, xPercent: 0, x: 0 });
}

export function animateDecreeScene(tl: SceneTimeline, refs: DecreeSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const { enterDur, exitDur, decreeCloudsT, decreeExitT } = timings;

  tl.fromTo(refs.decreeRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, decreeCloudsT);
  tl.to(refs.decreeRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, decreeExitT);
}

export type DecreeSectionProps = {
  decreeRef: RefObject<HTMLDivElement | null>;
};

export const DecreeSection = forwardRef<HTMLDivElement, DecreeSectionProps>(function DecreeSection(
  { decreeRef },
  _ref
) {
  const t = useT();

  return (
    <div
      ref={decreeRef}
      className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_SIMPLE_CENTER} z-[25] ${SECTION_PAD_X} text-center opacity-0 will-change-[transform,opacity]`}
    >
      <p className="font-display text-sm tracking-tight text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] sm:text-base md:text-lg">
        {t.decree.line1}
      </p>
      <h2 className="mt-2 font-display text-xl font-bold leading-snug tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)] sm:text-2xl sm:tracking-tight md:text-4xl lg:text-5xl">
        {t.decree.line2}
      </h2>
      <p className={`${SECTION_SUBTEXT_ON_IMAGE} mt-2 text-white/90 sm:mt-3`}>{t.decree.body}</p>
    </div>
  );
});
