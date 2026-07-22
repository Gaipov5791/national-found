import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FinanceApplicationForm } from "@/components/FinanceApplicationForm";
import { DetailInfoBlock, DetailPageLayout } from "@/components/DetailPageLayout";
import { SectionCard } from "@/components/sections/SectionCard";
import { DETAIL_CARDS_GRID } from "@/components/sections/sectionLayout";
import { getFinanceCards } from "@/lib/i18n/content";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [{ title: "Финансирование проектов — НИФ КР" }],
  }),
  component: FinancePage,
});

function FinancePage() {
  const t = useT();
  const cards = getFinanceCards(t);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash !== "apply" && hash !== "sc_finance") return;
    const el = document.getElementById("apply");
    if (!el) return;
    // Wait a tick for layout (icons / fonts) before scrolling to the form.
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <DetailPageLayout title={t.finance.pageTitle}>
      <p>{t.finance.blurb}</p>
      <DetailInfoBlock title={t.finance.toolsTitle}>{t.finance.toolsBody}</DetailInfoBlock>
      <div className={DETAIL_CARDS_GRID}>
        {cards.map((card) => (
          <SectionCard
            key={card.title}
            variant="light"
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
      <FinanceApplicationForm className="scroll-mt-28" />
    </DetailPageLayout>
  );
}
