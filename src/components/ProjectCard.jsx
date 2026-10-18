import { Link } from 'react-router-dom';
import Img from './Img';
import styles from './ProjectCard.module.css';

/**
 * Project card.
 *
 * Deliberately concise: image, index, category, title, one-line tagline,
 * discipline chips, and a single clear affordance. Long-form engineering
 * detail belongs on the project route, never here.
 *
 * The whole card is a single <Link>, so there is exactly one tab stop and one
 * click target. The "Explore" row is styled text inside that link, not a
 * nested button — nesting interactive elements is invalid and produces
 * duplicate tab stops.
 */
export default function ProjectCard({ project, index, priority = false }) {
  const { id, title, category, tagline, technologies, hero, status } = project;
  const isPlaceholder = status === 'placeholder';

  return (
    <article className={styles.wrap}>
      <Link
        to={`/projects/${id}`}
        className={`${styles.card} ${isPlaceholder ? styles.placeholder : ''}`}
        aria-label={`${title} — ${category}`}
      >
        {/* Corner registration ticks */}
        <span className={styles.tick} data-corner="tl" aria-hidden="true" />
        <span className={styles.tick} data-corner="tr" aria-hidden="true" />
        <span className={styles.tick} data-corner="bl" aria-hidden="true" />
        <span className={styles.tick} data-corner="br" aria-hidden="true" />

        <div className={styles.media}>
          {hero ? (
            <Img
              name={hero}
              alt=""
              priority={priority}
              className={styles.img}
              sizes="(min-width: 1100px) 34vw, (min-width: 700px) 46vw, 92vw"
            />
          ) : (
            <div className={styles.mediaEmpty} aria-hidden="true">
              <svg viewBox="0 0 120 90" className={styles.schematic}>
                <defs>
                  <pattern id={`grid-${id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M10 0H0V10" fill="none" stroke="currentColor" strokeWidth="0.4" />
                  </pattern>
                </defs>
                <rect width="120" height="90" fill={`url(#grid-${id})`} opacity="0.55" />
                <rect x="34" y="28" width="52" height="34" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" />
                <circle cx="60" cy="45" r="3" fill="currentColor" />
              </svg>
            </div>
          )}

          <span className={styles.index} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>

          {isPlaceholder && <span className={styles.badge}>In progress</span>}
        </div>

        <div className={styles.body}>
          <p className={styles.category}>{category}</p>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.tagline}>{tagline}</p>

          {technologies.length > 0 && (
            <ul className={styles.chips}>
              {technologies.slice(0, 4).map((tech) => (
                <li key={tech} className={styles.chip}>
                  {tech}
                </li>
              ))}
            </ul>
          )}

          <span className={styles.cta}>
            {isPlaceholder ? 'Coming soon' : 'Explore'}
            <svg className={styles.arrow} viewBox="0 0 24 12" aria-hidden="true">
              <path d="M0 6h21M16 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
