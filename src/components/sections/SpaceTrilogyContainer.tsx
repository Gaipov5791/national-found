import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { DetailLinkButton } from "./DetailLinkButton";
import { SECTION_HEADING, SECTION_SUBTEXT, SECTION_TOP_DEFAULT } from "./sectionLayout";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type SpaceTrilogySceneRefs = {
  partnersTextRef: RefObject<HTMLDivElement | null>;
  partnerLogosRef: RefObject<HTMLDivElement | null>;
  newsTitleRef: RefObject<HTMLDivElement | null>;
  newsContentRef: RefObject<HTMLDivElement | null>;
};

export function prepareSpaceTrilogyScene(refs: SpaceTrilogySceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;

  gsap.set(refs.partnersTextRef.current, { ...text.idle, xPercent: 0, x: 0 });
  gsap.set(refs.newsTitleRef.current, { ...text.idle, xPercent: 0, x: 0 });
  gsap.set(refs.newsContentRef.current, { autoAlpha: 0 });

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
  newsContentRef: RefObject<HTMLDivElement | null>;
};

const PARTNER_NAMES = ["EBRD", "IFC", "ADB", "AIIB", "KfW"] as const;

export const SpaceTrilogyContainer = forwardRef<HTMLDivElement, SpaceTrilogyContainerProps>(
  function SpaceTrilogyContainer(
    {
      partnersRef,
      partnersTextRef,
      partnerLogosRef,
      newsTitleRef,
      newsContentRef,
    },
    _ref
  ) {
    return (
      <>
        <div
          ref={partnersRef}
          className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_DEFAULT} z-30 px-3 text-center sm:px-6`}
        >
          <div ref={partnersTextRef} className="opacity-0 will-change-[transform,opacity]">
            <h2
              className={`${SECTION_HEADING} text-xl text-white sm:text-4xl md:text-6xl md:tracking-[0.18em] lg:text-7xl`}
            >
              ПАРТНЁРЫ
            </h2>
            <p className={`${SECTION_SUBTEXT} mt-3 text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] sm:mt-5`}>
              Национальный инвестиционный фонд развивает партнёрства с ведущими международными финансовыми
              институтами и организациями для реализации стратегических проектов в Кыргызстане.
            </p>
            <DetailLinkButton to="/partners" />
          </div>
          <div
            ref={partnerLogosRef}
            className="mx-auto mt-5 flex max-w-3xl snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-8 sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:snap-none md:gap-10 [&::-webkit-scrollbar]:hidden"
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
          className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_DEFAULT} z-30 px-3 text-center opacity-0 will-change-[transform,opacity] sm:px-6`}
        >
          <h2
            className={`${SECTION_HEADING} text-xl text-white sm:text-4xl md:text-6xl md:tracking-[0.18em] lg:text-7xl`}
          >
            НОВОСТИ
          </h2>
          <DetailLinkButton to="/news" />
        </div>
        <div
          ref={newsContentRef}
          data-lovable-slot="news-content"
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[58%] z-30 mx-auto max-w-5xl px-6 font-display opacity-0 invisible"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-48 rounded-2xl border border-transparent" />
            ))}
          </div>
        </div>
      </>
    );
  }
);
