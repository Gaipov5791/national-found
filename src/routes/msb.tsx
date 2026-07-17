import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/msb")({
  head: () => ({
    meta: [{ title: "Проекты МСБ — НИФ КР" }],
  }),
  component: MsbPage,
});

function MsbPage() {
  const t = useT();

  return (
    <DetailPageLayout title={t.msb.pageTitle}>
      <p>{t.msb.pageIntro}</p>
      <DetailInfoBlock title={t.msb.soonTitle}>{t.msb.soonBody}</DetailInfoBlock>
    </DetailPageLayout>
  );
}
