import { forwardRef, type RefObject } from "react";
import { SCENE_IMAGES } from "./sceneImages";

export type MsbSectionProps = {
  twilightBgRef: RefObject<HTMLDivElement | null>;
  msbCollageRef: RefObject<HTMLDivElement | null>;
  twilightBlueRef: RefObject<HTMLDivElement | null>;
  twilightRoseRef: RefObject<HTMLDivElement | null>;
  msbHazeRef: RefObject<HTMLDivElement | null>;
  twilightAtmoBackRef: RefObject<HTMLDivElement | null>;
  twilightAtmoMidRef: RefObject<HTMLDivElement | null>;
  twilightAtmoFrontRef: RefObject<HTMLDivElement | null>;
  msbRef: RefObject<HTMLDivElement | null>;
};

const twilightHaze =
  "radial-gradient(ellipse 95% 55% at 50% 50%, rgba(100,130,190,0.4) 0%, rgba(70,95,160,0.28) 40%, transparent 75%)";
const twilightVeil =
  "radial-gradient(ellipse 90% 50% at 40% 55%, rgba(120,150,210,0.35) 0%, rgba(80,110,175,0.22) 45%, transparent 80%)";
const twilightMist =
  "radial-gradient(ellipse 100% 55% at 60% 45%, rgba(90,120,180,0.32) 0%, rgba(60,85,145,0.18) 50%, transparent 85%)";
const layerBase =
  "pointer-events-none absolute left-1/2 top-1/2 -ml-[100vw] -mt-[100svh] md:-mt-[100vh] w-[200vw] h-[200svh] md:h-[200vh] rounded-full opacity-0 blur-[120px]";
const styleWithWillChange = {
  willChange: "transform, opacity",
  maskImage: "radial-gradient(ellipse 90% 90% at center, white 55%, transparent 100%)",
};

export const MsbSection = forwardRef<HTMLDivElement, MsbSectionProps>(function MsbSection(
  {
    twilightBgRef,
    msbCollageRef,
    twilightBlueRef,
    twilightRoseRef,
    msbHazeRef,
    twilightAtmoBackRef,
    twilightAtmoMidRef,
    twilightAtmoFrontRef,
    msbRef,
  },
  _ref
) {
  return (
    <>
      <div
        ref={twilightBgRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 will-change-[transform,opacity]"
        style={{
          background:
            "linear-gradient(180deg, #080c18 0%, #101830 18%, #1a2848 38%, #304870 58%, #5078a0 75%, #88a8c8 90%, #b8cce0 100%)",
        }}
      />

      <div
        ref={msbCollageRef}
        className="scene-gpu-layer pointer-events-none absolute inset-0 z-[2] opacity-0 will-change-[transform,opacity]"
        style={{ transformOrigin: "50% 55%", isolation: "isolate" }}
      >
        <img
          src={SCENE_IMAGES.msb}
          alt="Курорт на берегу Иссык-Куля"
          className="absolute inset-0 h-full w-full object-cover will-change-[opacity,transform]"
          style={{ transformOrigin: "50% 55%" }}
        />
      </div>

      <div
        ref={twilightBlueRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 will-change-[transform,opacity]"
        style={{
          mixBlendMode: "multiply",
          background:
            "radial-gradient(ellipse 130% 90% at 50% 55%, rgba(25,45,110,0.85) 0%, rgba(35,55,130,0.6) 35%, rgba(45,70,150,0.35) 60%, transparent 88%), linear-gradient(180deg, rgba(15,25,60,0.4) 0%, rgba(40,70,140,0.25) 50%, rgba(80,110,170,0.12) 100%)",
        }}
      />
      <div
        ref={twilightRoseRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 will-change-[transform,opacity]"
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(ellipse 100% 65% at 50% 68%, rgba(255,150,120,0.45) 0%, rgba(220,120,140,0.28) 40%, rgba(180,100,160,0.12) 65%, transparent 85%)",
        }}
      />
      <div
        ref={msbHazeRef}
        className="pointer-events-none absolute inset-0 z-[4] opacity-0 will-change-[transform,opacity]"
        style={{
          background:
            "radial-gradient(ellipse 120% 85% at 50% 70%, rgba(60,80,140,0.45) 0%, rgba(40,55,110,0.32) 40%, rgba(25,35,80,0.18) 65%, transparent 90%)",
          filter: "blur(48px)",
        }}
      />

      <div ref={twilightAtmoBackRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: twilightHaze }} />
      <div ref={twilightAtmoMidRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: twilightVeil }} />
      <div ref={twilightAtmoFrontRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: twilightMist }} />

      <div
        ref={msbRef}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
      >
        <h2 className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-[0_6px_32px_rgba(40,60,120,0.7)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.18em] lg:text-7xl">
          ПРОЕКТЫ МСБ
        </h2>
        <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-white/88 drop-shadow-[0_2px_12px_rgba(20,30,60,0.65)] sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
          Поддержка малого и среднего бизнеса в мягком сумеречном свете — там, где идеи превращаются в устойчивый рост.
        </p>
      </div>
    </>
  );
});
