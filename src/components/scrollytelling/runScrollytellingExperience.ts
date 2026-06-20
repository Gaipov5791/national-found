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
import { animateSpaceTrilogyScene, prepareSpaceTrilogyScene } from "@/components/sections/SpaceTrilogyContainer";
import { buildSceneContext, CURSOR_BORDER_DARK, type ExperienceConfig } from "@/components/sections/sceneAnimationShared";
import type { SceneRefs } from "./useSceneRefs";

export function runScrollytellingExperience(refs: SceneRefs, cfg: ExperienceConfig) {
  const { scrollDistance, scrub, mobile } = cfg;
  const ctx = buildSceneContext(cfg);
  const { timings } = ctx;
  const {
    enterDur,
    aboutEnterT,
    financeEnterT,
    directionsEnterT,
    msbEnterT,
    partnersEnterT,
    newsEnterT,
    contactsEnterT,
  } = timings;

  if (refs.scrollTrackRef.current) {
    refs.scrollTrackRef.current.style.height = `${scrollDistance}px`;
  }

  const useNativeScroll = mobile;
  let lenis: Lenis | null = null;
  let rafId = 0;
  let cancelled = false;

  if (!useNativeScroll) {
    lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 1,
      lerp: 0.1,
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
  }

  const heroRefs = { heroBgRef: refs.heroBgRef, cloudDriftRef: refs.cloudDriftRef, brandRef: refs.brandRef };
  const countersRefs = { statsRef: refs.statsRef, count200Ref: refs.count200Ref, count8000Ref: refs.count8000Ref };
  const decreeRefs = {
    decreeRef: refs.decreeRef,
    ambientFogRef: refs.ambientFogRef,
    wipe1HazeRef: refs.wipe1HazeRef,
    wipe1BackRef: refs.wipe1BackRef,
    wipe1MidRef: refs.wipe1MidRef,
    wipe1FrontRef: refs.wipe1FrontRef,
  };
  const aboutRefs = { aboutRef: refs.aboutRef };
  const financeRefs = {
    heroBgRef: refs.heroBgRef,
    financeBgRef: refs.financeBgRef,
    noonTintRef: refs.noonTintRef,
    financeRef: refs.financeRef,
    wipe2HazeRef: refs.wipe2HazeRef,
    wipe2BackRef: refs.wipe2BackRef,
    wipe2MidRef: refs.wipe2MidRef,
    wipe2FrontRef: refs.wipe2FrontRef,
  };
  const directionsRefs = {
    financeBgRef: refs.financeBgRef,
    directionsCollageRef: refs.directionsCollageRef,
    amberBurnRef: refs.amberBurnRef,
    amberGlowRef: refs.amberGlowRef,
    noonTintRef: refs.noonTintRef,
    sunsetAtmoBackRef: refs.sunsetAtmoBackRef,
    sunsetAtmoMidRef: refs.sunsetAtmoMidRef,
    sunsetAtmoFrontRef: refs.sunsetAtmoFrontRef,
    directionsRef: refs.directionsRef,
  };
  const msbRefs = {
    directionsCollageRef: refs.directionsCollageRef,
    msbCollageRef: refs.msbCollageRef,
    amberBurnRef: refs.amberBurnRef,
    amberGlowRef: refs.amberGlowRef,
    twilightBlueRef: refs.twilightBlueRef,
    twilightRoseRef: refs.twilightRoseRef,
    msbHazeRef: refs.msbHazeRef,
    twilightAtmoBackRef: refs.twilightAtmoBackRef,
    twilightAtmoMidRef: refs.twilightAtmoMidRef,
    twilightAtmoFrontRef: refs.twilightAtmoFrontRef,
    msbRef: refs.msbRef,
  };
  const spaceRefs = {
    twilightBlueRef: refs.twilightBlueRef,
    twilightRoseRef: refs.twilightRoseRef,
    msbHazeRef: refs.msbHazeRef,
    spaceZoomBaseRef: refs.spaceZoomBaseRef,
    cyberOverlayRef: refs.cyberOverlayRef,
    handshakeRimRef: refs.handshakeRimRef,
    partnerFlareRef: refs.partnerFlareRef,
    partnersTextRef: refs.partnersTextRef,
    partnerLogosRef: refs.partnerLogosRef,
    newsTitleRef: refs.newsTitleRef,
    newsContentRef: refs.newsContentRef,
    contactsTitleRef: refs.contactsTitleRef,
    contactsContentRef: refs.contactsContentRef,
  };
  const footerRefs = { footerContentZoneRef: refs.footerContentZoneRef, footerBgRef: refs.footerBgRef };

  prepareHeroScene(heroRefs, ctx);
  prepareCountersScene(countersRefs, ctx);
  prepareDecreeScene(decreeRefs, ctx);
  prepareAboutScene(aboutRefs, ctx);
  prepareFinanceScene(financeRefs, ctx);
  prepareDirectionsScene(directionsRefs, ctx);
  prepareMsbScene(msbRefs, ctx);
  prepareSpaceTrilogyScene(spaceRefs, ctx);
  prepareFooterScene(footerRefs, ctx);

  const cursorRing = document.getElementById("custom-cursor-ring");
  const cursorDot = document.getElementById("custom-cursor-dot");
  if (cursorRing) {
    gsap.set(cursorRing, { borderColor: CURSOR_BORDER_DARK });
    cursorRing.setAttribute("data-cursor-theme", "dark");
  }
  if (cursorDot) {
    gsap.set(cursorDot, { backgroundColor: CURSOR_BORDER_DARK });
  }

  gsap.set([refs.sunsetBgRef.current, refs.twilightBgRef.current, refs.midnightBgRef.current], { opacity: 0 });

  const updateCounts = createCountUpdater(countersRefs, ctx);

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "master-scrolly",
      trigger: refs.scrollTrackRef.current,
      start: "top top",
      end: `+=${scrollDistance}`,
      scrub,
      pin: refs.sceneRef.current,
      anticipatePin: mobile ? 0 : 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateCounts(self.progress),
    },
  });

  refs.masterTimelineRef.current = tl;

  tl.addLabel("sc_hero", 0);
  tl.addLabel("sc_about", aboutEnterT + enterDur);
  tl.addLabel("sc_finance", financeEnterT + enterDur);
  tl.addLabel("sc_directions", directionsEnterT + enterDur);
  tl.addLabel("sc_msb", msbEnterT + enterDur);
  tl.addLabel("sc_partners", partnersEnterT + enterDur);
  tl.addLabel("sc_news", newsEnterT + enterDur);
  tl.addLabel("sc_contacts", contactsEnterT + enterDur);

  animateHeroScene(tl, heroRefs, ctx);
  animateCountersScene(tl, countersRefs, ctx);
  animateDecreeScene(tl, decreeRefs, ctx);
  animateAboutScene(tl, aboutRefs, ctx);
  animateFinanceScene(tl, financeRefs, ctx);
  animateDirectionsScene(tl, directionsRefs, ctx);
  animateMsbScene(tl, msbRefs, ctx);
  animateSpaceTrilogyScene(tl, spaceRefs, ctx);
  animateFooterScene(tl, footerRefs, ctx);

  return () => {
    cancelled = true;
    if (lenis) {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    }
    refs.masterTimelineRef.current = null;
    refs.lenisRef.current = null;
    if (cursorRing) {
      gsap.set(cursorRing, { borderColor: CURSOR_BORDER_DARK });
      cursorRing.setAttribute("data-cursor-theme", "dark");
    }
    if (cursorDot) {
      gsap.set(cursorDot, { backgroundColor: CURSOR_BORDER_DARK });
    }
  };
}
