import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { getFinanceCards } from "@/lib/i18n/content";
import { useT } from "@/lib/lang";
import { DetailLinkButton } from "./DetailLinkButton";
import { SectionCard } from "./SectionCard";
import { SectionCardSlide, SectionCardsScroller } from "./SectionCardsScroller";
import {
  SECTION_CARDS_GRID_MARGIN,
  SECTION_CTA_MARGIN,
  SECTION_HEADING,
  SECTION_HEADING_HERO,
  SECTION_SHELL,
  SECTION_SUBTEXT,
  SECTION_SUBTEXT_MARGIN,
  SECTION_TOP_WITH_CARDS,
} from "./sectionLayout";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type FinanceSceneRefs = {
  financeRef: RefObject<HTMLDivElement | null>;
};

export function prepareFinanceScene(refs: FinanceSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.financeRef.current, { ...text.idle, xPercent: 0, x: 0 });
}

export function animateFinanceScene(tl: SceneTimeline, refs: FinanceSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const { enterDur, exitDur, financeEnterT, financeExitT } = timings;

  tl.fromTo(refs.financeRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, financeEnterT);

  tl.to(refs.financeRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, financeExitT);
}

export type FinanceSectionProps = {
  financeRef: RefObject<HTMLDivElement | null>;
};

export const FinanceSection = forwardRef<HTMLDivElement, FinanceSectionProps>(function FinanceSection(
  { financeRef },
  _ref
) {
  const t = useT();
  const cards = getFinanceCards(t);

  return (
    <div ref={financeRef} className={`${SECTION_SHELL} ${SECTION_TOP_WITH_CARDS}`}>
      <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO}`}>{t.finance.heading}</h2>
      <p className={`${SECTION_SUBTEXT} ${SECTION_SUBTEXT_MARGIN} text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]`}>
        {t.finance.blurb}
      </p>
      <div className={`${SECTION_CARDS_GRID_MARGIN} origin-top max-md:scale-[0.92] md:scale-[0.94] lg:scale-[0.97]`}>
        <SectionCardsScroller layout="four-row" className="pointer-events-auto touch-pan-x">
          {cards.map((card) => (
            <SectionCardSlide key={card.title} layout="four-row">
              <SectionCard compact title={card.title} description={card.description} icon={card.icon} />
            </SectionCardSlide>
          ))}
        </SectionCardsScroller>
      </div>
      <DetailLinkButton
        to="/finance"
        originSection="sc_finance"
        label={t.finance.applyCta}
        containerClassName={SECTION_CTA_MARGIN}
      />
    </div>
  );
});
