import { forwardRef, type RefObject } from "react";

export type AboutSectionProps = {
  aboutRef: RefObject<HTMLDivElement | null>;
};

export const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(function AboutSection(
  { aboutRef },
  _ref
) {
  return (
    <div
      ref={aboutRef}
      className="pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-4 text-center opacity-0 will-change-[transform,opacity] sm:px-6"
    >
      <h2 className="font-display text-2xl font-bold tracking-tighter text-[color:var(--primary)] drop-shadow-[0_4px_30px_rgba(255,255,255,0.8)] sm:text-4xl sm:tracking-tight md:text-6xl md:tracking-[0.2em] lg:text-7xl">
        О ФОНДЕ
      </h2>
      <p className="mx-auto mt-4 max-w-2xl px-1 text-xs leading-relaxed tracking-tight text-[color:var(--ink)]/85 sm:mt-6 sm:px-0 sm:text-sm md:text-base md:tracking-normal">
        Национальный инвестиционный фонд — стратегический институт развития, направляющий капитал в проекты,
        формирующие будущее Кыргызской Республики.
      </p>
    </div>
  );
});
