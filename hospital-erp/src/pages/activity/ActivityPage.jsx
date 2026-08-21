// ============================================================
// Activity Page — System Audit Log & Feed
// ============================================================
import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ChevronRight, Search, X, Download, RefreshCw,
  CalendarDays, UserPlus, CheckCircle2, XCircle,
  Stethoscope, DollarSign, Edit3, AlertCircle,
  CalendarCheck, Shield, Settings, Trash2,
  Clock, Filter,
} from 'lucide-react';
import { debounce } from '../../utils/helpers';

// ============================================================
// EXTENDED ACTIVITY DATA
// ============================================================
const ACTIVITIES = [
  { id: 1,  type: 'appointment', action: 'New appointment booked',          detail: 'Emily Johnson → Dr. Sarah Mitchell (Cardiology)',    time: '2026-07-13T09:12:00', user: 'Receptionist A', icon: CalendarDays,  color: '#4F46E5' },
  { id: 2,  type: 'patient',     action: 'Patient registered',              detail: 'Luna Zhang added to the system',                     time: '2026-07-13T08:54:00', user: 'Admin',          icon: UserPlus,      color: '#2563EB' },
  { id: 3,  type: 'complete',    action: 'Appointment completed',           detail: 'Appt #0003 — Dr. Fatima Al-Rashid (Emergency)',       time: '2026-07-13T08:30:00', user: 'Dr. Fatima',     icon: CheckCircle2,  color: '#16A34A' },
  { id: 4,  type: 'cancel',      action: 'Appointment cancelled',           detail: 'Appt #0005 — Robert Garcia cancelled',               time: '2026-07-13T07:45:00', user: 'Receptionist B', icon: XCircle,       color: '#DC2626' },
  { id: 5,  type: 'doctor',      action: 'Doctor schedule updated',         detail: 'Dr. Priya Sharma updated availability for next week', time: '2026-07-13T07:20:00', user: 'Dr. Priya',      icon: Stethoscope,   color: '#0D9488' },
  { id: 6,  type: 'payment',     action: 'Payment received',                detail: '$450 collected — Appt #0003 (Marcus Williams)',       time: '2026-07-13T07:18:00', user: 'Billing Desk',   icon: DollarSign,    color: '#7C3AED' },
  { id: 7,  type: 'patient',     action: 'Patient record updated',          detail: 'Maria Santos contact details modified',               time: '2026-07-13T06:55:00', user: 'Admin',          icon: Edit3,         color: '#2563EB' },
  { id: 8,  type: 'appointment', action: 'Appointment confirmed',           detail: 'Appt #0009 confirmed — David Thompson (Psychiatry)',  time: '2026-07-13T06:30:00', user: 'Receptionist A', icon: CalendarCheck, color: '#4F46E5' },
  { id: 9,  type: 'emergency',   action: 'Emergency case flagged',          detail: 'Marcus Williams — Emergency Cardiology alert raised', time: '2026-07-12T22:10:00', user: 'System',         icon: AlertCircle,   color: '#E11D48' },
  { id: 10, type: 'payment',     action: 'Invoice generated',               detail: 'Invoice INV-2026-0041 for $280 (James O\'Brien)',     time: '2026-07-12T18:45:00', user: 'Billing Desk',   icon: DollarSign,    color: '#7C3AED' },
  { id: 11, type: 'doctor',      action: 'New doctor added',                detail: 'Dr. Amara Osei onboarded — Dermatology dept.',        time: '2026-07-12T15:20:00', user: 'HR Admin',       icon: UserPlus,      color: '#0D9488' },
  { id: 12, type: 'complete',    action: 'Appointment completed',           detail: 'Appt #0004 — Dr. Mei Lin (Gynecology)',               time: '2026-07-12T14:05:00', user: 'Dr. Mei Lin',    icon: CheckCircle2,  color: '#16A34A' },
  { id: 13, type: 'settings',    action: 'System settings changed',         detail: 'Notification preferences updated by Admin',           time: '2026-07-12T11:30:00', user: 'Admin',          icon: Settings,      color: '#64748B' },
  { id: 14, type: 'security',    action: 'Login from new device',           detail: 'Admin account accessed from Chrome / Windows 11',     time: '2026-07-12T09:15:00', user: 'Admin',          icon: Shield,        color: '#D97706' },
  { id: 15, type: 'patient',     action: 'Patient deactivated',             detail: 'Carlos Rivera marked inactive — no recent visits',    time: '2026-07-11T16:40:00', user: 'Admin',          icon: Trash2,        color: '#DC2626' },
  { id: 16, type: 'appointment', action: 'Appointment rescheduled',         detail: 'Sophie Chen moved to 2026-07-15 (Ophthalmology)',     time: '2026-07-11T13:20:00', user: 'Receptionist B', icon: CalendarDays,  color: '#4F46E5' },
  { id: 17, type: 'payment',     action: 'Refund processed',                detail: '$180 refund for cancelled Appt #0002',                time: '2026-07-11T11:00:00', user: 'Billing Desk',   icon: DollarSign,    color: '#7C3AED' },
  { id: 18, type: 'security',    action: '2FA enabled',                     detail: 'Two-factor authentication activated by Admin',        time: '2026-07-11T09:05:00', user: 'Admin',          icon: Shield,        color: '#D97706' },
  { id: 19, type: 'doctor',      action: 'Doctor status updated',           detail: 'Dr. Amara Osei set to inactive (on leave)',           time: '2026-07-10T17:30:00', user: 'HR Admin',       icon: Stethoscope,   color: '#0D9488' },
  { id: 20, type: 'complete',    action: 'Appointment completed',           detail: 'Appt #0008 — Dr. Lucas Torres (Ophthalmology)',       time: '2026-07-10T16:00:00', user: 'Dr. Lucas',      icon: CheckCircle2,  color: '#16A34A' },
];

