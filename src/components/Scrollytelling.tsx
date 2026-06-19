import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import mountains from "@/assets/mountains.jpg";

import kumtor from "@/assets/kumtor.jpg";
import earthCrust from "@/assets/earth-depths.jpg";
import cumulus from "@/assets/cumulus-clouds.png";
import magma from "@/assets/magma.jpg";

gsap.registerPlugin(ScrollTrigger);

function CountUp({ to, progress, suffix = "" }: { to: number; progress: number; suffix?: string }) {
  const eased = 1 - Math.pow(1 - Math.max(0, Math.min(1, progress)), 3);
  const val = Math.round(eased * to);
  return (
    <span>
      {val.toLocaleString("ru-RU").replace(",", " ")}
      {suffix}
    </span>
  );
}

export function Scrollytelling() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decreeRef = useRef<HTMLDivElement>(null);
  const cloudDriftRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  // background scene refs
  const kumtorRef = useRef<HTMLImageElement>(null);
  const crustRef = useRef<HTMLImageElement>(null);
  const magmaRef = useRef<HTMLImageElement>(null);

  // text scene refs
  const aboutRef = useRef<HTMLDivElement>(null);
  const financeRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<HTMLDivElement>(null);
  const msbRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  // Underground dark smoke layers (crust scene → magma transition)
  const undergroundSmokeBackRef = useRef<HTMLDivElement>(null);
  const undergroundSmokeMidRef = useRef<HTMLDivElement>(null);
  const undergroundSmokeFrontRef = useRef<HTMLDivElement>(null);
  // Hot smoke over magma (glowing veils)
  const magmaSmokeBackRef = useRef<HTMLDivElement>(null);
  const magmaSmokeFrontRef = useRef<HTMLDivElement>(null);

  // CLOUD WIPE LAYERS — each transition uses dedicated multi-layer fog (divs with CSS gradients)
  const wipe1BackRef = useRef<HTMLDivElement>(null);
  const wipe1MidRef = useRef<HTMLDivElement>(null);
  const wipe1FrontRef = useRef<HTMLDivElement>(null);
  const wipe1HazeRef = useRef<HTMLDivElement>(null);

  const wipe2BackRef = useRef<HTMLDivElement>(null);
  const wipe2MidRef = useRef<HTMLDivElement>(null);
  const wipe2FrontRef = useRef<HTMLDivElement>(null);
  const wipe2HazeRef = useRef<HTMLDivElement>(null);

  const wipe3BackRef = useRef<HTMLDivElement>(null);
  const wipe3MidRef = useRef<HTMLDivElement>(null);
  const wipe3FrontRef = useRef<HTMLDivElement>(null);
  const wipe3HazeRef = useRef<HTMLDivElement>(null);

  // ambient fog over mountains during decree
  const ambientFogRef = useRef<HTMLDivElement>(null);

  const [countProgress, setCountProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      // Viewport-aware parallax amplifier — bigger pans on desktop, gentler on mobile
      const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
      const panK = vw < 640 ? 0.55 : vw < 1024 ? 0.8 : vw < 1536 ? 1.15 : 1.35;
      const px = (v: number) => +(v * panK).toFixed(2);
      // Z-depth amplifier — extra scale push for foreground layers (camera-truck feel)
      const zK = vw < 640 ? 0.85 : vw < 1024 ? 1.0 : 1.15;
      const sz = (base: number) => +(1 + (base - 1) * zK).toFixed(3);

      gsap.to(cloudDriftRef.current, {
        xPercent: px(-8),
        duration: 60,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Subtle perpetual drift on ALL fog layers so they never look static
      [
        wipe1BackRef, wipe1MidRef, wipe1FrontRef,
        wipe2BackRef, wipe2MidRef, wipe2FrontRef,
        wipe3BackRef, wipe3MidRef, wipe3FrontRef,
        ambientFogRef,
        undergroundSmokeBackRef, undergroundSmokeMidRef, undergroundSmokeFrontRef,
        magmaSmokeBackRef, magmaSmokeFrontRef,
      ].forEach((r, i) => {
        if (r.current) {
          gsap.to(r.current, {
            xPercent: px(i % 2 === 0 ? 4 : -4),
            duration: 14 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });

      const computeBrandTarget = () => {
        const slot = document.getElementById("navbar-brand-slot");
        const el = brandRef.current;
        if (!slot || !el) return { x: 0, y: 0, scale: 1 };
        const slotRect = slot.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const targetScale = elRect.width > 0 ? (slotRect.width / elRect.width) * 0.95 : 0.22;
        const scaledW = elRect.width * targetScale;
        const cx = elRect.left + elRect.width / 2;
        const cy = elRect.top + elRect.height / 2;
        const tx = slotRect.left + scaledW / 2;
        const ty = slotRect.top + slotRect.height / 2;
        return { x: tx - cx, y: ty - cy, scale: targetScale };
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=10000",
          scrub: 1.2,
          pin: sceneRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // BRAND dock 0 → 0.08
      tl.to(
        brandRef.current,
        {
          duration: 0.08,
          ease: "none",
          x: () => computeBrandTarget().x,
          y: () => computeBrandTarget().y,
          scale: () => computeBrandTarget().scale,
          letterSpacing: "0.04em",
        },
        0
      );

      // ============ SCENE 1 — Mountains + stats (0 → 0.22) ============
      tl.to(mountainRef.current, { scale: sz(1.25), xPercent: px(-6), duration: 0.22, ease: "none" }, 0);
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 30, xPercent: px(4) },
        { opacity: 1, y: 0, xPercent: px(-3), duration: 0.10, ease: "power1.out" },
        0.10
      );

      tl.fromTo(
        ambientFogRef.current,
        { opacity: 0, yPercent: 30, xPercent: px(-8) },
        { opacity: 0.55, yPercent: 0, xPercent: px(6), duration: 0.16, ease: "none" },
        0.06
      );

      // ============ WIPE 1 ============
      tl.to(statsRef.current, { opacity: 0, y: -20, duration: 0.08, ease: "none" }, 0.22);

      tl.fromTo(
        wipe1BackRef.current,
        { yPercent: 110, opacity: 0, scale: sz(1.1) },
        { yPercent: -20, opacity: 0.62, scale: sz(1.3), duration: 0.16, ease: "power2.inOut" },
        0.22
      );
      tl.fromTo(
        wipe1MidRef.current,
        { yPercent: 130, xPercent: px(-10), opacity: 0, scale: sz(1.25) },
        { yPercent: -5, xPercent: px(8), opacity: 0.47, scale: sz(1.5), duration: 0.14, ease: "power2.inOut" },
        0.24
      );
      tl.fromTo(
        wipe1FrontRef.current,
        { yPercent: 150, xPercent: px(15), opacity: 0, scale: sz(1.4) },
        { yPercent: -30, xPercent: px(-8), opacity: 0.57, scale: sz(1.7), duration: 0.18, ease: "power2.inOut" },
        0.25
      );
      tl.set(wipe1HazeRef.current, { opacity: 0 }, 0.22);

      tl.fromTo(
        aboutRef.current,
        { opacity: 0, y: 40, xPercent: px(5), filter: "blur(20px)" },
        { opacity: 1, y: 0, xPercent: px(-2), filter: "blur(0px)", duration: 0.12, ease: "power2.out" },
        0.31
      );
      tl.to(wipe1HazeRef.current, { opacity: 0, duration: 0.10, ease: "power1.out" }, 0.32);
      tl.to(wipe1BackRef.current, { yPercent: -110, xPercent: px(12), opacity: 0, duration: 0.12, ease: "power2.in" }, 0.32);
      tl.to(wipe1MidRef.current, { yPercent: -120, xPercent: px(-14), opacity: 0, duration: 0.12, ease: "power2.in" }, 0.33);
      tl.to(wipe1FrontRef.current, { yPercent: -130, xPercent: px(16), opacity: 0, duration: 0.12, ease: "power2.in" }, 0.34);

      // ============ Hold "О ФОНДЕ" briefly (0.40 → 0.48) ============
      tl.to({}, { duration: 0.08 }, 0.40);

      // ============ WIPE 2 — Clouds engulf About, reveal Kumtor + "ФИНАНСИРОВАНИЕ" (0.48 → 0.66) ============
      tl.to(aboutRef.current, { opacity: 0, y: -30, filter: "blur(12px)", duration: 0.08, ease: "none" }, 0.48);

      tl.fromTo(
        wipe2BackRef.current,
        { yPercent: 110, opacity: 0, scale: sz(1.1) },
        { yPercent: -25, opacity: 0.62, scale: sz(1.35), duration: 0.18, ease: "power2.inOut" },
        0.48
      );
      tl.fromTo(
        wipe2MidRef.current,
        { yPercent: 135, xPercent: px(10), opacity: 0, scale: sz(1.3) },
        { yPercent: -5, xPercent: px(-10), opacity: 0.47, scale: sz(1.55), duration: 0.15, ease: "power2.inOut" },
        0.50
      );
      tl.fromTo(
        wipe2FrontRef.current,
        { yPercent: 155, xPercent: px(-15), opacity: 0, scale: sz(1.5) },
        { yPercent: -35, xPercent: px(10), opacity: 0.57, scale: sz(1.75), duration: 0.2, ease: "power2.inOut" },
        0.51
      );
      tl.set(wipe2HazeRef.current, { opacity: 0 }, 0.48);

      tl.to(mountainRef.current, { opacity: 0, duration: 0.08, ease: "power1.inOut" }, 0.54);
      tl.to(ambientFogRef.current, { opacity: 0, duration: 0.08, ease: "power1.inOut" }, 0.54);
      tl.fromTo(
        kumtorRef.current,
        { opacity: 0, scale: sz(1.15), xPercent: px(4) },
        { opacity: 1, scale: sz(1.05), xPercent: 0, duration: 0.12, ease: "power2.out" },
        0.55
      );

      tl.fromTo(
        financeRef.current,
        { opacity: 0, y: 40, xPercent: px(5), filter: "blur(20px)" },
        { opacity: 1, y: 0, xPercent: px(-2), filter: "blur(0px)", duration: 0.12, ease: "power2.out" },
        0.59
      );

      tl.to(wipe2HazeRef.current, { opacity: 0, duration: 0.12, ease: "power1.out" }, 0.60);
      tl.to(wipe2BackRef.current, { yPercent: -120, xPercent: px(14), opacity: 0, duration: 0.14, ease: "power2.in" }, 0.60);
      tl.to(wipe2MidRef.current, { yPercent: -130, xPercent: px(-16), opacity: 0, duration: 0.14, ease: "power2.in" }, 0.61);
      tl.to(wipe2FrontRef.current, { yPercent: -140, xPercent: px(18), opacity: 0, duration: 0.14, ease: "power2.in" }, 0.62);

      // ============ CINEMAGRAPH HOLD — Kumtor breathes alive (0.66 → 0.74) ============
      tl.to(kumtorRef.current, { scale: sz(1.10), xPercent: px(-3), duration: 0.08, ease: "sine.inOut" }, 0.66);
      tl.to(financeRef.current, { xPercent: px(-5), duration: 0.08, ease: "sine.inOut" }, 0.66);

      // ============ WIPE 3 — Realistic cumulus clouds engulf, swap to earth depths, clouds fly up (0.74 → 0.94) ============
      tl.to(financeRef.current, { opacity: 0, y: -30, filter: "blur(12px)", duration: 0.08, ease: "none" }, 0.74);

      // TOP cumulus strip slides down from above + drifts RIGHT (foreground parallax)
      tl.fromTo(
        wipe3BackRef.current,
        { yPercent: -120, xPercent: px(-8), opacity: 0, scale: sz(1.15) },
        { yPercent: -10, xPercent: px(6), opacity: 0.28, scale: sz(1.05), duration: 0.18, ease: "power2.out" },
        0.74
      );
      tl.fromTo(
        wipe3MidRef.current,
        { yPercent: 120, xPercent: px(-10), opacity: 0, scale: sz(1.15) },
        { yPercent: 10, xPercent: px(8), opacity: 0.26, scale: sz(1.05), duration: 0.18, ease: "power2.out" },
        0.74
      );
      tl.fromTo(
        wipe3FrontRef.current,
        { yPercent: 40, xPercent: px(6), opacity: 0, scale: sz(1.3) },
        { yPercent: 0, xPercent: px(-5), opacity: 0.18, scale: sz(1.1), duration: 0.16, ease: "power2.out" },
        0.76
      );
      tl.set(wipe3HazeRef.current, { opacity: 0 }, 0.74);

      // SWAP behind translucent clouds — Kumtor scales up & spreads apart, earth depths emerge
      tl.to(
        kumtorRef.current,
        { scale: sz(1.6), xPercent: 0, filter: "blur(8px)", duration: 0.14, ease: "power2.in" },
        0.74
      );
      tl.to(
        kumtorRef.current,
        { opacity: 0, scale: sz(2.1), filter: "blur(20px)", duration: 0.08, ease: "power2.in" },
        0.80
      );
      tl.fromTo(
        crustRef.current,
        { opacity: 0, scale: sz(1.25), filter: "blur(16px)" },
        { opacity: 1, scale: 1.0, filter: "blur(0px)", duration: 0.08, ease: "power2.out" },
        0.80
      );
      tl.to(sceneRef.current, { backgroundColor: "#0a0806", duration: 0.14, ease: "none" }, 0.74);

      // Light clouds fly UP and away with strong sideways depth — opposing X for true parallax
      tl.to(wipe3BackRef.current, { yPercent: -180, xPercent: px(18), opacity: 0, scale: sz(1.3), duration: 0.14, ease: "power2.in" }, 0.80);
      tl.to(wipe3FrontRef.current, { yPercent: -200, xPercent: px(-22), opacity: 0, scale: sz(1.4), duration: 0.14, ease: "power2.in" }, 0.80);
      tl.to(wipe3MidRef.current, { yPercent: -220, xPercent: px(20), opacity: 0, scale: sz(1.5), duration: 0.14, ease: "power2.in" }, 0.80);


      // Directions title emerges from dark depths — perfectly synced: swap completes at 0.88
      tl.fromTo(
        directionsRef.current,
        { opacity: 0, y: 60, filter: "blur(24px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.06, ease: "power2.out" },
        0.86
      );

      // ============ UNDERGROUND SCENE — dark smoke rises over crust (0.88 → 0.91) ============
      // Continuous slight X-pan on crust (camera in confined space)
      tl.to(crustRef.current, { xPercent: px(5), scale: sz(1.08), duration: 0.10, ease: "sine.inOut" }, 0.88);
      tl.to(directionsRef.current, { xPercent: px(-4), duration: 0.10, ease: "sine.inOut" }, 0.88);

      tl.fromTo(
        undergroundSmokeBackRef.current,
        { opacity: 0, xPercent: px(-10), yPercent: 20 },
        { opacity: 0.42, xPercent: px(8), yPercent: -4, duration: 0.10, ease: "power1.out" },
        0.88
      );
      tl.fromTo(
        undergroundSmokeMidRef.current,
        { opacity: 0, xPercent: px(12), yPercent: 30 },
        { opacity: 0.40, xPercent: px(-10), yPercent: 0, duration: 0.10, ease: "power1.out" },
        0.89
      );
      tl.fromTo(
        undergroundSmokeFrontRef.current,
        { opacity: 0, xPercent: px(-8), yPercent: 40 },
        { opacity: 0.45, xPercent: px(10), yPercent: -6, duration: 0.10, ease: "power1.out" },
        0.90
      );

      // ============ SCENE: ПРОЕКТЫ МСБ (0.91 → 0.945) ============
      // Direction title fades, camera tilts deeper into the crust, MSB title rises
      tl.to(directionsRef.current, { opacity: 0, y: -30, xPercent: px(-8), filter: "blur(10px)", duration: 0.025, ease: "power2.in" }, 0.91);

      // Camera continues drift sideways + slight zoom — same crust scene, deeper feel
      tl.to(crustRef.current, { xPercent: px(-4), scale: sz(1.14), yPercent: -4, duration: 0.04, ease: "sine.inOut" }, 0.91);

      // Smoke keeps panning horizontally around the new text
      tl.to(undergroundSmokeBackRef.current, { xPercent: px(-8), opacity: 0.4, duration: 0.04, ease: "sine.inOut" }, 0.91);
      tl.to(undergroundSmokeMidRef.current, { xPercent: px(10), opacity: 0.38, duration: 0.04, ease: "sine.inOut" }, 0.91);
      tl.to(undergroundSmokeFrontRef.current, { xPercent: px(-12), opacity: 0.42, duration: 0.04, ease: "sine.inOut" }, 0.91);

      tl.fromTo(
        msbRef.current,
        { opacity: 0, y: 50, xPercent: px(6), filter: "blur(22px)" },
        { opacity: 1, y: 0, xPercent: px(-3), filter: "blur(0px)", duration: 0.03, ease: "power2.out" },
        0.915
      );

      // Hold МСБ briefly with gentle continued drift (cinemagraph feel)
      tl.to(msbRef.current, { xPercent: px(-6), duration: 0.025, ease: "sine.inOut" }, 0.945);
      tl.to(crustRef.current, { xPercent: px(-2), duration: 0.025, ease: "sine.inOut" }, 0.945);

      // ============ TRANSITION — Crust flies UP, smoke warms to golden-orange (0.96 → 0.98) ============
      tl.to(msbRef.current, { opacity: 0, y: -40, xPercent: px(-12), filter: "blur(10px)", duration: 0.02, ease: "none" }, 0.96);
      tl.to(crustRef.current, { yPercent: -80, scale: sz(1.35), opacity: 0, filter: "blur(14px)", duration: 0.025, ease: "power2.in" }, 0.96);

      // Smoke densifies and shifts to warm golden glow, lit from below
      tl.to(undergroundSmokeBackRef.current,
        { opacity: 0.55, backgroundColor: "rgba(120, 60, 20, 0.55)", yPercent: 10, duration: 0.025, ease: "none" }, 0.96);
      tl.to(undergroundSmokeMidRef.current,
        { opacity: 0.5, backgroundColor: "rgba(180, 95, 30, 0.5)", yPercent: 15, duration: 0.025, ease: "none" }, 0.96);
      tl.to(undergroundSmokeFrontRef.current,
        { opacity: 0.6, backgroundColor: "rgba(230, 140, 45, 0.55)", yPercent: 20, duration: 0.025, ease: "none" }, 0.96);

      tl.to(sceneRef.current, { backgroundColor: "#1a0a05", duration: 0.025, ease: "none" }, 0.96);

      // Magma rises from blur beneath the warm smoke
      tl.fromTo(
        magmaRef.current,
        { opacity: 0, scale: sz(1.2), filter: "blur(22px)", xPercent: px(4) },
        { opacity: 1, scale: sz(1.05), filter: "blur(0px)", xPercent: 0, duration: 0.03, ease: "power2.out" },
        0.97
      );

      // Smoke fades back so magma reads, but stays as glowing veil
      tl.to(undergroundSmokeBackRef.current, { opacity: 0.22, yPercent: -30, duration: 0.025, ease: "power1.out" }, 0.98);
      tl.to(undergroundSmokeMidRef.current, { opacity: 0.18, yPercent: -40, duration: 0.025, ease: "power1.out" }, 0.98);
      tl.to(undergroundSmokeFrontRef.current, { opacity: 0.25, yPercent: -25, duration: 0.025, ease: "power1.out" }, 0.98);

      // ============ MAGMA CINEMAGRAPH — slow scale + hot smoke drifts (0.98 → 1.0) ============
      tl.fromTo(
        magmaSmokeBackRef.current,
        { opacity: 0, xPercent: px(-12), yPercent: 10 },
        { opacity: 0.4, xPercent: px(10), yPercent: -8, duration: 0.03, ease: "sine.inOut" },
        0.98
      );
      tl.fromTo(
        magmaSmokeFrontRef.current,
        { opacity: 0, xPercent: px(14), yPercent: -10 },
        { opacity: 0.35, xPercent: px(-12), yPercent: 6, duration: 0.03, ease: "sine.inOut" },
        0.98
      );

      // Magma breathes: very slow scale + subtle X-pan
      tl.to(magmaRef.current, { scale: sz(1.12), xPercent: px(4), duration: 0.02, ease: "sine.inOut" }, 0.98);

      // Partners title appears with opposing X-pan (text slides LEFT, image RIGHT)
      tl.fromTo(
        partnersRef.current,
        { opacity: 0, y: 50, xPercent: px(6), filter: "blur(20px)" },
        { opacity: 1, y: 0, xPercent: px(-3), filter: "blur(0px)", duration: 0.025, ease: "power2.out" },
        0.98
      );


      // Decree text — re-purposed: shown over mountains briefly between scene 1 & wipe1
      tl.fromTo(
        decreeRef.current,
        { opacity: 0, y: 40 },
        { opacity: 0, duration: 0.01 },
        0
      );
    }, rootRef);

    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: "+=10000",
      onUpdate: (self) => {
        const p = (self.progress - 0.10) / 0.14;
        setCountProgress(Math.max(0, Math.min(1, p)));
      },
    });

    return () => {
      st.kill();
      ctx.revert();
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-x-hidden" style={{ height: "10500px" }}>
      <div
        ref={sceneRef}
        className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#dbe6f1] via-[#e9eef5] to-[#f3f1e8]"
      >
        {/* Ambient drifting CSS clouds — no image, just blurred gradient blobs */}
        <div ref={cloudDriftRef} className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          <div className="absolute left-[-10%] top-[12%] h-[28vh] w-[55vw] rounded-full bg-gradient-to-t from-white/70 via-white/40 to-transparent blur-[150px] scale-150" style={{ maskImage: "radial-gradient(ellipse 100% 100% at center, white 60%, transparent 100%)" }} />
          <div className="absolute right-[-8%] top-[22%] h-[24vh] w-[45vw] rounded-full bg-gradient-to-t from-white/60 via-white/30 to-transparent blur-[150px] scale-150" style={{ maskImage: "radial-gradient(ellipse 100% 100% at center, white 60%, transparent 100%)" }} />
          <div className="absolute left-[20%] top-[6%] h-[18vh] w-[35vw] rounded-full bg-gradient-to-t from-white/50 via-white/25 to-transparent blur-[150px] scale-150" style={{ maskImage: "radial-gradient(ellipse 100% 100% at center, white 60%, transparent 100%)" }} />
        </div>


        {/* === BACKGROUND LAYERS === */}
        <img
          ref={mountainRef}
          src={mountains}
          alt="Горы"
          className="absolute inset-0 h-full w-full object-cover object-bottom will-change-transform"
          style={{ transformOrigin: "50% 70%" }}
        />
        <img
          ref={kumtorRef}
          src={kumtor}
          alt="Золоторудный комбинат Кумтор"
          className="absolute inset-0 h-full w-full object-cover opacity-0 will-change-transform"
          style={{ transformOrigin: "50% 60%" }}
        />
        <img
          ref={crustRef}
          src={earthCrust}
          alt="Земная кора в разрезе"
          className="absolute inset-0 h-full w-full object-cover opacity-0 will-change-transform"
          style={{ transformOrigin: "50% 50%" }}
        />
        <img
          ref={magmaRef}
          src={magma}
          alt="Плавящаяся магма"
          className="absolute inset-0 h-full w-full object-cover opacity-0 will-change-transform"
          style={{ transformOrigin: "50% 60%" }}
        />

        {/* Underground dark smoke layers (over crust → warms to gold) */}
        <div
          ref={undergroundSmokeBackRef}
          className="pointer-events-none absolute inset-0 z-[9] opacity-0"
          style={{
            willChange: "transform, opacity, background-color",
            backgroundColor: "rgba(20, 16, 14, 0.5)",
            filter: "blur(80px)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 60%, black 40%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 60%, black 40%, transparent 100%)",
          }}
        />
        <div
          ref={undergroundSmokeMidRef}
          className="pointer-events-none absolute inset-0 z-[10] opacity-0"
          style={{
            willChange: "transform, opacity, background-color",
            backgroundColor: "rgba(30, 22, 18, 0.45)",
            filter: "blur(110px)",
            WebkitMaskImage: "radial-gradient(ellipse 100% 90% at 50% 50%, black 30%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 100% 90% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
        <div
          ref={undergroundSmokeFrontRef}
          className="pointer-events-none absolute inset-0 z-[11] opacity-0"
          style={{
            willChange: "transform, opacity, background-color",
            backgroundColor: "rgba(40, 28, 20, 0.5)",
            filter: "blur(90px)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 25%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 25%, transparent 100%)",
          }}
        />

        {/* Hot smoke veils over magma */}
        <div
          ref={magmaSmokeBackRef}
          className="pointer-events-none absolute inset-0 z-[12] opacity-0"
          style={{
            willChange: "transform, opacity",
            background:
              "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(255, 160, 70, 0.35) 0%, rgba(200, 80, 30, 0.18) 45%, transparent 80%)",
            filter: "blur(60px)",
            mixBlendMode: "screen",
          }}
        />
        <div
          ref={magmaSmokeFrontRef}
          className="pointer-events-none absolute inset-0 z-[13] opacity-0"
          style={{
            willChange: "transform, opacity",
            background:
              "radial-gradient(ellipse 70% 50% at 50% 70%, rgba(255, 90, 30, 0.3) 0%, rgba(120, 40, 15, 0.15) 50%, transparent 85%)",
            filter: "blur(80px)",
            mixBlendMode: "screen",
          }}
        />

        {/* Ambient fog over mountains — soft gradient, no hard edges */}
        <div
          ref={ambientFogRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-[70%] w-full opacity-0"
          style={{
            willChange: "transform, opacity",
            background:
              "linear-gradient(to top, rgba(255,255,255,0.6) 0%, rgba(245,250,255,0.4) 35%, rgba(230,240,250,0.2) 65%, rgba(220,235,250,0) 100%)",
          }}
        />


        {/* BRAND TITLE */}
        <div
          ref={brandRef}
          className="pointer-events-none absolute left-1/2 top-[42%] z-[60] -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
          style={{ transformOrigin: "50% 50%" }}
        >
          <h1 className="text-center font-display text-[clamp(1.4rem,3.4vw,2.8rem)] font-bold leading-[1.15] tracking-[0.08em] text-white drop-shadow-[0_8px_32px_rgba(20,40,90,0.55)]">
            НАЦИОНАЛЬНЫЙ<br />
            ИНВЕСТИЦИОННЫЙ ФОНД<br />
            КЫРГЫЗСКОЙ РЕСПУБЛИКИ
          </h1>
        </div>

        {/* Stats (Scene 1) */}
        <div
          ref={statsRef}
          className="pointer-events-none absolute inset-x-0 top-[52%] z-20 px-6 opacity-0"
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
            <p className="font-display text-2xl text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] md:text-4xl">
              Инвестиции в проекты будущего
            </p>
            <div className="mt-6 inline-flex items-stretch gap-10 rounded-3xl border border-white/30 bg-white/10 px-8 py-6 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="text-center">
                <div className="font-display text-5xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] md:text-6xl">
                  <CountUp to={200} progress={countProgress} suffix="+" />
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/85">
                  Проектов в реализации
                </div>
              </div>
              <div className="w-px bg-white/25" />
              <div className="text-center">
                <div className="font-display text-5xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] md:text-6xl">
                  <CountUp to={8000} progress={countProgress} />
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/85">
                  Завершённых проектов
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === TEXT SCENES (z-[30]) === */}
        <div
          ref={aboutRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-[30] -translate-y-1/2 px-6 text-center opacity-0"
        >
          <h2 className="font-display text-4xl font-bold tracking-[0.2em] text-[color:var(--primary)] drop-shadow-[0_4px_30px_rgba(255,255,255,0.8)] md:text-6xl">
            О ФОНДЕ
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[color:var(--ink)]/85 md:text-base">
            Национальный инвестиционный фонд — стратегический институт развития,
            направляющий капитал в проекты, формирующие будущее Кыргызской Республики.
          </p>
        </div>

        <div
          ref={financeRef}
          className="pointer-events-none absolute inset-x-0 top-[40%] z-[30] px-6 text-center opacity-0"
        >
          <h2 className="font-display text-4xl font-bold tracking-[0.18em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] md:text-6xl">
            ФИНАНСИРОВАНИЕ ПРОЕКТОВ
          </h2>
        </div>

        <div
          ref={directionsRef}
          className="pointer-events-none absolute inset-x-0 top-[38%] z-[30] px-6 text-center opacity-0"
        >
          <h2 className="font-display text-4xl font-bold tracking-[0.16em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.75)] md:text-6xl">
            ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] md:text-base">
            Инвестиции в недра — золото, медь, редкоземельные металлы и стратегические ресурсы Кыргызстана.
          </p>
        </div>

        <div
          ref={partnersRef}
          className="pointer-events-none absolute inset-x-0 top-[40%] z-[30] px-6 text-center opacity-0"
        >
          <h2 className="font-display text-4xl font-bold tracking-[0.18em] text-white drop-shadow-[0_8px_40px_rgba(255,90,30,0.6)] md:text-6xl">
            ПАРТНЁРЫ
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] md:text-base">
            Глубоко под поверхностью — энергия, что движет будущее. Вместе с партнёрами фонд превращает её в реальные проекты.
          </p>
        </div>

        {/* hidden decree placeholder */}
        <div ref={decreeRef} className="hidden" />

        {/* ============ CLOUD WIPE LAYERS — pure CSS gradients (no hard edges) ============ */}
        {(() => {
          // Three tinted translucent cloud layers — never fully opaque so the scene behind shows through
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
              {/* WIPE 1 — Mountains → About */}
              <div ref={wipe1HazeRef} className="hidden" />
              <div ref={wipe1BackRef} className={`${layerBase} z-[36]`} style={{ ...styleWithWillChange, background: cloudWhite }} />
              <div ref={wipe1MidRef} className={`${layerBase} z-[37]`} style={{ ...styleWithWillChange, background: cloudBlue }} />
              <div ref={wipe1FrontRef} className={`${layerBase} z-[38]`} style={{ ...styleWithWillChange, background: cloudPlatinum }} />

              {/* WIPE 2 — About → Kumtor */}
              <div ref={wipe2HazeRef} className="hidden" />
              <div ref={wipe2BackRef} className={`${layerBase} z-[41]`} style={{ ...styleWithWillChange, background: cloudWhite }} />
              <div ref={wipe2MidRef} className={`${layerBase} z-[42]`} style={{ ...styleWithWillChange, background: cloudBlue }} />
              <div ref={wipe2FrontRef} className={`${layerBase} z-[43]`} style={{ ...styleWithWillChange, background: cloudPlatinum }} />

              {/* WIPE 3 — Kumtor → Earth Depths: realistic cumulus strips converge then fly up */}
              <div ref={wipe3HazeRef} className="hidden" />
              {/* TOP cumulus strip — flipped so puffy edge faces down, edges fade to transparent */}
              <div
                ref={wipe3BackRef}
                className="pointer-events-none absolute left-[-10%] top-[-15%] z-[46] h-[85vh] w-[120vw] opacity-0"
                style={{
                  willChange: "transform, opacity",
                  backgroundImage: `url(${cumulus})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  backgroundRepeat: "no-repeat",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 22%, rgba(0,0,0,0.85) 70%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 22%, rgba(0,0,0,0.85) 70%, transparent 100%)",
                  filter: "blur(2px) drop-shadow(0 20px 40px rgba(40,55,80,0.2))",
                }}
              />
              {/* BOTTOM cumulus strip — edges fade to transparent */}
              <div
                ref={wipe3MidRef}
                className="pointer-events-none absolute left-[-10%] bottom-[-15%] z-[47] h-[90vh] w-[120vw] opacity-0"
                style={{
                  willChange: "transform, opacity",
                  backgroundImage: `url(${cumulus})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  backgroundRepeat: "no-repeat",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.85) 72%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.85) 72%, transparent 100%)",
                  filter: "blur(2px) drop-shadow(0 -20px 40px rgba(40,55,80,0.2))",
                }}
              />
              {/* CENTER soft veil — radial mask, fully translucent */}
              <div
                ref={wipe3FrontRef}
                className="pointer-events-none absolute left-[-15%] top-[5%] z-[48] h-[95vh] w-[130vw] opacity-0"
                style={{
                  willChange: "transform, opacity",
                  backgroundImage: `url(${cumulus})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)",
                  maskImage:
                    "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)",
                  filter: "blur(3px)",
                }}
              />


            </>
          );
        })()}
      </div>
    </div>
  );
}
