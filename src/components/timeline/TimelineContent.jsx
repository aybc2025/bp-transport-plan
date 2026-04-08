import { useState, useEffect, useMemo } from 'react';
import useStore from '../../store';
import { DATA_PATHS } from '../../constants';
import PhaseFilter from './PhaseFilter';
import TimelineNode from './TimelineNode';
import SkeletonCard from '../shared/SkeletonCard';

// Map milestone phases based on year
function getPhase(year) {
  const y = typeof year === 'number' ? year : parseInt(year, 10);
  if (isNaN(y)) return 'long-term';
  if (y <= 2028) return 'near-term';
  if (y <= 2032) return 'medium-term';
  return 'long-term';
}

export default function TimelineContent() {
  const { dataCache, setDataCache, timelinePhaseFilter } = useStore();
  const [loading, setLoading] = useState(!dataCache.timelineEvents);

  useEffect(() => {
    if (dataCache.timelineEvents) return;
    fetch(DATA_PATHS.timelineEvents)
      .then((r) => r.json())
      .then((data) => {
        setDataCache('timelineEvents', data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dataCache.timelineEvents, setDataCache]);

  const timelineData = dataCache.timelineEvents;

  const filtered = useMemo(() => {
    if (!timelineData) return [];
    let milestones = [...timelineData.milestones];

    // Sort by year
    milestones.sort((a, b) => {
      const ya = typeof a.year === 'number' ? a.year : parseInt(a.year, 10) || 9999;
      const yb = typeof b.year === 'number' ? b.year : parseInt(b.year, 10) || 9999;
      return ya - yb;
    });

    // Filter by phase
    if (timelinePhaseFilter !== 'all') {
      milestones = milestones.filter((m) => getPhase(m.year) === timelinePhaseFilter);
    }

    return milestones;
  }, [timelineData, timelinePhaseFilter]);

  if (loading) {
    return <div className="space-y-3"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>;
  }

  // Phase summary cards
  const phases = timelineData?.phases || [];

  return (
    <div>
      {/* Phase filter */}
      <div className="mb-4">
        <PhaseFilter />
      </div>

      {/* Phase description cards */}
      {timelinePhaseFilter !== 'all' && (
        <div className="mb-4">
          {phases
            .filter((p) => p.id === timelinePhaseFilter)
            .map((p) => (
              <div key={p.id} className="card-compact bg-primary/5 border-primary/20">
                <p className="font-display font-semibold text-xs text-primary">{p.label}</p>
                <p className="text-xs text-neutral-500 font-body mt-0.5">{p.description}</p>
              </div>
            ))}
        </div>
      )}

      {/* Count */}
      <p className="text-xs text-neutral-400 font-mono mb-3">
        {filtered.length} milestone{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Timeline nodes */}
      <div className="ml-2">
        {filtered.map((milestone, i) => (
          <TimelineNode
            key={milestone.id}
            milestone={milestone}
            isLast={i === filtered.length - 1}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-neutral-400">No milestones in this phase.</p>
          </div>
        )}
      </div>
    </div>
  );
}
