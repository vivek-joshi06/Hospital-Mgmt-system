// ============================================================
// Department CRUD — Zod Validation Schema
// ============================================================
import { z } from 'zod';

export const departmentSchema = z.object({
  name: z
    .string()
    .min(2, 'Department name must be at least 2 characters')
    .max(80, 'Name is too long')
    .regex(/^[a-zA-Z\s&()/-]+$/, 'Name contains invalid characters'),

  description: z
    .string()
    .max(400, 'Description is too long')
    .optional()
    .or(z.literal('')),

  headDoctor: z
    .string()
    .max(80, 'Name too long')
    .optional()
    .or(z.literal('')),

  location: z
    .string()
    .max(100, 'Location is too long')
    .optional()
    .or(z.literal('')),

  phone: z
    .string()
    .max(20, 'Phone too long')
    .regex(/^[+\d\s\-()]*$/, 'Invalid phone format')
    .optional()
    .or(z.literal('')),

  capacity: z
    .number({ invalid_type_error: 'Enter a valid number' })
    .min(1, 'Capacity must be at least 1')
    .max(500, 'Capacity too high')
    .optional(),

  icon: z
    .string()
    .min(1, 'Please select an icon'),

  color: z
    .string()
    .min(1, 'Please select a color'),

  isActive: z.boolean().default(true),
});

export const departmentDefaultValues = {
  name:        '',
  description: '',
  headDoctor:  '',
  location:    '',
  phone:       '',
  capacity:    undefined,
  icon:        '🏥',
  color:       '#4F46E5',
  isActive:    true,
};

export const DEPT_ICONS = [
  '🫀','🧠','🦴','👶','🩺','👁️','🌸','🧩','🚨','⚕️',
  '🦷','🩻','💊','🧬','🏥','🩹','🔬','💉','🫁','❤️',
];

export const DEPT_COLORS = [
  { label: 'Indigo',  value: '#4F46E5' },
  { label: 'Blue',    value: '#2563EB' },
  { label: 'Cyan',    value: '#0891B2' },
  { label: 'Teal',    value: '#0D9488' },
  { label: 'Green',   value: '#16A34A' },
  { label: 'Emerald', value: '#059669' },
  { label: 'Red',     value: '#DC2626' },
  { label: 'Rose',    value: '#E11D48' },
  { label: 'Pink',    value: '#DB2777' },
  { label: 'Purple',  value: '#7C3AED' },
  { label: 'Amber',   value: '#D97706' },
  { label: 'Orange',  value: '#EA580C' },
];
