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
      className="pointer-events-auto absolute top-[62%] left-1/2 z-[60] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-white transition hover:text-white sm:top-[64%]"
    >
      <span className="sr-only">{t.common.scrollDown}</span>
      <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-black/25 shadow-[0_0_0_1px_rgba(0,0,0,0.35)] backdrop-blur-[2px] sm:h-20 sm:w-20">
        <ChevronDown className="h-10 w-10 animate-bounce motion-reduce:animate-none sm:h-12 sm:w-12" strokeWidth={2} />
      </span>
    </button>
  );
}
