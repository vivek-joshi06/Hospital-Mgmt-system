// ============================================================
// Reusable SVG Area / Line Chart
// ============================================================
import { motion } from 'framer-motion';

export default function AreaChart({
  data,           // [{ label, value, value2? }]
  height = 200,
  color = '#4F46E5',
  color2,
  label2,
  unit = '',
  title,
  gradient = true,
}) {
  if (!data || data.length < 2) return null;

  const W   = 800;   // viewBox width
  const H   = height;
  const PAD = { top: 16, right: 20, bottom: 32, left: 40 };
  const IW  = W - PAD.left - PAD.right;
  const IH  = H - PAD.top  - PAD.bottom;

  const allValues  = [...data.map((d) => d.value), ...(color2 ? data.map((d) => d.value2 || 0) : [])];
  const max        = Math.max(...allValues, 1);
  const yGuides    = [0, 0.25, 0.5, 0.75, 1];

  const xFor = (i) => PAD.left + (i / (data.length - 1)) * IW;
  const yFor = (v) => PAD.top  + IH - (v / max) * IH;

  const buildPath = (vals) =>
    vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i).toFixed(1)},${yFor(v).toFixed(1)}`).join(' ');

  const buildArea = (vals) => {
    const linePts = vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i).toFixed(1)},${yFor(v).toFixed(1)}`).join(' ');
    return `${linePts} L ${xFor(vals.length - 1).toFixed(1)},${(PAD.top + IH).toFixed(1)} L ${PAD.left.toFixed(1)},${(PAD.top + IH).toFixed(1)} Z`;
  };

  const linePath  = buildPath(data.map((d) => d.value));
  const areaPath  = buildArea(data.map((d) => d.value));
  const linePath2 = color2 ? buildPath(data.map((d) => d.value2 || 0)) : null;
  const areaPath2 = color2 ? buildArea(data.map((d) => d.value2 || 0)) : null;

  const uid = color.replace('#', '');

  return (
    <div>
      {title && (
        <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          {title}
        </div>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height, overflow: 'visible' }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`ag-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.01" />
          </linearGradient>
          {color2 && (
            <linearGradient id={`ag2-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={color2} stopOpacity="0.2" />
              <stop offset="100%" stopColor={color2} stopOpacity="0.01" />
            </linearGradient>
          )}
        </defs>

        {/* Y-axis guides */}
        {yGuides.map((pct) => {
          const y = PAD.top + IH - pct * IH;
          return (
            <g key={pct}>
              <line
                x1={PAD.left} y1={y} x2={PAD.left + IW} y2={y}
                stroke={pct === 0 ? '#E2E8F0' : '#F1F5F9'}
                strokeWidth={1}
                strokeDasharray={pct === 0 ? '0' : '4,4'}
              />
              <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize={10} fill="#CBD5E1">
                {Math.round(max * pct)}{unit}
              </text>
            </g>
          );
        })}

        {/* X labels */}
        {data.map((d, i) => (
          <text key={i} x={xFor(i)} y={PAD.top + IH + 18} textAnchor="middle" fontSize={10} fill="#94A3B8">
            {d.label}
          </text>
        ))}

        {/* Area fill 2 */}
        {areaPath2 && gradient && (
          <path d={areaPath2} fill={`url(#ag2-${uid})`} />
        )}
        {/* Area fill 1 */}
        {gradient && <path d={areaPath} fill={`url(#ag-${uid})`} />}

        {/* Line 2 */}
        {linePath2 && (
          <motion.path
            d={linePath2}
            fill="none"
            stroke={color2}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            strokeDasharray="1 0"
          />
        )}

        {/* Line 1 */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          strokeDasharray="1 0"
        />

        {/* Dots */}
        {data.map((d, i) => (
          <motion.circle
            key={i}
            cx={xFor(i)} cy={yFor(d.value)}
            r={3.5}
            fill={color} stroke="#fff" strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.04 }}
          />
        ))}
        {color2 && data.map((d, i) => (
          <motion.circle
            key={`d2-${i}`}
            cx={xFor(i)} cy={yFor(d.value2 || 0)}
            r={3.5}
            fill={color2} stroke="#fff" strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9 + i * 0.04 }}
          />
        ))}
      </svg>

      {/* Legend for dual lines */}
      {color2 && label2 && (
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div style={{ width: 20, height: 3, background: color, borderRadius: 99 }} />
            <span style={{ fontSize: 11, color: '#64748B' }}>Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div style={{ width: 20, height: 3, background: color2, borderRadius: 99 }} />
            <span style={{ fontSize: 11, color: '#64748B' }}>{label2}</span>
          </div>
        </div>
      )}
    </div>
  );
}
