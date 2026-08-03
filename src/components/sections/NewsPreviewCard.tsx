import { useState } from "react";
import { useCanHover } from "@/hooks/use-can-hover";
import { useT } from "@/lib/lang";
import { cn } from "@/lib/utils";

const HOVER_TRANSITION =
  "transform 0.3s ease-out, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease";

type NewsPreviewCardProps = {
  className?: string;
  title?: string;
  description?: string;
  imageLabel?: string;
  imageSrc?: string;
  href?: string;
  date?: string;
};

export function NewsPreviewCard({
  className,
  title,
  description,
  imageLabel,
  imageSrc,
  href,
  date,
}: NewsPreviewCardProps) {
  const t = useT();
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const canHover = useCanHover();
  const resolvedDescription = description ?? t.news.previewDescription;
  const resolvedImageLabel = imageLabel ?? t.news.previewImage;
  const showImage = Boolean(imageSrc) && !imgFailed;

  const inner = (
    <>
      <div className="relative aspect-[4/3] min-h-[5.5rem] overflow-hidden bg-white/15 sm:min-h-[6.5rem]">
        {showImage ? (
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full min-h-[5.5rem] items-center justify-center font-display text-xs tracking-wide text-white/60 sm:min-h-[6.5rem] sm:text-sm">
            {resolvedImageLabel}
          </div>
        )}
      </div>
      {date ? (
        <p className="px-3 pt-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55 sm:px-4 sm:pt-3">
          {date}
        </p>
      ) : null}
      {title ? (
        <h3
          className={cn(
            "px-3 font-display text-sm font-semibold leading-snug tracking-tight text-white sm:px-4 sm:text-[15px]",
            date ? "pt-1" : "pt-2.5 sm:pt-3"
          )}
        >
          {title}
        </h3>
      ) : null}
      <p
        className={cn(
          "px-3 text-xs leading-relaxed text-white/85 sm:px-4 sm:text-sm",
          title || date ? "pb-2.5 pt-1 sm:pb-3 sm:pt-1.5" : "py-2.5 sm:py-3"
        )}
      >
        {resolvedDescription}
      </p>
    </>
  );

  const sharedClassName = cn(
    "overflow-hidden rounded-2xl border border-white/25 bg-white/10 text-left shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15 hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)]",
    className
  );

  const sharedStyle = {
    transform: canHover && hovered ? "scale(1.05)" : "scale(1)",
    transition: HOVER_TRANSITION,
  } as const;

  const hoverHandlers = {
    onMouseEnter: () => canHover && setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        style={sharedStyle}
        className={cn(sharedClassName, "block")}
        {...hoverHandlers}
      >
        {inner}
      </a>
    );
  }

  return (
    <article
      data-cursor-hover
      tabIndex={0}
      style={sharedStyle}
      className={sharedClassName}
      {...hoverHandlers}
    >
      {inner}
    </article>
  );
}
