// ============================================================
// TodayAppointments — Today's appointment list card
// ============================================================
import { motion } from 'framer-motion';
import { Clock, MapPin, AlertCircle } from 'lucide-react';
import { appointments } from '../../data/dummyData';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

const today = new Date().toISOString().slice(0, 10);

// Show today's + upcoming for demo (use all for display)
const todayList = appointments.slice(0, 6);

export default function TodayAppointments() {
  return (
    <div className="card" style={{ height: '100%' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid #F1F5F9' }}
      >
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Today's Appointments</h3>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <span
          style={{
            fontSize: 11, fontWeight: 700, color: '#4F46E5',
            background: '#EEF2FF', padding: '3px 10px',
            borderRadius: 99,
          }}
        >
          {todayList.length} total
        </span>
      </div>

      {/* List */}
      <div className="px-4 py-2">
        {todayList.map((appt, i) => (
          <motion.div
            key={appt.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-150"
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            {/* Avatar */}
            <Avatar name={appt.patientName} size={36} />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>
                  {appt.patientName}
                </span>
                {appt.isEmergency && (
                  <AlertCircle size={12} color="#EF4444" />
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span style={{ fontSize: 11, color: '#94A3B8' }}>
                  {appt.doctorName.replace('Dr. ', 'Dr. ')}
                </span>
                <span style={{ fontSize: 11, color: '#CBD5E1' }}>·</span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>{appt.department}</span>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-1">
              <Badge status={appt.status} dot={false} />
              <div className="flex items-center gap-1">
                <Clock size={10} color="#94A3B8" />
                <span style={{ fontSize: 11, color: '#94A3B8' }}>{appt.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 pt-2 text-center" style={{ borderTop: '1px solid #F8FAFC' }}>
        <button style={{ fontSize: 12, color: '#4F46E5', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
          View all appointments →
        </button>
      </div>
    </div>
  );
}
