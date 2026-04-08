import { useCallback } from 'react';
import useStore from '../store';

export default function useMapLayers() {
  const { visibleLayers, toggleLayer, setHighlightedRoutes } = useStore();

  const showRouteOnMap = useCallback(
    (routeIds) => {
      setHighlightedRoutes(Array.isArray(routeIds) ? routeIds : [routeIds]);
    },
    [setHighlightedRoutes]
  );

  const clearHighlights = useCallback(() => {
    setHighlightedRoutes([]);
  }, [setHighlightedRoutes]);

  return {
    visibleLayers,
    toggleLayer,
    showRouteOnMap,
    clearHighlights,
  };
}
