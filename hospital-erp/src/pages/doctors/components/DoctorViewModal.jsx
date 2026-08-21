// ============================================================
// Doctor View Modal — Premium Profile Card
// ============================================================
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Phone, Mail, GraduationCap, Building2,
  Clock, Activity, DollarSign, CalendarDays,
  Pencil, Star, CheckCircle2,
} from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import { formatCurrency } from '../../../utils/helpers';

function InfoBlock({ icon: Icon, label, value, iconColor = '#64748B', iconBg = '#F8FAFC' }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 32, height: 32, background: iconBg }}>
        <Icon size={14} color={iconColor} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 13, color: '#0F172A', fontWeight: 600, marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}

const DAY_SHORT = { Monday: 'M', Tuesday: 'T', Wednesday: 'W', Thursday: 'Th', Friday: 'F', Saturday: 'Sa', Sunday: 'Su' };

export default function DoctorViewModal({ isOpen, doctor, onClose, onEdit }) {
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

  if (!doctor) return null;

  const days = doctor.availableDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
            style={{ maxWidth: 500 }}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Header */}
            <div
              className="relative px-6 pt-6 pb-8 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4F46E5 60%, #7C3AED 100%)', borderRadius: '20px 20px 0 0' }}
            >
              <div style={{ position: 'absolute', top: -24, right: -24, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ position: 'absolute', bottom: -10, right: 70, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

              {/* Close */}
              <button
                onClick={onClose}
                style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', color: '#fff', padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center' }}
              >
                <X size={15} />
              </button>

              <div className="flex items-center gap-4 relative">
                <div className="relative">
                  <Avatar name={doctor.name} size={60} />
                  {doctor.isActive && (
                    <div style={{ position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: '50%', background: '#22C55E', border: '2px solid #fff' }} />
                  )}
                </div>
                <div className="flex-1">
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{doctor.name}</h2>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>
                    {doctor.qualification}
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 99 }}>
                      {doctor.specialization}
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 99 }}>
                      {doctor.department}
                    </span>
                    <Badge status={doctor.isActive ? 'Active' : 'Inactive'} />
                  </div>
                </div>
              </div>

              {/* Stats strip */}
              <div
                className="grid mt-5 relative"
                style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}
              >
                {[
                  { label: 'Experience',     value: `${doctor.experience || 0} yrs` },
                  { label: 'Consultations',  value: (doctor.consultations || 0).toLocaleString() },
                  { label: 'Consult. Fee',   value: formatCurrency(doctor.consultationFee || 0) },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>{value}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 2, fontWeight: 500 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              {/* Contact Info */}
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <InfoBlock icon={Phone}  label="Phone"  value={doctor.phone}  iconColor="#2563EB" iconBg="#EFF6FF" />
                <InfoBlock icon={Mail}   label="Email"  value={doctor.email}  iconColor="#7C3AED" iconBg="#F5F3FF" />
                <InfoBlock icon={Building2} label="Department" value={doctor.department} iconColor="#0D9488" iconBg="#F0FDFA" />
                <InfoBlock icon={GraduationCap} label="Qualification" value={doctor.qualification} iconColor="#D97706" iconBg="#FFFBEB" />
              </div>

              {/* Bio */}
              {doctor.bio && (
                <div className="rounded-xl p-3" style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, marginBottom: 4 }}>BIO / NOTES</div>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{doctor.bio}</p>
                </div>
              )}

              {/* Available Days */}
              <div>
                <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, marginBottom: 8 }}>
                  <CalendarDays size={11} style={{ display: 'inline', marginRight: 4 }} />
                  AVAILABLE DAYS
                </div>
                <div className="flex gap-2">
                  {ALL_DAYS.map((d) => {
                    const avail = days.includes(d);
                    return (
                      <div
                        key={d}
                        className="flex flex-col items-center gap-1"
                        style={{ minWidth: 30 }}
                      >
                        <div
                          style={{
                            width: 32, height: 32,
                            borderRadius: 8,
                            background: avail ? '#EEF2FF' : '#F8FAFC',
                            border: `1.5px solid ${avail ? '#C7D2FE' : '#F1F5F9'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          {avail
                            ? <CheckCircle2 size={14} color="#4F46E5" />
                            : <span style={{ fontSize: 10, color: '#CBD5E1', fontWeight: 600 }}>✕</span>}
                        </div>
                        <span style={{ fontSize: 9, color: avail ? '#4F46E5' : '#CBD5E1', fontWeight: 700 }}>
                          {DAY_SHORT[d]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
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
                onClick={() => { onClose(); onEdit(doctor); }}
                className="btn btn-primary btn-sm flex items-center gap-1.5"
              >
                <Pencil size={13} /> Edit Profile
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
