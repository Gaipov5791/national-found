import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { SCENE_IMAGES } from "@/components/sections/sceneImages";
import { getCachedScrollytelling, preloadScrollytelling } from "@/lib/preloadScrollytelling";

/**
 * Peaks-first-frame hero — cropped from the tall panorama at the desktop
 * object-cover + peaks (14%) framing so the handoff onto the live strip is seamless.
 * Stays under the scrollytelling layer the whole time (no mount/unmount flash).
 */
function PeaksHeroBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 h-[100svh] w-full overflow-hidden md:h-screen"
      aria-hidden
    >
      <picture className="absolute inset-0 block h-full w-full">
        <source srcSet={SCENE_IMAGES.peaksHeroAvif} type="image/avif" />
        <source srcSet={SCENE_IMAGES.peaksHero} type="image/webp" />
        <img
          src={SCENE_IMAGES.peaksHeroJpg}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      {/* Match panorama dim overlay so luminance doesn't pop on swap */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
    </div>
  );
}

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

  // Hero backdrop stays visible underneath until this mounts.
  if (!Scrollytelling) return null;

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
        href: SCENE_IMAGES.peaksHero,
        type: "image/webp",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative isolate min-h-screen text-foreground">
      <PeaksHeroBackdrop />
      <ScrollytellingGate />
      <CustomCursor />
    </main>
  );
}
