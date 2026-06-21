import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

let pluginsReady = false;
let navScrollDesktopEase: ReturnType<typeof gsap.parseEase> | undefined;

export function ensureGsapPlugins() {
  if (pluginsReady || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
  pluginsReady = true;
}

export function getNavScrollDesktopEase() {
  ensureGsapPlugins();
  if (!navScrollDesktopEase) {
    navScrollDesktopEase = gsap.parseEase("expo.out");
  }
  return navScrollDesktopEase;
}
