import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { NewsPreviewCard } from "./NewsPreviewCard";
import { SECTION_CARDS_GRID_MARGIN } from "./sectionLayout";

export type NewsPreviewItem = {
  id: string;
  title?: string;
  description?: string;
  imageLabel?: string;
};

type NewsCardsMarqueeProps = {
  items: readonly NewsPreviewItem[];
  className?: string;
};

const CARD_WIDTH = "w-[min(78vw,280px)] sm:w-[min(70vw,300px)] md:w-[260px]";

/**
 * Horizontal news strip:
 * - Mobile / overflow: snap scroller + auto-swipe (ready for more cards).
 * - Desktop with 3+: continuous marquee (бегущая строка).
 * - Desktop with 1–2 that fit: centered static row.
 */
export function NewsCardsMarquee({ items, className }: NewsCardsMarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [useCssMarquee, setUseCssMarquee] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateMode = () => {
      const isDesktop = window.innerWidth >= 768;
      setUseCssMarquee(!reduceMotion && isDesktop && items.length >= 3);
    };

    updateMode();
    window.addEventListener("resize", updateMode);
    return () => window.removeEventListener("resize", updateMode);
  }, [items.length]);

  // Auto-swipe for horizontal scroller (mobile + overflow on desktop with <3 cards).
  useEffect(() => {
    if (useCssMarquee) return;
    const el = scrollerRef.current;
    if (!el || typeof window === "undefined") return;
    if (items.length <= 1) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let intervalId: number | null = null;
    let resumeTimeoutId: number | null = null;
    let pausedUntil = 0;

    const overflows = () => el.scrollWidth > el.clientWidth + 8;

    const pause = (ms: number) => {
      pausedUntil = Date.now() + ms;
      if (resumeTimeoutId) window.clearTimeout(resumeTimeoutId);
      resumeTimeoutId = window.setTimeout(() => {}, ms);
    };

    const stepOnce = () => {
      if (Date.now() < pausedUntil) return;
      if (!overflows()) return;

      const first = el.firstElementChild as HTMLElement | null;
      const step = (first?.offsetWidth ?? 240) + 12;
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + step;

      el.scrollTo({
        left: next >= max - 4 ? 0 : next,
        behavior: "smooth",
      });
    };

    const start = () => {
      if (intervalId) return;
      intervalId = window.setInterval(stepOnce, 2600);
    };

    const stop = () => {
      if (intervalId) window.clearInterval(intervalId);
      intervalId = null;
    };

    const onPointerDown = () => pause(5000);
    const onTouchStart = () => pause(5000);
    const onWheel = () => pause(5000);
    const onScroll = () => pause(2200);

    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });

    start();
    return () => {
      stop();
      if (resumeTimeoutId) window.clearTimeout(resumeTimeoutId);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
    };
  }, [items.length, useCssMarquee]);

  if (useCssMarquee) {
    const track = [...items, ...items];
    return (
      <div
        className={cn(
          "pointer-events-auto relative mx-auto w-full max-w-6xl overflow-hidden",
          SECTION_CARDS_GRID_MARGIN,
          className
        )}
      >
        <div className="flex w-max gap-4 animate-news-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          {track.map((item, index) => (
            <div key={`${item.id}-${index}`} className={cn(CARD_WIDTH, "shrink-0")}>
              <NewsPreviewCard
                title={item.title}
                description={item.description}
                imageLabel={item.imageLabel}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollerRef}
      className={cn(
        "pointer-events-auto mx-auto flex w-full max-w-6xl snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "-mx-1 px-3 sm:px-1 md:justify-center md:gap-5 md:px-0",
        SECTION_CARDS_GRID_MARGIN,
        className
      )}
    >
      {items.map((item) => (
        <div key={item.id} className={cn(CARD_WIDTH, "shrink-0 snap-start")}>
          <NewsPreviewCard
            title={item.title}
            description={item.description}
            imageLabel={item.imageLabel}
          />
        </div>
      ))}
    </div>
  );
}
