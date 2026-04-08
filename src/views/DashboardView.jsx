import TabContainer from '../components/dashboard/TabContainer';

export default function DashboardView() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="mb-4">
          <h2 className="font-display font-bold text-xl text-neutral-900 mb-1">
            Transport Plan
          </h2>
          <p className="body-text">
            Burrard Peninsula Area Transport Plan — 8 goals, 17 actions, 59 route changes.
          </p>
        </div>
        <TabContainer />
      </div>
    </div>
  );
}
