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
      className="relative h-[100svh] md:h-screen w-full overflow-hidden bg-gradient-to-b from-[#dbe6f1] via-[#e9eef5] to-[#f3f1e8]"
    >
      <HeroSection heroBgRef={refs.heroBgRef} cloudDriftRef={refs.cloudDriftRef} />
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
        financeBgRef={refs.financeBgRef}
        noonTintRef={refs.noonTintRef}
        financeRef={refs.financeRef}
        wipe2HazeRef={refs.wipe2HazeRef}
        wipe2BackRef={refs.wipe2BackRef}
        wipe2MidRef={refs.wipe2MidRef}
        wipe2FrontRef={refs.wipe2FrontRef}
      />
      <DirectionsSection
        sunsetBgRef={refs.sunsetBgRef}
        directionsCollageRef={refs.directionsCollageRef}
        amberBurnRef={refs.amberBurnRef}
        amberGlowRef={refs.amberGlowRef}
        sunsetAtmoBackRef={refs.sunsetAtmoBackRef}
        sunsetAtmoMidRef={refs.sunsetAtmoMidRef}
        sunsetAtmoFrontRef={refs.sunsetAtmoFrontRef}
        directionsRef={refs.directionsRef}
      />
      <MsbSection
        twilightBgRef={refs.twilightBgRef}
        msbCollageRef={refs.msbCollageRef}
        twilightBlueRef={refs.twilightBlueRef}
        twilightRoseRef={refs.twilightRoseRef}
        msbHazeRef={refs.msbHazeRef}
        twilightAtmoBackRef={refs.twilightAtmoBackRef}
        twilightAtmoMidRef={refs.twilightAtmoMidRef}
        twilightAtmoFrontRef={refs.twilightAtmoFrontRef}
        msbRef={refs.msbRef}
      />
      <SpaceTrilogyContainer
        midnightBgRef={refs.midnightBgRef}
        spaceZoomBaseRef={refs.spaceZoomBaseRef}
        cyberOverlayRef={refs.cyberOverlayRef}
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
      <FooterSection
        footerContentZoneRef={refs.footerContentZoneRef}
        footerBgRef={refs.footerBgRef}
        onScrollToTop={onScrollToTop}
      />
    </div>
  );
}
