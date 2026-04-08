import useStore from '../../store';

const PHASES = [
  { id: 'all', label: 'All Phases' },
  { id: 'near-term', label: 'Near-Term', years: '2026–2028', color: '#2D9F4F' },
  { id: 'medium-term', label: 'Medium-Term', years: '2028–2032', color: '#00B4D8' },
  { id: 'long-term', label: 'Long-Term', years: '2032–2041', color: '#6B7280' },
];

export default function PhaseFilter() {
  const { timelinePhaseFilter, setTimelinePhaseFilter } = useStore();

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
      {PHASES.map(({ id, label, years, color }) => (
        <button
          key={id}
          onClick={() => setTimelinePhaseFilter(id)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-medium transition-all
            ${timelinePhaseFilter === id
              ? 'bg-primary text-white shadow-sm'
              : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            }`}
          aria-pressed={timelinePhaseFilter === id}
        >
          {color && (
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: timelinePhaseFilter === id ? '#fff' : color }}
            />
          )}
          {label}
          {years && (
            <span className={`text-[10px] ${timelinePhaseFilter === id ? 'text-white/70' : 'text-neutral-400'}`}>
              {years}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
