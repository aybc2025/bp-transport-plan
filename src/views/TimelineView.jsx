import TimelineContent from '../components/timeline/TimelineContent';

export default function TimelineView() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="mb-4">
          <h2 className="font-display font-bold text-xl text-neutral-900 mb-1">
            Implementation Timeline
          </h2>
          <p className="body-text">
            When changes happen — milestones, triggers, and dependencies across three phases.
          </p>
        </div>
        <TimelineContent />
      </div>
    </div>
  );
}
