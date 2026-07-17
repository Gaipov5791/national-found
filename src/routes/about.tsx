import { createFileRoute } from "@tanstack/react-router";
import {
  DetailInfoBlock,
  DetailPageLayout,
  PersonCard,
  PersonGrid,
} from "@/components/DetailPageLayout";
import {
  getAboutBoard,
  getAboutCorporateSecretary,
  getAboutDepartmentHeads,
  getAboutFinancialReports,
  getAboutLeadership,
  getAboutRegulatoryDocs,
} from "@/lib/i18n/content";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "О фонде — НИФ КР" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const t = useT();
  const board = getAboutBoard(t);
  const leadership = getAboutLeadership(t);
  const departmentHeads = getAboutDepartmentHeads(t);
  const secretary = getAboutCorporateSecretary(t);
  const regulatoryDocs = getAboutRegulatoryDocs(t);
  const financialReports = getAboutFinancialReports(t);

  return (
    <DetailPageLayout title={t.about.pageTitle} wide>
      <p>{t.about.founding}</p>

      <DetailInfoBlock title={t.about.goalTitle}>
        <p>{t.about.goal}</p>
        <p className="mt-3 font-semibold text-white">{t.about.tasksTitle}</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          {t.about.tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </DetailInfoBlock>

      <DetailInfoBlock title={t.about.legalTitle}>
        <ul className="list-disc space-y-1.5 pl-5">
          {t.about.legal.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DetailInfoBlock>

      <DetailInfoBlock title={t.about.boardTitle}>
        <PersonGrid people={board} columns={3} />
      </DetailInfoBlock>

      <DetailInfoBlock title={t.about.leadershipTitle}>
        <PersonGrid people={leadership} columns={3} />
      </DetailInfoBlock>

      <DetailInfoBlock title={t.about.departmentHeadsTitle}>
        <PersonGrid people={departmentHeads} columns={4} />
      </DetailInfoBlock>

      <DetailInfoBlock title={t.about.secretaryTitle}>
        <div className="mx-auto mt-5 max-w-[260px] sm:mt-6 sm:max-w-[300px]">
          <PersonCard person={secretary} />
        </div>
      </DetailInfoBlock>

      <DetailInfoBlock title={t.about.docsTitle}>
        <p className="font-semibold text-white">{t.about.regulatoryTitle}</p>
        <ul className="mt-2 space-y-2">
          {regulatoryDocs.map((doc) => (
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
        <p className="mt-4 font-semibold text-white">{t.about.reportsTitle}</p>
        <ul className="mt-2 space-y-2">
          {financialReports.map((doc) => (
            <li key={doc.title} className="text-white/70">
              {doc.href ? (
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline decoration-white/30 underline-offset-2 transition hover:text-[color:var(--gold)] hover:decoration-[color:var(--gold)]"
                >
                  {doc.title}
                </a>
              ) : (
                <>
                  {doc.title}
                  <span className="ml-2 text-sm tracking-wide text-white/40">{t.common.comingSoon}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </DetailInfoBlock>
    </DetailPageLayout>
  );
}
