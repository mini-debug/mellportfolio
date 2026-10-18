import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import RouteFallback from './components/RouteFallback';

/**
 * Routing.
 *
 * Home is bundled eagerly because it is the most common entry point. Every
 * other route is code-split, so a visitor who never opens the art archive
 * never downloads it. Route chunks are emitted automatically by Vite.
 */
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Socials = lazy(() => import('./pages/Socials'));
const ArtArchive = lazy(() => import('./pages/ArtArchive'));
const NotFound = lazy(() => import('./pages/NotFound'));

const withSuspense = (element) => (
  <Suspense fallback={<RouteFallback />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: withSuspense(<NotFound />),
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: withSuspense(<About />) },
      { path: 'projects', element: withSuspense(<Projects />) },
      { path: 'projects/:projectId', element: withSuspense(<ProjectDetail />) },
      { path: 'socials', element: withSuspense(<Socials />) },
      { path: 'art', element: withSuspense(<ArtArchive />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
], {
  // GitHub Pages serves the site from /mellportfolio/, so routes must be
  // matched relative to the deployment base, not the domain root.
  basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/',
});

export default function App() {
  return <RouterProvider router={router} />;
}
