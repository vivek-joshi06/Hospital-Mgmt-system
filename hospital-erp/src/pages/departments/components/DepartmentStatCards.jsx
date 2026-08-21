// ============================================================
// Department Stat Cards
// ============================================================
import { motion } from 'framer-motion';
import { Building2, UserCheck, UserX, Users, Stethoscope, Activity } from 'lucide-react';

export default function DepartmentStatCards({ departments, doctors }) {
  const total    = departments.length;
  const active   = departments.filter((d) => d.isActive !== false).length;
  const inactive = total - active;

  const totalDoctors = doctors?.length || 0;
  const activeDocs   = doctors?.filter((d) => d.isActive).length || 0;

  const totalPatients = departments.reduce((s, d) => s + (d.patients || 0), 0);

  const cards = [
    {
      label:   'Total Departments',
      value:   total,
      icon:    Building2,
      iconBg:  '#EEF2FF',
      iconClr: '#4F46E5',
      accent:  '#4F46E5',
      sub:     'Hospital divisions',
    },
    {
      label:   'Active Departments',
      value:   active,
      icon:    UserCheck,
      iconBg:  '#F0FDF4',
      iconClr: '#16A34A',
      accent:  '#22C55E',
      sub:     `${Math.round((active / total) * 100)}% operational`,
    },
    {
      label:   'Inactive',
      value:   inactive,
      icon:    UserX,
      iconBg:  '#FEF2F2',
      iconClr: '#DC2626',
      accent:  '#EF4444',
      sub:     'Not operational',
    },
    {
      label:   'Total Doctors',
      value:   totalDoctors,
      icon:    Stethoscope,
      iconBg:  '#F0FDFA',
      iconClr: '#0D9488',
      accent:  '#14B8A6',
      sub:     `${activeDocs} currently active`,
    },
    {
      label:   'Total Patients',
      value:   totalPatients.toLocaleString(),
      icon:    Users,
      iconBg:  '#EFF6FF',
      iconClr: '#2563EB',
      accent:  '#3B82F6',
      sub:     'Across all departments',
    },
    {
      label:   'Avg. Doctors / Dept',
      value:   (totalDoctors / (total || 1)).toFixed(1),
      icon:    Activity,
      iconBg:  '#F5F3FF',
      iconClr: '#7C3AED',
      accent:  '#7C3AED',
      sub:     'Per department',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
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
            transition={{ delay: i * 0.055, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="card p-4 relative overflow-hidden group"
          >
            <div
              style={{
                position: 'absolute', top: -16, right: -16,
                width: 60, height: 60, borderRadius: '50%',
                background: c.accent, filter: 'blur(18px)', opacity: 0.13,
                pointerEvents: 'none',
              }}
            />
            <div className="flex items-start justify-between mb-3">
              <span style={{ fontSize: 10.5, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {c.label}
              </span>
              <div
                className="flex items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                style={{ width: 34, height: 34, background: c.iconBg, flexShrink: 0 }}
              >
                <Icon size={15} color={c.iconClr} />
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {c.value}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{c.sub}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
