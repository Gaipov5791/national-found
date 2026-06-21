import { useRef } from "react";
import type gsap from "gsap";
import type Lenis from "lenis";

export function useSceneRefs() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decreeRef = useRef<HTMLDivElement>(null);
  const cloudDriftRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const financeBgRef = useRef<HTMLImageElement>(null);
  const sunsetBgRef = useRef<HTMLDivElement>(null);
  const twilightBgRef = useRef<HTMLDivElement>(null);
  const midnightBgRef = useRef<HTMLDivElement>(null);
  const noonTintRef = useRef<HTMLDivElement>(null);
  const amberBurnRef = useRef<HTMLDivElement>(null);
  const amberGlowRef = useRef<HTMLDivElement>(null);
  const twilightBlueRef = useRef<HTMLDivElement>(null);
  const twilightRoseRef = useRef<HTMLDivElement>(null);
  const msbHazeRef = useRef<HTMLDivElement>(null);
  const handshakeRimRef = useRef<HTMLDivElement>(null);
  const sunsetAtmoBackRef = useRef<HTMLDivElement>(null);
  const sunsetAtmoMidRef = useRef<HTMLDivElement>(null);
  const sunsetAtmoFrontRef = useRef<HTMLDivElement>(null);
  const twilightAtmoBackRef = useRef<HTMLDivElement>(null);
  const twilightAtmoMidRef = useRef<HTMLDivElement>(null);
  const twilightAtmoFrontRef = useRef<HTMLDivElement>(null);
  const directionsCollageRef = useRef<HTMLDivElement>(null);
  const msbCollageRef = useRef<HTMLDivElement>(null);
  const spaceZoomBaseRef = useRef<HTMLDivElement>(null);
  const partnerFlareRef = useRef<HTMLDivElement>(null);
  const footerBgRef = useRef<HTMLImageElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const financeRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<HTMLDivElement>(null);
  const msbRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const partnersTextRef = useRef<HTMLDivElement>(null);
  const partnerLogosRef = useRef<HTMLDivElement>(null);
  const wipe1BackRef = useRef<HTMLDivElement>(null);
  const wipe1MidRef = useRef<HTMLDivElement>(null);
  const wipe1FrontRef = useRef<HTMLDivElement>(null);
  const wipe1HazeRef = useRef<HTMLDivElement>(null);
  const wipe2BackRef = useRef<HTMLDivElement>(null);
  const wipe2MidRef = useRef<HTMLDivElement>(null);
  const wipe2FrontRef = useRef<HTMLDivElement>(null);
  const wipe2HazeRef = useRef<HTMLDivElement>(null);
  const ambientFogRef = useRef<HTMLDivElement>(null);
  const count200Ref = useRef<HTMLSpanElement>(null);
  const count8000Ref = useRef<HTMLSpanElement>(null);
  const newsTitleRef = useRef<HTMLDivElement>(null);
  const newsContentRef = useRef<HTMLDivElement>(null);
  const contactsTitleRef = useRef<HTMLDivElement>(null);
  const contactsContentRef = useRef<HTMLDivElement>(null);
  const footerContentZoneRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const navHeaderRef = useRef<HTMLDivElement>(null);
  const staticViewportHeightRef = useRef<number | null>(null);

  return {
    rootRef,
    scrollTrackRef,
    sceneRef,
    heroBgRef,
    statsRef,
    decreeRef,
    cloudDriftRef,
    brandRef,
    financeBgRef,
    sunsetBgRef,
    twilightBgRef,
    midnightBgRef,
    noonTintRef,
    amberBurnRef,
    amberGlowRef,
    twilightBlueRef,
    twilightRoseRef,
    msbHazeRef,
    handshakeRimRef,
    sunsetAtmoBackRef,
    sunsetAtmoMidRef,
    sunsetAtmoFrontRef,
    twilightAtmoBackRef,
    twilightAtmoMidRef,
    twilightAtmoFrontRef,
    directionsCollageRef,
    msbCollageRef,
    spaceZoomBaseRef,
    partnerFlareRef,
    footerBgRef,
    aboutRef,
    financeRef,
    directionsRef,
    msbRef,
    partnersRef,
    partnersTextRef,
    partnerLogosRef,
    wipe1BackRef,
    wipe1MidRef,
    wipe1FrontRef,
    wipe1HazeRef,
    wipe2BackRef,
    wipe2MidRef,
    wipe2FrontRef,
    wipe2HazeRef,
    ambientFogRef,
    count200Ref,
    count8000Ref,
    newsTitleRef,
    newsContentRef,
    contactsTitleRef,
    contactsContentRef,
    footerContentZoneRef,
    lenisRef,
    masterTimelineRef,
    navHeaderRef,
    staticViewportHeightRef,
  };
}

export type SceneRefs = ReturnType<typeof useSceneRefs>;
