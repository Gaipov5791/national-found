import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import mountains from "@/assets/mountains.jpg";
import clouds from "@/assets/clouds.png";
import kumtor from "@/assets/kumtor.jpg";
import earthCrust from "@/assets/earth-crust.jpg";

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

  // new scene refs
  const aboutRef = useRef<HTMLDivElement>(null);
  const kumtorRef = useRef<HTMLImageElement>(null);
  const financeRef = useRef<HTMLDivElement>(null);
  const fogLiftRef = useRef<HTMLImageElement>(null);
  const crustRef = useRef<HTMLImageElement>(null);
  const fogCoverRef = useRef<HTMLImageElement>(null);
  const directionsRef = useRef<HTMLDivElement>(null);

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
          end: "+=6400",
          scrub: true,
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

      // SCENE 1 — Mountains zoom + stats (0 → 0.30)
      tl.to(mountainRef.current, { scale: 1.25, duration: 0.30, ease: "none" }, 0);
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15, ease: "none" },
        0.12
      );

      // Stats fade out + fog rises (0.30 → 0.42)
      tl.to(statsRef.current, { opacity: 0, y: -30, duration: 0.10, ease: "none" }, 0.30);
      tl.to(mountainRef.current, { scale: 1.55, duration: 0.20, ease: "none" }, 0.30);
      tl.fromTo(
        fogRef.current,
        { yPercent: 90, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.14, ease: "none" },
        0.32
      );
      tl.fromTo(
        fogFrontRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 20, opacity: 0.95, duration: 0.16, ease: "none" },
        0.34
      );

      // Decree text — fade in (0.44 → 0.55)
      tl.fromTo(
        decreeRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.11, ease: "power1.out" },
        0.44
      );

      // Decree fades out (0.56 → 0.62) — fog densifies further
      tl.to(decreeRef.current, { opacity: 0, y: -40, duration: 0.06, ease: "none" }, 0.56);
      tl.to(fogFrontRef.current, { yPercent: 0, opacity: 1, duration: 0.08, ease: "none" }, 0.56);

      // SCENE 2 — "О ФОНДЕ" — emerges from dense fog (0.60 → 0.70)
      tl.fromTo(
        aboutRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.10, ease: "power1.out" },
        0.60
      );
      // About fades out (0.70 → 0.76)
      tl.to(aboutRef.current, { opacity: 0, y: -40, duration: 0.06, ease: "none" }, 0.70);

      // SCENE 3 — Fog lifts UP, revealing Kumtor (0.70 → 0.82)
      // Hide mountains (we crossfade to kumtor)
      tl.to(mountainRef.current, { opacity: 0, duration: 0.08, ease: "none" }, 0.72);
      tl.fromTo(
        kumtorRef.current,
        { opacity: 0, scale: 1.15 },
        { opacity: 1, scale: 1.0, duration: 0.12, ease: "power1.out" },
        0.72
      );
      // Fog lifts up but stays as a hovering veil above
      tl.to(fogRef.current, { yPercent: -75, opacity: 0.75, duration: 0.14, ease: "power1.inOut" }, 0.70);
      tl.to(fogFrontRef.current, { yPercent: -90, opacity: 0.55, duration: 0.14, ease: "power1.inOut" }, 0.70);

      // Финансирование проектов title (0.78 → 0.84)
      tl.fromTo(
        financeRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.08, ease: "power1.out" },
        0.78
      );
      // fade out finance (0.86 → 0.90)
      tl.to(financeRef.current, { opacity: 0, y: -30, duration: 0.05, ease: "none" }, 0.86);

      // SCENE 4 — New fog blanket covers Kumtor → earth crust appears (0.86 → 0.96)
      tl.fromTo(
        fogCoverRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.10, ease: "power1.inOut" },
        0.84
      );
      tl.to(kumtorRef.current, { opacity: 0, duration: 0.08, ease: "none" }, 0.88);
      tl.fromTo(
        crustRef.current,
        { opacity: 0, scale: 1.12 },
        { opacity: 1, scale: 1.0, duration: 0.12, ease: "power1.out" },
        0.88
      );
      // fog cover lifts gently to reveal crust
      tl.to(fogCoverRef.current, { yPercent: -60, opacity: 0.5, duration: 0.10, ease: "power1.inOut" }, 0.92);

      // Перспективные направления (0.94 → 1.00)
      tl.fromTo(
        directionsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.06, ease: "power1.out" },
        0.94
      );
    }, rootRef);

    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: "+=6400",
      onUpdate: (self) => {
        const p = (self.progress - 0.12) / 0.18;
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
    <div ref={rootRef} className="relative" style={{ height: "6900px" }}>
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

        {/* Mountains */}
        <img
          ref={mountainRef}
          src={mountains}
          alt="Горы"
          className="absolute inset-0 h-full w-full object-cover object-bottom will-change-transform"
          style={{ transformOrigin: "50% 70%" }}
        />

        {/* Kumtor — behind fog layers */}
        <img
          ref={kumtorRef}
          src={kumtor}
          alt="Золоторудный комбинат Кумтор"
          className="absolute inset-0 h-full w-full object-cover opacity-0 will-change-transform"
          style={{ transformOrigin: "50% 60%" }}
        />

        {/* Earth crust */}
        <img
          ref={crustRef}
          src={earthCrust}
          alt="Земная кора в разрезе"
          className="absolute inset-0 h-full w-full object-cover opacity-0 will-change-transform"
          style={{ transformOrigin: "50% 50%" }}
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

        {/* Stats */}
        <div
          ref={statsRef}
          className="pointer-events-none absolute inset-x-0 top-[46%] z-20 px-6 opacity-0"
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

        {/* Fog back */}
        <img
          ref={fogRef}
          src={clouds}
          alt=""
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[60%] w-full object-cover object-top opacity-0"
        />
        {/* Fog front */}
        <img
          ref={fogFrontRef}
          src={clouds}
          alt=""
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[60%] w-full object-cover object-top opacity-0"
        />

        {/* Decree text */}
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

        {/* О ФОНДЕ */}
        <div
          ref={aboutRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6 text-center opacity-0"
        >
          <h2 className="font-display text-4xl font-bold tracking-[0.2em] text-[color:var(--primary)] drop-shadow-[0_4px_30px_rgba(255,255,255,0.6)] md:text-6xl">
            О ФОНДЕ
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[color:var(--ink)]/85 md:text-base">
            Национальный инвестиционный фонд — стратегический институт развития,
            направляющий капитал в проекты, формирующие будущее Кыргызской Республики.
          </p>
        </div>

        {/* ФИНАНСИРОВАНИЕ ПРОЕКТОВ */}
        <div
          ref={financeRef}
          className="pointer-events-none absolute inset-x-0 top-[40%] z-30 px-6 text-center opacity-0"
        >
          <h2 className="font-display text-4xl font-bold tracking-[0.18em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] md:text-6xl">
            ФИНАНСИРОВАНИЕ ПРОЕКТОВ
          </h2>
        </div>

        {/* Cover fog for transition to crust */}
        <img
          ref={fogCoverRef}
          src={clouds}
          alt=""
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[28] h-[110%] w-full object-cover object-top opacity-0"
        />

        {/* ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ */}
        <div
          ref={directionsRef}
          className="pointer-events-none absolute inset-x-0 top-[38%] z-30 px-6 text-center opacity-0"
        >
          <h2 className="font-display text-4xl font-bold tracking-[0.16em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.75)] md:text-6xl">
            ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] md:text-base">
            Инвестиции в недра — золото, медь, редкоземельные металлы и стратегические ресурсы Кыргызстана.
          </p>
        </div>

        {/* unused ref placeholder */}
        <span ref={fogLiftRef} className="hidden" />
      </div>
    </div>
  );
}
