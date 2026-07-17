import { getBrandName, getBrandNameLines } from "@/lib/brand";
import type { Lang } from "@/lib/lang";
import { cn } from "@/lib/utils";

type BrandLockupProps = {
  lang: Lang;
  /** Text color for the fund name. */
  tone?: "blue" | "white";
  /** Visual size of the mark + title. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE = {
  sm: {
    mark: "h-8 w-8 sm:h-9 sm:w-9",
    gap: "gap-2 sm:gap-2.5",
    title:
      "text-[9px] leading-[1.15] tracking-[0.04em] sm:text-[10px] sm:tracking-[0.05em]",
  },
  md: {
    mark: "h-10 w-10 sm:h-12 sm:w-12",
    gap: "gap-2.5 sm:gap-3",
    title:
      "text-[10px] leading-[1.15] tracking-[0.04em] sm:text-xs sm:tracking-[0.06em] md:text-sm",
  },
  lg: {
    mark: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
    gap: "gap-3 sm:gap-3.5",
    title:
      "text-[11px] leading-[1.15] tracking-[0.04em] sm:text-xs sm:tracking-[0.06em] md:text-sm",
  },
} as const;

/** Crop the colorful mark (left square) from the full lockup PNG. */
const MARK_CLASS = "object-cover object-left";

/**
 * Icon + localized fund name (3 lines). Replaces the baked-in Russian text in logo PNGs.
 */
export function BrandLockup({
  lang,
  tone = "blue",
  size = "md",
  className,
}: BrandLockupProps) {
  const brandName = getBrandName(lang);
  const brandLines = getBrandNameLines(lang);
  const s = SIZE[size];
  const src = tone === "white" ? "/logo/logo-white.png" : "/logo/logo-blue.png";
  const textColor = tone === "white" ? "text-white" : "text-[#1E4F9C]";

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <img
        src={src}
        alt=""
        aria-hidden
        className={cn("shrink-0", s.mark, MARK_CLASS)}
      />
      <span
        className={cn(
          "min-w-0 text-left font-display font-bold uppercase",
          s.title,
          textColor
        )}
      >
        <span className="sr-only">{brandName}</span>
        {brandLines.map((line) => (
          <span key={line} aria-hidden className="block">
            {line}
          </span>
        ))}
      </span>
    </div>
  );
}
