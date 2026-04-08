import useStore from '../../store';
import { NAV_ITEMS } from '../../constants';

const ICONS = {
  map: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="m9 20-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13 6-3m-6 3V7m6 10 4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  route: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="M13 7h8m0 0v8m0-8-8 8-4-4-6 6" />
    </svg>
  ),
  dashboard: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  timeline: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
};

export default function BottomNav() {
  const { activeView, setActiveView } = useStore();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 lg:hidden"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-16 px-2 pb-safe">
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl transition-all
                ${isActive
                  ? 'text-primary'
                  : 'text-neutral-400 hover:text-neutral-600'
                }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={label}
            >
              {ICONS[id]}
              <span className="text-[10px] font-display font-medium">{label}</span>
              {isActive && (
                <span className="w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
