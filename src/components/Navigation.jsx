import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/art', label: 'Art' },
  { to: '/socials', label: 'Socials' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();

  // Close the mobile panel on navigation.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Escape closes and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;

    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    function onPointerDown(e) {
      if (
        !panelRef.current?.contains(e.target) &&
        !toggleRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand} aria-label="Mellanie Rodriguez — home">
          <span className={styles.brandMark} aria-hidden="true" />
          <span className={styles.brandText}>
            MELLANIE<span className={styles.brandDim}>&nbsp;/&nbsp;RODRIGUEZ</span>
          </span>
        </NavLink>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.list}>
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.toggleLabel}>{open ? 'Close' : 'Menu'}</span>
          <span className={`${styles.toggleIcon} ${open ? styles.toggleIconOpen : ''}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        ref={panelRef}
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ''}`}
        aria-label="Primary"
        // Keep links out of the tab order while the panel is collapsed.
        // React 19 supports `inert` as a real boolean attribute.
        inert={!open}
      >
        <ul className={styles.mobileList}>
          {LINKS.map((link, i) => (
            <li key={link.to} style={{ '--i': i }}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ''}`
                }
              >
                <span className={styles.mobileIndex}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
