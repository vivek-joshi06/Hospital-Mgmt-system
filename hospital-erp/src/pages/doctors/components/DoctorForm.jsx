// ============================================================
// Doctor Form — React Hook Form + Zod
// ============================================================
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  User, Phone, Mail, GraduationCap, Stethoscope,
  Building2, Clock, DollarSign, FileText,
  AlertCircle, ToggleLeft, ToggleRight, CalendarDays,
} from 'lucide-react';
import {
  doctorSchema, doctorDefaultValues,
  SPECIALIZATIONS, DAYS_OF_WEEK,
} from '../doctorSchema';

// ---- Shared field wrapper ----
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

// ---- Day Toggle Pill ----
function DayPill({ day, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
        cursor: 'pointer', border: '1.5px solid', transition: 'all 0.15s',
        borderColor: selected ? '#4F46E5' : '#E2E8F0',
        background:  selected ? '#EEF2FF'  : '#fff',
        color:       selected ? '#4F46E5'  : '#94A3B8',
      }}
    >
      {day.slice(0, 3)}
    </button>
  );
}

// ============================================================
export default function DoctorForm({
  defaultValues, onSubmit, loading, onCancel, mode = 'create', departments,
}) {
  const {
    register, handleSubmit, watch, setValue, reset, control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: defaultValues || doctorDefaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const isActive      = watch('isActive');
  const availableDays = watch('availableDays') || [];

  const toggleDay = (day) => {
    const next = availableDays.includes(day)
      ? availableDays.filter((d) => d !== day)
      : [...availableDays, day];
    setValue('availableDays', next, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* ---- Personal Info ---- */}
      <Section title="Doctor Information" description="Basic profile of the physician" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
        {/* Full Name */}
        <div style={{ gridColumn: 'span 2' }}>
          <Field label="Full Name" required icon={User} error={errors.name?.message}>
            <input
              id="doctor-name"
              {...register('name')}
              placeholder="e.g. Dr. Sarah Mitchell"
              className="form-input"
              style={{ borderColor: errors.name ? '#EF4444' : undefined }}
            />
          </Field>
        </div>

        {/* Qualification */}
        <Field label="Qualification" required icon={GraduationCap} error={errors.qualification?.message}>
          <input
            id="doctor-qualification"
            {...register('qualification')}
            placeholder="e.g. MD, FACC, MBBS"
            className="form-input"
            style={{ borderColor: errors.qualification ? '#EF4444' : undefined }}
          />
        </Field>

        {/* Specialization */}
        <Field label="Specialization" required icon={Stethoscope} error={errors.specialization?.message}>
          <select
            id="doctor-specialization"
            {...register('specialization')}
            className="form-input"
            style={{ borderColor: errors.specialization ? '#EF4444' : undefined }}
          >
            <option value="">Select specialization</option>
            {SPECIALIZATIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>

        {/* Department */}
        <Field label="Department" required icon={Building2} error={errors.department?.message}>
          <select
            id="doctor-department"
            {...register('department')}
            className="form-input"
            style={{ borderColor: errors.department ? '#EF4444' : undefined }}
          >
            <option value="">Select department</option>
            {(departments || []).map((d) => (
              <option key={d.id} value={d.name}>{d.icon} {d.name}</option>
            ))}
          </select>
        </Field>

        {/* Experience */}
        <Field label="Years of Experience" required icon={Clock} error={errors.experience?.message}>
          <input
            id="doctor-experience"
            type="number"
            min={0}
            max={60}
            {...register('experience', { valueAsNumber: true })}
            placeholder="e.g. 10"
            className="form-input"
            style={{ borderColor: errors.experience ? '#EF4444' : undefined }}
          />
        </Field>
      </div>

      {/* ---- Contact Info ---- */}
      <Section title="Contact Details" description="How to reach this doctor" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
        <Field label="Email Address" required icon={Mail} error={errors.email?.message}>
          <input
            id="doctor-email"
            type="email"
            {...register('email')}
            placeholder="doctor@medicore.com"
            className="form-input"
            style={{ borderColor: errors.email ? '#EF4444' : undefined }}
          />
        </Field>

        <Field label="Phone Number" required icon={Phone} error={errors.phone?.message}>
          <input
            id="doctor-phone"
            type="tel"
            {...register('phone')}
            placeholder="+1-555-0000"
            className="form-input"
            style={{ borderColor: errors.phone ? '#EF4444' : undefined }}
          />
        </Field>
      </div>

      {/* ---- Practice Details ---- */}
      <Section title="Practice Details" description="Schedule & consultation information" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
        {/* Consultation Fee */}
        <Field label="Consultation Fee ($)" icon={DollarSign} error={errors.consultationFee?.message}>
          <input
            id="doctor-fee"
            type="number"
            min={0}
            {...register('consultationFee', { valueAsNumber: true })}
            placeholder="e.g. 250"
            className="form-input"
            style={{ borderColor: errors.consultationFee ? '#EF4444' : undefined }}
          />
        </Field>

        {/* Available Days */}
        <Field label="Available Days" required icon={CalendarDays} error={errors.availableDays?.message}>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {DAYS_OF_WEEK.map((day) => (
              <DayPill
                key={day}
                day={day}
                selected={availableDays.includes(day)}
                onToggle={() => toggleDay(day)}
              />
            ))}
          </div>
        </Field>

        {/* Bio */}
        <div style={{ gridColumn: 'span 2' }}>
          <Field label="Short Bio / Notes" icon={FileText} error={errors.bio?.message}>
            <textarea
              id="doctor-bio"
              {...register('bio')}
              placeholder="Brief professional summary, areas of expertise, special remarks…"
              rows={3}
              className="form-input"
              style={{ resize: 'vertical', borderColor: errors.bio ? '#EF4444' : undefined }}
            />
          </Field>
        </div>
      </div>

      {/* ---- Status ---- */}
      <Section title="Account Settings" />

      <div
        className="flex items-center justify-between rounded-xl px-4 py-3 mb-4"
        style={{ background: '#F8FAFC', border: '1.5px solid #F1F5F9' }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Active Doctor</div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
            Inactive doctors won't appear in appointment booking
          </div>
        </div>
        <button
          type="button"
          id="doctor-active-toggle"
          onClick={() => setValue('isActive', !isActive, { shouldDirty: true })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {isActive
            ? <ToggleRight size={32} color="#4F46E5" />
            : <ToggleLeft  size={32} color="#CBD5E1" />}
        </button>
      </div>

      {/* ---- Actions ---- */}
      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #F1F5F9' }}>
        <button
          type="button"
          onClick={() => reset(doctorDefaultValues)}
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
              : mode === 'create' ? 'Add Doctor' : 'Save Changes'}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
