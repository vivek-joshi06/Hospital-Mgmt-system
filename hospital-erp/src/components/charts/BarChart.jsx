// ============================================================
// Reusable SVG Bar Chart
// ============================================================
import { motion } from 'framer-motion';

export default function BarChart({
  data,           // [{ label, value, color? }]
  height = 180,
  color = '#4F46E5',
  showValues = true,
  unit = '',
  title,
}) {
  if (!data || data.length === 0) return null;

  const max    = Math.max(...data.map((d) => d.value), 1);
  const BAR_W  = 100 / data.length;
  const GAP    = 0.3;

  return (
    <div>
      {title && (
        <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          {title}
        </div>
      )}
      <div style={{ position: 'relative', height }}>
        {/* Y-axis guide lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
          <div
            key={pct}
            style={{
              position: 'absolute',
              left: 0, right: 0,
              bottom: `${pct * 100}%`,
              borderTop: `1px dashed ${pct === 0 ? '#E2E8F0' : '#F1F5F9'}`,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 9, color: '#CBD5E1', paddingRight: 4, background: 'transparent', lineHeight: 0, position: 'absolute', right: '100%', whiteSpace: 'nowrap' }}>
              {Math.round(max * pct)}{unit}
            </span>
          </div>
        ))}

        {/* Bars */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            gap: `${GAP}%`,
            padding: '0 4px',
          }}
        >
          {data.map((d, i) => {
            const pct = max > 0 ? (d.value / max) * 100 : 0;
            const barColor = d.color || color;
            return (
              <div
                key={i}
                className="group"
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                  position: 'relative',
                  cursor: 'default',
                }}
              >
                {/* Tooltip */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: `${pct + 4}%`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#0F172A',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '3px 7px',
                    borderRadius: 6,
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    pointerEvents: 'none',
                    zIndex: 10,
                    transition: 'opacity 0.15s',
                  }}
                  className="bar-tooltip"
                >
                  {d.value}{unit}
                </div>
                <style>{`.group:hover .bar-tooltip { opacity: 1; }`}</style>

                {/* Bar itself */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    width: '100%',
                    background: `linear-gradient(180deg, ${barColor}CC 0%, ${barColor} 100%)`,
                    borderRadius: '6px 6px 2px 2px',
                    minHeight: pct > 0 ? 4 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* X Labels */}
      <div style={{ display: 'flex', gap: `${GAP}%`, padding: '6px 4px 0', marginTop: 2 }}>
        {data.map((d, i) => (
          <div
            key={i}
            style={{ flex: 1, textAlign: 'center', fontSize: 10, color: '#94A3B8', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}
