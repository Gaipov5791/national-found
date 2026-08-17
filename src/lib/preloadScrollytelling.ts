import type { ComponentType } from "react";
import { logBg } from "@/lib/sceneBackground";

type ScrollytellingComponent = ComponentType;

let cachedScrollytelling: ScrollytellingComponent | null = null;
let scrollytellingImport: Promise<ScrollytellingComponent> | null = null;

export function getCachedScrollytelling() {
  return cachedScrollytelling;
}

export function preloadScrollytelling() {
  if (cachedScrollytelling) {
    logBg("scrolly:cache-hit");
    return Promise.resolve(cachedScrollytelling);
  }
  logBg("scrolly:import-start", { inflight: Boolean(scrollytellingImport) });
  scrollytellingImport ??= import("@/components/Scrollytelling").then((mod) => {
    cachedScrollytelling = mod.Scrollytelling;
    logBg("scrolly:import-ready");
    return cachedScrollytelling;
  });
  return scrollytellingImport;
}

/** Warm the landing chunk after the current page is interactive. */
export function preloadScrollytellingWhenIdle() {
  if (typeof window === "undefined") return;
  if (cachedScrollytelling || scrollytellingImport) return;

  const run = () => {
    void preloadScrollytelling();
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 2500 });
    return;
  }

  window.setTimeout(run, 600);
}
