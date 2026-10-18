import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * GitHub Pages serves *project* sites from a subpath. Set BASE_PATH in CI
 * (the deploy workflow does this automatically) or leave it unset for a
 * custom domain / user site.
 *
 *   BASE_PATH=/mellportfolio/ npm run build
 */
const base = process.env.BASE_PATH || '/';

/**
 * GitHub Pages has no SPA rewrite rule, so a direct hit on /projects/gurt
 * would 404. Serving the same shell as 404.html lets the client router take
 * over and resolve the route.
 *
 * Note: the response still carries a 404 status. If SEO on deep links matters,
 * deploy to a host with real rewrites (Cloudflare Pages, Netlify) instead.
 */
function spaFallback() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const out = resolve(__dirname, 'dist');
      try {
        copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'));
      } catch {
        /* build may have a custom outDir */
      }
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), spaFallback()],

  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // Surface regressions early rather than silently shipping a heavy bundle.
    chunkSizeWarningLimit: 200,
    rollupOptions: {
      output: {
        // React in its own long-cached chunk. Route chunks are emitted
        // automatically by React.lazy() in src/App.jsx.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },

  server: { port: 5173, open: true },
});
