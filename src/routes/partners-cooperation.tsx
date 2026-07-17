import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { PartnerLogoGrid } from "@/components/PartnerLogoGrid";
import { COOPERATION_PARTNERS } from "@/data/partners";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/partners-cooperation")({
  head: () => ({
    meta: [{ title: "Международное и региональное сотрудничество — НИФ КР" }],
  }),
  component: PartnersCooperationPage,
});

function PartnersCooperationPage() {
  const t = useT();

  return (
    <DetailPageLayout title={t.partners.cooperationTitle} wide>
      <p>{t.partners.cooperationIntro}</p>

      <DetailInfoBlock title={t.partners.cooperationPartnersTitle}>
        <PartnerLogoGrid partners={COOPERATION_PARTNERS} />
      </DetailInfoBlock>
    </DetailPageLayout>
  );
}
