export const CURSOR_ON_DARK_BG = "#ffffff";
export const CURSOR_ON_LIGHT_BG = "#262626";

/** Last known pointer position — updated by CustomCursor. */
let lastPointer = { x: -1, y: -1 };

/**
 * Optional cloud metrics written by scrollytelling (avoids layout reads when fresh).
 * Falls back to DOM measurement when unset / stale.
 */
let cloudOpacityCache: number | null = null;
let cloudHeightPxCache = 0;

export function setLastPointer(x: number, y: number) {
  lastPointer = { x, y };
}

export function getLastPointer() {
  return lastPointer;
}

type CursorBg = "dark" | "light";

/**
 * Update permanent-cloud metrics from the animation layer when available.
 * Detection still falls back to live DOM reads for full sensitivity.
 */
export function setCloudCursorState(opacity: number, heightPx?: number) {
  cloudOpacityCache = opacity;
  if (heightPx !== undefined && heightPx > 0) {
    cloudHeightPxCache = heightPx;
  }
}

function parseRgba(css: string): { r: number; g: number; b: number; a: number } | null {
  const m = css.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i);
  if (!m) return null;
  return {
    r: Number(m[1]),
    g: Number(m[2]),
    b: Number(m[3]),
    a: m[4] !== undefined ? Number(m[4]) : 1,
  };
}

function luminance(r: number, g: number, b: number) {
  const toLin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

function isCursorElement(el: Element) {
  return Boolean(
    el.id === "custom-cursor-ring" ||
      el.id === "custom-cursor-dot" ||
      el.closest("[data-custom-cursor]")
  );
}

function surfaceFromElement(el: Element): CursorBg | null {
  const marked = el.closest("[data-cursor-surface]");
  if (marked) {
    const surface = marked.getAttribute("data-cursor-surface");
    if (surface === "light" || surface === "dark") return surface;
  }

  const bg = getComputedStyle(el).backgroundColor;
  const rgba = parseRgba(bg);
  if (!rgba || rgba.a < 0.12) return null;

  return luminance(rgba.r, rgba.g, rgba.b) > 0.62 ? "light" : "dark";
}

function readCloudOpacity(cloud: HTMLElement): number {
  if (cloudOpacityCache !== null) return cloudOpacityCache;
  return parseFloat(getComputedStyle(cloud).opacity) || 0;
}

function cloudInfluence(y: number): CursorBg | null {
  const cloud = document.querySelector<HTMLElement>("[data-permanent-cloud]");
  if (!cloud) return null;

  const opacity = readCloudOpacity(cloud);
  if (opacity < 0.12) return null;

  let fadeEnd: number;
  if (cloudHeightPxCache > 0) {
    fadeEnd = cloudHeightPxCache * 0.92;
    if (y > fadeEnd) return null;
    const t = Math.max(0, Math.min(1, y / Math.max(1, fadeEnd)));
    const strength = opacity * (1 - t * 0.35);
    return strength > 0.18 ? "light" : null;
  }

  const rect = cloud.getBoundingClientRect();
  fadeEnd = rect.top + rect.height * 0.92;
  if (y > fadeEnd) return null;

  const t = Math.max(0, Math.min(1, (y - rect.top) / Math.max(1, fadeEnd - rect.top)));
  const strength = opacity * (1 - t * 0.35);
  return strength > 0.18 ? "light" : null;
}

function detectBackgroundAt(x: number, y: number): CursorBg {
  if (x < 0 || y < 0) return "dark";

  const cloud = cloudInfluence(y);
  if (cloud) return cloud;

  const stack = document.elementsFromPoint(x, y).filter((el) => !isCursorElement(el));

  for (const el of stack) {
    const surface = surfaceFromElement(el);
    if (surface) return surface;
  }

  // Pale sky band before the permanent cloud rolls in
  const cloudEl = document.querySelector<HTMLElement>("[data-permanent-cloud]");
  const cloudOpacity = cloudEl ? readCloudOpacity(cloudEl) : 0;
  if (cloudOpacity < 0.12 && y < window.innerHeight * 0.34) {
    return "light";
  }

  return "dark";
}

/** Apply cursor colors: light ring on dark bg, dark ring on light bg. */
export function updateCursorThemeAtPoint(x: number, y: number) {
  const ring = document.getElementById("custom-cursor-ring");
  const dot = document.getElementById("custom-cursor-dot");
  if (!ring || !dot) return;

  setLastPointer(x, y);

  const bg = detectBackgroundAt(x, y);
  const theme = bg === "dark" ? "on-dark" : "on-light";
  const color = bg === "dark" ? CURSOR_ON_DARK_BG : CURSOR_ON_LIGHT_BG;

  if (ring.getAttribute("data-cursor-theme") === theme) return;

  ring.style.borderColor = color;
  dot.style.backgroundColor = color;
  ring.setAttribute("data-cursor-theme", theme);
}

export function refreshCursorTheme() {
  const { x, y } = lastPointer;
  if (x >= 0 && y >= 0) updateCursorThemeAtPoint(x, y);
}
