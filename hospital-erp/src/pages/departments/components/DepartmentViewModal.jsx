// ============================================================
// Department View Modal — Rich detail with assigned doctors
// ============================================================
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Pencil, MapPin, Phone, User,
  Stethoscope, Users, Building2, Activity,
  CheckCircle2, XCircle,
} from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';

function InfoRow({ icon: Icon, label, value, iconColor = '#64748B', iconBg = '#F8FAFC' }) {
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

export default function DepartmentViewModal({
  isOpen, department: dept, onClose, onEdit,
  assignedDoctors = [],
}) {
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

  if (!dept) return null;

  const color    = dept.color || '#4F46E5';
  const isActive = dept.isActive !== false;

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
            {/* ---- Header ---- */}
            <div
              className="relative px-6 pt-6 pb-7 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}DD 0%, ${color} 100%)`,
                borderRadius: '20px 20px 0 0',
              }}
            >
              <div style={{ position: 'absolute', top: -24, right: -24, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ position: 'absolute', bottom: -10, right: 70, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

              <button
                onClick={onClose}
                style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: '#fff', padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center' }}
              >
                <X size={15} />
              </button>

              <div className="flex items-center gap-4 relative">
                {/* Big icon */}
                <div
                  className="flex items-center justify-center rounded-2xl text-4xl shrink-0"
                  style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.2)' }}
                >
                  {dept.icon || '🏥'}
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{dept.name}</h2>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 3 }}>
                    Dept ID #{String(dept.id).padStart(3, '0')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge status={isActive ? 'Active' : 'Inactive'} />
                  </div>
                </div>
              </div>

              {/* Stats strip */}
              <div
                className="grid mt-4 relative"
                style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}
              >
                {[
                  { label: 'Doctors',  value: assignedDoctors.length },
                  { label: 'Patients', value: dept.patients || 0 },
                  { label: 'Capacity', value: dept.capacity || '—' },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{value}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- Body ---- */}
            <div className="p-5 space-y-4">
              {/* Description */}
              {dept.description && (
                <div className="rounded-xl p-4" style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, marginBottom: 6 }}>DESCRIPTION</div>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7 }}>{dept.description}</p>
                </div>
              )}

              {/* Info rows */}
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <InfoRow icon={User}     label="Head Doctor" value={dept.headDoctor} iconColor={color} iconBg={color + '15'} />
                <InfoRow icon={Phone}    label="Department Phone" value={dept.phone} iconColor="#2563EB" iconBg="#EFF6FF" />
                <InfoRow icon={MapPin}   label="Location" value={dept.location} iconColor="#DC2626" iconBg="#FEF2F2" />
                <InfoRow icon={Users}    label="Capacity" value={dept.capacity ? `${dept.capacity} beds` : undefined} iconColor="#D97706" iconBg="#FFFBEB" />
              </div>

              {/* Assigned Doctors */}
              <div>
                <div
                  className="flex items-center gap-2 mb-3"
                  style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                >
                  <Stethoscope size={13} />
                  Assigned Doctors ({assignedDoctors.length})
                </div>

                {assignedDoctors.length === 0 ? (
                  <div
                    className="rounded-xl py-5 text-center"
                    style={{ background: '#F8FAFC', border: '1px dashed #E2E8F0' }}
                  >
                    <p style={{ fontSize: 13, color: '#94A3B8' }}>No doctors assigned to this department yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2" style={{ maxHeight: 200, overflowY: 'auto' }}>
                    {assignedDoctors.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                        style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}
                      >
                        <div className="relative">
                          <Avatar name={doc.name} size={32} />
                          {doc.isActive && (
                            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: '#22C55E', border: '1.5px solid #fff' }} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {doc.name}
                          </div>
                          <div style={{ fontSize: 11, color: '#94A3B8' }}>{doc.specialization}</div>
                        </div>
                        {doc.isActive
                          ? <CheckCircle2 size={14} color="#22C55E" />
                          : <XCircle size={14} color="#94A3B8" />}
                      </div>
                    ))}
                  </div>
                )}
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
                onClick={() => { onClose(); onEdit(dept); }}
                className="btn btn-primary btn-sm flex items-center gap-1.5"
              >
                <Pencil size={13} /> Edit Department
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
