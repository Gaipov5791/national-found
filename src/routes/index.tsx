import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { CustomCursor } from "@/components/CustomCursor";

const SCROLLYTELLING_FALLBACK = (
  <div
    className="min-h-screen bg-gradient-to-b from-[#dbe6f1] via-[#e9eef5] to-[#f3f1e8]"
    aria-busy="true"
    aria-label="Загрузка"
  />
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
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <ScrollytellingGate />
      <CustomCursor />
    </main>
  );
}
