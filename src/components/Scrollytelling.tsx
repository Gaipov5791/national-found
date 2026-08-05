import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/global/Navbar";
import { runScrollytellingExperience } from "@/components/scrollytelling/runScrollytellingExperience";
import { ScrollytellingScene } from "@/components/scrollytelling/ScrollytellingScene";
import { useSceneRefs } from "@/components/scrollytelling/useSceneRefs";
import { ensureGsapPlugins, getNavScrollDesktopEase } from "@/lib/gsap-client";
import { LANGS, useLang } from "@/lib/lang";
import { NAV_CONFIG, NAV_SCENE_BY_ID, type NavId } from "@/lib/navConfig";
import {
  getSectionSceneLabel,
  type SectionSceneLabel,
} from "@/lib/sectionNavigation";

const SCROLL_DISTANCE_DESKTOP = 15800;
const SCROLL_DISTANCE_TABLET = 12600;
const SCROLL_DISTANCE_MOBILE = 11800;

const NAV_SCROLL_NAV_BUFFER = 8;
const NAV_SCROLL_MOBILE_PADDING = 16;
const MOBILE_CLOSED_NAVBAR_HEIGHT = 80;
const NAV_SCROLL_DESKTOP_DURATION = 1.6;
const NAV_SCROLL_MOBILE_DURATION = 1.1;

/** Forward pixel nudges on mobile — compensates pinned-scene drift after panorama timeline. */
const MOBILE_SCENE_NUDGE: Partial<Record<SectionSceneLabel, number>> = {
  sc_about: 60,
  sc_finance: 160,
  sc_directions: 110,
  sc_msb: 85,
  sc_partners: 130,
  sc_news: 40,
  sc_footer: 0,
};

export function Scrollytelling() {
  const { lang, setLang, t } = useLang();
  const [counterProgress, setCounterProgress] = useState(0);
  const returnSectionHandledRef = useRef(false);
  const [returnCoverVisible, setReturnCoverVisible] = useState(() =>
    typeof window === "undefined" ? false : Boolean(getSectionSceneLabel(window.location.hash))
  );
  const refs = useSceneRefs();

  const navItems = useMemo(
    () =>
      NAV_CONFIG.map((item) => ({
        id: item.id,
        label: t.nav[item.id],
      })),
    [t]
  );

  const scrollToSection = useCallback(
    (id: NavId, options?: { immediate?: boolean }) => {
      ensureGsapPlugins();
      const mobile = window.innerWidth < 768;
      const immediate = options?.immediate === true;
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
        const sceneLabel = NAV_SCENE_BY_ID[id];
        let targetScrollPos = scrollTrigger.labelToScroll(sceneLabel);

        if (mobile) {
          targetScrollPos += MOBILE_SCENE_NUDGE[sceneLabel] ?? 0;
        }

        target = Math.max(
          scrollTrigger.start,
          Math.min(scrollTrigger.end, Math.round(targetScrollPos - navOffset))
        );
      }

      if (immediate) {
        if (refs.lenisRef.current) {
          refs.lenisRef.current.scrollTo(target, { immediate: true });
        } else {
          window.scrollTo(0, target);
        }
        ScrollTrigger.update();
        return;
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

  const handleNavClick = useCallback((id: NavId) => scrollToSection(id), [scrollToSection]);
  const scrollToTop = useCallback(() => scrollToSection("home"), [scrollToSection]);

  const scrollDownFromHero = useCallback(() => {
    ensureGsapPlugins();
    const mobile = window.innerWidth < 768;
    ScrollTrigger.update();

    const masterTimeline = refs.masterTimelineRef.current;
    const scrollTrigger =
      ScrollTrigger.getById("master-scrolly") ?? masterTimeline?.scrollTrigger ?? undefined;

    let target = window.scrollY + Math.round(window.innerHeight * 0.35);
    if (scrollTrigger?.labelToScroll) {
      target = Math.max(
        scrollTrigger.start,
        Math.min(scrollTrigger.end, Math.round(scrollTrigger.labelToScroll("sc_counters")))
      );
    }

    if (refs.lenisRef.current) {
      refs.lenisRef.current.scrollTo(target, {
        duration: 1.1,
        easing: getNavScrollDesktopEase(),
      });
      return;
    }

    gsap.to(window, {
      scrollTo: target,
      duration: mobile ? 0.9 : 1.1,
      ease: "expo.out",
    });
  }, [refs]);

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

  useEffect(() => {
    if (returnSectionHandledRef.current) return;

    const returnSection = getSectionSceneLabel(window.location.hash);
    const navItem = NAV_CONFIG.find((item) => item.scene === returnSection);
    if (!navItem) {
      setReturnCoverVisible(false);
      return;
    }

    let frameId = 0;
    let attempts = 0;
    let revealFrameId = 0;

    const revealScene = () => {
      ScrollTrigger.update();
      revealFrameId = window.requestAnimationFrame(() => {
        setReturnCoverVisible(false);
      });
    };

    const restoreSection = () => {
      const scrollTrigger = ScrollTrigger.getById("master-scrolly");

      if (scrollTrigger?.labelToScroll) {
        returnSectionHandledRef.current = true;
        scrollToSection(navItem.id, { immediate: true });
        revealFrameId = window.requestAnimationFrame(revealScene);
        return;
      }

      attempts += 1;
      if (attempts < 120) {
        frameId = window.requestAnimationFrame(restoreSection);
      } else {
        setReturnCoverVisible(false);
      }
    };

    frameId = window.requestAnimationFrame(restoreSection);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(revealFrameId);
    };
  }, [scrollToSection]);

  return (
    <div ref={refs.rootRef} className="relative overflow-x-hidden">
      <Navbar
        ref={refs.navHeaderRef}
        brandRef={refs.brandRef}
        navItems={navItems}
        langs={LANGS}
        lang={lang}
        languageLabel={t.common.language}
        menuLabel={t.common.menu}
        onLangChange={setLang}
        onNavClick={handleNavClick}
      />
      <div ref={refs.scrollTrackRef}>
        <ScrollytellingScene
          refs={refs}
          counterProgress={counterProgress}
          onScrollToTop={scrollToTop}
          onScrollDown={scrollDownFromHero}
        />
      </div>
      {returnCoverVisible ? (
        <div className="pointer-events-none fixed inset-0 z-[90] bg-[#0b2138]" aria-hidden />
      ) : null}
    </div>
  );
}
