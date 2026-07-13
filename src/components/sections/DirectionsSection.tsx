import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { SectionCard } from "./SectionCard";
import { SectionCardSlide, SectionCardsScroller } from "./SectionCardsScroller";
import { DIRECTION_CARDS } from "./sectionContent";
import {
  SECTION_HEADING,
  SECTION_SUBTEXT,
  SECTION_HEADING_SINGLE_LINE,
  SECTION_HEADING_HERO,
  SECTION_TOP_WITH_CARDS,
  SECTION_CARDS_GRID_MARGIN,
} from "./sectionLayout";
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

const CARD_SCROLLER_CLASS =
  "pointer-events-auto origin-top touch-pan-x max-md:scale-[0.88] md:scale-[0.9] lg:scale-[0.93]";

export const DirectionsSection = forwardRef<HTMLDivElement, DirectionsSectionProps>(function DirectionsSection(
  { directionsRef },
  _ref
) {
  const topRow = DIRECTION_CARDS.slice(0, 4);
  const bottomRow = DIRECTION_CARDS.slice(4);

  return (
    <div
      ref={directionsRef}
      className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_WITH_CARDS} z-30 px-3 text-center opacity-0 will-change-[transform,opacity] sm:px-6`}
    >
      <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO} ${SECTION_HEADING_SINGLE_LINE}`}>
        ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ
      </h2>
      <p className={`${SECTION_SUBTEXT} mt-2 text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:mt-3`}>
        Национальный инвестиционный фонд работает с ключевыми отраслями, которые имеют высокий потенциал роста и
        важны для развития экономики Кыргызстана.
      </p>
      <div className={SECTION_CARDS_GRID_MARGIN}>
        <SectionCardsScroller layout="four-row" className={CARD_SCROLLER_CLASS}>
          {topRow.map((card) => (
            <SectionCardSlide key={card.title} wide layout="four-row">
              <SectionCard compact title={card.title} description={card.description} icon={card.icon} />
            </SectionCardSlide>
          ))}
        </SectionCardsScroller>
        <SectionCardsScroller
          layout="two-col"
          className={`${CARD_SCROLLER_CLASS} mt-2 md:mx-auto md:mt-3 md:w-fit md:justify-items-stretch`}
        >
          {bottomRow.map((card) => (
            <SectionCardSlide key={card.title} wide layout="two-col">
              <SectionCard compact title={card.title} description={card.description} icon={card.icon} />
            </SectionCardSlide>
          ))}
        </SectionCardsScroller>
      </div>
    </div>
  );
});
