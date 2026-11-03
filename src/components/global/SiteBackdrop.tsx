import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function SiteBackdrop() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isHome = pathname === "/";

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 transition-opacity duration-500",
        isHome ? "opacity-0" : "opacity-100"
      )}
      aria-hidden
    >
      {/* 1. Размытая фоновая картинка */}
      <div
        className="absolute inset-[-40px] bg-cover bg-center blur-[24px] scale-105"
        style={{ backgroundImage: "url('/images/горы-панорама.jpeg')" }}
      />
      {/* 2. Темная вуаль для читаемости белого текста */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,20,38,0.75),rgba(8,28,49,0.85))]" />
    </div>
  );
}