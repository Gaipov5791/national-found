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
