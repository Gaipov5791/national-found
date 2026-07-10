import { useRef } from "react";
import type gsap from "gsap";
import type Lenis from "lenis";

export function useSceneRefs() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const panoramaBgRef = useRef<HTMLDivElement>(null);
  const panoramaImgRef = useRef<HTMLImageElement>(null);
  const permanentCloudRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decreeRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const navBrandLogoRef = useRef<HTMLImageElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const financeRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<HTMLDivElement>(null);
  const msbRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const partnersTextRef = useRef<HTMLDivElement>(null);
  const partnerLogosRef = useRef<HTMLDivElement>(null);
  const countProjectsRef = useRef<HTMLSpanElement>(null);
  const counterProgressRef = useRef(0);
  const newsTitleRef = useRef<HTMLDivElement>(null);
  const newsContentRef = useRef<HTMLDivElement>(null);
  const footerContentZoneRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const navHeaderRef = useRef<HTMLDivElement>(null);
  const staticViewportHeightRef = useRef<number | null>(null);

  return {
    rootRef,
    scrollTrackRef,
    sceneRef,
    panoramaBgRef,
    panoramaImgRef,
    permanentCloudRef,
    statsRef,
    decreeRef,
    brandRef,
    navBrandLogoRef,
    aboutRef,
    financeRef,
    directionsRef,
    msbRef,
    partnersRef,
    partnersTextRef,
    partnerLogosRef,
    countProjectsRef,
    counterProgressRef,
    newsTitleRef,
    newsContentRef,
    footerContentZoneRef,
    lenisRef,
    masterTimelineRef,
    navHeaderRef,
    staticViewportHeightRef,
  };
}

export type SceneRefs = ReturnType<typeof useSceneRefs>;
