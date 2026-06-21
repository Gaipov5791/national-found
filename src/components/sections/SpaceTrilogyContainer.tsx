import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { SCENE_IMAGES } from "./sceneImages";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type SpaceTrilogySceneRefs = {
  midnightBgRef: RefObject<HTMLDivElement | null>;
  twilightBlueRef: RefObject<HTMLDivElement | null>;
  twilightRoseRef: RefObject<HTMLDivElement | null>;
  msbHazeRef: RefObject<HTMLDivElement | null>;
  spaceZoomBaseRef: RefObject<HTMLDivElement | null>;
  cyberOverlayRef: RefObject<HTMLDivElement | null>;
  handshakeRimRef: RefObject<HTMLDivElement | null>;
  partnerFlareRef: RefObject<HTMLDivElement | null>;
  partnersTextRef: RefObject<HTMLDivElement | null>;
  partnerLogosRef: RefObject<HTMLDivElement | null>;
  newsTitleRef: RefObject<HTMLDivElement | null>;
  newsContentRef: RefObject<HTMLDivElement | null>;
  contactsTitleRef: RefObject<HTMLDivElement | null>;
  contactsContentRef: RefObject<HTMLDivElement | null>;
};

export function prepareSpaceTrilogyScene(refs: SpaceTrilogySceneRefs, ctx: SceneAnimationContext) {
  const { mobile, text, sz } = ctx;

  gsap.set(refs.partnersTextRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
  gsap.set(refs.midnightBgRef.current, { opacity: 0 });
  gsap.set(refs.newsTitleRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
  gsap.set(refs.contactsTitleRef.current, { opacity: 0, yPercent: text.idle.yPercent, scale: 1, xPercent: 0, x: 0 });
  gsap.set([refs.newsContentRef.current, refs.contactsContentRef.current], { opacity: 0, visibility: "hidden" });
  gsap.set(refs.spaceZoomBaseRef.current, { opacity: 0, scale: 1, visibility: "visible" });
  gsap.set(refs.cyberOverlayRef.current, { opacity: 0 });
  gsap.set(refs.partnerFlareRef.current, { opacity: 0, xPercent: -40 });
  gsap.set(refs.handshakeRimRef.current, { opacity: 0 });

  if (mobile && refs.spaceZoomBaseRef.current) {
    gsap.set(refs.spaceZoomBaseRef.current, {
      force3D: true,
      visibility: "visible",
      backfaceVisibility: "hidden",
    });
  }

  const partnerLogoEls = refs.partnerLogosRef.current?.querySelectorAll("[data-partner-logo]");
  if (partnerLogoEls?.length) {
    gsap.set(partnerLogoEls, { opacity: 0, scale: 0.88 });
  }
}

export function animateSpaceTrilogyScene(tl: SceneTimeline, refs: SpaceTrilogySceneRefs, ctx: SceneAnimationContext) {
  const { cinematic, timings, text, sz } = ctx;
  const {
    enterDur,
    exitDur,
    holdDur,
    lightCrossfadeDur,
    flareDur,
    midnightBgSwapT,
    partnersEnterT,
    partnerLogoExitT,
    partnersTextExitT,
    newsEnterT,
    newsExitT,
    contactsEnterT,
    contactsExitT,
  } = timings;

  const partnerLogoEls = refs.partnerLogosRef.current?.querySelectorAll("[data-partner-logo]");

  tl.to(refs.midnightBgRef.current, { opacity: 1, duration: lightCrossfadeDur, ease: "power1.inOut" }, midnightBgSwapT);
  tl.to(refs.twilightBlueRef.current, { opacity: 0, duration: lightCrossfadeDur, ease: "power1.inOut" }, midnightBgSwapT);
  tl.to(refs.twilightRoseRef.current, { opacity: 0, duration: lightCrossfadeDur, ease: "power1.inOut" }, midnightBgSwapT);
  tl.to(refs.msbHazeRef.current, { opacity: 0, duration: lightCrossfadeDur * 0.8, ease: "power1.inOut" }, midnightBgSwapT);

  tl.fromTo(
    refs.spaceZoomBaseRef.current,
    { opacity: 0, scale: sz(1.0) },
    { opacity: 1, scale: sz(1.0), duration: lightCrossfadeDur + 0.014, ease: "power2.out" },
    midnightBgSwapT
  );

  tl.fromTo(
    refs.partnerFlareRef.current,
    { opacity: 0, xPercent: -40 },
    { opacity: 1, xPercent: 28, duration: flareDur, ease: "power2.inOut" },
    partnersEnterT - 0.008
  );
  tl.fromTo(
    refs.handshakeRimRef.current,
    { opacity: 0 },
    { opacity: 0.85, duration: flareDur * 0.55, ease: "power2.out" },
    partnersEnterT - 0.004
  );
  tl.to(
    refs.partnerFlareRef.current,
    { opacity: 0, xPercent: 92, duration: flareDur * 0.85, ease: "power2.inOut" },
    partnersEnterT + enterDur * 0.25
  );
  tl.to(
    refs.handshakeRimRef.current,
    { opacity: 0.35, duration: flareDur * 0.6, ease: "power1.inOut" },
    partnersEnterT + enterDur * 0.35
  );

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

  const spaceZoomNewsDur = newsExitT + exitDur - newsEnterT;
  const spaceZoomContactsDur = contactsExitT + exitDur - contactsEnterT;
  const spaceZoomPartnersDur = newsEnterT - partnersEnterT;

  if (cinematic && spaceZoomPartnersDur > 0) {
    tl.fromTo(
      refs.spaceZoomBaseRef.current,
      { scale: sz(1.0) },
      { scale: sz(1.08), duration: spaceZoomPartnersDur, ease: "none" },
      partnersEnterT
    );
  }

  if (cinematic) {
    tl.fromTo(
      refs.spaceZoomBaseRef.current,
      { scale: sz(1.08) },
      { scale: sz(1.25), duration: spaceZoomNewsDur, ease: "none" },
      newsEnterT
    );
    tl.fromTo(
      refs.cyberOverlayRef.current,
      { opacity: 0 },
      { opacity: 0.7, duration: enterDur + holdDur, ease: "power2.out" },
      newsEnterT
    );
  }

  tl.fromTo(refs.newsTitleRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, newsEnterT);
  tl.to(refs.newsTitleRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, newsExitT);

  if (cinematic) {
    tl.to(
      refs.spaceZoomBaseRef.current,
      { scale: sz(1.55), duration: spaceZoomContactsDur, ease: "none" },
      contactsEnterT
    );
    tl.to(
      refs.cyberOverlayRef.current,
      { opacity: 1, duration: enterDur + holdDur * 0.45, ease: "power2.out" },
      contactsEnterT
    );
    tl.to(
      refs.cyberOverlayRef.current,
      { opacity: 0.88, duration: holdDur * 0.28, ease: "sine.inOut" },
      contactsEnterT + enterDur + holdDur * 0.45
    );
    tl.to(
      refs.cyberOverlayRef.current,
      { opacity: 1, duration: holdDur * 0.27, ease: "sine.inOut" },
      contactsEnterT + enterDur + holdDur * 0.73
    );
  }

  tl.fromTo(refs.contactsTitleRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, contactsEnterT);
  tl.to(refs.contactsTitleRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, contactsExitT);
}

export type SpaceTrilogyContainerProps = {
  midnightBgRef: RefObject<HTMLDivElement | null>;
  spaceZoomBaseRef: RefObject<HTMLDivElement | null>;
  cyberOverlayRef: RefObject<HTMLDivElement | null>;
  handshakeRimRef: RefObject<HTMLDivElement | null>;
  partnerFlareRef: RefObject<HTMLDivElement | null>;
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
      midnightBgRef,
      spaceZoomBaseRef,
      cyberOverlayRef,
      handshakeRimRef,
      partnerFlareRef,
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
          ref={midnightBgRef}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 will-change-[transform,opacity]"
          style={{
            transformOrigin: "50% 50%",
            background:
              "linear-gradient(180deg, #06080c 0%, #0c1018 30%, #121820 55%, #181e28 78%, #1e2430 100%)",
          }}
        />

        <div
          ref={spaceZoomBaseRef}
          className="scene-gpu-layer pointer-events-none absolute inset-0 z-[5] opacity-0 will-change-[transform,opacity]"
          style={{ transformOrigin: "50% 50%" }}
        >
          <img
            src={SCENE_IMAGES.space}
            alt="Кыргызстан из космоса"
            className="absolute inset-0 h-full w-full object-cover will-change-[opacity,transform]"
            style={{ transformOrigin: "50% 50%" }}
          />
        </div>
        <div
          ref={cyberOverlayRef}
          className="pointer-events-none absolute inset-0 z-[6] opacity-0 will-change-[transform,opacity] md:[mix-blend-mode:screen]"
        >
          <img
            src={SCENE_IMAGES.cyber}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover will-change-[transform,opacity]"
          />
        </div>

        <div
          ref={handshakeRimRef}
          className="pointer-events-none absolute inset-0 z-[7] opacity-0 will-change-[transform,opacity]"
          style={{
            background:
              "radial-gradient(ellipse 45% 28% at 50% 56%, rgba(255,220,160,0.55) 0%, rgba(255,180,100,0.22) 35%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />

        <div
          ref={partnerFlareRef}
          className="pointer-events-none absolute inset-0 z-[15] opacity-0 will-change-[transform,opacity]"
          style={{ transformOrigin: "50% 58%", mixBlendMode: "screen" }}
        >
          <div
            className="absolute left-1/2 top-[54%] h-[38vh] w-[70vw] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(ellipse 55% 35% at 50% 50%, rgba(255,210,140,0.55) 0%, rgba(255,170,80,0.22) 40%, transparent 75%)",
              filter: "blur(28px)",
            }}
          />
          <div
            className="absolute left-1/2 top-[54%] h-[3px] w-[62vw] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,200,120,0) 8%, rgba(255,230,180,0.95) 46%, rgba(255,245,210,1) 50%, rgba(255,230,180,0.95) 54%, rgba(255,200,120,0) 92%, transparent 100%)",
              filter: "blur(2px)",
              boxShadow: "0 0 40px 8px rgba(255,190,100,0.35)",
            }}
          />
          <div
            className="absolute left-1/2 top-[54%] h-[22vh] w-[22vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,240,200,0.75) 0%, rgba(255,200,120,0.35) 30%, rgba(255,160,60,0.08) 55%, transparent 75%)",
              filter: "blur(18px)",
            }}
          />
        </div>

        <div
          ref={partnersRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6 text-center"
        >
          <div ref={partnersTextRef} className="opacity-0 will-change-[transform,opacity]">
            <h2 className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-[0_8px_40px_rgba(120,140,200,0.35)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.18em] lg:text-7xl">
              ПАРТНЁРЫ
            </h2>
            <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-white/75 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
              Как огни города в полночь — партнёры фонда зажигают новые точки роста по всей республике.
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
          <h2 className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-[0_8px_40px_rgba(120,140,200,0.35)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.18em] lg:text-7xl">
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
          <h2 className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-[0_8px_40px_rgba(120,140,200,0.35)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.18em] lg:text-7xl">
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
