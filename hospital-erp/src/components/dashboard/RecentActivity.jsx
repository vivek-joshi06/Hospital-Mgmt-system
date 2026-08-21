// ============================================================
// RecentActivity — Activity feed card
// ============================================================
import { motion } from 'framer-motion';
import {
  CalendarDays, UserPlus, CheckCircle2, XCircle,
  Stethoscope, DollarSign, Edit, CalendarCheck,
} from 'lucide-react';
import { recentActivity } from '../../data/dummyData';

const ICON_MAP = {
  'calendar':       { Icon: CalendarDays,  bg: '#EEF2FF', color: '#4F46E5' },
  'user-plus':      { Icon: UserPlus,      bg: '#F0FDF4', color: '#16A34A' },
  'check-circle':   { Icon: CheckCircle2,  bg: '#F0FDF4', color: '#16A34A' },
  'x-circle':       { Icon: XCircle,       bg: '#FEF2F2', color: '#DC2626' },
  'stethoscope':    { Icon: Stethoscope,   bg: '#EFF6FF', color: '#2563EB' },
  'dollar-sign':    { Icon: DollarSign,    bg: '#FFFBEB', color: '#D97706' },
  'edit':           { Icon: Edit,          bg: '#F5F3FF', color: '#7C3AED' },
  'calendar-check': { Icon: CalendarCheck, bg: '#F0FDF4', color: '#0D9488' },
};

export default function RecentActivity() {
  return (
    <div className="card" style={{ height: '100%' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid #F1F5F9' }}
      >
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Recent Activity</h3>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>Live system updates</p>
        </div>
        <span className="badge badge-confirmed">Live</span>
      </div>

      {/* Feed */}
      <div className="px-5 py-3">
        {recentActivity.map((item, i) => {
          const cfg = ICON_MAP[item.icon] || ICON_MAP['calendar'];
          const { Icon } = cfg;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-start gap-3 py-3"
              style={{ borderBottom: i < recentActivity.length - 1 ? '1px solid #F8FAFC' : 'none' }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-xl shrink-0 mt-0.5"
                style={{ width: 34, height: 34, background: cfg.bg }}
              >
                <Icon size={15} color={cfg.color} />
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 13, color: '#0F172A', lineHeight: 1.4 }}>{item.message}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{item.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 pt-1 text-center">
        <button style={{ fontSize: 12, color: '#4F46E5', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
          View full activity log →
        </button>
      </div>
    </div>
  );
}
