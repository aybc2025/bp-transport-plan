export default function SkeletonCard({ lines = 3 }) {
  return (
    <div className="card p-4 animate-pulse" aria-hidden="true">
      <div className="h-5 bg-neutral-200 rounded w-2/3 mb-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-neutral-100 rounded mb-2"
          style={{ width: `${85 - i * 15}%` }}
        />
      ))}
    </div>
  );
}
