import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DIGIT_HEIGHT_EM = 1.1;

type RollingDigitProps = {
  digit: string;
  animate: boolean;
  size?: "default" | "large";
  idleRoll?: boolean;
  idlePhase?: number;
};

function digitWidth(digit: string, size: "default" | "large") {
  if (!/\d/.test(digit)) {
    return size === "large" ? "0.3em" : "0.22em";
  }
  return size === "large" ? "0.62em" : "0.54em";
}

function RollingDigit({ digit, animate, size = "default", idleRoll, idlePhase = 0 }: RollingDigitProps) {
  const isDigit = /\d/.test(digit);
  const target = isDigit ? Number(digit) : 0;
  const [idleDigit, setIdleDigit] = useState(target);

  useEffect(() => {
    setIdleDigit(target);
  }, [target]);

  useEffect(() => {
    if (!idleRoll || !isDigit) return;

    const interval = window.setInterval(() => {
      setIdleDigit((prev) => (prev + 1 + (idlePhase % 3)) % 10);
    }, 140 + idlePhase * 35);

    return () => window.clearInterval(interval);
  }, [idleRoll, isDigit, idlePhase]);

  if (!isDigit) {
    return (
      <span
        className="inline-block text-center"
        style={{ height: `${DIGIT_HEIGHT_EM}em`, width: digitWidth(digit, size) }}
      >
        {digit}
      </span>
    );
  }

  const digits = Array.from({ length: 10 }, (_, i) => i);
  const displayTarget = idleRoll ? idleDigit : target;

  return (
    <span
      className="relative inline-block overflow-hidden align-top tabular-nums"
      style={{
        height: `${DIGIT_HEIGHT_EM}em`,
        width: digitWidth(digit, size),
      }}
    >
      <span
        className="inline-flex flex-col will-change-transform"
        style={{
          transform: `translateY(-${displayTarget * DIGIT_HEIGHT_EM}em)`,
          transition:
            animate || idleRoll ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
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
};

export function RollingSumCounter({ value, progress, suffix = " с", size = "default" }: RollingSumCounterProps) {
  const prevProgress = useRef(0);
  const formatted = formatSum(value, progress);
  const shouldAnimate = progress > prevProgress.current;
  const isComplete = progress >= 0.99;
  const isLarge = size === "large";

  useEffect(() => {
    prevProgress.current = progress;
  }, [progress]);

  const digitChars = formatted.split("");
  const idleRollStart = Math.max(0, digitChars.findIndex((c) => /\d/.test(c)));

  return (
    <span
      className={cn(
        "mx-auto flex w-full items-center justify-center whitespace-nowrap font-display font-semibold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]",
        isLarge
          ? "text-[clamp(1.05rem,2.2vw+0.55rem,2.75rem)] leading-none"
          : "text-[clamp(0.62rem,1.05vw+0.42rem,1.65rem)] leading-none sm:text-[clamp(0.7rem,0.9vw+0.5rem,1.85rem)]"
      )}
    >
      {digitChars.map((char, i) => {
        const numericIndex = digitChars.slice(0, i + 1).filter((c) => /\d/.test(c)).length;
        const totalDigits = digitChars.filter((c) => /\d/.test(c)).length;
        const rollIdle = isComplete && /\d/.test(char) && numericIndex > totalDigits - 4;

        return (
          <RollingDigit
            key={`${i}-${isComplete ? "done" : char}`}
            digit={char}
            animate={shouldAnimate && progress > 0.1}
            size={size}
            idleRoll={rollIdle}
            idlePhase={i - idleRollStart}
          />
        );
      })}
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
  const eased = 1 - Math.pow(1 - p, 2.2);
  const current = Math.round(eased * value);
  return current.toLocaleString("ru-RU").replace(/\u00a0/g, " ");
}

export function formatProjectCount(value: number, progress: number): string {
  const p = Math.max(0, Math.min(1, progress));
  const eased = 1 - Math.pow(1 - p, 2);
  return String(Math.round(eased * value));
}
