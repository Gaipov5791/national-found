import { getNewsBody } from "@/data/newsBodies";
import { formatNewsDate, getNewsById } from "@/data/news";
import { pickL10n } from "@/lib/l10n";
import type { Lang } from "@/lib/lang";

export function getLocalizedNewsArticle(id: string, lang: Lang) {
  const item = getNewsById(id);
  if (!item) return undefined;
  const body = getNewsBody(id, lang);
  if (!body) return undefined;
  return {
    ...item,
    title: pickL10n(item.title, lang),
    excerpt: pickL10n(item.excerpt, lang),
    dateLabel: formatNewsDate(item.date, lang),
    body,
  };
}
