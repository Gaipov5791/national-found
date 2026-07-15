import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { PartnerLogoGrid } from "@/components/PartnerLogoGrid";
import { COOPERATION_PARTNERS } from "@/data/partners";

export const Route = createFileRoute("/partners-cooperation")({
  head: () => ({
    meta: [{ title: "Международное и региональное сотрудничество — НИФ КР" }],
  }),
  component: PartnersCooperationPage,
});

function PartnersCooperationPage() {
  return (
    <DetailPageLayout title="Международное и региональное сотрудничество" wide>
      <p>
        Национальный инвестиционный фонд развивает сотрудничество с
        международными и региональными организациями для реализации
        стратегических проектов в Кыргызской Республике.
      </p>

      <DetailInfoBlock title="Партнёры">
        <PartnerLogoGrid partners={COOPERATION_PARTNERS} />
      </DetailInfoBlock>
    </DetailPageLayout>
  );
}
