import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionCardsScrollerProps = {
  children: ReactNode;
  columns?: 2 | 3;
  className?: string;
};

export function SectionCardsScroller({ children, columns = 2, className }: SectionCardsScrollerProps) {
  const gridClass = columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-5xl",
        "flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "-mx-1 px-3 sm:px-1",
        "md:grid md:gap-5 md:overflow-visible md:snap-none md:px-0",
        gridClass,
        "lg:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

type SectionCardSlideProps = {
  children: ReactNode;
  wide?: boolean;
};

export function SectionCardSlide({ children, wide }: SectionCardSlideProps) {
  return (
    <div
      className={cn(
        "shrink-0 snap-start md:w-auto md:shrink",
        wide ? "w-[min(72vw,240px)] sm:w-[min(68vw,260px)]" : "w-[min(78vw,280px)] sm:w-[min(70vw,300px)]"
      )}
    >
      {children}
    </div>
  );
}
