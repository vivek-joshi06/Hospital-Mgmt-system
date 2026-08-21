// ============================================================
// Appointment Stat Cards
// ============================================================
import { motion } from 'framer-motion';
import {
  CalendarDays, Clock, CheckCircle2,
  XCircle, DollarSign, AlertCircle, CalendarCheck, TrendingUp,
} from 'lucide-react';
import { formatCurrency } from '../../../utils/helpers';

export default function AppointmentStatCards({ appointments }) {
  const total     = appointments.length;
  const today     = new Date().toISOString().slice(0, 10);

  const pending   = appointments.filter((a) => a.appointmentStatus === 'Pending').length;
  const confirmed = appointments.filter((a) => a.appointmentStatus === 'Confirmed').length;
  const completed = appointments.filter((a) => a.appointmentStatus === 'Completed').length;
  const cancelled = appointments.filter((a) => a.appointmentStatus === 'Cancelled').length;
  const emergency = appointments.filter((a) => a.isEmergency).length;

  const todayAppts = appointments.filter(
    (a) => (a.appointmentDate || a.date) === today
  ).length;

  const totalRevenue = appointments
    .filter((a) => a.appointmentStatus === 'Completed')
    .reduce((sum, a) => sum + (a.totalConsultedAmount || a.amount || 0), 0);

  const cards = [
    {
      label:   'Total Appointments',
      value:   total.toLocaleString(),
      icon:    CalendarDays,
      iconBg:  '#EEF2FF',
      iconClr: '#4F46E5',
      accent:  '#4F46E5',
      sub:     'All records',
    },
    {
      label:   'Today',
      value:   todayAppts,
      icon:    CalendarCheck,
      iconBg:  '#EFF6FF',
      iconClr: '#2563EB',
      accent:  '#2563EB',
      sub:     new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    },
    {
      label:   'Pending',
      value:   pending,
      icon:    Clock,
      iconBg:  '#FFFBEB',
      iconClr: '#D97706',
      accent:  '#F59E0B',
      sub:     'Awaiting confirmation',
    },
    {
      label:   'Confirmed',
      value:   confirmed,
      icon:    CheckCircle2,
      iconBg:  '#EFF6FF',
      iconClr: '#1D4ED8',
      accent:  '#3B82F6',
      sub:     'Scheduled & ready',
    },
    {
      label:   'Completed',
      value:   completed,
      icon:    TrendingUp,
      iconBg:  '#F0FDF4',
      iconClr: '#16A34A',
      accent:  '#22C55E',
      sub:     'Successfully done',
    },
    {
      label:   'Cancelled',
      value:   cancelled,
      icon:    XCircle,
      iconBg:  '#FEF2F2',
      iconClr: '#DC2626',
      accent:  '#EF4444',
      sub:     'No-shows & cancels',
    },
    {
      label:   'Emergency',
      value:   emergency,
      icon:    AlertCircle,
      iconBg:  '#FFF1F2',
      iconClr: '#E11D48',
      accent:  '#E11D48',
      sub:     'Priority cases',
    },
    {
      label:   'Total Revenue',
      value:   formatCurrency(totalRevenue),
      icon:    DollarSign,
      iconBg:  '#F5F3FF',
      iconClr: '#7C3AED',
      accent:  '#7C3AED',
      sub:     'Completed appointments',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
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
            transition={{ delay: i * 0.05, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="card p-4 relative overflow-hidden group"
          >
            <div
              style={{
                position: 'absolute', top: -16, right: -16,
                width: 60, height: 60, borderRadius: '50%',
                background: c.accent, filter: 'blur(20px)', opacity: 0.12,
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
