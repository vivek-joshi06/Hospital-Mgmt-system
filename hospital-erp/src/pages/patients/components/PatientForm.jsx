// ============================================================
// Patient Form — React Hook Form + Zod
// ============================================================
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  User, Calendar, Venus, Phone, Mail,
  MapPin, Building, Activity, ToggleLeft, ToggleRight,
  AlertCircle,
} from 'lucide-react';
import { patientSchema, patientDefaultValues } from '../patientSchema';
import { calcAge } from '../../../utils/helpers';

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

// ---- Section Divider ----
function Section({ title, description }) {
  return (
    <div className="mb-1 mt-5 pb-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{title}</div>
      {description && (
        <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{description}</div>
      )}
    </div>
  );
}

// ============================================================
export default function PatientForm({ defaultValues, onSubmit, loading, onCancel, mode = 'create' }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: defaultValues || patientDefaultValues,
  });

  // Reset when defaultValues change (edit mode)
  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const dobValue  = watch('dateOfBirth');
  const isActive  = watch('isActive');
  const ageCalc   = dobValue ? calcAge(dobValue) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ---- Personal Info ---- */}
      <Section title="Personal Information" description="Basic details about the patient" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
        {/* Full Name */}
        <div style={{ gridColumn: 'span 2' }}>
          <Field label="Full Name" required icon={User} error={errors.name?.message}>
            <input
              id="patient-name"
              {...register('name')}
              placeholder="e.g. Emily Johnson"
              className="form-input"
              style={{ borderColor: errors.name ? '#EF4444' : undefined }}
            />
          </Field>
        </div>

        {/* Date of Birth */}
        <Field label="Date of Birth" required icon={Calendar} error={errors.dateOfBirth?.message}>
          <div style={{ position: 'relative' }}>
            <input
              id="patient-dob"
              type="date"
              {...register('dateOfBirth')}
              className="form-input"
              style={{ borderColor: errors.dateOfBirth ? '#EF4444' : undefined }}
            />
            {ageCalc !== null && (
              <span
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 11, fontWeight: 600, color: '#4F46E5',
                  background: '#EEF2FF', padding: '2px 8px', borderRadius: 99,
                  pointerEvents: 'none',
                }}
              >
                {ageCalc} yrs
              </span>
            )}
          </div>
        </Field>

        {/* Gender */}
        <Field label="Gender" required icon={Venus} error={errors.gender?.message}>
          <select
            id="patient-gender"
            {...register('gender')}
            className="form-input"
            style={{ borderColor: errors.gender ? '#EF4444' : undefined }}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </Field>
      </div>

      {/* ---- Contact Info ---- */}
      <Section title="Contact Information" description="How to reach the patient" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
        {/* Email */}
        <Field label="Email Address" required icon={Mail} error={errors.email?.message}>
          <input
            id="patient-email"
            type="email"
            {...register('email')}
            placeholder="patient@email.com"
            className="form-input"
            style={{ borderColor: errors.email ? '#EF4444' : undefined }}
          />
        </Field>

        {/* Phone */}
        <Field label="Phone Number" required icon={Phone} error={errors.phone?.message}>
          <input
            id="patient-phone"
            type="tel"
            {...register('phone')}
            placeholder="+1-555-0000"
            className="form-input"
            style={{ borderColor: errors.phone ? '#EF4444' : undefined }}
          />
        </Field>

        {/* Address */}
        <div style={{ gridColumn: 'span 2' }}>
          <Field label="Address" icon={MapPin} error={errors.address?.message}>
            <textarea
              id="patient-address"
              {...register('address')}
              placeholder="Street address, apartment, suite…"
              rows={2}
              className="form-input"
              style={{ resize: 'vertical', borderColor: errors.address ? '#EF4444' : undefined }}
            />
          </Field>
        </div>

        {/* City */}
        <Field label="City" required icon={Building} error={errors.city?.message}>
          <input
            id="patient-city"
            {...register('city')}
            placeholder="e.g. New York"
            className="form-input"
            style={{ borderColor: errors.city ? '#EF4444' : undefined }}
          />
        </Field>

        {/* State (Status FK) */}
        <Field label="State / Status" required icon={Activity} error={errors.state?.message}>
          <select
            id="patient-state"
            {...register('state')}
            className="form-input"
            style={{ borderColor: errors.state ? '#EF4444' : undefined }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </Field>
      </div>

      {/* ---- Account Settings ---- */}
      <Section title="Account Settings" />

      {/* IsActive Toggle */}
      <div
        className="flex items-center justify-between rounded-xl px-4 py-3 mb-4"
        style={{ background: '#F8FAFC', border: '1.5px solid #F1F5F9' }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Active Patient</div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
            Inactive patients won't appear in booking search
          </div>
        </div>
        <button
          type="button"
          id="patient-active-toggle"
          onClick={() => setValue('isActive', !isActive, { shouldDirty: true })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {isActive
            ? <ToggleRight size={32} color="#4F46E5" />
            : <ToggleLeft  size={32} color="#CBD5E1" />
          }
        </button>
      </div>

      {/* ---- Form Actions ---- */}
      <div
        className="flex items-center justify-between pt-4"
        style={{ borderTop: '1px solid #F1F5F9' }}
      >
        <button
          type="button"
          onClick={() => reset(patientDefaultValues)}
          className="btn btn-ghost btn-sm"
          disabled={!isDirty || loading}
        >
          Reset
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner" /> Saving…</>
            ) : (
              mode === 'create' ? 'Register Patient' : 'Save Changes'
            )}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
