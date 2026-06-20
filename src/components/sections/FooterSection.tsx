import { forwardRef, type RefObject } from "react";
import { SCENE_IMAGES } from "./sceneImages";

export type FooterSectionProps = {
  footerContentZoneRef: RefObject<HTMLDivElement | null>;
  footerBgRef: RefObject<HTMLImageElement | null>;
  onScrollToTop: () => void;
};

export const FooterSection = forwardRef<HTMLDivElement, FooterSectionProps>(function FooterSection(
  { footerContentZoneRef, footerBgRef, onScrollToTop },
  _ref
) {
  return (
    <div
      ref={footerContentZoneRef}
      id="footer-content-zone"
      data-lovable-slot="footer-content"
      aria-label="Footer content zone"
      className="pointer-events-none absolute inset-0 z-[35] overflow-hidden opacity-0 will-change-[transform,opacity]"
    >
      <img
        ref={footerBgRef}
        src={SCENE_IMAGES.footer}
        alt=""
        aria-hidden
        className="w-full h-full object-cover absolute inset-0 will-change-transform"
        style={{ transformOrigin: "50% 70%" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/80" aria-hidden />
      <div
        className="pointer-events-auto absolute bottom-10 left-1/2 z-10 will-change-transform sm:bottom-12"
        style={{ transform: "translate3d(-50%, 0, 0)" }}
      >
        <button
          type="button"
          onClick={onScrollToTop}
          data-cursor-hover
          aria-label="Вернуться наверх"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-transparent font-display text-[9px] font-semibold tracking-[0.28em] text-white transition-all duration-300 will-change-transform hover:scale-110 hover:border-white sm:h-16 sm:w-16 sm:text-[10px]"
        >
          <span className="sr-only">Вернуться наверх</span>
          <span aria-hidden className="text-base leading-none sm:text-lg">
            ↑
          </span>
        </button>
      </div>
    </div>
  );
});
