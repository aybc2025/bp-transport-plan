import { useState } from 'react';

export default function GoalCard({ number, title, description, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="font-mono font-bold text-sm text-primary">{number}</span>
          </span>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-sm text-neutral-900">
              {title}
            </h3>
            <p className="text-xs text-neutral-500 font-body mt-0.5 line-clamp-2">
              {description}
            </p>
          </div>
          <svg
            className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 mt-1 ${
              expanded ? 'rotate-180' : ''
            }`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path d="m19 9-7 7-7-7" />
          </svg>
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-0 animate-fade-in">
          <div className="ml-11">{children}</div>
        </div>
      )}
    </div>
  );
}
