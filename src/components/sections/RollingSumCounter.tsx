import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const DIGIT_HEIGHT_EM = 1.1;

type RollingDigitProps = {
  digit: string;
  animate: boolean;
  size?: "default" | "large";
  wide?: boolean;
};

function digitWidth(digit: string, size: "default" | "large", wide?: boolean) {
  if (!/\d/.test(digit)) {
    if (wide) return "0.34em";
    return size === "large" ? "0.34em" : "0.22em";
  }
  if (wide) return "0.68em";
  return size === "large" ? "0.58em" : "0.54em";
}

function RollingDigit({ digit, animate, size = "default", wide }: RollingDigitProps) {
  const isDigit = /\d/.test(digit);
  const target = isDigit ? Number(digit) : 0;

  if (!isDigit) {
    return (
      <span
        className="inline-block text-center"
        style={{ height: `${DIGIT_HEIGHT_EM}em`, width: digitWidth(digit, size, wide) }}
      >
        {digit}
      </span>
    );
  }

  const digits = Array.from({ length: 10 }, (_, i) => i);

  return (
    <span
      className="relative inline-block overflow-hidden align-top tabular-nums"
      style={{
        height: `${DIGIT_HEIGHT_EM}em`,
        width: digitWidth(digit, size, wide),
      }}
    >
      <span
        className="inline-flex flex-col will-change-transform"
        style={{
          transform: `translateY(-${target * DIGIT_HEIGHT_EM}em)`,
          transition: animate ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
      >
        {digits.map((d) => (
          <span
            key={d}
            className="flex items-center justify-center"
            style={{ height: `${DIGIT_HEIGHT_EM}em` }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

type RollingSumCounterProps = {
  value: number;
  progress: number;
  suffix?: string;
  size?: "default" | "large";
  className?: string;
  wideDigits?: boolean;
};

export function RollingSumCounter({
  value,
  progress,
  suffix = " с",
  size = "default",
  className,
  wideDigits = false,
}: RollingSumCounterProps) {
  const prevProgress = useRef(0);
  const formatted = formatSum(value, progress);
  const shouldAnimate = Math.abs(progress - prevProgress.current) > 0.0005;
  const isLarge = size === "large";

  useEffect(() => {
    prevProgress.current = progress;
  }, [progress]);

  return (
    <span
      className={cn(
        "mx-auto inline-flex w-max min-w-0 items-center justify-center whitespace-nowrap leading-none",
        className ??
          cn(
            "font-display font-semibold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]",
            isLarge
              ? "text-[clamp(1.15rem,1.35vw+0.7rem,2.35rem)]"
              : "text-[clamp(0.62rem,1.05vw+0.42rem,1.65rem)] sm:text-[clamp(0.7rem,0.9vw+0.5rem,1.85rem)]"
          )
      )}
    >
      {formatted.split("").map((char, i) => (
        <RollingDigit
          key={`${i}-${/\d/.test(char) ? "d" : char}`}
          digit={char}
          animate={shouldAnimate}
          size={size}
          wide={wideDigits}
        />
      ))}
      {suffix && (
        <span
          className={cn(
            "ml-1 shrink-0 font-semibold tracking-[0.06em] text-white/90 sm:ml-1.5",
            isLarge ? "text-[0.45em]" : "text-[0.55em]"
          )}
        >
          {suffix.trim()}
        </span>
      )}
    </span>
  );
}

function formatSum(value: number, progress: number): string {
  const p = Math.max(0, Math.min(1, progress));
  if (p >= 1) {
    return value.toLocaleString("ru-RU").replace(/\u00a0/g, " ");
  }
  const eased = 1 - Math.pow(1 - p, 2.2);
  const current = Math.round(eased * value);
  return current.toLocaleString("ru-RU").replace(/\u00a0/g, " ");
}

export function formatProjectCount(value: number, progress: number): string {
  const p = Math.max(0, Math.min(1, progress));
  if (p >= 1) return String(value);
  const eased = 1 - Math.pow(1 - p, 2);
  return String(Math.round(eased * value));
}
