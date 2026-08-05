import { AboutSection } from "@/components/sections/AboutSection";
import { CountersSection } from "@/components/sections/CountersSection";
import { DecreeSection } from "@/components/sections/DecreeSection";
import { DirectionsSection } from "@/components/sections/DirectionsSection";
import { FinanceSection } from "@/components/sections/FinanceSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HeroScrollHint } from "@/components/sections/HeroScrollHint";
import { MsbSection } from "@/components/sections/MsbSection";
import { PanoramaScrollSection } from "@/components/sections/PanoramaScrollSection";
import { SpaceTrilogyContainer } from "@/components/sections/SpaceTrilogyContainer";
import type { SceneRefs } from "./useSceneRefs";

type ScrollytellingSceneProps = {
  refs: SceneRefs;
  counterProgress: number;
  onScrollToTop: () => void;
  onScrollDown: () => void;
};

export function ScrollytellingScene({
  refs,
  counterProgress,
  onScrollToTop,
  onScrollDown,
}: ScrollytellingSceneProps) {
  return (
    <div
      ref={refs.sceneRef}
      className="relative h-[100svh] md:h-screen w-full overflow-hidden"
    >
      <PanoramaScrollSection
        panoramaBgRef={refs.panoramaBgRef}
        panoramaImgRef={refs.panoramaImgRef}
        permanentCloudRef={refs.permanentCloudRef}
      />
      <HeroScrollHint hintRef={refs.scrollHintRef} onClick={onScrollDown} />
      <CountersSection
        statsRef={refs.statsRef}
        countProjectsRef={refs.countProjectsRef}
        counterProgress={counterProgress}
      />
      <DecreeSection decreeRef={refs.decreeRef} />
      <AboutSection aboutRef={refs.aboutRef} />
      <FinanceSection financeRef={refs.financeRef} />
      <DirectionsSection directionsRef={refs.directionsRef} />
      <MsbSection msbRef={refs.msbRef} />
      <SpaceTrilogyContainer
        partnersRef={refs.partnersRef}
        partnersTextRef={refs.partnersTextRef}
        newsTitleRef={refs.newsTitleRef}
      />
      <FooterSection footerContentZoneRef={refs.footerContentZoneRef} onScrollToTop={onScrollToTop} />
    </div>
  );
}
