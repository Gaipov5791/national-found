import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { getAccreditationDocuments } from "@/lib/i18n/content";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/partners-join")({
  head: () => ({
    meta: [{ title: "Стать партнёром — НИФ КР" }],
  }),
  component: PartnersJoinPage,
});

function PartnersJoinPage() {
  const t = useT();
  const docs = getAccreditationDocuments(t);

  return (
    <DetailPageLayout title={t.partners.joinTitle}>
      <p>{t.partners.joinIntro}</p>

      <DetailInfoBlock title={t.partners.docsTitle}>
        <p className="font-semibold text-white">{t.partners.accreditationTitle}</p>
        <ul className="mt-2 space-y-2">
          {docs.map((doc) => (
            <li key={doc.href}>
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-white/30 underline-offset-2 transition hover:text-[color:var(--gold)] hover:decoration-[color:var(--gold)]"
              >
                {doc.title}
              </a>
            </li>
          ))}
        </ul>
      </DetailInfoBlock>
    </DetailPageLayout>
  );
}
