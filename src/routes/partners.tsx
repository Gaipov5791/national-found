import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [{ title: "Партнёры — НИФ КР" }],
  }),
  component: PartnersPage,
});

const PARTNER_NAMES = ["EBRD", "IFC", "ADB", "AIIB", "KfW"] as const;

function PartnersPage() {
  return (
    <DetailPageLayout title="Партнёры">
      <p>
        Национальный инвестиционный фонд развивает партнёрства с ведущими международными финансовыми институтами
        и организациями для реализации стратегических проектов в Кыргызстане.
      </p>
      <DetailInfoBlock title="Стратегическое сотрудничество">
        Партнёрства позволяют привлекать международный опыт, расширять источники финансирования и реализовывать
        масштабные инвестиционные инициативы в приоритетных отраслях экономики.
      </DetailInfoBlock>
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
