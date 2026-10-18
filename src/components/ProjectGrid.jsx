import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import styles from './ProjectGrid.module.css';

export default function ProjectGrid({ projects }) {
  return (
    <ul className={styles.grid}>
      {projects.map((project, i) => (
        <Reveal as="li" key={project.id} delay={Math.min(i * 60, 240)} className={styles.item}>
          {/* Only the first two cards are likely above the fold. */}
          <ProjectCard project={project} index={i} priority={i < 2} />
        </Reveal>
      ))}
    </ul>
  );
}
