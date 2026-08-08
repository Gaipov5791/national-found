import type gsap from "gsap";

/** Shared easing profile — typography and virtual camera stay in lockstep. */
export const CINEMATIC_ENTER_EASE = "power2.out";
export const CINEMATIC_EXIT_EASE = "power2.in";

export const COUNTER_PROJECTS = 12;
export const COUNTER_TOTAL_SUM = 122_968_875_174;

/** Map absolute master-timeline time (seconds) to 0–1 counter roll progress. */
export function mapCounterProgress(
  timelineTime: number,
  timings: Pick<SceneTimings, "statsEnterT" | "counterCompleteT">
): number {
  const { statsEnterT, counterCompleteT } = timings;
  const span = counterCompleteT - statsEnterT;
  if (span <= 0) return timelineTime >= counterCompleteT ? 1 : 0;
  return Math.max(0, Math.min(1, (timelineTime - statsEnterT) / span));
}

export function computeTimelineMarkers(mobile = false) {
  const enterDur = 0.028;
  const exitDur = 0.028;
  const holdDur = 0.014;
  /** Scroll window while counters roll (scrub-linked). */
  const counterRollDur = 0.065;
  /** Minimal hold to avoid feeling like a pause. */
  const statsHoldDur = 0.012;
  const aboutHoldDur = 0.038;
  const financeHoldDur = 0.052;
  const directionsHoldDur = 0.058;
  const msbHoldDur = 0.038;
  const partnersHoldDur = mobile ? 0.042 : 0.048;
  /** Longer hold so news cards + «Читать ещё» stay readable while scrolling. */
  const newsHoldDur = mobile ? 0.12 : 0.095;
  const textOverlap = 0.016;
  const atmoWipeDur = 0.032;

  const breatheAfter = (exitStart: number) => exitStart + exitDur - textOverlap;
  const gapAfterExit = (exitStart: number, gap: number) => exitStart + exitDur + gap;

  const statsEnterT = 0.06;
  const counterCompleteT = statsEnterT + enterDur + counterRollDur;
  const statsExitT = counterCompleteT + statsHoldDur;

  /**
   * Decree waits for the counters to fully evaporate before entering.
   * Using a positive gap (instead of breatheAfter's negative overlap) avoids
   * both texts sharing the same centre point mid-transition.
   */
  const decreeCloudsT = gapAfterExit(statsExitT, 0.006);
  const decreeEnterT = decreeCloudsT + 0.052;
  const decreeExitT = decreeEnterT + enterDur + holdDur;

  /**
   * Short peak zoom-out; "О Фонде" waits until decree is fully gone
   * (no overlap with "Постановление").
   */
  const peakZoomDur = 0.045;
  const peakZoomOutEndT = decreeExitT + peakZoomDur;

  const aboutEnterT = gapAfterExit(decreeExitT, 0.004);
  const aboutExitT = aboutEnterT + enterDur + holdDur + aboutHoldDur;

  const financeEnterT = gapAfterExit(aboutExitT, 0.012);
  const financeExitT = financeEnterT + enterDur + holdDur + financeHoldDur;

  const sunsetAtmoT = breatheAfter(financeExitT);
  const sunsetBgSwapT = sunsetAtmoT + 0.010;
  const sunsetRevealT = sunsetAtmoT + atmoWipeDur;
  const directionsEnterT = sunsetRevealT;
  const directionsExitT = directionsEnterT + enterDur + holdDur + directionsHoldDur;

  const twilightAtmoT = breatheAfter(directionsExitT);
  const twilightBgSwapT = twilightAtmoT + 0.010;
  const twilightRevealT = twilightAtmoT + atmoWipeDur;
  const msbEnterT = twilightRevealT;
  const msbExitT = msbEnterT + enterDur + holdDur + msbHoldDur;

  const midnightAtmoT = breatheAfter(msbExitT);
  const midnightBgSwapT = midnightAtmoT + 0.010;
  const midnightRevealT = midnightAtmoT + atmoWipeDur * 0.85;
  const partnersEnterT = midnightRevealT;
  const partnersHoldT = partnersEnterT + enterDur + holdDur + partnersHoldDur;
  const partnersTextExitT = gapAfterExit(partnersHoldT, 0.006);

  const newsEnterT = breatheAfter(partnersTextExitT);
  const newsExitT = newsEnterT + enterDur + holdDur + newsHoldDur;

  const footerEnterT = gapAfterExit(newsExitT, 0.008);
  const footerHoldDur = 0.072;
  const totalDuration = footerEnterT + enterDur + footerHoldDur;

  return {
    enterDur,
    exitDur,
    holdDur,
    textOverlap,
    textEnterY: 30,
    textExitY: -45,
    textExitScale: 1.03,
    lightCrossfadeDur: 0.034,
    atmoWipeDur,
    collageParallaxDur: 0.048,
    convergeDur: 0.042,
    flareDur: 0.030,
    bgCrossfadeDur: 0.020,
    statsEnterT,
    statsExitT,
    counterRollDur,
    counterCompleteT,
    decreeCloudsT,
    decreeEnterT,
    decreeExitT,
    peakZoomDur,
    peakZoomOutEndT,
    aboutEnterT,
    aboutExitT,
    financeEnterT,
    financeExitT,
    sunsetAtmoT,
    sunsetBgSwapT,
    sunsetRevealT,
    directionsEnterT,
    directionsExitT,
    twilightAtmoT,
    twilightBgSwapT,
    twilightRevealT,
    msbEnterT,
    msbExitT,
    midnightAtmoT,
    midnightBgSwapT,
    midnightRevealT,
    partnersEnterT,
    partnersHoldT,
    partnersTextExitT,
    newsEnterT,
    newsExitT,
    statsHoldDur,
    aboutHoldDur,
    financeHoldDur,
    directionsHoldDur,
    msbHoldDur,
    partnersHoldDur,
    newsHoldDur,
    footerEnterT,
    footerHoldDur,
    totalDuration,
    breatheAfter,
    gapAfterExit,
  };
}

