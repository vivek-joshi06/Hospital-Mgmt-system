// ============================================================
// Reports Page — Hospital Analytics & Insights
// ============================================================
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Home, ChevronRight, Download, FileText,
  TrendingUp, TrendingDown, Minus,
  Users, Stethoscope, CalendarDays, DollarSign,
  Activity, Building2, Star, Clock,
  CheckCircle2, XCircle, AlertCircle,
  RefreshCw, ChevronDown,
} from 'lucide-react';

import BarChart    from '../../components/charts/BarChart';
import DonutChart  from '../../components/charts/DonutChart';
import AreaChart   from '../../components/charts/AreaChart';
import Avatar      from '../../components/ui/Avatar';

import {
  doctors, patients, appointments, departments,
  dashboardStats, weeklyAppointments,
} from '../../data/dummyData';
import { formatCurrency, calcAge } from '../../utils/helpers';

// ============================================================
// COMPUTED ANALYTICS (derived from dummy data)
// ============================================================

const totalRevenue  = dashboardStats.totalRevenue;
const revenueGrowth = 12.4;

// Monthly revenue — 12-month simulated data
const monthlyRevenue = [
  { label: 'Aug',  value: 18200, value2: 14  },
  { label: 'Sep',  value: 21400, value2: 18  },
  { label: 'Oct',  value: 19800, value2: 16  },
  { label: 'Nov',  value: 23600, value2: 20  },
  { label: 'Dec',  value: 16200, value2: 12  },
  { label: 'Jan',  value: 24800, value2: 22  },
  { label: 'Feb',  value: 22100, value2: 19  },
  { label: 'Mar',  value: 27300, value2: 24  },
  { label: 'Apr',  value: 25900, value2: 21  },
  { label: 'May',  value: 31200, value2: 28  },
  { label: 'Jun',  value: 28700, value2: 25  },
  { label: 'Jul',  value: 34800, value2: 30  },
];

// Weekly appointments (last 8 weeks)
const weeklyTrend = [
  { label: 'W1', value: 112, value2: 94  },
  { label: 'W2', value: 98,  value2: 82  },
  { label: 'W3', value: 134, value2: 118 },
  { label: 'W4', value: 127, value2: 107 },
  { label: 'W5', value: 148, value2: 130 },
  { label: 'W6', value: 142, value2: 122 },
  { label: 'W7', value: 161, value2: 140 },
  { label: 'W8', value: 159, value2: 138 },
];

// Appointment status breakdown
const apptStatusData = [
  { label: 'Completed', value: 1842, color: '#22C55E' },
  { label: 'Confirmed', value: 843,  color: '#3B82F6' },
  { label: 'Pending',   value: 387,  color: '#F59E0B' },
  { label: 'Cancelled', value: 169,  color: '#EF4444' },
];

// Appointment type breakdown
const apptTypeData = [
  { label: 'Consultation', value: 980,  color: '#4F46E5' },
  { label: 'Follow-up',    value: 624,  color: '#06B6D4' },
  { label: 'Check-up',     value: 412,  color: '#10B981' },
  { label: 'Emergency',    value: 187,  color: '#EF4444' },
  { label: 'Pre-op',       value: 143,  color: '#8B5CF6' },
  { label: 'Therapy',      value: 895,  color: '#F59E0B' },
];

// Gender distribution
const genderData = [
  { label: 'Female', value: patients.filter((p) => p.gender === 'Female').length + 800, color: '#EC4899' },
  { label: 'Male',   value: patients.filter((p) => p.gender === 'Male').length   + 920, color: '#3B82F6' },
  { label: 'Other',  value: 47,  color: '#8B5CF6' },
];

// Age group distribution
const ageGroupData = [
  { label: '0–12',  value: 187,  color: '#06B6D4' },
  { label: '13–24', value: 243,  color: '#10B981' },
  { label: '25–40', value: 512,  color: '#4F46E5' },
  { label: '41–60', value: 634,  color: '#F59E0B' },
  { label: '60+',   value: 271,  color: '#EF4444' },
];

// Department performance
const deptPerformanceData = departments.map((d) => ({
  label: d.name.split(' ')[0],
  value: d.patients,
  color: d.color,
}));

// Top doctors by consultations (sorted)
const topDoctors = [...doctors]
  .sort((a, b) => b.consultations - a.consultations)
  .slice(0, 6);

// Doctor activity bar chart
const doctorBarData = topDoctors.map((d) => ({
  label: d.name.split(' ')[1] || d.name,
  value: d.consultations,
  color: '#4F46E5',
}));

