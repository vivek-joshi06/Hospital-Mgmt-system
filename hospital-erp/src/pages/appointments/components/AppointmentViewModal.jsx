// ============================================================
// Appointment View Modal — Detail Card
// ============================================================
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, CalendarDays, Clock, Stethoscope, Users,
  Activity, Tag, DollarSign, FileText, StickyNote,
  AlertCircle, Pencil, Building2, CheckCircle2,
} from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import { formatDate, formatCurrency } from '../../../utils/helpers';

// ---- Status colors ----
const STATUS_BG = {
  Pending:   { header: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', tag: '#FEF3C7', tc: '#92400E' },
  Confirmed: { header: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', tag: '#DBEAFE', tc: '#1D4ED8' },
  Completed: { header: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', tag: '#DCFCE7', tc: '#15803D' },
  Cancelled: { header: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', tag: '#FEE2E2', tc: '#DC2626' },
};

function InfoRow({ icon: Icon, label, value, iconColor = '#64748B', iconBg = '#F8FAFC' }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 32, height: 32, background: iconBg }}>
        <Icon size={14} color={iconColor} />
      </div>
      <div className="flex-1">
        <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 13, color: '#0F172A', fontWeight: 600, marginTop: 1, lineHeight: 1.5 }}>{value}</div>
      </div>
    </div>
  );
}

export default function AppointmentViewModal({ isOpen, appointment: a, onClose, onEdit }) {
  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!a) return null;

  const status  = a.appointmentStatus || a.status || 'Pending';
  const style   = STATUS_BG[status] || STATUS_BG.Pending;
  const date    = a.appointmentDate || a.date;
  const time    = a.appointmentTime || a.time;
  const amount  = a.totalConsultedAmount || a.amount || 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-overlay"
          style={{ zIndex: 55 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="modal-content"
            style={{ maxWidth: 520 }}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ---- Gradient Header (color changes by status) ---- */}
            <div
              className="relative px-6 pt-6 pb-7 overflow-hidden"
              style={{ background: style.header, borderRadius: '20px 20px 0 0' }}
            >
              <div style={{ position: 'absolute', top: -24, right: -24, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ position: 'absolute', bottom: -10, right: 60, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

              {/* Close */}
              <button
                onClick={onClose}
                style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: '#fff', padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center' }}
              >
                <X size={15} />
              </button>

              <div className="flex items-start justify-between relative">
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                    Appointment
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                    #{String(a.id).padStart(4, '0')}
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>
                      {status}
                    </span>
                    {a.type && (
                      <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99 }}>
                        {a.type}
                      </span>
                    )}
                    {a.isEmergency && (
                      <span style={{ background: '#FFF1F2', color: '#E11D48', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <AlertCircle size={10} /> EMERGENCY
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Amount</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{formatCurrency(amount)}</div>
                </div>
              </div>

              {/* Date/Time strip */}
              <div
                className="flex items-center gap-4 mt-4 relative"
                style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px' }}
              >
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} color="rgba(255,255,255,0.8)" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{formatDate(date)}</span>
                </div>
                <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.25)' }} />
                <div className="flex items-center gap-2">
                  <Clock size={14} color="rgba(255,255,255,0.8)" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{time}</span>
                </div>
              </div>
            </div>

            {/* ---- Body ---- */}
            <div className="p-5 space-y-4">
              {/* Doctor + Patient cards */}
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {/* Doctor */}
                <div className="rounded-xl p-3" style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Physician
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar name={a.doctorName} size={30} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{a.doctorName}</div>
                      <div style={{ fontSize: 10, color: '#6366F1' }}>{a.department}</div>
                    </div>
                  </div>
                </div>
                {/* Patient */}
                <div className="rounded-xl p-3" style={{ background: '#F0FDFA', border: '1px solid #99F6E4' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#0D9488', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Patient
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar name={a.patientName} size={30} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{a.patientName}</div>
                      <div style={{ fontSize: 10, color: '#0D9488' }}>{a.patientPhone || '—'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                {a.description && (
                  <InfoRow icon={FileText} label="Description / Chief Complaint" value={a.description} iconColor="#4F46E5" iconBg="#EEF2FF" />
                )}
                {a.specialRemarks && (
                  <InfoRow icon={StickyNote} label="Special Remarks" value={a.specialRemarks} iconColor="#D97706" iconBg="#FFFBEB" />
                )}
                <InfoRow icon={Building2} label="Department" value={a.department} iconColor="#0D9488" iconBg="#F0FDFA" />
              </div>

              {/* If no description or remarks */}
              {!a.description && !a.specialRemarks && (
                <div
                  className="rounded-xl py-4 text-center"
                  style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}
                >
                  <p style={{ fontSize: 13, color: '#94A3B8' }}>No additional notes for this appointment.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-end gap-2 px-5 py-4"
              style={{ borderTop: '1px solid #F1F5F9' }}
            >
              <button onClick={onClose} className="btn btn-secondary btn-sm">Close</button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { onClose(); onEdit(a); }}
                className="btn btn-primary btn-sm flex items-center gap-1.5"
              >
                <Pencil size={13} /> Edit Appointment
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
