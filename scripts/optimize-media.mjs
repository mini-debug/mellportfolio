/**
 * Media optimisation pipeline.
 *
 * Reads masters from /media-source and emits responsive derivatives into
 * /public/media, plus a manifest (src/data/media.json) consumed by <Img>.
 *
 * Masters are never shipped. Only derivatives are served.
 *
 *   node scripts/optimize-media.mjs          # incremental (skips up-to-date)
 *   node scripts/optimize-media.mjs --force  # rebuild everything
 */
import sharp from 'sharp';
import { readdir, readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(ROOT, 'media-source');
const OUT_DIR = path.join(ROOT, 'public', 'media');
const MANIFEST = path.join(ROOT, 'src', 'data', 'media.json');

const FORCE = process.argv.includes('--force');

/** Emitted widths. 400 = card thumb, 800 = tablet/gallery, 1600 = full detail view. */
const WIDTHS = [400, 800, 1600];

const FORMATS = [
  { ext: 'avif', options: { quality: 55, effort: 6 } },
  { ext: 'webp', options: { quality: 72, effort: 5 } },
  { ext: 'jpg', options: { quality: 76, mozjpeg: true } },
];

const IMAGE_RE = /\.(jpe?g|png)$/i;

/** Tiny blurred placeholder inlined into the manifest as a data URI. */
async function makeLqip(input) {
  const buf = await sharp(input)
    .resize(20, null, { withoutEnlargement: true })
    .blur(1.2)
    .webp({ quality: 30 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

async function isStale(srcPath, outPath) {
  if (FORCE || !existsSync(outPath)) return true;
  const [a, b] = await Promise.all([stat(srcPath), stat(outPath)]);
  return a.mtimeMs > b.mtimeMs;
}

async function processImage(file) {
  const srcPath = path.join(SRC_DIR, file);
  const slug = file.replace(IMAGE_RE, '');
  const image = sharp(srcPath);
  const meta = await image.metadata();

  const entry = {
    width: meta.width,
    height: meta.height,
    aspect: +(meta.width / meta.height).toFixed(4),
    lqip: await makeLqip(srcPath),
    sources: {},
  };

  let written = 0;
  let bytes = 0;

  for (const { ext, options } of FORMATS) {
    entry.sources[ext] = [];
    for (const w of WIDTHS) {
      // Never upscale past the master's native width.
      if (w > meta.width && entry.sources[ext].length) continue;
      const target = Math.min(w, meta.width);
      const name = `${slug}-${target}.${ext}`;
      const outPath = path.join(OUT_DIR, name);

      if (await isStale(srcPath, outPath)) {
        await sharp(srcPath)
          .resize(target, null, { withoutEnlargement: true })
          .toFormat(ext === 'jpg' ? 'jpeg' : ext, options)
          .toFile(outPath);
        written++;
      }
      bytes += (await stat(outPath)).size;
      entry.sources[ext].push({ w: target, src: `/media/${name}` });
    }
  }

  const originalBytes = (await stat(srcPath)).size;
  return { slug, entry, written, bytes, originalBytes };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(path.dirname(MANIFEST), { recursive: true });

  const files = (await readdir(SRC_DIR)).filter((f) => IMAGE_RE.test(f));
  // Keep entries whose masters are not in media-source (their derivatives in
  // public/media are the only copies). Rebuilding from scratch would drop them.
  const manifest = existsSync(MANIFEST)
    ? JSON.parse(await readFile(MANIFEST, 'utf8'))
    : {};
  let totalOriginal = 0;
  let totalOut = 0;
  let totalWritten = 0;

  for (const file of files) {
    const { slug, entry, written, bytes, originalBytes } = await processImage(file);
    manifest[slug] = entry;
    totalOriginal += originalBytes;
    totalOut += bytes;
    totalWritten += written;

    const smallest = entry.sources.avif[0];
    const smallestSize = existsSync(path.join(ROOT, 'public', smallest.src))
      ? (await stat(path.join(ROOT, 'public', smallest.src))).size
      : 0;
    console.log(
      `${slug.padEnd(22)} ${(originalBytes / 1e6).toFixed(1).padStart(5)}MB  ->  ` +
        `${String(Math.round(smallestSize / 1024)).padStart(4)}KB @${smallest.w}px avif` +
        `${written ? '' : '  (cached)'}`
    );
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');

  console.log('\n' + '-'.repeat(58));
  console.log(`images        ${files.length}`);
  console.log(`files written ${totalWritten}`);
  console.log(`masters       ${(totalOriginal / 1e6).toFixed(1)} MB`);
  console.log(`derivatives   ${(totalOut / 1e6).toFixed(1)} MB (all widths, all formats)`);
  console.log(`manifest      ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
