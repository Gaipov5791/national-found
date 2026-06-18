import { useState } from "react";
import { Menu, X } from "lucide-react";
import fundLogo from "@/assets/fund-logo.png.asset.json";

const ITEMS = [
  "ГЛАВНАЯ",
  "О ФОНДЕ",
  "ФИНАНСИРОВАНИЕ ПРОЕКТОВ",
  "ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ",
  "ПРОЕКТЫ МСБ",
  "ПАРТНЁРЫ",
  "НОВОСТИ КОНТАКТЫ",
];

const LANGS = ["RU", "KG", "EN"];

export function Navbar() {
  const [lang, setLang] = useState("RU");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-full border border-white/40 bg-white/40 px-4 py-2.5 backdrop-blur-xl shadow-[0_8px_30px_rgba(20,40,90,0.08)] md:px-5">
        {/* Brand slot: docking target for animated logo on desktop, real logo on mobile */}
        <div className="flex items-center">
          <div id="navbar-brand-slot" className="hidden md:block w-[210px] h-[44px]" aria-hidden />
          <img
            src={fundLogo.url}
            alt="НИФ КР"
            className="block md:hidden h-9 w-auto"
          />
        </div>

        {/* Desktop nav */}
        <ul className="hidden lg:flex flex-1 items-center justify-end gap-0 divide-x divide-[color:var(--ink)]/15 text-[10.5px] font-semibold tracking-[0.12em] text-[color:var(--ink)]">
          {ITEMS.map((label) => (
            <li key={label}>
              <a
                href="#"
                data-cursor-hover
                className="inline-block px-3 py-1.5 transition-transform duration-300 ease-out hover:scale-110 hover:text-[color:var(--gold)]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop language switch */}
        <div className="hidden md:flex items-center gap-2 pl-3 text-[11px] font-semibold tracking-[0.14em] text-[color:var(--ink)]">
          <span>{lang}</span>
          <div className="flex gap-1.5">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
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

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-[color:var(--ink)] shadow-sm transition hover:bg-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`lg:hidden mx-auto mt-3 max-w-[1400px] overflow-hidden rounded-3xl border border-white/40 bg-white/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(20,40,90,0.18)] transition-all duration-500 ease-out ${
          open ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col divide-y divide-[color:var(--ink)]/10 px-2 py-2 text-[12px] font-semibold tracking-[0.14em] text-[color:var(--ink)]">
          {ITEMS.map((label, i) => (
            <li
              key={label}
              style={{
                transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
              }}
              className={`transform transition-all duration-500 ${
                open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
              }`}
            >
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 transition hover:bg-[color:var(--ink)]/5 hover:text-[color:var(--gold)]"
              >
                <span>{label}</span>
                <span className="text-[color:var(--gold)] opacity-60">→</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-[color:var(--ink)]/10 px-5 py-4">
          <span className="text-[11px] font-semibold tracking-[0.22em] text-[color:var(--ink)]/70">ЯЗЫК</span>
          <div className="flex gap-2">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
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
    </header>
  );
}
