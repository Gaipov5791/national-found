import { createFileRoute } from "@tanstack/react-router";
import { MsbProjectsMap } from "@/components/msb/MsbProjectsMap";
import { DetailPageLayout } from "@/components/DetailPageLayout";
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
    <DetailPageLayout title={t.msb.pageTitle} wide>
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <p className="max-w-3xl">{t.msb.pageIntro}</p>
        <MsbProjectsMap />
        <p className="text-sm text-white/55 sm:text-base">{t.msb.demoNote}</p>
      </div>
    </DetailPageLayout>
  );
}
