import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { SectionCard } from "@/components/sections/SectionCard";
import { getFinanceCards } from "@/lib/i18n/content";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [{ title: "Финансирование проектов — НИФ КР" }],
  }),
  component: FinancePage,
});

function FinancePage() {
  const t = useT();
  const cards = getFinanceCards(t);

  return (
    <DetailPageLayout title={t.finance.pageTitle}>
      <p>{t.finance.blurb}</p>
      <DetailInfoBlock title={t.finance.toolsTitle}>{t.finance.toolsBody}</DetailInfoBlock>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
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
