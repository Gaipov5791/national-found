import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import mountains from "@/assets/mountains.jpg";

import kumtor from "@/assets/kumtor.jpg";
import earthCrust from "@/assets/earth-depths.jpg";
import cumulus from "@/assets/cumulus-clouds.png";

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

  // text scene refs
  const aboutRef = useRef<HTMLDivElement>(null);
  const financeRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<HTMLDivElement>(null);

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
      gsap.to(cloudDriftRef.current, {
        xPercent: -8,
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
      ].forEach((r, i) => {
        if (r.current) {
          gsap.to(r.current, {
            xPercent: i % 2 === 0 ? 4 : -4,
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
          end: "+=7200",
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
      // mountains zoom in AND pan left for cinematic camera drift
      tl.to(mountainRef.current, { scale: 1.25, xPercent: -6, duration: 0.22, ease: "none" }, 0);
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 30, xPercent: 4 },
        { opacity: 1, y: 0, xPercent: -3, duration: 0.10, ease: "power1.out" },
        0.10
      );

      // ambient fog drifts over mountain peaks — slow horizontal pan RIGHT (0.06 → 0.22)
      tl.fromTo(
        ambientFogRef.current,
        { opacity: 0, yPercent: 30, xPercent: -8 },
        { opacity: 0.55, yPercent: 0, xPercent: 6, duration: 0.16, ease: "none" },
        0.06
      );

      // ============ WIPE 1 — Clouds engulf stats, reveal "О ФОНДЕ" (0.22 → 0.40) ============
      // Stats fade as fog rolls in
      tl.to(statsRef.current, { opacity: 0, y: -20, duration: 0.08, ease: "none" }, 0.22);

      // Three cloud layers — independent parallax speeds, NEVER fully opaque (max ~0.75)
      tl.fromTo(
        wipe1BackRef.current,
        { yPercent: 110, opacity: 0, scale: 1.1 },
        { yPercent: -20, opacity: 0.62, scale: 1.3, duration: 0.16, ease: "power2.inOut" },
        0.22
      );
      tl.fromTo(
        wipe1MidRef.current,
        { yPercent: 130, xPercent: -10, opacity: 0, scale: 1.25 },
        { yPercent: -5, xPercent: 8, opacity: 0.47, scale: 1.5, duration: 0.14, ease: "power2.inOut" },
        0.24
      );
      tl.fromTo(
        wipe1FrontRef.current,
        { yPercent: 150, xPercent: 15, opacity: 0, scale: 1.4 },
        { yPercent: -30, xPercent: -8, opacity: 0.57, scale: 1.7, duration: 0.18, ease: "power2.inOut" },
        0.25
      );
      // haze disabled to avoid solid white wash
      tl.set(wipe1HazeRef.current, { opacity: 0 }, 0.22);

      // At max density (0.31) swap mountains → keep mountains but they'll be hidden
      // About emerges through dissipating clouds (0.31 → 0.40)
      tl.fromTo(
        aboutRef.current,
        { opacity: 0, y: 40, xPercent: 5, filter: "blur(20px)" },
        { opacity: 1, y: 0, xPercent: -2, filter: "blur(0px)", duration: 0.12, ease: "power2.out" },
        0.31
      );
      // Clouds dissipate upward & drift apart horizontally
      tl.to(wipe1HazeRef.current, { opacity: 0, duration: 0.10, ease: "power1.out" }, 0.32);
      tl.to(wipe1BackRef.current, { yPercent: -110, xPercent: 12, opacity: 0, duration: 0.12, ease: "power2.in" }, 0.32);
      tl.to(wipe1MidRef.current, { yPercent: -120, xPercent: -14, opacity: 0, duration: 0.12, ease: "power2.in" }, 0.33);
      tl.to(wipe1FrontRef.current, { yPercent: -130, xPercent: 16, opacity: 0, duration: 0.12, ease: "power2.in" }, 0.34);

      // ============ Hold "О ФОНДЕ" briefly (0.40 → 0.48) ============
      tl.to({}, { duration: 0.08 }, 0.40);

      // ============ WIPE 2 — Clouds engulf About, reveal Kumtor + "ФИНАНСИРОВАНИЕ" (0.48 → 0.66) ============
      tl.to(aboutRef.current, { opacity: 0, y: -30, filter: "blur(12px)", duration: 0.08, ease: "none" }, 0.48);

      tl.fromTo(
        wipe2BackRef.current,
        { yPercent: 110, opacity: 0, scale: 1.1 },
        { yPercent: -25, opacity: 0.62, scale: 1.35, duration: 0.18, ease: "power2.inOut" },
        0.48
      );
      tl.fromTo(
        wipe2MidRef.current,
        { yPercent: 135, xPercent: 10, opacity: 0, scale: 1.3 },
        { yPercent: -5, xPercent: -10, opacity: 0.47, scale: 1.55, duration: 0.15, ease: "power2.inOut" },
        0.50
      );
      tl.fromTo(
        wipe2FrontRef.current,
        { yPercent: 155, xPercent: -15, opacity: 0, scale: 1.5 },
        { yPercent: -35, xPercent: 10, opacity: 0.57, scale: 1.75, duration: 0.2, ease: "power2.inOut" },
        0.51
      );
      tl.set(wipe2HazeRef.current, { opacity: 0 }, 0.48);

      // SWAP background — gentle crossfade BEHIND translucent clouds (peak density 0.55-0.58)
      tl.to(mountainRef.current, { opacity: 0, duration: 0.08, ease: "power1.inOut" }, 0.54);
      tl.to(ambientFogRef.current, { opacity: 0, duration: 0.08, ease: "power1.inOut" }, 0.54);
      tl.fromTo(
        kumtorRef.current,
        { opacity: 0, scale: 1.15, xPercent: 4 },
        { opacity: 1, scale: 1.05, xPercent: 0, duration: 0.12, ease: "power2.out" },
        0.55
      );

      // Finance title emerges through dispersing clouds — drifts slightly LEFT
      tl.fromTo(
        financeRef.current,
        { opacity: 0, y: 40, xPercent: 5, filter: "blur(20px)" },
        { opacity: 1, y: 0, xPercent: -2, filter: "blur(0px)", duration: 0.12, ease: "power2.out" },
        0.59
      );

      // Clouds dissipate
      tl.to(wipe2HazeRef.current, { opacity: 0, duration: 0.12, ease: "power1.out" }, 0.60);
      tl.to(wipe2BackRef.current, { yPercent: -120, xPercent: 14, opacity: 0, duration: 0.14, ease: "power2.in" }, 0.60);
      tl.to(wipe2MidRef.current, { yPercent: -130, xPercent: -16, opacity: 0, duration: 0.14, ease: "power2.in" }, 0.61);
      tl.to(wipe2FrontRef.current, { yPercent: -140, xPercent: 18, opacity: 0, duration: 0.14, ease: "power2.in" }, 0.62);

      // ============ CINEMAGRAPH HOLD — Kumtor breathes alive (0.66 → 0.74) ============
      // subtle continuous zoom 1.05 → 1.10 + slow left drift
      tl.to(kumtorRef.current, { scale: 1.10, xPercent: -3, duration: 0.08, ease: "sine.inOut" }, 0.66);
      // finance card drifts gently LEFT against the camera
      tl.to(financeRef.current, { xPercent: -5, duration: 0.08, ease: "sine.inOut" }, 0.66);

      // ============ WIPE 3 — Realistic cumulus clouds engulf, swap to earth depths, clouds fly up (0.74 → 0.94) ============
      tl.to(financeRef.current, { opacity: 0, y: -30, filter: "blur(12px)", duration: 0.08, ease: "none" }, 0.74);

      // TOP cumulus strip slides down from above — light & airy (max 0.28)
      tl.fromTo(
        wipe3BackRef.current,
        { yPercent: -120, opacity: 0, scale: 1.15 },
        { yPercent: -10, opacity: 0.28, scale: 1.05, duration: 0.18, ease: "power2.out" },
        0.74
      );
      // BOTTOM cumulus strip slides up from below — light & airy (max 0.26)
      tl.fromTo(
        wipe3MidRef.current,
        { yPercent: 120, opacity: 0, scale: 1.15 },
        { yPercent: 10, opacity: 0.26, scale: 1.05, duration: 0.18, ease: "power2.out" },
        0.74
      );
      // CENTER soft veil — translucent only (max 0.18)
      tl.fromTo(
        wipe3FrontRef.current,
        { yPercent: 40, opacity: 0, scale: 1.3 },
        { yPercent: 0, opacity: 0.18, scale: 1.1, duration: 0.16, ease: "power2.out" },
        0.76
      );
      tl.set(wipe3HazeRef.current, { opacity: 0 }, 0.74);

      // SWAP behind translucent clouds — Kumtor scales up & spreads apart (camera punches through),
      // earth depths emerge, background darkens — ALL finish exactly when title begins (0.88)
      tl.to(
        kumtorRef.current,
        { scale: 1.6, xPercent: 0, filter: "blur(8px)", duration: 0.14, ease: "power2.in" },
        0.74
      );
      tl.to(
        kumtorRef.current,
        { opacity: 0, scale: 2.1, filter: "blur(20px)", duration: 0.08, ease: "power2.in" },
        0.80
      );
      tl.fromTo(
        crustRef.current,
        { opacity: 0, scale: 1.25, filter: "blur(16px)" },
        { opacity: 1, scale: 1.0, filter: "blur(0px)", duration: 0.08, ease: "power2.out" },
        0.80
      );
      // darken background gradient behind earth depths — ends at 0.88 with text
      tl.to(sceneRef.current, { backgroundColor: "#0a0806", duration: 0.14, ease: "none" }, 0.74);

      // Light clouds fly UP and away, clearing the frame exactly as the title appears
      tl.to(wipe3BackRef.current, { yPercent: -180, opacity: 0, scale: 1.3, duration: 0.14, ease: "power2.in" }, 0.80);
      tl.to(wipe3FrontRef.current, { yPercent: -200, opacity: 0, scale: 1.4, duration: 0.14, ease: "power2.in" }, 0.80);
      tl.to(wipe3MidRef.current, { yPercent: -220, opacity: 0, scale: 1.5, duration: 0.14, ease: "power2.in" }, 0.80);


      // Directions title emerges from dark depths — perfectly synced: swap completes at 0.88
      tl.fromTo(
        directionsRef.current,
        { opacity: 0, y: 60, filter: "blur(24px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.12, ease: "power2.out" },
        0.88
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
      end: "+=7200",
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
    <div ref={rootRef} className="relative" style={{ height: "7700px" }}>
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
