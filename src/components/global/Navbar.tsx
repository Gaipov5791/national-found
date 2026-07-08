import { forwardRef, useMemo, useState, type MouseEvent, type RefObject } from "react";
import { Menu, X } from "lucide-react";
import fundLogo from "@/assets/fund-logo.png.asset.json";

type NavbarProps = {
  navItems: readonly string[];
  langs: readonly string[];
  lang: string;
  brandRef?: RefObject<HTMLDivElement | null>;
  onLangChange: (lang: string) => void;
  onNavClick: (label: string) => void;
};

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(function Navbar(
  { navItems, langs, lang, brandRef, onLangChange, onNavClick },
  ref
) {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavAnchorClick = useMemo(
    () => (label: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setNavOpen(false);
      onNavClick(label);
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
              <img src={fundLogo.url} alt="НИФ КР" className="block h-8 w-auto sm:h-9 md:hidden" />
              <div className="hidden md:block h-[52px] w-[52px] shrink-0" aria-hidden />
            </div>

            <ul className="hidden min-w-0 items-center justify-center gap-x-3 text-[10px] font-semibold tracking-[0.12em] text-[color:var(--ink)] lg:flex xl:gap-x-5 xl:text-[10.5px] xl:tracking-[0.14em] 2xl:gap-x-6 2xl:text-xs 2xl:tracking-[0.15em]">
              {navItems.map((label) => (
                <li key={label} className="shrink-0">
                  <a
                    href="#"
                    data-cursor-hover
                    onClick={handleNavAnchorClick(label)}
                    className="inline-block whitespace-nowrap py-1.5 transition-transform duration-300 ease-out hover:scale-110 hover:text-[color:var(--gold)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden min-w-[5.5rem] shrink-0 items-center justify-end gap-2.5 pl-2 text-xs font-semibold tracking-[0.18em] text-[color:var(--ink)] md:flex">
              <span className="whitespace-nowrap">{lang}</span>
              <div className="flex gap-1.5">
                {langs.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => onLangChange(l)}
                    data-cursor-hover
                    aria-label={l}
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
              aria-label="Меню"
              className="col-start-3 row-start-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/60 pl-0.5 text-[color:var(--ink)] shadow-sm transition hover:bg-white sm:h-10 sm:w-10 lg:col-start-auto lg:h-11 lg:w-11 lg:hidden"
            >
              {navOpen ? (
                <X className="h-[18px] w-[18px] lg:h-5 lg:w-5" />
              ) : (
                <Menu className="h-[18px] w-[18px] lg:h-5 lg:w-5" />
              )}
            </button>
          </nav>

          <div
            data-cursor-surface="light"
            className={`mt-3 w-full overflow-hidden rounded-3xl border border-white/40 bg-white/80 font-display backdrop-blur-2xl shadow-[0_20px_60px_rgba(20,40,90,0.18)] transition-all duration-500 ease-out lg:hidden ${
              navOpen ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <ul className="flex flex-col divide-y divide-[color:var(--ink)]/10 px-2 py-2 text-[12px] font-semibold tracking-[0.16em] text-[color:var(--ink)]">
              {navItems.map((label, i) => (
                <li
                  key={label}
                  style={{ transitionDelay: navOpen ? `${80 + i * 45}ms` : "0ms" }}
                  className={`transform transition-all duration-500 ${
                    navOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                  }`}
                >
                  <a
                    href="#"
                    onClick={handleNavAnchorClick(label)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-[color:var(--ink)]/5 hover:text-[color:var(--gold)]"
                  >
                    <span className="pr-3 text-left text-[11px] leading-snug tracking-[0.12em] sm:text-[12px] sm:tracking-[0.16em]">
                      {label}
                    </span>
                    <span className="text-[color:var(--gold)] opacity-60">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-[color:var(--ink)]/10 px-5 py-4">
              <span className="text-[11px] font-semibold tracking-[0.22em] text-[color:var(--ink)]/70">ЯЗЫК</span>
              <div className="flex gap-2">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => onLangChange(l)}
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
        className="pointer-events-none fixed left-1/2 top-[5.5rem] z-[65] w-full max-w-[min(100%,980px)] -translate-x-1/2 px-4 will-change-[transform,opacity] sm:top-[6rem] sm:px-6 md:top-[7.75rem]"
        style={{ mixBlendMode: "normal", isolation: "isolate" }}
      >
        <h1
          className="text-center font-display text-[clamp(0.62rem,3.4vw,0.82rem)] font-bold leading-[1.15] tracking-[0.06em] text-white opacity-100 sm:text-[clamp(0.72rem,2.1vw,1rem)] sm:tracking-[0.11em] md:text-[clamp(0.88rem,1.75vw,1.28rem)] md:leading-[1.2] md:tracking-[0.16em]"
          style={{
            mixBlendMode: "normal",
            color: "#ffffff",
            textShadow: "0 4px 24px rgba(8,16,36,0.72)",
          }}
        >
          НАЦИОНАЛЬНЫЙ<br />
          ИНВЕСТИЦИОННЫЙ ФОНД<br />
          КЫРГЫЗСКОЙ РЕСПУБЛИКИ
        </h1>
      </div>
    </div>
  );
});

