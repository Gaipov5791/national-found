import { useCallback, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Navbar } from "@/components/global/Navbar";
import { runScrollytellingExperience } from "@/components/scrollytelling/runScrollytellingExperience";
import { ScrollytellingScene } from "@/components/scrollytelling/ScrollytellingScene";
import { useSceneRefs } from "@/components/scrollytelling/useSceneRefs";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

const SCROLL_DISTANCE_DESKTOP = 14500;
const SCROLL_DISTANCE_TABLET = 11500;
const SCROLL_DISTANCE_MOBILE = 9000;

const NAV_ITEMS = [
  "ГЛАВНАЯ",
  "О ФОНДЕ",
  "ФИНАНСИРОВАНИЕ ПРОЕКТОВ",
  "ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ",
  "ПРОЕКТЫ МСБ",
  "ПАРТНЁРЫ",
  "НОВОСТИ",
  "КОНТАКТЫ",
] as const;

const LANGS = ["RU", "KG", "EN"];

type NavItem = (typeof NAV_ITEMS)[number];

const NAV_SCENE_LABELS: Record<NavItem, string> = {
  ГЛАВНАЯ: "sc_hero",
  "О ФОНДЕ": "sc_about",
  "ФИНАНСИРОВАНИЕ ПРОЕКТОВ": "sc_finance",
  "ПЕРСПЕКТИВНЫЕ НАПРАВЛЕНИЯ": "sc_directions",
  "ПРОЕКТЫ МСБ": "sc_msb",
  ПАРТНЁРЫ: "sc_partners",
  НОВОСТИ: "sc_news",
  КОНТАКТЫ: "sc_contacts",
};

const NAV_SCROLL_NAV_BUFFER = 8;
const NAV_SCROLL_EASE = gsap.parseEase("power3.inOut");

export function Scrollytelling() {
  const [lang, setLang] = useState("RU");
  const refs = useSceneRefs();

  const scrollToSection = useCallback(
    (label: NavItem) => {
      const mobile = window.innerWidth < 768;
      const duration = mobile ? 1.2 : 1.6;
      ScrollTrigger.update();

      const masterTimeline = refs.masterTimelineRef.current;
      const scrollTrigger = masterTimeline?.scrollTrigger;
      const navbarHeight = (refs.navHeaderRef.current?.offsetHeight ?? 90) + NAV_SCROLL_NAV_BUFFER;

      let target = 0;
      if (scrollTrigger?.labelToScroll) {
        const targetScrollPos = scrollTrigger.labelToScroll(NAV_SCENE_LABELS[label]);
        target = Math.max(
          scrollTrigger.start,
          Math.min(scrollTrigger.end, Math.round(targetScrollPos - navbarHeight))
        );
      }

      if (refs.lenisRef.current) {
        refs.lenisRef.current.scrollTo(target, { duration, easing: NAV_SCROLL_EASE });
        return;
      }

      gsap.to(window, {
        scrollTo: target,
        duration: mobile ? 1.2 : duration,
        ease: mobile ? "power2.out" : "power3.inOut",
      });
    },
    [refs]
  );

  const handleNavClick = useCallback((label: string) => scrollToSection(label as NavItem), [scrollToSection]);
  const scrollToTop = useCallback(() => scrollToSection("ГЛАВНАЯ"), [scrollToSection]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.config({ ignoreMobileResize: true });
        return runScrollytellingExperience(refs, {
          scrollDistance: SCROLL_DISTANCE_MOBILE,
          scrub: true,
          mobile: true,
          cinematic: false,
        });
      });

      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        ScrollTrigger.config({ ignoreMobileResize: true });
        return runScrollytellingExperience(refs, {
          scrollDistance: SCROLL_DISTANCE_TABLET,
          scrub: 0.5,
          mobile: false,
          cinematic: false,
        });
      });

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.config({ ignoreMobileResize: false });
        return runScrollytellingExperience(refs, {
          scrollDistance: SCROLL_DISTANCE_DESKTOP,
          scrub: 1,
          mobile: false,
          cinematic: true,
        });
      });

      return () => mm.revert();
    },
    { scope: refs.rootRef }
  );

  return (
    <div ref={refs.rootRef} className="relative overflow-hidden">
      <Navbar
        ref={refs.navHeaderRef}
        brandRef={refs.brandRef}
        navItems={[...NAV_ITEMS]}
        langs={LANGS}
        lang={lang}
        onLangChange={setLang}
        onNavClick={handleNavClick}
      />
      <div ref={refs.scrollTrackRef} style={{ height: `${SCROLL_DISTANCE_DESKTOP}px` }}>
        <ScrollytellingScene refs={refs} onScrollToTop={scrollToTop} />
      </div>
    </div>
  );
}
