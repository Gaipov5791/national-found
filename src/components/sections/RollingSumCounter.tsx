import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DIGIT_HEIGHT_EM = 1.1;

type RollingDigitProps = {
  digit: string;
  animate: boolean;
  compact?: boolean;
  idleRoll?: boolean;
  idlePhase?: number;
};

function RollingDigit({ digit, animate, compact, idleRoll, idlePhase = 0 }: RollingDigitProps) {
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
        className={cn("inline-block", compact ? "px-[0.02em]" : "px-[0.05em]")}
        style={{ height: `${DIGIT_HEIGHT_EM}em` }}
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
        width: compact ? "0.46em" : "0.54em",
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
  compact?: boolean;
};

export function RollingSumCounter({ value, progress, suffix = " с", compact = false }: RollingSumCounterProps) {
  const prevProgress = useRef(0);
  const formatted = formatSum(value, progress);
  const shouldAnimate = progress > prevProgress.current;
  const isComplete = progress >= 0.99;

  useEffect(() => {
    prevProgress.current = progress;
  }, [progress]);

  const digitChars = formatted.split("");
  const idleRollStart = Math.max(0, digitChars.findIndex((c) => /\d/.test(c)));

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-display font-semibold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]",
        compact
          ? "text-[clamp(0.58rem,2.4vw,1.2rem)] leading-none"
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
            compact={compact}
            idleRoll={rollIdle}
            idlePhase={i - idleRollStart}
          />
        );
      })}
      {suffix && (
        <span
          className={cn(
            "ml-0.5 font-semibold tracking-[0.08em] text-white/90 sm:ml-1",
            compact ? "text-[0.5em]" : "text-[0.55em]"
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
