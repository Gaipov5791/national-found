import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { SectionCard } from "@/components/sections/SectionCard";
import { DETAIL_CARDS_GRID } from "@/components/sections/sectionLayout";
import { getDirectionCards } from "@/lib/i18n/content";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/directions")({
  head: () => ({
    meta: [{ title: "Перспективные направления — НИФ КР" }],
  }),
  component: DirectionsPage,
});

function DirectionsPage() {
  const t = useT();
  const cards = getDirectionCards(t);

  return (
    <DetailPageLayout title={t.directions.pageTitle}>
      <p>{t.directions.blurb}</p>
      <DetailInfoBlock title={t.directions.focusTitle}>{t.directions.focusBody}</DetailInfoBlock>
      <div className={`${DETAIL_CARDS_GRID} lg:grid-cols-3`}>
        {cards.map((card) => (
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
