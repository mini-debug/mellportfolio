import Img from './Img';
import VideoPlayer from './VideoPlayer';
import Reveal from './Reveal';
import styles from './Gallery.module.css';

/**
 * Project gallery.
 *
 * A plain responsive figure list rather than a carousel. Every image is
 * reachable by scrolling, nothing is hidden behind controls, it works without
 * JavaScript, and images below the fold are lazy-loaded by <Img> — so opening a
 * project does not download the whole gallery at once.
 */
export default function Gallery({ items, heading = 'Gallery', id = 'gallery' }) {
  if (!items?.length) return null;

  return (
    <section className={styles.section} aria-labelledby={id}>
      <h2 id={id} className={styles.heading}>
        {heading}
      </h2>

      <div className={styles.list}>
        {items.map((item, i) =>
          item.video ? (
            <Reveal key={item.video} delay={Math.min(i * 50, 200)}>
              <VideoPlayer
                src={item.video}
                poster={item.poster}
                caption={item.caption}
              />
            </Reveal>
          ) : (
            <Reveal key={item.media} delay={Math.min(i * 50, 200)}>
              <figure className={styles.figure}>
                <Img
                  name={item.media}
                  alt={item.alt ?? item.caption ?? ''}
                  className={styles.img}
                  sizes="(min-width: 900px) 820px, 92vw"
                />
                {item.caption && (
                  <figcaption className={styles.caption}>{item.caption}</figcaption>
                )}
              </figure>
            </Reveal>
          )
        )}
      </div>
    </section>
  );
}
