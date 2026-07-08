import type gsap from "gsap";

export const CURSOR_BORDER_DARK = "#262626";
export const CURSOR_BORDER_LIGHT = "#ffffff";

/** Shared easing profile — typography and virtual camera stay in lockstep. */
export const CINEMATIC_ENTER_EASE = "power2.out";
export const CINEMATIC_EXIT_EASE = "power2.in";
export const CINEMATIC_MOTION_EASE = "power2.inOut";

export const COUNTER_PROJECTS = 12;
export const COUNTER_TOTAL_SUM = 122_968_875_174;

export function formatCount(value: number, progress: number, suffix = "") {
  const p = Math.max(0, Math.min(1, progress));
  const eased = 1 - Math.pow(1 - p, 2);
  const val = Math.round(eased * value);
  return `${val.toLocaleString("ru-RU").replace(",", " ")}${suffix}`;
}

export function computeTimelineMarkers() {
  const enterDur = 0.028;
  const exitDur = 0.028;
  const holdDur = 0.014;
  /** Extra pause after counters finish — user must scroll again to leave the scene. */
  const statsHoldDur = 0.055;
  const aboutHoldDur = 0.038;
  const financeHoldDur = 0.052;
  const directionsHoldDur = 0.058;
  const msbHoldDur = 0.038;
  const partnersHoldDur = 0.048;
  const newsHoldDur = 0.032;
  const textOverlap = 0.016;
  const atmoWipeDur = 0.032;

  const breatheAfter = (exitStart: number) => exitStart + exitDur - textOverlap;
  const gapAfterExit = (exitStart: number, gap: number) => exitStart + exitDur + gap;

  const statsEnterT = 0.06;
  const statsExitT = statsEnterT + enterDur + holdDur + statsHoldDur;

  /**
   * Decree waits for the counters to fully evaporate before entering.
   * Using a positive gap (instead of breatheAfter's negative overlap) avoids
   * both texts sharing the same centre point mid-transition.
   */
  const decreeCloudsT = gapAfterExit(statsExitT, 0.006);
  const decreeEnterT = decreeCloudsT + 0.052;
  const decreeExitT = decreeEnterT + enterDur + holdDur;

  /** Peak zoom-in/out share the same scrub duration for symmetric camera motion. */
  const peakZoomDur = decreeExitT;
  const peakZoomOutEndT = decreeExitT + peakZoomDur;

  const aboutEnterT = peakZoomOutEndT + 0.012;
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
  const partnerLogoExitT = partnersHoldT + 0.008;
  const partnersTextExitT = gapAfterExit(partnerLogoExitT, 0.006);

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
    partnerLogoExitT,
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
  idle: { opacity: number; yPercent: number; scale: number };
  arrived: { opacity: number; yPercent: number; scale: number };
  evaporated: { yPercent: number; opacity: number; scale: number };
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
    idle: { opacity: 0, yPercent: textEnterY, scale: 1 },
    arrived: { opacity: 1, yPercent: 0, scale: 1 },
    evaporated: { yPercent: textExitY, opacity: 0, scale: textExitScale },
    enterEase: CINEMATIC_ENTER_EASE,
    exitEase: CINEMATIC_EXIT_EASE,
  };
}

export function buildSceneContext(cfg: ExperienceConfig): SceneAnimationContext {
  const timings = computeTimelineMarkers();
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
