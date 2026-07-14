import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { attachHorizontalAutoSwipe } from "./horizontalCardSwipe";
import { SECTION_CARDS_SCROLLER_PT } from "./sectionLayout";

export type SectionCardsLayout = "two-col" | "four-row" | "four-two" | "six-row";

type SectionCardsScrollerProps = {
  children: ReactNode;
  layout?: SectionCardsLayout;
  className?: string;
  /** Auto-advance whenever content overflows (any breakpoint). Default: mobile-only. */
  autoSwipeOnOverflow?: boolean;
};

const LAYOUT_MAX_WIDTH: Record<SectionCardsLayout, string> = {
  "two-col": "max-w-5xl",
  "four-row": "max-w-[min(100%,72rem)] xl:max-w-[min(100%,80rem)] 2xl:max-w-[min(100%,88rem)]",
  "four-two": "max-w-[min(100%,72rem)] xl:max-w-[min(100%,80rem)] 2xl:max-w-[min(100%,88rem)]",
  // Cap width so 6 finance-sized cards always overflow and can auto-swipe.
  "six-row": "max-w-[min(100%,68rem)] xl:max-w-[min(100%,72rem)] 2xl:max-w-[min(100%,78rem)]",
};

const LAYOUT_GRID: Record<SectionCardsLayout, string> = {
  "two-col": "md:grid-cols-2",
  "four-row": "md:grid-cols-4",
  "four-two": "md:grid-cols-4",
  "six-row": "",
};

export function SectionCardsScroller({
  children,
  layout = "two-col",
  className,
  autoSwipeOnOverflow = false,
}: SectionCardsScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollRow = layout === "six-row";

  const childCount = useMemo(() => {
    // Works for both arrays and single child.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyChildren = children as any;
    return Array.isArray(anyChildren) ? anyChildren.length : 1;
  }, [children]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    if (typeof window === "undefined") return;
    if (childCount <= 1) return;

    const shouldAttach = () => {
      if (autoSwipeOnOverflow || scrollRow) return true;
      return window.innerWidth < 768;
    };

    if (!shouldAttach()) return;

    const controller = attachHorizontalAutoSwipe({
      scroller,
      track,
      pingPong: true,
      intervalMs: 2400,
    });

    return () => controller?.stop();
  }, [childCount, autoSwipeOnOverflow, scrollRow]);

  const desktopGrid = !scrollRow;

  return (
    <div
      ref={scrollerRef}
      className={cn(
        "mx-auto w-full",
        LAYOUT_MAX_WIDTH[layout],
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
          scrollRow
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
  );
}

export type SectionCardGridSlot = "default" | "bottom-left" | "bottom-right";

type SectionCardSlideProps = {
  children: ReactNode;
  wide?: boolean;
  layout?: SectionCardsLayout;
  gridSlot?: SectionCardGridSlot;
};

const MOBILE_WIDTH = {
  default: "w-[min(78vw,280px)] sm:w-[min(70vw,300px)]",
  wide: "w-[min(72vw,240px)] sm:w-[min(68vw,260px)]",
} as const;

const DESKTOP_WIDTH: Record<SectionCardsLayout, { default: string; wide: string }> = {
  "two-col": {
    default: "md:w-[280px] lg:w-[300px] xl:w-[320px] 2xl:w-[340px]",
    wide: "md:w-[240px] lg:w-[260px] xl:w-[280px] 2xl:w-[300px]",
  },
  "four-row": {
    default: "md:w-[220px] lg:w-[240px] xl:w-[260px] 2xl:w-[280px]",
    wide: "md:w-[220px] lg:w-[240px] xl:w-[260px] 2xl:w-[280px]",
  },
  "four-two": {
    default: "md:w-[220px] lg:w-[240px] xl:w-[260px] 2xl:w-[280px]",
    wide: "md:w-[220px] lg:w-[240px] xl:w-[260px] 2xl:w-[280px]",
  },
  "six-row": {
    default: "md:w-[220px] lg:w-[240px] xl:w-[260px] 2xl:w-[280px]",
    wide: "md:w-[220px] lg:w-[240px] xl:w-[260px] 2xl:w-[280px]",
  },
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
