import L from 'leaflet';
import { COLORS, SKYTRAIN_COLORS } from '../../constants';

/**
 * Add bus route polylines to the map.
 * Returns a layer group for toggling.
 */
export function createBusRouteLayer(geojson) {
  const group = L.layerGroup();

  geojson.features
    .filter((f) => f.properties.routeType === 3)
    .forEach((feature) => {
      const coords = feature.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      const line = L.polyline(coords, {
        color: COLORS.primary,
        weight: 2,
        opacity: 0.5,
        className: 'bus-route-line',
      });
      line.feature = feature;
      line.bindTooltip(feature.properties.shortName || '', {
        permanent: false,
        direction: 'center',
        className: 'route-tooltip',
      });
      group.addLayer(line);
    });

  return group;
}

/**
 * Add SkyTrain lines to the map.
 */
export function createSkyTrainLayer(geojson) {
  const group = L.layerGroup();

  geojson.features
    .filter((f) => f.properties.routeType === 1)
    .forEach((feature) => {
      const coords = feature.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      const name = feature.properties.longName || '';
      const color = SKYTRAIN_COLORS[name] || '#666666';

      // White casing
      L.polyline(coords, { color: '#ffffff', weight: 7, opacity: 0.8 }).addTo(group);
      // Colored line
      const line = L.polyline(coords, { color, weight: 4, opacity: 1 });
      line.feature = feature;
      line.bindTooltip(name, { permanent: false, direction: 'center' });
      group.addLayer(line);
    });

  return group;
}

/**
 * Highlight specific routes by short name.
 */
export function createHighlightLayer(geojson, routeNames) {
  const group = L.featureGroup();
  const nameSet = new Set(routeNames);

  geojson.features
    .filter((f) => f.properties.routeType === 3 && nameSet.has(f.properties.shortName))
    .forEach((feature) => {
      const coords = feature.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      L.polyline(coords, {
        color: COLORS.accent,
        weight: 5,
        opacity: 0.9,
      }).addTo(group);
    });

  return group;
}
