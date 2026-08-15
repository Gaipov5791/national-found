import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { getCachedScrollytelling, preloadScrollytelling } from "@/lib/preloadScrollytelling";
import { getPanoramaSrc, isImageDecoded, logBg, preloadDecodedImage } from "@/lib/sceneBackground";

function ScrollytellingGate() {
  const [Scrollytelling, setScrollytelling] = useState<ComponentType | null>(() =>
    typeof window === "undefined" ? null : getCachedScrollytelling(),
  );

  useEffect(() => {
    const panoramaSrc = getPanoramaSrc();
    const jsCached = Boolean(getCachedScrollytelling());
    logBg("gate:start", {
      panoramaSrc,
      jsCached,
      imgCached: isImageDecoded(panoramaSrc),
    });

    // Decode in parallel with the JS chunk; do not block the UI on the 4.4MB panorama.
    void preloadDecodedImage(panoramaSrc);

    const cached = getCachedScrollytelling();
    if (cached) {
      logBg("gate:already-ready", { panoramaSrc });
      setScrollytelling(() => cached);
      return;
    }

    let cancelled = false;
    void preloadScrollytelling().then((component) => {
      if (cancelled) return;
      logBg("gate:ready", {
        panoramaSrc,
        imgCached: isImageDecoded(panoramaSrc),
      });
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
    <main className="relative isolate min-h-screen text-foreground">
      <ScrollytellingGate />
      <CustomCursor />
    </main>
  );
}
