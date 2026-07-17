import { forwardRef, useMemo, useState, type MouseEvent, type RefObject } from "react";
import { Menu, X } from "lucide-react";
import { BRAND_TOP_CLASS } from "@/components/sections/sectionLayout";
import { getBrandName, getBrandNameLines, getBrandShort } from "@/lib/brand";
import type { Lang } from "@/lib/lang";
import type { NavId } from "@/lib/navConfig";

export type NavItemView = {
  id: NavId;
  label: string;
};

type NavbarProps = {
  navItems: readonly NavItemView[];
  langs: readonly Lang[];
  lang: Lang;
  languageLabel: string;
  menuLabel: string;
  brandRef?: RefObject<HTMLDivElement | null>;
  navBrandLogoRef?: RefObject<HTMLImageElement | null>;
  onLangChange: (lang: Lang) => void;
  onNavClick: (id: NavId) => void;
};

/** Crop the mark (left square) out of the full lockup PNG. */
const MARK_IMG_CLASS = "object-cover object-left";

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(function Navbar(
  {
    navItems,
    langs,
    lang,
    languageLabel,
    menuLabel,
    brandRef,
    navBrandLogoRef,
    onLangChange,
    onNavClick,
  },
  ref
) {
  const [navOpen, setNavOpen] = useState(false);

  const brandName = useMemo(() => getBrandName(lang), [lang]);
  const brandLines = useMemo(() => getBrandNameLines(lang), [lang]);
  const brandShort = useMemo(() => getBrandShort(lang), [lang]);

  const handleNavAnchorClick = useMemo(
    () => (id: NavId) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setNavOpen(false);
      onNavClick(id);
    },
    [onNavClick]
  );

  return (
    <div ref={ref} className="fixed top-0 left-0 w-full z-[100] bg-transparent">
      <header className="px-3 pt-4 sm:px-4 md:px-5 md:pt-6 lg:px-6 xl:px-8">
        <div className="mx-auto w-full max-w-[min(100%,94rem)]">
          <nav
            data-cursor-surface="light"
            className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-full border border-white/40 bg-white/40 px-4 py-2.5 font-display backdrop-blur-xl shadow-[0_8px_30px_rgba(20,40,90,0.08)] sm:gap-3 sm:px-4 sm:py-3 md:gap-4 md:px-6 md:py-4 lg:gap-5 lg:px-7 xl:px-9"
          >
            <div className="flex shrink-0 items-center pr-1 sm:pr-0">
              <img
                ref={navBrandLogoRef}
                src="/logo/logo-blue.png"
                alt={brandShort}
                className={`block h-8 w-8 sm:h-9 sm:w-9 md:hidden ${MARK_IMG_CLASS}`}
              />
              <div className="hidden md:block h-[52px] w-[52px] shrink-0" aria-hidden />
            </div>

            <ul className="hidden min-w-0 items-center justify-center gap-x-3 text-[10px] font-semibold tracking-[0.12em] text-[color:var(--ink)] lg:flex xl:gap-x-5 xl:text-[10.5px] xl:tracking-[0.14em] 2xl:gap-x-6 2xl:text-xs 2xl:tracking-[0.15em]">
              {navItems.map((item) => (
                <li key={item.id} className="shrink-0">
                  <a
                    href="#"
                    data-cursor-hover
                    onClick={handleNavAnchorClick(item.id)}
                    className="inline-block whitespace-nowrap py-1.5 transition-transform duration-300 ease-out hover:scale-110 hover:text-[color:var(--gold)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="col-start-3 row-start-1 flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1 md:hidden" aria-label={languageLabel}>
                {langs.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => onLangChange(l)}
                    aria-pressed={lang === l}
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold tracking-[0.12em] transition sm:px-2.5 sm:text-[11px] ${
                      lang === l
                        ? "bg-[color:var(--ink)] text-white"
                        : "bg-transparent text-[color:var(--ink)]/55 hover:bg-[color:var(--ink)]/10 hover:text-[color:var(--ink)]"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <div className="hidden min-w-[5.5rem] items-center justify-end gap-2.5 pl-1 text-xs font-semibold tracking-[0.18em] text-[color:var(--ink)] md:flex">
                <span className="whitespace-nowrap">{lang}</span>
                <div className="flex gap-1.5">
                  {langs.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => onLangChange(l)}
                      data-cursor-hover
                      aria-label={l}
                      aria-pressed={lang === l}
                      className={`h-2 w-2 rounded-full transition-all ${
                        lang === l
                          ? "bg-[color:var(--ink)] scale-125"
                          : "bg-[color:var(--ink)]/30 hover:bg-[color:var(--ink)]/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNavOpen((v) => !v)}
                aria-label={menuLabel}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/60 pl-0.5 text-[color:var(--ink)] shadow-sm transition hover:bg-white sm:h-10 sm:w-10 lg:h-11 lg:w-11 lg:hidden"
              >
                {navOpen ? (
                  <X className="h-[18px] w-[18px] lg:h-5 lg:w-5" />
                ) : (
                  <Menu className="h-[18px] w-[18px] lg:h-5 lg:w-5" />
                )}
              </button>
            </div>
          </nav>

          <div
            data-cursor-surface="light"
            className={`mt-3 w-full overflow-hidden rounded-3xl border border-white/40 bg-white/80 font-display backdrop-blur-2xl shadow-[0_20px_60px_rgba(20,40,90,0.18)] transition-all duration-500 ease-out lg:hidden ${
              navOpen ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <ul className="flex flex-col divide-y divide-[color:var(--ink)]/10 px-2 py-2 text-[12px] font-semibold tracking-[0.16em] text-[color:var(--ink)]">
              {navItems.map((item, i) => (
                <li
                  key={item.id}
                  style={{ transitionDelay: navOpen ? `${80 + i * 45}ms` : "0ms" }}
                  className={`transform transition-all duration-500 ${
                    navOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                  }`}
                >
                  <a
                    href="#"
                    onClick={handleNavAnchorClick(item.id)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-[color:var(--ink)]/5 hover:text-[color:var(--gold)]"
                  >
                    <span className="pr-3 text-left text-[11px] leading-snug tracking-[0.12em] sm:text-[12px] sm:tracking-[0.16em]">
                      {item.label}
                    </span>
                    <span className="text-[color:var(--gold)] opacity-60">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-[color:var(--ink)]/10 px-5 py-4">
              <span className="text-[11px] font-semibold tracking-[0.22em] text-[color:var(--ink)]/70">
                {languageLabel}
              </span>
              <div className="flex gap-2">
                {langs.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => onLangChange(l)}
                    aria-pressed={lang === l}
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] transition ${
                      lang === l
                        ? "bg-[color:var(--ink)] text-white"
                        : "bg-transparent text-[color:var(--ink)]/70 hover:bg-[color:var(--ink)]/10"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={brandRef}
        className={`pointer-events-none fixed left-1/2 ${BRAND_TOP_CLASS} z-[65] w-full max-w-[min(100%,980px)] -translate-x-1/2 px-4 will-change-[transform,opacity] sm:px-6 2xl:max-w-[min(100%,1200px)]`}
        style={{ mixBlendMode: "normal", isolation: "isolate" }}
      >
        <div
          className="mx-auto flex w-full max-w-[42rem] items-center justify-center gap-2.5 sm:gap-3.5 md:gap-4"
          style={{ mixBlendMode: "normal", textShadow: "0 4px 24px rgba(8,16,36,0.72)" }}
        >
          <img
            src="/logo/logo-blue.png"
            alt=""
            aria-hidden
            className={`h-10 w-10 shrink-0 opacity-100 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16 ${MARK_IMG_CLASS}`}
            loading="eager"
          />
          <h1 className="min-w-0 text-left font-display text-[10px] font-bold uppercase leading-[1.15] tracking-[0.04em] text-[#1E4F9C] sm:text-xs sm:tracking-[0.06em] md:text-sm md:tracking-[0.08em] lg:text-base 2xl:text-lg">
            <span className="sr-only">{brandName}</span>
            {brandLines.map((line) => (
              <span key={line} aria-hidden className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
});
