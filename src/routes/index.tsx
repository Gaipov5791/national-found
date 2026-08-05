import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { getCachedScrollytelling, preloadScrollytelling } from "@/lib/preloadScrollytelling";

const MOUNTAIN_FALLBACK = (
  <div
    className="min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/images/mountains.jpg')" }}
    aria-busy="true"
    aria-label="Загрузка"
  />
);

function ScrollytellingGate() {
  const [Scrollytelling, setScrollytelling] = useState<ComponentType | null>(() => getCachedScrollytelling());

  useEffect(() => {
    const cached = getCachedScrollytelling();
    if (cached) {
      setScrollytelling(() => cached);
      return;
    }

    let cancelled = false;
    void preloadScrollytelling().then((component) => {
      if (!cancelled) setScrollytelling(() => component);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!Scrollytelling) {
    return MOUNTAIN_FALLBACK;
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
    <main className="relative isolate min-h-screen text-foreground">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/mountains.jpg')" }}
        aria-hidden
      />
      <ScrollytellingGate />
      <CustomCursor />
    </main>
  );
}
