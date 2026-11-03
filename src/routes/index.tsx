import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { getCachedScrollytelling, preloadScrollytelling } from "@/lib/preloadScrollytelling";

if (typeof window !== "undefined") {
  void preloadScrollytelling();
}

function LoadingFallback() {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0b2138] text-white"
      aria-busy="true"
      aria-label="Загрузка сайта"
    >
      <div className="relative flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-white" />
      </div>
      <p className="mt-4 text-xs font-medium tracking-[0.2em] text-white/60 uppercase">
        Загрузка...
      </p>
    </div>
  );
}

function ScrollytellingGate() {
  const [Scrollytelling, setScrollytelling] = useState<ComponentType | null>(() => getCachedScrollytelling());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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

  // Если компонент уже есть в кэше — рендерим его сразу
  if (Scrollytelling) {
    return <Scrollytelling />;
  }

  // До монтирования на клиенте отдаем простую подложку без расхождения DOM
  if (!isMounted) {
    return <div className="min-h-screen bg-[#0b2138]" />;
  }

  return <LoadingFallback />;
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
        href: "/images/горы-панорама.jpeg",
        type: "image/jpeg",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <main className="relative z-10 isolate min-h-screen bg-[#0b2138] text-foreground">
        <ScrollytellingGate />
      </main>
      <CustomCursor />
    </>
  );
}