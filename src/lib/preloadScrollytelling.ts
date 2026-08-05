import type { ComponentType } from "react";

type ScrollytellingComponent = ComponentType;

let cachedScrollytelling: ScrollytellingComponent | null = null;
let scrollytellingImport: Promise<ScrollytellingComponent> | null = null;

export function getCachedScrollytelling() {
  return cachedScrollytelling;
}

export function preloadScrollytelling() {
  if (cachedScrollytelling) return Promise.resolve(cachedScrollytelling);
  scrollytellingImport ??= import("@/components/Scrollytelling").then((mod) => {
    cachedScrollytelling = mod.Scrollytelling;
    return cachedScrollytelling;
  });
  return scrollytellingImport;
}
