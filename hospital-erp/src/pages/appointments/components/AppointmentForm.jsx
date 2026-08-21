// ============================================================
// Appointment Form — React Hook Form + Zod
// Searchable Doctor & Patient dropdowns
// ============================================================
import { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  Stethoscope, Users, CalendarDays, Clock,
  Activity, Tag, FileText, StickyNote,
  DollarSign, AlertCircle, ToggleLeft, ToggleRight,
} from 'lucide-react';
import { appointmentSchema, appointmentDefaultValues, APPOINTMENT_TYPES, APPOINTMENT_STATUSES, TIME_SLOTS } from '../appointmentSchema';
import { calcAge } from '../../../utils/helpers';
import SearchableDropdown from '../../../components/ui/SearchableDropdown';

// ---- Field wrapper ----
function Field({ label, required, error, icon: Icon, children }) {
  return (
    <div>
      <label className="form-label flex items-center gap-1.5">
        {Icon && <Icon size={12} color="#94A3B8" />}
        {label}
        {required && <span style={{ color: '#EF4444', fontSize: 12 }}>*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1 mt-1.5">
          <AlertCircle size={11} color="#EF4444" />
          <span style={{ fontSize: 11, color: '#EF4444' }}>{error}</span>
        </div>
      )}
    </div>
  );
}

function Section({ title, description }) {
  return (
    <div className="mb-1 mt-5 pb-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{title}</div>
      {description && <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{description}</div>}
    </div>
  );
}

