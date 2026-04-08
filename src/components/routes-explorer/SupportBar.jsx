import { useEffect, useRef, useState } from 'react';

export default function SupportBar({ data, compact = false }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const segments = [
    { key: 'ss', color: '#2D9F4F', label: 'Strongly support' },
    { key: 'sws', color: '#6FCF7C', label: 'Somewhat support' },
    { key: 'nei', color: '#D1D5DB', label: 'Neither' },
    { key: 'swo', color: '#F5A623', label: 'Somewhat oppose' },
    { key: 'sto', color: '#D63031', label: 'Strongly oppose' },
    { key: 'dk', color: '#E5E7EB', label: "Don't know" },
  ];

  const height = compact ? 'h-2' : 'h-3';

  return (
    <div ref={ref}>
      <div className={`flex ${height} rounded-full overflow-hidden bg-neutral-100`} role="img" aria-label={`Support: ${data.ss + data.sws}%, Oppose: ${data.swo + data.sto}%`}>
        {segments.map(({ key, color }) => {
          const pct = data[key] || 0;
          if (pct === 0) return null;
          return (
            <div
              key={key}
              className="support-bar-fill transition-all duration-700"
              style={{
                width: animated ? `${pct}%` : '0%',
                backgroundColor: color,
              }}
            />
          );
        })}
      </div>
      {!compact && (
        <div className="flex justify-between mt-1">
          <span className="text-[10px] font-mono text-success">
            {data.ss + data.sws}% support
          </span>
          <span className="text-[10px] font-mono text-danger">
            {data.swo + data.sto}% oppose
          </span>
        </div>
      )}
    </div>
  );
}
