import styles from './NeedsNote.module.css';

/**
 * Surfaces outstanding content questions from the data files.
 *
 * Visible during `npm run dev` only — it is compiled out of production builds
 * by the `import.meta.env.DEV` guard, so visitors never see it. The point is
 * that missing information stays visible to Mellanie while she works instead of
 * being quietly forgotten or, worse, invented.
 */
export default function NeedsNote({ items, title = 'Needs from you' }) {
  if (!import.meta.env.DEV) return null;
  if (!items?.length) return null;

  return (
    <aside className={styles.note} aria-label={title}>
      <p className={styles.title}>
        <span className={styles.dot} aria-hidden="true" />
        {title}
        <span className={styles.devOnly}>dev only</span>
      </p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
