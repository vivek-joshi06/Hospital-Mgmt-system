// ============================================================
// Appointment CRUD — Zod Validation Schema
// ============================================================
import { z } from 'zod';

export const appointmentSchema = z.object({
  doctorId: z
    .number({ required_error: 'Please select a doctor', invalid_type_error: 'Please select a doctor' })
    .int()
    .positive('Please select a doctor'),

  patientId: z
    .number({ required_error: 'Please select a patient', invalid_type_error: 'Please select a patient' })
    .int()
    .positive('Please select a patient'),

  appointmentDate: z
    .string()
    .min(1, 'Appointment date is required')
    .refine((val) => {
      const d = new Date(val);
      return !isNaN(d.getTime());
    }, 'Invalid date'),

  appointmentTime: z
    .string()
    .min(1, 'Appointment time is required')
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),

  appointmentStatus: z.enum(
    ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    { required_error: 'Status is required' }
  ),

  type: z.enum(
    ['Consultation', 'Follow-up', 'Emergency', 'Check-up', 'Pre-op', 'Therapy', 'Routine'],
    { required_error: 'Appointment type is required' }
  ),

  description: z
    .string()
    .max(500, 'Description is too long')
    .optional()
    .or(z.literal('')),

  specialRemarks: z
    .string()
    .max(300, 'Special remarks too long')
    .optional()
    .or(z.literal('')),

  totalConsultedAmount: z
    .number({ invalid_type_error: 'Enter a valid amount' })
    .min(0, 'Amount cannot be negative')
    .max(999999, 'Amount too high')
    .optional(),

  isEmergency: z.boolean().default(false),
});

export const appointmentDefaultValues = {
  doctorId:             null,
  patientId:            null,
  appointmentDate:      '',
  appointmentTime:      '09:00',
  appointmentStatus:    'Pending',
  type:                 'Consultation',
  description:          '',
  specialRemarks:       '',
  totalConsultedAmount: 0,
  isEmergency:          false,
};

export const APPOINTMENT_TYPES = [
  'Consultation', 'Follow-up', 'Emergency',
  'Check-up', 'Pre-op', 'Therapy', 'Routine',
];

export const APPOINTMENT_STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

export const TIME_SLOTS = [
  '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00','17:30','18:00',
];
