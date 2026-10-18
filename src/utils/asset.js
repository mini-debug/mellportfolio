/**
 * Resolve a public-directory path against the deployment base.
 *
 * GitHub Pages *project* sites are served from a subpath
 * (e.g. https://mini-debug.github.io/mellportfolio/), so absolute paths like
 * "/media/foo.avif" would 404. Vite exposes the configured base as
 * import.meta.env.BASE_URL — always route public asset URLs through here
 * rather than hardcoding a leading slash.
 *
 *   asset('/media/gurt-720.mp4')  ->  '/mellportfolio/media/gurt-720.mp4'
 */
export function asset(p) {
  if (!p) return p;
  if (/^(https?:|data:|blob:)/.test(p)) return p;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;
}
