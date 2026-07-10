import { forwardRef, type RefObject, useState } from "react";
import gsap from "gsap";
import { SECTION_HEADING, SECTION_SUBTEXT, SECTION_TOP_COMPACT, SECTION_HEADING_HERO } from "./sectionLayout";
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
  const [mapMissing, setMapMissing] = useState(false);

  return (
    <div
      ref={msbRef}
      className={`pointer-events-none absolute inset-x-0 ${SECTION_TOP_COMPACT} z-30 px-3 text-center opacity-0 will-change-[transform,opacity] sm:px-6`}
    >
      <h2 className={`${SECTION_HEADING} ${SECTION_HEADING_HERO}`}>
        ПРОЕКТЫ МСБ
      </h2>
      <p
        className={`${SECTION_SUBTEXT} mt-2 text-white/88 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:mt-3 md:hidden`}
      >
        Интерактивная карта проектов малого и среднего бизнеса по регионам Кыргызстана.
      </p>
      <p
        className={`${SECTION_SUBTEXT} mt-2 hidden max-w-2xl text-white/88 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:mt-3 md:block lg:max-h-[4.5rem] lg:overflow-hidden`}
      >
        Малый и средний бизнес играет ключевую роль в развитии регионов Кыргызстана. Национальный инвестиционный
        фонд поддерживает проекты МСБ, с особым акцентом на агропромышленный комплекс и переработку местного сырья,
        помогая создавать устойчивые бизнес-модели и повышать уровень жизни в регионах страны.
      </p>

      <div className="pointer-events-auto mx-auto mt-2 w-full max-w-5xl sm:mt-3 md:mt-4">
        {mapMissing ? (
          <div className="mt-3 text-center text-sm text-white/70">
            Карта пока не найдена. Положите распакованные файлы в <code>public/maps/msb/</code> и назовите главный файл{" "}
            <code>map.png</code>.
          </div>
        ) : (
          <img
            src="/maps/msb/map.png"
            alt="Карта проектов МСБ"
            className="mx-auto w-full max-w-5xl max-h-[34svh] object-contain object-top select-none drop-shadow-[0_18px_60px_rgba(0,0,0,0.55)] sm:max-h-[38svh] md:max-h-[44svh]"
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              setMapMissing(true);
            }}
          />
        )}
      </div>
    </div>
  );
});
