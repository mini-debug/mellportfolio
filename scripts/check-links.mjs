/**
 * Reference integrity check.
 *
 * The previous site shipped two broken <img> references because nothing
 * validated them. This makes that class of bug impossible to miss.
 *
 * Verifies:
 *   1. every media key used in the data files exists in media.json
 *   2. every file listed in media.json exists on disk in public/media
 *   3. every video path referenced in the data files exists on disk
 *   4. reports unused media (dead weight)
 *
 *   node scripts/check-links.mjs
 */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');

const manifest = JSON.parse(
  await readFile(path.join(ROOT, 'src', 'data', 'media.json'), 'utf8')
);

// Import the data modules directly so the check runs against real values.
// pathToFileURL: import() rejects bare Windows paths like C:\...
const dataModule = (name) => import(pathToFileURL(path.join(ROOT, 'src', 'data', name)).href);
const { projects } = await dataModule('projects.js');
const { artworks } = await dataModule('art.js');
const { experience } = await dataModule('about.js');

const errors = [];
const used = new Set();

function useMedia(key, where) {
  if (!key) return;
  used.add(key);
  if (!manifest[key]) {
    errors.push(`${where}: media key "${key}" is not in media.json`);
  }
}

function useVideo(src, where) {
  if (!src) return;
  const onDisk = path.join(PUBLIC, src.replace(/^\//, ''));
  if (!existsSync(onDisk)) {
    errors.push(`${where}: video "${src}" not found at public${src}`);
  }
}

/* --- 1. data -> manifest ------------------------------------------------- */
for (const p of projects) {
  useMedia(p.hero, `project "${p.id}" hero`);
  for (const g of p.gallery ?? []) {
    if (g.video) {
      useVideo(g.video, `project "${p.id}" gallery`);
      useMedia(g.poster, `project "${p.id}" gallery poster`);
    } else {
      useMedia(g.media, `project "${p.id}" gallery`);
    }
  }
}

for (const a of artworks) useMedia(a.media, `artwork "${a.id}"`);

for (const e of experience) {
  useMedia(e.media, `experience "${e.id}"`);
  for (const g of e.gallery ?? []) useMedia(g.media, `experience "${e.id}" gallery`);
}

// Referenced directly in JSX rather than via data.
useMedia('pfp', 'About page portrait');

/* --- 2. manifest -> disk ------------------------------------------------- */
for (const [key, entry] of Object.entries(manifest)) {
  for (const fmt of Object.keys(entry.sources)) {
    for (const s of entry.sources[fmt]) {
      if (!existsSync(path.join(PUBLIC, s.src.replace(/^\//, '')))) {
        errors.push(`manifest "${key}": missing file public${s.src}`);
      }
    }
  }
}

/* --- 3. alt text --------------------------------------------------------- */
for (const p of projects) {
  for (const g of p.gallery ?? []) {
    if (!g.video && !g.alt && !g.caption) {
      errors.push(`project "${p.id}": gallery image "${g.media}" has no alt or caption`);
    }
  }
}
for (const a of artworks) {
  if (!a.alt) errors.push(`artwork "${a.id}": missing alt text`);
}

/* --- 4. report ----------------------------------------------------------- */
const unused = Object.keys(manifest).filter((k) => !used.has(k));

console.log(`checked ${Object.keys(manifest).length} media entries\n`);

if (unused.length) {
  console.log('unused media (safe to remove from media-source/):');
  for (const u of unused) console.log(`  - ${u}`);
  console.log('');
}

if (errors.length) {
  console.log(`${errors.length} PROBLEM(S):`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  process.exit(1);
}

console.log('✓ all media references resolve');
console.log('✓ all manifest files exist on disk');
console.log('✓ all gallery images have alt text or captions');
