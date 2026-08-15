import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { logBg, MOUNTAINS_SRC, preloadSceneBackgrounds } from "@/lib/sceneBackground";
import { cn } from "@/lib/utils";

/**
 * Persistent mountains.jpg layer. Stays mounted across home ↔ detail routes
 * so CSS background-image is not torn down and re-decoded (the flicker source).
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
    logBg("backdrop:route", { pathname, isHome, mountains: MOUNTAINS_SRC });
  }, [pathname, isHome]);

  return (
    <>
      <div
        data-bg="mountains"
        className="pointer-events-none fixed inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url("${MOUNTAINS_SRC}")` }}
        aria-hidden
      />
      <div
        data-bg="detail-veil"
        className={cn(
          "pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,20,38,0.68),rgba(8,28,49,0.78))] backdrop-blur-[16px] transition-opacity duration-300",
          isHome ? "opacity-0" : "opacity-100",
        )}
        aria-hidden
      />
    </>
  );
}
