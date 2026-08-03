import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { attachHorizontalAutoSwipe } from "./horizontalCardSwipe";
import { NewsPreviewCard } from "./NewsPreviewCard";
import { SECTION_CARDS_GRID_MARGIN } from "./sectionLayout";

export type NewsPreviewItem = {
  id: string;
  title?: string;
  description?: string;
  imageLabel?: string;
  image?: string;
  date?: string;
};

type NewsCardsMarqueeProps = {
  items: readonly NewsPreviewItem[];
  className?: string;
};

const CARD_WIDTH = "w-[min(78vw,248px)] sm:w-[248px] md:w-[240px]";

/**
 * Horizontal news strip:
 * - Mobile / overflow: snap scroller + auto-swipe (edge cards fully in view).
 * - Desktop with 3+: continuous marquee (бегущая строка).
 */
export function NewsCardsMarquee({ items, className }: NewsCardsMarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (useCssMarquee) return;
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track || typeof window === "undefined") return;
    if (items.length <= 1) return;

    const controller = attachHorizontalAutoSwipe({
      scroller,
      track,
      pingPong: true,
      intervalMs: 2600,
    });

    return () => controller?.stop();
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
                imageSrc={item.image}
                date={item.date}
                slug={item.id}
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
        "pointer-events-auto mx-auto w-full max-w-6xl overflow-x-auto overscroll-x-contain scroll-smooth",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        SECTION_CARDS_GRID_MARGIN,
        className
      )}
    >
      <div
        ref={trackRef}
        className="flex w-max min-w-full snap-x snap-proximity gap-3 px-3 pb-1 sm:gap-4 sm:px-4 md:justify-center md:gap-5 md:px-2"
      >
        {items.map((item) => (
          <div key={item.id} className={cn(CARD_WIDTH, "shrink-0 snap-start")}>
            <NewsPreviewCard
              title={item.title}
              description={item.description}
              imageLabel={item.imageLabel}
              imageSrc={item.image}
              date={item.date}
              slug={item.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
