import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { SectionCard } from "@/components/sections/SectionCard";
import { FINANCE_CARDS } from "@/components/sections/sectionContent";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [{ title: "Финансирование проектов — НИФ КР" }],
  }),
  component: FinancePage,
});

function FinancePage() {
  return (
    <DetailPageLayout title="Финансирование проектов">
      <p>
        Мы предлагаем современные инструменты финансирования, которые помогают привлекать капитал и успешно
        реализовывать стратегические проекты в Кыргызстане.
      </p>
      <DetailInfoBlock title="Инструменты фонда">
        Фонд использует гибкие модели участия — от соинвестирования с банками и международными партнёрами до прямого
        вхождения в капитал компаний и целевых инструментов поддержки проектов.
      </DetailInfoBlock>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {FINANCE_CARDS.map((card) => (
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
