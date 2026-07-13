import { forwardRef, type RefObject } from "react";
import gsap from "gsap";
import { DetailLinkButton } from "./DetailLinkButton";
import {
  SECTION_HEADING,
  SECTION_HEADING_HERO,
  SECTION_SUBTEXT_ON_IMAGE,
  SECTION_TOP_COMPACT,
} from "./sectionLayout";
import type { SceneAnimationContext, SceneTimeline } from "./sceneAnimationShared";

export type MsbSceneRefs = {
  msbRef: RefObject<HTMLDivElement | null>;
};

export function prepareMsbScene(refs: MsbSceneRefs, ctx: SceneAnimationContext) {
  const { text } = ctx;
  gsap.set(refs.msbRef.current, { ...text.idle, xPercent: 0, x: 0 });
}

export function animateMsbScene(tl: SceneTimeline, refs: MsbSceneRefs, ctx: SceneAnimationContext) {
  const { timings, text } = ctx;
  const { msbEnterT, msbExitT, enterDur, exitDur } = timings;

  tl.fromTo(refs.msbRef.current, text.idle, { ...text.arrived, duration: enterDur, ease: text.enterEase }, msbEnterT);
  tl.to(refs.msbRef.current, { ...text.evaporated, duration: exitDur, ease: text.exitEase }, msbExitT);
}

export type MsbSectionProps = {
  msbRef: RefObject<HTMLDivElement | null>;
};

export const MsbSection = forwardRef<HTMLDivElement, MsbSectionProps>(function MsbSection(
  { msbRef },
  _ref
) {
  return (
    <div
      ref={msbRef}
      className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_COMPACT} z-30 px-3 text-center opacity-0 will-change-[transform,opacity] sm:px-6`}
    >
      <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO}`}>
        ПРОЕКТЫ МСБ
      </h2>
      <p className={`${SECTION_SUBTEXT_ON_IMAGE} mt-2 text-white/90 sm:mt-3`}>
        Малый и средний бизнес играет ключевую роль в развитии регионов Кыргызстана. Национальный инвестиционный
        фонд поддерживает проекты МСБ, с особым акцентом на агропромышленный комплекс и переработку местного сырья,
        помогая создавать устойчивые бизнес-модели и повышать уровень жизни в регионах страны.
      </p>
      <DetailLinkButton to="/msb" containerClassName="mt-3 sm:mt-4" />
    </div>
  );
});
