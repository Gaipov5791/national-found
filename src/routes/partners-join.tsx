import { createFileRoute } from "@tanstack/react-router";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { ACCREDITATION_DOCUMENTS } from "@/data/partners";

export const Route = createFileRoute("/partners-join")({
  head: () => ({
    meta: [{ title: "Стать партнёром — НИФ КР" }],
  }),
  component: PartnersJoinPage,
});

function PartnersJoinPage() {
  return (
    <DetailPageLayout title="Стать партнёром">
      <p>
        Ознакомьтесь с критериями аккредитации для компаний, желающих стать
        партнёрами Национального инвестиционного фонда Кыргызской Республики.
      </p>

      <DetailInfoBlock title="Документы">
        <p className="font-semibold text-white">Критерии аккредитации</p>
        <ul className="mt-2 space-y-2">
          {ACCREDITATION_DOCUMENTS.map((doc) => (
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
