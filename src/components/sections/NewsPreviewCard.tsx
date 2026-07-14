import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCanHover } from "@/hooks/use-can-hover";

const HOVER_TRANSITION =
  "transform 0.3s ease-out, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease";

type NewsPreviewCardProps = {
  className?: string;
  title?: string;
  description?: string;
  imageLabel?: string;
};

export function NewsPreviewCard({
  className,
  title,
  description = "Описание новости",
  imageLabel = "изображение",
}: NewsPreviewCardProps) {
  const [hovered, setHovered] = useState(false);
  const canHover = useCanHover();

  return (
    <article
      data-cursor-hover
      onMouseEnter={() => canHover && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      style={{
        transform: canHover && hovered ? "scale(1.05)" : "scale(1)",
        transition: HOVER_TRANSITION,
      }}
      className={cn(
        "overflow-hidden rounded-2xl border border-white/25 bg-white/10 text-left shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)]",
        className
      )}
    >
      <div className="flex aspect-[4/3] min-h-[5.75rem] items-center justify-center bg-white/15 font-display text-[11px] tracking-wide text-white/60 sm:min-h-[7rem] sm:text-xs md:min-h-[8.5rem] md:text-sm">
        {imageLabel}
      </div>
      {title ? (
        <h3 className="px-3 pt-2.5 font-display text-xs font-semibold tracking-tight text-white sm:px-4 sm:pt-3 sm:text-sm">
          {title}
        </h3>
      ) : null}
      <p
        className={cn(
          "px-3 text-[11px] leading-relaxed text-white/85 sm:px-4 sm:text-xs",
          title ? "pb-2.5 pt-1 sm:pb-3 sm:pt-1.5" : "py-2.5 sm:py-3 md:py-3.5"
        )}
      >
        {description}
      </p>
    </article>
  );
}
