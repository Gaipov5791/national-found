import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";

export const Route = createFileRoute("/partners-join")({
  head: () => ({
    meta: [{ title: "Стать партнёром — НИФ КР" }],
  }),
  component: PartnersJoinPage,
});

function PartnersJoinPage() {
  return (
    <DetailPageLayout title="Стать партнёром">
      <p>Раздел находится в разработке. Скоро здесь появится информация о том, как стать партнёром фонда.</p>
      <DetailInfoBlock title="Скоро">
        Контент для этой страницы будет добавлен позже.
      </DetailInfoBlock>
    </DetailPageLayout>
  );
}
