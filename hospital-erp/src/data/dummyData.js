// ============================================================
// MEDICORE ERP — DUMMY DATA
// Realistic hospital data for development & demonstration
// ============================================================

// ---- DEPARTMENTS ----
export const departments = [
  { id: 1, name: 'Cardiology',       icon: '🫀', color: '#EF4444', doctors: 8,  patients: 342 },
  { id: 2, name: 'Neurology',        icon: '🧠', color: '#8B5CF6', doctors: 6,  patients: 218 },
  { id: 3, name: 'Orthopedics',      icon: '🦴', color: '#F59E0B', doctors: 7,  patients: 295 },
  { id: 4, name: 'Pediatrics',       icon: '👶', color: '#06B6D4', doctors: 10, patients: 487 },
  { id: 5, name: 'Dermatology',      icon: '🩺', color: '#14B8A6', doctors: 5,  patients: 163 },
  { id: 6, name: 'Ophthalmology',    icon: '👁️', color: '#3B82F6', doctors: 4,  patients: 198 },
  { id: 7, name: 'Gynecology',       icon: '🌸', color: '#EC4899', doctors: 6,  patients: 271 },
  { id: 8, name: 'Psychiatry',       icon: '🧩', color: '#6366F1', doctors: 4,  patients: 134 },
  { id: 9, name: 'Emergency',        icon: '🚨', color: '#EF4444', doctors: 12, patients: 621 },
  { id: 10, name: 'General Medicine',icon: '⚕️', color: '#22C55E', doctors: 15, patients: 892 },
];

// ---- DOCTORS ----
export const doctors = [
  { id: 1,  name: 'Dr. Sarah Mitchell',   specialization: 'Cardiologist',       department: 'Cardiology',        qualification: 'MD, FACC',       phone: '+1-555-0101', email: 'sarah.mitchell@medicore.com', isActive: true,  experience: 14, avatar: 'SM', consultations: 1240 },
  { id: 2,  name: 'Dr. James Rowe',        specialization: 'Neurologist',         department: 'Neurology',          qualification: 'MD, PhD',         phone: '+1-555-0102', email: 'james.rowe@medicore.com',      isActive: true,  experience: 11, avatar: 'JR', consultations: 980  },
  { id: 3,  name: 'Dr. Priya Sharma',      specialization: 'Orthopedic Surgeon',  department: 'Orthopedics',        qualification: 'MS Ortho',        phone: '+1-555-0103', email: 'priya.sharma@medicore.com',    isActive: true,  experience: 9,  avatar: 'PS', consultations: 854  },
  { id: 4,  name: 'Dr. Oliver Bennett',    specialization: 'Pediatrician',        department: 'Pediatrics',         qualification: 'MD, DCH',         phone: '+1-555-0104', email: 'oliver.bennett@medicore.com',  isActive: true,  experience: 7,  avatar: 'OB', consultations: 2100 },
  { id: 5,  name: 'Dr. Amara Osei',        specialization: 'Dermatologist',       department: 'Dermatology',        qualification: 'MD, FAAD',        phone: '+1-555-0105', email: 'amara.osei@medicore.com',      isActive: false, experience: 12, avatar: 'AO', consultations: 670  },
  { id: 6,  name: 'Dr. Lucas Torres',      specialization: 'Ophthalmologist',     department: 'Ophthalmology',      qualification: 'MS Ophthalmology',phone: '+1-555-0106', email: 'lucas.torres@medicore.com',    isActive: true,  experience: 8,  avatar: 'LT', consultations: 915  },
  { id: 7,  name: 'Dr. Mei Lin',           specialization: 'Gynecologist',        department: 'Gynecology',         qualification: 'MD, FRCOG',       phone: '+1-555-0107', email: 'mei.lin@medicore.com',          isActive: true,  experience: 15, avatar: 'ML', consultations: 1450 },
  { id: 8,  name: 'Dr. Ethan Walsh',       specialization: 'Psychiatrist',        department: 'Psychiatry',         qualification: 'MD, MRCPsych',    phone: '+1-555-0108', email: 'ethan.walsh@medicore.com',     isActive: true,  experience: 10, avatar: 'EW', consultations: 540  },
  { id: 9,  name: 'Dr. Fatima Al-Rashid', specialization: 'Emergency Physician', department: 'Emergency',          qualification: 'MD, FAAEM',       phone: '+1-555-0109', email: 'fatima.rashid@medicore.com',   isActive: true,  experience: 6,  avatar: 'FA', consultations: 3200 },
  { id: 10, name: 'Dr. Noah Kim',          specialization: 'General Practitioner',department: 'General Medicine',   qualification: 'MBBS, MRCGP',     phone: '+1-555-0110', email: 'noah.kim@medicore.com',        isActive: true,  experience: 5,  avatar: 'NK', consultations: 1780 },
];

