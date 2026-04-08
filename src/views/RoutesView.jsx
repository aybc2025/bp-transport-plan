import { useMemo } from 'react';
import useStore from '../store';
import useSurveyData from '../hooks/useSurveyData';
import RouteSearch from '../components/routes-explorer/RouteSearch';
import RouteCard from '../components/routes-explorer/RouteCard';
import FilterPanel from '../components/shared/FilterPanel';
import SkeletonCard from '../components/shared/SkeletonCard';

export default function RoutesView() {
  const { routeFilterType, setRouteFilterType, routeSortBy, setRouteSortBy, routeSearchQuery } = useStore();
  const { surveyData, loading } = useSurveyData();

  const filtered = useMemo(() => {
    if (!surveyData) return [];
    let items = [...surveyData.proposals];

    // Filter by type
    if (routeFilterType !== 'all') {
      items = items.filter((p) => p.type === routeFilterType);
    }

    // Filter by search
    if (routeSearchQuery) {
      const q = routeSearchQuery.toLowerCase();
      items = items.filter((p) => p.label.toLowerCase().includes(q));
    }

    // Sort
    if (routeSortBy === 'net') items.sort((a, b) => b.net - a.net);
    else if (routeSortBy === 'name') items.sort((a, b) => a.label.localeCompare(b.label));
    else if (routeSortBy === 'n') items.sort((a, b) => b.n - a.n);

    return items;
  }, [surveyData, routeFilterType, routeSortBy, routeSearchQuery]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="font-display font-bold text-xl text-neutral-900 mb-1">
            Route Changes
          </h2>
          <p className="body-text">
            59 bus route proposals — new routes, modifications, and removals.
          </p>
        </div>

        {/* Search */}
        <RouteSearch />

        {/* Filters */}
        <div className="mt-3 mb-4">
          <FilterPanel
            filterType={routeFilterType}
            onFilterType={setRouteFilterType}
            sortBy={routeSortBy}
            onSortBy={setRouteSortBy}
          />
        </div>

        {/* Count */}
        <p className="text-xs text-neutral-400 font-mono mb-3">
          {filtered.length} proposal{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Cards */}
        {loading ? (
          <div className="space-y-3">
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        ) : (
          <div className="space-y-3 stagger-children pb-4">
            {filtered.map((proposal) => (
              <RouteCard key={proposal.label} proposal={proposal} />
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-neutral-400">No routes match your filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
