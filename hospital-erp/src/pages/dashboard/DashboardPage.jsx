// ============================================================
// Dashboard Page — MediCore ERP
// ============================================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Stethoscope, CalendarDays, DollarSign,
  Clock, CheckCircle2, XCircle, Building2,
  CalendarCheck, UserPlus, Activity, ArrowRight,
  Plus,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { dashboardStats, weeklyAppointments } from '../../data/dummyData';
import { formatCurrency } from '../../utils/helpers';

import StatCard from '../../components/dashboard/StatCard';
import MiniBarChart from '../../components/dashboard/MiniBarChart';
import RecentActivity from '../../components/dashboard/RecentActivity';
import TodayAppointments from '../../components/dashboard/TodayAppointments';
import TopDoctors from '../../components/dashboard/TopDoctors';
import DepartmentOverview from '../../components/dashboard/DepartmentOverview';

// ---- Animated counter hook ----
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// ---- Quick Action Button ----
function QuickAction({ icon: Icon, label, to, color }) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <motion.div
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="flex flex-col items-center justify-center gap-2 rounded-2xl py-5 px-4 cursor-pointer transition-all duration-200"
        style={{ background: color + '12', border: `1.5px solid ${color}22` }}
      >
        <div
          className="flex items-center justify-center rounded-xl"
          style={{ width: 42, height: 42, background: color + '20' }}
        >
          <Icon size={20} color={color} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', textAlign: 'center' }}>
          {label}
        </span>
      </motion.div>
    </Link>
  );
}

