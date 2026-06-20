import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";
import { Navbar } from "@/components/global/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { CountersSection } from "@/components/sections/CountersSection";
import { DecreeSection } from "@/components/sections/DecreeSection";
import { DirectionsSection } from "@/components/sections/DirectionsSection";
import { FinanceSection } from "@/components/sections/FinanceSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MsbSection } from "@/components/sections/MsbSection";
import { SpaceTrilogyContainer } from "@/components/sections/SpaceTrilogyContainer";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

const SCROLL_DISTANCE_DESKTOP = 14500;
const SCROLL_DISTANCE_TABLET = 11500;
const SCROLL_DISTANCE_MOBILE = 9000;

const NAV_ITEMS = [
  "ГЛАВНАЯ",
  "О ФОНДЕ",
  "ФИНАНСИРОВАНИЕ ПРОЕКТОВ",
  "ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ",
  "ПРОЕКТЫ МСБ",
  "ПАРТНЁРЫ",
  "НОВОСТИ",
  "КОНТАКТЫ",
];

const LANGS = ["RU", "KG", "EN"];

const CURSOR_BORDER_DARK = "#262626";
const CURSOR_BORDER_LIGHT = "#ffffff";

function formatCount(value: number, progress: number, suffix = "") {
  const eased = 1 - Math.pow(1 - Math.max(0, Math.min(1, progress)), 3);
  const val = Math.round(eased * value);
  return `${val.toLocaleString("ru-RU").replace(",", " ")}${suffix}`;
}

type NavItem = (typeof NAV_ITEMS)[number];

function computeTimelineMarkers() {
  const enterDur = 0.028;
  const exitDur = 0.028;
  const holdDur = 0.014;
  const textOverlap = 0.016;
  const atmoWipeDur = 0.032;

  const breatheAfter = (exitStart: number) => exitStart + exitDur - textOverlap;
  const gapAfterExit = (exitStart: number, gap: number) => exitStart + exitDur + gap;

  const statsEnterT = 0.06;
  const statsExitT = statsEnterT + enterDur + holdDur;

  const decreeCloudsT = breatheAfter(statsExitT);
  const decreeEnterT = decreeCloudsT + 0.052;
  const decreeExitT = decreeEnterT + enterDur + holdDur;

  const aboutEnterT = gapAfterExit(decreeExitT, 0.012);
  const aboutExitT = aboutEnterT + enterDur + holdDur;

  const financeCloudsT = breatheAfter(aboutExitT);
  const financeBgSwapT = financeCloudsT + 0.008;
  const financeRevealT = financeCloudsT + 0.026;
  const financeEnterT = financeRevealT;
  const financeExitT = financeEnterT + enterDur + holdDur;

  const sunsetAtmoT = breatheAfter(financeExitT);
  const sunsetBgSwapT = sunsetAtmoT + 0.010;
  const sunsetRevealT = sunsetAtmoT + atmoWipeDur;
  const directionsEnterT = sunsetRevealT;
  const directionsExitT = directionsEnterT + enterDur + holdDur;

  const twilightAtmoT = breatheAfter(directionsExitT);
  const twilightBgSwapT = twilightAtmoT + 0.010;
  const twilightRevealT = twilightAtmoT + atmoWipeDur;
  const msbEnterT = twilightRevealT;
  const msbExitT = msbEnterT + enterDur + holdDur;

  const midnightAtmoT = breatheAfter(msbExitT);
  const midnightBgSwapT = midnightAtmoT + 0.010;
  const midnightRevealT = midnightAtmoT + atmoWipeDur * 0.85;
  const partnersEnterT = midnightRevealT;
  const partnersHoldT = partnersEnterT + enterDur + holdDur;
  const partnerLogoExitT = partnersHoldT + 0.008;
  const partnersTextExitT = gapAfterExit(partnerLogoExitT, 0.006);

  const newsEnterT = breatheAfter(partnersTextExitT);
  const newsExitT = newsEnterT + enterDur + holdDur;

  const contactsEnterT = breatheAfter(newsExitT);
  const contactsExitT = contactsEnterT + enterDur + holdDur;

  const footerEnterT = gapAfterExit(contactsExitT, 0.008);
  const footerHoldDur = 0.072;
  const totalDuration = footerEnterT + enterDur + footerHoldDur;

  return {
    enterDur,
    exitDur,
    holdDur,
    textOverlap,
    textEnterY: 30,
    textExitY: -45,
    textExitScale: 1.03,
    lightCrossfadeDur: 0.034,
    atmoWipeDur,
    collageParallaxDur: 0.048,
    convergeDur: 0.042,
    flareDur: 0.030,
    bgCrossfadeDur: 0.020,
    statsEnterT,
    statsExitT,
    decreeCloudsT,
    decreeEnterT,
    decreeExitT,
    aboutEnterT,
    aboutExitT,
    financeCloudsT,
    financeBgSwapT,
    financeRevealT,
    financeEnterT,
    financeExitT,
    sunsetAtmoT,
    sunsetBgSwapT,
    sunsetRevealT,
    directionsEnterT,
    directionsExitT,
    twilightAtmoT,
    twilightBgSwapT,
    twilightRevealT,
    msbEnterT,
    msbExitT,
    midnightAtmoT,
    midnightBgSwapT,
    midnightRevealT,
    partnersEnterT,
    partnersHoldT,
    partnerLogoExitT,
    partnersTextExitT,
    newsEnterT,
    newsExitT,
    contactsEnterT,
    contactsExitT,
    footerEnterT,
    footerHoldDur,
    totalDuration,
    breatheAfter,
    gapAfterExit,
  };
}

