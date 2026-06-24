import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type DecreeSceneRefs = {
  decreeRef: RefObject<HTMLDivElement | null>;
  ambientFogRef: RefObject<HTMLDivElement | null>;
  wipe1HazeRef: RefObject<HTMLDivElement | null>;
  wipe1BackRef: RefObject<HTMLDivElement | null>;
  wipe1MidRef: RefObject<HTMLDivElement | null>;
  wipe1FrontRef: RefObject<HTMLDivElement | null>;
};

export function prepareDecreeScene(refs: DecreeSceneRefs, ctx: SceneAnimationContext) {
  const { mobile, text } = ctx;

  if (!mobile) {
    [refs.wipe1BackRef, refs.wipe1MidRef, refs.wipe1FrontRef, refs.ambientFogRef].forEach((r, i) => {
      if (r.current) {
        gsap.to(r.current, {
          yPercent: i % 2 === 0 ? 4 : -4,
          duration: 14 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
  }

  gsap.set(refs.decreeRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
}

export function animateDecreeScene(tl: SceneTimeline, refs: DecreeSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text, sz } = ctx;
  const { enterDur, exitDur, decreeCloudsT, decreeExitT } = timings;

  tl.fromTo(
    refs.ambientFogRef.current,
    { opacity: 0, yPercent: 40 },
    { opacity: 0.55, yPercent: 0, duration: enterDur + 0.02, ease: text.enterEase },
    decreeCloudsT
  );
  tl.fromTo(
    refs.wipe1BackRef.current,
    { yPercent: 110, opacity: 0, scale: sz(1.1) },
    { yPercent: -15, opacity: 0.58, scale: sz(1.25), duration: enterDur + 0.02, ease: "power2.inOut" },
    decreeCloudsT
  );
  tl.fromTo(
    refs.wipe1MidRef.current,
    { yPercent: 130, opacity: 0, scale: sz(1.2) },
    { yPercent: -5, opacity: 0.42, scale: sz(1.4), duration: enterDur + 0.018, ease: "power2.inOut" },
    decreeCloudsT + 0.008
  );
  tl.fromTo(
    refs.wipe1FrontRef.current,
    { yPercent: 150, opacity: 0, scale: sz(1.3) },
    { yPercent: -25, opacity: 0.48, scale: sz(1.55), duration: enterDur + 0.02, ease: "power2.inOut" },
    decreeCloudsT + 0.012
  );
  tl.set(refs.wipe1HazeRef.current, { opacity: 0 }, decreeCloudsT);

  tl.fromTo(refs.decreeRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, decreeCloudsT);
  tl.to(refs.decreeRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, decreeExitT);
  tl.to(refs.wipe1BackRef.current, { yPercent: -120, opacity: 0, duration: exitDur, ease: text.exitEase }, decreeExitT);
  tl.to(refs.wipe1MidRef.current, { yPercent: -130, opacity: 0, duration: exitDur, ease: text.exitEase }, decreeExitT + 0.004);
  tl.to(refs.wipe1FrontRef.current, { yPercent: -140, opacity: 0, duration: exitDur, ease: text.exitEase }, decreeExitT + 0.008);
  tl.to(refs.ambientFogRef.current, { yPercent: -30, opacity: 0, duration: exitDur, ease: text.exitEase }, decreeExitT);
}

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
        className="hidden pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-[70%] w-full opacity-0 will-change-[transform,opacity]"
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
      <div ref={wipe1BackRef} className="hidden" />
      <div ref={wipe1MidRef} className="hidden" />
      <div ref={wipe1FrontRef} className="hidden" />
    </>
  );
});
