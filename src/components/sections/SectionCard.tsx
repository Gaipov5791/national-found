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
    // Landing cards: white semi-transparent border + brand-blue text
    card: "border-white/30 bg-white/[0.07] hover:bg-white/[0.12] hover:border-white/50 hover:shadow-[0_18px_48px_rgba(0,0,0,0.35)]",
    title: "text-[color:var(--ink)]",
    description: "text-[color:var(--ink)]/75",
  },
  light: {
    card: "border-[color:var(--ink)]/10 bg-white/70 hover:bg-white/90 hover:border-[color:var(--ink)]/20 hover:shadow-[0_18px_50px_rgba(20,40,90,0.16)]",
    title: "text-[color:var(--ink)]",
    description: "text-[color:var(--ink)]/75",
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
          "relative flex h-full cursor-pointer flex-col rounded-2xl border backdrop-blur-md sm:rounded-3xl",
          compact ? "text-center px-4 pb-4 pt-16 sm:px-5 sm:pb-5 sm:pt-20" : "text-left px-5 pb-5 pt-10 sm:px-6 sm:pb-6 sm:pt-12",
          styles.card
        )}
      >
        <SectionCardIcon src={icon} iconKey={iconKey} compact={compact} variant={variant} />
        <h3
          className={cn(
            "font-display font-bold tracking-tight",
            compact ? "text-sm sm:text-base md:text-lg" : "text-sm sm:text-base md:text-lg",
            styles.title
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-1.5 leading-relaxed sm:mt-2",
            compact ? "text-xs sm:text-sm md:text-base" : "text-xs sm:text-sm md:text-base",
            styles.description
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
