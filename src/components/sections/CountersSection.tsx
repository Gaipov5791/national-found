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

const COUNTER_CARD =
  "rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:rounded-3xl";

const COUNTER_LABEL =
  "mt-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:mt-2 sm:text-[10px] sm:tracking-[0.22em]";

export const CountersSection = forwardRef<HTMLDivElement, CountersSectionProps>(function CountersSection(
  { statsRef, countProjectsRef, counterProgress },
  _ref
) {
  return (
    <div
      ref={statsRef}
      className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-3 opacity-0 will-change-[transform,opacity] sm:px-6"
    >
      <div className="relative mx-auto w-full max-w-5xl text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[160%] w-[130%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,20,45,0.55) 0%, rgba(10,20,45,0.32) 40%, rgba(10,20,45,0) 70%)",
            filter: "blur(8px)",
          }}
        />
        <p className="font-display text-base tracking-tighter text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-2xl sm:tracking-tight md:text-4xl">
          Инвестиции в проекты будущего
        </p>

        <div className="mx-auto mt-3 flex w-full flex-col items-center gap-3 sm:mt-6 sm:gap-4">
          <div className={`${COUNTER_CARD} w-fit px-8 py-4 sm:px-10 sm:py-5`}>
            <div className="font-display text-3xl font-semibold tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl">
              <span ref={countProjectsRef}>0</span>
            </div>
            <div className={COUNTER_LABEL}>Проектов в реализации</div>
          </div>

          <div className={`${COUNTER_CARD} w-full max-w-[min(100%,52rem)] px-3 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6`}>
            <RollingSumCounter value={COUNTER_TOTAL_SUM} progress={counterProgress} suffix="с" size="large" />
            <div className={COUNTER_LABEL}>Общая сумма проектов</div>
          </div>
        </div>
      </div>
    </div>
  );
});
