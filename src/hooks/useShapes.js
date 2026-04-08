import useRouteData from './useRouteData';

/**
 * Load shape geometries for a specific set of route short names.
 * Filters the full routes GeoJSON to just the requested routes.
 */
export default function useShapes(routeShortNames = []) {
  const { routes, loading, error } = useRouteData();

  if (!routes || routeShortNames.length === 0) {
    return { shapes: null, loading, error };
  }

  const nameSet = new Set(routeShortNames.map((n) => String(n)));
  const filtered = {
    type: 'FeatureCollection',
    features: routes.features.filter((f) =>
      nameSet.has(f.properties.shortName)
    ),
  };

  return { shapes: filtered, loading, error };
}
