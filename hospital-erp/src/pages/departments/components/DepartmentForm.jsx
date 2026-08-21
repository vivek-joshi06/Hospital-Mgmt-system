// ============================================================
// Department Form — React Hook Form + Zod
// Includes icon picker + color swatch picker
// ============================================================
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  Building2, FileText, User, MapPin,
  Phone, Users, AlertCircle,
  ToggleLeft, ToggleRight,
} from 'lucide-react';
import {
  departmentSchema, departmentDefaultValues,
  DEPT_ICONS, DEPT_COLORS,
} from '../departmentSchema';

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

// ---- Live preview tile ----
function DeptPreview({ icon, color, name }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl p-3 mb-4"
      style={{ background: (color || '#4F46E5') + '10', border: `1.5px solid ${color || '#4F46E5'}30` }}
    >
      <div
        className="flex items-center justify-center rounded-xl text-xl"
        style={{ width: 44, height: 44, background: (color || '#4F46E5') + '20' }}
      >
        {icon || '🏥'}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: color || '#4F46E5' }}>
          {name || 'Department Name'}
        </div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>Live preview</div>
      </div>
    </div>
  );
}

// ============================================================
export default function DepartmentForm({ defaultValues, onSubmit, loading, onCancel, mode = 'create' }) {
  const {
    register, handleSubmit, watch, setValue, reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: defaultValues || departmentDefaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const watchIcon     = watch('icon');
  const watchColor    = watch('color');
  const watchName     = watch('name');
  const watchIsActive = watch('isActive');

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* ---- Live Preview ---- */}
      <DeptPreview icon={watchIcon} color={watchColor} name={watchName} />

      {/* ---- Basic Info ---- */}
      <Section title="Department Information" description="Core details about this hospital division" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
        {/* Name */}
        <div style={{ gridColumn: 'span 2' }}>
          <Field label="Department Name" required icon={Building2} error={errors.name?.message}>
            <input
              id="dept-name"
              {...register('name')}
              placeholder="e.g. Cardiology, Neurology, Pediatrics"
              className="form-input"
              style={{ borderColor: errors.name ? '#EF4444' : undefined }}
            />
          </Field>
        </div>

        {/* Description */}
        <div style={{ gridColumn: 'span 2' }}>
          <Field label="Description" icon={FileText} error={errors.description?.message}>
            <textarea
              id="dept-description"
              {...register('description')}
              placeholder="Brief description of this department's focus, services, and specialties…"
              rows={3}
              className="form-input"
              style={{ resize: 'vertical', borderColor: errors.description ? '#EF4444' : undefined }}
            />
          </Field>
        </div>
      </div>

      {/* ---- Appearance ---- */}
      <Section title="Icon & Color" description="Customize how this department looks across the system" />

      <div style={{ marginBottom: 16 }}>
        {/* Icon picker */}
        <Field label="Department Icon" required error={errors.icon?.message}>
          <div className="flex flex-wrap gap-2 mt-1">
            {DEPT_ICONS.map((ic) => (
              <button
                key={ic}
                type="button"
                onClick={() => setValue('icon', ic, { shouldDirty: true })}
                style={{
                  width: 40, height: 40, borderRadius: 10, fontSize: 20,
                  border: '2px solid',
                  borderColor: watchIcon === ic ? watchColor || '#4F46E5' : '#E2E8F0',
                  background:  watchIcon === ic ? (watchColor || '#4F46E5') + '15' : '#F8FAFC',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  transform: watchIcon === ic ? 'scale(1.15)' : 'scale(1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {ic}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div style={{ marginBottom: 16 }}>
        {/* Color picker */}
        <Field label="Accent Color" required error={errors.color?.message}>
          <div className="flex flex-wrap gap-2 mt-1">
            {DEPT_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                title={c.label}
                onClick={() => setValue('color', c.value, { shouldDirty: true })}
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: c.value, border: '3px solid',
                  borderColor: watchColor === c.value ? '#0F172A' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  transform: watchColor === c.value ? 'scale(1.2)' : 'scale(1)',
                  boxShadow: watchColor === c.value ? `0 0 0 2px #fff, 0 0 0 4px ${c.value}` : 'none',
                }}
              />
            ))}
          </div>
        </Field>
      </div>

      {/* ---- Contact & Location ---- */}
      <Section title="Contact & Location" description="Physical and operational details" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
        <Field label="Head Doctor / HOD" icon={User} error={errors.headDoctor?.message}>
          <input
            id="dept-head"
            {...register('headDoctor')}
            placeholder="e.g. Dr. Sarah Mitchell"
            className="form-input"
            style={{ borderColor: errors.headDoctor ? '#EF4444' : undefined }}
          />
        </Field>

        <Field label="Department Phone" icon={Phone} error={errors.phone?.message}>
          <input
            id="dept-phone"
            type="tel"
            {...register('phone')}
            placeholder="e.g. +1-555-0100"
            className="form-input"
            style={{ borderColor: errors.phone ? '#EF4444' : undefined }}
          />
        </Field>

        <Field label="Location / Floor / Wing" icon={MapPin} error={errors.location?.message}>
          <input
            id="dept-location"
            {...register('location')}
            placeholder="e.g. Floor 3, East Wing"
            className="form-input"
            style={{ borderColor: errors.location ? '#EF4444' : undefined }}
          />
        </Field>

        <Field label="Bed / Room Capacity" icon={Users} error={errors.capacity?.message}>
          <input
            id="dept-capacity"
            type="number"
            min={1}
            {...register('capacity', { valueAsNumber: true })}
            placeholder="e.g. 30"
            className="form-input"
            style={{ borderColor: errors.capacity ? '#EF4444' : undefined }}
          />
        </Field>
      </div>

      {/* ---- Status ---- */}
      <Section title="Status" />

      <div
        className="flex items-center justify-between rounded-xl px-4 py-3 mb-4"
        style={{ background: '#F8FAFC', border: '1.5px solid #F1F5F9' }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Active Department</div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
            Inactive departments are hidden from doctor & appointment assignments
          </div>
        </div>
        <button
          type="button"
          id="dept-active-toggle"
          onClick={() => setValue('isActive', !watchIsActive, { shouldDirty: true })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {watchIsActive
            ? <ToggleRight size={32} color="#4F46E5" />
            : <ToggleLeft  size={32} color="#CBD5E1" />}
        </button>
      </div>

      {/* ---- Actions ---- */}
      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #F1F5F9' }}>
        <button type="button" onClick={() => reset(departmentDefaultValues)} className="btn btn-ghost btn-sm" disabled={!isDirty || loading}>
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
              : mode === 'create' ? 'Create Department' : 'Save Changes'}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
