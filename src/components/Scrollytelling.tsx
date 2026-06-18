import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import mountains from "@/assets/mountains.jpg";
import clouds from "@/assets/clouds.png";

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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: sceneRef.current,
          anticipatePin: 1,
        },
      });

      // STEP 1 (0 → 0.5): mountains scale up, stats fade in between peaks
      tl.to(mountainRef.current, { scale: 1.25, duration: 0.5, ease: "none" }, 0);
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.35, ease: "none" },
        0.15
      );

      // STEP 2 (0.5 → 1): mountains keep zooming, stats fade out, fog rises, decree appears
      tl.to(statsRef.current, { opacity: 0, y: -30, duration: 0.25, ease: "none" }, 0.5);
      tl.to(mountainRef.current, { scale: 1.55, duration: 0.5, ease: "none" }, 0.5);
      tl.fromTo(
        fogRef.current,
        { yPercent: 80, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: "none" },
        0.55
      );
      tl.fromTo(
        fogFrontRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 25, opacity: 0.95, duration: 0.45, ease: "none" },
        0.6
      );
      tl.fromTo(
        decreeRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.35, ease: "none" },
        0.75
      );
    }, rootRef);

    // Drive count-up by scroll progress (reversible)
    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: "+=3000",
      onUpdate: (self) => {
        // Maps 0.15..0.5 → 0..1
        const p = (self.progress - 0.15) / 0.35;
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
    <div ref={rootRef} className="relative" style={{ height: "3500px" }}>
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

        {/* Stats — appears between two peaks */}
        <div
          ref={statsRef}
          className="pointer-events-none absolute inset-x-0 top-[18%] z-20 px-6 opacity-0"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-2xl text-[color:var(--ink)] drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)] md:text-4xl">
              Инвестиции в проекты будущего
            </p>
            <div className="mt-6 inline-flex items-stretch gap-10 rounded-3xl border border-white/60 bg-white/40 px-8 py-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(20,40,90,0.15)]">
              <div className="text-center">
                <div className="font-display text-5xl font-semibold text-[color:var(--ink)] md:text-6xl">
                  <CountUp to={200} progress={countProgress} suffix="+" />
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[color:var(--ink)]/70">
                  Проектов в реализации
                </div>
              </div>
              <div className="w-px bg-[color:var(--ink)]/15" />
              <div className="text-center">
                <div className="font-display text-5xl font-semibold text-[color:var(--ink)] md:text-6xl">
                  <CountUp to={8000} progress={countProgress} />
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[color:var(--ink)]/70">
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
      </div>
    </div>
  );
}
