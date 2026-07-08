import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { ABOUT_DETAIL_BLOCKS } from "@/components/sections/sectionContent";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "О фонде — НИФ КР" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <DetailPageLayout title="О фонде">
      <p>
        Национальный инвестиционный фонд выступает связующим звеном между государством, бизнесом и инвесторами.
        Мы применяем современные инструменты прямого инвестирования, направляя капитал в проекты, которые создают
        реальный экономический эффект и ускоряют развитие Кыргызстана.
      </p>
      <div className="grid gap-4 sm:gap-5">
        {ABOUT_DETAIL_BLOCKS.map((block) => (
          <DetailInfoBlock key={block.title} title={block.title}>
            {block.text}
          </DetailInfoBlock>
        ))}
      </div>
      <DetailInfoBlock title="Правовая основа">
        Фонд учреждён постановлением Кабинета Министров Кыргызской Республики от 5 ноября 2024 года № 666 во
        исполнение Закона Кыргызской Республики «О Национальном инвестиционном фонде Кыргызской Республики» и Указа
        Президента Кыргызской Республики № 155 от 14 июня 2024 года.
      </DetailInfoBlock>
    </DetailPageLayout>
  );
}
