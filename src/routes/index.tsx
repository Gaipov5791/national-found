import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { preloadScrollytelling } from "@/lib/preloadScrollytelling";
import { InitialScene } from "@/components/scrollytelling/InitialScene";
import { SCENE_IMAGES } from "@/components/sections/sceneImages";

function ScrollytellingGate() {
  const [Scrollytelling, setScrollytelling] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    void preloadScrollytelling().then((component) => {
      if (!cancelled) setScrollytelling(() => component);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Если компонент уже есть в кэше — рендерим его сразу
  if (Scrollytelling) {
    return <Scrollytelling />;
  }

  return <InitialScene />;
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
      { property: "og:title", content: "Национальный инвестиционный фонд Кыргызской Республики" },
      { property: "og:description", content: "Инвестиции в проекты будущего Кыргызской Республики." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: SCENE_IMAGES.panorama,
        type: "image/jpeg",
        media: "(min-width: 768px)",
        fetchPriority: "high",
      },
      { rel: "preload", as: "image", href: SCENE_IMAGES.panoramaMobile, type: "image/webp", media: "(max-width: 767px)", fetchPriority: "high" },
      { rel: "preload", as: "image", href: SCENE_IMAGES.panoramaPreview },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <main className="relative z-10 isolate min-h-screen bg-scene-base text-foreground">
        <ScrollytellingGate />
      </main>
      <CustomCursor />
    </>
  );
}