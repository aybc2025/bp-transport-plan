import { create } from 'zustand';

const useStore = create((set) => ({
  // ── Navigation ──
  activeView: 'map',
  setActiveView: (view) => set({ activeView: view }),

  // ── Map state ──
  mapLoaded: false,
  setMapLoaded: (loaded) => set({ mapLoaded: loaded }),
  selectedRoute: null,
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  highlightedRoutes: [],
  setHighlightedRoutes: (routes) => set({ highlightedRoutes: routes }),
  visibleLayers: {
    busRoutes: true,
    skytrainLines: true,
    stations: true,
    busStops: false,
    proposedRoutes: true,
    transitPriority: false,
  },
  toggleLayer: (layer) =>
    set((state) => ({
      visibleLayers: {
        ...state.visibleLayers,
        [layer]: !state.visibleLayers[layer],
      },
    })),

  // ── Dashboard ──
  activeDashboardTab: 'bus',
  setActiveDashboardTab: (tab) => set({ activeDashboardTab: tab }),

  // ── Route Explorer ──
  routeSearchQuery: '',
  setRouteSearchQuery: (q) => set({ routeSearchQuery: q }),
  routeFilterType: 'all',
  setRouteFilterType: (type) => set({ routeFilterType: type }),
  routeSortBy: 'net',
  setRouteSortBy: (sort) => set({ routeSortBy: sort }),
  expandedRouteCard: null,
  setExpandedRouteCard: (id) => set({ expandedRouteCard: id }),

  // ── Timeline ──
  timelinePhaseFilter: 'all',
  setTimelinePhaseFilter: (phase) => set({ timelinePhaseFilter: phase }),

  // ── Search overlay ──
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),

  // ── Data cache ──
  dataCache: {},
  setDataCache: (key, data) =>
    set((state) => ({
      dataCache: { ...state.dataCache, [key]: data },
    })),
}));

export default useStore;
