import { useRef } from "react";
import { Navbar } from "@/components/global/Navbar";
import { PanoramaImage } from "@/components/sections/PanoramaImage";
import { HeroScrollHint } from "@/components/sections/HeroScrollHint";
import { LANGS, useLang } from "@/lib/lang";
import { NAV_CONFIG } from "@/lib/navConfig";

/** Lightweight server-rendered first frame; no animation dependencies. */
export function InitialScene() {
  const { lang, setLang, t } = useLang();
  const hintRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="relative h-[100svh] w-full overflow-hidden md:h-screen">
      <PanoramaImage />
      <Navbar
        navItems={NAV_CONFIG.map(({ id }) => ({ id, label: t.nav[id] }))}
        langs={LANGS}
        lang={lang}
        languageLabel={t.common.language}
        menuLabel={t.common.menu}
        onLangChange={setLang}
        onNavClick={(id) => { window.location.hash = NAV_CONFIG.find((item) => item.id === id)?.scene ?? "sc_hero"; }}
      />
      <HeroScrollHint hintRef={hintRef} onClick={() => { window.location.hash = "sc_counters"; }} />
    </div>
  );
}