// ============================================================
// STAT CARD
// ============================================================
function StatCard({ label, value, sub, icon: Icon, iconBg, iconClr, accent, trend, trendValue, delay = 0 }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendClr  = trend === 'up' ? '#22C55E' : trend === 'down' ? '#EF4444' : '#94A3B8';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="card p-5 relative overflow-hidden group"
    >
      <div style={{ position: 'absolute', top: -20, right: -20, width: 70, height: 70, borderRadius: '50%', background: accent, filter: 'blur(22px)', opacity: 0.12, pointerEvents: 'none' }} />
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110" style={{ width: 42, height: 42, background: iconBg }}>
          <Icon size={18} color={iconClr} />
        </div>
        {trendValue !== undefined && (
          <div className="flex items-center gap-1" style={{ color: trendClr }}>
            <TrendIcon size={13} />
            <span style={{ fontSize: 12, fontWeight: 700 }}>{trendValue}%</span>
          </div>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{sub}</div>}
    </motion.div>
  );
}

// ============================================================
// CHART CARD wrapper
// ============================================================
function ChartCard({ title, subtitle, children, style, delay = 0, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="card p-5"
      style={style}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{title}</h3>
          {subtitle && <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </motion.div>
  );
}

// ============================================================
// TOP DOCTORS TABLE
// ============================================================
function TopDoctorsTable({ doctors: list }) {
  return (
    <div className="space-y-3">
      {list.map((doc, i) => {
        const pct = Math.round((doc.consultations / list[0].consultations) * 100);
        return (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            {/* Rank */}
            <div
              style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: i < 3 ? ['#F59E0B', '#94A3B8', '#D97706'][i] + '25' : '#F8FAFC',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800,
                color: i < 3 ? ['#D97706', '#64748B', '#B45309'][i] : '#94A3B8',
              }}
            >
              {i + 1}
            </div>
            <Avatar name={doc.name} size={32} />
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {doc.name}
              </div>
              <div style={{ fontSize: 10, color: '#94A3B8' }}>{doc.specialization}</div>
              {/* Mini progress bar */}
              <div style={{ height: 3, background: '#F1F5F9', borderRadius: 99, marginTop: 4 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.07 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #4F46E5, #7C3AED)', borderRadius: 99 }}
                />
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#4F46E5', flexShrink: 0 }}>
              {doc.consultations.toLocaleString()}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================
// RECENT APPOINTMENTS MINI-TABLE
// ============================================================
const STATUS_DOT = {
  Completed: '#22C55E', Confirmed: '#3B82F6',
  Pending: '#F59E0B',   Cancelled: '#EF4444',
};

function RecentAppointmentsTable({ items }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
            {['#', 'Patient', 'Doctor', 'Department', 'Date', 'Type', 'Amount', 'Status'].map((h) => (
              <th key={h} style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#94A3B8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((a, i) => {
            const status = a.appointmentStatus || a.status;
            return (
              <motion.tr
                key={a.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                style={{ borderBottom: '1px solid #F8FAFC' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAFA'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '10px 12px', fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>
                  #{String(a.id).padStart(4, '0')}
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <div className="flex items-center gap-2">
                    <Avatar name={a.patientName} size={26} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{a.patientName}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 12px', fontSize: 12, color: '#374151' }}>{a.doctorName}</td>
                <td style={{ padding: '10px 12px', fontSize: 12, color: '#64748B' }}>{a.department}</td>
                <td style={{ padding: '10px 12px', fontSize: 12, color: '#374151', whiteSpace: 'nowrap' }}>
                  {a.appointmentDate || a.date}
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: '#EEF2FF', color: '#4F46E5' }}>
                    {a.type}
                  </span>
                </td>
                <td style={{ padding: '10px 12px', fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
                  ${(a.totalConsultedAmount || a.amount || 0).toLocaleString()}
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: (STATUS_DOT[status] || '#94A3B8') + '18', color: STATUS_DOT[status] || '#94A3B8' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_DOT[status] || '#94A3B8', display: 'inline-block' }} />
                    {status}
                  </span>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// HORIZONTAL STAT ROW (key metrics)
// ============================================================
function MetricPill({ label, value, color = '#4F46E5' }) {
  return (
    <div className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid #F8FAFC' }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: '#374151', flex: 1 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{value}</span>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function ReportsPage() {
  const [period, setPeriod] = useState('12m');

  const totalPatients    = dashboardStats.totalPatients;
  const totalDoctors     = dashboardStats.totalDoctors;
  const totalAppts       = dashboardStats.totalAppointments;
  const completedAppts   = apptStatusData.find((s) => s.label === 'Completed')?.value || 0;
  const completionRate   = Math.round((completedAppts / totalAppts) * 100);
  const avgRevPerAppt    = Math.round(totalRevenue / completedAppts);
  const activePatients   = totalPatients - 214;
  const activeDoctors    = doctors.filter((d) => d.isActive).length;

  const handleExport = () => {
    const content = [
      'MEDICORE ERP — REPORTS EXPORT',
      `Generated: ${new Date().toLocaleString()}`,
      '',
      'KEY METRICS',
      `Total Patients: ${totalPatients.toLocaleString()}`,
      `Total Doctors: ${totalDoctors}`,
      `Total Appointments: ${totalAppts.toLocaleString()}`,
      `Total Revenue: $${totalRevenue.toLocaleString()}`,
      `Completion Rate: ${completionRate}%`,
      `Avg. Revenue per Appointment: $${avgRevPerAppt}`,
      '',
      'APPOINTMENT STATUS BREAKDOWN',
      ...apptStatusData.map((s) => `${s.label}: ${s.value}`),
      '',
      'TOP DOCTORS',
      ...topDoctors.map((d, i) => `${i + 1}. ${d.name} — ${d.consultations.toLocaleString()} consultations`),
      '',
      'DEPARTMENT PATIENTS',
      ...departments.map((d) => `${d.name}: ${d.patients} patients`),
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `medicore_report_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* ---- Breadcrumb ---- */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-5"
        style={{ fontSize: 12, color: '#94A3B8' }}
      >
        <Home size={13} />
        <span>Dashboard</span>
        <ChevronRight size={12} />
        <span style={{ color: '#4F46E5', fontWeight: 600 }}>Reports & Analytics</span>
      </motion.div>

      {/* ---- Header ---- */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-start justify-between mb-6 flex-wrap gap-4"
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Reports & Analytics
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
            Real-time insights across patients, doctors, appointments, and revenue.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Period Selector */}
          <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1.5px solid #E2E8F0' }}>
            {['7d', '30d', '3m', '12m'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '6px 14px', fontSize: 12, fontWeight: 600,
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                  background: period === p ? '#4F46E5' : '#fff',
                  color:      period === p ? '#fff'    : '#64748B',
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            id="export-report-btn"
            onClick={handleExport}
            className="flex items-center gap-2 btn btn-primary"
          >
            <Download size={14} />
            Export Report
          </button>
        </div>
      </motion.div>

      {/* ================================================================
          ROW 1 — KPI Cards (4 columns)
      ================================================================ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <StatCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          sub={`+${revenueGrowth}% vs last period`}
          icon={DollarSign} iconBg="#F5F3FF" iconClr="#7C3AED" accent="#7C3AED"
          trend="up" trendValue={revenueGrowth}
          delay={0.05}
        />
        <StatCard
          label="Total Patients"
          value={totalPatients.toLocaleString()}
          sub={`${activePatients.toLocaleString()} active`}
          icon={Users} iconBg="#EFF6FF" iconClr="#2563EB" accent="#3B82F6"
          trend="up" trendValue={8.2}
          delay={0.1}
        />
        <StatCard
          label="Total Appointments"
          value={totalAppts.toLocaleString()}
          sub={`${completionRate}% completion rate`}
          icon={CalendarDays} iconBg="#EEF2FF" iconClr="#4F46E5" accent="#4F46E5"
          trend="up" trendValue={5.7}
          delay={0.15}
        />
        <StatCard
          label="Avg. Revenue / Appt"
          value={formatCurrency(avgRevPerAppt)}
          sub="From completed appointments"
          icon={TrendingUp} iconBg="#F0FDF4" iconClr="#16A34A" accent="#22C55E"
          trend="up" trendValue={3.1}
          delay={0.2}
        />
      </div>

      {/* ================================================================
          ROW 2 — Revenue Trend (large) + Appointment Status
      ================================================================ */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Revenue Area Chart */}
        <ChartCard
          title="Revenue Trend"
          subtitle="Monthly revenue over the past 12 months"
          delay={0.25}
          action={
            <div className="flex items-center gap-1.5">
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#7C3AED' }} />
              <span style={{ fontSize: 11, color: '#64748B' }}>Revenue ($)</span>
            </div>
          }
        >
          <AreaChart
            data={monthlyRevenue}
            height={200}
            color="#7C3AED"
            unit=""
            gradient
          />
        </ChartCard>

        {/* Appointment Status Donut */}
        <ChartCard
          title="Appointment Status"
          subtitle="All-time distribution"
          delay={0.3}
        >
          <DonutChart
            data={apptStatusData}
            size={140}
            thickness={22}
            centerValue={totalAppts.toLocaleString()}
            centerLabel="Total"
          />
        </ChartCard>
      </div>

      {/* ================================================================
          ROW 3 — Weekly Appointments + Top Doctors
      ================================================================ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Weekly Trend Area Chart */}
        <ChartCard
          title="Weekly Appointment Trend"
          subtitle="Booked vs Completed over last 8 weeks"
          delay={0.35}
          action={
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1"><div style={{ width: 14, height: 3, borderRadius: 99, background: '#4F46E5' }} /><span style={{ fontSize: 10, color: '#64748B' }}>Booked</span></div>
              <div className="flex items-center gap-1"><div style={{ width: 14, height: 3, borderRadius: 99, background: '#22C55E' }} /><span style={{ fontSize: 10, color: '#64748B' }}>Completed</span></div>
            </div>
          }
        >
          <AreaChart
            data={weeklyTrend}
            height={180}
            color="#4F46E5"
            color2="#22C55E"
            label2="Completed"
            gradient
          />
        </ChartCard>

        {/* Top Doctors */}
        <ChartCard
          title="Top Doctors by Consultations"
          subtitle="Ranked by total consultation count"
          delay={0.4}
        >
          <TopDoctorsTable doctors={topDoctors} />
        </ChartCard>
      </div>

      {/* ================================================================
          ROW 4 — Department Patients Bar + Patient Demographics
      ================================================================ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Department Patients Bar Chart */}
        <ChartCard
          title="Patient Load by Department"
          subtitle="Total registered patients per department"
          delay={0.45}
        >
          <BarChart
            data={deptPerformanceData}
            height={180}
            unit=""
          />
        </ChartCard>

        {/* Patient Demographics — Two donuts */}
        <ChartCard
          title="Patient Demographics"
          subtitle="Gender distribution across all patients"
          delay={0.5}
        >
          <DonutChart
            data={genderData}
            size={130}
            thickness={20}
            centerValue={totalPatients.toLocaleString()}
            centerLabel="Patients"
          />
          <div style={{ marginTop: 16, borderTop: '1px solid #F1F5F9', paddingTop: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Age Groups
            </div>
            {ageGroupData.map((ag) => (
              <div key={ag.label} className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: 11, color: '#64748B', width: 40 }}>{ag.label}</span>
                <div style={{ flex: 1, height: 6, background: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(ag.value / 634) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    style={{ height: '100%', background: ag.color, borderRadius: 99 }}
                  />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', width: 34, textAlign: 'right' }}>{ag.value}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* ================================================================
          ROW 5 — Appointment Type + Quick Stats Grid
      ================================================================ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Appointment Type breakdown */}
        <ChartCard
          title="Appointment Type Distribution"
          subtitle="Breakdown by consultation type"
          delay={0.55}
        >
          <DonutChart
            data={apptTypeData}
            size={130}
            thickness={20}
            centerValue={totalAppts.toLocaleString()}
            centerLabel="Total"
          />
        </ChartCard>

        {/* Key Metrics Quick Stats */}
        <ChartCard
          title="Key Performance Indicators"
          subtitle="Summary of critical hospital metrics"
          delay={0.6}
        >
          <MetricPill label="Active Doctors"            value={activeDoctors}                  color="#4F46E5" />
          <MetricPill label="Active Patients"           value={activePatients.toLocaleString()} color="#2563EB" />
          <MetricPill label="Completion Rate"           value={`${completionRate}%`}            color="#22C55E" />
          <MetricPill label="Cancellation Rate"         value={`${Math.round((169 / totalAppts) * 100)}%`} color="#EF4444" />
          <MetricPill label="Avg. Experience (Doctors)" value={`${Math.round(doctors.reduce((s, d) => s + d.experience, 0) / doctors.length)} yrs`} color="#F59E0B" />
          <MetricPill label="Emergency Cases"           value={`${appointments.filter((a) => a.isEmergency).length} this week`} color="#E11D48" />
          <MetricPill label="Revenue per Patient"       value={formatCurrency(Math.round(totalRevenue / totalPatients))} color="#7C3AED" />
          <MetricPill label="Total Departments"         value={departments.length}               color="#0D9488" />
        </ChartCard>
      </div>

      {/* ================================================================
          ROW 6 — Recent Appointments Table (full width)
      ================================================================ */}
      <ChartCard
        title="Recent Appointments"
        subtitle="Latest scheduled and completed appointments"
        delay={0.65}
        action={
          <button className="btn btn-ghost btn-sm flex items-center gap-1.5" style={{ fontSize: 12 }}>
            View all <ChevronRight size={12} />
          </button>
        }
      >
        <RecentAppointmentsTable items={appointments} />
      </ChartCard>

      {/* ================================================================
          ROW 7 — Doctor Consultations Bar (full width)
      ================================================================ */}
      <ChartCard
        title="Doctor Consultation Volume"
        subtitle="All-time consultations for top 6 physicians"
        delay={0.7}
        style={{ marginTop: 16 }}
      >
        <BarChart
          data={doctorBarData}
          height={200}
          color="#4F46E5"
          unit=""
        />
      </ChartCard>

      {/* Bottom padding */}
      <div style={{ height: 24 }} />
    </div>
  );
}
