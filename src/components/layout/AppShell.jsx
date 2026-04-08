import { lazy, Suspense } from 'react';
import useStore from '../../store';
import Header from './Header';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';
import UpdateBanner from './UpdateBanner';
import SearchOverlay from '../shared/SearchOverlay';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorBoundary from '../shared/ErrorBoundary';
import useServiceWorker from '../../hooks/useServiceWorker';

// Lazy-loaded views per spec section 9 (code splitting)
const MapView = lazy(() => import('../../views/MapView'));
const RoutesView = lazy(() => import('../../views/RoutesView'));
const DashboardView = lazy(() => import('../../views/DashboardView'));
const TimelineView = lazy(() => import('../../views/TimelineView'));

const VIEW_MAP = {
  map: MapView,
  routes: RoutesView,
  dashboard: DashboardView,
  timeline: TimelineView,
};

function ViewFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function AppShell() {
  const { activeView } = useStore();
  const { updateAvailable, applyUpdate } = useServiceWorker();
  const ActiveComponent = VIEW_MAP[activeView] || MapView;

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {updateAvailable && <UpdateBanner onUpdate={applyUpdate} />}
      <SearchOverlay />

      <div className="flex flex-1 pt-14 pb-16 lg:pb-0">
        <Sidebar />
        <main className="flex-1 relative overflow-hidden">
          <ErrorBoundary>
            <Suspense fallback={<ViewFallback />}>
              <ActiveComponent />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      <BottomNav />

      {/* Screen reader announcer */}
      <div id="sr-announcer" className="sr-only" aria-live="polite" aria-atomic="true" />
    </div>
  );
}
