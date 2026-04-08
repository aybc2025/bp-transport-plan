import { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ value, duration = 1500, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  // Intersection Observer to trigger on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  // Animate
  useEffect(() => {
    if (!started) return;

    const target = typeof value === 'number' ? value : parseInt(value, 10);
    if (isNaN(target)) {
      setDisplay(value);
      return;
    }

    const startTime = performance.now();
    const startVal = 0;

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);
      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [started, value, duration]);

  const formatted =
    typeof display === 'number'
      ? new Intl.NumberFormat('en-CA').format(display)
      : display;

  return (
    <span ref={ref} className="font-mono font-bold tabular-nums">
      {formatted}{suffix}
    </span>
  );
}
