import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { Instagram } from "lucide-react";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type FooterSceneRefs = {
  footerContentZoneRef: RefObject<HTMLDivElement | null>;
};

export function prepareFooterScene(refs: FooterSceneRefs, _ctx: SceneAnimationContext) {
  gsap.set(refs.footerContentZoneRef.current, { autoAlpha: 0 });
}

export function animateFooterScene(tl: SceneTimeline, refs: FooterSceneRefs, ctx: SceneAnimationContext) {
  const { timings } = ctx;
  const { enterDur, footerEnterT, footerHoldDur } = timings;
  const footerEl = refs.footerContentZoneRef.current;
  if (!footerEl) return;

  tl.set(footerEl, { autoAlpha: 0 }, 0);

  tl.fromTo(
    footerEl,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: enterDur, ease: "power2.out", immediateRender: false },
    footerEnterT
  );
  tl.to(footerEl, { autoAlpha: 1, duration: footerHoldDur, ease: "none" }, footerEnterT + enterDur);
}

export type FooterSectionProps = {
  footerContentZoneRef: RefObject<HTMLDivElement | null>;
  onScrollToTop: () => void;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export const FooterSection = forwardRef<HTMLDivElement, FooterSectionProps>(function FooterSection(
  { footerContentZoneRef, onScrollToTop },
  _ref
) {
  return (
    <div
      ref={footerContentZoneRef}
      id="kontakty"
      data-lovable-slot="footer-content"
      aria-label="Footer content zone"
      className="pointer-events-none absolute inset-0 z-[35] overflow-hidden opacity-0 will-change-[transform,opacity]"
    >
      <div className="pointer-events-none absolute inset-0 bg-black/80" data-cursor-surface="dark" aria-hidden />

      <footer className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 flex max-h-[92svh] flex-col overflow-y-auto px-4 pb-20 pt-8 font-display text-white sm:max-h-none sm:overflow-visible sm:px-8 sm:pb-8 sm:pt-10 md:px-12 lg:px-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-4 sm:gap-6 lg:max-w-sm">
            <div className="flex items-start gap-3 sm:gap-4">
              <img
                src="/logo/logo-white.png"
                alt="НИФ КР"
                className="h-12 w-auto shrink-0 sm:h-14 md:h-16"
              />
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/nif.kg.official"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <Instagram size={18} strokeWidth={1.75} />
              </a>
              <a
                href="https://wa.me/996880000430"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div className="text-xs leading-relaxed text-white/85 sm:text-sm sm:text-[15px] lg:max-w-md lg:text-right">
            <p className="mb-1 text-xs font-semibold tracking-[0.12em] text-white/60">Адрес</p>
            <p className="mb-5">
              Кыргызская Республика, 720001
              <br />
              г. Бишкек, ул. Токтогула, 125/1, БЦ «Авангард»,
              <br />
              <strong className="font-semibold text-white">Башня &quot;А&quot;</strong>, 8 этаж,{" "}
              <strong className="font-semibold text-white">правое крыло</strong>
            </p>

            <p className="mb-1 text-xs font-semibold tracking-[0.12em] text-white/60">Телефон:</p>
            <p className="mb-5">
              <a
                href="tel:+996312886668"
                data-cursor-hover
                className="transition-colors hover:text-white"
              >
                +996 312 88 66 68
              </a>
              <br />
              <a
                href="tel:+996880000430"
                data-cursor-hover
                className="transition-colors hover:text-white"
              >
                +996 880 00 04 30
              </a>
            </p>

            <p className="mb-1 text-xs font-semibold tracking-[0.12em] text-white/60">Телефон доверия:</p>
            <p>
              <a
                href="tel:+996990003055"
                data-cursor-hover
                className="transition-colors hover:text-white"
              >
                +996 990 00 30 55
              </a>
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-3 border-t border-white/15 pt-5 text-[10px] leading-relaxed text-white/55 sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
          <p>
            © 2026 Общественный фонд «Фонд социального партнёрства по развитию регионов»
          </p>
          <p className="shrink-0 text-white/45 sm:text-right">Разработчик Гаипов Бакыт</p>
        </div>
      </footer>

      <div className="pointer-events-auto absolute bottom-4 right-4 z-20 will-change-transform sm:bottom-12 sm:right-8 md:right-12 lg:right-16">
        <button
          type="button"
          onClick={onScrollToTop}
          data-cursor-hover
          aria-label="Вернуться наверх"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/30 font-display text-[9px] font-semibold tracking-[0.28em] text-white backdrop-blur-sm transition-all duration-300 will-change-transform hover:scale-110 hover:border-white sm:h-16 sm:w-16 sm:bg-transparent sm:text-[10px]"
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
