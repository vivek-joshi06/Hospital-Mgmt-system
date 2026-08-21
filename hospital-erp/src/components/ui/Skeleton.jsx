// ============================================================
// Skeleton Loader Components
// ============================================================

export function SkeletonLine({ width = '100%', height = 14, className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height: `${height}px` }}
    />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`card p-5 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="skeleton rounded-full" style={{ width: 40, height: 40 }} />
        <div className="flex-1 space-y-2">
          <SkeletonLine width="60%" />
          <SkeletonLine width="40%" height={10} />
        </div>
      </div>
      <SkeletonLine className="mb-2" />
      <SkeletonLine width="80%" />
    </div>
  );
}

export function SkeletonRow({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} style={{ padding: '14px 20px' }}>
          <SkeletonLine width={i === 0 ? '70%' : '50%'} />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonStatCard({ className = '' }) {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <SkeletonLine width={100} />
        <div className="skeleton rounded-xl" style={{ width: 44, height: 44 }} />
      </div>
      <SkeletonLine width={80} height={28} className="mb-1" />
      <SkeletonLine width={120} height={11} />
    </div>
  );
}
