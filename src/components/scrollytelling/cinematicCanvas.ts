import type { SceneTimings, SceneTimeline } from "@/components/sections/sceneAnimationShared";
import {
  CINEMATIC_ENTER_EASE,
  CINEMATIC_EXIT_EASE,
  CINEMATIC_MOTION_EASE,
} from "@/components/sections/sceneAnimationShared";
import { SCENE_IMAGES } from "@/components/sections/sceneImages";

export type CinematicLayerOpacity = {
  mountains: number;
  kumtor: number;
  hpp: number;
  lake: number;
  space: number;
  footer: number;
};

export type CinematicLayerSlide = {
  kumtor: number;
  hpp: number;
  lake: number;
};

export type CinematicSpaceDrift = {
  scale: number;
  x: number;
  y: number;
};

export type CinematicCamera = {
  zoom: number;
  x: number;
  y: number;
  opacity: CinematicLayerOpacity;
  peaksOpacity: number;
  /** 0–1 volumetric cloud cover during drone dive transitions (masks lower scenery). */
  cloudProgress: number;
  layerSlide: CinematicLayerSlide;
  spaceDrift: CinematicSpaceDrift;
  skyTint: string;
};

export type CinematicImages = {
  mountains: HTMLImageElement;
  kumtor: HTMLImageElement;
  hpp: HTMLImageElement;
  lake: HTMLImageElement;
  space: HTMLImageElement;
};

export type CinematicViewport = {
  width: number;
  height: number;
};

const IMAGE_SOURCES: Record<keyof CinematicImages, string> = {
  mountains: SCENE_IMAGES.hero,
  kumtor: SCENE_IMAGES.finance,
  hpp: SCENE_IMAGES.directions,
  lake: SCENE_IMAGES.msb,
  space: SCENE_IMAGES.space,
};

/** Peaks overlay band — top 34% of viewport; summits never leave the horizon grid. */
const PEAKS_BAND_RATIO = 0.34;
/** Vertical lift applied to mountain layers (fraction of viewport height). */
const MOUNTAIN_LIFT_RATIO = 0.12;
/** Horizontal overscale for panning layers — prevents edge exposure during camera.x drift. */
const PANORAMIC_OVERSCALE = 1.15;
/** Volumetric cloud haze covers the lower portion of the frame during dives. */
const CLOUD_MASK_CLEAR_TOP = 0.28;
const CLOUD_MASK_FEATHER_END = 0.36;
const CLOUD_MASK_DENSE_BOTTOM = 0.68;

type LayerDrawSpec = {
  image: HTMLImageElement;
  alpha: number;
  anchorX: number;
  anchorY: number;
  x: number;
  y: number;
  zoom: number;
  /** Widen cover-fit width and center-padding for horizontal pan safety. */
  panoramicOverscale?: boolean;
  /** Soft alpha fade at the bottom of the layer (mountain → sky seam). */
  featherBottom?: boolean;
  /** Soft alpha fade for the peaks overlay band (replaces hard clip). */
  featherPeakBand?: boolean;
};

let scratchCanvas: HTMLCanvasElement | null = null;
let scratchCtx: CanvasRenderingContext2D | null = null;

