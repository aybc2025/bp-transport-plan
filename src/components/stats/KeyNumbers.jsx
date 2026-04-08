import { useState, useEffect } from 'react';
import { DATA_PATHS } from '../../constants';
import useStore from '../../store';
import AnimatedCounter from './AnimatedCounter';

const ICONS = {
  survey: '📊',
  people: '👥',
  event: '📍',
  chat: '💬',
  route: '🚌',
  edit: '✏️',
  thumbsUp: '👍',
  language: '🌐',
  star: '⭐',
  alert: '⚠️',
};

export default function KeyNumbers() {
  const { dataCache, setDataCache } = useStore();
  const [stats, setStats] = useState(dataCache.keyStats || null);

  useEffect(() => {
    if (dataCache.keyStats) {
      setStats(dataCache.keyStats);
      return;
    }
    fetch(DATA_PATHS.keyStats)
      .then((r) => r.json())
      .then((data) => {
        setDataCache('keyStats', data);
        setStats(data);
      })
      .catch(() => {});
  }, [dataCache.keyStats, setDataCache]);

  if (!stats) return null;

  return (
    <div>
      <h3 className="section-title mb-3">Public Engagement</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 stagger-children">
        {stats.stats.map((stat) => (
          <div
            key={stat.label}
            className="card p-3 text-center card-hover-lift"
          >
            <span className="text-lg mb-1 block" role="img" aria-hidden="true">
              {ICONS[stat.icon] || '📋'}
            </span>
            <p className="text-xl text-primary mb-0.5">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-[11px] text-neutral-500 font-body leading-tight">
              {stat.label}
            </p>
            {stat.detail && (
              <p className="text-[10px] text-neutral-400 font-mono mt-1">
                {stat.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
