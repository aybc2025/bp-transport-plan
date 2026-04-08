import { useEffect, useRef } from 'react';
import L from 'leaflet';
import useStore from '../../store';
import useRouteData from '../../hooks/useRouteData';
import useStops from '../../hooks/useStops';
import useProposedRoutes from '../../hooks/useProposedRoutes';
import { MAP_CONFIG, COLORS } from '../../constants';
import { createBusRouteLayer, createSkyTrainLayer, createHighlightLayer } from './RouteLayer';
import { createStationLayer } from './StationMarkers';
import { createProposedRouteLayer } from './ProposedRouteLayer';

export default function TransitMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const layersRef = useRef({});
  const { setMapLoaded, visibleLayers, highlightedRoutes } = useStore();
  const { routes } = useRouteData();
  const { proposedRoutes } = useProposedRoutes();
  const { stations } = useStops();

  // Initialize map
  useEffect(() => {
    if (mapInstance.current || !mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [MAP_CONFIG.center[1], MAP_CONFIG.center[0]],
      zoom: MAP_CONFIG.zoom,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
      zoomControl: false,
      attributionControl: true,
    });

    // OpenStreetMap tiles — free, no token
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    mapInstance.current = map;
    setMapLoaded(true);

    return () => {
      map.remove();
      mapInstance.current = null;
      layersRef.current = {};
    };
  }, [setMapLoaded]);

  // Add route data when available
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !routes || layersRef.current.busRoutes) return;

    const busLayer = createBusRouteLayer(routes);
    const skytrainLayer = createSkyTrainLayer(routes);

    // Click handler on bus routes
    busLayer.eachLayer((layer) => {
      layer.on('click', () => {
        const p = layer.feature?.properties;
        if (!p) return;
        layer.bindPopup(`
          <div style="font-family:'Source Sans 3',sans-serif; padding:4px 0; min-width:180px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span style="display:inline-flex; align-items:center; justify-content:center;
                min-width:36px; padding:2px 8px; background:${COLORS.primary}; color:white;
                font-family:'JetBrains Mono',monospace; font-weight:600; font-size:13px;
                border-radius:6px;">${p.shortName || '—'}</span>
              <strong style="font-size:13px; color:#1A1A2E;">${p.longName || ''}</strong>
            </div>
            <div style="font-size:12px; color:#6B7280;">${p.headsign || ''}</div>
            <span style="display:inline-block; margin-top:6px; padding:2px 8px; background:#F0FDF4;
              color:#2D9F4F; font-size:11px; border-radius:4px; font-weight:500;">Bus</span>
          </div>
        `).openPopup();
      });
    });

    skytrainLayer.addTo(map);
    busLayer.addTo(map);

    layersRef.current.busRoutes = busLayer;
    layersRef.current.skytrainLines = skytrainLayer;
  }, [routes]);

  // Add stations
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !stations || layersRef.current.stations) return;

    const stationLayer = createStationLayer(stations);
    stationLayer.addTo(map);
    layersRef.current.stations = stationLayer;
  }, [stations]);

  // Add proposed routes
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !proposedRoutes || layersRef.current.proposedRoutes) return;

    const proposedLayer = createProposedRouteLayer(proposedRoutes);
    proposedLayer.addTo(map);
    layersRef.current.proposedRoutes = proposedLayer;
  }, [proposedRoutes]);

  // Toggle layer visibility
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    Object.entries(visibleLayers).forEach(([key, visible]) => {
      const layer = layersRef.current[key];
      if (!layer) return;
      if (visible && !map.hasLayer(layer)) map.addLayer(layer);
      if (!visible && map.hasLayer(layer)) map.removeLayer(layer);
    });
  }, [visibleLayers]);

  // Highlight routes
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !routes) return;

    // Remove previous highlight
    if (layersRef.current.highlight) {
      map.removeLayer(layersRef.current.highlight);
      layersRef.current.highlight = null;
    }

    if (highlightedRoutes.length > 0) {
      const hl = createHighlightLayer(routes, highlightedRoutes);
      hl.addTo(map);
      layersRef.current.highlight = hl;

      // Fit bounds to highlighted routes
      const bounds = hl.getBounds();
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [highlightedRoutes, routes]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
