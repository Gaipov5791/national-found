import type Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clearScrollerProxy, ensureGsapPlugins } from "@/lib/gsap-client";

let activeLenis: Lenis | null = null;
let leavePrepared = false;

/** Called from the scrollytelling runtime so leave-landing can destroy it instantly. */
export function registerActiveLenis(lenis: Lenis | null) {
  activeLenis = lenis;
  if (lenis) leavePrepared = false;
}

function unlockDocumentScroll() {
  const html = document.documentElement;
  const body = document.body;

  for (const className of Array.from(html.classList)) {
    if (className === "lenis" || className.startsWith("lenis-")) {
      html.classList.remove(className);
    }
  }

  html.style.removeProperty("overflow");
  html.style.removeProperty("height");
  html.style.removeProperty("touch-action");
  body.style.removeProperty("overflow");
  body.style.removeProperty("height");
  body.style.removeProperty("touch-action");
}

/**
 * Run on CTA click BEFORE the route swap paints.
 * Unlocks scroll / kills Lenis + master pin immediately so React isn't blocked
 * for seconds inside the scrollytelling unmount path.
 */
export function prepareLeaveLanding() {
  if (typeof window === "undefined" || leavePrepared) return;
  leavePrepared = true;

  ensureGsapPlugins();
  unlockDocumentScroll();

  if (activeLenis) {
    try {
      activeLenis.destroy();
    } catch {
      /* ignore */
    }
    activeLenis = null;
  }

  try {
    ScrollTrigger.getById("master-scrolly")?.kill(true);
  } catch {
    /* ignore */
  }

  try {
    ScrollTrigger.normalizeScroll(false);
  } catch {
    /* ignore */
  }

  clearScrollerProxy();
}

/** Idempotent leftover cleanup used by detail pages / experience teardown. */
export function restoreDocumentScroll() {
  if (typeof window === "undefined") return;

  ensureGsapPlugins();
  unlockDocumentScroll();

  if (activeLenis) {
    try {
      activeLenis.destroy();
    } catch {
      /* ignore */
    }
    activeLenis = null;
  }

  if (ScrollTrigger.getAll().length > 0) {
    ScrollTrigger.getAll().forEach((trigger) => {
      try {
        trigger.kill(true);
      } catch {
        /* ignore */
      }
    });
    try {
      ScrollTrigger.normalizeScroll(false);
    } catch {
      /* ignore */
    }
  }

  clearScrollerProxy();
  leavePrepared = false;
}
