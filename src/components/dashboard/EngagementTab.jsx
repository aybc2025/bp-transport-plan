import KeyNumbers from '../stats/KeyNumbers';
import EngagementStats from '../stats/EngagementStats';
import SupportChart from '../stats/SupportChart';

export default function EngagementTab() {
  return (
    <div className="space-y-6 pb-4">
      {/* Key numbers hero section */}
      <KeyNumbers />

      {/* Phase 1/2 participation breakdown */}
      <div>
        <h3 className="section-title mb-3">Participation Breakdown</h3>
        <EngagementStats />
      </div>

      {/* Full support chart */}
      <div>
        <h3 className="section-title mb-1">All 59 Proposals</h3>
        <p className="body-text mb-3">
          Support and opposition for every proposed route change, sorted by net support.
        </p>
        <SupportChart />
      </div>
    </div>
  );
}
