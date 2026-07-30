import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCanHover } from "@/hooks/use-can-hover";
import { SectionCardIcon, type DirectionIconKey } from "./SectionCardIcon";

type SectionCardProps = {
  title: string;
  description: string;
  icon?: string;
  iconKey?: DirectionIconKey;
  variant?: "dark" | "light";
  compact?: boolean;
};

const CARD_HOVER_TRANSITION =
  "transform 0.3s ease-out, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease";

const variants = {
  dark: {
    // Denser than the CTA glass so brand ink text stays readable.
    card: "border-white/70 bg-white/55 hover:border-white/85 hover:bg-white/70 hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)]",
    title: "text-[color:var(--ink)]",
    description: "text-[color:var(--ink)]/90",
  },
  light: {
    card: "border-white/70 bg-white/55 hover:border-white/85 hover:bg-white/70 hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
    title: "text-[color:var(--ink)]",
    description: "text-[color:var(--ink)]/90",
  },
} as const;

export function SectionCard({
  title,
  description,
  icon,
  iconKey,
  variant = "dark",
  compact = false,
}: SectionCardProps) {
  const [hovered, setHovered] = useState(false);
  const canHover = useCanHover();
  const styles = variants[variant];

  return (
    <div
      className="pointer-events-auto h-full"
      onMouseEnter={() => canHover && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          transform: canHover && hovered ? "scale(1.05)" : "scale(1)",
          transition: CARD_HOVER_TRANSITION,
        }}
        className={cn(
          "relative flex h-full cursor-pointer flex-col rounded-2xl border backdrop-blur-md",
          compact
            ? "px-3.5 pb-3.5 pt-12 text-center sm:px-4 sm:pb-4 sm:pt-14"
            : "px-4 pb-4 pt-11 text-left sm:px-5 sm:pb-5 sm:pt-12",
          styles.card
        )}
      >
        <SectionCardIcon src={icon} iconKey={iconKey} compact={compact} variant={variant} />
        <h3
          className={cn(
            "font-display text-sm font-bold leading-snug tracking-tight sm:text-[15px]",
            styles.title
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-1.5 text-xs leading-relaxed sm:mt-2 sm:text-sm",
            styles.description
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
