import { Link } from 'react-router-dom';
import styles from './Button.module.css';

/**
 * Shared action affordance.
 *
 * Renders a react-router <Link> for internal `to`, an <a> for external `href`,
 * or a <button> otherwise — so the correct element is always used and keyboard
 * semantics come for free.
 *
 * variant: 'primary' | 'secondary' | 'ghost'
 */
export default function Button({
  to,
  href,
  variant = 'secondary',
  arrow = false,
  back = false,
  children,
  className = '',
  ...rest
}) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`;

  const inner = (
    <>
      {back && (
        <svg className={styles.arrowBack} viewBox="0 0 24 12" aria-hidden="true">
          <path d="M24 6H3M8 1 3 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )}
      <span>{children}</span>
      {arrow && (
        <svg className={styles.arrow} viewBox="0 0 24 12" aria-hidden="true">
          <path d="M0 6h21M16 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}
