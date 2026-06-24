import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type FinanceSceneRefs = {
  financeRef: RefObject<HTMLDivElement | null>;
  wipe2HazeRef: RefObject<HTMLDivElement | null>;
  wipe2BackRef: RefObject<HTMLDivElement | null>;
  wipe2MidRef: RefObject<HTMLDivElement | null>;
  wipe2FrontRef: RefObject<HTMLDivElement | null>;
};

export function prepareFinanceScene(refs: FinanceSceneRefs, ctx: SceneAnimationContext) {
  const { mobile, text, sz } = ctx;

  if (!mobile) {
    [refs.wipe2BackRef, refs.wipe2MidRef, refs.wipe2FrontRef].forEach((r, i) => {
      if (r.current) {
        gsap.to(r.current, {
          yPercent: i % 2 === 0 ? 4 : -4,
          duration: 17 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
  }

  gsap.set(refs.financeRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
  gsap.set([refs.wipe2BackRef.current, refs.wipe2MidRef.current, refs.wipe2FrontRef.current], {
    opacity: 0,
    yPercent: 110,
    scale: sz(1.1),
  });
  gsap.set(refs.wipe2MidRef.current, { yPercent: 130, scale: sz(1.2) });
  gsap.set(refs.wipe2FrontRef.current, { yPercent: 150, scale: sz(1.35) });
}

export function animateFinanceScene(tl: SceneTimeline, refs: FinanceSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text, sz } = ctx;
  const {
    enterDur,
    exitDur,
    financeCloudsT,
    financeRevealT,
    financeEnterT,
    financeExitT,
  } = timings;

  const cloudCoverDur = enterDur + 0.022;

  tl.fromTo(
    refs.wipe2BackRef.current,
    { yPercent: 110, opacity: 0, scale: sz(1.1) },
    { yPercent: 0, opacity: 0.92, scale: sz(1.3), duration: cloudCoverDur, ease: "power2.inOut" },
    financeCloudsT
  );
  tl.fromTo(
    refs.wipe2MidRef.current,
    { yPercent: 130, opacity: 0, scale: sz(1.2) },
    { yPercent: -5, opacity: 0.85, scale: sz(1.45), duration: cloudCoverDur, ease: "power2.inOut" },
    financeCloudsT + 0.006
  );
  tl.fromTo(
    refs.wipe2FrontRef.current,
    { yPercent: 150, opacity: 0, scale: sz(1.35) },
    { yPercent: -12, opacity: 0.88, scale: sz(1.6), duration: cloudCoverDur, ease: "power2.inOut" },
    financeCloudsT + 0.010
  );
  tl.fromTo(
    refs.wipe2HazeRef.current,
    { opacity: 0 },
    { opacity: 0.35, duration: cloudCoverDur * 0.8, ease: "power2.out" },
    financeCloudsT + 0.004
  );

  tl.to(refs.wipe2BackRef.current, { yPercent: -100, opacity: 0, duration: exitDur + 0.010, ease: "power2.inOut" }, financeRevealT);
  tl.to(refs.wipe2MidRef.current, { yPercent: -100, opacity: 0, duration: exitDur + 0.010, ease: "power2.inOut" }, financeRevealT + 0.004);
  tl.to(refs.wipe2FrontRef.current, { yPercent: -100, opacity: 0, duration: exitDur + 0.010, ease: "power2.inOut" }, financeRevealT + 0.008);
  tl.to(refs.wipe2HazeRef.current, { opacity: 0, duration: exitDur, ease: "power2.in" }, financeRevealT);

  tl.fromTo(refs.financeRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, financeEnterT);
  tl.to(refs.financeRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, financeExitT);
}

export type FinanceSectionProps = {
  financeRef: RefObject<HTMLDivElement | null>;
  wipe2HazeRef: RefObject<HTMLDivElement | null>;
  wipe2BackRef: RefObject<HTMLDivElement | null>;
  wipe2MidRef: RefObject<HTMLDivElement | null>;
  wipe2FrontRef: RefObject<HTMLDivElement | null>;
};

export const FinanceSection = forwardRef<HTMLDivElement, FinanceSectionProps>(function FinanceSection(
  { financeRef, wipe2HazeRef, wipe2BackRef, wipe2MidRef, wipe2FrontRef },
  _ref
) {
  return (
    <>
      <div
        ref={financeRef}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
      >
        <h2 className="font-display text-xl font-bold tracking-tighter text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] sm:text-3xl sm:tracking-tight md:text-5xl md:tracking-[0.18em] lg:text-6xl">
          ФИНАНСИРОВАНИЕ ПРОЕКТОВ
        </h2>
      </div>

      <div ref={wipe2HazeRef} className="hidden" />
      <div ref={wipe2BackRef} className="hidden" />
      <div ref={wipe2MidRef} className="hidden" />
      <div ref={wipe2FrontRef} className="hidden" />
    </>
  );
});
