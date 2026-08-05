import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

let pluginsReady = false;
type EaseFn = (t: number) => number;
let navScrollDesktopEase: EaseFn | undefined;

export function ensureGsapPlugins() {
  if (pluginsReady || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
  pluginsReady = true;
}

/** Remove a broken/stale scroller proxy. Passing `{}` installs an empty proxy and freezes scroll. */
export function clearScrollerProxy(scroller: Element = document.documentElement) {
  ensureGsapPlugins();
  ScrollTrigger.scrollerProxy(scroller);
}

export function getNavScrollDesktopEase(): EaseFn {
  ensureGsapPlugins();
  if (!navScrollDesktopEase) {
    navScrollDesktopEase = gsap.parseEase("expo.out") as EaseFn;
  }
  return navScrollDesktopEase;
}
