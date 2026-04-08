export default function EngagementStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="card p-4">
        <h4 className="font-display font-semibold text-sm text-neutral-700 mb-2">
          Phase 1 — Understanding Issues
        </h4>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">Engagement events</span>
            <span className="font-mono font-semibold text-neutral-700">38</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">Event participants</span>
            <span className="font-mono font-semibold text-neutral-700">1,800+</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">Survey responses</span>
            <span className="font-mono font-semibold text-neutral-700">5,100+</span>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <h4 className="font-display font-semibold text-sm text-neutral-700 mb-2">
          Phase 2 — Proposed Changes
        </h4>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">In-person events</span>
            <span className="font-mono font-semibold text-neutral-700">24</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">People spoken to</span>
            <span className="font-mono font-semibold text-neutral-700">1,600+</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">Validated responses</span>
            <span className="font-mono font-semibold text-neutral-700">4,200+</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">Youth events (CityHive)</span>
            <span className="font-mono font-semibold text-neutral-700">6</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">Virtual presentations</span>
            <span className="font-mono font-semibold text-neutral-700">6</span>
          </div>
        </div>
      </div>

      <div className="card p-4 sm:col-span-2">
        <h4 className="font-display font-semibold text-sm text-neutral-700 mb-2">
          Key Outcomes
        </h4>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">Proposals with majority support</span>
            <span className="font-mono font-semibold text-success">52 of 59</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">Proposals with more opposition than support</span>
            <span className="font-mono font-semibold text-danger">7</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">Routes modified after feedback</span>
            <span className="font-mono font-semibold text-accent">17</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-body">Languages translated</span>
            <span className="font-mono font-semibold text-neutral-700">EN, ZH, PA, ES</span>
          </div>
        </div>
      </div>
    </div>
  );
}
