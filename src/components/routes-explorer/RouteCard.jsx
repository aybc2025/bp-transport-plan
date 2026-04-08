import { useState } from 'react';
import { CHANGE_TYPES } from '../../constants';
import { formatNetSupport, netSupportColor } from '../../utils/format';
import SupportBar from './SupportBar';
import RouteChangeDetail from './RouteChangeDetail';

export default function RouteCard({ proposal }) {
  const [expanded, setExpanded] = useState(false);
  const ct = CHANGE_TYPES[proposal.type] || CHANGE_TYPES.modify;

  // Extract route number from label
  const routeNum = proposal.label
    .replace(/^(New Route |Route )/, '')
    .replace(/ (Changes|Removal)$/, '');

  return (
    <div className="card card-hover-lift overflow-hidden">
      {/* Main card */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-3">
          {/* Route badge */}
          <span
            className="route-badge text-white flex-shrink-0"
            style={{ backgroundColor: ct.color }}
          >
            {routeNum}
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="pill"
                style={{ backgroundColor: ct.bg, color: ct.color }}
              >
                {ct.icon} {ct.label}
              </span>
              <span
                className="text-xs font-mono font-semibold"
                style={{ color: netSupportColor(proposal.net) }}
              >
                {formatNetSupport(proposal.net)}
              </span>
            </div>

            <p className="text-sm font-body text-neutral-700 truncate">
              {proposal.label}
            </p>

            {/* Support bar */}
            <div className="mt-2">
              <SupportBar data={proposal} compact />
            </div>
          </div>

          {/* Expand icon */}
          <svg
            className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path d="m19 9-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <RouteChangeDetail proposal={proposal} routeNum={routeNum} />
      )}
    </div>
  );
}
