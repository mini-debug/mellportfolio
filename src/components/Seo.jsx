import { useEffect } from 'react';

const SITE = 'Mellanie Rodriguez';

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, name] = selector.match(/\[(?:name|property)="([^"]+)"\]/) ?? [];
    if (!name) return;
    el.setAttribute(selector.includes('property=') ? 'property' : 'name', name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Per-route document metadata.
 *
 * A ~30-line effect instead of a helmet library. The site is static and every
 * route knows its own title, so there is no need for a dependency here.
 */
export default function Seo({ title, description, image }) {
  useEffect(() => {
    const full = title === SITE ? title : `${title} — ${SITE}`;
    document.title = full;

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
    }

    setMeta('meta[property="og:title"]', 'content', full);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:url"]', 'content', window.location.href);
    setMeta('meta[name="twitter:card"]', 'content', image ? 'summary_large_image' : 'summary');

    if (image) {
      setMeta('meta[property="og:image"]', 'content', new URL(image, window.location.origin).href);
    }
  }, [title, description, image]);

  return null;
}
