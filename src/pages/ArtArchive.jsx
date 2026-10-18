import { artworks, artNeeds } from '../data/art';
import Img from '../components/Img';
import Reveal from '../components/Reveal';
import NeedsNote from '../components/NeedsNote';
import Seo from '../components/Seo';
import styles from './ArtArchive.module.css';

/**
 * Art archive.
 *
 * Presented as a catalogue rather than as a sixth engineering project: plate
 * numbers, lavender accent, generous plate sizing and no "explore" affordance.
 * Still the same tokens, type and border language as the rest of the site.
 */
export default function ArtArchive() {
  return (
    <div className={`page ${styles.page}`}>
      <Seo
        title="Art Archive"
        description="Paintings and sculpture by Mellanie Rodriguez — an archive of work made alongside the engineering."
      />

      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            Archive
            <span className={styles.count}>
              {String(artworks.length).padStart(2, '0')} plates
            </span>
          </p>
          <h1 className={styles.title}>Art</h1>
          <p className={styles.intro}>
            Painting and sculpture are not a side note to the engineering — they
            are the same instinct pointed at a different material. This is an
            archive rather than a portfolio: no case studies, just the work.
          </p>
        </header>
      </div>

      <div className={styles.plates}>
        {artworks.map((work, i) => (
          <Reveal key={work.id} className={styles.plateWrap}>
            <figure className={styles.plate}>
              <div className={styles.plateMedia}>
                <Img
                  name={work.media}
                  alt={work.alt}
                  priority={i === 0}
                  className={styles.plateImg}
                  sizes="(min-width: 1100px) 1000px, 94vw"
                />
              </div>

              <figcaption className={styles.caption}>
                <span className={styles.plateNo} aria-hidden="true">
                  PL. {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.captionMain}>
                  <span className={styles.workTitle}>{work.title}</span>
                  {(work.medium || work.year) && (
                    <span className={styles.workMeta}>
                      {[work.medium, work.year].filter(Boolean).join(' · ')}
                    </span>
                  )}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="container">
        <NeedsNote items={artNeeds} title="Art archive — needs from you" />
      </div>
    </div>
  );
}
