import Button from '../components/Button';
import Seo from '../components/Seo';
import styles from './Home.module.css';

/**
 * Homepage.
 *
 * Deliberately short: a statement, three routes out, and nothing else. No
 * biography, no project descriptions, no gallery — those live on their own
 * routes so the homepage stays fast and the visitor chooses where to go.
 */
export default function Home() {
  return (
    <>
      <Seo
        title="Mellanie Rodriguez — EECS × Design × Robotics"
        description="MIT EECS and Design student building physical things across electronics, robotics, software, manufacturing and design."
      />

      <section className={styles.hero}>
        <div className={`container ${styles.inner}`}>
          <p className={styles.kicker}>
            <span className={styles.kickerMark} aria-hidden="true" />
            MELLANIE <span className={styles.dim}>/ 29</span>
          </p>

          <h1 className={styles.title}>
            <span className={styles.titleLine}>I BUILD</span>
            <span className={styles.titleLine}>
              THINGS THAT{' '}
              <em className={styles.em}>
                <span className="visually-hidden">MOVE.</span>
                {/* Letters animate individually; screen readers get the word above. */}
                {'MOVE.'.split('').map((ch, i) => (
                  <span key={i} className={styles.moveLetter} style={{ '--i': i }} aria-hidden="true">
                    {ch}
                  </span>
                ))}
              </em>
            </span>
          </h1>

          <p className={styles.disciplines} aria-label="Disciplines">
            <span>EECS</span>
            <span className={styles.sep} aria-hidden="true">×</span>
            <span>DESIGN</span>
            <span className={styles.sep} aria-hidden="true">×</span>
            <span>ROBOTICS</span>
          </p>

          <p className={styles.statement}>
            Electronics, robotics, software, manufacturing and design — usually
            at the same time. I care about the point where a circuit, a
            fabrication method and a visual decision all have to agree.
          </p>

          <div className={styles.actions}>
            <Button to="/projects" variant="primary" arrow>
              Explore projects
            </Button>
            <Button to="/about">About</Button>
            <Button to="/socials">Socials</Button>
          </div>
        </div>

        {/* Decorative baseline readout — a small graphical detail, not content. */}
        <div className={styles.readout} aria-hidden="true">
          <span>SYS / PORTFOLIO</span>
          <span className={styles.readoutLine} />
          <span>MIT — CAMBRIDGE, MA</span>
        </div>
      </section>
    </>
  );
}
