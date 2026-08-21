// ============================================================
// Doctor CRUD — Zod Validation Schema
// ============================================================
import { z } from 'zod';

export const doctorSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long')
    .regex(/^[a-zA-Z\s'.,-]+$/, 'Name contains invalid characters'),

  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^[+\d\s\-()]+$/, 'Invalid phone format'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),

  qualification: z
    .string()
    .min(2, 'Qualification is required')
    .max(100, 'Qualification is too long'),

  specialization: z
    .string()
    .min(2, 'Specialization is required')
    .max(80, 'Specialization is too long'),

  department: z
    .string()
    .min(1, 'Please select a department'),

  experience: z
    .number({ invalid_type_error: 'Enter years of experience' })
    .min(0, 'Experience cannot be negative')
    .max(60, 'Please enter a valid experience value'),

  bio: z
    .string()
    .max(400, 'Bio is too long')
    .optional()
    .or(z.literal('')),

  consultationFee: z
    .number({ invalid_type_error: 'Enter a valid fee' })
    .min(0, 'Fee cannot be negative')
    .max(99999, 'Fee seems too high')
    .optional(),

  availableDays: z
    .array(z.string())
    .min(1, 'Select at least one available day'),

  isActive: z.boolean().default(true),
});

export const doctorDefaultValues = {
  name:            '',
  phone:           '',
  email:           '',
  qualification:   '',
  specialization:  '',
  department:      '',
  experience:      0,
  bio:             '',
  consultationFee: 200,
  availableDays:   ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  isActive:        true,
};

export const SPECIALIZATIONS = [
  'Cardiologist', 'Neurologist', 'Orthopedic Surgeon', 'Pediatrician',
  'Dermatologist', 'Ophthalmologist', 'Gynecologist', 'Psychiatrist',
  'Emergency Physician', 'General Practitioner', 'Oncologist',
  'Endocrinologist', 'Gastroenterologist', 'Pulmonologist',
  'Rheumatologist', 'Urologist', 'Anesthesiologist', 'Radiologist',
  'Pathologist', 'Nephrologist',
];

export const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];
