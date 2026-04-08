import useStore from '../../store';
import { NAV_ITEMS } from '../../constants';

export default function Sidebar() {
  const { activeView, setActiveView } = useStore();

  return (
    <aside
      className="hidden lg:flex flex-col w-16 bg-white border-r border-neutral-200 pt-14"
      aria-label="Main navigation"
    >
      <nav className="flex flex-col items-center gap-1 pt-4 px-2">
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all
                ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600'
                }`}
              aria-current={isActive ? 'page' : undefined}
              title={label}
            >
              <span className="text-[10px] font-display font-semibold">{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
