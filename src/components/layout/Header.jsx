import useStore from '../../store';

export default function Header() {
  const { setSearchOpen } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Logo/title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-display font-bold text-sm">T</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-sm text-neutral-900 leading-tight">
              BP Transport Plan
            </h1>
            <p className="text-[10px] text-neutral-400 font-body leading-tight">
              Burrard Peninsula · March 2026
            </p>
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
          aria-label="Open search"
        >
          <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-xs text-neutral-400 font-body hidden sm:inline">
            Search routes, stops...
          </span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-neutral-300 bg-white rounded border border-neutral-200">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
