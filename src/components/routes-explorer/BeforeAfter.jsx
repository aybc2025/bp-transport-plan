import { CHANGE_TYPES } from '../../constants';

export default function BeforeAfter({ proposal, routeNum }) {
  const ct = CHANGE_TYPES[proposal.type] || CHANGE_TYPES.modify;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Current state */}
      <div className="card-compact border-l-2 border-neutral-300">
        <p className="text-[10px] font-display font-semibold text-neutral-400 uppercase tracking-wider mb-1">
          Current
        </p>
        {proposal.type === 'new' ? (
          <p className="text-xs text-neutral-400 italic font-body">
            Route does not currently exist
          </p>
        ) : (
          <p className="text-xs text-neutral-600 font-body">
            Route {routeNum} operates on its existing routing
          </p>
        )}
      </div>

      {/* Proposed change */}
      <div
        className="card-compact border-l-2"
        style={{ borderColor: ct.color }}
      >
        <p
          className="text-[10px] font-display font-semibold uppercase tracking-wider mb-1"
          style={{ color: ct.color }}
        >
          Proposed
        </p>
        <p className="text-xs text-neutral-600 font-body">
          {proposal.type === 'new' && `Introduce new route ${routeNum}`}
          {proposal.type === 'modify' && `Modify route ${routeNum} routing or service`}
          {proposal.type === 'remove' && `Discontinue route ${routeNum}`}
        </p>
      </div>
    </div>
  );
}
