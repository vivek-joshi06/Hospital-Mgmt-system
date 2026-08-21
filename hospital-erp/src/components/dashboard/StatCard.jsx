// ============================================================
// StatCard — Bento-style metric card
// ============================================================
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  trend,         // { value: number, label: string }
  accent,        // hex color for gradient dot
  delay = 0,
  wide = false,
  className = '',
}) {
  const trendPositive = trend?.value > 0;
  const trendNeutral  = trend?.value === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      className={`card p-5 relative overflow-hidden group ${className}`}
      style={{ gridColumn: wide ? 'span 2' : undefined }}
    >
      {/* Decorative glow blob */}
      {accent && (
        <div
          className="stat-glow"
          style={{
            width: 80, height: 80,
            background: accent,
            top: -20, right: -20,
          }}
        />
      )}

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {label}
        </span>
        {Icon && (
          <div
            className="flex items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
            style={{ width: 40, height: 40, background: iconBg || '#EEF2FF' }}
          >
            <Icon size={18} color={iconColor || '#4F46E5'} />
          </div>
        )}
      </div>

      {/* Value */}
      <div style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
        {value}
      </div>

      {/* Trend */}
      {trend && (
        <div className="flex items-center gap-1.5 mt-2">
          {trendNeutral ? (
            <Minus size={12} color="#94A3B8" />
          ) : trendPositive ? (
            <TrendingUp size={12} color="#22C55E" />
          ) : (
            <TrendingDown size={12} color="#EF4444" />
          )}
          <span
            style={{
              fontSize: 12, fontWeight: 600,
              color: trendNeutral ? '#94A3B8' : trendPositive ? '#22C55E' : '#EF4444',
            }}
          >
            {trendPositive ? '+' : ''}{trend.value}%
          </span>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>{trend.label}</span>
        </div>
      )}
    </motion.div>
  );
}
