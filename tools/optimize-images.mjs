#!/usr/bin/env node
/**
 * Batch-optimize heavy public images (>300KB class) to WebP/AVIF.
 * Usage: node scripts/optimize-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

async function writeWebpAvif(input, outBase, { width, quality = 72, avifQuality = 45 } = {}) {
  const img = sharp(input, { failOn: "none" });
  const pipeline = width ? img.resize({ width, withoutEnlargement: true }) : img;
  const webpPath = `${outBase}.webp`;
  const avifPath = `${outBase}.avif`;
  await pipeline.clone().webp({ quality, effort: 4 }).toFile(webpPath);
  await pipeline.clone().avif({ quality: avifQuality, effort: 4 }).toFile(avifPath);
  const [wStat, aStat, inStat] = await Promise.all([
    fs.stat(webpPath),
    fs.stat(avifPath),
    fs.stat(input),
  ]);
  console.log(
    `${path.basename(input)} ${Math.round(inStat.size / 1024)}KB -> webp ${Math.round(wStat.size / 1024)}KB, avif ${Math.round(aStat.size / 1024)}KB (${width || "orig"}w)`
  );
}

const panoSrc = "public/images/горы-панорама.jpeg";
await writeWebpAvif(panoSrc, "public/images/горы-панорама-1920", { width: 1920, quality: 72, avifQuality: 48 });
await writeWebpAvif(panoSrc, "public/images/горы-панорама-1280", { width: 1280, quality: 70, avifQuality: 45 });

const iconDir = "public/icons/perspective/Иконки Перпективные направления";
const iconMap = [
  ["Промышленность и переработка.png", "industry"],
  ["Транспорт и логистика.png", "transport"],
  ["Энергетика и инфраструктура.png", "energy"],
  ["Туризм.png", "tourism"],
  ["Образование.png", "education"],
  ["Здравоохранение.png", "health"],
];
const outIconDir = "public/icons/perspective/optimized";
await fs.mkdir(outIconDir, { recursive: true });
for (const [file, slug] of iconMap) {
  await writeWebpAvif(path.join(iconDir, file), path.join(outIconDir, slug), {
    width: 256,
    quality: 80,
    avifQuality: 50,
  });
}

for (const file of ["coinvest.png", "joint-venture.png", "equity.png", "support.png"]) {
  const input = path.join("public/icons/finance", file);
  const base = path.join("public/icons/finance", path.basename(file, path.extname(file)));
  await writeWebpAvif(input, base, { width: 256, quality: 80, avifQuality: 50 });
}

const aboutDir = "public/images/about";
for (const file of await fs.readdir(aboutDir)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const input = path.join(aboutDir, file);
  const base = path.join(aboutDir, path.basename(file, path.extname(file)));
  await writeWebpAvif(input, base, { width: 800, quality: 75, avifQuality: 48 });
}

console.log("DONE");