const NAV_SCENE_LABELS: Record<NavItem, string> = {
  ГЛАВНАЯ: "sc_hero",
  "О ФОНДЕ": "sc_about",
  "ФИНАНСИРОВАНИЕ ПРОЕКТОВ": "sc_finance",
  "ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ": "sc_directions",
  "ПРОЕКТЫ МСБ": "sc_msb",
  ПАРТНЁРЫ: "sc_partners",
  НОВОСТИ: "sc_news",
  КОНТАКТЫ: "sc_contacts",
};

const NAV_SCROLL_NAV_BUFFER = 8;
const NAV_SCROLL_EASE = gsap.parseEase("power3.inOut");

export function Scrollytelling() {
  const [lang, setLang] = useState("RU");

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decreeRef = useRef<HTMLDivElement>(null);
  const cloudDriftRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  // Cinematic background layers (z-0)
  const financeBgRef = useRef<HTMLImageElement>(null);
  const sunsetBgRef = useRef<HTMLDivElement>(null);
  const twilightBgRef = useRef<HTMLDivElement>(null);
  const midnightBgRef = useRef<HTMLDivElement>(null);

  // Lighting tint overlays (z-10) — dual-layer blend stacks per scene
  const noonTintRef = useRef<HTMLDivElement>(null);
  const amberBurnRef = useRef<HTMLDivElement>(null);
  const amberGlowRef = useRef<HTMLDivElement>(null);
  const twilightBlueRef = useRef<HTMLDivElement>(null);
  const twilightRoseRef = useRef<HTMLDivElement>(null);
  const msbHazeRef = useRef<HTMLDivElement>(null);
  const handshakeRimRef = useRef<HTMLDivElement>(null);

  // Atmosphere scene-cut wipes (z-20)
  const sunsetAtmoBackRef = useRef<HTMLDivElement>(null);
  const sunsetAtmoMidRef = useRef<HTMLDivElement>(null);
  const sunsetAtmoFrontRef = useRef<HTMLDivElement>(null);
  const twilightAtmoBackRef = useRef<HTMLDivElement>(null);
  const twilightAtmoMidRef = useRef<HTMLDivElement>(null);
  const twilightAtmoFrontRef = useRef<HTMLDivElement>(null);

  // Scene image & backdrop layers (z-[2] / z-[5])
  const directionsCollageRef = useRef<HTMLDivElement>(null);
  const msbCollageRef = useRef<HTMLDivElement>(null);
  const spaceZoomBaseRef = useRef<HTMLDivElement>(null);
  const cyberOverlayRef = useRef<HTMLDivElement>(null);
  const partnerFlareRef = useRef<HTMLDivElement>(null);
  const footerBgRef = useRef<HTMLImageElement>(null);

  // Text scene refs (z-30)
  const aboutRef = useRef<HTMLDivElement>(null);
  const financeRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<HTMLDivElement>(null);
  const msbRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const partnersTextRef = useRef<HTMLDivElement>(null);
  const partnerLogosRef = useRef<HTMLDivElement>(null);

  const wipe1BackRef = useRef<HTMLDivElement>(null);
  const wipe1MidRef = useRef<HTMLDivElement>(null);
  const wipe1FrontRef = useRef<HTMLDivElement>(null);
  const wipe1HazeRef = useRef<HTMLDivElement>(null);

  const wipe2BackRef = useRef<HTMLDivElement>(null);
  const wipe2MidRef = useRef<HTMLDivElement>(null);
  const wipe2FrontRef = useRef<HTMLDivElement>(null);
  const wipe2HazeRef = useRef<HTMLDivElement>(null);

  const ambientFogRef = useRef<HTMLDivElement>(null);

  const count200Ref = useRef<HTMLSpanElement>(null);
  const count8000Ref = useRef<HTMLSpanElement>(null);

  const newsTitleRef = useRef<HTMLDivElement>(null);
  const newsContentRef = useRef<HTMLDivElement>(null);
  const contactsTitleRef = useRef<HTMLDivElement>(null);
  const contactsContentRef = useRef<HTMLDivElement>(null);
  const footerContentZoneRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const navHeaderRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((label: NavItem) => {
    const mobile = window.innerWidth < 768;
    const duration = mobile ? 1.2 : 1.6;
    ScrollTrigger.update();

    const masterTimeline = masterTimelineRef.current;
    const scrollTrigger = masterTimeline?.scrollTrigger;
    const sceneLabel = NAV_SCENE_LABELS[label];
    const navbarHeight = (navHeaderRef.current?.offsetHeight ?? 90) + NAV_SCROLL_NAV_BUFFER;

    let target = 0;
    if (scrollTrigger?.labelToScroll) {
      const targetScrollPos = scrollTrigger.labelToScroll(sceneLabel);
      target = Math.max(
        scrollTrigger.start,
        Math.min(scrollTrigger.end, Math.round(targetScrollPos - navbarHeight))
      );
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration,
        easing: NAV_SCROLL_EASE,
      });
      return;
    }

    gsap.to(window, {
      scrollTo: target,
      duration: mobile ? 1.2 : duration,
      ease: mobile ? "power2.out" : "power3.inOut",
    });
  }, []);

  const handleNavClick = useCallback(
    (label: string) => {
      scrollToSection(label as NavItem);
    },
    [scrollToSection]
  );

  const scrollToTop = useCallback(() => {
    scrollToSection("ГЛАВНАЯ");
  }, [scrollToSection]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const runExperience = (cfg: {
        scrollDistance: number;
        scrub: number | boolean;
        mobile: boolean;
        cinematic: boolean;
      }) => {
        const { scrollDistance, scrub, mobile, cinematic } = cfg;

        if (scrollTrackRef.current) {
          scrollTrackRef.current.style.height = `${scrollDistance}px`;
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
          lenisRef.current = lenis;

          const raf = (time: number) => {
            if (cancelled) return;
            lenis!.raf(time);
            rafId = requestAnimationFrame(raf);
          };
          rafId = requestAnimationFrame(raf);
          lenis.on("scroll", ScrollTrigger.update);
        } else {
          lenisRef.current = null;
        }

      const {
        enterDur,
        exitDur,
        holdDur,
        textEnterY,
        textExitY,
        textExitScale,
        lightCrossfadeDur,
        atmoWipeDur,
        collageParallaxDur,
        convergeDur,
        flareDur,
        bgCrossfadeDur,
        statsEnterT,
        statsExitT,
        decreeCloudsT,
        decreeEnterT,
        decreeExitT,
        aboutEnterT,
        aboutExitT,
        financeCloudsT,
        financeBgSwapT,
        financeRevealT,
        financeEnterT,
        financeExitT,
        sunsetAtmoT,
        sunsetBgSwapT,
        sunsetRevealT,
        directionsEnterT,
        directionsExitT,
        twilightAtmoT,
        twilightBgSwapT,
        twilightRevealT,
        msbEnterT,
        msbExitT,
        midnightAtmoT,
        midnightBgSwapT,
        midnightRevealT,
        partnersEnterT,
        partnersHoldT,
        partnerLogoExitT,
        partnersTextExitT,
        newsEnterT,
        newsExitT,
        contactsEnterT,
        contactsExitT,
        footerEnterT,
        footerHoldDur,
      } = computeTimelineMarkers();

      const textEnterEase = "power2.out";
      const textExitEase = "power1.in";
      const textIdle = { opacity: 0, yPercent: textEnterY, scale: 1 };
      const textArrived = { opacity: 1, yPercent: 0, scale: 1 };
      const textEvaporated = { yPercent: textExitY, opacity: 0, scale: textExitScale };

      const updateCounts = (progress: number) => {
        const p = Math.max(0, Math.min(1, (progress - statsEnterT) / (statsExitT + exitDur - statsEnterT)));
        if (count200Ref.current) {
          count200Ref.current.textContent = formatCount(200, p, "+");
        }
        if (count8000Ref.current) {
          count8000Ref.current.textContent = formatCount(8000, p);
        }
      };
      const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
      const zK = vw < 640 ? 0.85 : vw < 1024 ? 1.0 : 1.15;
      const sz = (base: number) => +(1 + (base - 1) * zK).toFixed(3);

      const brandStartY =
        typeof window !== "undefined"
          ? window.innerHeight * (mobile ? 0.18 : 0.28)
          : mobile
            ? 140
            : 220;

      if (!mobile) {
        gsap.to(cloudDriftRef.current, {
          yPercent: -5,
          duration: 60,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        [
          wipe1BackRef, wipe1MidRef, wipe1FrontRef,
          wipe2BackRef, wipe2MidRef, wipe2FrontRef,
          ambientFogRef,
          sunsetAtmoBackRef, sunsetAtmoMidRef, sunsetAtmoFrontRef,
          twilightAtmoBackRef, twilightAtmoMidRef, twilightAtmoFrontRef,
        ].forEach((r, i) => {
          if (r.current) {
            gsap.to(r.current, {
              yPercent: i % 2 === 0 ? 4 : -4,
              duration: 14 + i,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        });
      }

      gsap.set(brandRef.current, {
        opacity: 0,
        y: brandStartY,
        scale: 0.97,
      });
      gsap.set(
        [
          statsRef.current,
          decreeRef.current,
          aboutRef.current,
          financeRef.current,
          directionsRef.current,
          msbRef.current,
          partnersTextRef.current,
          newsTitleRef.current,
          contactsTitleRef.current,
        ],
        { opacity: 0, yPercent: textEnterY, scale: 1, xPercent: 0, x: 0 }
      );
      gsap.set([newsContentRef.current, contactsContentRef.current], { opacity: 0, visibility: "hidden" });
      gsap.set(footerContentZoneRef.current, { opacity: 0 });

      const cursorRing = document.getElementById("custom-cursor-ring");
      const cursorDot = document.getElementById("custom-cursor-dot");
      if (cursorRing) {
        gsap.set(cursorRing, { borderColor: CURSOR_BORDER_DARK });
        cursorRing.setAttribute("data-cursor-theme", "dark");
      }
      if (cursorDot) {
        gsap.set(cursorDot, { backgroundColor: CURSOR_BORDER_DARK });
      }

      gsap.set(financeBgRef.current, { opacity: 0, yPercent: 0, scale: sz(1.0) });
      gsap.set([sunsetBgRef.current, twilightBgRef.current, midnightBgRef.current], { opacity: 0 });
      gsap.set(directionsCollageRef.current, { opacity: 0, scale: 1, visibility: "visible" });
      gsap.set(msbCollageRef.current, { opacity: 0, scale: 1, visibility: "visible" });
      gsap.set(spaceZoomBaseRef.current, { opacity: 0, scale: 1, visibility: "visible" });

      if (mobile) {
        [heroBgRef, financeBgRef, directionsCollageRef, msbCollageRef, spaceZoomBaseRef].forEach((layerRef) => {
          if (layerRef.current) {
            gsap.set(layerRef.current, {
              force3D: true,
              visibility: "visible",
              backfaceVisibility: "hidden",
            });
          }
        });
      }
      gsap.set(cyberOverlayRef.current, { opacity: 0 });
      gsap.set(footerBgRef.current, { scale: mobile ? 1 : sz(1.15) });
      gsap.set(partnerFlareRef.current, { opacity: 0, xPercent: -40 });
      gsap.set(noonTintRef.current, { opacity: 0 });
      gsap.set([amberBurnRef.current, amberGlowRef.current, twilightBlueRef.current, twilightRoseRef.current, msbHazeRef.current], { opacity: 0 });
      gsap.set(handshakeRimRef.current, { opacity: 0 });
      gsap.set(
        [sunsetAtmoBackRef.current, sunsetAtmoMidRef.current, sunsetAtmoFrontRef.current,
          twilightAtmoBackRef.current, twilightAtmoMidRef.current, twilightAtmoFrontRef.current],
        { opacity: 0, yPercent: 110, scale: sz(1.1) }
      );
      gsap.set(sunsetAtmoMidRef.current, { yPercent: 130, scale: sz(1.2) });
      gsap.set(sunsetAtmoFrontRef.current, { yPercent: 150, scale: sz(1.35) });
      gsap.set(twilightAtmoMidRef.current, { yPercent: 130, scale: sz(1.2) });
      gsap.set(twilightAtmoFrontRef.current, { yPercent: 150, scale: sz(1.35) });

      const partnerLogoEls = partnerLogosRef.current?.querySelectorAll("[data-partner-logo]");
      if (partnerLogoEls?.length) {
        gsap.set(partnerLogoEls, { opacity: 0, scale: 0.88 });
      }

      gsap.set(
        [wipe2BackRef.current, wipe2MidRef.current, wipe2FrontRef.current],
        { opacity: 0, yPercent: 110, scale: sz(1.1) }
      );
      gsap.set(wipe2MidRef.current, { yPercent: 130, scale: sz(1.2) });
      gsap.set(wipe2FrontRef.current, { yPercent: 150, scale: sz(1.35) });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "master-scrolly",
          trigger: scrollTrackRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub,
          pin: sceneRef.current,
          anticipatePin: mobile ? 0 : 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateCounts(self.progress),
        },
      });

      masterTimelineRef.current = tl;

      tl.addLabel("sc_hero", 0);
      tl.addLabel("sc_about", aboutEnterT + enterDur);
      tl.addLabel("sc_finance", financeEnterT + enterDur);
      tl.addLabel("sc_directions", directionsEnterT + enterDur);
      tl.addLabel("sc_msb", msbEnterT + enterDur);
      tl.addLabel("sc_partners", partnersEnterT + enterDur);
      tl.addLabel("sc_news", newsEnterT + enterDur);
      tl.addLabel("sc_contacts", contactsEnterT + enterDur);

      const brandDockDur = 0.08;
      tl.fromTo(
        brandRef.current,
        { opacity: 0, y: brandStartY, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: brandDockDur, ease: "power2.out" },
        0
      );

      // ============ SCENE 1 — Mountains + stats ============
      tl.to(heroBgRef.current, { scale: sz(1.18), duration: statsExitT + exitDur, ease: "none" }, 0);

      tl.fromTo(statsRef.current, textIdle, { ...textArrived, duration: enterDur, ease: textEnterEase }, statsEnterT);
      tl.to(statsRef.current, { ...textEvaporated, duration: exitDur, ease: textExitEase }, statsExitT);

      // ============ SCENE 2 — Clouds + decree ============
      tl.fromTo(
        ambientFogRef.current,
        { opacity: 0, yPercent: 40 },
        { opacity: 0.55, yPercent: 0, duration: enterDur + 0.02, ease: "power2.out" },
        decreeCloudsT
      );
      tl.fromTo(
        wipe1BackRef.current,
        { yPercent: 110, opacity: 0, scale: sz(1.1) },
        { yPercent: -15, opacity: 0.58, scale: sz(1.25), duration: enterDur + 0.02, ease: "power2.inOut" },
        decreeCloudsT
      );
      tl.fromTo(
        wipe1MidRef.current,
        { yPercent: 130, opacity: 0, scale: sz(1.2) },
        { yPercent: -5, opacity: 0.42, scale: sz(1.4), duration: enterDur + 0.018, ease: "power2.inOut" },
        decreeCloudsT + 0.008
      );
      tl.fromTo(
        wipe1FrontRef.current,
        { yPercent: 150, opacity: 0, scale: sz(1.3) },
        { yPercent: -25, opacity: 0.48, scale: sz(1.55), duration: enterDur + 0.02, ease: "power2.inOut" },
        decreeCloudsT + 0.012
      );
      tl.set(wipe1HazeRef.current, { opacity: 0 }, decreeCloudsT);

      tl.fromTo(decreeRef.current, textIdle, { ...textArrived, duration: enterDur, ease: textEnterEase }, decreeEnterT);
      tl.to(decreeRef.current, { ...textEvaporated, duration: exitDur, ease: textExitEase }, decreeExitT);
      tl.to(wipe1BackRef.current, { yPercent: -120, opacity: 0, duration: exitDur, ease: "power2.in" }, decreeExitT);
      tl.to(wipe1MidRef.current, { yPercent: -130, opacity: 0, duration: exitDur, ease: "power2.in" }, decreeExitT + 0.004);
      tl.to(wipe1FrontRef.current, { yPercent: -140, opacity: 0, duration: exitDur, ease: "power2.in" }, decreeExitT + 0.008);
      tl.to(ambientFogRef.current, { yPercent: -30, opacity: 0, duration: exitDur, ease: "power2.in" }, decreeExitT);

      // ============ SCENE 3 — «О ФОНДЕ» ============
      tl.fromTo(aboutRef.current, textIdle, { ...textArrived, duration: enterDur, ease: textEnterEase }, aboutEnterT);
      tl.to(aboutRef.current, { ...textEvaporated, duration: exitDur, ease: textExitEase }, aboutExitT);

      // ============ SCENE 4 — Industrial finance backdrop + «ФИНАНСИРОВАНИЕ» ============
      const cloudCoverDur = enterDur + 0.022;
      tl.fromTo(
        wipe2BackRef.current,
        { yPercent: 110, opacity: 0, scale: sz(1.1) },
        { yPercent: 0, opacity: 0.92, scale: sz(1.3), duration: cloudCoverDur, ease: "power2.inOut" },
        financeCloudsT
      );
      tl.fromTo(
        wipe2MidRef.current,
        { yPercent: 130, opacity: 0, scale: sz(1.2) },
        { yPercent: -5, opacity: 0.85, scale: sz(1.45), duration: cloudCoverDur, ease: "power2.inOut" },
        financeCloudsT + 0.006
      );
      tl.fromTo(
        wipe2FrontRef.current,
        { yPercent: 150, opacity: 0, scale: sz(1.35) },
        { yPercent: -12, opacity: 0.88, scale: sz(1.6), duration: cloudCoverDur, ease: "power2.inOut" },
        financeCloudsT + 0.010
      );
      tl.fromTo(
        wipe2HazeRef.current,
        { opacity: 0 },
        { opacity: 0.35, duration: cloudCoverDur * 0.8, ease: "power2.out" },
        financeCloudsT + 0.004
      );

      tl.to(heroBgRef.current, { opacity: 0, duration: bgCrossfadeDur, ease: "power1.inOut" }, financeBgSwapT);
      tl.to(
        financeBgRef.current,
        { opacity: 1, scale: sz(1.08), duration: bgCrossfadeDur, ease: "power2.out" },
        financeBgSwapT
      );
      tl.to(noonTintRef.current, { opacity: 0.28, duration: bgCrossfadeDur, ease: "power2.out" }, financeBgSwapT);
      tl.to(
        financeBgRef.current,
        { scale: sz(1.22), duration: financeExitT + exitDur - financeBgSwapT, ease: "none" },
        financeBgSwapT + bgCrossfadeDur
      );

      tl.to(wipe2BackRef.current, { yPercent: -100, opacity: 0, duration: exitDur + 0.010, ease: "power2.inOut" }, financeRevealT);
      tl.to(wipe2MidRef.current, { yPercent: -100, opacity: 0, duration: exitDur + 0.010, ease: "power2.inOut" }, financeRevealT + 0.004);
      tl.to(wipe2FrontRef.current, { yPercent: -100, opacity: 0, duration: exitDur + 0.010, ease: "power2.inOut" }, financeRevealT + 0.008);
      tl.to(wipe2HazeRef.current, { opacity: 0, duration: exitDur, ease: "power2.in" }, financeRevealT);

      tl.fromTo(financeRef.current, textIdle, { ...textArrived, duration: enterDur, ease: textEnterEase }, financeEnterT);
      tl.to(financeRef.current, { ...textEvaporated, duration: exitDur, ease: textExitEase }, financeExitT);

      // ============ CINEMATIC ACT II — Noon → Sunset Amber ============
      tl.fromTo(
        sunsetAtmoBackRef.current,
        { yPercent: 110, opacity: 0, scale: sz(1.1) },
        { yPercent: -8, opacity: 0.72, scale: sz(1.28), duration: atmoWipeDur, ease: "power2.inOut" },
        sunsetAtmoT
      );
      tl.fromTo(
        sunsetAtmoMidRef.current,
        { yPercent: 130, opacity: 0, scale: sz(1.2) },
        { yPercent: -4, opacity: 0.58, scale: sz(1.42), duration: atmoWipeDur, ease: "power2.inOut" },
        sunsetAtmoT + 0.006
      );
      tl.fromTo(
        sunsetAtmoFrontRef.current,
        { yPercent: 150, opacity: 0, scale: sz(1.35) },
        { yPercent: -14, opacity: 0.65, scale: sz(1.55), duration: atmoWipeDur, ease: "power2.inOut" },
        sunsetAtmoT + 0.010
      );

      tl.to(noonTintRef.current, { opacity: 0, duration: lightCrossfadeDur, ease: "power1.inOut" }, sunsetBgSwapT);
      if (mobile) {
        tl.to(
          directionsCollageRef.current,
          { opacity: 1, duration: lightCrossfadeDur, ease: "power1.inOut" },
          sunsetBgSwapT
        );
        tl.to(
          financeBgRef.current,
          { opacity: 0, duration: lightCrossfadeDur, ease: "power1.inOut" },
          sunsetBgSwapT
        );
      } else {
        tl.to(
          financeBgRef.current,
          { opacity: 0, scale: sz(1.35), duration: lightCrossfadeDur, ease: "power2.in" },
          sunsetBgSwapT
        );
        tl.to(
          directionsCollageRef.current,
          { opacity: 1, duration: lightCrossfadeDur, ease: "power2.out" },
          sunsetBgSwapT
        );
      }
      tl.to(amberBurnRef.current, { opacity: 0.92, duration: lightCrossfadeDur, ease: "power2.out" }, sunsetBgSwapT);
      tl.to(amberGlowRef.current, { opacity: 0.58, duration: lightCrossfadeDur + 0.006, ease: "power2.out" }, sunsetBgSwapT + 0.004);
      if (cursorRing) {
        tl.to(
          cursorRing,
          {
            borderColor: CURSOR_BORDER_LIGHT,
            duration: lightCrossfadeDur,
            ease: "power1.inOut",
            onUpdate: function () {
              cursorRing.setAttribute("data-cursor-theme", this.progress() > 0.5 ? "light" : "dark");
            },
          },
          sunsetBgSwapT
        );
      }
      if (cursorDot) {
        tl.to(
          cursorDot,
          { backgroundColor: CURSOR_BORDER_LIGHT, duration: lightCrossfadeDur, ease: "power1.inOut" },
          sunsetBgSwapT
        );
      }

      tl.to(sunsetAtmoBackRef.current, { yPercent: -110, opacity: 0, duration: exitDur + 0.012, ease: "power2.inOut" }, sunsetRevealT);
      tl.to(sunsetAtmoMidRef.current, { yPercent: -115, opacity: 0, duration: exitDur + 0.012, ease: "power2.inOut" }, sunsetRevealT + 0.004);
      tl.to(sunsetAtmoFrontRef.current, { yPercent: -120, opacity: 0, duration: exitDur + 0.012, ease: "power2.inOut" }, sunsetRevealT + 0.008);

      if (!mobile) {
        tl.fromTo(
          directionsCollageRef.current,
          { scale: 1 },
          { scale: sz(1.08), duration: collageParallaxDur, ease: "power2.out" },
          sunsetRevealT
        );
      }
      tl.to(amberGlowRef.current, { opacity: 0.82, duration: collageParallaxDur, ease: "power1.inOut" }, sunsetRevealT);

      tl.fromTo(directionsRef.current, textIdle, { ...textArrived, duration: enterDur, ease: textEnterEase }, directionsEnterT);
      tl.to(directionsRef.current, { ...textEvaporated, duration: exitDur, ease: textExitEase }, directionsExitT);
      tl.to(directionsCollageRef.current, { opacity: 0, duration: exitDur, ease: "power1.in" }, directionsExitT);
      tl.to(amberBurnRef.current, { opacity: 0, duration: exitDur, ease: "power1.in" }, directionsExitT);
      tl.to(amberGlowRef.current, { opacity: 0, duration: exitDur, ease: "power1.in" }, directionsExitT);

      // ============ Sunset → Twilight Blue (MSB) ============
      tl.fromTo(
        twilightAtmoBackRef.current,
        { yPercent: 110, opacity: 0, scale: sz(1.1) },
        { yPercent: -6, opacity: 0.55, scale: sz(1.25), duration: atmoWipeDur, ease: "power2.inOut" },
        twilightAtmoT
      );
      tl.fromTo(
        twilightAtmoMidRef.current,
        { yPercent: 130, opacity: 0, scale: sz(1.2) },
        { yPercent: -2, opacity: 0.42, scale: sz(1.38), duration: atmoWipeDur, ease: "power2.inOut" },
        twilightAtmoT + 0.006
      );
      tl.fromTo(
        twilightAtmoFrontRef.current,
        { yPercent: 150, opacity: 0, scale: sz(1.35) },
        { yPercent: -10, opacity: 0.48, scale: sz(1.5), duration: atmoWipeDur, ease: "power2.inOut" },
        twilightAtmoT + 0.010
      );

      tl.to(amberBurnRef.current, { opacity: 0, duration: lightCrossfadeDur * 0.55, ease: "power1.inOut" }, twilightAtmoT);
      tl.to(amberGlowRef.current, { opacity: 0, duration: lightCrossfadeDur * 0.55, ease: "power1.inOut" }, twilightAtmoT);
      tl.to(directionsCollageRef.current, { opacity: 0, duration: lightCrossfadeDur * 0.6, ease: "power2.in" }, twilightAtmoT);
      tl.to(msbCollageRef.current, { opacity: 1, duration: lightCrossfadeDur, ease: "power2.out" }, twilightBgSwapT);

      tl.to(twilightRoseRef.current, { opacity: 0.42, duration: convergeDur * 0.45, ease: "power2.out" }, twilightAtmoT);
      tl.to(twilightBlueRef.current, { opacity: 0.18, duration: convergeDur * 0.4, ease: "power2.out" }, twilightAtmoT + 0.004);
      tl.to(msbHazeRef.current, { opacity: 0.62, duration: convergeDur * 0.55, ease: "power2.inOut" }, twilightAtmoT + 0.006);
      tl.to(twilightRoseRef.current, { opacity: 0.32, duration: convergeDur, ease: "power1.inOut" }, twilightAtmoT + convergeDur * 0.25);
      tl.to(twilightBlueRef.current, { opacity: 0.78, duration: convergeDur, ease: "power2.out" }, twilightAtmoT + convergeDur * 0.2);
      tl.to(msbHazeRef.current, { opacity: 0.38, duration: convergeDur * 0.7, ease: "power1.inOut" }, twilightAtmoT + convergeDur * 0.35);

      tl.to(twilightAtmoBackRef.current, { yPercent: -108, opacity: 0, duration: exitDur + 0.012, ease: "power2.inOut" }, twilightRevealT);
      tl.to(twilightAtmoMidRef.current, { yPercent: -112, opacity: 0, duration: exitDur + 0.012, ease: "power2.inOut" }, twilightRevealT + 0.004);
      tl.to(twilightAtmoFrontRef.current, { yPercent: -118, opacity: 0, duration: exitDur + 0.012, ease: "power2.inOut" }, twilightRevealT + 0.008);

      if (!mobile) {
        tl.fromTo(
          msbCollageRef.current,
          { scale: 1 },
          { scale: sz(1.1), duration: msbExitT + exitDur - twilightRevealT, ease: "none" },
          twilightRevealT
        );
      }

      tl.fromTo(msbRef.current, textIdle, { ...textArrived, duration: enterDur, ease: textEnterEase }, msbEnterT);
      tl.to(msbRef.current, { ...textEvaporated, duration: exitDur, ease: textExitEase }, msbExitT);
      tl.to(msbCollageRef.current, { opacity: 0, duration: exitDur, ease: "power1.in" }, msbExitT);
      tl.to(twilightBlueRef.current, { opacity: 0, duration: exitDur, ease: "power1.in" }, msbExitT);
      tl.to(twilightRoseRef.current, { opacity: 0, duration: exitDur, ease: "power1.in" }, msbExitT);
      tl.to(msbHazeRef.current, { opacity: 0, duration: exitDur, ease: "power1.in" }, msbExitT);

      // ============ Twilight → Space Zoom Trilogy (Partners → News → Contacts) ============
      tl.to(twilightBlueRef.current, { opacity: 0, duration: lightCrossfadeDur, ease: "power1.inOut" }, midnightBgSwapT);
      tl.to(twilightRoseRef.current, { opacity: 0, duration: lightCrossfadeDur, ease: "power1.inOut" }, midnightBgSwapT);
      tl.to(msbHazeRef.current, { opacity: 0, duration: lightCrossfadeDur * 0.8, ease: "power1.inOut" }, midnightBgSwapT);
      if (mobile) {
        tl.fromTo(
          spaceZoomBaseRef.current,
          { opacity: 0 },
          { opacity: 1, duration: lightCrossfadeDur + 0.014, ease: "power2.out" },
          midnightBgSwapT
        );
      } else {
        tl.fromTo(
          spaceZoomBaseRef.current,
          { opacity: 0, scale: sz(1.0) },
          { opacity: 1, scale: sz(1.0), duration: lightCrossfadeDur + 0.014, ease: "power2.out" },
          midnightBgSwapT
        );
      }

      tl.fromTo(
        partnerFlareRef.current,
        { opacity: 0, xPercent: -40 },
        { opacity: 1, xPercent: 28, duration: flareDur, ease: "power2.inOut" },
        partnersEnterT - 0.008
      );
      tl.fromTo(
        handshakeRimRef.current,
        { opacity: 0 },
        { opacity: 0.85, duration: flareDur * 0.55, ease: "power2.out" },
        partnersEnterT - 0.004
      );
      tl.to(
        partnerFlareRef.current,
        { opacity: 0, xPercent: 92, duration: flareDur * 0.85, ease: "power2.inOut" },
        partnersEnterT + enterDur * 0.25
      );
      tl.to(
        handshakeRimRef.current,
        { opacity: 0.35, duration: flareDur * 0.6, ease: "power1.inOut" },
        partnersEnterT + enterDur * 0.35
      );

      tl.fromTo(partnersTextRef.current, textIdle, { ...textArrived, duration: enterDur, ease: textEnterEase }, partnersEnterT);
      if (partnerLogoEls?.length) {
        tl.to(
          partnerLogoEls,
          { opacity: 1, scale: 1, duration: 0.022, stagger: 0.008, ease: "power2.out" },
          partnersEnterT + enterDur * 0.5
        );
      }

      // ============ Partners exit → News → Contacts → Footer zone (space zoom holds) ============
      if (partnerLogoEls?.length) {
        tl.to(
          partnerLogoEls,
          { ...textEvaporated, duration: exitDur, stagger: 0.005, ease: textExitEase },
          partnerLogoExitT
        );
      }
      tl.to(partnersTextRef.current, { ...textEvaporated, duration: exitDur, ease: textExitEase }, partnersTextExitT);

      const spaceZoomNewsDur = newsExitT + exitDur - newsEnterT;
      const spaceZoomContactsDur = contactsExitT + exitDur - contactsEnterT;

      if (cinematic) {
        tl.fromTo(
          spaceZoomBaseRef.current,
          { scale: sz(1.0) },
          { scale: sz(1.25), duration: spaceZoomNewsDur, ease: "none" },
          newsEnterT
        );
        tl.fromTo(
          cyberOverlayRef.current,
          { opacity: 0 },
          { opacity: 0.7, duration: enterDur + holdDur, ease: "power2.out" },
          newsEnterT
        );
      }

      tl.fromTo(newsTitleRef.current, textIdle, { ...textArrived, duration: enterDur, ease: textEnterEase }, newsEnterT);
      tl.to(newsTitleRef.current, { ...textEvaporated, duration: exitDur, ease: textExitEase }, newsExitT);

      if (cinematic) {
        tl.to(
          spaceZoomBaseRef.current,
          { scale: sz(1.55), duration: spaceZoomContactsDur, ease: "none" },
          contactsEnterT
        );
        tl.to(
          cyberOverlayRef.current,
          { opacity: 1, duration: enterDur + holdDur * 0.45, ease: "power2.out" },
          contactsEnterT
        );
        tl.to(
          cyberOverlayRef.current,
          { opacity: 0.88, duration: holdDur * 0.28, ease: "sine.inOut" },
          contactsEnterT + enterDur + holdDur * 0.45
        );
        tl.to(
          cyberOverlayRef.current,
          { opacity: 1, duration: holdDur * 0.27, ease: "sine.inOut" },
          contactsEnterT + enterDur + holdDur * 0.73
        );
      }

      tl.fromTo(contactsTitleRef.current, textIdle, { ...textArrived, duration: enterDur, ease: textEnterEase }, contactsEnterT);
      tl.to(contactsTitleRef.current, { ...textEvaporated, duration: exitDur, ease: textExitEase }, contactsExitT);

      tl.fromTo(
        footerContentZoneRef.current,
        { opacity: 0 },
        { opacity: 1, duration: enterDur, ease: "power2.out" },
        footerEnterT
      );
      if (!mobile) {
        tl.fromTo(
          footerBgRef.current,
          { scale: sz(1.15) },
          { scale: sz(1.0), duration: footerHoldDur + enterDur, ease: "power2.inOut" },
          footerEnterT
        );
      }
      tl.to(
        footerContentZoneRef.current,
        { opacity: 1, duration: footerHoldDur, ease: "none" },
        footerEnterT + enterDur
      );

        return () => {
          cancelled = true;
          if (lenis) {
            cancelAnimationFrame(rafId);
            lenis.off("scroll", ScrollTrigger.update);
            lenis.destroy();
          }
          masterTimelineRef.current = null;
          lenisRef.current = null;
          if (cursorRing) {
            gsap.set(cursorRing, { borderColor: CURSOR_BORDER_DARK });
            cursorRing.setAttribute("data-cursor-theme", "dark");
          }
          if (cursorDot) {
            gsap.set(cursorDot, { backgroundColor: CURSOR_BORDER_DARK });
          }
        };
      };

      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.config({ ignoreMobileResize: true });
        return runExperience({
          scrollDistance: SCROLL_DISTANCE_MOBILE,
          scrub: true,
          mobile: true,
          cinematic: false,
        });
      });

      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        ScrollTrigger.config({ ignoreMobileResize: true });
        return runExperience({
          scrollDistance: SCROLL_DISTANCE_TABLET,
          scrub: 0.5,
          mobile: false,
          cinematic: false,
        });
      });

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.config({ ignoreMobileResize: false });
        return runExperience({
          scrollDistance: SCROLL_DISTANCE_DESKTOP,
          scrub: 1,
          mobile: false,
          cinematic: true,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      <Navbar
        ref={navHeaderRef}
        brandRef={brandRef}
        navItems={NAV_ITEMS}
        langs={LANGS}
        lang={lang}
        onLangChange={setLang}
        onNavClick={handleNavClick}
      />

      <div ref={scrollTrackRef} style={{ height: `${SCROLL_DISTANCE_DESKTOP}px` }}>
      <div
        ref={sceneRef}
        className="relative h-[100svh] md:h-screen w-full overflow-hidden bg-gradient-to-b from-[#dbe6f1] via-[#e9eef5] to-[#f3f1e8]"
      >
        <HeroSection heroBgRef={heroBgRef} cloudDriftRef={cloudDriftRef} />

        <CountersSection statsRef={statsRef} count200Ref={count200Ref} count8000Ref={count8000Ref} />

        <DecreeSection
          decreeRef={decreeRef}
          ambientFogRef={ambientFogRef}
          wipe1HazeRef={wipe1HazeRef}
          wipe1BackRef={wipe1BackRef}
          wipe1MidRef={wipe1MidRef}
          wipe1FrontRef={wipe1FrontRef}
        />

        <AboutSection aboutRef={aboutRef} />

        <FinanceSection
          financeBgRef={financeBgRef}
          noonTintRef={noonTintRef}
          financeRef={financeRef}
          wipe2HazeRef={wipe2HazeRef}
          wipe2BackRef={wipe2BackRef}
          wipe2MidRef={wipe2MidRef}
          wipe2FrontRef={wipe2FrontRef}
        />

        <DirectionsSection
          sunsetBgRef={sunsetBgRef}
          directionsCollageRef={directionsCollageRef}
          amberBurnRef={amberBurnRef}
          amberGlowRef={amberGlowRef}
          sunsetAtmoBackRef={sunsetAtmoBackRef}
          sunsetAtmoMidRef={sunsetAtmoMidRef}
          sunsetAtmoFrontRef={sunsetAtmoFrontRef}
          directionsRef={directionsRef}
        />

        <MsbSection
          twilightBgRef={twilightBgRef}
          msbCollageRef={msbCollageRef}
          twilightBlueRef={twilightBlueRef}
          twilightRoseRef={twilightRoseRef}
          msbHazeRef={msbHazeRef}
          twilightAtmoBackRef={twilightAtmoBackRef}
          twilightAtmoMidRef={twilightAtmoMidRef}
          twilightAtmoFrontRef={twilightAtmoFrontRef}
          msbRef={msbRef}
        />

        <SpaceTrilogyContainer
          midnightBgRef={midnightBgRef}
          spaceZoomBaseRef={spaceZoomBaseRef}
          cyberOverlayRef={cyberOverlayRef}
          handshakeRimRef={handshakeRimRef}
          partnerFlareRef={partnerFlareRef}
          partnersRef={partnersRef}
          partnersTextRef={partnersTextRef}
          partnerLogosRef={partnerLogosRef}
          newsTitleRef={newsTitleRef}
          newsContentRef={newsContentRef}
          contactsTitleRef={contactsTitleRef}
          contactsContentRef={contactsContentRef}
        />

        <FooterSection
          footerContentZoneRef={footerContentZoneRef}
          footerBgRef={footerBgRef}
          onScrollToTop={scrollToTop}
        />
      </div>
      </div>
    </div>
  );
}

