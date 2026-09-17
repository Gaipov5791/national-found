import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { logBg } from "@/lib/sceneBackground";
import { cn } from "@/lib/utils";

/**
 * Overlay above the lightweight hero still. Full 8k strip is only used by the landing <img>.
 */
export function SiteBackdrop() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isHome = pathname === "/";

  useEffect(() => {
    logBg("backdrop:route", { pathname, isHome });
  }, [pathname, isHome]);

  return (
    <>
      <div
        data-bg="detail-blur"
        className={cn(
          "pointer-events-none fixed inset-[-40px] z-0 scale-105 bg-cover bg-no-repeat blur-[20px] transition-opacity duration-300",
          isHome ? "opacity-0" : "is-active opacity-100",
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
