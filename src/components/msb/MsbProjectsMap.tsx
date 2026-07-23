import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, CircleDot, MapPinned } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MSB_DISTRICTS,
  districtFinancing,
  formatPercent,
  formatSomAmount,
  pickL10n,
  portfolioStats,
  type MsbDistrict,
  type MsbProject,
} from "@/data/msbProjects";
import { useLang, useT } from "@/lib/lang";
import { cn } from "@/lib/utils";

function MsbMapCanvasLazy(props: {
  districts: readonly MsbDistrict[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [Canvas, setCanvas] = useState<null | typeof import("./MsbMapCanvas").MsbMapCanvas>(null);

  useEffect(() => {
    let active = true;
    import("./MsbMapCanvas").then((mod) => {
      if (active) setCanvas(() => mod.MsbMapCanvas);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!Canvas) {
    return (
      <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-sm text-white/60">
        …
      </div>
    );
  }

  return <Canvas {...props} />;
}

function ProjectCard({ project }: { project: MsbProject }) {
  const t = useT();
  const { lang } = useLang();
  const active = project.status === "active";
  const isGrant = project.instrument === "grant";

  return (
    <article className="rounded-xl border border-white/15 bg-white/[0.07] p-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-base font-semibold tracking-tight text-white">
          {pickL10n(project.title, lang)}
        </h4>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em]",
              active
                ? "bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/30"
                : "bg-[color:var(--gold)]/15 text-[color:var(--gold)] ring-1 ring-[color:var(--gold)]/30"
            )}
          >
            {active ? <CircleDot className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
            {active ? t.msb.statusActive : t.msb.statusCompleted}
          </span>
          {isGrant ? (
            <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-emerald-200 ring-1 ring-emerald-300/30">
              {t.msb.grantBadge}
            </span>
          ) : null}
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{pickL10n(project.summary, lang)}</p>
      <p className="mt-3 text-sm font-semibold tracking-wide text-[color:var(--gold)]">
        {t.msb.financedLabel}: {formatSomAmount(project.amountSom, lang)}
      </p>
    </article>
  );
}

export function MsbProjectsMap() {
  const t = useT();
  const { lang } = useLang();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openGuardRef = useRef(false);
  const stats = useMemo(() => portfolioStats(), []);

  const selected = useMemo(
    () => MSB_DISTRICTS.find((d) => d.id === selectedId) ?? null,
    [selectedId]
  );
  const open = selectedId !== null;
  const selectedTotal = selected ? districtFinancing(selected) : 0;
  const selectedShare = stats.totalSom > 0 ? selectedTotal / stats.totalSom : 0;

  const handleSelect = useCallback((id: string) => {
    // Defer open so the map click isn't treated as Dialog "pointer down outside".
    openGuardRef.current = true;
    window.setTimeout(() => {
      setSelectedId(id);
      window.setTimeout(() => {
        openGuardRef.current = false;
      }, 120);
    }, 0);
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-md">
      <div className="border-b border-white/15 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--gold)]/15 text-[color:var(--gold)] ring-1 ring-[color:var(--gold)]/30">
            <MapPinned className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{t.msb.mapTitle}</h2>
            <p className="mt-1 text-sm leading-relaxed text-white/75 sm:text-base">{t.msb.mapHint}</p>
            <p className="mt-2 text-sm text-white/55">{t.msb.mapPanelHint}</p>
          </div>
        </div>
      </div>

      <div className="relative z-0 h-[420px] sm:h-[520px] lg:h-[640px]">
        <MsbMapCanvasLazy
          districts={MSB_DISTRICTS}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!next) {
            if (openGuardRef.current) return;
            setSelectedId(null);
          }
        }}
      >
        <DialogContent
          className={cn(
            "z-[1200] flex max-h-[min(85vh,640px)] max-w-lg flex-col gap-0 overflow-hidden border-white/20 bg-[#0b2138] p-0 text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:rounded-2xl",
            "[&>button]:top-4 [&>button]:right-4 [&>button]:text-white/70 [&>button]:hover:text-white [&>button]:ring-offset-[#0b2138]"
          )}
          onPointerDownOutside={(event) => {
            if (openGuardRef.current) {
              event.preventDefault();
            }
          }}
          onInteractOutside={(event) => {
            if (openGuardRef.current) {
              event.preventDefault();
            }
          }}
        >
          {selected ? (
            <>
              <DialogHeader className="shrink-0 space-y-1.5 border-b border-white/10 px-6 pt-6 pr-12 pb-4 text-left">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">
                  {pickL10n(selected.region, lang)}
                </p>
                <DialogTitle className="font-display text-2xl font-bold tracking-tight text-white">
                  {pickL10n(selected.name, lang)}
                </DialogTitle>
                <DialogDescription className="text-white/70">
                  {t.msb.projectsInRegion}
                  {selected.projects.length > 1 ? ` · ${selected.projects.length}` : ""}
                </DialogDescription>
                <p className="pt-1 text-sm font-semibold text-[color:var(--gold)]">
                  {t.msb.districtTotal}: {formatSomAmount(selectedTotal, lang)}
                  <span className="ml-2 font-normal text-white/55">
                    ({formatPercent(selectedShare, lang)} {t.msb.ofPortfolio})
                  </span>
                </p>
              </DialogHeader>

              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-6 py-4">
                {selected.projects.length === 0 ? (
                  <p className="text-sm text-white/65">{t.msb.noProjects}</p>
                ) : (
                  selected.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))
                )}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
