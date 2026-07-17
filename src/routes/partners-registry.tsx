import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { PartnerLogoGrid } from "@/components/PartnerLogoGrid";
import { getPartnerRegistry } from "@/lib/i18n/content";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/partners-registry")({
  head: () => ({
    meta: [{ title: "Реестр партнёров — НИФ КР" }],
  }),
  component: PartnersRegistryPage,
});

function PartnersRegistryPage() {
  const t = useT();
  const registry = getPartnerRegistry(t);

  return (
    <DetailPageLayout title={t.partners.registryTitle} wide>
      <p>{t.partners.registryIntro}</p>

      {registry.map((category) => (
        <DetailInfoBlock key={category.title} title={category.title}>
          <PartnerLogoGrid partners={category.partners} />
        </DetailInfoBlock>
      ))}
    </DetailPageLayout>
  );
}
