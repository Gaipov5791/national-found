/**
 * Horizontal card strip helpers — ensure first/last cards land fully in view.
 */
import gsap from "gsap";

export function getScrollMax(scroller: HTMLElement) {
  return Math.max(0, scroller.scrollWidth - scroller.clientWidth);
}

/** Children to scroll between (skips empty text nodes). */
export function getScrollCards(track: HTMLElement) {
  return Array.from(track.children).filter(
    (node): node is HTMLElement => node instanceof HTMLElement,
  );
}

export type CardScrollAlign = "start" | "center";

/**
 * Target scrollLeft for a card. Start alignment keeps edge cards fully visible;
 * center alignment uses the exact midpoint of the card and viewport.
 */
export function getCardScrollLeft(
  scroller: HTMLElement,
  track: HTMLElement,
  index: number,
  align: CardScrollAlign = "start",
) {
  const cards = getScrollCards(track);
  if (!cards.length) return 0;

  const clamped = Math.max(0, Math.min(index, cards.length - 1));
  const max = getScrollMax(scroller);

  const card = cards[clamped];
  const cardLeft = card.offsetLeft;
  const cardRight = cardLeft + card.offsetWidth;
  const view = scroller.clientWidth;

  if (align === "center") {
    const left = cardLeft + card.offsetWidth / 2 - view / 2;
    return Math.max(0, Math.min(left, max));
  }

  if (clamped === 0) return 0;
  if (clamped === cards.length - 1) return max;

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
  /** Duration of one automatic transition in seconds. */
  duration?: number;
  /** GSAP ease used for automatic transitions. */
  ease?: string;
  /** Ping-pong left/right. When false, loops from start. */
  pingPong?: boolean;
  /** How the active card should settle in the viewport. */
  align?: CardScrollAlign;
};

/**
 * Interval auto-swipe with pause on user interaction.
 * Steps by card index so edge cards settle fully on screen.
 */
export function attachHorizontalAutoSwipe({
  scroller,
  track,
  intervalMs = 2400,
  duration = 0.95,
  ease = "power2.inOut",
  pingPong = true,
  align = "start",
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
  let transition: gsap.core.Tween | null = null;

  const overflows = () => scroller.scrollWidth > scroller.clientWidth + 4;

  const pause = (ms: number) => {
    pausedUntil = Date.now() + ms;
    if (resumeTimeoutId) window.clearTimeout(resumeTimeoutId);
    resumeTimeoutId = window.setTimeout(() => {}, ms);
  };

  /** CSS scroll-snap / scroll-smooth fight GSAP mid-tween and cause a micro-jerk. */
  const setProgrammaticScroll = (active: boolean) => {
    isProgrammatic = active;
    if (active) {
      scroller.style.scrollSnapType = "none";
      track.style.scrollSnapType = "none";
      scroller.style.scrollBehavior = "auto";
    } else {
      scroller.style.removeProperty("scroll-snap-type");
      track.style.removeProperty("scroll-snap-type");
      scroller.style.removeProperty("scroll-behavior");
    }
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
    const viewportAnchor =
      align === "center"
        ? scroller.scrollLeft + scroller.clientWidth / 2
        : scroller.scrollLeft;
    let best = 0;
    let bestDist = Infinity;
    list.forEach((card, i) => {
      const cardAnchor =
        align === "center" ? card.offsetLeft + card.offsetWidth / 2 : card.offsetLeft;
      const d = Math.abs(cardAnchor - viewportAnchor);
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

    const left = getCardScrollLeft(scroller, track, index, align);
    transition?.kill();
    setProgrammaticScroll(true);
    transition = gsap.to(scroller, {
      scrollLeft: left,
      duration,
      ease,
      overwrite: "auto",
      onComplete: () => {
        // Snap to the exact target once, then re-enable CSS snap without a second jump.
        scroller.scrollLeft = left;
        transition = null;
        setProgrammaticScroll(false);
      },
      onInterrupt: () => {
        transition = null;
        setProgrammaticScroll(false);
      },
    });
  };

  const stopTransitionForInteraction = () => {
    transition?.kill();
    transition = null;
    setProgrammaticScroll(false);
    syncIndexFromScroll();
    pause(5000);
  };
  const onPointerDown = () => stopTransitionForInteraction();
  const onTouchStart = () => stopTransitionForInteraction();
  const onWheel = () => stopTransitionForInteraction();
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
      transition?.kill();
      transition = null;
      setProgrammaticScroll(false);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("scroll", onScroll);
    },
  };
}
