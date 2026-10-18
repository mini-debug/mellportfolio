import { useState } from 'react';
import media from '../data/media.json';
import { asset } from '../utils/asset';
import styles from './Img.module.css';

/**
 * Responsive image.
 *
 * Emits <picture> with AVIF → WebP → JPEG and a srcset across 400/800/1600,
 * so the browser downloads exactly one appropriately-sized file. A base64 LQIP
 * from the manifest paints immediately and cross-fades out on decode, which
 * removes the layout flash without a spinner.
 *
 * `width`/`height` come from the manifest so every image reserves its exact
 * space before loading — no cumulative layout shift.
 *
 * @param {string}  name     key into media.json
 * @param {string}  alt      required; pass "" only for decorative images
 * @param {string}  sizes    CSS `sizes` descriptor — set this per layout
 * @param {boolean} priority true for above-the-fold LCP images (eager + high)
 */
export default function Img({
  name,
  alt,
  sizes = '100vw',
  priority = false,
  className = '',
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const entry = media[name];

  if (!entry) {
    // Fails loudly in dev, degrades quietly in production.
    if (import.meta.env.DEV) {
      console.error(`<Img> unknown media key: "${name}"`);
    }
    return (
      <div
        className={`${styles.missing} ${className}`}
        role="img"
        aria-label={alt || 'Image unavailable'}
      >
        <span>missing: {name}</span>
      </div>
    );
  }

  const srcset = (fmt) =>
    entry.sources[fmt].map((s) => `${asset(s.src)} ${s.w}w`).join(', ');

  const fallback = entry.sources.jpg[entry.sources.jpg.length - 1];

  return (
    <picture className={`${styles.picture} ${className}`}>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={asset(fallback.src)}
        srcSet={srcset('jpg')}
        sizes={sizes}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={`${styles.img} ${loaded ? styles.loaded : ''}`}
        style={{ backgroundImage: loaded ? 'none' : `url(${entry.lqip})` }}
        {...rest}
      />
    </picture>
  );
}

/** Aspect ratio for a media key — useful for reserving space in grids. */
export function aspectOf(name) {
  return media[name]?.aspect ?? 1;
}
