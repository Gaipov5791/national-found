import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Menu, X } from "lucide-react";
import mountains from "@/assets/mountains.jpg";
import kumtor from "@/assets/kumtor.jpg";
import fundLogo from "@/assets/fund-logo.png.asset.json";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

export function Scrollytelling() {
  const [lang, setLang] = useState("RU");
  const [navOpen, setNavOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decreeRef = useRef<HTMLDivElement>(null);
  const cloudDriftRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  // Cinematic background layers (z-0)
  const kumtorBgRef = useRef<HTMLImageElement>(null);
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
  const footerMountainRef = useRef<HTMLImageElement>(null);

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

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        duration: 2.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const runExperience = (cfg: {
        scrollDistance: number;
        scrub: number | boolean;
        mobile: boolean;
      }) => {
        const { scrollDistance, scrub, mobile } = cfg;

        if (scrollTrackRef.current) {
          scrollTrackRef.current.style.height = `${scrollDistance}px`;
        }

        const lenis = new Lenis({
          duration: mobile ? 0.85 : 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: !mobile,
          syncTouch: false,
          touchMultiplier: mobile ? 1.15 : 1,
          wheelMultiplier: mobile ? 0.9 : 1,
          lerp: mobile ? 0.12 : 0.1,
        });
        lenisRef.current = lenis;

        let rafId = 0;
        let cancelled = false;
        const raf = (time: number) => {
          if (cancelled) return;
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        lenis.on("scroll", ScrollTrigger.update);

      const enterDur = 0.028;
      const exitDur = 0.028;
      const holdDur = 0.014;
      const textEnterY = 30;
      const textExitY = -45;
      const textExitScale = 1.03;
      const textEnterEase = "power2.out";
      const textExitEase = "power1.in";
      const textOverlap = 0.016;
      const textIdle = { opacity: 0, yPercent: textEnterY, scale: 1 };
      const textArrived = { opacity: 1, yPercent: 0, scale: 1 };
      const textEvaporated = { yPercent: textExitY, opacity: 0, scale: textExitScale };
      const breatheAfter = (exitStart: number) => exitStart + exitDur - textOverlap;
      const gapAfterExit = (exitStart: number, gap: number) => exitStart + exitDur + gap;

      const lightCrossfadeDur = 0.034;
      const atmoWipeDur = 0.032;
      const collageParallaxDur = 0.048;
      const convergeDur = 0.042;
      const flareDur = 0.030;

      const statsEnterT = 0.06;
      const statsExitT = statsEnterT + enterDur + holdDur;

      const decreeCloudsT = breatheAfter(statsExitT);
      const decreeEnterT = decreeCloudsT + 0.052;
      const decreeExitT = decreeEnterT + enterDur + holdDur;

      const decreeAboutGap = 0.012;
      const aboutEnterT = gapAfterExit(decreeExitT, decreeAboutGap);
      const aboutExitT = aboutEnterT + enterDur + holdDur;

      const financeCloudsT = breatheAfter(aboutExitT);
      const kumtorBgSwapT = financeCloudsT + 0.008;
      const bgCrossfadeDur = 0.020;
      const kumtorRevealT = financeCloudsT + 0.026;
      const financeEnterT = kumtorRevealT;
      const financeExitT = financeEnterT + enterDur + holdDur;

      // Kumtor → Sunset Amber
      const sunsetAtmoT = breatheAfter(financeExitT);
      const sunsetBgSwapT = sunsetAtmoT + 0.010;
      const sunsetRevealT = sunsetAtmoT + atmoWipeDur;
      const directionsEnterT = sunsetRevealT;
      const directionsExitT = directionsEnterT + enterDur + holdDur;

      // Sunset → Twilight (MSB)
      const twilightAtmoT = breatheAfter(directionsExitT);
      const twilightBgSwapT = twilightAtmoT + 0.010;
      const twilightRevealT = twilightAtmoT + atmoWipeDur;
      const msbEnterT = twilightRevealT;
      const msbExitT = msbEnterT + enterDur + holdDur;

      // Twilight → Midnight (Partners)
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
      // Mobile: cap heavy scene-image zoom to keep GPU texture work minimal (desktop unchanged).
      const imgScale = (base: number) => {
        if (!mobile) return sz(base);
        if (base <= 1) return 1;
        return Math.min(1.02, +(1 + (base - 1) * 0.036).toFixed(3));
      };
      const cyberNewsOpacity = mobile ? 0.5 : 0.7;
      const cyberContactsOpacity = mobile ? 0.5 : 1;

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

      gsap.set(kumtorBgRef.current, { opacity: 0, yPercent: 0, scale: sz(1.0) });
      gsap.set([sunsetBgRef.current, twilightBgRef.current, midnightBgRef.current], { opacity: 0 });
      gsap.set(directionsCollageRef.current, { opacity: 0, scale: 1 });
      gsap.set(msbCollageRef.current, { opacity: 0, scale: 1 });
      gsap.set(spaceZoomBaseRef.current, { opacity: 0, scale: imgScale(1.0) });
      gsap.set(cyberOverlayRef.current, { opacity: 0 });
      if (cyberOverlayRef.current) {
        cyberOverlayRef.current.style.mixBlendMode = mobile ? "normal" : "screen";
      }
      gsap.set(footerMountainRef.current, { scale: imgScale(1.15) });
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

      const brandDockDur = 0.08;
      tl.fromTo(
        brandRef.current,
        { opacity: 0, y: brandStartY, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: brandDockDur, ease: "power2.out" },
        0
      );

      // ============ SCENE 1 — Mountains + stats ============
      tl.to(mountainRef.current, { scale: sz(1.18), duration: statsExitT + exitDur, ease: "none" }, 0);

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

      // ============ SCENE 4 — Kumtor + «ФИНАНСИРОВАНИЕ» ============
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

      tl.to(mountainRef.current, { opacity: 0, duration: bgCrossfadeDur, ease: "power1.inOut" }, kumtorBgSwapT);
      tl.to(
        kumtorBgRef.current,
        { opacity: 1, scale: sz(1.08), duration: bgCrossfadeDur, ease: "power2.out" },
        kumtorBgSwapT
      );
      tl.to(noonTintRef.current, { opacity: 0.28, duration: bgCrossfadeDur, ease: "power2.out" }, kumtorBgSwapT);
      tl.to(
        kumtorBgRef.current,
        { scale: sz(1.22), duration: financeExitT + exitDur - kumtorBgSwapT, ease: "none" },
        kumtorBgSwapT + bgCrossfadeDur
      );

      tl.to(wipe2BackRef.current, { yPercent: -100, opacity: 0, duration: exitDur + 0.010, ease: "power2.inOut" }, kumtorRevealT);
      tl.to(wipe2MidRef.current, { yPercent: -100, opacity: 0, duration: exitDur + 0.010, ease: "power2.inOut" }, kumtorRevealT + 0.004);
      tl.to(wipe2FrontRef.current, { yPercent: -100, opacity: 0, duration: exitDur + 0.010, ease: "power2.inOut" }, kumtorRevealT + 0.008);
      tl.to(wipe2HazeRef.current, { opacity: 0, duration: exitDur, ease: "power2.in" }, kumtorRevealT);

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
      tl.to(kumtorBgRef.current, { opacity: 0, scale: sz(1.35), duration: lightCrossfadeDur, ease: "power2.in" }, sunsetBgSwapT);
      tl.to(amberBurnRef.current, { opacity: 0.92, duration: lightCrossfadeDur, ease: "power2.out" }, sunsetBgSwapT);
      tl.to(amberGlowRef.current, { opacity: 0.58, duration: lightCrossfadeDur + 0.006, ease: "power2.out" }, sunsetBgSwapT + 0.004);
      tl.to(directionsCollageRef.current, { opacity: 1, duration: lightCrossfadeDur, ease: "power2.out" }, sunsetBgSwapT);
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

      tl.fromTo(
        directionsCollageRef.current,
        { scale: 1 },
        { scale: imgScale(1.08), duration: collageParallaxDur, ease: "power2.out" },
        sunsetRevealT
      );
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

      tl.fromTo(
        msbCollageRef.current,
        { scale: 1 },
        { scale: imgScale(1.1), duration: msbExitT + exitDur - twilightRevealT, ease: "none" },
        twilightRevealT
      );

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
      tl.fromTo(
        spaceZoomBaseRef.current,
        { opacity: 0, scale: imgScale(1.0) },
        { opacity: 1, scale: imgScale(1.0), duration: lightCrossfadeDur + 0.014, ease: "power2.out" },
        midnightBgSwapT
      );

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

      tl.fromTo(
        spaceZoomBaseRef.current,
        { scale: imgScale(1.0) },
        { scale: imgScale(1.25), duration: spaceZoomNewsDur, ease: "none" },
        newsEnterT
      );
      tl.fromTo(
        cyberOverlayRef.current,
        { opacity: 0 },
        { opacity: cyberNewsOpacity, duration: enterDur + holdDur, ease: "power2.out" },
        newsEnterT
      );

      tl.fromTo(newsTitleRef.current, textIdle, { ...textArrived, duration: enterDur, ease: textEnterEase }, newsEnterT);
      tl.to(newsTitleRef.current, { ...textEvaporated, duration: exitDur, ease: textExitEase }, newsExitT);

      tl.to(
        spaceZoomBaseRef.current,
        { scale: imgScale(1.55), duration: spaceZoomContactsDur, ease: "none" },
        contactsEnterT
      );
      if (mobile) {
        tl.to(
          cyberOverlayRef.current,
          { opacity: cyberContactsOpacity, duration: enterDur + holdDur, ease: "power2.out" },
          contactsEnterT
        );
      } else {
        tl.to(
          cyberOverlayRef.current,
          { opacity: cyberContactsOpacity, duration: enterDur + holdDur * 0.45, ease: "power2.out" },
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
      tl.fromTo(
        footerMountainRef.current,
        { scale: imgScale(1.15) },
        { scale: imgScale(1.0), duration: footerHoldDur + enterDur, ease: "power2.inOut" },
        footerEnterT
      );
      tl.to(
        footerContentZoneRef.current,
        { opacity: 1, duration: footerHoldDur, ease: "none" },
        footerEnterT + enterDur
      );

        return () => {
          cancelled = true;
          cancelAnimationFrame(rafId);
          lenis.off("scroll", ScrollTrigger.update);
          lenis.destroy();
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
        });
      });

      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        ScrollTrigger.config({ ignoreMobileResize: true });
        return runExperience({
          scrollDistance: SCROLL_DISTANCE_TABLET,
          scrub: 0.5,
          mobile: false,
        });
      });

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.config({ ignoreMobileResize: false });
        return runExperience({
          scrollDistance: SCROLL_DISTANCE_DESKTOP,
          scrub: 1,
          mobile: false,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      {/* === STABLE NAVBAR (fixed, outside pinned scene) === */}
      <header
        className="fixed left-0 right-0 top-0 z-[70] px-6 pt-4 will-change-transform md:px-12 md:pt-5"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <div
          className="mx-auto w-full max-w-7xl will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <nav
            className="flex w-full items-center justify-between gap-3 rounded-full border border-white/40 bg-white/40 px-4 py-2.5 font-display backdrop-blur-xl shadow-[0_8px_30px_rgba(20,40,90,0.08)] will-change-transform md:gap-4 md:px-6"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <div className="flex shrink-0 items-center">
              <img
                src={fundLogo.url}
                alt="НИФ КР"
                className="block h-9 w-auto md:hidden"
              />
              <div className="hidden md:block h-[44px] w-[52px]" aria-hidden />
            </div>

            <ul className="hidden min-w-0 flex-1 items-center justify-center gap-x-4 text-[9.5px] font-semibold tracking-[0.14em] text-[color:var(--ink)] lg:flex xl:gap-x-6 xl:text-[10.5px] xl:tracking-[0.16em]">
              {NAV_ITEMS.map((label) => (
                <li key={label} className="shrink-0">
                  <a
                    href="#"
                    data-cursor-hover
                    className="inline-block whitespace-nowrap py-1.5 transition-transform duration-300 ease-out hover:scale-110 hover:text-[color:var(--gold)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden shrink-0 items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-[color:var(--ink)] md:flex">
              <span className="whitespace-nowrap">{lang}</span>
              <div className="flex gap-1.5">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    data-cursor-hover
                    aria-label={l}
                    className={`h-2 w-2 rounded-full transition-all ${
                      lang === l
                        ? "bg-[color:var(--ink)] scale-125"
                        : "bg-[color:var(--ink)]/30 hover:bg-[color:var(--ink)]/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Меню"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/60 text-[color:var(--ink)] shadow-sm transition hover:bg-white lg:hidden"
            >
              {navOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>

          <div
            className={`mt-3 w-full overflow-hidden rounded-3xl border border-white/40 bg-white/80 font-display backdrop-blur-2xl shadow-[0_20px_60px_rgba(20,40,90,0.18)] transition-all duration-500 ease-out lg:hidden ${
              navOpen ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
          <ul className="flex flex-col divide-y divide-[color:var(--ink)]/10 px-2 py-2 text-[12px] font-semibold tracking-[0.16em] text-[color:var(--ink)]">
            {NAV_ITEMS.map((label, i) => (
              <li
                key={label}
                style={{ transitionDelay: navOpen ? `${80 + i * 45}ms` : "0ms" }}
                className={`transform transition-all duration-500 ${
                  navOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                }`}
              >
                <a
                  href="#"
                  onClick={() => setNavOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 whitespace-nowrap transition hover:bg-[color:var(--ink)]/5 hover:text-[color:var(--gold)]"
                >
                  <span>{label}</span>
                  <span className="text-[color:var(--gold)] opacity-60">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-[color:var(--ink)]/10 px-5 py-4">
            <span className="text-[11px] font-semibold tracking-[0.22em] text-[color:var(--ink)]/70">ЯЗЫК</span>
            <div className="flex gap-2">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] transition ${
                    lang === l
                      ? "bg-[color:var(--ink)] text-white"
                      : "bg-transparent text-[color:var(--ink)]/70 hover:bg-[color:var(--ink)]/10"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        </div>
      </header>

      {/* === PERMANENT BRAND HEADER (fixed below nav, isolated from blend modes) === */}
      <div
        ref={brandRef}
        className="pointer-events-none fixed left-1/2 top-[5.75rem] z-[65] w-full max-w-[min(100%,920px)] -translate-x-1/2 px-4 will-change-[transform,opacity] sm:top-[6rem] sm:px-6 md:top-[7rem]"
        style={{
          mixBlendMode: "normal",
          isolation: "isolate",
        }}
      >
        <h1
          className="text-center font-display text-[clamp(0.5rem,2.6vw,0.68rem)] font-bold leading-[1.15] tracking-[0.06em] text-white opacity-100 sm:text-[clamp(0.62rem,1.9vw,0.88rem)] sm:tracking-[0.1em] md:text-[clamp(0.72rem,1.55vw,1.08rem)] md:leading-[1.2] md:tracking-[0.14em]"
          style={{
            mixBlendMode: "normal",
            color: "#ffffff",
            textShadow: "0 4px 24px rgba(8,16,36,0.72)",
          }}
        >
          НАЦИОНАЛЬНЫЙ<br />
          ИНВЕСТИЦИОННЫЙ ФОНД<br />
          КЫРГЫЗСКОЙ РЕСПУБЛИКИ
        </h1>
      </div>

      <div ref={scrollTrackRef} style={{ height: `${SCROLL_DISTANCE_DESKTOP}px` }}>
      <div
        ref={sceneRef}
        className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#dbe6f1] via-[#e9eef5] to-[#f3f1e8]"
      >
        <div ref={cloudDriftRef} className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          <div className="absolute left-[-10%] top-[12%] h-[28vh] w-[55vw] rounded-full bg-gradient-to-t from-white/70 via-white/40 to-transparent blur-[150px] scale-150" style={{ maskImage: "radial-gradient(ellipse 100% 100% at center, white 60%, transparent 100%)" }} />
          <div className="absolute right-[-8%] top-[22%] h-[24vh] w-[45vw] rounded-full bg-gradient-to-t from-white/60 via-white/30 to-transparent blur-[150px] scale-150" style={{ maskImage: "radial-gradient(ellipse 100% 100% at center, white 60%, transparent 100%)" }} />
          <div className="absolute left-[20%] top-[6%] h-[18vh] w-[35vw] rounded-full bg-gradient-to-t from-white/50 via-white/25 to-transparent blur-[150px] scale-150" style={{ maskImage: "radial-gradient(ellipse 100% 100% at center, white 60%, transparent 100%)" }} />
        </div>

        {/* === BACKGROUND LAYER (z-0) === */}
        <img
          ref={mountainRef}
          src={mountains}
          alt="Горы"
          className="absolute inset-0 z-0 h-full w-full object-cover object-bottom will-change-[transform,opacity]"
          style={{ transformOrigin: "50% 70%" }}
        />
        <img
          ref={kumtorBgRef}
          src={kumtor}
          alt="Золоторудный комбинат Кумтор"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-0 will-change-[transform,opacity]"
          style={{ transformOrigin: "50% 60%" }}
        />
        <div
          ref={sunsetBgRef}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 will-change-[transform,opacity]"
          style={{
            background:
              "linear-gradient(175deg, #120804 0%, #4a2008 14%, #8a4010 32%, #c46828 52%, #e89840 68%, #f5c070 82%, #ffe8b8 96%)",
          }}
        />
        <div
          ref={twilightBgRef}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 will-change-[transform,opacity]"
          style={{
            background:
              "linear-gradient(180deg, #080c18 0%, #101830 18%, #1a2848 38%, #304870 58%, #5078a0 75%, #88a8c8 90%, #b8cce0 100%)",
          }}
        />
        <div
          ref={midnightBgRef}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 will-change-[transform,opacity]"
          style={{
            transformOrigin: "50% 50%",
            background:
              "linear-gradient(180deg, #06080c 0%, #0c1018 30%, #121820 55%, #181e28 78%, #1e2430 100%)",
          }}
        />

        {/* === SCENE IMAGES (z-[2]) === */}
        <div
          ref={directionsCollageRef}
          className="pointer-events-none absolute inset-0 z-[2] opacity-0 will-change-[transform,opacity]"
          style={{ transformOrigin: "50% 55%", isolation: "isolate" }}
        >
          <img
            src="/images/hpp-sunset.png"
            alt="Гидроэлектростанция на закате"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ transformOrigin: "50% 55%" }}
          />
        </div>

        <div
          ref={msbCollageRef}
          className="pointer-events-none absolute inset-0 z-[2] opacity-0 will-change-[transform,opacity]"
          style={{ transformOrigin: "50% 55%", isolation: "isolate" }}
        >
          <img
            src="/images/issykkul-resort.png"
            alt="Курорт на берегу Иссык-Куля"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ transformOrigin: "50% 55%" }}
          />
        </div>

        {/* === SPACE ZOOM TRILOGY BASE (z-[5]) — Partners → News → Contacts === */}
        <div
          ref={spaceZoomBaseRef}
          className="pointer-events-none absolute inset-0 z-[5] opacity-0 will-change-[transform,opacity]"
          style={{ transformOrigin: "50% 50%" }}
        >
          <img
            src="/images/kyrgyzstan-space.png"
            alt="Кыргызстан из космоса"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ transformOrigin: "50% 50%" }}
          />
        </div>
        <div
          ref={cyberOverlayRef}
          className="pointer-events-none absolute inset-0 z-[6] opacity-0 will-change-[transform,opacity] max-md:[mix-blend-mode:normal] md:[mix-blend-mode:screen]"
        >
          <img
            src="/images/cyber-electricity.png"
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

        {/* === OVERLAY TINT LAYERS (z-10) — dual blend stacks === */}
        <div
          ref={noonTintRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 will-change-[transform,opacity]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,248,220,0.35) 0%, rgba(255,235,180,0.18) 40%, rgba(200,210,230,0.08) 100%)",
          }}
        />
        <div
          ref={amberBurnRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 will-change-[transform,opacity]"
          style={{
            mixBlendMode: "multiply",
            background:
              "radial-gradient(ellipse 140% 95% at 50% 78%, rgba(255,100,10,0.95) 0%, rgba(220,60,5,0.75) 30%, rgba(160,35,0,0.45) 55%, rgba(80,20,0,0.15) 75%, transparent 92%)",
          }}
        />
        <div
          ref={amberGlowRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 will-change-[transform,opacity]"
          style={{
            mixBlendMode: "screen",
            background:
              "radial-gradient(ellipse 120% 70% at 50% 72%, rgba(255,220,140,0.85) 0%, rgba(255,180,70,0.5) 35%, rgba(255,140,40,0.2) 60%, transparent 85%), linear-gradient(0deg, rgba(255,160,50,0.35) 0%, transparent 45%)",
          }}
        />
        <div
          ref={twilightBlueRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 will-change-[transform,opacity]"
          style={{
            mixBlendMode: "multiply",
            background:
              "radial-gradient(ellipse 130% 90% at 50% 55%, rgba(25,45,110,0.85) 0%, rgba(35,55,130,0.6) 35%, rgba(45,70,150,0.35) 60%, transparent 88%), linear-gradient(180deg, rgba(15,25,60,0.4) 0%, rgba(40,70,140,0.25) 50%, rgba(80,110,170,0.12) 100%)",
          }}
        />
        <div
          ref={twilightRoseRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 will-change-[transform,opacity]"
          style={{
            mixBlendMode: "screen",
            background:
              "radial-gradient(ellipse 100% 65% at 50% 68%, rgba(255,150,120,0.45) 0%, rgba(220,120,140,0.28) 40%, rgba(180,100,160,0.12) 65%, transparent 85%)",
          }}
        />
        <div
          ref={msbHazeRef}
          className="pointer-events-none absolute inset-0 z-[4] opacity-0 will-change-[transform,opacity]"
          style={{
            background:
              "radial-gradient(ellipse 120% 85% at 50% 70%, rgba(60,80,140,0.45) 0%, rgba(40,55,110,0.32) 40%, rgba(25,35,80,0.18) 65%, transparent 90%)",
            filter: "blur(48px)",
          }}
        />

        {/* === ATMOSPHERE LAYER (z-20) — cinematic scene-cut wipes === */}
        {(() => {
          const goldenEdge =
            "radial-gradient(ellipse 90% 55% at 50% 100%, rgba(255,190,80,0.65) 0%, rgba(240,140,40,0.45) 30%, rgba(200,90,25,0.2) 55%, transparent 80%)";
          const goldenGlow =
            "radial-gradient(ellipse 85% 50% at 45% 95%, rgba(255,210,120,0.55) 0%, rgba(230,150,50,0.35) 40%, transparent 75%)";
          const goldenHaze =
            "radial-gradient(ellipse 100% 60% at 55% 90%, rgba(255,175,70,0.5) 0%, rgba(210,110,35,0.28) 45%, transparent 80%)";
          const twilightHaze =
            "radial-gradient(ellipse 95% 55% at 50% 50%, rgba(100,130,190,0.4) 0%, rgba(70,95,160,0.28) 40%, transparent 75%)";
          const twilightVeil =
            "radial-gradient(ellipse 90% 50% at 40% 55%, rgba(120,150,210,0.35) 0%, rgba(80,110,175,0.22) 45%, transparent 80%)";
          const twilightMist =
            "radial-gradient(ellipse 100% 55% at 60% 45%, rgba(90,120,180,0.32) 0%, rgba(60,85,145,0.18) 50%, transparent 85%)";
          const layerBase = "pointer-events-none absolute left-1/2 top-1/2 -ml-[100vw] -mt-[100vh] w-[200vw] h-[200vh] rounded-full opacity-0 blur-[120px]";
          const styleWithWillChange = { willChange: "transform, opacity", maskImage: "radial-gradient(ellipse 90% 90% at center, white 55%, transparent 100%)" };
          return (
            <>
              <div ref={sunsetAtmoBackRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: goldenEdge }} />
              <div ref={sunsetAtmoMidRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: goldenGlow }} />
              <div ref={sunsetAtmoFrontRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: goldenHaze }} />
              <div ref={twilightAtmoBackRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: twilightHaze }} />
              <div ref={twilightAtmoMidRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: twilightVeil }} />
              <div ref={twilightAtmoFrontRef} className={`${layerBase} z-20`} style={{ ...styleWithWillChange, background: twilightMist }} />
            </>
          );
        })()}

        <div
          ref={ambientFogRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-[70%] w-full opacity-0 will-change-[transform,opacity]"
          style={{
            willChange: "transform, opacity",
            background:
              "linear-gradient(to top, rgba(255,255,255,0.6) 0%, rgba(245,250,255,0.4) 35%, rgba(230,240,250,0.2) 65%, rgba(220,235,250,0) 100%)",
          }}
        />

        <div
          ref={statsRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-4 opacity-0 will-change-[transform,opacity] sm:px-6"
        >
          <div className="relative mx-auto max-w-3xl text-center">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[120%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(10,20,45,0.55) 0%, rgba(10,20,45,0.32) 40%, rgba(10,20,45,0) 70%)",
                filter: "blur(8px)",
              }}
            />
            <p className="font-display text-lg tracking-tighter text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-2xl sm:tracking-tight md:text-4xl">
              Инвестиции в проекты будущего
            </p>
            <div className="mt-4 flex flex-col items-stretch gap-4 rounded-2xl border border-white/30 bg-white/10 px-5 py-4 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:mt-6 sm:inline-flex sm:flex-row sm:gap-10 sm:rounded-3xl sm:px-8 sm:py-6">
              <div className="text-center">
                <div className="font-display text-3xl font-semibold tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl sm:tracking-tight md:text-5xl lg:text-6xl">
                  <span ref={count200Ref}>0+</span>
                </div>
                <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:mt-2 sm:text-[10px] sm:tracking-[0.25em]">
                  Проектов в реализации
                </div>
              </div>
              <div className="hidden h-px w-full bg-white/25 sm:block sm:h-auto sm:w-px" />
              <div className="text-center">
                <div className="font-display text-3xl font-semibold tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl sm:tracking-tight md:text-5xl lg:text-6xl">
                  <span ref={count8000Ref}>0</span>
                </div>
                <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:mt-2 sm:text-[10px] sm:tracking-[0.25em]">
                  Завершённых проектов
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === CONTENT LAYER (z-30) === */}
        <div
          ref={decreeRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-[25] -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
        >
          <p className="font-display text-sm tracking-tight text-[color:var(--primary)]/85 sm:text-base md:text-lg">
            Фонд учрежден постановлением
          </p>
          <h2 className="mt-2 font-display text-xl font-bold leading-snug tracking-tighter text-[color:var(--primary)] sm:text-2xl sm:tracking-tight md:text-4xl lg:text-5xl">
            Кабинета Министров Кыргызской Республики
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[11px] leading-relaxed tracking-tight text-[color:var(--ink)]/75 sm:mt-5 sm:text-xs md:text-sm">
            от 5 ноября 2024 года № 666 во исполнение Закона Кыргызской Республики
            «О Национальном инвестиционном фонде Кыргызской Республики» и Указа
            Президента Кыргызской Республики № 155 от 14 июня 2024 года.
          </p>
        </div>

        <div
          ref={aboutRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
        >
          <h2 className="font-display text-2xl font-bold tracking-tighter text-[color:var(--primary)] drop-shadow-[0_4px_30px_rgba(255,255,255,0.8)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.2em] lg:text-7xl">
            О ФОНДЕ
          </h2>
          <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-[color:var(--ink)]/85 sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
            Национальный инвестиционный фонд — стратегический институт развития,
            направляющий капитал в проекты, формирующие будущее Кыргызской Республики.
          </p>
        </div>

        <div
          ref={financeRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
        >
          <h2 className="font-display text-xl font-bold tracking-tighter text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] sm:text-3xl sm:tracking-tight md:text-5xl md:tracking-[0.18em] lg:text-6xl">
            ФИНАНСИРОВАНИЕ ПРОЕКТОВ
          </h2>
        </div>

        <div
          ref={directionsRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
        >
          <h2 className="font-display text-lg font-bold tracking-tighter text-white drop-shadow-[0_6px_36px_rgba(180,80,20,0.75)] sm:text-3xl sm:tracking-tight md:text-5xl md:tracking-[0.18em] lg:text-6xl">
            ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ
          </h2>
          <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-white/90 drop-shadow-[0_2px_14px_rgba(80,30,5,0.6)] sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
            Стратегические отрасли, где капитал фонда раскрывает потенциал экономики в золотом свете заката.
          </p>
        </div>

        <div
          ref={msbRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
        >
          <h2 className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-[0_6px_32px_rgba(40,60,120,0.7)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.18em] lg:text-7xl">
            ПРОЕКТЫ МСБ
          </h2>
          <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-white/88 drop-shadow-[0_2px_12px_rgba(20,30,60,0.65)] sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
            Поддержка малого и среднего бизнеса в мягком сумеречном свете — там, где идеи превращаются в устойчивый рост.
          </p>
        </div>

        <div
          ref={partnersRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6 text-center"
        >
          <div
            ref={partnersTextRef}
            className="opacity-0 will-change-[transform,opacity]"
          >
            <h2 className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-[0_8px_40px_rgba(120,140,200,0.35)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.18em] lg:text-7xl">
              ПАРТНЁРЫ
            </h2>
            <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-white/75 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
              Как огни города в полночь — партнёры фонда зажигают новые точки роста по всей республике.
            </p>
          </div>
          <div ref={partnerLogosRef} className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-6 md:gap-10">
            {["EBRD", "IFC", "ADB", "AIIB", "KfW"].map((name) => (
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

        {/* === CINEMATIC SLIDES — News & Contacts titles (midnight atmosphere) === */}
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

        {/* === FOOTER SLIDE — mountain reverse return (Lovable slot) === */}
        <div
          ref={footerContentZoneRef}
          id="footer-content-zone"
          data-lovable-slot="footer-content"
          aria-label="Footer content zone"
          className="pointer-events-none absolute inset-0 z-[35] overflow-hidden opacity-0 will-change-[transform,opacity]"
        >
          <img
            ref={footerMountainRef}
            src={mountains}
            alt=""
            aria-hidden
            className="w-full h-full object-cover absolute inset-0 will-change-transform"
            style={{ transformOrigin: "50% 70%" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/80" aria-hidden />
          <div
            className="pointer-events-auto absolute bottom-10 left-1/2 z-10 will-change-transform sm:bottom-12"
            style={{ transform: "translate3d(-50%, 0, 0)" }}
          >
            <button
              type="button"
              onClick={scrollToTop}
              data-cursor-hover
              aria-label="Вернуться наверх"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-transparent font-display text-[9px] font-semibold tracking-[0.28em] text-white transition-all duration-300 will-change-transform hover:scale-110 hover:border-white sm:h-16 sm:w-16 sm:text-[10px]"
            >
              <span className="sr-only">Вернуться наверх</span>
              <span aria-hidden className="text-base leading-none sm:text-lg">↑</span>
            </button>
          </div>
        </div>

        {(() => {
          const cloudWhite =
            "radial-gradient(ellipse 85% 65% at 50% 55%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.38) 35%, rgba(255,255,255,0.12) 65%, rgba(255,255,255,0) 100%)";
          const cloudBlue =
            "radial-gradient(ellipse 95% 70% at 45% 60%, rgba(224,242,254,0.4) 0%, rgba(214,232,248,0.28) 40%, rgba(200,222,242,0.08) 70%, rgba(200,222,242,0) 100%)";
          const cloudPlatinum =
            "radial-gradient(ellipse 100% 75% at 55% 50%, rgba(241,245,249,0.4) 0%, rgba(230,236,244,0.28) 40%, rgba(220,228,238,0.08) 70%, rgba(220,228,238,0) 100%)";
          const layerBase = "pointer-events-none absolute left-1/2 top-1/2 -ml-[100vw] -mt-[100vh] w-[200vw] h-[200vh] rounded-full opacity-0 blur-[140px]";
          const styleWithWillChange = { willChange: "transform, opacity", maskImage: "radial-gradient(ellipse 90% 90% at center, white 55%, transparent 100%)" };
          return (
            <>
              <div ref={wipe1HazeRef} className="hidden" />
              <div ref={wipe1BackRef} className={`${layerBase} z-[36]`} style={{ ...styleWithWillChange, background: cloudWhite }} />
              <div ref={wipe1MidRef} className={`${layerBase} z-[37]`} style={{ ...styleWithWillChange, background: cloudBlue }} />
              <div ref={wipe1FrontRef} className={`${layerBase} z-[38]`} style={{ ...styleWithWillChange, background: cloudPlatinum }} />

              <div
                ref={wipe2HazeRef}
                className="pointer-events-none absolute inset-0 z-[40] opacity-0 will-change-[transform,opacity]"
                style={{
                  willChange: "opacity",
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(245,250,255,0.45) 50%, rgba(235,242,250,0.35) 100%)",
                }}
              />
              <div ref={wipe2BackRef} className={`${layerBase} z-[41]`} style={{ ...styleWithWillChange, background: cloudWhite }} />
              <div ref={wipe2MidRef} className={`${layerBase} z-[42]`} style={{ ...styleWithWillChange, background: cloudBlue }} />
              <div ref={wipe2FrontRef} className={`${layerBase} z-[43]`} style={{ ...styleWithWillChange, background: cloudPlatinum }} />
            </>
          );
        })()}
      </div>
      </div>
    </div>
  );
}
