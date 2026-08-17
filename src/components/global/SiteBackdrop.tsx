import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { getPanoramaSrc, logBg, preloadSceneBackgrounds } from "@/lib/sceneBackground";
import { cn } from "@/lib/utils";

/**
 * Persistent горы-панорама layer. Stays mounted across home ↔ detail routes
 * so the photo is never torn down (that swap was the flicker).
 * mountains.jpg is intentionally unused for now.
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
    <>
      <div
        data-bg="panorama"
        className="pointer-events-none fixed inset-0 z-0 bg-cover"
        aria-hidden
      />
      <div
        data-bg="detail-veil"
        className={cn(
          "pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(5,20,38,0.68),rgba(8,28,49,0.78))] backdrop-blur-[16px] transition-opacity duration-300",
          isHome ? "opacity-0" : "opacity-100",
        )}
        aria-hidden
      />
    </>
  );
}
