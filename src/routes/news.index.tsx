import { createFileRoute, Link } from "@tanstack/react-router";
import { DetailPageLayout } from "@/components/DetailPageLayout";
import { formatNewsDate, getNewsItems } from "@/data/news";
import { pickL10n } from "@/lib/l10n";
import { useLang, useT } from "@/lib/lang";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [{ title: "Новости — НИФ КР" }],
  }),
  component: NewsIndexPage,
});

function NewsIndexPage() {
  const t = useT();
  const { lang } = useLang();
  const items = getNewsItems();

  return (
    <DetailPageLayout title={t.news.pageTitle} wide>
      <p className="text-white/80">{t.news.pageIntro}</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const title = pickL10n(item.title, lang);
          const excerpt = pickL10n(item.excerpt, lang);
          const date = formatNewsDate(item.date, lang);

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-sm backdrop-blur-sm transition hover:border-white/30 hover:bg-white/[0.14]"
            >
              <Link
                to="/news/$slug"
                params={{ slug: item.id }}
                className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <div
                  className={cn(
                    "overflow-hidden bg-[#071426]",
                    item.imageFit === "contain" ? "aspect-square" : "aspect-[16/10]"
                  )}
                >
                  <img
                    src={item.image}
                    alt=""
                    className={cn(
                      "h-full w-full",
                      item.imageFit === "contain" ? "object-contain" : "object-cover"
                    )}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    {date}
                  </p>
                  <h2 className="mt-2 font-display text-base font-bold text-white sm:text-lg">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{excerpt}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-white/90">
                    {t.news.readMore}
                    <span aria-hidden className="ml-2 opacity-80">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </DetailPageLayout>
  );
}
