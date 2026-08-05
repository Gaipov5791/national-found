import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { animateAboutScene, prepareAboutScene } from "@/components/sections/AboutSection";
import { animateCountersScene, createCountUpdater, prepareCountersScene } from "@/components/sections/CountersSection";
import { animateDecreeScene, prepareDecreeScene } from "@/components/sections/DecreeSection";
import { animateDirectionsScene, prepareDirectionsScene } from "@/components/sections/DirectionsSection";
import { animateFinanceScene, prepareFinanceScene } from "@/components/sections/FinanceSection";
import { animateFooterScene, prepareFooterScene } from "@/components/sections/FooterSection";
import { animateHeroScene, prepareHeroScene } from "@/components/sections/HeroSection";
import { animateMsbScene, prepareMsbScene } from "@/components/sections/MsbSection";
import {
  animatePanoramaScrollScene,
  preparePanoramaScrollScene,
} from "@/components/sections/PanoramaScrollSection";
import { animateSpaceTrilogyScene, prepareSpaceTrilogyScene } from "@/components/sections/SpaceTrilogyContainer";
import {
  buildSceneContext,
  mapCounterProgress,
  type ExperienceConfig,
} from "@/components/sections/sceneAnimationShared";
import { refreshCursorTheme } from "@/lib/cursorTheme";
import { clearScrollerProxy } from "@/lib/gsap-client";
import type { SceneRefs } from "./useSceneRefs";

