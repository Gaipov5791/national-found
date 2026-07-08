import type { LucideIcon } from "lucide-react";
import {
  Factory,
  GraduationCap,
  HeartPulse,
  Mountain,
  Truck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const DIRECTION_ICON_MAP = {
  factory: Factory,
  truck: Truck,
  energy: Zap,
  tourism: Mountain,
  education: GraduationCap,
  health: HeartPulse,
} as const satisfies Record<string, LucideIcon>;

export type DirectionIconKey = keyof typeof DIRECTION_ICON_MAP;

type SectionCardIconProps = {
  src?: string;
  iconKey?: DirectionIconKey;
  compact?: boolean;
  variant?: "dark" | "light";
};

export function SectionCardIcon({ src, iconKey, compact = false, variant = "dark" }: SectionCardIconProps) {
  const sizeClass = compact ? "h-12 w-12 sm:h-16 sm:w-16" : "h-16 w-16 sm:h-20 sm:w-20";
  const offsetClass = compact ? "-top-6 sm:-top-8" : "-top-8 sm:-top-10";

  if (src) {
    return (
      <div className={cn("pointer-events-none absolute left-4 sm:left-5", offsetClass)}>
        <img
          src={src}
          alt=""
          className={cn("object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]", sizeClass)}
          loading="lazy"
        />
      </div>
    );
  }

  if (!iconKey) return null;

  const Icon = DIRECTION_ICON_MAP[iconKey];

  return (
    <div className={cn("pointer-events-none absolute left-4 sm:left-5", offsetClass)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl border shadow-[0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-md",
          sizeClass,
          variant === "dark"
            ? "border-white/30 bg-gradient-to-br from-white/20 to-white/5"
            : "border-[color:var(--ink)]/10 bg-gradient-to-br from-white to-[#e9eef5]"
        )}
      >
        <Icon
          className={cn(
            compact ? "h-5 w-5 sm:h-7 sm:w-7" : "h-7 w-7 sm:h-9 sm:w-9",
            variant === "dark" ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" : "text-[color:var(--ink)]"
          )}
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
