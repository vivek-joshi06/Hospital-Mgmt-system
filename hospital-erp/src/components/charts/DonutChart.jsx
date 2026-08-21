// ============================================================
// Reusable SVG Donut Chart
// ============================================================
import { motion } from 'framer-motion';

export default function DonutChart({
  data,           // [{ label, value, color }]
  size = 160,
  thickness = 28,
  centerLabel,
  centerValue,
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r     = (size - thickness) / 2;
  const cx    = size / 2;
  const cy    = size / 2;
  const circ  = 2 * Math.PI * r;

  // Build segments
  let cumulativePct = 0;
  const segments = data.map((d) => {
    const pct = d.value / total;
    const seg = {
      ...d,
      pct,
      offset:    cumulativePct * circ,
      dashArray: pct * circ,
      gap:       (1 - pct) * circ,
    };
    cumulativePct += pct;
    return seg;
  });

  // Start from top (rotate -90deg)
  return (
    <div className="flex items-center gap-6">
      {/* Donut */}
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background ring */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={thickness}
          />
          {/* Segments */}
          {segments.map((seg, i) => (
            <motion.circle
              key={seg.label}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${seg.dashArray} ${seg.gap}`}
              strokeDashoffset={-seg.offset}
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${circ}` }}
              animate={{ strokeDasharray: `${seg.dashArray} ${seg.gap}` }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            />
          ))}
        </svg>
        {/* Center label */}
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {centerValue !== undefined && (
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
              {centerValue}
            </div>
          )}
          {centerLabel && (
            <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, marginTop: 2, textAlign: 'center' }}>
              {centerLabel}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2.5 flex-1">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#374151', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {d.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{d.value}</span>
              <span style={{ fontSize: 10, color: '#94A3B8' }}>
                ({Math.round((d.value / total) * 100)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
