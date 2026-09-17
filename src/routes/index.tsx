import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { getCachedScrollytelling, preloadScrollytelling } from "@/lib/preloadScrollytelling";
import { logBg } from "@/lib/sceneBackground";

if (typeof window !== "undefined") {
  void preloadScrollytelling();
}

function ScrollytellingGate() {
  const [Scrollytelling, setScrollytelling] = useState<ComponentType | null>(() =>
    typeof window === "undefined" ? null : getCachedScrollytelling(),
  );

  useEffect(() => {
    const cached = getCachedScrollytelling();
    logBg("gate:start", { jsCached: Boolean(cached) });
    if (cached) {
      logBg("gate:already-ready");
      setScrollytelling(() => cached);
      return;
    }

    let cancelled = false;
    void preloadScrollytelling().then((component) => {
      if (cancelled) return;
      logBg("gate:ready");
      setScrollytelling(() => component);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!Scrollytelling) {
    return <div className="min-h-screen" aria-busy="true" aria-label="Загрузка" />;
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
    <main className="relative z-10 isolate min-h-screen text-foreground">
      <ScrollytellingGate />
    </main>
  );
}
