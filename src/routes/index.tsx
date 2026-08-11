import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { SCENE_IMAGES } from "@/components/sections/sceneImages";
import { getCachedScrollytelling, preloadScrollytelling } from "@/lib/preloadScrollytelling";

/** Kick off the heavy chunk as soon as this module evaluates on the client. */
if (typeof window !== "undefined") {
  void preloadScrollytelling();
}

/** Lightweight peaks crop — same framing as the scrollytelling hero stop. */
const HERO_FALLBACK = (
  <div
    className="relative min-h-screen overflow-hidden bg-[#051426]"
    aria-busy="true"
    aria-label="Загрузка"
  >
    <picture className="absolute inset-0 block h-full w-full">
      <source srcSet={SCENE_IMAGES.heroWebp} type="image/webp" />
      <img
        src={SCENE_IMAGES.hero}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover"
        style={{ objectPosition: "center 14%" }}
      />
    </picture>
    <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
  </div>
);

function ScrollytellingGate() {
  const [Scrollytelling, setScrollytelling] = useState<ComponentType | null>(() =>
    getCachedScrollytelling(),
  );

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

  // Warm the full panorama in parallel with the JS chunk (does not block LCP).
  useEffect(() => {
    const img = new Image();
    img.decoding = "async";
    img.src = SCENE_IMAGES.panoramaWebp;
  }, []);

  if (!Scrollytelling) {
    return HERO_FALLBACK;
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
    links: [
      {
        rel: "preload",
        as: "image",
        href: SCENE_IMAGES.heroWebp,
        type: "image/webp",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative isolate min-h-screen bg-[#051426] text-foreground">
      <ScrollytellingGate />
      <CustomCursor />
    </main>
  );
}
