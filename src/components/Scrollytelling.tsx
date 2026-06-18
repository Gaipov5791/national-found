import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import sky from "@/assets/sky.jpg";
import mountainLeft from "@/assets/mountain-left.png";
import mountainRight from "@/assets/mountain-right.png";
import clouds from "@/assets/clouds.png";

gsap.registerPlugin(ScrollTrigger);

function CountUp({ to, active, suffix = "" }: { to: number; active: boolean; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) {
      setVal(0);
      return;
    }
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to]);
  return (
    <span>
      {val.toLocaleString("ru-RU").replace(",", " ")}
      {suffix}
    </span>
  );
}

export function Scrollytelling() {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLImageElement>(null);
  const rightRef = useRef<HTMLImageElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decreeRef = useRef<HTMLDivElement>(null);
  const cloudFrontRef = useRef<HTMLImageElement>(null);
  const cloudFogRef = useRef<HTMLImageElement>(null);
  const cloudDriftRef = useRef<HTMLDivElement>(null);

  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    // Lenis smooth scroll
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
      // Cloud drift infinite
      gsap.to(cloudDriftRef.current, {
        backgroundPositionX: "-2000px",
        duration: 120,
        repeat: -1,
        ease: "none",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Scene 1 → Scene 2 (0 → 0.5): mountains scale + split, hero fades, stats appear
      tl.to(
        heroTitleRef.current,
        { opacity: 0, y: -60, duration: 0.4 },
        0
      );
      tl.to(
        leftRef.current,
        { xPercent: -35, scale: 1.3, duration: 1 },
        0
      );
      tl.to(
        rightRef.current,
        { xPercent: 35, scale: 1.3, duration: 1 },
        0
      );
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        0.45
      );
      tl.add(() => setStatsActive(true), 0.55);
      tl.add(() => setStatsActive(false), "<-=0.01"); // safety on reverse handled below

      // Scene 2 → Scene 3 (1 → 2): mountains push further, stats fade, fog rises, decree appears
      tl.to(
        statsRef.current,
        { opacity: 0, y: -60, duration: 0.5 },
        1.1
      );
      tl.to(
        leftRef.current,
        { xPercent: -70, scale: 1.5, duration: 1 },
        1
      );
      tl.to(
        rightRef.current,
        { xPercent: 70, scale: 1.5, duration: 1 },
        1
      );
      tl.fromTo(
        cloudFogRef.current,
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1 },
        1.1
      );
      tl.fromTo(
        cloudFrontRef.current,
        { yPercent: 80, opacity: 0 },
        { yPercent: 20, opacity: 0.9, duration: 1 },
        1.2
      );
      tl.fromTo(
        decreeRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.4
      );
    }, rootRef);

    // Reverse-aware count up: trigger via dedicated ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: "+=3000",
      onUpdate: (self) => {
        // active when 0.4..1.05 of timeline progress
        const p = self.progress;
        setStatsActive(p > 0.18 && p < 0.45);
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
    <div ref={rootRef} className="relative h-screen w-full overflow-hidden">
      {/* Sky base */}
      <img
        src={sky}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Drifting clouds layer (infinite) */}
      <div
        ref={cloudDriftRef}
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url(${clouds})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 60%",
          backgroundPositionY: "20%",
        }}
      />

      {/* Mountains */}
      <img
        ref={leftRef}
        src={mountainLeft}
        alt=""
        className="absolute bottom-0 left-0 h-[85%] w-[60%] origin-bottom-left object-contain object-bottom will-change-transform"
      />
      <img
        ref={rightRef}
        src={mountainRight}
        alt=""
        className="absolute bottom-0 right-0 h-[85%] w-[60%] origin-bottom-right object-contain object-bottom will-change-transform"
      />

      {/* Hero title */}
      <div
        ref={heroTitleRef}
        className="absolute inset-x-0 bottom-[14%] z-10 px-6 text-center"
      >
        <h1 className="font-display mx-auto max-w-5xl text-balance text-3xl font-semibold leading-tight tracking-tight text-[color:var(--ink)] md:text-5xl lg:text-6xl">
          НАЦИОНАЛЬНЫЙ ИНВЕСТИЦИОННЫЙ ФОНД
          <br />
          <span className="text-[color:var(--ink)]/80">КЫРГЫЗСКОЙ РЕСПУБЛИКИ</span>
        </h1>
        <div className="mx-auto mt-6 h-px w-24 bg-[color:var(--gold)]" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--ink)]/60">
          Прокрутите вниз
        </p>
      </div>

      {/* Stats (Scene 2) */}
      <div
        ref={statsRef}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-6 opacity-0"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display text-2xl text-[color:var(--ink)] md:text-4xl">
            Инвестиции в проекты будущего
          </p>
          <div className="mt-8 rounded-[2.5rem] border border-white/60 bg-white/35 px-8 py-10 shadow-[0_20px_60px_rgba(20,40,90,0.12)] backdrop-blur-2xl">
            <div className="grid grid-cols-1 divide-y divide-[color:var(--ink)]/15 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="px-6 py-4">
                <div className="font-display text-6xl font-semibold text-[color:var(--ink)] md:text-7xl">
                  <CountUp to={200} active={statsActive} suffix="+" />
                </div>
                <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[color:var(--ink)]/70">
                  Проектов в реализации
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="font-display text-6xl font-semibold text-[color:var(--ink)] md:text-7xl">
                  <CountUp to={8000} active={statsActive} />
                </div>
                <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[color:var(--ink)]/70">
                  Завершённых проектов
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fog rising */}
      <img
        ref={cloudFogRef}
        src={clouds}
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[55%] w-full object-cover object-top opacity-0"
      />
      <img
        ref={cloudFrontRef}
        src={clouds}
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[40%] w-full object-cover object-top opacity-0"
      />

      {/* Decree (Scene 3) */}
      <div
        ref={decreeRef}
        className="pointer-events-none absolute inset-x-0 bottom-[12%] z-30 px-6 text-center opacity-0"
      >
        <p className="font-display mx-auto max-w-4xl text-2xl font-medium leading-snug text-[color:var(--ink)] md:text-4xl">
          Фонд учреждён постановлением{" "}
          <span className="font-semibold">Кабинета Министров Кыргызской Республики</span>
        </p>
        <div className="mx-auto mt-5 h-px w-16 bg-[color:var(--gold)]" />
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[color:var(--ink)]/75 md:text-base">
          от 5 ноября 2024 года № 666 во исполнение Закона Кыргызской Республики
          «О Национальном инвестиционном фонде Кыргызской Республики» и Указа
          Президента Кыргызской Республики № 155 от 14 июня 2024 года.
        </p>
      </div>
    </div>
  );
}
