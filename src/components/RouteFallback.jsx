import styles from './RouteFallback.module.css';

/**
 * Shown while a lazy route chunk loads.
 *
 * Intentionally minimal and delayed by CSS: on a fast connection the chunk
 * arrives before the indicator becomes visible, so users do not see a flash of
 * loading state on every navigation.
 */
export default function RouteFallback() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.bar} aria-hidden="true" />
      <span className="visually-hidden">Loading</span>
    </div>
  );
}
