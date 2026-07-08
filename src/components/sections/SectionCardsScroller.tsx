import type { ReactNode } from "react";
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
  return (
    <div
      className={cn(
        "mx-auto w-full",
        LAYOUT_MAX_WIDTH[layout],
        "flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "-mx-1 px-3 sm:px-1",
        "md:mx-auto md:grid md:w-fit md:max-w-full md:justify-items-stretch md:overflow-visible md:snap-none md:px-0 md:gap-4 lg:gap-5",
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
