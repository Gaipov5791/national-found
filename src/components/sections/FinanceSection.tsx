import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { DetailLinkButton } from "./DetailLinkButton";
import { SectionCard } from "./SectionCard";
import { SectionCardSlide, SectionCardsScroller } from "./SectionCardsScroller";
import { FINANCE_CARDS } from "./sectionContent";
import { SECTION_HEADING, SECTION_SUBTEXT, SECTION_TOP_WITH_CARDS } from "./sectionLayout";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type FinanceSceneRefs = {
  financeRef: RefObject<HTMLDivElement | null>;
};

export function prepareFinanceScene(refs: FinanceSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.financeRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
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
  return (
    <div
      ref={financeRef}
      className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_WITH_CARDS} z-30 px-3 text-center opacity-0 will-change-[transform,opacity] sm:px-6`}
    >
      <h2
        className={`${SECTION_HEADING} text-lg text-white sm:text-3xl md:text-5xl md:tracking-[0.18em] lg:text-6xl`}
      >
        ФИНАНСИРОВАНИЕ ПРОЕКТОВ
      </h2>
      <p className={`${SECTION_SUBTEXT} mt-2 text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:mt-3`}>
        Мы предлагаем современные инструменты финансирования, которые помогают привлекать капитал и успешно
        реализовывать стратегические проекты в Кыргызстане.
      </p>
      <div className="pointer-events-auto mt-4 sm:mt-6">
        <SectionCardsScroller>
          {FINANCE_CARDS.map((card) => (
            <SectionCardSlide key={card.title}>
              <SectionCard compact title={card.title} description={card.description} icon={card.icon} />
            </SectionCardSlide>
          ))}
        </SectionCardsScroller>
      </div>
      <DetailLinkButton to="/finance" className="mt-4 sm:mt-6" />
    </div>
  );
});
