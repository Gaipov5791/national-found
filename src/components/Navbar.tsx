import { useState } from "react";

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

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-6 pt-5">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-full border border-white/40 bg-white/40 px-5 py-2.5 backdrop-blur-xl shadow-[0_8px_30px_rgba(20,40,90,0.08)]">
        {/* Placeholder kept so brand title (animated from Scrollytelling) can dock here */}
        <div id="navbar-brand-slot" className="pr-3 w-[170px]" aria-hidden />
        <ul className="flex flex-1 items-center justify-end gap-0 divide-x divide-[color:var(--ink)]/15 text-[10.5px] font-semibold tracking-[0.12em] text-[color:var(--ink)]">
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
        <div className="flex items-center gap-2 pl-3 text-[11px] font-semibold tracking-[0.14em] text-[color:var(--ink)]">
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
      </nav>
    </header>
  );
}
