import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { getDirectionCards } from "@/lib/i18n/content";
import { useT } from "@/lib/lang";
import { SectionCard } from "./SectionCard";
import { SectionCardSlide, SectionCardsScroller } from "./SectionCardsScroller";
import {
  SECTION_CARDS_GRID_MARGIN,
  SECTION_HEADING,
  SECTION_HEADING_HERO,
  SECTION_HEADING_SINGLE_LINE,
  SECTION_SHELL,
  SECTION_SUBTEXT,
  SECTION_SUBTEXT_MARGIN,
  SECTION_TOP_WITH_CARDS,
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

const CARD_SCROLLER_SCALE =
  "origin-top max-md:scale-[0.88] md:scale-[0.9] lg:scale-[0.93]";

export const DirectionsSection = forwardRef<HTMLDivElement, DirectionsSectionProps>(function DirectionsSection(
  { directionsRef },
  _ref
) {
  const t = useT();
  const cards = getDirectionCards(t);

  return (
    <div ref={directionsRef} className={`${SECTION_SHELL} ${SECTION_TOP_WITH_CARDS}`}>
      <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO} ${SECTION_HEADING_SINGLE_LINE}`}>
        {t.directions.heading}
      </h2>
      <p className={`${SECTION_SUBTEXT} ${SECTION_SUBTEXT_MARGIN} text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]`}>
        {t.directions.blurb}
      </p>
      <div className={`${SECTION_CARDS_GRID_MARGIN} ${CARD_SCROLLER_SCALE}`}>
        <SectionCardsScroller layout="six-row" autoSwipeOnOverflow className="pointer-events-auto touch-pan-x">
          {cards.map((card) => (
            <SectionCardSlide key={card.title} layout="six-row">
              <SectionCard compact title={card.title} description={card.description} icon={card.icon} />
            </SectionCardSlide>
          ))}
        </SectionCardsScroller>
      </div>
    </div>
  );
});
