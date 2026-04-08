import usePlanData from '../../hooks/usePlanData';
import GoalCard from './GoalCard';
import ActionDetail from './ActionDetail';
import SkeletonCard from '../shared/SkeletonCard';

export default function BusServiceTab() {
  const { planActions, loading } = usePlanData();

  if (loading) {
    return <div className="space-y-3"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>;
  }

  const actions = planActions?.actions || [];
  const goal1 = actions.filter((a) => a.goal === 1);
  const goal2 = actions.filter((a) => a.goal === 2);
  const goal3 = actions.filter((a) => a.goal === 3);

  return (
    <div className="space-y-3 pb-4">
      {/* Summary badge */}
      <div className="flex items-center gap-2 mb-2">
        <span className="pill bg-accent/10 text-accent font-mono">
          59 routes changing
        </span>
        <span className="pill bg-success/10 text-success font-mono">
          10 new limited-stop routes
        </span>
      </div>

      <GoalCard
        number="1"
        title="Integrate the Bus Network with Rapid Transit"
        description="Restructure bus routes to connect with new SkyTrain stations and rapid transit infrastructure."
      >
        <div className="space-y-0">
          {goal1.map((action) => (
            <ActionDetail key={action.id} action={action} />
          ))}
        </div>
      </GoalCard>

      <GoalCard
        number="2"
        title="Improve Bus Service to More Destinations"
        description="New routes and modifications to serve more areas including downtown, Stanley Park, and North Shore."
      >
        <div className="space-y-0">
          {goal2.map((action) => (
            <ActionDetail key={action.id} action={action} />
          ))}
        </div>
      </GoalCard>

      <GoalCard
        number="3"
        title="Make Transit Faster and More Reliable"
        description="Increase frequency, implement transit priority infrastructure, and add limited-stop overlay routes."
      >
        <div className="space-y-0">
          {goal3.map((action) => (
            <ActionDetail key={action.id} action={action} />
          ))}
        </div>
      </GoalCard>
    </div>
  );
}
