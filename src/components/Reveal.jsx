import useReveal from '../hooks/useReveal';
import styles from './Reveal.module.css';

/**
 * Fades and lifts children into view on first scroll-in.
 *
 * `delay` staggers items in a list. Keep stagger small — the brief is explicit
 * that animation must not delay access to content.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const [ref, shown] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${shown ? styles.shown : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
