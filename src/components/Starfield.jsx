import { useEffect, useRef } from 'react';
import styles from './Starfield.module.css';

/**
 * Ambient starfield.
 *
 * One <canvas>, one rAF loop, no React state and no per-star DOM nodes.
 * Stars drift downward across three depth layers, with a slow independent
 * twinkle so the field never pulses in unison.
 *
 * Behaviour:
 *  - density scales with viewport area and is capped, so a 4K display does not
 *    pay for thousands of particles
 *  - the loop stops entirely when the tab is hidden
 *  - prefers-reduced-motion renders a single static frame and never animates
 *  - the canvas is aria-hidden and pointer-events:none
 */
export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let stars = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = false;

    /* Three depth layers. Nearer stars are larger, brighter and faster. */
    const LAYERS = [
      { count: 0.55, size: [0.4, 0.9], speed: [0.012, 0.028], alpha: [0.18, 0.4] },
      { count: 0.3, size: [0.7, 1.4], speed: [0.03, 0.055], alpha: [0.3, 0.6] },
      { count: 0.15, size: [1.1, 2.0], speed: [0.055, 0.09], alpha: [0.45, 0.85] },
    ];

    const rand = (min, max) => min + Math.random() * (max - min);

    function build() {
      // ~1 star per 9000 px² of viewport, clamped to a sane range.
      const target = Math.round(
        Math.min(260, Math.max(60, (width * height) / 9000))
      );
      stars = [];
      for (const layer of LAYERS) {
        const n = Math.round(target * layer.count);
        for (let i = 0; i < n; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: rand(...layer.size),
            vy: rand(...layer.speed),
            baseAlpha: rand(...layer.alpha),
            // Twinkle: independent phase and a slow, per-star rate.
            phase: Math.random() * Math.PI * 2,
            twinkle: rand(0.0006, 0.0022),
            // A minority of stars have a faint lavender cast for depth.
            hue: Math.random() < 0.18 ? 'alt' : 'base',
          });
        }
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const flicker = reduceMotion.matches
          ? 1
          : 0.72 + 0.28 * Math.sin(s.phase + t * s.twinkle);
        const a = s.baseAlpha * flicker;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle =
          s.hue === 'alt'
            ? `rgba(179, 166, 255, ${a})`
            : `rgba(214, 232, 255, ${a})`;
        ctx.fill();
      }
    }

    function step(t) {
      if (!running) return;
      for (const s of stars) {
        s.y += s.vy;
        if (s.y - s.r > height) {
          s.y = -s.r;
          s.x = Math.random() * width;
        }
      }
      draw(t);
      frame = requestAnimationFrame(step);
    }

    function start() {
      if (running || reduceMotion.matches) return;
      running = true;
      frame = requestAnimationFrame(step);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    function onMotionChange() {
      stop();
      resize();
      if (reduceMotion.matches) draw(0);
      else start();
    }

    resize();
    if (reduceMotion.matches) draw(0);
    else start();

    // Debounced resize — rebuilding the field is not cheap.
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduceMotion.matches) draw(0);
      }, 150);
    };

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    reduceMotion.addEventListener('change', onMotionChange);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.veil} />
    </div>
  );
}
