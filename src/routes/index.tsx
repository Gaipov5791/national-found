import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { SCENE_IMAGES } from "@/components/sections/sceneImages";
import { getCachedScrollytelling, preloadScrollytelling } from "@/lib/preloadScrollytelling";

/** Same asset as the scrollytelling hero — avoids a flash of mountains.jpg. */
const PANORAMA_FALLBACK = (
  <div
    className="relative min-h-screen overflow-hidden bg-[#051426]"
    aria-busy="true"
    aria-label="Загрузка"
  >
    <picture className="absolute inset-0 block h-full w-full">
      <source
        media="(max-width: 767px)"
        srcSet={SCENE_IMAGES.panoramaMobile}
        type="image/webp"
      />
      <img
        src={SCENE_IMAGES.panorama}
        alt=""
        fetchPriority="high"
        className="h-full w-full object-cover"
        style={{ objectPosition: "center 14%" }}
      />
    </picture>
    <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
  </div>
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
    return PANORAMA_FALLBACK;
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
        href: SCENE_IMAGES.panorama,
        media: "(min-width: 768px)",
      },
      {
        rel: "preload",
        as: "image",
        href: SCENE_IMAGES.panoramaMobile,
        type: "image/webp",
        media: "(max-width: 767px)",
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
