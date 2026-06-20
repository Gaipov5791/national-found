import { forwardRef, type RefObject } from "react";
import { SCENE_IMAGES } from "./sceneImages";

export type DirectionsSectionProps = {
  sunsetBgRef: RefObject<HTMLDivElement | null>;
  directionsCollageRef: RefObject<HTMLDivElement | null>;
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
    sunsetBgRef,
    directionsCollageRef,
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
        ref={sunsetBgRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 will-change-[transform,opacity]"
        style={{
          background:
            "linear-gradient(175deg, #120804 0%, #4a2008 14%, #8a4010 32%, #c46828 52%, #e89840 68%, #f5c070 82%, #ffe8b8 96%)",
        }}
      />

      <div
        ref={directionsCollageRef}
        className="scene-gpu-layer pointer-events-none absolute inset-0 z-[2] opacity-0 will-change-[transform,opacity]"
        style={{ transformOrigin: "50% 55%", isolation: "isolate" }}
      >
        <img
          src={SCENE_IMAGES.directions}
          alt="Гидроэлектростанция на закате"
          className="absolute inset-0 h-full w-full object-cover will-change-[opacity,transform]"
          style={{ transformOrigin: "50% 55%" }}
        />
      </div>

      <div
        ref={amberBurnRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 will-change-[transform,opacity]"
        style={{
          mixBlendMode: "multiply",
          background:
            "radial-gradient(ellipse 140% 95% at 50% 78%, rgba(255,100,10,0.95) 0%, rgba(220,60,5,0.75) 30%, rgba(160,35,0,0.45) 55%, rgba(80,20,0,0.15) 75%, transparent 92%)",
        }}
      />
      <div
        ref={amberGlowRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 will-change-[transform,opacity]"
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(ellipse 120% 70% at 50% 72%, rgba(255,220,140,0.85) 0%, rgba(255,180,70,0.5) 35%, rgba(255,140,40,0.2) 60%, transparent 85%), linear-gradient(0deg, rgba(255,160,50,0.35) 0%, transparent 45%)",
        }}
      />

      <div ref={sunsetAtmoBackRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: goldenEdge }} />
      <div ref={sunsetAtmoMidRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: goldenGlow }} />
      <div ref={sunsetAtmoFrontRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: goldenHaze }} />

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
