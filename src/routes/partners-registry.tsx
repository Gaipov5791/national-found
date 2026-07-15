import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { PartnerLogoGrid } from "@/components/PartnerLogoGrid";
import { PARTNER_REGISTRY } from "@/data/partners";

export const Route = createFileRoute("/partners-registry")({
  head: () => ({
    meta: [{ title: "Реестр партнёров — НИФ КР" }],
  }),
  component: PartnersRegistryPage,
});

function PartnersRegistryPage() {
  return (
    <DetailPageLayout title="Реестр партнёров" wide>
      <p>
        В реестре представлены организации, оказывающие профессиональные услуги
        Национальному инвестиционному фонду Кыргызской Республики.
      </p>

      {PARTNER_REGISTRY.map((category) => (
        <DetailInfoBlock key={category.title} title={category.title}>
          <PartnerLogoGrid partners={category.partners} />
        </DetailInfoBlock>
      ))}
    </DetailPageLayout>
  );
}
