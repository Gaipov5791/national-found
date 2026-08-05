import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/lib/lang";
import { cn } from "@/lib/utils";
import { getCardScrollLeft, getScrollCards, getScrollMax, attachHorizontalAutoSwipe } from "./horizontalCardSwipe";
import { SECTION_CARDS_SCROLLER_PT } from "./sectionLayout";

export type SectionCardsLayout = "two-col" | "four-row" | "four-two" | "six-row";

type SectionCardsScrollerProps = {
  children: ReactNode;
  layout?: SectionCardsLayout;
  className?: string;
  /** Auto-advance whenever content overflows (any breakpoint). Default: mobile-only. */
  autoSwipeOnOverflow?: boolean;
  /**
   * Desktop-only prev/next arrows (HeroScrollHint style).
   * Forces horizontal scroll on md+ instead of a grid. Mobile stays unchanged.
   */
  showDesktopArrows?: boolean;
};

const LAYOUT_MAX_WIDTH: Record<SectionCardsLayout, string> = {
  "two-col": "max-w-5xl",
  "four-row": "max-w-[min(100%,64rem)]",
  "four-two": "max-w-[min(100%,64rem)]",
  // Wide enough for ~4–5 cards; still overflows so desktop arrows stay useful.
  "six-row": "max-w-[min(100%,72rem)]",
};

const LAYOUT_GRID: Record<SectionCardsLayout, string> = {
  "two-col": "md:grid-cols-2",
  "four-row": "md:grid-cols-4",
  "four-two": "md:grid-cols-4",
  "six-row": "",
};

function SectionCardsNavArrow({
  direction,
  disabled,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      data-cursor-hover
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "pointer-events-auto absolute top-1/2 z-[5] hidden -translate-y-1/2 text-white transition md:flex",
        direction === "prev" ? "left-0" : "right-0",
        "disabled:pointer-events-none disabled:opacity-35"
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/45 bg-black/20 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] backdrop-blur-[2px] transition hover:border-white/70 hover:bg-black/35 lg:h-14 lg:w-14">
        <Icon className="h-7 w-7 lg:h-8 lg:w-8" strokeWidth={2} aria-hidden />
      </span>
    </button>
  );
}

