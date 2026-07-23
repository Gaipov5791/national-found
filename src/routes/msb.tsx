import { createFileRoute } from "@tanstack/react-router";
import { MsbProjectsMap } from "@/components/msb/MsbProjectsMap";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import {
  formatPercent,
  formatSomAmount,
  portfolioStats,
} from "@/data/msbProjects";
import { useLang, useT } from "@/lib/lang";

export const Route = createFileRoute("/msb")({
  head: () => ({
    meta: [{ title: "Проекты МСБ — НИФ КР" }],
  }),
  component: MsbPage,
});

function MsbPage() {
  const t = useT();
  const { lang } = useLang();
  const stats = portfolioStats();

  return (
    <DetailPageLayout title={t.msb.pageTitle} wide>
      <p>{t.msb.pageIntro}</p>

      <DetailInfoBlock title={t.msb.overviewTitle}>
        <p>{t.msb.overviewBody}</p>
        <p className="mt-3">{t.msb.overviewInstruments}</p>
      </DetailInfoBlock>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t.msb.statProjects} value={String(stats.projectCount)} />
        <StatCard label={t.msb.statLocations} value={String(stats.districtCount)} />
        <StatCard
          label={t.msb.statTotal}
          value={formatSomAmount(stats.totalSom, lang)}
        />
        <StatCard
          label={t.msb.statGrants}
          value={`${formatSomAmount(stats.grantSom, lang)} · ${formatPercent(stats.grantShare, lang)}`}
        />
      </div>

      <p className="text-sm leading-relaxed text-white/70 sm:text-base">
        {t.msb.statSplit
          .replace("{loans}", formatPercent(stats.loanShare, lang))
          .replace("{grants}", formatPercent(stats.grantShare, lang))
          .replace("{grantCount}", String(stats.grantCount))}
      </p>

      <MsbProjectsMap />
    </DetailPageLayout>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">{label}</p>
      <p className="mt-2 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">{value}</p>
    </div>
  );
}
