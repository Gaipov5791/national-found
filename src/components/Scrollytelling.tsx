import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import mountains from "@/assets/mountains.jpg";
import clouds from "@/assets/clouds.png";
import fundLogo from "@/assets/fund-logo.png.asset.json";

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
  const fogRef = useRef<HTMLImageElement>(null);
  const fogFrontRef = useRef<HTMLImageElement>(null);
  const decreeRef = useRef<HTMLDivElement>(null);
  const cloudDriftRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  const [countProgress, setCountProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
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
        backgroundPositionX: "-2000px",
        duration: 140,
        repeat: -1,
        ease: "none",
      });

      // Compute target docking position for the brand (top-left inside Navbar)
      const computeBrandTarget = () => {
        const slot = document.getElementById("navbar-brand-slot");
        const el = brandRef.current;
        if (!slot || !el) return { x: 0, y: 0, scale: 1 };
        const slotRect = slot.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const targetScale = 0.18;
        // current center
        const cx = elRect.left + elRect.width / 2;
        const cy = elRect.top + elRect.height / 2;
        const tx = slotRect.left + slotRect.width / 2;
        const ty = slotRect.top + slotRect.height / 2;
        return { x: tx - cx, y: ty - cy, scale: targetScale };
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=3600",
          scrub: true,
          pin: sceneRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // BRAND: from giant center -> shrinks into Navbar slot (0 → 0.12), stays after
      tl.to(
        brandRef.current,
        {
          duration: 0.12,
          ease: "none",
          x: () => computeBrandTarget().x,
          y: () => computeBrandTarget().y,
          scale: () => computeBrandTarget().scale,
          letterSpacing: "0.04em",
        },
        0
      );

      // STEP 1 (0 → 0.5): mountains scale up, stats fade in
      tl.to(mountainRef.current, { scale: 1.25, duration: 0.5, ease: "none" }, 0);
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3, ease: "none" },
        0.2
      );

      // STEP 2: stats fade out, mountains keep zooming, fog rises
      tl.to(statsRef.current, { opacity: 0, y: -30, duration: 0.2, ease: "none" }, 0.5);
      tl.to(mountainRef.current, { scale: 1.55, duration: 0.5, ease: "none" }, 0.5);
      tl.fromTo(
        fogRef.current,
        { yPercent: 90, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.35, ease: "none" },
        0.55
      );
      tl.fromTo(
        fogFrontRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 20, opacity: 0.95, duration: 0.35, ease: "none" },
        0.6
      );

      // STEP 3: decree appears only AFTER fog has settled — long, soft fade
      tl.fromTo(
        decreeRef.current,
        { opacity: 0, y: 120 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power1.out" },
        0.85
      );
    }, rootRef);

    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: "+=3600",
      onUpdate: (self) => {
        const p = (self.progress - 0.2) / 0.3;
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
    <div ref={rootRef} className="relative" style={{ height: "4100px" }}>
      <div
        ref={sceneRef}
        className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#dbe6f1] via-[#e9eef5] to-[#f3f1e8]"
      >
        {/* Drifting clouds back */}
        <div
          ref={cloudDriftRef}
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${clouds})`,
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 35%",
            backgroundPositionY: "18%",
          }}
        />

        {/* Whole mountain image (two peaks) */}
        <img
          ref={mountainRef}
          src={mountains}
          alt="Горы"
          className="absolute inset-0 h-full w-full object-cover object-bottom will-change-transform"
          style={{ transformOrigin: "50% 70%" }}
        />

        {/* BRAND LOGO — starts large center, scrubs into Navbar slot on desktop */}
        <div
          ref={brandRef}
          className="pointer-events-none absolute left-1/2 top-[22%] z-40 -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
          style={{ transformOrigin: "50% 50%" }}
        >
          <img
            src={fundLogo.url}
            alt="Национальный инвестиционный фонд Кыргызской Республики"
            className="block w-[min(78vw,900px)] h-auto drop-shadow-[0_10px_40px_rgba(20,40,90,0.25)]"
          />
        </div>

        {/* Stats — lower, in the valley between peaks, with soft dark backdrop */}
        <div
          ref={statsRef}
          className="pointer-events-none absolute inset-x-0 top-[46%] z-20 px-6 opacity-0"
        >
          <div className="relative mx-auto max-w-3xl text-center">
            {/* soft radial dark vignette for legibility */}
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

        {/* Rising fog (back) */}
        <img
          ref={fogRef}
          src={clouds}
          alt=""
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[60%] w-full object-cover object-top opacity-0"
        />
        {/* Dense fog (front) */}
        <img
          ref={fogFrontRef}
          src={clouds}
          alt=""
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[45%] w-full object-cover object-top opacity-0"
        />

        {/* Decree text — appears slowly AFTER fog settles */}
        <div
          ref={decreeRef}
          className="pointer-events-none absolute inset-x-0 bottom-[10%] z-30 px-6 text-center opacity-0"
        >
          <p className="font-display mx-auto max-w-4xl text-2xl font-medium leading-snug text-[color:var(--ink)] md:text-4xl">
            Фонд учреждён постановлением{" "}
            <span className="font-semibold">Кабинета Министров Кыргызской Республики</span>
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-[color:var(--gold)]" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[color:var(--ink)]/80 md:text-base">
            от 5 ноября 2024 года № 666 во исполнение Закона Кыргызской Республики
            «О Национальном инвестиционном фонде Кыргызской Республики» и Указа
            Президента Кыргызской Республики № 155 от 14 июня 2024 года.
          </p>
        </div>
      </div>
    </div>
  );
}
