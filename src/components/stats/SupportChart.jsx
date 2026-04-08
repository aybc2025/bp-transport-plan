import { useMemo, useState } from 'react';
import useSurveyData from '../../hooks/useSurveyData';
import { CHANGE_TYPES } from '../../constants';
import FilterPanel from '../shared/FilterPanel';
import SkeletonCard from '../shared/SkeletonCard';

const BAR_COLORS = [
  { key: 'ss', color: '#2D9F4F', label: 'Strongly support' },
  { key: 'sws', color: '#6FCF7C', label: 'Somewhat support' },
  { key: 'nei', color: '#D1D5DB', label: 'Neither' },
  { key: 'swo', color: '#F5A623', label: 'Somewhat oppose' },
  { key: 'sto', color: '#D63031', label: 'Strongly oppose' },
  { key: 'dk', color: '#E5E7EB', label: "Don't know" },
];

export default function SupportChart() {
  const { surveyData, loading } = useSurveyData();
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('net');

  const sorted = useMemo(() => {
    if (!surveyData) return [];
    let items = [...surveyData.proposals];
    if (filterType !== 'all') items = items.filter((p) => p.type === filterType);
    if (sortBy === 'net') items.sort((a, b) => b.net - a.net);
    else if (sortBy === 'name') items.sort((a, b) => a.label.localeCompare(b.label));
    else if (sortBy === 'n') items.sort((a, b) => b.n - a.n);
    return items;
  }, [surveyData, filterType, sortBy]);

  if (loading) return <SkeletonCard lines={5} />;

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-3">
        {BAR_COLORS.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-neutral-500">{label}</span>
          </div>
        ))}
      </div>

      <FilterPanel
        filterType={filterType}
        onFilterType={setFilterType}
        sortBy={sortBy}
        onSortBy={setSortBy}
      />

      {/* Chart */}
      <div className="mt-3 space-y-1">
        {sorted.map((p) => {
          const ct = CHANGE_TYPES[p.type] || CHANGE_TYPES.modify;
          const routeNum = p.label
            .replace(/^(New Route |Route )/, '')
            .replace(/ (Changes|Removal)$/, '');

          return (
            <div key={p.label} className="flex items-center gap-2 group">
              {/* Route label */}
              <div className="w-16 flex-shrink-0 text-right">
                <span
                  className="inline-flex items-center justify-center px-1.5 py-0.5
                             font-mono text-[10px] font-semibold rounded text-white"
                  style={{ backgroundColor: ct.color }}
                >
                  {routeNum}
                </span>
              </div>

              {/* Bar */}
              <div className="flex-1 flex h-4 rounded-sm overflow-hidden bg-neutral-50 group-hover:ring-1 group-hover:ring-secondary/30 transition-all">
                {BAR_COLORS.map(({ key, color }) => {
                  const pct = p[key] || 0;
                  if (pct === 0) return null;
                  return (
                    <div
                      key={key}
                      className="support-bar-fill"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: color,
                      }}
                      title={`${pct}%`}
                    />
                  );
                })}
              </div>

              {/* Net */}
              <span
                className="w-10 text-right font-mono text-[11px] font-semibold flex-shrink-0"
                style={{
                  color: p.net >= 0 ? '#2D9F4F' : '#D63031',
                }}
              >
                {p.net > 0 ? '+' : ''}{p.net}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
