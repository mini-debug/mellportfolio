/**
 * Offline smoke test.
 *
 * The npm registry is unavailable in this environment, so vite / react-router
 * cannot be installed and a real build cannot be run. This harness gets as
 * close as possible: it transpiles every page and component, stubs the router
 * and CSS-module imports, and server-renders each route.
 *
 * It catches: syntax errors, bad imports, undefined data references, bad hook
 * usage, and crashes on render. It does NOT verify styling, routing behaviour,
 * or the production bundle — run `npm install && npm run build` for that.
 *
 *   node scripts/smoke-test.mjs
 */
import { mkdir, readdir, readFile, writeFile, rm, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WORK = path.join(ROOT, '.smoke');
const TSX = '/home/claude/.npm-global/bin/tsx';

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else out.push(p);
  }
  return out;
}

async function main() {
  await rm(WORK, { recursive: true, force: true });
  await mkdir(WORK, { recursive: true });

  // --- Copy src, renaming .jsx -> .tsx (tsx only applies the automatic JSX
  //     runtime to .tsx files) and neutralising CSS-module imports. ----------
  const files = await walk(path.join(ROOT, 'src'));
  for (const file of files) {
    const rel = path.relative(path.join(ROOT, 'src'), file);
    const dest = path.join(WORK, 'src', rel.replace(/\.jsx$/, '.tsx'));
    await mkdir(path.dirname(dest), { recursive: true });

    if (/\.(jsx|js)$/.test(file)) {
      let code = await readFile(file, 'utf8');
      // CSS modules -> Proxy returning the key name, so className strings work.
      code = code.replace(
        /import\s+(\w+)\s+from\s+'([^']+\.module\.css)';?/g,
        "const $1 = new Proxy({}, { get: (_, k) => String(k) });"
      );
      code = code.replace(/import\s+'[^']+\.css';?/g, '');
      // Local .jsx imports must resolve to the renamed .tsx files.
      code = code.replace(
        /from\s+'(\.[^']*?)'/g,
        (m, spec) => (/\.(css|json)$/.test(spec) ? m : `from '${spec}'`)
      );
      // import.meta.env is a Vite feature.
      code = code.replace(/import\.meta\.env\.DEV/g, 'false');
      code = code.replace(/import\.meta\.env\.BASE_URL/g, "'/'");
      await writeFile(dest, code);
    } else {
      await cp(file, dest);
    }
  }

  // --- Stub react-router-dom ------------------------------------------------
  const stub = path.join(WORK, 'node_modules', 'react-router-dom');
  await mkdir(stub, { recursive: true });
  await writeFile(
    path.join(stub, 'package.json'),
    JSON.stringify({ name: 'react-router-dom', version: '0.0.0', main: 'index.js', type: 'module' })
  );
  await writeFile(
    path.join(stub, 'index.js'),
    `import React from 'react';
const el = (tag, props, children) => React.createElement(tag, props, children);
let params = {};
export const __setParams = (p) => { params = p; };
export const Link = ({ to, children, ...r }) => el('a', { href: String(to), ...r }, children);
export const NavLink = ({ to, children, className, end, ...r }) => el('a', {
  href: String(to),
  className: typeof className === 'function' ? className({ isActive: false }) : className,
  ...r,
}, typeof children === 'function' ? children({ isActive: false }) : children);
export const Navigate = () => el('div', { 'data-navigate': 'true' });
export const Outlet = () => el('div', { 'data-outlet': 'true' });
export const ScrollRestoration = () => null;
export const RouterProvider = () => null;
export const createBrowserRouter = (r) => r;
export const useParams = () => params;
export const useLocation = () => ({ pathname: '/' });
export default { __setParams, Link, NavLink, Navigate, Outlet, ScrollRestoration, RouterProvider, createBrowserRouter, useParams, useLocation };`
  );

  // Link real node_modules for react / react-dom.
  await writeFile(
    path.join(WORK, 'package.json'),
    JSON.stringify({ name: 'smoke', type: 'module' }, null, 2)
  );
  await writeFile(
    path.join(WORK, 'tsconfig.json'),
    JSON.stringify({ compilerOptions: { jsx: 'react-jsx', module: 'esnext', target: 'es2022', moduleResolution: 'bundler', allowJs: true } }, null, 2)
  );

  // --- Runner ---------------------------------------------------------------
  const routes = [
    ['Home', './src/pages/Home.tsx', {}],
    ['About', './src/pages/About.tsx', {}],
    ['Projects', './src/pages/Projects.tsx', {}],
    ['Socials', './src/pages/Socials.tsx', {}],
    ['ArtArchive', './src/pages/ArtArchive.tsx', {}],
    ['NotFound', './src/pages/NotFound.tsx', {}],
    ['Navigation', './src/components/Navigation.tsx', {}],
    ['Footer', './src/components/Footer.tsx', {}],
  ];

  const runner = `
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import rr from 'react-router-dom';
import { projects } from './src/data/projects.js';

const results = [];
function run(name, Comp, props) {
  try {
    const html = renderToString(createElement(Comp, props));
    results.push({ name, ok: true, len: html.length });
  } catch (e) {
    results.push({ name, ok: false, err: e.message });
  }
}

${routes.map(([n, p]) => `import ${n} from '${p}';`).join('\n')}
import ProjectDetail from './src/pages/ProjectDetail.tsx';

${routes.map(([n]) => `run('${n}', ${n}, {});`).join('\n')}

for (const p of projects) {
  rr.__setParams({ projectId: p.id });
  run('ProjectDetail:' + p.id, ProjectDetail, {});
}

rr.__setParams({ projectId: 'does-not-exist' });
run('ProjectDetail:404-guard', ProjectDetail, {});

let fail = 0;
for (const r of results) {
  if (r.ok) console.log('  PASS  ' + r.name.padEnd(34) + r.len + ' bytes');
  else { fail++; console.log('  FAIL  ' + r.name.padEnd(34) + r.err); }
}
console.log('\\n' + (fail ? fail + ' FAILED' : 'all ' + results.length + ' render checks passed'));
process.exit(fail ? 1 : 0);
`;
  await writeFile(path.join(WORK, 'run.tsx'), runner);

  execFileSync(TSX, ['run.tsx'], { cwd: WORK, stdio: 'inherit' });
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
