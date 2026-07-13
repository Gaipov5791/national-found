import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { SECTION_CENTER_VIEWPORT } from "./sectionLayout";
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
  return (
    <div
      ref={decreeRef}
      className={`pointer-events-none absolute inset-x-0 ${SECTION_CENTER_VIEWPORT} z-[25] px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6`}
    >
      <p className="font-display text-sm tracking-tight text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-base md:text-lg">
        Фонд учрежден постановлением
      </p>
      <h2 className="mt-2 font-display text-xl font-bold leading-snug tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-2xl sm:tracking-tight md:text-4xl lg:text-5xl">
        Кабинета Министров Кыргызской Республики
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-[11px] leading-relaxed tracking-tight text-white/75 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:mt-5 sm:text-xs md:text-sm">
        от 5 ноября 2024 года № 666 во исполнение Закона Кыргызской Республики «О Национальном инвестиционном
        фонде Кыргызской Республики» и Указа Президента Кыргызской Республики № 155 от 14 июня 2024 года.
      </p>
    </div>
  );
});
