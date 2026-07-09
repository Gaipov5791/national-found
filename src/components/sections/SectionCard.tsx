import { cn } from "@/lib/utils";
import { SectionCardIcon, type DirectionIconKey } from "./SectionCardIcon";

type SectionCardProps = {
  title: string;
  description: string;
  icon?: string;
  iconKey?: DirectionIconKey;
  variant?: "dark" | "light";
  compact?: boolean;
};

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
  const styles = variants[variant];

  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex h-full cursor-pointer flex-col rounded-2xl border backdrop-blur-md transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.02] sm:rounded-3xl",
        compact ? "text-center px-4 pb-4 pt-16 sm:px-5 sm:pb-5 sm:pt-20" : "text-left px-5 pb-5 pt-10 sm:px-6 sm:pb-6 sm:pt-12",
        styles.card
      )}
    >
      <SectionCardIcon src={icon} iconKey={iconKey} compact={compact} variant={variant} />
      <h3
        className={cn(
          "font-display font-bold tracking-tight",
          compact ? "text-xs sm:text-sm md:text-base" : "text-sm sm:text-base md:text-lg",
          styles.title
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-1.5 leading-relaxed sm:mt-2",
          compact ? "text-[10px] sm:text-[11px] md:text-xs" : "text-[11px] sm:text-xs md:text-sm",
          styles.description
        )}
      >
        {description}
      </p>
    </div>
  );
}
