import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type DetailLinkButtonProps = {
  to: string;
  label?: string;
  className?: string;
};

const defaultClassName =
  "pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 font-display text-[9px] font-semibold tracking-[0.18em] text-white backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/20 sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.2em]";

export function DetailLinkButton({ to, label = "Подробнее", className }: DetailLinkButtonProps) {
  return (
    <Link to={to} data-cursor-hover className={cn(defaultClassName, className)}>
      {label}
      <span aria-hidden className="opacity-70">
        →
      </span>
    </Link>
  );
}
