export const CURSOR_ON_DARK_BG = "#ffffff";
export const CURSOR_ON_LIGHT_BG = "#262626";

/** Last known pointer position — updated by CustomCursor. */
let lastPointer = { x: -1, y: -1 };

/** Cloud band state — written by scrollytelling (no layout reads on the hot path). */
let cloudOpacity = 0;
let cloudHeightPx = 0;

/** Last surface from pointer target walk (no elementsFromPoint). */
let lastSurface: CursorBg = "dark";

export function setLastPointer(x: number, y: number) {
  lastPointer = { x, y };
}

export function getLastPointer() {
  return lastPointer;
}

type CursorBg = "dark" | "light";

/**
 * Update permanent-cloud metrics from the animation layer.
 * Call from GSAP onUpdate / prepare — never read getComputedStyle in the cursor hot path.
 */
export function setCloudCursorState(opacity: number, heightPx?: number) {
  cloudOpacity = opacity;
  if (heightPx !== undefined && heightPx > 0) {
    cloudHeightPx = heightPx;
  }
}

function surfaceFromTarget(target: EventTarget | null): CursorBg | null {
  if (!(target instanceof Element)) return null;
  const marked = target.closest("[data-cursor-surface]");
  if (!marked) return null;
  const surface = marked.getAttribute("data-cursor-surface");
  if (surface === "light" || surface === "dark") return surface;
  return null;
}

function cloudInfluence(y: number): CursorBg | null {
  if (cloudOpacity < 0.12 || cloudHeightPx <= 0) return null;
  const fadeEnd = cloudHeightPx * 0.92;
  if (y > fadeEnd) return null;
  const t = Math.max(0, Math.min(1, y / Math.max(1, fadeEnd)));
  const strength = cloudOpacity * (1 - t * 0.35);
  return strength > 0.18 ? "light" : null;
}

function detectBackground(y: number, target?: EventTarget | null): CursorBg {
  if (lastPointer.x < 0 || y < 0) return "dark";

  const cloud = cloudInfluence(y);
  if (cloud) return cloud;

  if (target !== undefined) {
    const fromTarget = surfaceFromTarget(target);
    if (fromTarget) {
      lastSurface = fromTarget;
      return fromTarget;
    }
  }

  // Pale sky band before the permanent cloud rolls in
  if (cloudOpacity < 0.12 && y < window.innerHeight * 0.34) {
    return "light";
  }

  return lastSurface;
}

function applyTheme(bg: CursorBg) {
  const ring = document.getElementById("custom-cursor-ring");
  const dot = document.getElementById("custom-cursor-dot");
  if (!ring || !dot) return;

  const theme = bg === "dark" ? "on-dark" : "on-light";
  const color = bg === "dark" ? CURSOR_ON_DARK_BG : CURSOR_ON_LIGHT_BG;

  if (ring.getAttribute("data-cursor-theme") === theme) return;

  ring.style.borderColor = color;
  dot.style.backgroundColor = color;
  ring.setAttribute("data-cursor-theme", theme);
}

/** Apply cursor colors from a pointer event target (mousemove). */
export function updateCursorThemeFromEvent(e: Pick<MouseEvent, "clientX" | "clientY" | "target">) {
  setLastPointer(e.clientX, e.clientY);
  applyTheme(detectBackground(e.clientY, e.target));
}

/** Apply cursor colors at the last pointer position (scroll / scrub). */
export function updateCursorThemeAtPoint(x: number, y: number) {
  setLastPointer(x, y);
  applyTheme(detectBackground(y));
}

export function refreshCursorTheme() {
  const { x, y } = lastPointer;
  if (x >= 0 && y >= 0) applyTheme(detectBackground(y));
}
