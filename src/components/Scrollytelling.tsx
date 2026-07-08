import { useCallback, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/global/Navbar";
import { runScrollytellingExperience } from "@/components/scrollytelling/runScrollytellingExperience";
import { ScrollytellingScene } from "@/components/scrollytelling/ScrollytellingScene";
import { useSceneRefs } from "@/components/scrollytelling/useSceneRefs";
import { ensureGsapPlugins, getNavScrollDesktopEase } from "@/lib/gsap-client";

const SCROLL_DISTANCE_DESKTOP = 15800;
const SCROLL_DISTANCE_TABLET = 12600;
const SCROLL_DISTANCE_MOBILE = 11800;

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
  КОНТАКТЫ: "sc_footer",
};

const NAV_SCROLL_NAV_BUFFER = 8;
const NAV_SCROLL_MOBILE_PADDING = 16;
const MOBILE_CLOSED_NAVBAR_HEIGHT = 80;
const NAV_SCROLL_DESKTOP_DURATION = 1.6;
const NAV_SCROLL_MOBILE_DURATION = 1.1;

type SceneLabel = (typeof NAV_SCENE_LABELS)[NavItem];

/** Forward pixel nudges on mobile — compensates pinned-scene drift after panorama timeline. */
const MOBILE_SCENE_NUDGE: Partial<Record<SceneLabel, number>> = {
  sc_about: 60,
  sc_finance: 160,
  sc_directions: 110,
  sc_msb: 85,
  sc_partners: 130,
  sc_news: 115,
  sc_footer: 0,
};

export function Scrollytelling() {
  const [lang, setLang] = useState("RU");
  const [counterProgress, setCounterProgress] = useState(0);
  const refs = useSceneRefs();

  const scrollToSection = useCallback(
    (label: NavItem) => {
      ensureGsapPlugins();
      const mobile = window.innerWidth < 768;
      ScrollTrigger.update();

      const masterTimeline = refs.masterTimelineRef.current;
      const scrollTrigger =
        ScrollTrigger.getById("master-scrolly") ?? masterTimeline?.scrollTrigger ?? undefined;

      const navOffset = mobile
        ? Math.min(refs.navHeaderRef.current?.offsetHeight || 72, MOBILE_CLOSED_NAVBAR_HEIGHT) +
          NAV_SCROLL_MOBILE_PADDING
        : (refs.navHeaderRef.current?.offsetHeight ?? 90) + NAV_SCROLL_NAV_BUFFER;

      let target = 0;
      if (scrollTrigger?.labelToScroll) {
        const sceneLabel = NAV_SCENE_LABELS[label];
        let targetScrollPos = scrollTrigger.labelToScroll(sceneLabel);

        if (mobile) {
          targetScrollPos += MOBILE_SCENE_NUDGE[sceneLabel] ?? 0;
        }

        target = Math.max(
          scrollTrigger.start,
          Math.min(scrollTrigger.end, Math.round(targetScrollPos - navOffset))
        );
      }

      if (refs.lenisRef.current) {
        refs.lenisRef.current.scrollTo(target, {
          duration: NAV_SCROLL_DESKTOP_DURATION,
          easing: getNavScrollDesktopEase(),
        });
        return;
      }

      gsap.to(window, {
        scrollTo: target,
        duration: mobile ? NAV_SCROLL_MOBILE_DURATION : NAV_SCROLL_DESKTOP_DURATION,
        ease: "expo.out",
      });
    },
    [refs]
  );

  const handleNavClick = useCallback((label: string) => scrollToSection(label as NavItem), [scrollToSection]);
  const scrollToTop = useCallback(() => scrollToSection("ГЛАВНАЯ"), [scrollToSection]);

  useGSAP(
    () => {
      ensureGsapPlugins();

      const mm = gsap.matchMedia();
      const counterHandler = (p: number) => setCounterProgress(p);

      mm.add("(max-width: 767px)", () => {
        try {
          ScrollTrigger.normalizeScroll(true);
        } catch (error) {
          console.warn("ScrollTrigger.normalizeScroll unavailable", error);
        }
        ScrollTrigger.config({ ignoreMobileResize: true });
        const staticViewportHeight = window.innerHeight;
        refs.staticViewportHeightRef.current = staticViewportHeight;
        const cleanup = runScrollytellingExperience(refs, {
          scrollDistance: SCROLL_DISTANCE_MOBILE,
          scrub: 0.75,
          mobile: true,
          cinematic: true,
          staticViewportHeight,
          onCounterProgress: counterHandler,
        });
        return () => {
          try {
            ScrollTrigger.normalizeScroll(false);
          } catch {
            /* ignore teardown errors */
          }
          refs.staticViewportHeightRef.current = null;
          cleanup();
        };
      });

      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        ScrollTrigger.config({ ignoreMobileResize: true });
        return runScrollytellingExperience(refs, {
          scrollDistance: SCROLL_DISTANCE_TABLET,
          scrub: 1.1,
          mobile: false,
          cinematic: true,
          onCounterProgress: counterHandler,
        });
      });

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.config({ ignoreMobileResize: false });
        return runScrollytellingExperience(refs, {
          scrollDistance: SCROLL_DISTANCE_DESKTOP,
          scrub: 0.95,
          mobile: false,
          cinematic: true,
          onCounterProgress: counterHandler,
        });
      });

      return () => mm.revert();
    },
    { scope: refs.rootRef }
  );

  return (
    <div ref={refs.rootRef} className="relative overflow-x-hidden">
      <Navbar
        ref={refs.navHeaderRef}
        brandRef={refs.brandRef}
        navItems={[...NAV_ITEMS]}
        langs={LANGS}
        lang={lang}
        onLangChange={setLang}
        onNavClick={handleNavClick}
      />
      <div ref={refs.scrollTrackRef}>
        <ScrollytellingScene refs={refs} counterProgress={counterProgress} onScrollToTop={scrollToTop} />
      </div>
    </div>
  );
}