// ---- PATIENTS ----
export const patients = [
  { id: 1,  name: 'Emily Johnson',    dob: '1990-03-15', gender: 'Female', phone: '+1-555-1001', email: 'emily.j@email.com',   city: 'New York',    isActive: true,  lastVisit: '2026-06-28', totalVisits: 12 },
  { id: 2,  name: 'Marcus Williams',  dob: '1978-07-22', gender: 'Male',   phone: '+1-555-1002', email: 'marcus.w@email.com',  city: 'Los Angeles', isActive: true,  lastVisit: '2026-07-01', totalVisits: 5  },
  { id: 3,  name: 'Sophie Chen',      dob: '2002-11-08', gender: 'Female', phone: '+1-555-1003', email: 'sophie.c@email.com',  city: 'Chicago',     isActive: true,  lastVisit: '2026-06-15', totalVisits: 3  },
  { id: 4,  name: 'Robert Garcia',    dob: '1965-01-30', gender: 'Male',   phone: '+1-555-1004', email: 'robert.g@email.com',  city: 'Houston',     isActive: false, lastVisit: '2026-04-10', totalVisits: 28 },
  { id: 5,  name: 'Aisha Patel',      dob: '1995-09-17', gender: 'Female', phone: '+1-555-1005', email: 'aisha.p@email.com',   city: 'Phoenix',     isActive: true,  lastVisit: '2026-07-03', totalVisits: 7  },
  { id: 6,  name: 'James O\'Brien',   dob: '1988-05-12', gender: 'Male',   phone: '+1-555-1006', email: 'james.ob@email.com',  city: 'Philadelphia',isActive: true,  lastVisit: '2026-06-30', totalVisits: 14 },
  { id: 7,  name: 'Maria Santos',     dob: '1972-12-25', gender: 'Female', phone: '+1-555-1007', email: 'maria.s@email.com',   city: 'San Antonio', isActive: true,  lastVisit: '2026-07-05', totalVisits: 42 },
  { id: 8,  name: 'David Thompson',   dob: '1955-08-04', gender: 'Male',   phone: '+1-555-1008', email: 'david.t@email.com',   city: 'San Diego',   isActive: true,  lastVisit: '2026-05-22', totalVisits: 61 },
  { id: 9,  name: 'Luna Zhang',       dob: '2015-04-19', gender: 'Female', phone: '+1-555-1009', email: 'luna.z@email.com',    city: 'Dallas',      isActive: true,  lastVisit: '2026-07-02', totalVisits: 8  },
  { id: 10, name: 'Carlos Rivera',    dob: '1983-10-31', gender: 'Male',   phone: '+1-555-1010', email: 'carlos.r@email.com',  city: 'San Jose',    isActive: false, lastVisit: '2026-03-18', totalVisits: 19 },
];