export function runScrollytellingExperience(refs: SceneRefs, cfg: ExperienceConfig) {
  const { scrollDistance, scrub, mobile } = cfg;
  const staticViewportHeight = cfg.staticViewportHeight ?? window.innerHeight;
  if (cfg.staticViewportHeight) {
    refs.staticViewportHeightRef.current = cfg.staticViewportHeight;
  }
  const ctx = buildSceneContext(cfg);
  const { timings } = ctx;
  const {
    enterDur,
    statsEnterT,
    aboutEnterT,
    financeEnterT,
    directionsEnterT,
    msbEnterT,
    partnersEnterT,
    newsEnterT,
    footerEnterT,
    totalDuration,
  } = timings;

  if (refs.scrollTrackRef.current) {
    refs.scrollTrackRef.current.style.height = `${scrollDistance}px`;
  }

  const useNativeScroll = mobile;
  let lenis: Lenis | null = null;
  let rafId = 0;
  let cancelled = false;

  clearScrollerProxy();

  if (!useNativeScroll) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 1.1,
      lerp: 0.12,
    });
    refs.lenisRef.current = lenis;
    const raf = (time: number) => {
      if (cancelled) return;
      lenis!.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
  } else {
    refs.lenisRef.current = null;
    ScrollTrigger.scrollerProxy(document.documentElement, {
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: staticViewportHeight };
      },
    });
  }

  const heroRefs = { brandRef: refs.brandRef };
  const countersRefs = {
    statsRef: refs.statsRef,
    countProjectsRef: refs.countProjectsRef,
  };
  const decreeRefs = { decreeRef: refs.decreeRef };
  const aboutRefs = { aboutRef: refs.aboutRef };
  const financeRefs = { financeRef: refs.financeRef };
  const directionsRefs = { directionsRef: refs.directionsRef };
  const msbRefs = { msbRef: refs.msbRef };
  const spaceRefs = {
    partnersTextRef: refs.partnersTextRef,
    newsTitleRef: refs.newsTitleRef,
  };
  const panoramaRefs = {
    panoramaBgRef: refs.panoramaBgRef,
    panoramaImgRef: refs.panoramaImgRef,
    permanentCloudRef: refs.permanentCloudRef,
  };
  const footerRefs = {
    footerContentZoneRef: refs.footerContentZoneRef,
    brandRef: refs.brandRef,
  };

  preparePanoramaScrollScene(panoramaRefs, ctx);
  prepareHeroScene(heroRefs, ctx);
  prepareCountersScene(countersRefs, ctx);
  prepareDecreeScene(decreeRefs, ctx);
  prepareAboutScene(aboutRefs, ctx);
  prepareFinanceScene(financeRefs, ctx);
  prepareDirectionsScene(directionsRefs, ctx);
  prepareMsbScene(msbRefs, ctx);
  prepareSpaceTrilogyScene(spaceRefs, ctx);
  prepareFooterScene(footerRefs, ctx);

  const updateCounts = createCountUpdater(countersRefs, ctx);

  const triggerEl = refs.scrollTrackRef.current;
  const masterEnd =
    mobile && triggerEl
      ? triggerEl.getBoundingClientRect().top + window.scrollY + scrollDistance
      : `+=${scrollDistance}`;

  const onResize = () => {
    if (!mobile || !cfg.staticViewportHeight) return;
    const nextHeight = window.innerHeight;
    if (refs.staticViewportHeightRef.current !== nextHeight) {
      refs.staticViewportHeightRef.current = nextHeight;
      ScrollTrigger.refresh();
    }
  };

  if (mobile) {
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "master-scrolly",
      trigger: triggerEl,
      start: "top top",
      end: masterEnd,
      scrub,
      pin: refs.sceneRef.current,
      // Fixed pinning plays nicer with Lenis + overflow-x clipping on the root wrapper.
      pinType: "fixed",
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const timelineTime = self.progress * tl.duration();
        updateCounts(timelineTime);
        const counterP = mapCounterProgress(timelineTime, timings);
        refs.counterProgressRef.current = counterP;
        cfg.onCounterProgress?.(counterP);
        if (!mobile) refreshCursorTheme();
      },
    },
  });

  refs.masterTimelineRef.current = tl;

  tl.addLabel("sc_hero", 0);
  tl.addLabel("sc_counters", statsEnterT);
  tl.addLabel("sc_about", aboutEnterT + enterDur);
  tl.addLabel("sc_finance", financeEnterT + enterDur);
  tl.addLabel("sc_directions", directionsEnterT + enterDur);
  tl.addLabel("sc_msb", msbEnterT + enterDur);
  tl.addLabel("sc_partners", partnersEnterT + enterDur);
  tl.addLabel("sc_news", newsEnterT + enterDur);
  tl.addLabel("sc_footer", footerEnterT + enterDur);

  animatePanoramaScrollScene(tl, panoramaRefs, ctx);
  animateHeroScene(tl, heroRefs, ctx);

  if (refs.scrollHintRef.current) {
    gsap.set(refs.scrollHintRef.current, { autoAlpha: 1 });
    tl.fromTo(
      refs.scrollHintRef.current,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.018, ease: "none", pointerEvents: "none" },
      Math.max(0, statsEnterT - 0.02)
    );
  }
  animateCountersScene(tl, countersRefs, ctx);
  animateDecreeScene(tl, decreeRefs, ctx);
  animateAboutScene(tl, aboutRefs, ctx);
  animateFinanceScene(tl, financeRefs, ctx);
  animateDirectionsScene(tl, directionsRefs, ctx);
  animateMsbScene(tl, msbRefs, ctx);
  animateSpaceTrilogyScene(tl, spaceRefs, ctx);
  animateFooterScene(tl, footerRefs, ctx);

  // Anchor timeline length so ScrollTrigger progress maps to scene markers.
  if (refs.sceneRef.current) {
    tl.set(refs.sceneRef.current, {}, totalDuration);
  }

  return () => {
    cancelled = true;
    if (mobile) {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    }

    // Kill pin / scrub first so body overflow and wheel handlers are restored
    // before Lenis is destroyed (otherwise wheel can stay swallowed).
    const master = ScrollTrigger.getById("master-scrolly");
    master?.kill();
    tl.kill();
    refs.masterTimelineRef.current = null;

    try {
      ScrollTrigger.normalizeScroll(false);
    } catch {
      /* ignore */
    }
    clearScrollerProxy();

    if (lenis) {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    }
    refs.lenisRef.current = null;

    const html = document.documentElement;
    const body = document.body;
    for (const className of Array.from(html.classList)) {
      if (className === "lenis" || className.startsWith("lenis-")) {
        html.classList.remove(className);
      }
    }
    html.style.removeProperty("overflow");
    html.style.removeProperty("height");
    html.style.removeProperty("touch-action");
    body.style.removeProperty("overflow");
    body.style.removeProperty("height");
    body.style.removeProperty("touch-action");
  };
}
