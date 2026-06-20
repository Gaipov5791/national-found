import { forwardRef, type RefObject } from "react";
import { SCENE_IMAGES } from "./sceneImages";

export type FinanceSectionProps = {
  financeBgRef: RefObject<HTMLImageElement | null>;
  noonTintRef: RefObject<HTMLDivElement | null>;
  financeRef: RefObject<HTMLDivElement | null>;
  wipe2HazeRef: RefObject<HTMLDivElement | null>;
  wipe2BackRef: RefObject<HTMLDivElement | null>;
  wipe2MidRef: RefObject<HTMLDivElement | null>;
  wipe2FrontRef: RefObject<HTMLDivElement | null>;
};

const cloudWhite =
  "radial-gradient(ellipse 85% 65% at 50% 55%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.38) 35%, rgba(255,255,255,0.12) 65%, rgba(255,255,255,0) 100%)";
const cloudBlue =
  "radial-gradient(ellipse 95% 70% at 45% 60%, rgba(224,242,254,0.4) 0%, rgba(214,232,248,0.28) 40%, rgba(200,222,242,0.08) 70%, rgba(200,222,242,0) 100%)";
const cloudPlatinum =
  "radial-gradient(ellipse 100% 75% at 55% 50%, rgba(241,245,249,0.4) 0%, rgba(230,236,244,0.28) 40%, rgba(220,228,238,0.08) 70%, rgba(220,228,238,0) 100%)";
const layerBase =
  "pointer-events-none absolute left-1/2 top-1/2 -ml-[100vw] -mt-[100svh] md:-mt-[100vh] w-[200vw] h-[200svh] md:h-[200vh] rounded-full opacity-0 blur-[140px]";
const styleWithWillChange = {
  willChange: "transform, opacity",
  maskImage: "radial-gradient(ellipse 90% 90% at center, white 55%, transparent 100%)",
};

export const FinanceSection = forwardRef<HTMLDivElement, FinanceSectionProps>(function FinanceSection(
  { financeBgRef, noonTintRef, financeRef, wipe2HazeRef, wipe2BackRef, wipe2MidRef, wipe2FrontRef },
  _ref
) {
  return (
    <>
      <img
        ref={financeBgRef}
        src={SCENE_IMAGES.finance}
        alt="Стратегические промышленные активы"
        className="scene-gpu-layer absolute inset-0 z-0 h-full w-full object-cover opacity-0 will-change-[transform,opacity]"
        style={{ transformOrigin: "50% 60%" }}
      />

      <div
        ref={noonTintRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 will-change-[transform,opacity]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,248,220,0.35) 0%, rgba(255,235,180,0.18) 40%, rgba(200,210,230,0.08) 100%)",
        }}
      />

      <div
        ref={financeRef}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
      >
        <h2 className="font-display text-xl font-bold tracking-tighter text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] sm:text-3xl sm:tracking-tight md:text-5xl md:tracking-[0.18em] lg:text-6xl">
          ФИНАНСИРОВАНИЕ ПРОЕКТОВ
        </h2>
      </div>

      <div
        ref={wipe2HazeRef}
        className="pointer-events-none absolute inset-0 z-[40] opacity-0 will-change-[transform,opacity]"
        style={{
          willChange: "opacity",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(245,250,255,0.45) 50%, rgba(235,242,250,0.35) 100%)",
        }}
      />
      <div ref={wipe2BackRef} className={`${layerBase} z-[41]`} style={{ ...styleWithWillChange, background: cloudWhite }} />
      <div ref={wipe2MidRef} className={`${layerBase} z-[42]`} style={{ ...styleWithWillChange, background: cloudBlue }} />
      <div ref={wipe2FrontRef} className={`${layerBase} z-[43]`} style={{ ...styleWithWillChange, background: cloudPlatinum }} />
    </>
  );
});
