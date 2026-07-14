import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsapPlugins } from "@/lib/gsap-client";
import type { AboutPerson } from "@/components/sections/sectionContent";
import { attachHorizontalAutoSwipe } from "@/components/sections/horizontalCardSwipe";

/** Clear leftover Lenis / ScrollTrigger scroll locks after leaving the landing. */
function restoreDocumentScroll() {
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

  ensureGsapPlugins();
  if (ScrollTrigger.getAll().length > 0) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    try {
      ScrollTrigger.normalizeScroll(false);
    } catch {
      /* ignore */
    }
    ScrollTrigger.scrollerProxy(document.documentElement, {});
  }
}

type DetailPageLayoutProps = {
  title: string;
  children: ReactNode;
  /** Full-width content column for grids (people, cards). */
  wide?: boolean;
};

export function DetailPageLayout({ title, children, wide = false }: DetailPageLayoutProps) {
  useEffect(() => {
    restoreDocumentScroll();
  }, []);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#dbe6f1] via-[#e9eef5] to-[#f3f1e8] px-4 py-10 font-display text-[color:var(--ink)] sm:px-8 sm:py-16 lg:px-12">
      <div className={`mx-auto w-full ${wide ? "max-w-none" : "max-w-3xl"}`}>
        <header className="flex items-center justify-between gap-4 border-b border-[color:var(--ink)]/10 pb-6">
          <Link to="/" className="inline-flex items-center">
            <img src="/logo/logo-blue.png" alt="НИФ КР" className="h-9 w-auto sm:h-10" />
          </Link>
          <Link
            to="/"
            className="text-xs font-semibold tracking-[0.12em] text-[color:var(--ink)]/60 transition hover:text-[color:var(--gold)] sm:text-sm"
          >
            ← На главную
          </Link>
        </header>
        <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="mt-6 space-y-5 text-base leading-relaxed sm:mt-8 sm:space-y-6 sm:text-lg md:text-xl">
          {children}
        </div>
      </div>
    </main>
  );
}

type DetailInfoBlockProps = {
  title: string;
  children: ReactNode;
};

export function DetailInfoBlock({ title, children }: DetailInfoBlockProps) {
  return (
    <section className="rounded-2xl border border-[color:var(--ink)]/10 bg-white/60 p-5 shadow-sm sm:p-7 md:p-8">
      <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-[color:var(--ink)]/80 sm:mt-4 sm:text-lg">
        {children}
      </div>
    </section>
  );
}

type PersonCardProps = {
  person: AboutPerson;
};

export function PersonCard({ person }: PersonCardProps) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[color:var(--ink)]/5">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold tracking-[0.14em] text-[color:var(--ink)]/35 sm:text-base">
            Фото скоро
          </div>
        )}
      </div>
      <h3 className="mt-3 text-base font-bold leading-snug tracking-tight sm:mt-4 sm:text-lg">
        {person.name}
      </h3>
      {person.title ? (
        <p className="mt-1.5 text-sm leading-snug text-[color:var(--ink)]/60 sm:text-base">
          {person.title}
        </p>
      ) : null}
      <p className="mt-1.5 text-sm font-semibold tracking-wide text-[color:var(--gold)] sm:text-base">
        {person.role}
      </p>
    </article>
  );
}

type PersonGridProps = {
  people: readonly AboutPerson[];
  columns?: 2 | 3 | 4;
};

export function PersonGrid({ people, columns = 3 }: PersonGridProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  useEffect(() => {
    if (people.length <= 1 || typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 639px)");
    let stopAutoSwipe: (() => void) | undefined;

    const updateMode = () => {
      stopAutoSwipe?.();
      stopAutoSwipe = undefined;

      if (!media.matches || !scrollerRef.current || !trackRef.current) return;

      const controller = attachHorizontalAutoSwipe({
        scroller: scrollerRef.current,
        track: trackRef.current,
        intervalMs: 3400,
        duration: 1.15,
        ease: "power2.inOut",
        pingPong: true,
      });
      stopAutoSwipe = controller?.stop;
    };

    updateMode();
    media.addEventListener("change", updateMode);

    return () => {
      stopAutoSwipe?.();
      media.removeEventListener("change", updateMode);
    };
  }, [people.length]);

  return (
    <div
      ref={scrollerRef}
      className="-mx-5 mt-5 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-6 sm:overflow-visible sm:px-0 sm:pb-0"
      aria-label="Карточки сотрудников"
    >
      <div
        ref={trackRef}
        className={`flex w-max snap-x snap-proximity gap-4 pr-5 sm:grid sm:w-full sm:snap-none sm:pr-0 ${cols} sm:gap-8`}
      >
        {people.map((person) => (
          <div
            key={person.name}
            className="w-[min(76vw,280px)] shrink-0 snap-start sm:w-auto sm:shrink"
          >
            <PersonCard person={person} />
          </div>
        ))}
      </div>
    </div>
  );
}
