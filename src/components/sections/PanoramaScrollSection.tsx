import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import {
  type SceneAnimationContext,
  type SceneTimeline,
} from "./sceneAnimationShared";
import { SCENE_IMAGES } from "./sceneImages";

export type PanoramaScrollSceneRefs = {
  panoramaBgRef: RefObject<HTMLDivElement | null>;
  panoramaImgRef: RefObject<HTMLImageElement | null>;
  permanentCloudRef: RefObject<HTMLDivElement | null>;
};

/** Act 1 peak zoom — scale applied to the panoramic image. */
const ACT1_PEAK_ZOOM_DESKTOP = 1.5;
const ACT1_PEAK_ZOOM_MOBILE = 1.55;
const PANORAMA_ORIGIN_DESKTOP = "center 28%";
/** Vertical webp — peaks sit in the top ~20% band. */
const PANORAMA_ORIGIN_MOBILE = "center 10%";

function getPeakZoom(mobile: boolean) {
  return mobile ? ACT1_PEAK_ZOOM_MOBILE : ACT1_PEAK_ZOOM_DESKTOP;
}

function getPanoramaOrigin(mobile: boolean) {
  return mobile ? PANORAMA_ORIGIN_MOBILE : PANORAMA_ORIGIN_DESKTOP;
}

/**
 * Vertical panorama strip — objectPosition Y% waypoints (desktop).
 * Recalibrated after the client added the Industrial band between the lake
 * and the pastures, which lengthened the canvas and pushed every lower zone
 * down. Values follow the image's true top→bottom order so the camera pans
 * monotonically and locks exactly one zone at a time:
 *   peaks → Son-Kul lake → industrial complex → pastures → fields/greenhouses.
 * peaks is offset from 0 so the summit band sits in the upper third of the
 * viewport (not the empty sky above the peaks on the lengthened strip).
 */
const PANORAMA_STOPS_DESKTOP = {
  peaks: 14,
  sonKul: 35,
  industrial: 50,
  pastures: 62,
  fields: 76,
} as const;

/**
 * Same five storytelling bands mapped for the mobile pan track. Because the
 * mobile image is forced to MOBILE_PAN_TRACK_VH and stepped with translateY,
 * the linear percent→viewport-centre mapping matches the desktop objectPosition
 * mapping almost exactly, so the two tables stay in sync.
 */
const PANORAMA_STOPS_MOBILE = {
  peaks: 14,
  sonKul: 35,
  industrial: 50,
  pastures: 62,
  fields: 76,
} as const;

/** Tall pan track — one 100svh zone visible at a time (5 frames × 100vh). */
export const MOBILE_PAN_TRACK_VH = 500;

export const PANORAMA_STOPS = PANORAMA_STOPS_DESKTOP;

function getPanoramaStops(mobile: boolean) {
  return mobile ? PANORAMA_STOPS_MOBILE : PANORAMA_STOPS_DESKTOP;
}

function mobilePanTranslateY(percentY: number): string {
  const maxPanVh = MOBILE_PAN_TRACK_VH - 100;
  return `${-(percentY / 100) * maxPanVh}vh`;
}

function applyPanoramaPosition(
  img: HTMLImageElement | null,
  percentY: number,
  mobile: boolean
) {
  if (!img) return;
  if (mobile) {
    gsap.set(img, { y: mobilePanTranslateY(percentY) });
    return;
  }
  gsap.set(img, { y: 0 });
  img.style.objectPosition = `center ${percentY}%`;
}

function tweenPanoramaPan(
  tl: SceneTimeline,
  img: HTMLImageElement | null,
  pan: { y: number },
  targetY: number,
  duration: number,
  position: number,
  mobile: boolean
) {
  tl.to(
    pan,
    {
      y: targetY,
      duration,
      ease: "none",
      onUpdate: () => applyPanoramaPosition(img, pan.y, mobile),
    },
    position
  );
}

