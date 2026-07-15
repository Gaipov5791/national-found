import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { DetailLinkButton } from "./DetailLinkButton";
import {
  SECTION_CTA_MARGIN,
  SECTION_HEADING,
  SECTION_HEADING_HERO,
  SECTION_SHELL,
  SECTION_SUBTEXT_MARGIN,
  SECTION_SUBTEXT_ON_IMAGE,
  SECTION_TOP_SIMPLE_CENTER,
} from "./sectionLayout";
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
      className={`${SECTION_SHELL} ${SECTION_TOP_SIMPLE_CENTER}`}
    >
      <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO}`}>
        О ФОНДЕ
      </h2>
      <p className={`${SECTION_SUBTEXT_ON_IMAGE} ${SECTION_SUBTEXT_MARGIN} text-white/90`}>
        Национальный инвестиционный фонд выступает связующим звеном между государством, бизнесом и инвесторами.
        Мы применяем современные инструменты прямого инвестирования, направляя капитал в проекты, которые создают
        реальный экономический эффект и ускоряют развитие Кыргызстана.
      </p>
      <DetailLinkButton
        to="/about"
        originSection="sc_about"
        containerClassName={SECTION_CTA_MARGIN}
      />
    </div>
  );
});
