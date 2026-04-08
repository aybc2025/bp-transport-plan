import L from 'leaflet';
import { COLORS } from '../../constants';

const CHANGE_COLORS = {
  new: COLORS.success,
  modify: COLORS.accent,
  remove: COLORS.danger,
};

/**
 * Create proposed/future route polylines.
 * Dashed lines with color by change type.
 */
export function createProposedRouteLayer(geojson, onClick) {
  const group = L.layerGroup();

  geojson.features.forEach((feature) => {
    const coords = feature.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    const p = feature.properties;
    const color = CHANGE_COLORS[p.changeType] || COLORS.success;

    const line = L.polyline(coords, {
      color,
      weight: 3,
      opacity: 0.8,
      dashArray: '8 6',
      className: 'proposed-route-line',
    });

    line.feature = feature;

    line.bindTooltip(
      `<span style="font-family:'JetBrains Mono',monospace;font-weight:600;">${p.shortName}</span>` +
      `<span style="font-size:10px;color:#6B7280;margin-left:4px;">(proposed)</span>`,
      { permanent: false, direction: 'center', className: 'route-tooltip proposed-tooltip' }
    );

    line.bindPopup(`
      <div style="font-family:'Source Sans 3',sans-serif; padding:4px 0; min-width:200px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
          <span style="display:inline-flex; align-items:center; justify-content:center;
            min-width:36px; padding:2px 8px; background:${color}; color:white;
            font-family:'JetBrains Mono',monospace; font-weight:600; font-size:13px;
            border-radius:6px;">${p.shortName}</span>
          <strong style="font-size:13px; color:#1A1A2E;">${p.longName || ''}</strong>
        </div>
        <div style="font-size:12px; color:#6B7280; margin-bottom:6px;">${p.description || ''}</div>
        <span style="display:inline-block; padding:2px 8px; background:#ECFDF5;
          color:${color}; font-size:11px; border-radius:4px; font-weight:500;">
          Proposed New Route
        </span>
      </div>
    `);

    if (onClick) {
      line.on('click', () => onClick(feature));
    }

    group.addLayer(line);
  });

  return group;
}
