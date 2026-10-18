import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navigation from './Navigation';
import Starfield from './Starfield';
import Footer from './Footer';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Starfield />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.shell}>
        <Navigation />
        <main id="main" className={styles.main} tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Restores scroll position on back/forward, resets to top on new routes. */}
      <ScrollRestoration />
    </>
  );
}
