export default function UpdateBanner({ onUpdate }) {
  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-primary text-white rounded-xl shadow-lg">
        <span className="text-sm font-body">New version available</span>
        <button
          onClick={onUpdate}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-display font-semibold transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  );
}
