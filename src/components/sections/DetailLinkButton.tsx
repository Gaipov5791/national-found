import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCanHover } from "@/hooks/use-can-hover";
import { useT } from "@/lib/lang";
import type { SectionSceneLabel } from "@/lib/sectionNavigation";
import { cn } from "@/lib/utils";

type DetailLinkButtonProps = {
  to: string;
  originSection: SectionSceneLabel;
  label?: string;
  className?: string;
  containerClassName?: string;
  /** Equal-width stacked buttons (e.g. partners section). */
  block?: boolean;
};

/** Shared CTA size for «Подробнее», «Подать заявку», «Читать ещё». */
const buttonClassName =
  "inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full border border-white/80 bg-white/20 px-5 py-2.5 font-display text-sm font-semibold tracking-[0.06em] text-white shadow-[0_4px_24px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:border-white hover:bg-white/35 sm:min-h-11 sm:px-6 sm:py-2.5 sm:text-[15px] sm:tracking-[0.05em]";

const blockButtonClassName =
  "inline-flex h-full min-h-11 w-full items-center justify-center whitespace-normal rounded-full border border-white/90 bg-white/35 px-4 py-2.5 text-center font-display text-sm font-semibold leading-snug tracking-[0.05em] text-white shadow-[0_4px_24px_rgba(0,0,0,0.32)] transition hover:border-white hover:bg-white/45 sm:min-h-12 sm:px-5 sm:text-[15px]";

export function DetailLinkButton({
  to,
  originSection,
  label,
  className,
  containerClassName,
  block = false,
}: DetailLinkButtonProps) {
  const t = useT();
  const [hovered, setHovered] = useState(false);
  const canHover = useCanHover();
  const resolvedLabel = label ?? t.common.more;

  return (
    <span
      className={cn(
        "pointer-events-auto relative z-[60] mt-5 sm:mt-7",
        block ? "flex w-full" : "inline-block",
        containerClassName
      )}
    >
      <Link
        to={to}
        hash={originSection}
        data-cursor-hover
        data-detail-link
        onMouseEnter={() => canHover && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        style={{
          transform: canHover && hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease-out, border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease",
        }}
        className={cn("pointer-events-auto", block ? blockButtonClassName : buttonClassName, className)}
      >
        {resolvedLabel}
        <span aria-hidden className="ml-2 opacity-80 sm:ml-2.5">
          →
        </span>
      </Link>
    </span>
  );
}
