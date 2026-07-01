import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
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
const ACT1_PEAK_ZOOM_MOBILE = 1.42;
const PANORAMA_ORIGIN_DESKTOP = "center 28%";
const PANORAMA_ORIGIN_MOBILE = "center 26%";

function getPeakZoom(mobile: boolean) {
  return mobile ? ACT1_PEAK_ZOOM_MOBILE : ACT1_PEAK_ZOOM_DESKTOP;
}

function getPanoramaOrigin(mobile: boolean) {
  return mobile ? PANORAMA_ORIGIN_MOBILE : PANORAMA_ORIGIN_DESKTOP;
}

/** Vertical pan stops for Sections 3–7. */
export const PANORAMA_STOPS = {
  peaks: 0,
  sonKul: 22,
  pastures: 48,
  fields: 72,
  bottom: 100,
} as const;

function applyPanoramaPosition(img: HTMLImageElement | null, percentY: number) {
  if (!img) return;
  img.style.objectPosition = `center ${percentY}%`;
}

function tweenPanoramaPan(
  tl: SceneTimeline,
  img: HTMLImageElement | null,
  pan: { y: number },
  targetY: number,
  duration: number,
  position: number
) {
  tl.to(
    pan,
    {
      y: targetY,
      duration,
      ease: "none",
      onUpdate: () => applyPanoramaPosition(img, pan.y),
    },
    position
  );
}

export function preparePanoramaScrollScene(refs: PanoramaScrollSceneRefs, ctx: SceneAnimationContext) {
  const { mobile } = ctx;
  const origin = getPanoramaOrigin(mobile);

  gsap.set(refs.panoramaBgRef.current, { opacity: 1, visibility: "visible" });
  gsap.set(refs.panoramaImgRef.current, {
    scale: 1,
    transformOrigin: origin,
  });
  applyPanoramaPosition(refs.panoramaImgRef.current, PANORAMA_STOPS.peaks);
  gsap.set(refs.permanentCloudRef.current, { opacity: 0, yPercent: -40 });
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
  const pan = { y: PANORAMA_STOPS.peaks };
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

  // Act 3 — smooth vertical pan upward (Sections 3–7); cloud stays visible
  tweenPanoramaPan(
    tl,
    img,
    pan,
    PANORAMA_STOPS.sonKul,
    Math.max(0.001, directionsEnterT - financeEnterT),
    financeEnterT
  );
  tweenPanoramaPan(
    tl,
    img,
    pan,
    PANORAMA_STOPS.pastures,
    Math.max(0.001, msbEnterT - directionsEnterT),
    directionsEnterT
  );
  tweenPanoramaPan(
    tl,
    img,
    pan,
    PANORAMA_STOPS.fields,
    Math.max(0.001, partnersEnterT - msbEnterT),
    msbEnterT
  );
  tweenPanoramaPan(
    tl,
    img,
    pan,
    PANORAMA_STOPS.bottom,
    Math.max(0.001, newsEnterT - partnersEnterT),
    partnersEnterT
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
    const panoramaOrigin = getPanoramaOrigin(
      typeof window !== "undefined" ? window.innerWidth < 768 : false
    );

    return (
      <>
        <div
          ref={panoramaBgRef}
          data-cursor-surface="dark"
          className="pointer-events-none fixed inset-0 z-0 h-[100svh] w-full overflow-hidden md:h-screen"
          aria-hidden
        >
          <img
            ref={panoramaImgRef}
            src={SCENE_IMAGES.panorama}
            alt=""
            className="fixed inset-0 h-[100svh] w-full object-cover will-change-transform md:h-screen"
            style={{ objectPosition: "center 0%", transformOrigin: panoramaOrigin }}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
        </div>

        <div
          ref={permanentCloudRef}
          data-permanent-cloud
          data-cursor-surface="light"
          className="pointer-events-none fixed top-0 left-0 z-[8] h-[44svh] w-full opacity-0 will-change-[transform,opacity] md:h-[38vh]"
          style={{
            maskImage: "linear-gradient(to bottom, #000 0%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 38%, rgba(0,0,0,0.55) 62%, transparent 100%)",
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
          <div className="absolute -left-[14%] top-[-28%] h-[52vh] w-[72vw] rounded-full bg-white/80 blur-[96px]" />
          <div className="absolute -right-[12%] top-[-18%] h-[48vh] w-[64vw] rounded-full bg-white/70 blur-[104px]" />
          <div className="absolute left-[18%] top-[8%] h-[36vh] w-[48vw] rounded-full bg-white/55 blur-[88px]" />
          <div
            className="absolute inset-x-0 top-0 h-[55%]"
            style={{
              background:
                "radial-gradient(ellipse 130% 90% at 50% 0%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.42) 48%, transparent 82%)",
            }}
          />
          <div
            className="absolute inset-x-[-8%] bottom-[-8vh] h-[22vh] blur-[48px]"
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