export function preparePanoramaScrollScene(refs: PanoramaScrollSceneRefs, ctx: SceneAnimationContext) {
  const { mobile } = ctx;
  const origin = getPanoramaOrigin(mobile);
  const stops = getPanoramaStops(mobile);

  gsap.set(refs.panoramaBgRef.current, { opacity: 1, visibility: "visible" });
  gsap.set(refs.panoramaImgRef.current, {
    scale: 1,
    transformOrigin: origin,
  });
  if (mobile && refs.panoramaImgRef.current) {
    refs.panoramaImgRef.current.style.objectPosition = "center top";
  }
  applyPanoramaPosition(refs.panoramaImgRef.current, stops.peaks, mobile);
  gsap.set(refs.permanentCloudRef.current, { opacity: 0, yPercent: -40 });
}

/** Interpolate panorama Y% for a master-timeline time (used when scrub seeks suppress onUpdate). */
export function panoramaYAtTime(
  time: number,
  timings: SceneAnimationContext["timings"],
  mobile: boolean
): number {
  const stops = getPanoramaStops(mobile);
  const {
    financeEnterT,
    directionsEnterT,
    msbEnterT,
    partnersEnterT,
    newsEnterT,
  } = timings;

  const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t));
  const seg = (start: number, end: number) => {
    const span = Math.max(0.001, end - start);
    return (time - start) / span;
  };

  if (time < financeEnterT) return stops.peaks;
  if (time < directionsEnterT) return lerp(stops.peaks, stops.sonKul, seg(financeEnterT, directionsEnterT));
  if (time < msbEnterT) return lerp(stops.sonKul, stops.industrial, seg(directionsEnterT, msbEnterT));
  if (time < partnersEnterT) return lerp(stops.industrial, stops.pastures, seg(msbEnterT, partnersEnterT));
  if (time < newsEnterT) return lerp(stops.pastures, stops.fields, seg(partnersEnterT, newsEnterT));
  return stops.fields;
}

/** Apply camera pan for the current timeline time — safe after suppressed ScrollTrigger seeks. */
export function syncPanoramaToTimelineTime(
  refs: PanoramaScrollSceneRefs,
  time: number,
  timings: SceneAnimationContext["timings"],
  mobile: boolean
) {
  applyPanoramaPosition(refs.panoramaImgRef.current, panoramaYAtTime(time, timings, mobile), mobile);
}

export function animatePanoramaScrollScene(
  tl: SceneTimeline,
  refs: PanoramaScrollSceneRefs,
  ctx: SceneAnimationContext
) {
  const { timings, mobile } = ctx;
  const {
    enterDur,
    decreeExitT,
    peakZoomDur,
    financeEnterT,
    directionsEnterT,
    msbEnterT,
    partnersEnterT,
    newsEnterT,
    footerEnterT,
    footerHoldDur,
  } = timings;

  const img = refs.panoramaImgRef.current;
  const stops = getPanoramaStops(mobile);
  const pan = { y: stops.peaks };
  const cloudRollDur = enterDur + 0.032;
  const peakZoom = getPeakZoom(mobile);

  // Act 1 — peaks fixed at top, zoom in through Section 1
  tl.to(img, { scale: peakZoom, duration: peakZoomDur, ease: "none" }, 0);

  // Act 2 — permanent cloud rolls in once and locks at the top; zoom back out (same duration as zoom in)
  tl.fromTo(
    refs.permanentCloudRef.current,
    { opacity: 0, yPercent: -40 },
    { opacity: 1, yPercent: 0, duration: cloudRollDur, ease: "power2.inOut" },
    decreeExitT
  );
  tl.to(img, { scale: 1, duration: peakZoomDur, ease: "none" }, decreeExitT);

  // Act 3 — smooth vertical descent through the strip (Sections 3–7); cloud stays visible.
  // Physical top→bottom order: sonKul → industrial → pastures → fields.
  tweenPanoramaPan(
    tl,
    img,
    pan,
    stops.sonKul,
    Math.max(0.001, directionsEnterT - financeEnterT),
    financeEnterT,
    mobile
  );
  tweenPanoramaPan(
    tl,
    img,
    pan,
    stops.industrial,
    Math.max(0.001, msbEnterT - directionsEnterT),
    directionsEnterT,
    mobile
  );
  tweenPanoramaPan(
    tl,
    img,
    pan,
    stops.pastures,
    Math.max(0.001, partnersEnterT - msbEnterT),
    msbEnterT,
    mobile
  );
  tweenPanoramaPan(
    tl,
    img,
    pan,
    stops.fields,
    Math.max(0.001, newsEnterT - partnersEnterT),
    partnersEnterT,
    mobile
  );

  // Footer — fade mountains to darkness as premium footer arrives
  const footerFadeDur = footerHoldDur + enterDur * 1.2;
  tl.to(
    refs.panoramaBgRef.current,
    { opacity: 0, duration: footerFadeDur, ease: "power2.inOut" },
    footerEnterT
  );
  tl.to(
    refs.permanentCloudRef.current,
    { opacity: 0, duration: footerFadeDur, ease: "power2.inOut" },
    footerEnterT
  );
  tl.set(refs.panoramaBgRef.current, { visibility: "hidden" }, footerEnterT + footerFadeDur);
}