const TYPE_LABELS = {
  appointment: 'Appointment',
  patient:     'Patient',
  complete:    'Completed',
  cancel:      'Cancelled',
  doctor:      'Doctor',
  payment:     'Payment',
  emergency:   'Emergency',
  settings:    'Settings',
  security:    'Security',
};

const TYPE_FILTERS = ['All', 'Appointment', 'Patient', 'Doctor', 'Payment', 'Security', 'Settings'];

// ============================================================
// HELPERS
// ============================================================
function formatRelative(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(mins / 60);
  const days = Math.floor(hrs  / 24);
  if (mins < 1)  return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hrs  < 24) return `${hrs}h ago`;
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

function formatDateTime(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function groupByDate(items) {
  const groups = {};
  items.forEach((item) => {
    const date = item.time.slice(0, 10);
    const label = date === new Date().toISOString().slice(0, 10) ? 'Today'
      : date === new Date(Date.now() - 86400000).toISOString().slice(0, 10) ? 'Yesterday'
      : new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });
  return groups;
}



// ============================================================
// STAT CARDS
// ============================================================
function StatStrip({ items }) {
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = items.filter((i) => i.time.startsWith(today)).length;
  const appts      = items.filter((i) => i.type === 'appointment').length;
  const alerts     = items.filter((i) => i.type === 'emergency' || i.type === 'security').length;
  const payments   = items.filter((i) => i.type === 'payment').length;

  const stats = [
    { label: 'Total Events',   value: items.length, icon: Clock,       bg: '#EEF2FF', clr: '#4F46E5' },
    { label: 'Today',          value: todayCount,   icon: CalendarDays, bg: '#F0FDF4', clr: '#16A34A' },
    { label: 'Appointments',   value: appts,        icon: CalendarCheck,bg: '#EFF6FF', clr: '#2563EB' },
    { label: 'Alerts',         value: alerts,       icon: AlertCircle,  bg: '#FEF2F2', clr: '#DC2626' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="card p-4 flex items-center gap-4"
          >
            <div className="flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: s.bg, flexShrink: 0 }}>
              <Icon size={17} color={s.clr} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================
// ACTIVITY ITEM
// ============================================================
function ActivityItem({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ delay: index * 0.035, duration: 0.25 }}
      className="flex items-start gap-4 group"
    >
      {/* Icon dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          className="flex items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
          style={{ width: 36, height: 36, background: item.color + '18', border: `1.5px solid ${item.color}28` }}
        >
          <Icon size={15} color={item.color} />
        </div>
        {/* Vertical line — shown by parent */}
      </div>

      {/* Content */}
      <div
        className="flex-1 rounded-xl px-4 py-3 transition-all duration-150 group-hover:shadow-sm"
        style={{ background: '#FAFAFA', border: '1px solid #F1F5F9', marginBottom: 10 }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#FAFAFA'; e.currentTarget.style.borderColor = '#F1F5F9'; }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{item.action}</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{item.detail}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', whiteSpace: 'nowrap' }}>
              {formatRelative(item.time)}
            </div>
            <div style={{ fontSize: 10, color: '#CBD5E1', marginTop: 1, whiteSpace: 'nowrap' }}>
              {formatDateTime(item.time)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: item.color + '15', color: item.color }}>
            {TYPE_LABELS[item.type] || item.type}
          </span>
          <span style={{ fontSize: 10, color: '#CBD5E1' }}>by</span>
          <span style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8' }}>{item.user}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function ActivityPage() {
  const [search,  setSearch]  = useState('');
  const [typeFilter, setType] = useState('All');

  const debouncedSearch = useRef(
    debounce((val) => setSearch(val), 250)
  ).current;

  const filtered = useMemo(() => {
    let list = [...ACTIVITIES];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((i) =>
        i.action.toLowerCase().includes(q) ||
        i.detail.toLowerCase().includes(q)  ||
        i.user.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== 'All') {
      const t = typeFilter.toLowerCase();
      list = list.filter((i) =>
        i.type === t ||
        (t === 'appointment' && (i.type === 'appointment' || i.type === 'complete' || i.type === 'cancel')) ||
        (t === 'security' && (i.type === 'security' || i.type === 'emergency'))
      );
    }
    return list;
  }, [search, typeFilter]);

  const groups    = groupByDate(filtered);
  const hasFilter = !!(search || typeFilter !== 'All');

  const handleExport = () => {
    const lines = filtered.map(
      (i) => `[${i.time}] [${i.type.toUpperCase()}] ${i.action} — ${i.detail} (by ${i.user})`
    );
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `activity_log_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-5"
        style={{ fontSize: 12, color: '#94A3B8' }}
      >
        <Home size={13} />
        <span>Dashboard</span>
        <ChevronRight size={12} />
        <span style={{ color: '#4F46E5', fontWeight: 600 }}>Activity Log</span>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-start justify-between mb-6 flex-wrap gap-4"
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            System Activity
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
            Complete audit trail of all actions performed across the system.
          </p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 btn btn-secondary">
          <Download size={14} /> Export Log
        </button>
      </motion.div>

      {/* Stat strip */}
      <StatStrip items={ACTIVITIES} />

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card p-4 mb-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 200px' }}>
            <Search size={13} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              id="activity-search"
              type="text"
              placeholder="Search actions, details, users…"
              defaultValue={search}
              onChange={(e) => debouncedSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: 10, border: '1.5px solid #E2E8F0', fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif', background: '#fff' }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#4F46E5'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
            />
          </div>

          {/* Type pills */}
          <div className="flex flex-wrap gap-1">
            {TYPE_FILTERS.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                style={{
                  padding: '5px 11px', borderRadius: 8, fontSize: 12, fontWeight: 500,
                  border: '1.5px solid', cursor: 'pointer', transition: 'all 0.15s',
                  borderColor: typeFilter === t ? '#4F46E5' : '#E2E8F0',
                  background:  typeFilter === t ? '#EEF2FF' : '#fff',
                  color:       typeFilter === t ? '#4F46E5' : '#64748B',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <span style={{ fontSize: 12, color: '#94A3B8', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
            {filtered.length} events
          </span>

          {hasFilter && (
            <button
              onClick={() => { setSearch(''); setType('All'); }}
              className="flex items-center gap-1.5 btn btn-ghost btn-sm"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>
      </motion.div>

      {/* Activity Feed */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card flex flex-col items-center justify-center py-16 text-center"
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>No activity found</div>
          <div style={{ fontSize: 13, color: '#94A3B8' }}>Try adjusting your search or filter.</div>
        </motion.div>
      ) : (
        <AnimatePresence>
          {Object.entries(groups).map(([date, items]) => (
            <div key={date} style={{ marginBottom: 24 }}>
              {/* Date group header */}
              <div
                className="flex items-center gap-3 mb-4"
                style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em' }}
              >
                <div style={{ height: 1, background: '#E2E8F0', width: 20 }} />
                {date}
                <div style={{ height: 1, background: '#E2E8F0', flex: 1 }} />
              </div>

              {/* Items */}
              <div>
                {items.map((item, i) => (
                  <ActivityItem key={item.id} item={item} index={i} />
                ))}
              </div>
            </div>
          ))}
        </AnimatePresence>
      )}

      <div style={{ height: 24 }} />
    </div>
  );
}
