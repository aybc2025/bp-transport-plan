import { useState, useEffect } from 'react';
import GoalCard from './GoalCard';
import { DATA_PATHS } from '../../constants';
import useStore from '../../store';

export default function ActiveTransportTab() {
  const { dataCache, setDataCache } = useStore();
  const [cyclingData, setCyclingData] = useState(dataCache.cyclingGaps || null);

  useEffect(() => {
    if (dataCache.cyclingGaps) {
      setCyclingData(dataCache.cyclingGaps);
      return;
    }
    fetch(DATA_PATHS.cyclingGaps)
      .then((r) => r.json())
      .then((data) => {
        setDataCache('cyclingGaps', data);
        setCyclingData(data);
      })
      .catch(() => {});
  }, [dataCache.cyclingGaps, setDataCache]);

  return (
    <div className="space-y-3 pb-4">
      <GoalCard
        number="4"
        title="Make Walking to Transit Safer and More Comfortable"
        description="Improve sidewalk completion within 800m of major transit stations, enhance crossings and pedestrian infrastructure."
      >
        <div className="space-y-2 mt-2">
          <div className="card-compact">
            <p className="font-display font-semibold text-xs text-neutral-700 mb-1">
              Walking Infrastructure (WITT)
            </p>
            <p className="text-xs text-neutral-500 font-body">
              The Walking Infrastructure to Transit program funds sidewalk construction, crossing improvements,
              and pedestrian-scale lighting near transit stops and stations.
            </p>
          </div>
          <div className="card-compact">
            <p className="font-display font-semibold text-xs text-neutral-700 mb-1">
              800m Station Walksheds
            </p>
            <p className="text-xs text-neutral-500 font-body">
              TransLink targets complete sidewalk networks within 800 metres of all major transit
              stations and bus exchanges to ensure safe walking access.
            </p>
          </div>
        </div>
      </GoalCard>

      <GoalCard
        number="5"
        title="Build Out the Major Bikeway Network"
        description="Address 46 priority gaps in the cycling network across the Burrard Peninsula."
      >
        <div className="mt-2">
          {/* Cycling stats */}
          {cyclingData && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center p-2 bg-primary/5 rounded-lg">
                <p className="font-mono font-bold text-lg text-primary">{cyclingData.stats.totalGaps}</p>
                <p className="text-[10px] text-neutral-500">Total Gaps</p>
              </div>
              <div className="text-center p-2 bg-danger/5 rounded-lg">
                <p className="font-mono font-bold text-lg text-danger">{cyclingData.stats.highPriority}</p>
                <p className="text-[10px] text-neutral-500">High Priority</p>
              </div>
              <div className="text-center p-2 bg-accent/5 rounded-lg">
                <p className="font-mono font-bold text-lg text-accent">{cyclingData.stats.mediumPriority}</p>
                <p className="text-[10px] text-neutral-500">Medium</p>
              </div>
            </div>
          )}

          {/* Priority gaps list */}
          {cyclingData?.gaps?.slice(0, 8).map((gap) => (
            <div
              key={gap.id}
              className="flex items-center gap-2 py-1.5 border-b border-neutral-100 last:border-0"
            >
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  gap.priority === 'high' ? 'bg-danger' : 'bg-accent'
                }`}
              />
              <span className="text-xs font-body text-neutral-700 flex-1">
                {gap.name}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                {gap.municipality}
              </span>
            </div>
          ))}

          <div className="card-compact mt-3">
            <p className="font-display font-semibold text-xs text-neutral-700 mb-1">
              BICCS Program
            </p>
            <p className="text-xs text-neutral-500 font-body">
              The Bicycle Infrastructure Capital Cost Sharing program provides funding to local
              governments to build cycling infrastructure on or connecting to the Major Bikeway Network.
            </p>
          </div>
        </div>
      </GoalCard>
    </div>
  );
}