export function SectionCardsScroller({
  children,
  layout = "two-col",
  className,
  autoSwipeOnOverflow = false,
  showDesktopArrows = false,
}: SectionCardsScrollerProps) {
  const t = useT();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const scrollRow = layout === "six-row";
  /** Horizontal strip on desktop when arrows are enabled (no grid). */
  const desktopScroll = scrollRow || showDesktopArrows;
  const desktopGrid = !desktopScroll;

  const childCount = useMemo(() => {
    // Works for both arrays and single child.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyChildren = children as any;
    return Array.isArray(anyChildren) ? anyChildren.length : 1;
  }, [children]);

  const syncArrowState = useCallback(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const max = getScrollMax(scroller);
    const cards = getScrollCards(track);
    if (!cards.length || max <= 4) {
      setCanPrev(false);
      setCanNext(false);
      setIndex(0);
      return;
    }

    const left = scroller.scrollLeft;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const d = Math.abs(card.offsetLeft - left);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });

    setIndex(best);
    setCanPrev(left > 4);
    setCanNext(left < max - 4);
  }, []);

  const scrollToIndex = useCallback((nextIndex: number) => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const cards = getScrollCards(track);
    if (!cards.length) return;

    const clamped = Math.max(0, Math.min(nextIndex, cards.length - 1));
    const left = getCardScrollLeft(scroller, track, clamped, "start");
    scroller.scrollTo({ left, behavior: "smooth" });
    setIndex(clamped);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    if (typeof window === "undefined") return;
    if (childCount <= 1) return;

    const shouldAttach = () => {
      if (window.innerWidth >= 768) {
        // Desktop: arrows replace auto-swipe; otherwise keep overflow auto-advance.
        if (showDesktopArrows) return false;
        if (autoSwipeOnOverflow || scrollRow) return true;
        return false;
      }
      // Mobile: keep existing auto-swipe.
      return true;
    };

    if (!shouldAttach()) return;

    const controller = attachHorizontalAutoSwipe({
      scroller,
      track,
      pingPong: true,
      intervalMs: 2400,
    });

    return () => controller?.stop();
  }, [childCount, autoSwipeOnOverflow, scrollRow, showDesktopArrows]);

  useEffect(() => {
    if (!showDesktopArrows) return;
    const scroller = scrollerRef.current;
    if (!scroller || typeof window === "undefined") return;

    syncArrowState();
    scroller.addEventListener("scroll", syncArrowState, { passive: true });
    window.addEventListener("resize", syncArrowState);

    return () => {
      scroller.removeEventListener("scroll", syncArrowState);
      window.removeEventListener("resize", syncArrowState);
    };
  }, [showDesktopArrows, childCount, syncArrowState]);

  return (
    <div
      className={cn(
        "relative w-full",
        // Constrain the arrow host to the same width as the card strip so arrows sit beside it.
        showDesktopArrows && cn("mx-auto", LAYOUT_MAX_WIDTH[layout], "md:px-6 lg:px-7")
      )}
    >
      {showDesktopArrows && (canPrev || canNext) ? (
        <>
          <SectionCardsNavArrow
            direction="prev"
            disabled={!canPrev}
            label={t.common.cardsPrev}
            onClick={() => scrollToIndex(index - 1)}
          />
          <SectionCardsNavArrow
            direction="next"
            disabled={!canNext}
            label={t.common.cardsNext}
            onClick={() => scrollToIndex(index + 1)}
          />
        </>
      ) : null}

      <div
        ref={scrollerRef}
        className={cn(
          "mx-auto w-full",
          !showDesktopArrows && LAYOUT_MAX_WIDTH[layout],
          // Outer viewport only — padding lives on the track so edge cards can scroll fully in.
          "overflow-x-auto overflow-y-visible overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          desktopGrid && "md:overflow-visible",
          className
        )}
      >
        <div
          ref={trackRef}
          className={cn(
            `flex w-max min-w-full snap-x snap-proximity gap-3 px-3 pb-1 sm:px-4 ${SECTION_CARDS_SCROLLER_PT}`,
            desktopScroll
              ? "justify-start md:gap-4 md:px-2 lg:gap-5"
              : cn(
                  "md:mx-auto md:grid md:w-fit md:max-w-full md:snap-none md:justify-items-stretch md:gap-4 md:px-0 lg:gap-5",
                  layout === "four-two" ? "md:gap-y-10 lg:gap-y-12" : "",
                  LAYOUT_GRID[layout]
                )
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export type SectionCardGridSlot = "default" | "bottom-left" | "bottom-right";

type SectionCardSlideProps = {
  children: ReactNode;
  wide?: boolean;
  layout?: SectionCardsLayout;
  gridSlot?: SectionCardGridSlot;
};

/** Shared card width token — mobile compact, desktop fixed (no xl/2xl growth). */
const MOBILE_WIDTH = {
  default: "w-[min(78vw,248px)] sm:w-[248px]",
  wide: "w-[min(72vw,232px)] sm:w-[232px]",
} as const;

const DESKTOP_CARD = "md:w-[240px]";
const DESKTOP_CARD_WIDE = "md:w-[232px]";

const DESKTOP_WIDTH: Record<SectionCardsLayout, { default: string; wide: string }> = {
  "two-col": { default: DESKTOP_CARD, wide: DESKTOP_CARD_WIDE },
  "four-row": { default: DESKTOP_CARD, wide: DESKTOP_CARD },
  "four-two": { default: DESKTOP_CARD, wide: DESKTOP_CARD },
  "six-row": { default: DESKTOP_CARD, wide: DESKTOP_CARD },
};

const GRID_SLOT_CLASS: Record<SectionCardGridSlot, string> = {
  default: "",
  "bottom-left": "md:col-start-2 md:row-start-2",
  "bottom-right": "md:col-start-3 md:row-start-2",
};

export function SectionCardSlide({
  children,
  wide = false,
  layout = "two-col",
  gridSlot = "default",
}: SectionCardSlideProps) {
  const widthKey = wide ? "wide" : "default";

  return (
    <div
      className={cn(
        "shrink-0 snap-start",
        MOBILE_WIDTH[widthKey],
        DESKTOP_WIDTH[layout][widthKey],
        GRID_SLOT_CLASS[gridSlot]
      )}
    >
      {children}
    </div>
  );
}
