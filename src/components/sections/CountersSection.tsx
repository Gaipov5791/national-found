import { forwardRef, type RefObject } from "react";

export type CountersSectionProps = {
  statsRef: RefObject<HTMLDivElement | null>;
  count200Ref: RefObject<HTMLSpanElement | null>;
  count8000Ref: RefObject<HTMLSpanElement | null>;
};

export const CountersSection = forwardRef<HTMLDivElement, CountersSectionProps>(function CountersSection(
  { statsRef, count200Ref, count8000Ref },
  _ref
) {
  return (
    <div
      ref={statsRef}
      className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-4 opacity-0 will-change-[transform,opacity] sm:px-6"
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[120%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,20,45,0.55) 0%, rgba(10,20,45,0.32) 40%, rgba(10,20,45,0) 70%)",
            filter: "blur(8px)",
          }}
        />
        <p className="font-display text-lg tracking-tighter text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-2xl sm:tracking-tight md:text-4xl">
          Инвестиции в проекты будущего
        </p>
        <div className="mt-4 flex flex-col items-stretch gap-4 rounded-2xl border border-white/30 bg-white/10 px-5 py-4 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:mt-6 sm:inline-flex sm:flex-row sm:gap-10 sm:rounded-3xl sm:px-8 sm:py-6">
          <div className="text-center">
            <div className="font-display text-3xl font-semibold tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl sm:tracking-tight md:text-5xl lg:text-6xl">
              <span ref={count200Ref}>0+</span>
            </div>
            <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:mt-2 sm:text-[10px] sm:tracking-[0.25em]">
              Проектов в реализации
            </div>
          </div>
          <div className="hidden h-px w-full bg-white/25 sm:block sm:h-auto sm:w-px" />
          <div className="text-center">
            <div className="font-display text-3xl font-semibold tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl sm:tracking-tight md:text-5xl lg:text-6xl">
              <span ref={count8000Ref}>0</span>
            </div>
            <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:mt-2 sm:text-[10px] sm:tracking-[0.25em]">
              Завершённых проектов
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
