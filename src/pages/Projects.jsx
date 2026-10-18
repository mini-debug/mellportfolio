import { featuredProjects, secondaryProjects } from '../data/projects';
import ProjectGrid from '../components/ProjectGrid';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <div className="page">
      <Seo
        title="Projects"
        description="Selected work across electronics, robotics, embedded systems, product design and fabrication."
      />

      <div className="container">
        <header className="page__header">
          <p className="eyebrow">Selected work</p>
          <h1 className="page__title">Projects</h1>
          <p className="page__intro">
            Six pieces of work across electronics, robotics, embedded systems and
            physical product design. Each one has its own page with the process
            behind it — what the problem was, what was built, and what broke first.
          </p>
        </header>

        <ProjectGrid projects={featuredProjects} />

        {secondaryProjects.length > 0 && (
          <section className={styles.secondary} aria-labelledby="also-built">
            <div className={styles.secondaryHead}>
              <h2 id="also-built" className={styles.secondaryTitle}>
                Also built
              </h2>
              <p className={styles.secondaryNote}>
                Earlier work, kept for reference rather than featured.
              </p>
            </div>

            <ul className={styles.secondaryList}>
              {secondaryProjects.map((project, i) => (
                <Reveal as="li" key={project.id} delay={i * 60} className={styles.secondaryItem}>
                  <ProjectCard project={project} index={featuredProjects.length + i} />
                </Reveal>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
