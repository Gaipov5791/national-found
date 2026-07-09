import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { SectionCard } from "@/components/sections/SectionCard";
import { DIRECTION_CARDS } from "@/components/sections/sectionContent";

export const Route = createFileRoute("/directions")({
  head: () => ({
    meta: [{ title: "Перспективные направления — НИФ КР" }],
  }),
  component: DirectionsPage,
});

function DirectionsPage() {
  return (
    <DetailPageLayout title="Перспективные направления">
      <p>
        Национальный инвестиционный фонд работает с ключевыми отраслями, которые имеют высокий потенциал роста и
        важны для развития экономики Кыргызстана.
      </p>
      <DetailInfoBlock title="Отраслевой фокус">
        Приоритет отдаётся проектам, которые формируют долгосрочный экономический эффект, создают рабочие места и
        развивают инфраструктуру регионов.
      </DetailInfoBlock>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {DIRECTION_CARDS.map((card) => (
          <SectionCard
            key={card.title}
            variant="light"
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
    </DetailPageLayout>
  );
}
