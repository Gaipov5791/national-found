import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [{ title: "Партнёры — НИФ КР" }],
  }),
  component: PartnersPage,
});

const PARTNER_NAMES = ["EBRD", "IFC", "ADB", "AIIB", "KfW"] as const;

function PartnersPage() {
  const t = useT();

  return (
    <DetailPageLayout title={t.partners.pageTitle}>
      <p>{t.partners.blurb}</p>
      <DetailInfoBlock title={t.partners.strategyTitle}>{t.partners.strategyBody}</DetailInfoBlock>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
        {PARTNER_NAMES.map((name) => (
          <div
            key={name}
            className="flex h-16 items-center justify-center rounded-2xl border border-[color:var(--ink)]/10 bg-white/70 px-3 shadow-sm sm:h-20"
          >
            <span className="font-display text-[10px] font-semibold tracking-[0.18em] text-[color:var(--ink)]/70 sm:text-xs">
              {name}
            </span>
          </div>
        ))}
      </div>
    </DetailPageLayout>
  );
}
