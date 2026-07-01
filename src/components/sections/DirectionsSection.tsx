import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type DirectionsSceneRefs = {
  directionsRef: RefObject<HTMLDivElement | null>;
};

export function prepareDirectionsScene(refs: DirectionsSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.directionsRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
}

export function animateDirectionsScene(tl: SceneTimeline, refs: DirectionsSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const { directionsEnterT, directionsExitT, enterDur, exitDur } = timings;

  tl.fromTo(refs.directionsRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, directionsEnterT);
  tl.to(refs.directionsRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, directionsExitT);
}

export type DirectionsSectionProps = {
  directionsRef: RefObject<HTMLDivElement | null>;
};

export const DirectionsSection = forwardRef<HTMLDivElement, DirectionsSectionProps>(function DirectionsSection(
  { directionsRef },
  _ref
) {
  return (
    <div
      ref={directionsRef}
      className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
    >
      <h2 className="font-display text-lg font-bold tracking-tighter text-white drop-shadow-[0_6px_36px_rgba(0,0,0,0.55)] sm:text-3xl sm:tracking-tight md:text-5xl md:tracking-[0.18em] lg:text-6xl">
        ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ
      </h2>
      <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
        Озеро Сон-Коль — стратегические отрасли, где капитал фонда раскрывает потенциал экономики.
      </p>
    </div>
  );
});
