import type { RefObject } from "react";
import { ChevronDown } from "lucide-react";
import { useT } from "@/lib/lang";

type HeroScrollHintProps = {
  hintRef: RefObject<HTMLButtonElement | null>;
  onClick: () => void;
};

export function HeroScrollHint({ hintRef, onClick }: HeroScrollHintProps) {
  const t = useT();

  return (
    <button
      ref={hintRef}
      type="button"
      onClick={onClick}
      data-cursor-hover
      aria-label={t.common.scrollDown}
      className="pointer-events-auto absolute top-1/2 left-1/2 z-[60] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-white/75 transition hover:text-white"
    >
      <span className="sr-only">{t.common.scrollDown}</span>
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/10 backdrop-blur-[2px] sm:h-14 sm:w-14">
        <ChevronDown className="h-7 w-7 animate-bounce motion-reduce:animate-none sm:h-8 sm:w-8" strokeWidth={1.6} />
      </span>
    </button>
  );
}
