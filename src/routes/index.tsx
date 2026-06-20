import { createFileRoute } from "@tanstack/react-router";
import { Scrollytelling } from "@/components/Scrollytelling";
import { CustomCursor } from "@/components/CustomCursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Национальный инвестиционный фонд Кыргызской Республики" },
      {
        name: "description",
        content:
          "Национальный инвестиционный фонд Кыргызской Республики — инвестиции в проекты будущего. 200+ проектов в реализации, 8 000 завершённых проектов.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Scrollytelling />
      <CustomCursor />
    </main>
  );
}
