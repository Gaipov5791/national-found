import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type SpaceTrilogySceneRefs = {
  partnersTextRef: RefObject<HTMLDivElement | null>;
  partnerLogosRef: RefObject<HTMLDivElement | null>;
  newsTitleRef: RefObject<HTMLDivElement | null>;
  newsContentRef: RefObject<HTMLDivElement | null>;
  contactsTitleRef: RefObject<HTMLDivElement | null>;
  contactsContentRef: RefObject<HTMLDivElement | null>;
};

export function prepareSpaceTrilogyScene(refs: SpaceTrilogySceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;

  gsap.set(refs.partnersTextRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
  gsap.set(refs.newsTitleRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
  gsap.set(refs.contactsTitleRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
  gsap.set([refs.newsContentRef.current, refs.contactsContentRef.current], { opacity: 0, visibility: "hidden" });

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
    contactsEnterT,
    contactsExitT,
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

  tl.fromTo(refs.contactsTitleRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, contactsEnterT);
  tl.to(refs.contactsTitleRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, contactsExitT);
}

export type SpaceTrilogyContainerProps = {
  partnersRef: RefObject<HTMLDivElement | null>;
  partnersTextRef: RefObject<HTMLDivElement | null>;
  partnerLogosRef: RefObject<HTMLDivElement | null>;
  newsTitleRef: RefObject<HTMLDivElement | null>;
  newsContentRef: RefObject<HTMLDivElement | null>;
  contactsTitleRef: RefObject<HTMLDivElement | null>;
  contactsContentRef: RefObject<HTMLDivElement | null>;
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
      contactsTitleRef,
      contactsContentRef,
    },
    _ref
  ) {
    return (
      <>
        <div
          ref={partnersRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6 text-center"
        >
          <div ref={partnersTextRef} className="opacity-0 will-change-[transform,opacity]">
            <h2 className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.18em] lg:text-7xl">
              ПАРТНЁРЫ
            </h2>
            <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
              Поля и теплицы — партнёры фонда зажигают новые точки роста по всей республике.
            </p>
          </div>
          <div ref={partnerLogosRef} className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-6 md:gap-10">
            {PARTNER_NAMES.map((name) => (
              <div
                key={name}
                data-partner-logo
                className="flex h-12 w-24 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] px-3 backdrop-blur-sm will-change-[transform,opacity] md:h-14 md:w-28"
              >
                <span className="font-display text-[10px] font-semibold tracking-[0.18em] text-white/70 md:text-xs">
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
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
        >
          <h2 className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.18em] lg:text-7xl">
            НОВОСТИ
          </h2>
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

        <div
          ref={contactsTitleRef}
          id="kontakty"
          aria-label="Контакты"
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
        >
          <h2 className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.18em] lg:text-7xl">
            КОНТАКТЫ
          </h2>
        </div>
        <div
          ref={contactsContentRef}
          data-lovable-slot="contacts-content"
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[58%] z-30 mx-auto max-w-3xl px-6 font-display opacity-0 invisible"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="h-40 rounded-2xl border border-transparent" />
            ))}
          </div>
        </div>
      </>
    );
  }
);
