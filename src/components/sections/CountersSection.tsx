import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { RollingSumCounter, formatProjectCount } from "./RollingSumCounter";
import {
  COUNTER_PROJECTS,
  COUNTER_TOTAL_SUM,
  type SceneAnimationContext,
  type SceneTimeline,
} from "./sceneAnimationShared";

export type CountersSceneRefs = {
  statsRef: RefObject<HTMLDivElement | null>;
  countProjectsRef: RefObject<HTMLSpanElement | null>;
};

export function prepareCountersScene(refs: CountersSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.statsRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
}

export function createCountUpdater(refs: CountersSceneRefs, ctx: SceneAnimationContext) {
  const { timings } = ctx;
  const { statsEnterT, enterDur } = timings;
  /** Counter reaches target early — remaining scroll time is the hold/pause. */
  const counterCompleteT = statsEnterT + enterDur + 0.012;

  return (progress: number) => {
    const p = Math.max(0, Math.min(1, (progress - statsEnterT) / (counterCompleteT - statsEnterT)));
    if (refs.countProjectsRef.current) {
      refs.countProjectsRef.current.textContent = formatProjectCount(COUNTER_PROJECTS, p);
    }
  };
}

export function animateCountersScene(tl: SceneTimeline, refs: CountersSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const { statsEnterT, statsExitT, enterDur, exitDur } = timings;

  tl.fromTo(refs.statsRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, statsEnterT);
  tl.to(refs.statsRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, statsExitT);
}

export type CountersSectionProps = {
  statsRef: RefObject<HTMLDivElement | null>;
  countProjectsRef: RefObject<HTMLSpanElement | null>;
  counterProgress: number;
};

export const CountersSection = forwardRef<HTMLDivElement, CountersSectionProps>(function CountersSection(
  { statsRef, countProjectsRef, counterProgress },
  _ref
) {
  return (
    <div
      ref={statsRef}
      className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-3 opacity-0 will-change-[transform,opacity] sm:px-6"
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[120%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,20,45,0.55) 0%, rgba(10,20,45,0.32) 40%, rgba(10,20,45,0) 70%)",
            filter: "blur(8px)",
          }}
        />
        <p className="font-display text-base tracking-tighter text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-2xl sm:tracking-tight md:text-4xl">
          Инвестиции в проекты будущего
        </p>
        <div className="mt-3 flex flex-col items-stretch gap-3 rounded-2xl border border-white/30 bg-white/10 px-4 py-3 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:mt-6 sm:gap-4 sm:rounded-3xl sm:px-8 sm:py-6 md:inline-flex md:flex-row md:gap-10">
          <div className="min-w-0 text-center">
            <div className="font-display text-2xl font-semibold tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl sm:tracking-tight md:text-5xl lg:text-6xl">
              <span ref={countProjectsRef}>0</span>
            </div>
            <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:mt-2 sm:text-[10px] sm:tracking-[0.25em]">
              Проектов в реализации
            </div>
          </div>
          <div className="hidden h-px w-full bg-white/25 md:block md:h-auto md:w-px" />
          <div className="min-w-0 text-center">
            <RollingSumCounter value={COUNTER_TOTAL_SUM} progress={counterProgress} suffix="с" compact />
            <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:mt-2 sm:text-[10px] sm:tracking-[0.25em]">
              Общая сумма проектов
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
