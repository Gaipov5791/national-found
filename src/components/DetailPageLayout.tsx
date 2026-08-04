import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandLockup } from "@/components/BrandLockup";
import type { AboutPerson } from "@/components/sections/sectionContent";
import { ensureGsapPlugins } from "@/lib/gsap-client";
import { LANGS, useLang, useT } from "@/lib/lang";
import { getSectionSceneLabel } from "@/lib/sectionNavigation";

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
  /** Smaller title for long article headlines. */
  compactTitle?: boolean;
};

export function DetailPageLayout({
  title,
  children,
  wide = false,
  compactTitle = false,
}: DetailPageLayoutProps) {
  const t = useT();
  const { lang, setLang } = useLang();
  const locationHash = useRouterState({
    select: (state) => state.location.hash,
  });
  const returnSection = getSectionSceneLabel(locationHash);

  useEffect(() => {
    restoreDocumentScroll();
  }, []);

  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden bg-[#0b2138] px-4 py-10 font-display text-white sm:px-8 sm:py-16 lg:px-12">
      <div
        className="pointer-events-none fixed inset-[-32px] -z-20 scale-105 bg-cover bg-center blur-[16px]"
        style={{ backgroundImage: "url('/images/mountains.jpg')" }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,20,38,0.68),rgba(8,28,49,0.78))]"
        aria-hidden
      />

      <div className={`mx-auto w-full ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-6 sm:gap-4">
          <Link to="/" hash={returnSection ?? undefined} className="inline-flex max-w-[min(100%,20rem)] items-center sm:max-w-[24rem]">
            <BrandLockup lang={lang} tone="white" size="sm" />
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5" aria-label={t.common.language}>
              {LANGS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] transition sm:px-3 sm:text-[11px] ${
                    lang === l
                      ? "bg-white text-[#0b2138]"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link
              to="/"
              hash={returnSection ?? undefined}
              className="text-xs font-semibold tracking-[0.12em] text-white/70 transition hover:text-[color:var(--gold)] sm:text-sm"
            >
              {t.common.backHome}
            </Link>
          </div>
        </header>
        <h1
          className={
            compactTitle
              ? "mt-8 text-xl font-bold leading-snug tracking-tight sm:text-2xl md:text-3xl"
              : "mt-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
          }
        >
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
    <section className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-md sm:p-7 md:p-8">
      <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-white/[0.82] sm:mt-4 sm:text-lg">
        {children}
      </div>
    </section>
  );
}

type PersonCardProps = {
  person: AboutPerson;
};

export function PersonCard({ person }: PersonCardProps) {
  const t = useT();
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  return (
    <article
      className="flex h-full min-h-[360px] flex-col items-center rounded-2xl border border-white/15 bg-white/[0.07] p-4 text-center backdrop-blur-sm sm:min-h-[420px] sm:p-5 lg:min-h-[480px]"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPhotoOpen(false);
      }}
    >
      <div
        className={`pointer-events-none flex h-56 w-full flex-none items-end justify-center overflow-hidden transition duration-500 ease-out sm:h-64 lg:h-72 motion-reduce:transition-none ${
          isPhotoOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="h-full w-full object-contain object-bottom brightness-110 drop-shadow-[0_12px_18px_rgba(0,0,0,0.3)]"
            loading="lazy"
          />
        ) : (
          <span className="pb-8 text-xs font-semibold tracking-[0.14em] text-white/35">
            {t.common.photoSoon}
          </span>
        )}
      </div>
      <h3 className="mt-auto pt-4 text-base font-bold leading-snug tracking-tight sm:text-lg">
        {person.photo ? (
          <button
            type="button"
            className="rounded-sm underline decoration-white/25 decoration-1 underline-offset-4 transition hover:decoration-[color:var(--gold)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-expanded={isPhotoOpen}
            onMouseEnter={() => setIsPhotoOpen(true)}
            onMouseLeave={() => setIsPhotoOpen(false)}
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse") {
                setIsPhotoOpen((open) => !open);
              }
            }}
            onClick={(event) => {
              if (event.detail === 0) {
                setIsPhotoOpen((open) => !open);
              }
            }}
          >
            {person.name}
          </button>
        ) : (
          <span>{person.name}</span>
        )}
      </h3>
      {person.title ? (
        <p className="mt-1.5 text-sm leading-snug text-white/65 sm:text-base">{person.title}</p>
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
  const t = useT();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 639px)");

    const updateEdgePadding = () => {
      const scroller = scrollerRef.current;
      const track = trackRef.current;
      if (!scroller || !track) return;

      if (!media.matches) {
        track.style.removeProperty("padding-inline");
        return;
      }

      const firstCard = track.firstElementChild;
      if (!(firstCard instanceof HTMLElement)) return;

      track.style.paddingInline = `${Math.max(
        0,
        (scroller.clientWidth - firstCard.offsetWidth) / 2,
      )}px`;
    };

    updateEdgePadding();
    media.addEventListener("change", updateEdgePadding);
    window.addEventListener("resize", updateEdgePadding);

    return () => {
      media.removeEventListener("change", updateEdgePadding);
      window.removeEventListener("resize", updateEdgePadding);
    };
  }, [people.length]);

  return (
    <div
      ref={scrollerRef}
      className="-mx-5 mt-5 snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-6 sm:snap-none sm:overflow-visible sm:pb-0"
      aria-label={t.common.staffCards}
    >
      <div
        ref={trackRef}
        className={`flex w-max items-stretch gap-4 sm:grid sm:w-full ${cols} sm:gap-6`}
      >
        {people.map((person) => (
          <div
            key={person.name}
            className="w-[min(76vw,280px)] shrink-0 snap-center sm:w-auto sm:shrink"
          >
            <PersonCard person={person} />
          </div>
        ))}
      </div>
    </div>
  );
}
