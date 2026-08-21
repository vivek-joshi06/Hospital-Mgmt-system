// ============================================================
// Appointment Modal — Create / Edit
// ============================================================
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarPlus, Pencil } from 'lucide-react';
import AppointmentForm from './AppointmentForm';

export default function AppointmentModal({
  isOpen, mode, appointment, onClose, onSubmit, loading, doctors, patients,
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

  const defaultValues = appointment
    ? {
        doctorId:             appointment.doctorId             ?? null,
        patientId:            appointment.patientId            ?? null,
        appointmentDate:      appointment.appointmentDate || appointment.date || '',
        appointmentTime:      appointment.appointmentTime || appointment.time || '09:00',
        appointmentStatus:    appointment.appointmentStatus || appointment.status || 'Pending',
        type:                 appointment.type                 || 'Consultation',
        description:          appointment.description          || '',
        specialRemarks:       appointment.specialRemarks       || '',
        totalConsultedAmount: appointment.totalConsultedAmount || appointment.amount || 0,
        isEmergency:          appointment.isEmergency          ?? false,
      }
    : undefined;

  const isEdit = mode === 'edit';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="modal-content"
            style={{ maxWidth: 680 }}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid #F1F5F9' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{ width: 40, height: 40, background: isEdit ? '#EEF2FF' : '#F0FDF4' }}
                >
                  {isEdit ? <Pencil size={18} color="#4F46E5" /> : <CalendarPlus size={18} color="#16A34A" />}
                </div>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>
                    {isEdit ? 'Edit Appointment' : 'Book New Appointment'}
                  </h2>
                  <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
                    {isEdit
                      ? `Updating appointment #${String(appointment?.id || '').padStart(4, '0')}`
                      : 'Schedule a new appointment for a patient'}
                  </p>
                </div>
              </div>
              <button
                id="appt-modal-close"
                onClick={onClose}
                className="flex items-center justify-center rounded-xl transition-all duration-150"
                style={{ width: 34, height: 34, background: 'none', border: '1.5px solid #E2E8F0', cursor: 'pointer', color: '#64748B' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#0F172A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#64748B'; }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <AppointmentForm
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                loading={loading}
                onCancel={onClose}
                mode={mode}
                doctors={doctors}
                patients={patients}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
