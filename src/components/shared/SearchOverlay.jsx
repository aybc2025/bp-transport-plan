import { useState, useEffect, useRef } from 'react';
import useStore from '../../store';
import useSearch from '../../hooks/useSearch';
import { CHANGE_TYPES } from '../../constants';

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, setActiveView, setRouteSearchQuery } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const results = useSearch(query);

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && searchOpen) setSearchOpen(false);
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const hasResults =
    results.routes.length > 0 ||
    results.stops.length > 0 ||
    results.areas.length > 0;

  function handleRouteClick(proposal) {
    setRouteSearchQuery(proposal.label.replace(/^(New Route |Route )/, '').replace(/ (Changes|Removal)$/, ''));
    setActiveView('routes');
    setSearchOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setSearchOpen(false)}
      />

      {/* Search panel */}
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100">
          <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search routes, stops, neighbourhoods..."
            className="flex-1 text-sm font-body outline-none bg-transparent text-neutral-900 placeholder:text-neutral-400"
            aria-label="Search the transport plan"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-100 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.length > 0 && !hasResults && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-neutral-400">No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}

          {results.routes.length > 0 && (
            <div className="px-2 py-2">
              <p className="px-2 py-1 text-[11px] font-display font-semibold text-neutral-400 uppercase tracking-wider">
                Route Changes
              </p>
              {results.routes.map((r) => {
                const ct = CHANGE_TYPES[r.type] || CHANGE_TYPES.modify;
                return (
                  <button
                    key={r.label}
                    onClick={() => handleRouteClick(r)}
                    className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-neutral-50 text-left transition-colors"
                  >
                    <span
                      className="route-badge text-white text-xs"
                      style={{ backgroundColor: ct.color }}
                    >
                      {r.label.replace(/^(New Route |Route )/, '').replace(/ (Changes|Removal)$/, '')}
                    </span>
                    <span className="flex-1 text-sm text-neutral-700 truncate">{r.label}</span>
                    <span className="text-xs font-mono text-neutral-400">
                      {r.net > 0 ? '+' : ''}{r.net}%
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {results.areas.length > 0 && (
            <div className="px-2 py-2 border-t border-neutral-100">
              <p className="px-2 py-1 text-[11px] font-display font-semibold text-neutral-400 uppercase tracking-wider">
                Neighbourhoods
              </p>
              {results.areas.map((a) => (
                <button
                  key={a.name}
                  onClick={() => setSearchOpen(false)}
                  className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-neutral-50 text-left transition-colors"
                >
                  <span className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-xs">
                    ◎
                  </span>
                  <span className="text-sm text-neutral-700">{a.name}</span>
                </button>
              ))}
            </div>
          )}

          {results.stops.length > 0 && (
            <div className="px-2 py-2 border-t border-neutral-100">
              <p className="px-2 py-1 text-[11px] font-display font-semibold text-neutral-400 uppercase tracking-wider">
                Stops
              </p>
              {results.stops.slice(0, 5).map((s) => (
                <button
                  key={s.stopId}
                  onClick={() => setSearchOpen(false)}
                  className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-neutral-50 text-left transition-colors"
                >
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs">
                    ●
                  </span>
                  <span className="text-sm text-neutral-700 truncate">{s.name}</span>
                  {s.code && (
                    <span className="text-xs font-mono text-neutral-400">#{s.code}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
