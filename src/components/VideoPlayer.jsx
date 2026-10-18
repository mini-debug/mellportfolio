import { useState } from 'react';
import Img from './Img';
import { asset } from '../utils/asset';
import styles from './VideoPlayer.module.css';

/**
 * Click-to-load video.
 *
 * Renders only a poster image until the user presses play. No <video> element
 * exists in the DOM before that, so zero video bytes are fetched — the browser
 * cannot even request metadata. This is what keeps a 9 MB clip off the critical
 * path for visitors who never watch it.
 */
export default function VideoPlayer({ src, poster, caption, label = 'Play video' }) {
  const [active, setActive] = useState(false);

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        {active ? (
          <video
            className={styles.video}
            src={asset(src)}
            controls
            autoPlay
            playsInline
            preload="auto"
          />
        ) : (
          <button type="button" className={styles.poster} onClick={() => setActive(true)}>
            {poster && (
              <Img
                name={poster}
                alt=""
                className={styles.posterImg}
                sizes="(min-width: 900px) 800px, 92vw"
              />
            )}
            <span className={styles.playRing} aria-hidden="true">
              <svg viewBox="0 0 24 24" className={styles.playIcon}>
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
            <span className={styles.playLabel}>{label}</span>
          </button>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
