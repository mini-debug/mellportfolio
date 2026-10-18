import { socials } from '../data/socials';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import styles from './Socials.module.css';

const ICONS = {
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.42-1.305.763-1.604-2.666-.307-5.467-1.334-5.467-5.93 0-1.31.468-2.381 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.301 1.23a11.48 11.48 0 0 1 3.005-.403c1.02.005 2.047.138 3.005.403 2.29-1.553 3.296-1.23 3.296-1.23.654 1.652.244 2.873.12 3.176.77.841 1.235 1.912 1.235 3.222 0 4.61-2.807 5.625-5.48 5.922.43.372.815 1.102.815 2.222v3.293c0 .32.218.694.825.576C20.565 22.092 24 17.593 24 12.297 24 5.67 18.627.297 12 .297z',
  linkedin:
    'M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.081 20.452H3.907V9h3.174v11.452zM5.494 7.433a2.069 2.069 0 1 1 0-4.138 2.069 2.069 0 0 1 0 4.138zM20.452 20.452h-3.553v-5.569c0-1.329-.025-3.036-1.849-3.036-1.849 0-2.135 1.445-2.135 2.939v5.666h-3.172V9h3.047v1.561h.043c.425-.804 1.459-1.65 3.003-1.65 3.213 0 3.806 2.117 3.806 4.872v6.669z',
  mail: 'M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2l-10 6L2 6V4zm0 4.6V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.6l-10 6-10-6z',
};

export default function Socials() {
  return (
    <div className="page">
      <Seo
        title="Socials"
        description="Where to find Mellanie Rodriguez — GitHub, LinkedIn and email."
      />

      <div className="container">
        <header className="page__header">
          <p className="eyebrow">Channels</p>
          <h1 className="page__title">Socials</h1>
          <p className="page__intro">
            Three ways to reach me. Email is the fastest if you have something
            specific in mind.
          </p>
        </header>

        <ul className={styles.list}>
          {socials.map((social, i) => {
            const external = social.icon !== 'mail';
            return (
              <Reveal as="li" key={social.id} delay={i * 70}>
                <a
                  href={social.href}
                  className={styles.card}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span className={styles.index} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className={styles.iconWrap} aria-hidden="true">
                    <svg viewBox="0 0 24 24" className={styles.icon}>
                      <path d={ICONS[social.icon]} fill="currentColor" />
                    </svg>
                  </span>

                  <span className={styles.text}>
                    <span className={styles.label}>{social.label}</span>
                    <span className={styles.handle}>{social.handle}</span>
                    <span className={styles.desc}>{social.description}</span>
                  </span>

                  <span className={styles.arrowWrap} aria-hidden="true">
                    <svg viewBox="0 0 24 24" className={styles.arrow}>
                      {external ? (
                        <path
                          d="M7 17 17 7M9 7h8v8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      ) : (
                        <path
                          d="M4 12h14M13 6l6 6-6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      )}
                    </svg>
                  </span>

                  {external && (
                    <span className="visually-hidden">(opens in a new tab)</span>
                  )}
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
