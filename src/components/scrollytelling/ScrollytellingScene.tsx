import { AboutSection } from "@/components/sections/AboutSection";
import { CountersSection } from "@/components/sections/CountersSection";
import { DecreeSection } from "@/components/sections/DecreeSection";
import { DirectionsSection } from "@/components/sections/DirectionsSection";
import { FinanceSection } from "@/components/sections/FinanceSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MsbSection } from "@/components/sections/MsbSection";
import { SpaceTrilogyContainer } from "@/components/sections/SpaceTrilogyContainer";
import type { SceneRefs } from "./useSceneRefs";

type ScrollytellingSceneProps = {
  refs: SceneRefs;
  onScrollToTop: () => void;
};

export function ScrollytellingScene({ refs, onScrollToTop }: ScrollytellingSceneProps) {
  return (
    <div
      ref={refs.sceneRef}
      className="relative h-[100svh] md:h-screen w-full overflow-hidden"
    >
      <canvas
        id="cinematic-canvas"
        ref={refs.cinematicCanvasRef}
        className="fixed top-0 left-0 w-full h-[100svh] -z-10 pointer-events-none"
        aria-hidden
      />
      <HeroSection cloudDriftRef={refs.cloudDriftRef} />
      <CountersSection statsRef={refs.statsRef} count200Ref={refs.count200Ref} count8000Ref={refs.count8000Ref} />
      <DecreeSection
        decreeRef={refs.decreeRef}
        ambientFogRef={refs.ambientFogRef}
        wipe1HazeRef={refs.wipe1HazeRef}
        wipe1BackRef={refs.wipe1BackRef}
        wipe1MidRef={refs.wipe1MidRef}
        wipe1FrontRef={refs.wipe1FrontRef}
      />
      <AboutSection aboutRef={refs.aboutRef} />
      <FinanceSection
        financeRef={refs.financeRef}
        wipe2HazeRef={refs.wipe2HazeRef}
        wipe2BackRef={refs.wipe2BackRef}
        wipe2MidRef={refs.wipe2MidRef}
        wipe2FrontRef={refs.wipe2FrontRef}
      />
      <DirectionsSection
        amberBurnRef={refs.amberBurnRef}
        amberGlowRef={refs.amberGlowRef}
        sunsetAtmoBackRef={refs.sunsetAtmoBackRef}
        sunsetAtmoMidRef={refs.sunsetAtmoMidRef}
        sunsetAtmoFrontRef={refs.sunsetAtmoFrontRef}
        directionsRef={refs.directionsRef}
      />
      <MsbSection
        twilightBlueRef={refs.twilightBlueRef}
        twilightRoseRef={refs.twilightRoseRef}
        msbHazeRef={refs.msbHazeRef}
        twilightAtmoBackRef={refs.twilightAtmoBackRef}
        twilightAtmoMidRef={refs.twilightAtmoMidRef}
        twilightAtmoFrontRef={refs.twilightAtmoFrontRef}
        msbRef={refs.msbRef}
      />
      <SpaceTrilogyContainer
        handshakeRimRef={refs.handshakeRimRef}
        partnerFlareRef={refs.partnerFlareRef}
        partnersRef={refs.partnersRef}
        partnersTextRef={refs.partnersTextRef}
        partnerLogosRef={refs.partnerLogosRef}
        newsTitleRef={refs.newsTitleRef}
        newsContentRef={refs.newsContentRef}
        contactsTitleRef={refs.contactsTitleRef}
        contactsContentRef={refs.contactsContentRef}
      />
      <FooterSection footerContentZoneRef={refs.footerContentZoneRef} onScrollToTop={onScrollToTop} />
    </div>
  );
}
