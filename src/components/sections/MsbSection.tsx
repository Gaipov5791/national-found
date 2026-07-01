import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type MsbSceneRefs = {
  msbRef: RefObject<HTMLDivElement | null>;
};

export function prepareMsbScene(refs: MsbSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.msbRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
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

export const MsbSection = forwardRef<HTMLDivElement, MsbSectionProps>(function MsbSection(
  { msbRef },
  _ref
) {
  return (
    <div
      ref={msbRef}
      className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
    >
      <h2 className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-[0_6px_32px_rgba(0,0,0,0.55)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.18em] lg:text-7xl">
        ПРОЕКТЫ МСБ
      </h2>
      <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-white/88 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
        Пастбища и жайлоо — поддержка малого и среднего бизнеса, где идеи превращаются в устойчивый рост.
      </p>
    </div>
  );
});