export type SceneTimings = ReturnType<typeof computeTimelineMarkers>;

export type ExperienceConfig = {
  scrollDistance: number;
  scrub: number | boolean;
  mobile: boolean;
  cinematic: boolean;
  staticViewportHeight?: number;
  onCounterProgress?: (progress: number) => void;
};

export type TextPresets = {
  idle: { autoAlpha: number; yPercent: number; scale: number };
  arrived: { autoAlpha: number; yPercent: number; scale: number };
  evaporated: { yPercent: number; autoAlpha: number; scale: number };
  enterEase: string;
  exitEase: string;
};

export type SceneAnimationContext = ExperienceConfig & {
  timings: SceneTimings;
  sz: (base: number) => number;
  text: TextPresets;
  brandStartY: number;
};

export function createScaleFn(vw?: number) {
  const w = vw ?? (typeof window !== "undefined" ? window.innerWidth : 1280);
  const zK = w < 640 ? 0.85 : w < 1024 ? 1.0 : 1.15;
  return (base: number) => +(1 + (base - 1) * zK).toFixed(3);
}

export function createTextPresets(timings: SceneTimings): TextPresets {
  const { textEnterY, textExitY, textExitScale } = timings;
  return {
    idle: { autoAlpha: 0, yPercent: textEnterY, scale: 1 },
    arrived: { autoAlpha: 1, yPercent: 0, scale: 1 },
    evaporated: { yPercent: textExitY, autoAlpha: 0, scale: textExitScale },
    enterEase: CINEMATIC_ENTER_EASE,
    exitEase: CINEMATIC_EXIT_EASE,
  };
}

export function buildSceneContext(cfg: ExperienceConfig): SceneAnimationContext {
  const timings = computeTimelineMarkers(cfg.mobile);
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const brandStartY =
    typeof window !== "undefined"
      ? window.innerHeight * (cfg.mobile ? 0.18 : 0.28)
      : cfg.mobile
        ? 140
        : 220;

  return {
    ...cfg,
    timings,
    sz: createScaleFn(vw),
    text: createTextPresets(timings),
    brandStartY,
  };
}

export type SceneTimeline = gsap.core.Timeline;