function getScratchCanvas(vw: number, vh: number) {
  if (!scratchCanvas) {
    scratchCanvas = document.createElement("canvas");
    scratchCtx = scratchCanvas.getContext("2d");
  }
  if (!scratchCtx) {
    throw new Error("Cinematic canvas scratch context unavailable");
  }
  if (scratchCanvas.width !== vw || scratchCanvas.height !== vh) {
    scratchCanvas.width = vw;
    scratchCanvas.height = vh;
  }
  return { canvas: scratchCanvas, ctx: scratchCtx };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load cinematic image: ${src}`));
    img.src = src;
  });
}

export function createCinematicCamera(): CinematicCamera {
  return {
    zoom: 1.0,
    x: 0,
    y: 0,
    opacity: {
      mountains: 1.0,
      kumtor: 0.0,
      hpp: 0.0,
      lake: 0.0,
      space: 0.0,
      footer: 0.0,
    },
    peaksOpacity: 1.0,
    cloudProgress: 0,
    layerSlide: {
      kumtor: 1,
      hpp: 1,
      lake: 1,
    },
    spaceDrift: {
      scale: 1,
      x: 0,
      y: 0,
    },
    skyTint: "#dbe6f1",
  };
}

export function preloadCinematicImages(): Promise<CinematicImages> {
  const entries = Object.entries(IMAGE_SOURCES) as [keyof CinematicImages, string][];
  return Promise.all(entries.map(([, src]) => loadImage(src))).then((loaded) => {
    const images = {} as CinematicImages;
    entries.forEach(([key], index) => {
      images[key] = loaded[index]!;
    });
    return images;
  });
}

export function resizeCinematicCanvas(
  canvas: HTMLCanvasElement,
  staticViewportHeight?: number | null
): CinematicViewport {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = staticViewportHeight ?? window.innerHeight;

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  return { width, height };
}

function coverDimensions(
  img: HTMLImageElement,
  vw: number,
  vh: number,
  panoramicOverscale = false
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const viewRatio = vw / vh;

  if (imgRatio > viewRatio) {
    const baseDrawH = vh;
    const baseDrawW = baseDrawH * imgRatio;
    const drawW = panoramicOverscale ? baseDrawW * PANORAMIC_OVERSCALE : baseDrawW;
    return {
      drawW,
      drawH: baseDrawH,
      offsetX: (vw - drawW) / 2,
      offsetY: 0,
    };
  }

  const baseDrawW = vw;
  const baseDrawH = baseDrawW / imgRatio;
  const drawW = panoramicOverscale ? baseDrawW * PANORAMIC_OVERSCALE : baseDrawW;
  return {
    drawW,
    drawH: baseDrawH,
    offsetX: (vw - drawW) / 2,
    offsetY: (vh - baseDrawH) / 2,
  };
}

function applyFeatherMask(
  ctx: CanvasRenderingContext2D,
  vw: number,
  vh: number,
  mode: "peak" | "base"
) {
  ctx.globalCompositeOperation = "destination-in";

  if (mode === "peak") {
    const grad = ctx.createLinearGradient(0, 0, 0, vh * PEAKS_BAND_RATIO);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(0.55, "rgba(0,0,0,1)");
    grad.addColorStop(0.82, "rgba(0,0,0,0.45)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, vw, vh * PEAKS_BAND_RATIO);
  } else {
    const seamStart = vh * 0.22;
    const seamEnd = vh * 0.56;
    const grad = ctx.createLinearGradient(0, seamStart, 0, seamEnd);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(0.42, "rgba(0,0,0,0.92)");
    grad.addColorStop(0.72, "rgba(0,0,0,0.35)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, seamStart, vw, seamEnd - seamStart);
  }

  ctx.globalCompositeOperation = "source-over";
}

/** Premium haze band — blends mountain base into the live sky tint at the foreground seam. */
function drawMountainSeamHaze(
  ctx: CanvasRenderingContext2D,
  viewport: CinematicViewport,
  skyTint: string,
  alpha: number
) {
  if (alpha <= 0.001) return;

  const { width: vw, height: vh } = viewport;
  const bandTop = vh * 0.26;
  const bandBottom = vh * 0.5;

  ctx.save();
  ctx.globalAlpha = alpha * 0.78;
  const haze = ctx.createLinearGradient(0, bandTop, 0, bandBottom);
  haze.addColorStop(0, "rgba(255,255,255,0)");
  haze.addColorStop(0.35, "rgba(255,255,255,0)");
  haze.addColorStop(0.62, skyTint);
  haze.addColorStop(1, skyTint);
  ctx.fillStyle = haze;
  ctx.fillRect(0, bandTop, vw, bandBottom - bandTop);
  ctx.restore();
}

/**
 * Programmatic volumetric cloud — densest haze masks the lower 60–70% of the frame
 * while the upper sky and peaks overlay stay clear during drone dive transitions.
 */
function drawVolumetricCloudLayer(
  ctx: CanvasRenderingContext2D,
  viewport: CinematicViewport,
  camera: CinematicCamera
) {
  const progress = camera.cloudProgress;
  if (progress <= 0.001) return;

  const { width: vw, height: vh } = viewport;
  const { ctx: sctx } = getScratchCanvas(vw, vh);

  sctx.setTransform(1, 0, 0, 1, 0, 0);
  sctx.clearRect(0, 0, vw, vh);

  const expand = 0.55 + progress * 0.5;
  const anchorY = vh * (0.92 - progress * 0.08);

  const hazeLayers = [
    { spreadX: 2.0 * expand, spreadY: 1.35 * expand, alpha: 0.62 },
    { spreadX: 1.55 * expand, spreadY: 1.05 * expand, alpha: 0.48 },
    { spreadX: 1.15 * expand, spreadY: 0.82 * expand, alpha: 0.38 },
  ];

  for (const layer of hazeLayers) {
    const cx = vw * 0.5 + camera.x * 0.08 * progress;
    const cy = anchorY + camera.y * 0.04 * progress;
    const radius = Math.max(vw * layer.spreadX, vh * layer.spreadY) * 0.5;
    const grad = sctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    const a = layer.alpha * progress;
    grad.addColorStop(0, `rgba(255,255,255,${a})`);
    grad.addColorStop(0.38, `rgba(248,250,255,${a * 0.9})`);
    grad.addColorStop(0.68, `rgba(230,238,248,${(a * 0.55).toFixed(3)})`);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, vw, vh);
  }

  sctx.globalCompositeOperation = "destination-in";
  const mask = sctx.createLinearGradient(0, 0, 0, vh);
  mask.addColorStop(0, "rgba(0,0,0,0)");
  mask.addColorStop(CLOUD_MASK_CLEAR_TOP, "rgba(0,0,0,0)");
  mask.addColorStop(CLOUD_MASK_FEATHER_END, "rgba(0,0,0,0.35)");
  mask.addColorStop(CLOUD_MASK_DENSE_BOTTOM, "rgba(0,0,0,1)");
  mask.addColorStop(1, "rgba(0,0,0,1)");
  sctx.fillStyle = mask;
  sctx.fillRect(0, 0, vw, vh);
  sctx.globalCompositeOperation = "source-over";

  ctx.save();
  ctx.drawImage(scratchCanvas!, 0, 0, vw, vh);
  ctx.restore();
}

/**
 * Draw one cover-fit layer with independent translate / scale around its anchor.
 * Every layer is always evaluated — alpha gates visibility, never a hard on/off branch.
 */
function drawCoverLayer(
  ctx: CanvasRenderingContext2D,
  spec: LayerDrawSpec,
  viewport: CinematicViewport
) {
  const { image, alpha, anchorX, anchorY, x, y, zoom, panoramicOverscale, featherBottom, featherPeakBand } =
    spec;
  if (alpha <= 0.001 || !image.complete || image.naturalWidth === 0) return;

  const { width: vw, height: vh } = viewport;
  const { drawW, drawH, offsetX, offsetY } = coverDimensions(
    image,
    vw,
    vh,
    panoramicOverscale
  );
  const ax = vw * anchorX;
  const ay = vh * anchorY;
  const needsFeather = featherBottom || featherPeakBand;

  if (needsFeather) {
    const { ctx: sctx } = getScratchCanvas(vw, vh);
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.clearRect(0, 0, vw, vh);
    sctx.globalAlpha = 1;
    sctx.translate(ax + x, ay + y);
    sctx.scale(zoom, zoom);
    sctx.translate(-ax, -ay);
    sctx.drawImage(image, offsetX, offsetY, drawW, drawH);
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    applyFeatherMask(sctx, vw, vh, featherPeakBand ? "peak" : "base");

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(scratchCanvas!, 0, 0, vw, vh);
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(ax + x, ay + y);
  ctx.scale(zoom, zoom);
  ctx.translate(-ax, -ay);
  ctx.drawImage(image, offsetX, offsetY, drawW, drawH);
  ctx.restore();
}

function buildLayerSpecs(
  camera: CinematicCamera,
  images: CinematicImages,
  viewport: CinematicViewport
): LayerDrawSpec[] {
  const { width: vw, height: vh } = viewport;
  const slideUnit = vh * 0.55;
  const mountainLift = -vh * MOUNTAIN_LIFT_RATIO;

  const kumtorSlideY = camera.layerSlide.kumtor * slideUnit;
  const hppSlideY = camera.layerSlide.hpp * slideUnit;
  const lakeSlideY = camera.layerSlide.lake * slideUnit;
  const spaceAlive = camera.opacity.space;
  const spaceDepthScale = 1 + (camera.spaceDrift.scale - 1) * spaceAlive;

  return [
    // Deepest — space grid with independent micro-drift during hyper-zoom hold
    {
      image: images.space,
      alpha: camera.opacity.space,
      anchorX: 0.5,
      anchorY: 0.5,
      x: camera.x * 0.15 + camera.spaceDrift.x * spaceAlive,
      y: camera.y * 0.1 + camera.spaceDrift.y * spaceAlive,
      zoom: camera.zoom * spaceDepthScale,
      panoramicOverscale: true,
    },
    // Full mountain plate — elevated, feathered base, panoramic overscale
    {
      image: images.mountains,
      alpha: camera.opacity.mountains,
      anchorX: 0.5,
      anchorY: 0.68,
      x: camera.x * 0.22,
      y: camera.y * 0.06 + mountainLift,
      zoom: camera.zoom,
      panoramicOverscale: true,
      featherBottom: true,
    },
    // Kumtor rises from bottom edge mist (Step C dive anchor)
    {
      image: images.kumtor,
      alpha: camera.opacity.kumtor,
      anchorX: 0.5,
      anchorY: 0.9,
      x: camera.x * 0.45,
      y: camera.y * 0.55 + kumtorSlideY,
      zoom: camera.zoom * 1.04,
      panoramicOverscale: true,
    },
    // HPP slides up over Kumtor — pinned just below peaks overlay
    {
      image: images.hpp,
      alpha: camera.opacity.hpp,
      anchorX: 0.5,
      anchorY: 0.9,
      x: camera.x * 0.5,
      y: camera.y * 0.5 + hppSlideY,
      zoom: camera.zoom * 1.05,
      panoramicOverscale: true,
    },
    // Issyk-Kul lake ascent — same bottom-mist anchor for unified dive
    {
      image: images.lake,
      alpha: camera.opacity.lake,
      anchorX: 0.5,
      anchorY: 0.9,
      x: camera.x * 0.38,
      y: camera.y * 0.48 + lakeSlideY,
      zoom: camera.zoom * 1.06,
      panoramicOverscale: true,
    },
    // Footer return plate
    {
      image: images.mountains,
      alpha: camera.opacity.footer,
      anchorX: 0.5,
      anchorY: 0.82,
      x: camera.x * 0.18,
      y: camera.y * 0.12 + 24 + mountainLift * 0.5,
      zoom: camera.zoom * 0.98,
      panoramicOverscale: true,
    },
  ];
}

/** Dedicated peaks overlay — top 34% band, always composited after volumetric clouds. */
function buildPeaksOverlaySpec(
  camera: CinematicCamera,
  images: CinematicImages,
  viewport: CinematicViewport
): LayerDrawSpec {
  const { height: vh } = viewport;
  const mountainLift = -vh * MOUNTAIN_LIFT_RATIO;

  return {
    image: images.mountains,
    alpha: camera.peaksOpacity,
    anchorX: 0.5,
    anchorY: 0.18,
    x: camera.x * 0.12,
    y: camera.y * 0.02 + mountainLift,
    zoom: camera.zoom * 1.02,
    panoramicOverscale: true,
    featherPeakBand: true,
  };
}

export function drawCinematicCanvas(
  ctx: CanvasRenderingContext2D,
  camera: CinematicCamera,
  images: CinematicImages,
  viewport: CinematicViewport
) {
  const { width, height } = viewport;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = camera.skyTint;
  ctx.fillRect(0, 0, width, height);

  const layers = buildLayerSpecs(camera, images, viewport);
  for (const layer of layers) {
    drawCoverLayer(ctx, layer, viewport);

    if (layer.featherBottom && layer.alpha > 0.001) {
      const hazeStrength = Math.max(
        camera.opacity.mountains,
        camera.opacity.kumtor * 0.65,
        camera.opacity.hpp * 0.5,
        camera.opacity.lake * 0.4
      );
      drawMountainSeamHaze(ctx, viewport, camera.skyTint, hazeStrength);
    }
  }

  // Volumetric cloud masks lower scenery during drone dives — peaks stay above
  drawVolumetricCloudLayer(ctx, viewport, camera);

  // Peaks overlay pass — absolute front of the background draw queue
  drawCoverLayer(ctx, buildPeaksOverlaySpec(camera, images, viewport), viewport);
}

export type CinematicCanvasRuntime = {
  camera: CinematicCamera;
  images: CinematicImages | null;
  viewport: CinematicViewport;
  render: () => void;
  resize: () => void;
  destroy: () => void;
};

export function initCinematicCanvas(
  canvas: HTMLCanvasElement,
  staticViewportHeight?: number | null
): CinematicCanvasRuntime {
  const camera = createCinematicCamera();
  let images: CinematicImages | null = null;
  let viewport = resizeCinematicCanvas(canvas, staticViewportHeight);

  const render = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx || !images) return;
    drawCinematicCanvas(ctx, camera, images, viewport);
  };

  const resize = () => {
    viewport = resizeCinematicCanvas(canvas, staticViewportHeight);
    render();
  };

  const onResize = () => resize();
  window.addEventListener("resize", onResize);

  preloadCinematicImages()
    .then((loaded) => {
      images = loaded;
      render();
    })
    .catch((error) => {
      console.error("Cinematic canvas preload failed", error);
    });

  return {
    camera,
    get images() {
      return images;
    },
    get viewport() {
      return viewport;
    },
    render,
    resize,
    destroy: () => {
      window.removeEventListener("resize", onResize);
    },
  };
}

export function animateCinematicCanvasScene(
  tl: SceneTimeline,
  camera: CinematicCamera,
  timings: SceneTimings,
  sz: (base: number) => number
) {
  const {
    statsExitT,
    exitDur,
    enterDur,
    atmoWipeDur,
    aboutEnterT,
    financeCloudsT,
    financeRevealT,
    financeExitT,
    sunsetAtmoT,
    sunsetRevealT,
    twilightAtmoT,
    twilightRevealT,
    midnightAtmoT,
    footerEnterT,
    footerHoldDur,
    lightCrossfadeDur,
    convergeDur,
  } = timings;

  const heroZoomEnd = statsExitT + exitDur;
  const decreeZoomEnd = aboutEnterT;
  const aboutPanEnd = financeCloudsT;
  const financeBeatEnd = sunsetAtmoT;
  const directionsBeatEnd = twilightAtmoT;
  const msbBeatEnd = midnightAtmoT;
  const spaceBeatEnd = footerEnterT;

  const financeDur = Math.max(0.001, financeBeatEnd - financeCloudsT);
  const directionsDur = Math.max(0.001, directionsBeatEnd - sunsetAtmoT);
  const msbDur = Math.max(0.001, msbBeatEnd - twilightAtmoT);
  const spaceDur = Math.max(0.001, spaceBeatEnd - midnightAtmoT);

  const crossfadeDur = Math.max(lightCrossfadeDur, atmoWipeDur * 0.85);
  const financeCloudCoverDur = enterDur + 0.022;
  const diveCloudExitDur = exitDur + 0.012;

  // sc_hero — breathe in (scrub-linear; pairs with brand dock power2.out)
  tl.to(camera, { zoom: 1.5, duration: heroZoomEnd, ease: "none" }, 0);

  // stats exit + decree breathe out — synced with counter typography exit
  tl.to(
    camera,
    {
      zoom: 1.0,
      duration: Math.max(0.001, decreeZoomEnd - statsExitT),
      ease: CINEMATIC_EXIT_EASE,
    },
    statsExitT
  );

  // sc_about — horizontal flight (same motion ease as typography)
  tl.to(
    camera,
    {
      x: -160,
      duration: Math.max(0.001, aboutPanEnd - aboutEnterT),
      ease: CINEMATIC_MOTION_EASE,
    },
    aboutEnterT
  );

  // sc_finance — Step C dive: cloud masks swap, Kumtor rises from bottom mist, peaks stay pinned
  tl.to(
    camera,
    { cloudProgress: 1, duration: financeCloudCoverDur, ease: "power2.inOut" },
    financeCloudsT
  );
  tl.to(
    camera,
    {
      y: 120,
      skyTint: "#e8eef8",
      duration: financeDur,
      ease: "power2.inOut",
    },
    financeCloudsT
  );
  tl.to(
    camera.layerSlide,
    { kumtor: 0, duration: financeDur, ease: "power2.out" },
    financeCloudsT
  );
  tl.to(
    camera.opacity,
    { kumtor: 1, duration: financeDur * 0.72, ease: "power1.inOut" },
    financeCloudsT
  );
  tl.to(
    camera.opacity,
    { mountains: 0.72, duration: financeDur * 0.55, ease: "power1.inOut" },
    financeCloudsT + financeDur * 0.08
  );
  tl.to(
    camera,
    { zoom: sz(1.1), duration: Math.max(0.001, financeExitT + exitDur - financeCloudsT), ease: "none" },
    financeCloudsT + financeDur * 0.2
  );
  tl.to(
    camera,
    { cloudProgress: 0, duration: exitDur, ease: "power2.inOut" },
    financeRevealT
  );

  // sc_directions — HPP crossfades over Kumtor beneath pinned peaks
  tl.to(
    camera,
    { cloudProgress: 1, duration: atmoWipeDur, ease: "power2.inOut" },
    sunsetAtmoT
  );
  tl.to(
    camera,
    {
      x: -80,
      skyTint: "#b85a20",
      duration: directionsDur,
      ease: "power1.inOut",
    },
    sunsetAtmoT
  );
  tl.to(
    camera.layerSlide,
    { hpp: 0, duration: directionsDur * 0.85, ease: "power2.out" },
    sunsetAtmoT
  );
  tl.to(
    camera.opacity,
    { hpp: 1, kumtor: 0, duration: crossfadeDur, ease: "power1.inOut" },
    sunsetAtmoT
  );
  tl.to(
    camera.opacity,
    { mountains: 0.68, duration: crossfadeDur, ease: "power1.inOut" },
    sunsetAtmoT
  );
  tl.to(
    camera,
    { skyTint: "#c46828", duration: directionsDur * 0.6, ease: "power1.inOut" },
    sunsetAtmoT + directionsDur * 0.15
  );
  tl.to(
    camera,
    { cloudProgress: 0, duration: diveCloudExitDur, ease: "power2.inOut" },
    sunsetRevealT
  );

  // sc_msb — lake twilight ascent beneath peaks
  tl.to(
    camera,
    { cloudProgress: 1, duration: atmoWipeDur, ease: "power2.inOut" },
    twilightAtmoT
  );
  tl.to(
    camera,
    {
      y: 220,
      zoom: sz(1.18),
      skyTint: "#141e38",
      duration: msbDur,
      ease: "power2.inOut",
    },
    twilightAtmoT
  );
  tl.to(
    camera.layerSlide,
    { lake: 0, duration: msbDur * 0.88, ease: "power2.out" },
    twilightAtmoT
  );
  tl.to(
    camera.opacity,
    { lake: 1, hpp: 0, duration: crossfadeDur, ease: "power1.inOut" },
    twilightAtmoT
  );
  tl.to(
    camera.opacity,
    { mountains: 0.62, duration: crossfadeDur, ease: "power1.inOut" },
    twilightAtmoT
  );
  tl.to(
    camera,
    { skyTint: "#1a2848", duration: convergeDur, ease: "power1.inOut" },
    twilightAtmoT + msbDur * 0.2
  );
  tl.to(
    camera,
    { cloudProgress: 0, duration: diveCloudExitDur, ease: "power2.inOut" },
    twilightRevealT
  );

  // sc_partners / sc_news / sc_contacts — hyper-zoom + living starfield drift
  tl.to(
    camera.opacity,
    { space: 1, lake: 0, duration: crossfadeDur, ease: CINEMATIC_MOTION_EASE },
    midnightAtmoT
  );
  tl.to(
    camera.opacity,
    { mountains: 0, duration: crossfadeDur * 1.2, ease: CINEMATIC_MOTION_EASE },
    midnightAtmoT + crossfadeDur * 0.15
  );
  tl.to(
    camera,
    { peaksOpacity: 0, duration: crossfadeDur * 1.2, ease: CINEMATIC_MOTION_EASE },
    midnightAtmoT + crossfadeDur * 0.15
  );
  tl.to(
    camera,
    {
      zoom: 3.6,
      y: 0,
      x: 0,
      skyTint: "#06080c",
      duration: spaceDur,
      ease: CINEMATIC_EXIT_EASE,
    },
    midnightAtmoT
  );
  tl.to(
    camera.spaceDrift,
    {
      scale: 1.05,
      x: -28,
      y: 14,
      duration: spaceDur,
      ease: "none",
    },
    midnightAtmoT
  );

  // Footer — return home
  tl.to(
    camera.opacity,
    { space: 0, footer: 1, kumtor: 0, hpp: 0, lake: 0, duration: enterDur * 1.4, ease: "power2.inOut" },
    footerEnterT
  );
  tl.to(
    camera,
    {
      zoom: 1.0,
      x: 0,
      y: 36,
      peaksOpacity: 0,
      skyTint: "#0a1520",
      duration: footerHoldDur + enterDur,
      ease: CINEMATIC_MOTION_EASE,
    },
    footerEnterT
  );
  tl.to(
    camera.spaceDrift,
    { scale: 1, x: 0, y: 0, duration: enterDur, ease: CINEMATIC_ENTER_EASE },
    footerEnterT
  );
  tl.to(
    camera.layerSlide,
    { kumtor: 1, hpp: 1, lake: 1, duration: enterDur, ease: "power2.in" },
    footerEnterT
  );
}
