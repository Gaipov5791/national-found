import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { getPanoramaSrc, logBg, preloadSceneBackgrounds } from "@/lib/sceneBackground";
import { cn } from "@/lib/utils";

/**
 * Persistent overlay above html's горы-панорама background.
 * mountains.jpg is intentionally unused for now.
 * No extra panorama paint and no backdrop-blur — both made internal pages stall.
 */
export function SiteBackdrop() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isHome = pathname === "/";

  useEffect(() => {
    void preloadSceneBackgrounds();
  }, []);

  useEffect(() => {
    logBg("backdrop:route", { pathname, isHome, panorama: getPanoramaSrc() });
  }, [pathname, isHome]);

  return (
    <div
      data-bg="detail-veil"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(5,20,38,0.68),rgba(8,28,49,0.78))] transition-opacity duration-300",
        isHome ? "opacity-0" : "opacity-100",
      )}
      aria-hidden
    />
  );
}
