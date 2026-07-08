import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { DetailLinkButton } from "./DetailLinkButton";
import { SECTION_HEADING, SECTION_SUBTEXT } from "./sectionLayout";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type AboutSceneRefs = {
  aboutRef: RefObject<HTMLDivElement | null>;
};

export function prepareAboutScene(refs: AboutSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.aboutRef.current, { ...text.idle, xPercent: 0, x: 0 });
}

export function animateAboutScene(tl: SceneTimeline, refs: AboutSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const { aboutEnterT, aboutExitT, enterDur, exitDur } = timings;

  tl.fromTo(refs.aboutRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, aboutEnterT);
  tl.to(refs.aboutRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, aboutExitT);
}

export type AboutSectionProps = {
  aboutRef: RefObject<HTMLDivElement | null>;
};

export const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(function AboutSection(
  { aboutRef },
  _ref
) {
  return (
    <div
      ref={aboutRef}
      className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-3 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
    >
      <h2
        className={`${SECTION_HEADING} text-xl text-[color:var(--primary)] drop-shadow-[0_4px_30px_rgba(255,255,255,0.8)] sm:text-4xl md:text-6xl md:tracking-[0.2em] lg:text-7xl`}
      >
        О ФОНДЕ
      </h2>
      <p className={`${SECTION_SUBTEXT} mt-3 text-[color:var(--ink)]/85 sm:mt-5`}>
        Национальный инвестиционный фонд выступает связующим звеном между государством, бизнесом и инвесторами.
        Мы применяем современные инструменты прямого инвестирования, направляя капитал в проекты, которые создают
        реальный экономический эффект и ускоряют развитие Кыргызстана.
      </p>
      <DetailLinkButton
        to="/about"
        className="border-[color:var(--ink)]/25 bg-[color:var(--ink)]/5 text-[color:var(--ink)] hover:border-[color:var(--ink)]/45 hover:bg-[color:var(--ink)]/10"
      />
    </div>
  );
});
