import { CHANGE_TYPES } from '../../constants';

export default function FilterPanel({
  filterType,
  onFilterType,
  sortBy,
  onSortBy,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Type filter pills */}
      <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-0.5">
        {[
          { id: 'all', label: 'All' },
          { id: 'new', label: 'New' },
          { id: 'modify', label: 'Modified' },
          { id: 'remove', label: 'Removed' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onFilterType(id)}
            className={`px-3 py-1 rounded-md text-xs font-display font-medium transition-all
              ${filterType === id
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
              }`}
            aria-pressed={filterType === id}
          >
            {id !== 'all' && (
              <span
                className="inline-block w-2 h-2 rounded-full mr-1.5"
                style={{ backgroundColor: CHANGE_TYPES[id]?.color }}
              />
            )}
            {label}
          </button>
        ))}
      </div>

      {/* Sort select */}
      <select
        value={sortBy}
        onChange={(e) => onSortBy(e.target.value)}
        className="text-xs font-body text-neutral-600 bg-neutral-100 border-0 rounded-lg px-3 py-1.5 cursor-pointer focus:ring-2 focus:ring-secondary"
        aria-label="Sort proposals by"
      >
        <option value="net">Sort: Net Support</option>
        <option value="name">Sort: Route Name</option>
        <option value="n">Sort: Sample Size</option>
      </select>
    </div>
  );
}
