import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { getPanoramaSrc, logBg, preloadSceneBackgrounds } from "@/lib/sceneBackground";
import { cn } from "@/lib/utils";

/**
 * Persistent overlay above html's горы-панорама background.
 * Blur uses filter on a viewport-sized cover crop (not backdrop-filter on the 8k strip).
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
        data-bg="detail-blur"
        className={cn(
          "pointer-events-none fixed inset-[-40px] z-0 scale-105 bg-cover bg-no-repeat blur-[20px] transition-opacity duration-300",
          isHome ? "opacity-0" : "opacity-100",
        )}
        aria-hidden
      />
      <div
        data-bg="detail-veil"
        className={cn(
          "pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(5,20,38,0.62),rgba(8,28,49,0.72))] transition-opacity duration-300",
          isHome ? "opacity-0" : "opacity-100",
        )}
        aria-hidden
      />
    </>
  );
}
