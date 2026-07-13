import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";

export const Route = createFileRoute("/partners-cooperation")({
  head: () => ({
    meta: [{ title: "Международное и региональное сотрудничество — НИФ КР" }],
  }),
  component: PartnersCooperationPage,
});

function PartnersCooperationPage() {
  return (
    <DetailPageLayout title="Международное и региональное сотрудничество">
      <p>
        Раздел находится в разработке. Скоро здесь появится информация о международном и региональном
        сотрудничестве фонда.
      </p>
      <DetailInfoBlock title="Скоро">
        Контент для этой страницы будет добавлен позже.
      </DetailInfoBlock>
    </DetailPageLayout>
  );
}
