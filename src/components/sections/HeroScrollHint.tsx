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
      className="pointer-events-auto absolute bottom-6 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center pb-[max(0px,env(safe-area-inset-bottom))] text-white/80 transition hover:text-white sm:bottom-10"
    >
      <span className="sr-only">{t.common.scrollDown}</span>
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/20 backdrop-blur-sm sm:h-14 sm:w-14">
        <ChevronDown className="h-7 w-7 animate-bounce motion-reduce:animate-none sm:h-8 sm:w-8" strokeWidth={1.6} />
      </span>
    </button>
  );
}
