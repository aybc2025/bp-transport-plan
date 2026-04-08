import { useState } from 'react';
import useMapLayers from '../../hooks/useMapLayers';

const LAYER_OPTIONS = [
  { id: 'busRoutes', label: 'Bus Routes', color: '#0A5E8A' },
  { id: 'skytrainLines', label: 'SkyTrain', color: '#0033a0' },
  { id: 'stations', label: 'Stations', color: '#1A1A2E' },
  { id: 'busStops', label: 'Bus Stops', color: '#6B7280' },
];

export default function MapControls() {
  const [open, setOpen] = useState(false);
  const { visibleLayers, toggleLayer } = useMapLayers();

  return (
    <div className="absolute top-3 left-3 z-[1000]">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 bg-white rounded-xl shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors"
        aria-label="Toggle map layers"
        aria-expanded={open}
      >
        <svg className="w-4.5 h-4.5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="m4 8 8-4 8 4-8 4-8-4Z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 16 8 4 8-4" />
        </svg>
      </button>

      {/* Layer panel */}
      {open && (
        <div className="mt-2 bg-white rounded-xl shadow-lg p-3 min-w-[180px] animate-fade-in">
          <p className="text-[11px] font-display font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            Map Layers
          </p>
          <div className="space-y-1">
            {LAYER_OPTIONS.map(({ id, label, color }) => (
              <label
                key={id}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={visibleLayers[id]}
                  onChange={() => toggleLayer(id)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    visibleLayers[id]
                      ? 'border-primary bg-primary'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {visibleLayers[id] && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-body text-neutral-700">{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
