import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DetailPageLayout } from "@/components/DetailPageLayout";
import { getLocalizedNewsArticle, getNewsById } from "@/data/news";
import { useLang, useT, type Lang } from "@/lib/lang";

type NewsArticle = NonNullable<Awaited<ReturnType<typeof getLocalizedNewsArticle>>>;

export const Route = createFileRoute("/news/$slug")({
  head: ({ params }) => {
    const item = getNewsById(params.slug);
    return {
      meta: [{ title: item ? `${item.title.RU} — НИФ КР` : "Новости — НИФ КР" }],
    };
  },
  loader: async ({ params }) => {
    // Dynamic import inside getLocalizedNewsArticle keeps newsBodies off the home graph.
    const article = await getLocalizedNewsArticle(params.slug, "RU");
    if (!article) throw notFound();
    return article;
  },
  component: NewsArticlePage,
});

function NewsArticlePage() {
  const { slug } = Route.useParams();
  const initialArticle = Route.useLoaderData() as NewsArticle;
  const t = useT();
  const { lang } = useLang();
  const article = useLocalizedArticle(slug, lang, initialArticle);

  if (!article) {
    throw notFound();
  }

  return (
    <DetailPageLayout title={article.title} compactTitle>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
        {article.dateLabel}
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/15 bg-[#071426]">
        <img
          src={article.image}
          alt=""
          className={
            article.imageFit === "contain"
              ? "mx-auto block h-auto w-full object-contain"
              : "aspect-[16/9] w-full object-cover"
          }
          loading="eager"
          decoding="async"
        />
      </div>

      <div
        className="news-article-body mt-6 space-y-4 text-base leading-relaxed text-white/85 sm:mt-8 sm:text-lg [&_a]:font-semibold [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-white [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />

      <div className="mt-10 border-t border-white/15 pt-6">
        <Link
          to="/news"
          className="text-sm font-semibold tracking-[0.08em] text-white/75 transition hover:text-white"
        >
          ← {t.news.pageTitle}
        </Link>
      </div>
    </DetailPageLayout>
  );
}

function useLocalizedArticle(slug: string, lang: Lang, initial: NewsArticle) {
  const [article, setArticle] = useState<NewsArticle>(initial);

  useEffect(() => {
    setArticle(initial);
  }, [initial]);

  useEffect(() => {
    let cancelled = false;
    void getLocalizedNewsArticle(slug, lang).then((next) => {
      if (!cancelled && next) setArticle(next);
    });
    return () => {
      cancelled = true;
    };
  }, [slug, lang]);

  return article;
}
