// ============================================================
// Patient Stat Cards
// ============================================================
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, UserPlus, Heart, Clock } from 'lucide-react';

export default function PatientStatCards({ patients }) {
  const total    = patients.length;
  const active   = patients.filter((p) => p.isActive).length;
  const inactive = total - active;

  // "added today" — in real app compare Created date; use 2 for demo
  const addedToday = 2;

  // average age
  const avgAge = Math.round(
    patients.reduce((sum, p) => {
      const dob = new Date(p.dateOfBirth || p.dob);
      const age = new Date().getFullYear() - dob.getFullYear();
      return sum + age;
    }, 0) / (patients.length || 1)
  );

  const cards = [
    {
      label:   'Total Patients',
      value:   total.toLocaleString(),
      icon:    Users,
      iconBg:  '#EFF6FF',
      iconClr: '#2563EB',
      accent:  '#2563EB',
      trend:   '+12 this month',
      trendUp: true,
    },
    {
      label:   'Active Patients',
      value:   active.toLocaleString(),
      icon:    UserCheck,
      iconBg:  '#F0FDF4',
      iconClr: '#16A34A',
      accent:  '#16A34A',
      trend:   `${Math.round((active / total) * 100)}% of total`,
      trendUp: true,
    },
    {
      label:   'Inactive Patients',
      value:   inactive.toLocaleString(),
      icon:    UserX,
      iconBg:  '#FEF2F2',
      iconClr: '#DC2626',
      accent:  '#EF4444',
      trend:   `${Math.round((inactive / total) * 100)}% of total`,
      trendUp: false,
    },
    {
      label:   'Added Today',
      value:   addedToday,
      icon:    UserPlus,
      iconBg:  '#F5F3FF',
      iconClr: '#7C3AED',
      accent:  '#7C3AED',
      trend:   'New registrations',
      trendUp: true,
    },
    {
      label:   'Avg. Patient Age',
      value:   `${avgAge} yrs`,
      icon:    Heart,
      iconBg:  '#FFF1F2',
      iconClr: '#E11D48',
      accent:  '#E11D48',
      trend:   'Across all records',
      trendUp: null,
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 14,
        marginBottom: 24,
      }}
    >
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="card p-5 relative overflow-hidden group"
          >
            {/* glow blob */}
            <div
              style={{
                position: 'absolute', top: -18, right: -18,
                width: 70, height: 70, borderRadius: '50%',
                background: c.accent, filter: 'blur(20px)', opacity: 0.12,
                pointerEvents: 'none',
              }}
            />
            <div className="flex items-start justify-between mb-3">
              <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {c.label}
              </span>
              <div
                className="flex items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                style={{ width: 38, height: 38, background: c.iconBg, flexShrink: 0 }}
              >
                <Icon size={17} color={c.iconClr} />
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {c.value}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 5 }}>{c.trend}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
