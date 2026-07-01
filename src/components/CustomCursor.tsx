import { useEffect, useRef, useState } from "react";
import {
  CURSOR_ON_DARK_BG,
  CURSOR_ON_LIGHT_BG,
  refreshCursorTheme,
  setLastPointer,
  updateCursorThemeAtPoint,
} from "@/lib/cursorTheme";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    setLastPointer(pos.x, pos.y);
    updateCursorThemeAtPoint(pos.x, pos.y);

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setLastPointer(pos.x, pos.y);
      updateCursorThemeAtPoint(pos.x, pos.y);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.15;
      ring.y += (pos.y - ring.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor-hover], a, button")) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor-hover], a, button")) setHovering(false);
    };

    const onScroll = () => refreshCursorTheme();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div data-custom-cursor className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      <div
        ref={ringRef}
        id="custom-cursor-ring"
        data-cursor-theme="on-light"
        className="absolute left-0 top-0 rounded-full border bg-transparent transition-[width,height] duration-300 transition-colors duration-500 ease-out"
        style={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          borderColor: CURSOR_ON_LIGHT_BG,
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        id="custom-cursor-dot"
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full transition-colors duration-500 ease-out"
        style={{ backgroundColor: CURSOR_ON_LIGHT_BG, willChange: "transform" }}
      />
    </div>
  );
}
