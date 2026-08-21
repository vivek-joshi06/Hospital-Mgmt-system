// ============================================================
// MiniBarChart — Lightweight SVG bar chart (no extra lib)
// ============================================================

export default function MiniBarChart({ data = [], valueKey = 'appointments', completedKey = 'completed' }) {
  const max = Math.max(...data.map((d) => d[valueKey]));
  const BAR_W = 18;
  const GAP   = 10;
  const H     = 80;
  const W     = data.length * (BAR_W + GAP);

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ overflow: 'visible' }}>
      {data.map((d, i) => {
        const totalH  = Math.round((d[valueKey]  / max) * H);
        const doneH   = Math.round((d[completedKey] / max) * H);
        const x = i * (BAR_W + GAP);
        return (
          <g key={d.day}>
            {/* Total bar (light) */}
            <rect
              x={x}
              y={H - totalH}
              width={BAR_W}
              height={totalH}
              rx={5}
              fill="#EEF2FF"
            />
            {/* Completed bar (primary) */}
            <rect
              x={x}
              y={H - doneH}
              width={BAR_W}
              height={doneH}
              rx={5}
              fill="url(#barGrad)"
            />
            {/* Day label */}
            <text
              x={x + BAR_W / 2}
              y={H + 14}
              textAnchor="middle"
              style={{ fontSize: 9, fill: '#94A3B8', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
            >
              {d.day}
            </text>
          </g>
        );
      })}
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}
