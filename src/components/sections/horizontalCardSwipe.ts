/**
 * Horizontal card strip helpers — ensure first/last cards land fully in view.
 */

export function getScrollMax(scroller: HTMLElement) {
  return Math.max(0, scroller.scrollWidth - scroller.clientWidth);
}

/** Children to scroll between (skips empty text nodes). */
export function getScrollCards(track: HTMLElement) {
  return Array.from(track.children).filter(
    (node): node is HTMLElement => node instanceof HTMLElement
  );
}

/**
 * Target scrollLeft so card at `index` is fully visible.
 * First/last indices lock to 0 / max so edge cards aren't clipped.
 */
export function getCardScrollLeft(
  scroller: HTMLElement,
  track: HTMLElement,
  index: number
) {
  const cards = getScrollCards(track);
  if (!cards.length) return 0;

  const clamped = Math.max(0, Math.min(index, cards.length - 1));
  const max = getScrollMax(scroller);

  if (clamped === 0) return 0;
  if (clamped === cards.length - 1) return max;

  const card = cards[clamped];
  const cardLeft = card.offsetLeft;
  const cardRight = cardLeft + card.offsetWidth;
  const view = scroller.clientWidth;

  // Prefer start-align; if that would clip the right edge, shift left enough.
  let left = cardLeft;
  if (cardRight - left > view) {
    left = cardLeft;
  } else if (left + view < cardRight) {
    left = cardRight - view;
  }

  return Math.max(0, Math.min(left, max));
}

export type AutoSwipeController = {
  stop: () => void;
};

type AttachAutoSwipeOptions = {
  scroller: HTMLElement;
  /** Element that owns the card children (may equal scroller). */
  track: HTMLElement;
  intervalMs?: number;
  /** Ping-pong left/right. When false, loops from start. */
  pingPong?: boolean;
};

/**
 * Interval auto-swipe with pause on user interaction.
 * Steps by card index so edge cards settle fully on screen.
 */
export function attachHorizontalAutoSwipe({
  scroller,
  track,
  intervalMs = 2400,
  pingPong = true,
}: AttachAutoSwipeOptions): AutoSwipeController | null {
  if (typeof window === "undefined") return null;

  const cards = () => getScrollCards(track);
  if (cards().length <= 1) return null;

  const reduceMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return null;

  let intervalId: number | null = null;
  let resumeTimeoutId: number | null = null;
  let bootId: number | null = null;
  let pausedUntil = 0;
  let direction = 1;
  let index = 0;
  let isProgrammatic = false;

  const overflows = () => scroller.scrollWidth > scroller.clientWidth + 4;

  const pause = (ms: number) => {
    pausedUntil = Date.now() + ms;
    if (resumeTimeoutId) window.clearTimeout(resumeTimeoutId);
    resumeTimeoutId = window.setTimeout(() => {}, ms);
  };

  const syncIndexFromScroll = () => {
    const list = cards();
    if (!list.length) return;
    const max = getScrollMax(scroller);
    if (scroller.scrollLeft >= max - 4) {
      index = list.length - 1;
      return;
    }
    if (scroller.scrollLeft <= 4) {
      index = 0;
      return;
    }
    // Nearest card start.
    let best = 0;
    let bestDist = Infinity;
    list.forEach((card, i) => {
      const d = Math.abs(card.offsetLeft - scroller.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    index = best;
  };

  const stepOnce = () => {
    if (Date.now() < pausedUntil) return;
    if (!overflows()) return;

    const list = cards();
    if (list.length <= 1) return;

    if (pingPong) {
      let next = index + direction;
      if (next >= list.length - 1) {
        next = list.length - 1;
        direction = -1;
      } else if (next <= 0) {
        next = 0;
        direction = 1;
      }
      index = next;
    } else {
      index = index >= list.length - 1 ? 0 : index + 1;
    }

    const left = getCardScrollLeft(scroller, track, index);
    isProgrammatic = true;
    scroller.scrollTo({ left, behavior: "smooth" });
    window.setTimeout(() => {
      isProgrammatic = false;
    }, 750);
  };

  const onPointerDown = () => pause(5000);
  const onTouchStart = () => pause(5000);
  const onWheel = () => pause(5000);
  const onScroll = () => {
    if (isProgrammatic) return;
    pause(2200);
    syncIndexFromScroll();
  };

  scroller.addEventListener("pointerdown", onPointerDown, { passive: true });
  scroller.addEventListener("touchstart", onTouchStart, { passive: true });
  scroller.addEventListener("wheel", onWheel, { passive: true });
  scroller.addEventListener("scroll", onScroll, { passive: true });

  bootId = window.setTimeout(stepOnce, 400);
  intervalId = window.setInterval(stepOnce, intervalMs);

  return {
    stop: () => {
      if (intervalId) window.clearInterval(intervalId);
      if (bootId) window.clearTimeout(bootId);
      if (resumeTimeoutId) window.clearTimeout(resumeTimeoutId);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("scroll", onScroll);
    },
  };
}
