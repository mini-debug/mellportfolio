import { Link } from 'react-router-dom';
import { socials } from '../data/socials';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.sig}>
            Mellanie Rodriguez
            <span className={styles.dim}> — built and designed by me</span>
          </p>
          <p className={styles.meta}>
            <span aria-hidden="true">© </span>
            {year}
          </p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          <Link to="/projects" className={styles.link}>Projects</Link>
          <Link to="/about" className={styles.link}>About</Link>
          <Link to="/art" className={styles.link}>Art</Link>
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              className={styles.link}
              {...(s.icon !== 'mail'
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