// ============================================================
export default function AppointmentForm({
  defaultValues, onSubmit, loading, onCancel, mode = 'create',
  doctors, patients,
}) {
  const {
    register, handleSubmit, watch, setValue, reset, control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: defaultValues || appointmentDefaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const isEmergency = watch('isEmergency');
  const watchDoctorId  = watch('doctorId');
  const watchPatientId = watch('patientId');

  // Build options for searchable dropdowns
  const doctorOptions = useMemo(() =>
    (doctors || []).filter((d) => d.isActive).map((d) => ({
      value:    d.id,
      label:    d.name,
      sublabel: d.specialization,
      sublabel2:d.department,
      avatar:   d.name,
    })),
  [doctors]);

  const patientOptions = useMemo(() =>
    (patients || []).filter((p) => p.isActive).map((p) => ({
      value:    p.id,
      label:    p.name,
      sublabel: p.phone,
      sublabel2:`Age ${calcAge(p.dateOfBirth || p.dob)}`,
      avatar:   p.name,
    })),
  [patients]);

  // Auto-fill amount from selected doctor's fee
  useEffect(() => {
    if (watchDoctorId && mode === 'create') {
      const doc = (doctors || []).find((d) => d.id === watchDoctorId);
      if (doc?.consultationFee) {
        setValue('totalConsultedAmount', doc.consultationFee, { shouldDirty: true });
      }
    }
  }, [watchDoctorId, doctors, mode, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* ---- People ---- */}
      <Section title="Doctor & Patient" description="Select the physician and patient for this appointment" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
        {/* Doctor picker */}
        <Field label="Select Doctor" required icon={Stethoscope} error={errors.doctorId?.message}>
          <Controller
            name="doctorId"
            control={control}
            render={({ field }) => (
              <SearchableDropdown
                id="appt-doctor-picker"
                placeholder="Search doctors…"
                options={doctorOptions}
                value={field.value}
                onChange={field.onChange}
                error={!!errors.doctorId}
              />
            )}
          />
        </Field>

        {/* Patient picker */}
        <Field label="Select Patient" required icon={Users} error={errors.patientId?.message}>
          <Controller
            name="patientId"
            control={control}
            render={({ field }) => (
              <SearchableDropdown
                id="appt-patient-picker"
                placeholder="Search patients…"
                options={patientOptions}
                value={field.value}
                onChange={field.onChange}
                error={!!errors.patientId}
              />
            )}
          />
        </Field>
      </div>

      {/* ---- Schedule ---- */}
      <Section title="Schedule" description="Set the appointment date and time" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 14 }}>
        {/* Date */}
        <Field label="Appointment Date" required icon={CalendarDays} error={errors.appointmentDate?.message}>
          <input
            id="appt-date"
            type="date"
            {...register('appointmentDate')}
            className="form-input"
            style={{ borderColor: errors.appointmentDate ? '#EF4444' : undefined }}
          />
        </Field>

        {/* Time */}
        <Field label="Appointment Time" required icon={Clock} error={errors.appointmentTime?.message}>
          <select
            id="appt-time"
            {...register('appointmentTime')}
            className="form-input"
            style={{ borderColor: errors.appointmentTime ? '#EF4444' : undefined }}
          >
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        {/* Status */}
        <Field label="Appointment Status" required icon={Activity} error={errors.appointmentStatus?.message}>
          <select
            id="appt-status"
            {...register('appointmentStatus')}
            className="form-input"
            style={{ borderColor: errors.appointmentStatus ? '#EF4444' : undefined }}
          >
            {APPOINTMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      {/* ---- Details ---- */}
      <Section title="Appointment Details" description="Type, amount, and clinical notes" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
        {/* Type */}
        <Field label="Appointment Type" required icon={Tag} error={errors.type?.message}>
          <select
            id="appt-type"
            {...register('type')}
            className="form-input"
            style={{ borderColor: errors.type ? '#EF4444' : undefined }}
          >
            {APPOINTMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        {/* Amount */}
        <Field label="Consultation Amount ($)" icon={DollarSign} error={errors.totalConsultedAmount?.message}>
          <input
            id="appt-amount"
            type="number"
            min={0}
            {...register('totalConsultedAmount', { valueAsNumber: true })}
            placeholder="e.g. 250"
            className="form-input"
            style={{ borderColor: errors.totalConsultedAmount ? '#EF4444' : undefined }}
          />
        </Field>

        {/* Description */}
        <div style={{ gridColumn: 'span 2' }}>
          <Field label="Description / Chief Complaint" icon={FileText} error={errors.description?.message}>
            <textarea
              id="appt-description"
              {...register('description')}
              placeholder="Describe the reason for appointment, symptoms, or primary concern…"
              rows={3}
              className="form-input"
              style={{ resize: 'vertical', borderColor: errors.description ? '#EF4444' : undefined }}
            />
          </Field>
        </div>

        {/* Special Remarks */}
        <div style={{ gridColumn: 'span 2' }}>
          <Field label="Special Remarks" icon={StickyNote} error={errors.specialRemarks?.message}>
            <textarea
              id="appt-remarks"
              {...register('specialRemarks')}
              placeholder="Allergies, special instructions, priority notes…"
              rows={2}
              className="form-input"
              style={{ resize: 'vertical', borderColor: errors.specialRemarks ? '#EF4444' : undefined }}
            />
          </Field>
        </div>
      </div>

      {/* ---- Emergency Toggle ---- */}
      <div
        className="flex items-center justify-between rounded-xl px-4 py-3 mb-4"
        style={{
          background: isEmergency ? '#FFF1F2' : '#F8FAFC',
          border: `1.5px solid ${isEmergency ? '#FECDD3' : '#F1F5F9'}`,
          transition: 'all 0.2s',
        }}
      >
        <div>
          <div className="flex items-center gap-2">
            <AlertCircle size={14} color={isEmergency ? '#E11D48' : '#94A3B8'} />
            <div style={{ fontSize: 13, fontWeight: 600, color: isEmergency ? '#E11D48' : '#0F172A' }}>
              Emergency Appointment
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
            Mark as emergency for priority handling and alerts
          </div>
        </div>
        <button
          type="button"
          id="emergency-toggle"
          onClick={() => setValue('isEmergency', !isEmergency, { shouldDirty: true })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {isEmergency
            ? <ToggleRight size={32} color="#E11D48" />
            : <ToggleLeft  size={32} color="#CBD5E1" />}
        </button>
      </div>

      {/* ---- Actions ---- */}
      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #F1F5F9' }}>
        <button
          type="button"
          onClick={() => reset(appointmentDefaultValues)}
          className="btn btn-ghost btn-sm"
          disabled={!isDirty || loading}
        >
          Reset
        </button>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onCancel} className="btn btn-secondary" disabled={loading}>
            Cancel
          </button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading
              ? <><span className="spinner" /> Saving…</>
              : mode === 'create' ? 'Book Appointment' : 'Save Changes'}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
