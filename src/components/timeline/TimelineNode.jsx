import { useState } from 'react';
import useStore from '../../store';

const STATUS_STYLES = {
  'under-construction': { color: '#FF6B35', bg: '#FFF7ED', label: 'Under Construction', icon: '🔨' },
  funded: { color: '#2D9F4F', bg: '#ECFDF5', label: 'Funded', icon: '✓' },
  planned: { color: '#00B4D8', bg: '#EFF6FF', label: 'Planned', icon: '◎' },
  proposed: { color: '#6B7280', bg: '#F3F4F6', label: 'Proposed', icon: '○' },
};

const TYPE_ICONS = {
  infrastructure: '🏗️',
  service: '🚌',
};

export default function TimelineNode({ milestone, isLast }) {
  const [expanded, setExpanded] = useState(false);
  const { setActiveView, setHighlightedRoutes } = useStore();
  const status = STATUS_STYLES[milestone.status] || STATUS_STYLES.proposed;

  function handleViewActions() {
    // Find routes affected by these actions
    setActiveView('dashboard');
  }

  return (
    <div className="relative flex gap-4">
      {/* Vertical line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center z-10 bg-white"
          style={{ borderColor: status.color }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color }} />
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-neutral-200 mt-1" />
        )}
      </div>

      {/* Content */}
      <div className="pb-6 flex-1 min-w-0">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left"
          aria-expanded={expanded}
        >
          {/* Year badge */}
          <span className="font-mono text-xs font-semibold text-neutral-400">
            {milestone.year}
            {milestone.quarter ? ` ${milestone.quarter}` : ''}
          </span>

          {/* Title */}
          <h4 className="font-display font-semibold text-sm text-neutral-900 mt-0.5">
            <span className="mr-1.5">{TYPE_ICONS[milestone.type] || '📋'}</span>
            {milestone.title}
          </h4>

          {/* Status pill */}
          <span
            className="pill mt-1.5"
            style={{ backgroundColor: status.bg, color: status.color }}
          >
            {status.icon} {status.label}
          </span>
        </button>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-3 pl-0 animate-fade-in">
            <p className="text-xs text-neutral-500 font-body mb-2">
              {milestone.description}
            </p>

            {milestone.actions?.length > 0 && (
              <div className="mb-2">
                <p className="text-[11px] font-display font-semibold text-neutral-400 mb-1">
                  Triggered Actions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {milestone.actions.map((a) => (
                    <span
                      key={a}
                      className="font-mono text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleViewActions} className="btn-ghost text-xs mt-1">
              View in Plan →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
