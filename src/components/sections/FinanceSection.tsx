import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type FinanceSceneRefs = {
  financeRef: RefObject<HTMLDivElement | null>;
};

export function prepareFinanceScene(refs: FinanceSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.financeRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
}

export function animateFinanceScene(tl: SceneTimeline, refs: FinanceSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const { enterDur, exitDur, financeEnterT, financeExitT } = timings;

  tl.fromTo(refs.financeRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, financeEnterT);
  tl.to(refs.financeRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, financeExitT);
}

export type FinanceSectionProps = {
  financeRef: RefObject<HTMLDivElement | null>;
};

export const FinanceSection = forwardRef<HTMLDivElement, FinanceSectionProps>(function FinanceSection(
  { financeRef },
  _ref
) {
  return (
    <div
      ref={financeRef}
      className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
    >
      <h2 className="font-display text-xl font-bold tracking-tighter text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] sm:text-3xl sm:tracking-tight md:text-5xl md:tracking-[0.18em] lg:text-6xl">
        ФИНАНСИРОВАНИЕ ПРОЕКТОВ
      </h2>
      <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
        Вершины гор — стратегические инвестиции на высоте национальных приоритетов.
      </p>
    </div>
  );
});
