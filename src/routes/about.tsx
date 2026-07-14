import { createFileRoute } from "@tanstack/react-router";
import {
  DetailInfoBlock,
  DetailPageLayout,
  PersonCard,
  PersonGrid,
} from "@/components/DetailPageLayout";
import {
  ABOUT_BOARD,
  ABOUT_CORPORATE_SECRETARY,
  ABOUT_DEPARTMENT_HEADS,
  ABOUT_FINANCIAL_REPORTS,
  ABOUT_FOUNDING_TEXT,
  ABOUT_GOAL_TEXT,
  ABOUT_LEADERSHIP,
  ABOUT_LEGAL_STATUS,
  ABOUT_REGULATORY_DOCS,
  ABOUT_TASKS,
} from "@/components/sections/sectionContent";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "О фонде — НИФ КР" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <DetailPageLayout title="О фонде" wide>
      <p>{ABOUT_FOUNDING_TEXT}</p>

      <DetailInfoBlock title="Цель и задачи">
        <p>{ABOUT_GOAL_TEXT}</p>
        <p className="mt-3 font-semibold text-[color:var(--ink)]">Основные задачи</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          {ABOUT_TASKS.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </DetailInfoBlock>

      <DetailInfoBlock title="Правовой статус">
        <ul className="list-disc space-y-1.5 pl-5">
          {ABOUT_LEGAL_STATUS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DetailInfoBlock>

      <DetailInfoBlock title="Совет директоров">
        <PersonGrid people={ABOUT_BOARD} columns={3} />
      </DetailInfoBlock>

      <DetailInfoBlock title="Руководство">
        <PersonGrid people={ABOUT_LEADERSHIP} columns={3} />
      </DetailInfoBlock>

      <DetailInfoBlock title="Руководители департаментов">
        <PersonGrid people={ABOUT_DEPARTMENT_HEADS} columns={4} />
      </DetailInfoBlock>

      <DetailInfoBlock title="Корпоративный секретарь">
        <div className="mx-auto mt-5 max-w-[260px] sm:mt-6 sm:max-w-[300px]">
          <PersonCard person={ABOUT_CORPORATE_SECRETARY} />
        </div>
      </DetailInfoBlock>

      <DetailInfoBlock title="Документы и отчётность">
        <p className="font-semibold text-[color:var(--ink)]">Регулирующие документы</p>
        <ul className="mt-2 space-y-2">
          {ABOUT_REGULATORY_DOCS.map((doc) => (
            <li key={doc.href}>
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--ink)] underline decoration-[color:var(--ink)]/25 underline-offset-2 transition hover:text-[color:var(--gold)] hover:decoration-[color:var(--gold)]"
              >
                {doc.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-semibold text-[color:var(--ink)]">Финансовая отчётность</p>
        <ul className="mt-2 space-y-2">
          {ABOUT_FINANCIAL_REPORTS.map((doc) => (
            <li key={doc.title} className="text-[color:var(--ink)]/70">
              {doc.href ? (
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--ink)] underline decoration-[color:var(--ink)]/25 underline-offset-2 transition hover:text-[color:var(--gold)] hover:decoration-[color:var(--gold)]"
                >
                  {doc.title}
                </a>
              ) : (
                <>
                  {doc.title}
                  <span className="ml-2 text-sm tracking-wide text-[color:var(--ink)]/40">
                    — скоро
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </DetailInfoBlock>
    </DetailPageLayout>
  );
}
