import { bio, experience } from '../data/about';
import { Link } from 'react-router-dom';
import Img from '../components/Img';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import NeedsNote from '../components/NeedsNote';
import Seo from '../components/Seo';
import { asset } from '../utils/asset';
import styles from './About.module.css';

export default function About() {
  return (
    <div className="page">
      <Seo
        title="About"
        description="Mellanie Rodriguez studies EECS and Design at MIT, working across electronics, robotics, embedded systems, fabrication and art."
      />

      <div className="container">
        <header className="page__header">
          <p className="eyebrow">Who I am</p>
          <h1 className="page__title">About</h1>
        </header>

        <div className={styles.top}>
          <div className={styles.intro}>
            <p className={styles.lede}>{bio.lede}</p>
            <div className="prose">
              {bio.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <figure className={styles.portraitWrap}>
            <Img
              name="pfp"
              alt="Portrait of Mellanie Rodriguez"
              priority
              className={styles.portrait}
              sizes="(min-width: 900px) 320px, 60vw"
            />
            <figcaption className={styles.portraitMeta}>
              <span>{bio.name}</span>
              <span className={styles.dim}>
                {bio.school} — {bio.course}
              </span>
            </figcaption>
          </figure>
        </div>

        {/* --- Skills --- */}
        <section className={styles.interests} aria-labelledby="skills">
          <h2 id="skills" className={styles.h2}>
            Technical skills
          </h2>
          <div className={styles.skillCols}>
            {bio.skills.map((group) => (
              <div key={group.label}>
                <h3 className={styles.interestTitle}>{group.label}</h3>
                <ul className={styles.interestList}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- Interests --- */}
        <section className={styles.interests} aria-labelledby="interests">
          <h2 id="interests" className={styles.h2}>
            What I work on
          </h2>
          <div className={styles.interestCols}>
            <div>
              <h3 className={styles.interestTitle}>Engineering</h3>
              <ul className={styles.interestList}>
                {bio.interests.engineering.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.interestTitle}>Design</h3>
              <ul className={styles.interestList}>
                {bio.interests.design.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Experience timeline --- */}
        <section className={styles.experience} aria-labelledby="experience">
          <h2 id="experience" className={styles.h2}>
            Experience
          </h2>

          <ol className={styles.timeline}>
            {experience.map((item, i) => (
              <Reveal as="li" key={item.id} delay={i * 80} className={styles.entry}>
                <div className={styles.entryMarker} aria-hidden="true">
                  <span className={styles.entryDot} />
                </div>

                <div className={styles.entryBody}>
                  <div className={styles.entryHead}>
                    <h3 className={styles.entryOrg}>{item.org}</h3>
                    <p className={styles.entryRole}>
                      {item.role}
                      {item.period && <span className={styles.dim}> — {item.period}</span>}
                    </p>
                  </div>

                  <p className={styles.entrySummary}>{item.summary}</p>

                  {item.detail?.length > 0 && (
                    <ul className={styles.entryDetail}>
                      {item.detail.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  )}

                  {item.link && (
                    <p className={styles.entryLink}>
                      <Link to={item.link.to}>{item.link.label} →</Link>
                    </p>
                  )}

                  {item.gallery?.length > 0 && (
                    <ul className={styles.entryStrip}>
                      {item.gallery.map((g) => (
                        <li key={g.media} className={styles.entryStripItem}>
                          <Img
                            name={g.media}
                            alt={g.alt ?? g.caption ?? ''}
                            className={styles.entryThumb}
                            sizes="(min-width: 700px) 200px, 45vw"
                          />
                          <span className={styles.entryCaption}>{g.caption}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* --- Activities --- */}
        <section className={styles.experience} aria-labelledby="activities">
          <h2 id="activities" className={styles.h2}>
            Activities
          </h2>
          <ol className={styles.timeline}>
            {bio.activities.map((item) => (
              <li key={item.org} className={styles.entry}>
                <div className={styles.entryMarker} aria-hidden="true">
                  <span className={styles.entryDot} />
                </div>
                <div className={styles.entryBody}>
                  <div className={styles.entryHead}>
                    <h3 className={styles.entryOrg}>{item.org}</h3>
                    <p className={styles.entryRole}>
                      {item.role}
                      <span className={styles.dim}> — {item.period}</span>
                    </p>
                  </div>
                  <ul className={styles.entryDetail}>
                    {item.detail.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* --- Coursework and honors --- */}
        <section className={styles.interests} aria-labelledby="coursework">
          <div className={styles.interestCols}>
            <div>
              <h2 id="coursework" className={styles.h2}>
                Coursework
              </h2>
              <ul className={styles.interestList}>
                {bio.coursework.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={styles.h2}>Honors</h2>
              <ul className={styles.interestList}>
                {bio.honors.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className={styles.cta}>
          <Button to="/projects" variant="primary" arrow>
            See the work
          </Button>
          <Button href={asset('/files/Mellanie-Rodriguez-Resume.pdf')}>Resume (PDF)</Button>
          <Button to="/socials">Get in touch</Button>
        </div>

        <NeedsNote items={bio.needs} title="About — needs from you" />
      </div>
    </div>
  );
}
