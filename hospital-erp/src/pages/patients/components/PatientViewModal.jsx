// ============================================================
// Patient View Modal — Read-only detail card
// ============================================================
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Phone, Mail, MapPin, Calendar,
  Activity, Heart, Pencil, Clock,
} from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import { calcAge, formatDate } from '../../../utils/helpers';

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div
        className="flex items-center justify-center rounded-lg shrink-0 mt-0.5"
        style={{ width: 30, height: 30, background: '#F8FAFC' }}
      >
        <Icon size={13} color="#64748B" />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 13, color: '#0F172A', fontWeight: 500, marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}

export default function PatientViewModal({ isOpen, patient, onClose, onEdit }) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!patient) return null;
  const age = calcAge(patient.dateOfBirth || patient.dob);
  const dob = formatDate(patient.dateOfBirth || patient.dob);

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
            style={{ maxWidth: 480 }}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ---- Gradient Header ---- */}
            <div
              className="relative px-6 pt-6 pb-8 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                borderRadius: '20px 20px 0 0',
              }}
            >
              {/* Decorative circles */}
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ position: 'absolute', bottom: -10, right: 60, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

              {/* Close btn */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none', cursor: 'pointer',
                  color: '#fff', padding: 6, borderRadius: 8,
                  display: 'flex', alignItems: 'center',
                }}
              >
                <X size={15} />
              </button>

              <div className="flex items-center gap-4 relative">
                <Avatar name={patient.name} size={56} />
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{patient.name}</h2>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>
                    Patient ID #{String(patient.id).padStart(4, '0')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.18)',
                        color: '#fff', fontSize: 11, fontWeight: 600,
                        padding: '2px 10px', borderRadius: 99,
                      }}
                    >
                      {patient.gender}
                    </span>
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.18)',
                        color: '#fff', fontSize: 11, fontWeight: 600,
                        padding: '2px 10px', borderRadius: 99,
                      }}
                    >
                      {age} years old
                    </span>
                    <Badge status={patient.isActive ? 'Active' : 'Inactive'} />
                  </div>
                </div>
              </div>
            </div>

            {/* ---- Body ---- */}
            <div className="p-6 space-y-4">
              {/* Stats row */}
              <div
                className="grid"
                style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}
              >
                {[
                  { label: 'Total Visits',  value: patient.totalVisits ?? 0 },
                  { label: 'Last Visit',    value: patient.lastVisit ? formatDate(patient.lastVisit) : '—' },
                  { label: 'Date of Birth', value: dob },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{value}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Info rows */}
              <div className="space-y-3 pt-2">
                <InfoRow icon={Phone}    label="Phone"   value={patient.phone} />
                <InfoRow icon={Mail}     label="Email"   value={patient.email} />
                <InfoRow icon={MapPin}   label="Address" value={patient.address} />
                <InfoRow icon={MapPin}   label="City"    value={patient.city} />
                <InfoRow icon={Activity} label="Status"  value={patient.state || (patient.isActive ? 'Active' : 'Inactive')} />
              </div>
            </div>

            {/* ---- Footer ---- */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderTop: '1px solid #F1F5F9' }}
            >
              <div style={{ fontSize: 12, color: '#94A3B8' }}>
                <Clock size={11} style={{ display: 'inline', marginRight: 4 }} />
                Last updated recently
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="btn btn-secondary btn-sm">
                  Close
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { onClose(); onEdit(patient); }}
                  className="btn btn-primary btn-sm flex items-center gap-1.5"
                >
                  <Pencil size={13} /> Edit Patient
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
