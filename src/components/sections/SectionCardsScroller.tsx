import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionCardsLayout = "two-col" | "four-row" | "four-two";

type SectionCardsScrollerProps = {
  children: ReactNode;
  layout?: SectionCardsLayout;
  className?: string;
};

const LAYOUT_MAX_WIDTH: Record<SectionCardsLayout, string> = {
  "two-col": "max-w-5xl",
  "four-row": "max-w-[min(100%,72rem)]",
  "four-two": "max-w-[min(100%,72rem)]",
};

const LAYOUT_GRID: Record<SectionCardsLayout, string> = {
  "two-col": "md:grid-cols-2",
  "four-row": "md:grid-cols-4",
  "four-two": "md:grid-cols-4",
};

export function SectionCardsScroller({
  children,
  layout = "two-col",
  className,
}: SectionCardsScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const childCount = useMemo(() => {
    // Works for both arrays and single child.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyChildren = children as any;
    return Array.isArray(anyChildren) ? anyChildren.length : 1;
  }, [children]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;
    if (childCount <= 1) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let intervalId: number | null = null;
    let resumeTimeoutId: number | null = null;
    let pausedUntil = 0;

    const pause = (ms: number) => {
      pausedUntil = Date.now() + ms;
      if (resumeTimeoutId) window.clearTimeout(resumeTimeoutId);
      resumeTimeoutId = window.setTimeout(() => {
        // no-op: interval loop checks pausedUntil
      }, ms);
    };

    const stepOnce = () => {
      if (!el) return;
      if (Date.now() < pausedUntil) return;

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

    // Pause auto-swipe after any manual interaction.
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
  }, [childCount]);

  return (
    <div
      ref={scrollerRef}
      className={cn(
        "mx-auto w-full",
        LAYOUT_MAX_WIDTH[layout],
        "flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-visible overscroll-x-contain pb-1 pt-8 md:pt-0",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "-mx-1 px-3 sm:px-1",
        "md:mx-auto md:grid md:w-fit md:max-w-full md:justify-items-stretch md:overflow-visible md:snap-none md:px-0 md:gap-4 lg:gap-5",
        layout === "four-two" ? "md:gap-y-10 lg:gap-y-12" : "",
        LAYOUT_GRID[layout],
        className
      )}
    >
      {children}
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
    default: "md:w-[280px] lg:w-[300px]",
    wide: "md:w-[240px] lg:w-[260px]",
  },
  "four-row": {
    default: "md:w-[220px] lg:w-[240px]",
    wide: "md:w-[220px] lg:w-[240px]",
  },
  "four-two": {
    default: "md:w-[220px] lg:w-[240px]",
    wide: "md:w-[220px] lg:w-[240px]",
  },
};

const GRID_SLOT_CLASS: Record<SectionCardGridSlot, string> = {
  default: "",
  "bottom-left": "md:col-start-2",
  "bottom-right": "md:col-start-3",
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
