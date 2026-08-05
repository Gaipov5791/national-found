import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { CustomCursor } from "@/components/CustomCursor";

const SCROLLYTELLING_FALLBACK = (
  <div className="min-h-screen bg-[#0b2138]" aria-busy="true" aria-label="Загрузка" />
);

function ScrollytellingGate() {
  const [Scrollytelling, setScrollytelling] = useState<ComponentType | null>(null);

  useEffect(() => {
    void import("@/components/Scrollytelling").then((mod) => {
      setScrollytelling(() => mod.Scrollytelling);
    });
  }, []);

  if (!Scrollytelling) {
    return SCROLLYTELLING_FALLBACK;
  }

  return <Scrollytelling />;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Национальный инвестиционный фонд Кыргызской Республики" },
      {
        name: "description",
        content:
          "Национальный инвестиционный фонд Кыргызской Республики — инвестиции в проекты будущего. 12 проектов в реализации.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtml = html.style.backgroundColor;
    const previousBody = body.style.backgroundColor;
    html.style.backgroundColor = "#0b2138";
    body.style.backgroundColor = "#0b2138";

    return () => {
      html.style.backgroundColor = previousHtml;
      body.style.backgroundColor = previousBody;
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0b2138] text-foreground">
      <ScrollytellingGate />
      <CustomCursor />
    </main>
  );
}