// ---- Status Summary Donut-like bars ----
function AppointmentStatusBar({ label, count, total, color }) {
  const pct = Math.round((count / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div style={{ fontSize: 12, color: '#64748B', width: 72, flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: 6, background: '#F1F5F9', borderRadius: 99 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          style={{ height: '100%', background: color, borderRadius: 99 }}
        />
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', width: 28, textAlign: 'right' }}>
        {count}
      </div>
    </div>
  );
}

// ============================================================
export default function DashboardPage() {
  const stats = dashboardStats;

  return (
    <div>
      {/* ---- Welcome Banner ---- */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl mb-7 px-7 py-6"
        style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #9333EA 100%)',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -20, right: 80, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', top: 20, right: 160, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, Admin! 👋
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
              You have <strong style={{ color: '#fff' }}>{stats.pendingAppointments} pending</strong> appointments and <strong style={{ color: '#fff' }}>{stats.availableDoctors} doctors</strong> available today.
            </p>
          </div>
          <Link to="/appointments">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Plus size={15} />
              New Appointment
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* ---- Quick Actions ---- */}
      <div
        className="grid mb-6"
        style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}
      >
        <QuickAction icon={CalendarDays} label="Book Appointment" to="/appointments" color="#4F46E5" />
        <QuickAction icon={UserPlus}     label="Add Patient"      to="/patients"     color="#06B6D4" />
        <QuickAction icon={Stethoscope}  label="Add Doctor"       to="/doctors"      color="#14B8A6" />
        <QuickAction icon={Building2}    label="Departments"      to="/departments"  color="#F59E0B" />
        <QuickAction icon={Activity}     label="View Reports"     to="/reports"      color="#8B5CF6" />
      </div>

      {/* ---- KPI Stat Cards — Bento Grid ---- */}
      <div
        className="grid mb-6"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}
      >
        <StatCard
          label="Total Patients"
          value={stats.totalPatients.toLocaleString()}
          icon={Users}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
          trend={{ value: 12.4, label: 'vs last month' }}
          accent="#2563EB"
          delay={0}
        />
        <StatCard
          label="Available Doctors"
          value={`${stats.availableDoctors} / ${stats.totalDoctors}`}
          icon={Stethoscope}
          iconBg="#F0FDF4"
          iconColor="#16A34A"
          trend={{ value: 4.2, label: 'vs yesterday' }}
          accent="#16A34A"
          delay={0.05}
        />
        <StatCard
          label="Today's Appointments"
          value={stats.todayAppointments}
          icon={CalendarDays}
          iconBg="#EEF2FF"
          iconColor="#4F46E5"
          trend={{ value: 8.1, label: 'vs yesterday' }}
          accent="#4F46E5"
          delay={0.1}
        />
        <StatCard
          label="Today's Revenue"
          value={formatCurrency(stats.todayRevenue)}
          icon={DollarSign}
          iconBg="#FFFBEB"
          iconColor="#D97706"
          trend={{ value: 6.3, label: 'vs yesterday' }}
          accent="#D97706"
          delay={0.15}
        />

        {/* Second row */}
        <StatCard
          label="Pending"
          value={stats.pendingAppointments}
          icon={Clock}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          trend={{ value: -2.1, label: 'vs yesterday' }}
          accent="#F59E0B"
          delay={0.2}
        />
        <StatCard
          label="Completed Today"
          value={stats.completedToday}
          icon={CheckCircle2}
          iconBg="#F0FDF4"
          iconColor="#16A34A"
          trend={{ value: 10.0, label: 'vs yesterday' }}
          accent="#22C55E"
          delay={0.25}
        />
        <StatCard
          label="Cancelled Today"
          value={stats.cancelledToday}
          icon={XCircle}
          iconBg="#FEF2F2"
          iconColor="#DC2626"
          trend={{ value: -33.3, label: 'vs yesterday' }}
          accent="#EF4444"
          delay={0.3}
        />
        <StatCard
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          iconBg="#F5F3FF"
          iconColor="#7C3AED"
          trend={{ value: 18.7, label: 'vs last month' }}
          accent="#7C3AED"
          delay={0.35}
        />
      </div>

      {/* ---- Main Bento Grid Row 1: Chart + Status + Today ---- */}
      <div
        className="grid mb-5"
        style={{ gridTemplateColumns: '1fr 320px', gap: 14 }}
      >
        {/* Weekly Appointments Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="card p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Weekly Appointments</h3>
              <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>
                Completed vs total — this week
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div style={{ width: 10, height: 10, borderRadius: 3, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }} />
                <span style={{ fontSize: 11, color: '#64748B' }}>Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div style={{ width: 10, height: 10, borderRadius: 3, background: '#EEF2FF' }} />
                <span style={{ fontSize: 11, color: '#64748B' }}>Total</span>
              </div>
            </div>
          </div>
          <MiniBarChart data={weeklyAppointments} />
        </motion.div>

        {/* Appointment Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="card p-5"
        >
          <div className="mb-5">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Status Overview</h3>
            <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>Today's breakdown</p>
          </div>

          {/* Big donut-like number */}
          <div className="flex items-center justify-center mb-5">
            <div
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: 100, height: 100,
                background: 'conic-gradient(#4F46E5 50%, #22C55E 50% 100%)',
              }}
            >
              <div
                className="absolute flex items-center justify-center rounded-full bg-white"
                style={{ width: 74, height: 74 }}
              >
                <div className="text-center">
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                    {stats.todayAppointments}
                  </div>
                  <div style={{ fontSize: 9, color: '#94A3B8', fontWeight: 600 }}>TODAY</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <AppointmentStatusBar label="Confirmed"  count={stats.todayAppointments - stats.pendingAppointments - stats.completedToday - stats.cancelledToday} total={stats.todayAppointments} color="#4F46E5" />
            <AppointmentStatusBar label="Completed"  count={stats.completedToday}  total={stats.todayAppointments} color="#22C55E" />
            <AppointmentStatusBar label="Pending"    count={stats.pendingAppointments} total={stats.todayAppointments} color="#F59E0B" />
            <AppointmentStatusBar label="Cancelled"  count={stats.cancelledToday}  total={stats.todayAppointments} color="#EF4444" />
          </div>
        </motion.div>
      </div>

      {/* ---- Main Bento Grid Row 2: Today Appts + Activity ---- */}
      <div
        className="grid mb-5"
        style={{ gridTemplateColumns: '1fr 1fr', gap: 14 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <TodayAppointments />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <RecentActivity />
        </motion.div>
      </div>

      {/* ---- Main Bento Grid Row 3: Top Doctors + Departments ---- */}
      <div
        className="grid mb-5"
        style={{ gridTemplateColumns: '340px 1fr', gap: 14 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <TopDoctors />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <DepartmentOverview />
        </motion.div>
      </div>
    </div>
  );
}
