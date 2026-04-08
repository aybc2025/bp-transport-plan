import { CHANGE_TYPES } from '../../constants';
import useStore from '../../store';

export default function ActionDetail({ action }) {
  const { setActiveView, setHighlightedRoutes } = useStore();

  function handleViewRoutes() {
    if (action.routes?.length > 0) {
      setHighlightedRoutes(action.routes);
      setActiveView('map');
    }
  }

  return (
    <div className="border-t border-neutral-100 pt-3 mt-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
          {action.id}
        </span>
        <span className="pill bg-neutral-100 text-neutral-500">
          {action.phase}
        </span>
      </div>

      <h4 className="font-display font-semibold text-sm text-neutral-800 mb-1">
        {action.title}
      </h4>
      <p className="text-xs text-neutral-500 font-body mb-2">
        {action.description}
      </p>

      {action.trigger && (
        <p className="text-[11px] text-neutral-400 mb-2">
          <span className="font-semibold">Trigger:</span> {action.trigger}
        </p>
      )}

      {/* Affected routes */}
      {action.routes?.length > 0 && (
        <div className="mb-2">
          <p className="text-[11px] font-display font-semibold text-neutral-400 mb-1">
            Affected Routes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {action.routes.map((r) => (
              <span
                key={r}
                className="route-badge bg-neutral-100 text-neutral-700 text-[11px]"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      )}

      {action.routes?.length > 0 && (
        <button onClick={handleViewRoutes} className="btn-ghost text-xs mt-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="m9 20-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13V7m6 10 4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          View on map
        </button>
      )}
    </div>
  );
}
