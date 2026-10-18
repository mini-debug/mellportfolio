import { useParams, Navigate, Link } from 'react-router-dom';
import { getProject, featuredProjects } from '../data/projects';
import Img from '../components/Img';
import Gallery from '../components/Gallery';
import Button from '../components/Button';
import NeedsNote from '../components/NeedsNote';
import Seo from '../components/Seo';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = getProject(projectId);

  if (!project) return <Navigate to="/projects" replace />;

  const {
    title,
    category,
    tagline,
    summary,
    hero,
    glance,
    sections,
    gallery,
    links,
    technologies,
    status,
    needs,
  } = project;

  const isPlaceholder = status === 'placeholder';

  // Next project in the featured list, for continuous browsing.
  const idx = featuredProjects.findIndex((p) => p.id === projectId);
  const next = idx >= 0 ? featuredProjects[(idx + 1) % featuredProjects.length] : null;

  return (
    <article className="page">
      <Seo title={title} description={summary ?? tagline} />

      <div className="container container--narrow">
        <Button to="/projects" variant="ghost" back className={styles.back}>
          Back to projects
        </Button>

        <header className={styles.header}>
          <p className={styles.category}>{category}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.tagline}>{tagline}</p>

          {isPlaceholder && (
            <p className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              This write-up is still being put together.
            </p>
          )}
        </header>
      </div>

      {hero && (
        <div className={styles.heroWrap}>
          <div className="container container--narrow">
            <Img
              name={hero}
              alt={`${title} — hero image`}
              priority
              className={styles.hero}
              sizes="(min-width: 900px) 820px, 100vw"
            />
          </div>
        </div>
      )}

      <div className="container container--narrow">
        {summary && <p className={styles.summary}>{summary}</p>}

        {glance?.length > 0 && (
          <section className={styles.glance} aria-labelledby="at-a-glance">
            <h2 id="at-a-glance" className={styles.glanceHeading}>
              At a glance
            </h2>
            <dl className={styles.glanceList}>
              {glance.map((row) => (
                <div key={row.label} className={styles.glanceRow}>
                  <dt className={styles.glanceLabel}>{row.label}</dt>
                  <dd className={styles.glanceValue}>{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {sections?.length > 0 && (
          <div className={styles.sections}>
            {sections.map((section) => (
              <section key={section.heading} className={styles.section}>
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
                <div className={styles.sectionBody}>
                  {section.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {isPlaceholder && (
          <section className={styles.placeholder}>
            <h2 className={styles.sectionHeading}>Coming soon</h2>
            <p className={styles.sectionBody}>
              This project is real and built — the write-up is not finished yet.
              Rather than fill the page with vague copy, it is left explicitly
              incomplete until the detail is ready.
            </p>
            <p className={styles.placeholderCta}>
              <Link to="/socials">Get in touch</Link> if you want to hear about
              it before it is published.
            </p>
          </section>
        )}

        {technologies?.length > 0 && (
          <section className={styles.techSection} aria-labelledby="stack">
            <h2 id="stack" className={styles.glanceHeading}>
              Stack
            </h2>
            <ul className={styles.chips}>
              {technologies.map((tech) => (
                <li key={tech} className={styles.chip}>
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}

        <Gallery items={gallery} />

        {links?.length > 0 && (
          <section className={styles.links} aria-labelledby="links">
            <h2 id="links" className={styles.glanceHeading}>
              Links
            </h2>
            <div className={styles.linkRow}>
              {links.map((link) => (
                <Button key={link.href} href={link.href} arrow>
                  {link.label}
                </Button>
              ))}
            </div>
          </section>
        )}

        <NeedsNote items={needs} title={`${title} — needs from you`} />

        {next && next.id !== projectId && (
          <nav className={styles.next} aria-label="Next project">
            <Link to={`/projects/${next.id}`} className={styles.nextLink}>
              <span className={styles.nextLabel}>Next project</span>
              <span className={styles.nextTitle}>{next.title}</span>
              <svg className={styles.nextArrow} viewBox="0 0 24 12" aria-hidden="true">
                <path d="M0 6h21M16 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
