import { lazy, Suspense, useRef, useEffect, useState } from 'react';
import useStore from '../../store';
import { DASHBOARD_TABS } from '../../constants';
import LoadingSpinner from '../shared/LoadingSpinner';

const BusServiceTab = lazy(() => import('./BusServiceTab'));
const ActiveTransportTab = lazy(() => import('./ActiveTransportTab'));
const GoodsMovementTab = lazy(() => import('./GoodsMovementTab'));
const EngagementTab = lazy(() => import('./EngagementTab'));

const TAB_COMPONENTS = {
  bus: BusServiceTab,
  active: ActiveTransportTab,
  goods: GoodsMovementTab,
  engagement: EngagementTab,
};

export default function TabContainer() {
  const { activeDashboardTab, setActiveDashboardTab } = useStore();
  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // Animate tab indicator
  useEffect(() => {
    const el = tabRefs.current[activeDashboardTab];
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeDashboardTab]);

  const ActiveTab = TAB_COMPONENTS[activeDashboardTab] || BusServiceTab;

  return (
    <div>
      {/* Tab bar */}
      <div className="relative border-b border-neutral-200 mb-4">
        <div className="flex gap-0 overflow-x-auto scrollbar-none">
          {DASHBOARD_TABS.map(({ id, label, goals }) => (
            <button
              key={id}
              ref={(el) => (tabRefs.current[id] = el)}
              onClick={() => setActiveDashboardTab(id)}
              className={`flex-shrink-0 px-4 py-2.5 text-sm font-display font-medium transition-colors whitespace-nowrap
                ${activeDashboardTab === id
                  ? 'text-primary'
                  : 'text-neutral-400 hover:text-neutral-600'
                }`}
              role="tab"
              aria-selected={activeDashboardTab === id}
              aria-controls={`tabpanel-${id}`}
            >
              {label}
              {goals && (
                <span className="ml-1.5 text-[10px] text-neutral-300 font-mono">
                  {goals}
                </span>
              )}
            </button>
          ))}
        </div>
        {/* Animated indicator */}
        <div
          className="absolute bottom-0 h-0.5 bg-primary rounded-full tab-indicator"
          style={indicatorStyle}
        />
      </div>

      {/* Tab content */}
      <div role="tabpanel" id={`tabpanel-${activeDashboardTab}`}>
        <Suspense
          fallback={
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          }
        >
          <ActiveTab />
        </Suspense>
      </div>
    </div>
  );
}
