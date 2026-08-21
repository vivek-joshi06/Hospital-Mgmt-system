// ============================================================
// Patient CRUD — Zod Validation Schema
// ============================================================
import { z } from 'zod';

export const patientSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long')
    .regex(/^[a-zA-Z\s'.,-]+$/, 'Name contains invalid characters'),

  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      const dob = new Date(val);
      const now  = new Date();
      return dob < now;
    }, 'Date of birth must be in the past')
    .refine((val) => {
      const dob  = new Date(val);
      const now  = new Date();
      const age  = now.getFullYear() - dob.getFullYear();
      return age <= 130;
    }, 'Invalid date of birth'),

  gender: z.enum(['Male', 'Female', 'Other'], {
    required_error: 'Gender is required',
  }),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),

  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^[+\d\s\-()]+$/, 'Invalid phone number format'),

  address: z
    .string()
    .max(200, 'Address is too long')
    .optional()
    .or(z.literal('')),

  city: z
    .string()
    .min(1, 'City is required')
    .max(60, 'City name is too long'),

  state: z.enum(
    ['Active', 'Inactive', 'Pending', 'Suspended'],
    { required_error: 'State / status is required' }
  ),

  isActive: z.boolean().default(true),
});

export const patientDefaultValues = {
  name:        '',
  dateOfBirth: '',
  gender:      '',
  email:       '',
  phone:       '',
  address:     '',
  city:        '',
  state:       'Active',
  isActive:    true,
};
