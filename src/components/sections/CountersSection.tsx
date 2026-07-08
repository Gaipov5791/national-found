import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { RollingSumCounter, formatProjectCount } from "./RollingSumCounter";
import {
  COUNTER_PROJECTS,
  COUNTER_TOTAL_SUM,
  mapCounterProgress,
  type SceneAnimationContext,
  type SceneTimeline,
} from "./sceneAnimationShared";

export type CountersSceneRefs = {
  statsRef: RefObject<HTMLDivElement | null>;
  countProjectsRef: RefObject<HTMLSpanElement | null>;
};

export function prepareCountersScene(refs: CountersSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.statsRef.current, { ...text.idle, xPercent: 0, x: 0 });
}

export function createCountUpdater(refs: CountersSceneRefs, ctx: SceneAnimationContext) {
  const { timings } = ctx;

  return (timelineTime: number) => {
    const p = mapCounterProgress(timelineTime, timings);
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

const COUNTER_LABEL =
  "mt-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:mt-2 sm:text-[10px] sm:tracking-[0.22em]";

const COUNTER_VALUE =
  "font-display text-3xl font-semibold tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl";

export const CountersSection = forwardRef<HTMLDivElement, CountersSectionProps>(function CountersSection(
  { statsRef, countProjectsRef, counterProgress },
  _ref
) {
  return (
    <div
      ref={statsRef}
      className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-3 opacity-0 will-change-[transform,opacity] sm:px-6"
    >
      <div className="relative mx-auto w-full max-w-7xl text-center">
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

        <div className="mx-auto mt-3 w-full max-w-[min(100%,96rem)] rounded-2xl border border-white/30 bg-white/10 px-5 py-4 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:mt-6 sm:grid sm:grid-cols-[max-content_1px_minmax(36rem,1fr)] sm:items-center sm:gap-x-8 sm:rounded-3xl sm:px-10 sm:py-6 md:gap-x-12 md:px-16 lg:px-20">
          <div className="shrink-0 text-center">
            <div className={COUNTER_VALUE}>
              <span ref={countProjectsRef}>0</span>
            </div>
            <div className={COUNTER_LABEL}>Проектов в реализации</div>
          </div>

          <div className="my-4 h-px w-full bg-white/25 sm:my-0 sm:h-auto sm:w-px sm:justify-self-center sm:self-stretch" />

          <div className="overflow-visible text-center sm:min-w-[min(100%,58rem)] sm:px-4">
            <RollingSumCounter
              value={COUNTER_TOTAL_SUM}
              progress={counterProgress}
              suffix="с"
              className={COUNTER_VALUE}
              wideDigits
            />
            <div className={COUNTER_LABEL}>Общая сумма проектов</div>
          </div>
        </div>
      </div>
    </div>
  );
});
