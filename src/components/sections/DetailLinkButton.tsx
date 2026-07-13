import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useCanHover } from "@/hooks/use-can-hover";

type DetailLinkButtonProps = {
  to: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  /** Equal-width stacked buttons (e.g. partners section). */
  block?: boolean;
};

const buttonClassName =
  "inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border border-white/80 bg-white/20 px-6 py-2.5 font-display text-xs font-semibold tracking-[0.14em] text-white shadow-[0_4px_24px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:border-white hover:bg-white/35 sm:min-h-12 sm:px-7 sm:py-3 sm:text-[13px] sm:tracking-[0.16em] md:px-8 md:py-3.5 md:text-sm md:tracking-[0.18em]";

const blockButtonClassName =
  "inline-flex h-full min-h-[4.75rem] w-full items-center justify-center whitespace-normal rounded-full border border-white/90 bg-white/35 px-4 py-3 text-center font-display text-xs font-semibold leading-snug tracking-[0.08em] text-white shadow-[0_4px_24px_rgba(0,0,0,0.32)] transition hover:border-white hover:bg-white/45 sm:min-h-[5.25rem] sm:px-5 sm:py-3.5 sm:text-sm sm:leading-snug sm:tracking-[0.1em] md:px-4 lg:px-5";

export function DetailLinkButton({
  to,
  label = "Подробнее",
  className,
  containerClassName,
  block = false,
}: DetailLinkButtonProps) {
  const [hovered, setHovered] = useState(false);
  const canHover = useCanHover();

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
        {label}
        <span aria-hidden className="ml-2 opacity-80 sm:ml-2.5">
          →
        </span>
      </Link>
    </span>
  );
}
