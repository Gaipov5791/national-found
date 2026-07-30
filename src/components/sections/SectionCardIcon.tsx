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
  // Compact icons for standard card width; still overhang the top edge.
  const sizeClass = compact ? "h-20 w-20 sm:h-24 sm:w-24" : "h-24 w-24 sm:h-28 sm:w-28";
  const offsetClass = compact ? "-top-11 sm:-top-14" : "-top-14 sm:-top-16";

  if (src) {
    return (
      <div className={cn("pointer-events-none absolute left-1/2 -translate-x-1/2", offsetClass)}>
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
    <div className={cn("pointer-events-none absolute left-1/2 -translate-x-1/2", offsetClass)}>
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
            compact ? "h-8 w-8 sm:h-10 sm:w-10" : "h-10 w-10 sm:h-12 sm:w-12",
            variant === "dark" ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" : "text-[color:var(--ink)]"
          )}
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
