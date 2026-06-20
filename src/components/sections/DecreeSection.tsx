import { forwardRef, type RefObject } from "react";

export type DecreeSectionProps = {
  decreeRef: RefObject<HTMLDivElement | null>;
  ambientFogRef: RefObject<HTMLDivElement | null>;
  wipe1HazeRef: RefObject<HTMLDivElement | null>;
  wipe1BackRef: RefObject<HTMLDivElement | null>;
  wipe1MidRef: RefObject<HTMLDivElement | null>;
  wipe1FrontRef: RefObject<HTMLDivElement | null>;
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

export const DecreeSection = forwardRef<HTMLDivElement, DecreeSectionProps>(function DecreeSection(
  { decreeRef, ambientFogRef, wipe1HazeRef, wipe1BackRef, wipe1MidRef, wipe1FrontRef },
  _ref
) {
  return (
    <>
      <div
        ref={ambientFogRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-[70%] w-full opacity-0 will-change-[transform,opacity]"
        style={{
          willChange: "transform, opacity",
          background:
            "linear-gradient(to top, rgba(255,255,255,0.6) 0%, rgba(245,250,255,0.4) 35%, rgba(230,240,250,0.2) 65%, rgba(220,235,250,0) 100%)",
        }}
      />

      <div
        ref={decreeRef}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-[25] -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
      >
        <p className="font-display text-sm tracking-tight text-[color:var(--primary)]/85 sm:text-base md:text-lg">
          Фонд учрежден постановлением
        </p>
        <h2 className="mt-2 font-display text-xl font-bold leading-snug tracking-tighter text-[color:var(--primary)] sm:text-2xl sm:tracking-tight md:text-4xl lg:text-5xl">
          Кабинета Министров Кыргызской Республики
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-[11px] leading-relaxed tracking-tight text-[color:var(--ink)]/75 sm:mt-5 sm:text-xs md:text-sm">
          от 5 ноября 2024 года № 666 во исполнение Закона Кыргызской Республики «О Национальном инвестиционном
          фонде Кыргызской Республики» и Указа Президента Кыргызской Республики № 155 от 14 июня 2024 года.
        </p>
      </div>

      <div ref={wipe1HazeRef} className="hidden" />
      <div ref={wipe1BackRef} className={`${layerBase} z-[36]`} style={{ ...styleWithWillChange, background: cloudWhite }} />
      <div ref={wipe1MidRef} className={`${layerBase} z-[37]`} style={{ ...styleWithWillChange, background: cloudBlue }} />
      <div ref={wipe1FrontRef} className={`${layerBase} z-[38]`} style={{ ...styleWithWillChange, background: cloudPlatinum }} />
    </>
  );
});
