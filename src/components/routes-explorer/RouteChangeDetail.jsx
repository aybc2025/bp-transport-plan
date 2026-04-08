import SupportBar from './SupportBar';
import BeforeAfter from './BeforeAfter';
import { formatNumber } from '../../utils/format';
import useStore from '../../store';

export default function RouteChangeDetail({ proposal, routeNum }) {
  const { setActiveView, setHighlightedRoutes } = useStore();

  function handleViewOnMap() {
    setHighlightedRoutes([routeNum]);
    setActiveView('map');
  }

  return (
    <div className="border-t border-neutral-100 px-4 py-4 bg-neutral-50/50 animate-fade-in">
      {/* Before/After comparison */}
      <div className="mb-4">
        <BeforeAfter proposal={proposal} routeNum={routeNum} />
      </div>

      {/* Full support breakdown */}
      <div className="mb-4">
        <p className="text-xs font-display font-semibold text-neutral-500 mb-2">
          Public Support Breakdown
        </p>
        <SupportBar data={proposal} />
        <p className="text-[10px] text-neutral-400 font-mono mt-1">
          N = {formatNumber(proposal.n)} respondents
        </p>
      </div>

      {/* Detailed percentages */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Strongly support', val: proposal.ss, color: '#2D9F4F' },
          { label: 'Somewhat support', val: proposal.sws, color: '#6FCF7C' },
          { label: 'Neither', val: proposal.nei, color: '#9CA3AF' },
          { label: 'Somewhat oppose', val: proposal.swo, color: '#F5A623' },
          { label: 'Strongly oppose', val: proposal.sto, color: '#D63031' },
          { label: "Don't know", val: proposal.dk, color: '#D1D5DB' },
        ].map(({ label, val, color }) => (
          <div key={label} className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm font-mono font-semibold text-neutral-700">
                {val}%
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Action reference */}
      {proposal.action && (
        <p className="text-xs text-neutral-500 mb-3">
          <span className="font-semibold">Action:</span>{' '}
          <span className="font-mono">{proposal.action}</span>
        </p>
      )}

      {/* View on map button */}
      <button onClick={handleViewOnMap} className="btn-primary w-full text-xs">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="m9 20-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13 6-3m-6 3V7m6 10 4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        View on Map
      </button>
    </div>
  );
}
