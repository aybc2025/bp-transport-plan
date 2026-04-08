import { SKYTRAIN_COLORS, COLORS } from '../../constants';
import useStore from '../../store';

export default function MapLegend() {
  const { visibleLayers } = useStore();

  return (
    <div className="absolute bottom-4 left-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-md px-3 py-2.5 max-w-[180px]">
      <p className="text-[10px] font-display font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
        Legend
      </p>
      <div className="space-y-1.5">
        {visibleLayers.skytrainLines &&
          Object.entries(SKYTRAIN_COLORS).map(([name, color]) => (
            <div key={name} className="flex items-center gap-2">
              <span className="w-5 h-[3px] rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="text-[11px] font-body text-neutral-600">{name}</span>
            </div>
          ))}
        {visibleLayers.busRoutes && (
          <div className="flex items-center gap-2">
            <span className="w-5 h-[3px] rounded-sm flex-shrink-0" style={{ backgroundColor: COLORS.primary, opacity: 0.5 }} />
            <span className="text-[11px] font-body text-neutral-600">Current Routes</span>
          </div>
        )}
        {visibleLayers.proposedRoutes && (
          <div className="flex items-center gap-2">
            <span className="w-5 h-[3px] rounded-sm flex-shrink-0" style={{ backgroundColor: COLORS.success, borderTop: '2px dashed #2D9F4F' }} />
            <span className="text-[11px] font-body text-neutral-600">Proposed Routes</span>
          </div>
        )}
        {visibleLayers.stations && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-neutral-900 bg-white flex-shrink-0" />
            <span className="text-[11px] font-body text-neutral-600">Station</span>
          </div>
        )}
      </div>
    </div>
  );
}
