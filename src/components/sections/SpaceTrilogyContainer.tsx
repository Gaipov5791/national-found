import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { DetailLinkButton } from "./DetailLinkButton";
import { NewsPreviewCard } from "./NewsPreviewCard";
import {
  SECTION_HEADING,
  SECTION_SUBTEXT,
  SECTION_TOP_AFTER_BRAND,
  SECTION_HEADING_HERO,
  SECTION_PARTNERS_LOGOS_MARGIN,
} from "./sectionLayout";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type SpaceTrilogySceneRefs = {
  partnersTextRef: RefObject<HTMLDivElement | null>;
  partnerLogosRef: RefObject<HTMLDivElement | null>;
  newsTitleRef: RefObject<HTMLDivElement | null>;
};

export function prepareSpaceTrilogyScene(refs: SpaceTrilogySceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;

  gsap.set(refs.partnersTextRef.current, { ...text.idle, xPercent: 0, x: 0 });
  gsap.set(refs.newsTitleRef.current, { ...text.idle, xPercent: 0, x: 0 });

  const partnerLogoEls = refs.partnerLogosRef.current?.querySelectorAll("[data-partner-logo]");
  if (partnerLogoEls?.length) {
    gsap.set(partnerLogoEls, { opacity: 0, scale: 0.88 });
  }
}

export function animateSpaceTrilogyScene(tl: SceneTimeline, refs: SpaceTrilogySceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const {
    enterDur,
    exitDur,
    partnersEnterT,
    partnerLogoExitT,
    partnersTextExitT,
    newsEnterT,
    newsExitT,
  } = timings;

  const partnerLogoEls = refs.partnerLogosRef.current?.querySelectorAll("[data-partner-logo]");

  tl.fromTo(refs.partnersTextRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, partnersEnterT);
  if (partnerLogoEls?.length) {
    tl.to(
      partnerLogoEls,
      { opacity: 1, scale: 1, duration: 0.022, stagger: 0.008, ease: "power2.out" },
      partnersEnterT + enterDur * 0.5
    );
  }

  if (partnerLogoEls?.length) {
    tl.to(
      partnerLogoEls,
      { ...text.evaporated, duration: exitDur, stagger: 0.005, ease: text.exitEase },
      partnerLogoExitT
    );
  }
  tl.to(refs.partnersTextRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, partnersTextExitT);

  tl.fromTo(refs.newsTitleRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, newsEnterT);
  tl.to(refs.newsTitleRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, newsExitT);
}

export type SpaceTrilogyContainerProps = {
  partnersRef: RefObject<HTMLDivElement | null>;
  partnersTextRef: RefObject<HTMLDivElement | null>;
  partnerLogosRef: RefObject<HTMLDivElement | null>;
  newsTitleRef: RefObject<HTMLDivElement | null>;
};

const PARTNER_NAMES = ["EBRD", "IFC", "ADB", "AIIB", "KfW"] as const;

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
      partnerLogosRef,
      newsTitleRef,
    },
    _ref
  ) {
    return (
      <>
        <div
          ref={partnersRef}
          className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_AFTER_BRAND} z-30 px-3 text-center sm:px-6`}
        >
          <div ref={partnersTextRef} className="opacity-0 will-change-[transform,opacity]">
            <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO}`}>
              ПАРТНЁРЫ
            </h2>
            <p className={`${SECTION_SUBTEXT} mt-2 text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] sm:mt-3`}>
              Национальный инвестиционный фонд развивает партнёрства с ведущими международными финансовыми
              институтами и организациями для реализации стратегических проектов в Кыргызстане.
            </p>
            <div className="pointer-events-auto mx-auto mt-3 grid w-full max-w-6xl grid-cols-1 gap-2 px-1 sm:mt-4 sm:gap-3 md:grid-cols-3 md:items-stretch md:gap-5 lg:gap-6">
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
          <div
            ref={partnerLogosRef}
            className={`mx-auto flex max-w-3xl snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:snap-none md:gap-10 [&::-webkit-scrollbar]:hidden ${SECTION_PARTNERS_LOGOS_MARGIN}`}
          >
            {PARTNER_NAMES.map((name) => (
              <div
                key={name}
                data-partner-logo
                className="flex h-10 w-20 shrink-0 snap-start items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] px-2 backdrop-blur-sm will-change-[transform,opacity] sm:h-12 sm:w-24 sm:shrink md:h-14 md:w-28"
              >
                <span className="font-display text-[9px] font-semibold tracking-[0.16em] text-white/70 sm:text-[10px] md:text-xs">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={newsTitleRef}
          id="novosti"
          aria-label="Новости"
          className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_AFTER_BRAND} z-30 px-3 text-center opacity-0 will-change-[transform,opacity] sm:px-6`}
        >
          <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO}`}>
            НОВОСТИ
          </h2>
          <div className="pointer-events-auto mx-auto mt-3 grid max-w-2xl grid-cols-1 gap-3 px-1 sm:mt-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
            {[0, 1].map((index) => (
              <NewsPreviewCard key={index} />
            ))}
          </div>
          <DetailLinkButton to="/news" label="Читать ещё" containerClassName="mt-4 sm:mt-6 md:mt-7" />
        </div>
      </>
    );
  }
);
