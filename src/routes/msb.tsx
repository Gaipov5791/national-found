import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";

export const Route = createFileRoute("/msb")({
  head: () => ({
    meta: [{ title: "Проекты МСБ — НИФ КР" }],
  }),
  component: MsbPage,
});

function MsbPage() {
  return (
    <DetailPageLayout title="Проекты МСБ">
      <p>
        Раздел находится в разработке. Скоро здесь появится информация о проектах малого и среднего бизнеса,
        поддерживаемых Национальным инвестиционным фондом.
      </p>
      <DetailInfoBlock title="Скоро">
        Контент для этой страницы будет добавлен позже.
      </DetailInfoBlock>
    </DetailPageLayout>
  );
}
