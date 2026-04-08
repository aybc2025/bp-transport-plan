import L from 'leaflet';
import { COLORS } from '../../constants';

/**
 * Create station markers layer.
 */
export function createStationLayer(stationsGeoJSON) {
  const group = L.layerGroup();

  stationsGeoJSON.features.forEach((feature) => {
    const [lng, lat] = feature.geometry.coordinates;
    const name = feature.properties.name || '';

    const marker = L.circleMarker([lat, lng], {
      radius: 6,
      fillColor: '#ffffff',
      fillOpacity: 1,
      color: COLORS.neutral900,
      weight: 2,
    });

    marker.bindTooltip(name, {
      permanent: false,
      direction: 'top',
      offset: [0, -8],
      className: 'station-tooltip',
    });

    marker.bindPopup(`
      <div style="font-family: 'Source Sans 3', sans-serif; padding: 4px 0;">
        <strong style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px;">
          ${name}
        </strong>
        <br/>
        <span style="font-size: 11px; color: #0033a0;">SkyTrain Station</span>
      </div>
    `);

    group.addLayer(marker);
  });

  return group;
}
