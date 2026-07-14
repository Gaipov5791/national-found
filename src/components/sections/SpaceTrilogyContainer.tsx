import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { DetailLinkButton } from "./DetailLinkButton";
import { NewsCardsMarquee } from "./NewsCardsMarquee";
import { NEWS_PREVIEW_ITEMS } from "./sectionContent";
import {
  SECTION_CTA_MARGIN,
  SECTION_HEADING,
  SECTION_HEADING_HERO,
  SECTION_PAD_X,
  SECTION_SHELL,
  SECTION_SUBTEXT,
  SECTION_SUBTEXT_MARGIN,
  SECTION_TOP_AFTER_BRAND,
  SECTION_TOP_NEWS,
} from "./sectionLayout";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type SpaceTrilogySceneRefs = {
  partnersTextRef: RefObject<HTMLDivElement | null>;
  newsTitleRef: RefObject<HTMLDivElement | null>;
};

export function prepareSpaceTrilogyScene(refs: SpaceTrilogySceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;

  gsap.set(refs.partnersTextRef.current, { ...text.idle, xPercent: 0, x: 0 });
  gsap.set(refs.newsTitleRef.current, { ...text.idle, xPercent: 0, x: 0 });
}

export function animateSpaceTrilogyScene(tl: SceneTimeline, refs: SpaceTrilogySceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const {
    enterDur,
    exitDur,
    partnersEnterT,
    partnersTextExitT,
    newsEnterT,
    newsExitT,
  } = timings;

  tl.fromTo(refs.partnersTextRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, partnersEnterT);
  tl.to(refs.partnersTextRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, partnersTextExitT);

  tl.fromTo(refs.newsTitleRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, newsEnterT);
  tl.to(refs.newsTitleRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, newsExitT);
}

export type SpaceTrilogyContainerProps = {
  partnersRef: RefObject<HTMLDivElement | null>;
  partnersTextRef: RefObject<HTMLDivElement | null>;
  newsTitleRef: RefObject<HTMLDivElement | null>;
};

const PARTNER_ACTIONS = [
  { to: "/partners-registry", label: "Реестр партнёров" },
  { to: "/partners-cooperation", label: "Международное и региональное сотрудничество" },
  { to: "/partners-join", label: "Стать партнёром" },
] as const;

export const SpaceTrilogyContainer = forwardRef<HTMLDivElement, SpaceTrilogyContainerProps>(
  function SpaceTrilogyContainer(
    {
      partnersRef,
      partnersTextRef,
      newsTitleRef,
    },
    _ref
  ) {
    return (
      <>
        <div
          ref={partnersRef}
          className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_AFTER_BRAND} z-30 ${SECTION_PAD_X} text-center`}
        >
          <div ref={partnersTextRef} className="opacity-0 will-change-[transform,opacity]">
            <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO}`}>
              ПАРТНЁРЫ
            </h2>
            <p className={`${SECTION_SUBTEXT} ${SECTION_SUBTEXT_MARGIN} text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]`}>
              Национальный инвестиционный фонд развивает партнёрства с ведущими международными финансовыми
              институтами и организациями для реализации стратегических проектов в Кыргызстане.
            </p>
            <div
              className={`pointer-events-auto mx-auto grid w-full max-w-6xl grid-cols-1 gap-2 px-1 sm:gap-3 md:grid-cols-3 md:items-stretch md:gap-5 lg:gap-6 ${SECTION_CTA_MARGIN}`}
            >
              {PARTNER_ACTIONS.map((action) => (
                <DetailLinkButton
                  key={action.to}
                  to={action.to}
                  label={action.label}
                  block
                  containerClassName="mt-0"
                />
              ))}
            </div>
          </div>
        </div>

        <div
          ref={newsTitleRef}
          id="novosti"
          aria-label="Новости"
          className={`${SECTION_SHELL} ${SECTION_TOP_NEWS}`}
        >
          <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO}`}>
            НОВОСТИ
          </h2>
          <NewsCardsMarquee items={NEWS_PREVIEW_ITEMS} />
          <DetailLinkButton to="/news" label="Читать ещё" containerClassName="mt-4 sm:mt-6 md:mt-7" />
        </div>
      </>
    );
  }
);
