import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { SectionCard } from "./SectionCard";
import { SectionCardSlide, SectionCardsScroller } from "./SectionCardsScroller";
import { DIRECTION_CARDS } from "./sectionContent";
import { SECTION_HEADING, SECTION_SUBTEXT, SECTION_TOP_WITH_CARDS } from "./sectionLayout";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type DirectionsSceneRefs = {
  directionsRef: RefObject<HTMLDivElement | null>;
};

export function prepareDirectionsScene(refs: DirectionsSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.directionsRef.current, { ...text.idle, xPercent: 0, x: 0 });
}

export function animateDirectionsScene(tl: SceneTimeline, refs: DirectionsSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const { directionsEnterT, directionsExitT, enterDur, exitDur } = timings;

  tl.fromTo(refs.directionsRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, directionsEnterT);
  tl.to(refs.directionsRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, directionsExitT);
}

export type DirectionsSectionProps = {
  directionsRef: RefObject<HTMLDivElement | null>;
};

export const DirectionsSection = forwardRef<HTMLDivElement, DirectionsSectionProps>(function DirectionsSection(
  { directionsRef },
  _ref
) {
  return (
    <div
      ref={directionsRef}
      className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_WITH_CARDS} z-30 px-3 text-center opacity-0 will-change-[transform,opacity] sm:px-6`}
    >
      <h2
        className={`${SECTION_HEADING} text-base text-white sm:text-3xl md:text-5xl md:tracking-[0.18em] lg:text-6xl`}
      >
        ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ
      </h2>
      <p className={`${SECTION_SUBTEXT} mt-2 text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:mt-3`}>
        Национальный инвестиционный фонд работает с ключевыми отраслями, которые имеют высокий потенциал роста и
        важны для развития экономики Кыргызстана.
      </p>
      <div className="mt-6 sm:mt-9">
        <SectionCardsScroller
          layout="four-two"
          className="pointer-events-auto touch-pan-x md:pointer-events-none md:gap-y-12 lg:gap-y-14"
        >
          {DIRECTION_CARDS.map((card, index) => (
            <SectionCardSlide
              key={card.title}
              wide
              layout="four-two"
              gridSlot={index === 4 ? "bottom-left" : index === 5 ? "bottom-right" : "default"}
            >
              <SectionCard compact title={card.title} description={card.description} iconKey={card.iconKey} />
            </SectionCardSlide>
          ))}
        </SectionCardsScroller>
      </div>
    </div>
  );
});
