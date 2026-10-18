import Button from '../components/Button';
import Seo from '../components/Seo';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={`page ${styles.page}`}>
      <Seo title="Not found" description="That page does not exist." />

      <div className="container">
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={styles.title}>No signal.</h1>
        <p className={styles.text}>
          That route does not exist. It may have moved, or it may never have
          been built.
        </p>
        <div className={styles.actions}>
          <Button to="/" variant="primary" arrow>
            Back to home
          </Button>
          <Button to="/projects">Browse projects</Button>
        </div>
      </div>
    </div>
  );
}