export type PanoramaScrollSectionProps = {
  panoramaBgRef: RefObject<HTMLDivElement | null>;
  panoramaImgRef: RefObject<HTMLImageElement | null>;
  permanentCloudRef: RefObject<HTMLDivElement | null>;
};

export const PanoramaScrollSection = forwardRef<HTMLDivElement, PanoramaScrollSectionProps>(
  function PanoramaScrollSection({ panoramaBgRef, panoramaImgRef, permanentCloudRef }, _ref) {
    return (
      <>
        <div
          ref={panoramaBgRef}
          data-cursor-surface="dark"
          className="pointer-events-none fixed inset-0 z-0 h-[100svh] w-full overflow-hidden md:h-screen"
          aria-hidden
        >
          <picture className="absolute inset-0 block h-full w-full overflow-hidden">
            <source
              media="(max-width: 767px)"
              srcSet={SCENE_IMAGES.panoramaMobile}
              type="image/webp"
            />
            <img
              ref={panoramaImgRef}
              src={SCENE_IMAGES.panorama}
              alt=""
              fetchPriority="high"
              decoding="async"
              className={cn(
                "h-full w-full object-cover will-change-[transform,object-position]",
                "max-md:absolute max-md:left-0 max-md:top-0 max-md:h-[500vh] max-md:w-full max-md:max-w-none",
                "max-md:[transform-origin:center_10%] md:[transform-origin:center_28%]"
              )}
              style={{ objectPosition: `center ${PANORAMA_STOPS.peaks}%` }}
            />
          </picture>
          <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
        </div>

        <div
          ref={permanentCloudRef}
          data-permanent-cloud
          data-cursor-surface="light"
          className="pointer-events-none fixed top-0 left-0 z-[8] h-[18svh] w-full opacity-0 will-change-[transform,opacity] md:h-[38vh]"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.5) 68%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.5) 68%, transparent 100%)",
          }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.82) 22%, rgba(255,255,255,0.48) 52%, rgba(255,255,255,0.18) 72%, rgba(255,255,255,0) 100%)",
            }}
          />
          <div className="absolute -left-[14%] top-[-28%] h-[22svh] w-[72vw] rounded-full bg-white/80 blur-[56px] max-md:h-[18svh] max-md:blur-[48px] md:h-[52vh] md:blur-[96px]" />
          <div className="absolute -right-[12%] top-[-18%] h-[20svh] w-[64vw] rounded-full bg-white/70 blur-[60px] max-md:h-[16svh] max-md:blur-[52px] md:h-[48vh] md:blur-[104px]" />
          <div className="absolute left-[18%] top-[8%] h-[14svh] w-[48vw] rounded-full bg-white/55 blur-[48px] max-md:h-[12svh] max-md:blur-[40px] md:h-[36vh] md:blur-[88px]" />
          <div
            className="absolute inset-x-0 top-0 h-[55%]"
            style={{
              background:
                "radial-gradient(ellipse 130% 90% at 50% 0%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.42) 48%, transparent 82%)",
            }}
          />
          <div
            className="absolute inset-x-[-8%] bottom-[-4svh] h-[10svh] blur-[28px] max-md:bottom-[-3svh] max-md:h-[8svh] md:bottom-[-8vh] md:h-[22vh] md:blur-[48px]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 45%, transparent 100%)",
            }}
          />
        </div>
      </>
    );
  }
);
