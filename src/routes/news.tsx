import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [{ title: "Новости — НИФ КР" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  const t = useT();

  return (
    <DetailPageLayout title={t.news.pageTitle}>
      <p>{t.news.pageIntro}</p>
      <DetailInfoBlock title={t.news.updatesTitle}>{t.news.updatesBody}</DetailInfoBlock>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.news.placeholders.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-[color:var(--ink)]/10 bg-white/70 p-5 shadow-sm sm:p-6"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink)]/45">
              {item.date}
            </p>
            <h2 className="mt-2 font-display text-base font-bold text-[color:var(--ink)] sm:text-lg">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink)]/70">{item.excerpt}</p>
          </article>
        ))}
      </div>
    </DetailPageLayout>
  );
}
