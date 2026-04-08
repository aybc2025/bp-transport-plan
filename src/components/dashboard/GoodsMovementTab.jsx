import GoalCard from './GoalCard';

export default function GoodsMovementTab() {
  return (
    <div className="space-y-3 pb-4">
      <GoalCard
        number="6"
        title="Protect and Enhance the Goods Movement Network"
        description="Maintain key freight corridors while balancing the needs of all road users."
      >
        <div className="space-y-2 mt-2">
          <div className="card-compact">
            <p className="font-display font-semibold text-xs text-neutral-700 mb-1">
              Action 6.1 — Protect Goods Movement Corridors
            </p>
            <p className="text-xs text-neutral-500 font-body">
              Work with local governments to protect and maintain the Major Road Network
              and Regional Truck Route Network for efficient goods movement.
            </p>
          </div>
          <div className="card-compact">
            <p className="font-display font-semibold text-xs text-neutral-700 mb-1">
              Truck Route Planner
            </p>
            <p className="text-xs text-neutral-500 font-body">
              TransLink and the Province developed an online tool to help commercial vehicle
              operators plan safe, viable routes based on vehicle dimensions, bylaws, and height clearances.
            </p>
          </div>
        </div>
      </GoalCard>

      <GoalCard
        number="7"
        title="Make Goods Movement More Reliable"
        description="Improve reliability through freight priority measures and better coordination with local governments."
      >
        <div className="space-y-2 mt-2">
          <div className="card-compact">
            <p className="font-display font-semibold text-xs text-neutral-700 mb-1">
              Action 7.1 — Freight Priority Measures
            </p>
            <p className="text-xs text-neutral-500 font-body">
              Explore freight priority on key corridors, better use of off-peak road capacity,
              and consistent truck route designations across the region.
            </p>
          </div>
          <div className="card-compact">
            <p className="font-display font-semibold text-xs text-neutral-700 mb-1">
              Action 7.2 — Mitigate Impacts of Road Space Changes
            </p>
            <p className="text-xs text-neutral-500 font-body">
              Minimize impacts on goods movement from People-first Streets by supporting
              loading zones, alternate truck routes, and infrastructure upgrades.
            </p>
          </div>
        </div>
      </GoalCard>

      <GoalCard
        number="8"
        title="Reduce Emissions from Goods Movement"
        description="Transition to zero-emission freight vehicles and make urban deliveries more efficient."
      >
        <div className="space-y-2 mt-2">
          <div className="card-compact">
            <p className="font-display font-semibold text-xs text-neutral-700 mb-1">
              Action 8.1 — Zero-Emission Freight Transition
            </p>
            <p className="text-xs text-neutral-500 font-body">
              Work with Metro Vancouver and the Province to advance regulatory tools, incentivize
              zero-emission vehicles, and support cargo/delivery bikes for last-mile logistics.
            </p>
          </div>
          <div className="card-compact">
            <p className="font-display font-semibold text-xs text-neutral-700 mb-1">
              Action 8.2 — Neighbourhood Logistics Hubs
            </p>
            <p className="text-xs text-neutral-500 font-body">
              Support development of local consolidation hubs for parcels and explore street
              design that accommodates emerging freight technology including automated vehicles.
            </p>
          </div>
        </div>
      </GoalCard>
    </div>
  );
}
