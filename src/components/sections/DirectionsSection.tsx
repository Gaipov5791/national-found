import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { CURSOR_BORDER_LIGHT, type SceneAnimationContext, type SceneTimeline } from "./sceneAnimationShared";

export type DirectionsSceneRefs = {
  amberBurnRef: RefObject<HTMLDivElement | null>;
  amberGlowRef: RefObject<HTMLDivElement | null>;
  sunsetAtmoBackRef: RefObject<HTMLDivElement | null>;
  sunsetAtmoMidRef: RefObject<HTMLDivElement | null>;
  sunsetAtmoFrontRef: RefObject<HTMLDivElement | null>;
  directionsRef: RefObject<HTMLDivElement | null>;
};

export function prepareDirectionsScene(refs: DirectionsSceneRefs, ctx: SceneAnimationContext) {
  const { text, sz } = ctx;

  [refs.sunsetAtmoBackRef, refs.sunsetAtmoMidRef, refs.sunsetAtmoFrontRef].forEach((r, i) => {
    if (r.current) {
      gsap.to(r.current, {
        yPercent: i % 2 === 0 ? 4 : -4,
        duration: 20 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  });

  gsap.set(refs.directionsRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
  gsap.set(
    [refs.sunsetAtmoBackRef.current, refs.sunsetAtmoMidRef.current, refs.sunsetAtmoFrontRef.current],
    { opacity: 0, yPercent: 110, scale: sz(1.1) }
  );
  gsap.set(refs.sunsetAtmoMidRef.current, { yPercent: 130, scale: sz(1.2) });
  gsap.set(refs.sunsetAtmoFrontRef.current, { yPercent: 150, scale: sz(1.35) });
  gsap.set([refs.amberBurnRef.current, refs.amberGlowRef.current], { opacity: 0 });
}

export function animateDirectionsScene(tl: SceneTimeline, refs: DirectionsSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text, sz } = ctx;
  const {
    enterDur,
    exitDur,
    atmoWipeDur,
    lightCrossfadeDur,
    sunsetAtmoT,
    sunsetBgSwapT,
    sunsetRevealT,
    directionsEnterT,
    directionsExitT,
    collageParallaxDur,
  } = timings;

  const cursorRing = document.getElementById("custom-cursor-ring");
  const cursorDot = document.getElementById("custom-cursor-dot");

  tl.fromTo(
    refs.sunsetAtmoBackRef.current,
    { yPercent: 110, opacity: 0, scale: sz(1.1) },
    { yPercent: -8, opacity: 0.72, scale: sz(1.28), duration: atmoWipeDur, ease: "power2.inOut" },
    sunsetAtmoT
  );
  tl.fromTo(
    refs.sunsetAtmoMidRef.current,
    { yPercent: 130, opacity: 0, scale: sz(1.2) },
    { yPercent: -4, opacity: 0.58, scale: sz(1.42), duration: atmoWipeDur, ease: "power2.inOut" },
    sunsetAtmoT + 0.006
  );
  tl.fromTo(
    refs.sunsetAtmoFrontRef.current,
    { yPercent: 150, opacity: 0, scale: sz(1.35) },
    { yPercent: -14, opacity: 0.65, scale: sz(1.55), duration: atmoWipeDur, ease: "power2.inOut" },
    sunsetAtmoT + 0.010
  );

  tl.to(refs.amberBurnRef.current, { opacity: 0.92, duration: lightCrossfadeDur, ease: "power2.out" }, sunsetBgSwapT);
  tl.to(refs.amberGlowRef.current, { opacity: 0.58, duration: lightCrossfadeDur + 0.006, ease: "power2.out" }, sunsetBgSwapT + 0.004);

  if (cursorRing) {
    tl.to(
      cursorRing,
      {
        borderColor: CURSOR_BORDER_LIGHT,
        duration: lightCrossfadeDur,
        ease: "power1.inOut",
        onUpdate: function () {
          cursorRing.setAttribute("data-cursor-theme", this.progress() > 0.5 ? "light" : "dark");
        },
      },
      sunsetBgSwapT
    );
  }
  if (cursorDot) {
    tl.to(cursorDot, { backgroundColor: CURSOR_BORDER_LIGHT, duration: lightCrossfadeDur, ease: "power1.inOut" }, sunsetBgSwapT);
  }

  tl.to(refs.sunsetAtmoBackRef.current, { yPercent: -110, opacity: 0, duration: exitDur + 0.012, ease: "power2.inOut" }, sunsetRevealT);
  tl.to(refs.sunsetAtmoMidRef.current, { yPercent: -115, opacity: 0, duration: exitDur + 0.012, ease: "power2.inOut" }, sunsetRevealT + 0.004);
  tl.to(refs.sunsetAtmoFrontRef.current, { yPercent: -120, opacity: 0, duration: exitDur + 0.012, ease: "power2.inOut" }, sunsetRevealT + 0.008);
  tl.to(refs.amberGlowRef.current, { opacity: 0.82, duration: collageParallaxDur, ease: "power1.inOut" }, sunsetRevealT);

  tl.fromTo(refs.directionsRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, directionsEnterT);
  tl.to(refs.directionsRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, directionsExitT);
  tl.to(refs.amberBurnRef.current, { opacity: 0, duration: exitDur, ease: "power1.in" }, directionsExitT);
  tl.to(refs.amberGlowRef.current, { opacity: 0, duration: exitDur, ease: "power1.in" }, directionsExitT);
}

export type DirectionsSectionProps = {
  amberBurnRef: RefObject<HTMLDivElement | null>;
  amberGlowRef: RefObject<HTMLDivElement | null>;
  sunsetAtmoBackRef: RefObject<HTMLDivElement | null>;
  sunsetAtmoMidRef: RefObject<HTMLDivElement | null>;
  sunsetAtmoFrontRef: RefObject<HTMLDivElement | null>;
  directionsRef: RefObject<HTMLDivElement | null>;
};

const goldenEdge =
  "radial-gradient(ellipse 90% 55% at 50% 100%, rgba(255,190,80,0.65) 0%, rgba(240,140,40,0.45) 30%, rgba(200,90,25,0.2) 55%, transparent 80%)";
const goldenGlow =
  "radial-gradient(ellipse 85% 50% at 45% 95%, rgba(255,210,120,0.55) 0%, rgba(230,150,50,0.35) 40%, transparent 75%)";
const goldenHaze =
  "radial-gradient(ellipse 100% 60% at 55% 90%, rgba(255,175,70,0.5) 0%, rgba(210,110,35,0.28) 45%, transparent 80%)";
const layerBase =
  "pointer-events-none absolute left-1/2 top-1/2 -ml-[100vw] -mt-[100svh] md:-mt-[100vh] w-[200vw] h-[200svh] md:h-[200vh] rounded-full opacity-0 blur-[120px]";
const styleWithWillChange = {
  willChange: "transform, opacity",
  maskImage: "radial-gradient(ellipse 90% 90% at center, white 55%, transparent 100%)",
};

export const DirectionsSection = forwardRef<HTMLDivElement, DirectionsSectionProps>(function DirectionsSection(
  {
    amberBurnRef,
    amberGlowRef,
    sunsetAtmoBackRef,
    sunsetAtmoMidRef,
    sunsetAtmoFrontRef,
    directionsRef,
  },
  _ref
) {
  return (
    <>
      <div
        ref={amberBurnRef}
        className="pointer-events-none absolute inset-0 z-10 hidden opacity-0 will-change-[transform,opacity]"
        style={{
          mixBlendMode: "multiply",
          background:
            "radial-gradient(ellipse 140% 95% at 50% 78%, rgba(255,100,10,0.95) 0%, rgba(220,60,5,0.75) 30%, rgba(160,35,0,0.45) 55%, rgba(80,20,0,0.15) 75%, transparent 92%)",
        }}
      />
      <div
        ref={amberGlowRef}
        className="pointer-events-none absolute inset-0 z-10 hidden opacity-0 will-change-[transform,opacity]"
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(ellipse 120% 70% at 50% 72%, rgba(255,220,140,0.85) 0%, rgba(255,180,70,0.5) 35%, rgba(255,140,40,0.2) 60%, transparent 85%), linear-gradient(0deg, rgba(255,160,50,0.35) 0%, transparent 45%)",
        }}
      />

      <div ref={sunsetAtmoBackRef} className={`${layerBase} z-20 hidden`} style={{ ...styleWithWillChange, background: goldenEdge }} />
      <div ref={sunsetAtmoMidRef} className={`${layerBase} z-20 hidden`} style={{ ...styleWithWillChange, background: goldenGlow }} />
      <div ref={sunsetAtmoFrontRef} className={`${layerBase} z-20 hidden`} style={{ ...styleWithWillChange, background: goldenHaze }} />

      <div
        ref={directionsRef}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
      >
        <h2 className="font-display text-lg font-bold tracking-tighter text-white drop-shadow-[0_6px_36px_rgba(180,80,20,0.75)] sm:text-3xl sm:tracking-tight md:text-5xl md:tracking-[0.18em] lg:text-6xl">
          ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ
        </h2>
        <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-white/90 drop-shadow-[0_2px_14px_rgba(80,30,5,0.6)] sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
          Стратегические отрасли, где капитал фонда раскрывает потенциал экономики в золотом свете заката.
        </p>
      </div>
    </>
  );
});
