import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [{ title: "Новости — НИФ КР" }],
  }),
  component: NewsPage,
});

const PLACEHOLDER_NEWS = [
  {
    title: "Новые инвестиционные проекты",
    date: "Скоро",
    excerpt: "Анонсы проектов фонда и ключевые этапы их реализации.",
  },
  {
    title: "Партнёрские соглашения",
    date: "Скоро",
    excerpt: "Сотрудничество с международными финансовыми институтами.",
  },
  {
    title: "Развитие регионов",
    date: "Скоро",
    excerpt: "Инициативы фонда в поддержке МСБ и региональной экономики.",
  },
] as const;

function NewsPage() {
  return (
    <DetailPageLayout title="Новости">
      <p>Раздел новостей находится в разработке. Скоро здесь появятся актуальные материалы о деятельности фонда.</p>
      <DetailInfoBlock title="Следите за обновлениями">
        Публикуем информацию о новых проектах, партнёрствах и ключевых событиях в деятельности Национального
        инвестиционного фонда Кыргызской Республики.
      </DetailInfoBlock>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_NEWS.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-[color:var(--ink)]/10 bg-white/70 p-5 shadow-sm sm:p-6"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink)]/45">
              {item.date}
            </p>
            <h2 className="mt-2 font-display text-base font-bold text-[color:var(--ink)] sm:text-lg">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink)]/70">{item.excerpt}</p>
          </article>
        ))}
      </div>
    </DetailPageLayout>
  );
}
