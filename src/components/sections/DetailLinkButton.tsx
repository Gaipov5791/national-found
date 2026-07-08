import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type DetailLinkButtonProps = {
  to: string;
  label?: string;
  className?: string;
};

const buttonClassName =
  "inline-block whitespace-nowrap rounded-full border border-white/40 bg-white/10 px-4 py-2 font-display text-[9px] font-semibold tracking-[0.18em] text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/20 sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.2em]";

export function DetailLinkButton({ to, label = "Подробнее", className }: DetailLinkButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span className="pointer-events-auto relative z-[60] mt-4 inline-block sm:mt-6">
      <Link
        to={to}
        data-cursor-hover
        data-detail-link
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        style={{
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease-out, border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease",
        }}
        className={cn("pointer-events-auto", buttonClassName, className)}
      >
        {label}
        <span aria-hidden className="ml-1.5 opacity-70 sm:ml-2">
          →
        </span>
      </Link>
    </span>
  );
}