// ---- APPOINTMENTS ----
export const appointments = [
  { id: 1,  doctorId: 1, doctorName: 'Dr. Sarah Mitchell', patientId: 1, patientName: 'Emily Johnson',   date: '2026-07-07', time: '09:00', status: 'Confirmed',  department: 'Cardiology',   amount: 250, type: 'Consultation',   isEmergency: false },
  { id: 2,  doctorId: 4, doctorName: 'Dr. Oliver Bennett', patientId: 9, patientName: 'Luna Zhang',      date: '2026-07-07', time: '10:30', status: 'Pending',    department: 'Pediatrics',   amount: 180, type: 'Follow-up',      isEmergency: false },
  { id: 3,  doctorId: 9, doctorName: 'Dr. Fatima Al-Rashid',patientId: 2,patientName: 'Marcus Williams', date: '2026-07-07', time: '11:00', status: 'Completed',  department: 'Emergency',    amount: 450, type: 'Emergency',      isEmergency: true  },
  { id: 4,  doctorId: 7, doctorName: 'Dr. Mei Lin',         patientId: 5, patientName: 'Aisha Patel',    date: '2026-07-06', time: '14:00', status: 'Completed',  department: 'Gynecology',   amount: 200, type: 'Check-up',       isEmergency: false },
  { id: 5,  doctorId: 2, doctorName: 'Dr. James Rowe',      patientId: 4, patientName: 'Robert Garcia',  date: '2026-07-06', time: '15:30', status: 'Cancelled',  department: 'Neurology',    amount: 300, type: 'Consultation',   isEmergency: false },
  { id: 6,  doctorId: 3, doctorName: 'Dr. Priya Sharma',    patientId: 6, patientName: 'James O\'Brien', date: '2026-07-08', time: '09:30', status: 'Confirmed',  department: 'Orthopedics',  amount: 280, type: 'Pre-op',         isEmergency: false },
  { id: 7,  doctorId: 10,doctorName: 'Dr. Noah Kim',        patientId: 7, patientName: 'Maria Santos',   date: '2026-07-08', time: '11:00', status: 'Pending',    department: 'Gen. Medicine',amount: 150, type: 'Follow-up',      isEmergency: false },
  { id: 8,  doctorId: 6, doctorName: 'Dr. Lucas Torres',    patientId: 3, patientName: 'Sophie Chen',    date: '2026-07-05', time: '16:00', status: 'Completed',  department: 'Ophthalmology',amount: 220, type: 'Consultation',   isEmergency: false },
  { id: 9,  doctorId: 8, doctorName: 'Dr. Ethan Walsh',     patientId: 8, patientName: 'David Thompson', date: '2026-07-09', time: '10:00', status: 'Confirmed',  department: 'Psychiatry',   amount: 260, type: 'Therapy',        isEmergency: false },
  { id: 10, doctorId: 5, doctorName: 'Dr. Amara Osei',      patientId: 10,patientName: 'Carlos Rivera',  date: '2026-07-04', time: '13:30', status: 'Cancelled',  department: 'Dermatology',  amount: 190, type: 'Consultation',   isEmergency: false },
];

// ---- RECENT ACTIVITY ----
export const recentActivity = [
  { id: 1,  type: 'appointment', message: 'New appointment booked for Emily Johnson with Dr. Sarah Mitchell',  time: '5 min ago',   icon: 'calendar' },
  { id: 2,  type: 'patient',     message: 'Patient Luna Zhang registered successfully',                        time: '18 min ago',  icon: 'user-plus' },
  { id: 3,  type: 'complete',    message: 'Appointment #3 completed — Dr. Fatima Al-Rashid',                  time: '42 min ago',  icon: 'check-circle' },
  { id: 4,  type: 'cancel',      message: 'Appointment #5 cancelled by Robert Garcia',                        time: '1 hr ago',    icon: 'x-circle' },
  { id: 5,  type: 'doctor',      message: 'Dr. Priya Sharma updated availability schedule',                   time: '2 hrs ago',   icon: 'stethoscope' },
  { id: 6,  type: 'payment',     message: 'Payment of $450 received for Appointment #3',                      time: '2 hrs ago',   icon: 'dollar-sign' },
  { id: 7,  type: 'patient',     message: 'Patient Maria Santos updated contact details',                     time: '3 hrs ago',   icon: 'edit' },
  { id: 8,  type: 'appointment', message: 'Appointment #9 confirmed for David Thompson',                      time: '4 hrs ago',   icon: 'calendar-check' },
];

// ---- DASHBOARD STATS ----
export const dashboardStats = {
  totalPatients: 1847,
  todayPatients: 24,
  totalDoctors: 47,
  availableDoctors: 38,
  totalAppointments: 3241,
  todayAppointments: 18,
  pendingAppointments: 7,
  completedToday: 9,
  cancelledToday: 2,
  totalRevenue: 284750,
  todayRevenue: 4820,
  totalDepartments: 10,
};

// ---- WEEKLY APPOINTMENT DATA (for mini chart) ----
export const weeklyAppointments = [
  { day: 'Mon', appointments: 24, completed: 20 },
  { day: 'Tue', appointments: 18, completed: 16 },
  { day: 'Wed', appointments: 32, completed: 28 },
  { day: 'Thu', appointments: 27, completed: 22 },
  { day: 'Fri', appointments: 35, completed: 31 },
  { day: 'Sat', appointments: 15, completed: 14 },
  { day: 'Sun', appointments: 8,  completed: 7  },
];
