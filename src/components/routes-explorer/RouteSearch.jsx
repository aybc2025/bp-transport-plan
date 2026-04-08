import useStore from '../../store';

export default function RouteSearch() {
  const { routeSearchQuery, setRouteSearchQuery } = useStore();

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={routeSearchQuery}
        onChange={(e) => setRouteSearchQuery(e.target.value)}
        placeholder="Filter by route number or name..."
        className="w-full pl-9 pr-4 py-2.5 bg-neutral-100 rounded-xl text-sm font-body
                   text-neutral-900 placeholder:text-neutral-400
                   outline-none focus:ring-2 focus:ring-secondary/40 focus:bg-white
                   transition-all"
        aria-label="Filter route proposals"
      />
      {routeSearchQuery && (
        <button
          onClick={() => setRouteSearchQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          aria-label="Clear search"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
