import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";

export const Route = createFileRoute("/partners-registry")({
  head: () => ({
    meta: [{ title: "Реестр партнёров — НИФ КР" }],
  }),
  component: PartnersRegistryPage,
});

function PartnersRegistryPage() {
  return (
    <DetailPageLayout title="Реестр партнёров">
      <p>Раздел находится в разработке. Скоро здесь появится реестр партнёров фонда.</p>
      <DetailInfoBlock title="Скоро">
        Контент для этой страницы будет добавлен позже.
      </DetailInfoBlock>
    </DetailPageLayout>
  );
}
