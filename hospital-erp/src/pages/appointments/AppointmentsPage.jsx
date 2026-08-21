// ============================================================
// Appointments Page — Main CRUD Orchestrator
// ============================================================
import { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CalendarPlus, Home, ChevronRight, Download } from 'lucide-react';

// Components
import AppointmentStatCards  from './components/AppointmentStatCards';
import AppointmentFilters    from './components/AppointmentFilters';
import AppointmentTable      from './components/AppointmentTable';
import AppointmentModal      from './components/AppointmentModal';
import AppointmentViewModal  from './components/AppointmentViewModal';
import DeleteConfirmModal    from '../patients/components/DeleteConfirmModal';

// Data
import {
  appointments as initialAppointments,
  doctors,
  patients,
} from '../../data/dummyData';
import { appointmentDefaultValues } from './appointmentSchema';
import { formatDate } from '../../utils/helpers';

// ---- Simulated delay ----
const fakeDelay = (ms = 750) => new Promise((res) => setTimeout(res, ms));

// ---- Enrich appointments with patient phone ----
const enriched = initialAppointments.map((a) => {
  const patient = patients.find((p) => p.id === a.patientId);
  return { ...a, patientPhone: patient?.phone || '' };
});

// ---- CSV Export ----
function exportCSV(appts) {
  const headers = ['ID', 'Patient', 'Doctor', 'Department', 'Date', 'Time', 'Type', 'Status', 'Emergency', 'Amount'];
  const rows = appts.map((a) => [
    a.id,
    `"${a.patientName}"`,
    `"${a.doctorName}"`,
    a.department,
    a.appointmentDate || a.date,
    a.appointmentTime || a.time,
    a.type,
    a.appointmentStatus || a.status,
    a.isEmergency ? 'Yes' : 'No',
    a.totalConsultedAmount || a.amount || 0,
  ]);
  const csv  = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `appointments_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================
export default function AppointmentsPage() {
  const [appointments,  setAppointments]  = useState(enriched);
  const [loading,       setLoading]       = useState(false);
  const [formLoading,   setFormLoading]   = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filters
  const [search,       setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter,   setTypeFilter]   = useState('All');
  const [dateFrom,     setDateFrom]     = useState('');
  const [dateTo,       setDateTo]       = useState('');

  // Modals
  const [modalMode,          setModalMode]          = useState('create');
  const [isModalOpen,        setIsModalOpen]        = useState(false);
  const [isViewOpen,         setIsViewOpen]         = useState(false);
  const [isDeleteOpen,       setIsDeleteOpen]       = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // ---- Filtered Data ----
  const filtered = useMemo(() => {
    let list = [...appointments];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q)  ||
          (a.department || '').toLowerCase().includes(q) ||
          (a.type || '').toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') {
      list = list.filter((a) => (a.appointmentStatus || a.status) === statusFilter);
    }
    if (typeFilter !== 'All') {
      list = list.filter((a) => a.type === typeFilter);
    }
    if (dateFrom) {
      list = list.filter((a) => (a.appointmentDate || a.date) >= dateFrom);
    }
    if (dateTo) {
      list = list.filter((a) => (a.appointmentDate || a.date) <= dateTo);
    }
    // Sort by date desc
    list.sort((a, b) => {
      const da = a.appointmentDate || a.date || '';
      const db = b.appointmentDate || b.date || '';
      return db.localeCompare(da);
    });
    return list;
  }, [appointments, search, statusFilter, typeFilter, dateFrom, dateTo]);

  const hasFilters = !!(search || statusFilter !== 'All' || typeFilter !== 'All' || dateFrom || dateTo);

  // ---- Handlers ----
  const handleClearFilters = useCallback(() => {
    setSearch('');
    setStatusFilter('All');
    setTypeFilter('All');
    setDateFrom('');
    setDateTo('');
  }, []);

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    await fakeDelay(800);
    setAppointments(enriched);
    setLoading(false);
    toast.success('Appointments refreshed');
  }, []);

  const handleExport = useCallback(() => {
    exportCSV(filtered);
    toast.success(`Exported ${filtered.length} appointments to CSV`);
  }, [filtered]);

  const handleCreate = useCallback(() => {
    setSelectedAppointment(null);
    setModalMode('create');
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((appt) => {
    setSelectedAppointment(appt);
    setModalMode('edit');
    setIsModalOpen(true);
  }, []);

  const handleView = useCallback((appt) => {
    setSelectedAppointment(appt);
    setIsViewOpen(true);
  }, []);

  const handleDelete = useCallback((appt) => {
    setSelectedAppointment(appt);
    setIsDeleteOpen(true);
  }, []);

  const handleDuplicate = useCallback((appt) => {
    const dup = {
      ...appt,
      id:                Date.now(),
      appointmentDate:   '',
      appointmentStatus: 'Pending',
    };
    setAppointments((prev) => [dup, ...prev]);
    toast.success(`Duplicated appointment — update the date before confirming`);
  }, []);

  // ---- Submit Create / Edit ----
  const handleSubmit = useCallback(async (formData) => {
    setFormLoading(true);
    await fakeDelay(900);

    // Resolve doctor + patient names
    const doctor  = doctors.find((d) => d.id === formData.doctorId);
    const patient = patients.find((p) => p.id === formData.patientId);

    if (modalMode === 'create') {
      const newAppt = {
        ...formData,
        id:          Date.now(),
        doctorName:  doctor?.name     || 'Unknown Doctor',
        patientName: patient?.name    || 'Unknown Patient',
        patientPhone:patient?.phone   || '',
        department:  doctor?.department || '',
      };
      setAppointments((prev) => [newAppt, ...prev]);
      toast.success(`✅ Appointment booked for ${patient?.name} with ${doctor?.name}!`);
    } else {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedAppointment.id
            ? {
                ...a,
                ...formData,
                doctorName:  doctor?.name     || a.doctorName,
                patientName: patient?.name    || a.patientName,
                patientPhone:patient?.phone   || a.patientPhone,
                department:  doctor?.department || a.department,
              }
            : a
        )
      );
      toast.success(`✏️ Appointment #${String(selectedAppointment.id).padStart(4, '0')} updated!`);
    }

    setFormLoading(false);
    setIsModalOpen(false);
    setSelectedAppointment(null);
  }, [modalMode, selectedAppointment]);

  // ---- Delete ----
  const handleConfirmDelete = useCallback(async () => {
    setDeleteLoading(true);
    await fakeDelay(700);
    setAppointments((prev) => prev.filter((a) => a.id !== selectedAppointment.id));
    toast.error(`🗑️ Appointment #${String(selectedAppointment.id).padStart(4, '0')} deleted.`);
    setDeleteLoading(false);
    setIsDeleteOpen(false);
    setSelectedAppointment(null);
  }, [selectedAppointment]);

  // ============================================================
  return (
    <div>
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 mb-5"
        style={{ fontSize: 12, color: '#94A3B8' }}
      >
        <Home size={13} />
        <span>Dashboard</span>
        <ChevronRight size={12} />
        <span style={{ color: '#4F46E5', fontWeight: 600 }}>Appointments</span>
      </motion.div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="flex items-start justify-between mb-6 flex-wrap gap-4"
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Appointment Management
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
            Book, track, and manage all patient appointments with doctors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="export-appts-header"
            onClick={handleExport}
            className="flex items-center gap-1.5 btn btn-secondary"
          >
            <Download size={14} />
            Export CSV
          </button>
          <motion.button
            id="book-appointment-btn"
            whileHover={{ scale: 1.03, boxShadow: '0 6px 20px rgba(79,70,229,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCreate}
            className="flex items-center gap-2 btn btn-primary"
          >
            <CalendarPlus size={15} />
            Book Appointment
          </motion.button>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <AppointmentStatCards appointments={appointments} />

      {/* Filters */}
      <AppointmentFilters
        search={search}             onSearchChange={setSearch}
        statusFilter={statusFilter} onStatusChange={setStatusFilter}
        typeFilter={typeFilter}     onTypeChange={setTypeFilter}
        dateFrom={dateFrom}         onDateFromChange={setDateFrom}
        dateTo={dateTo}             onDateToChange={setDateTo}
        onClearFilters={handleClearFilters}
        onExport={handleExport}
        onRefresh={handleRefresh}
        resultCount={filtered.length}
        totalCount={appointments.length}
      />

      {/* Table */}
      <AppointmentTable
        data={filtered}
        loading={loading}
        hasFilters={hasFilters}
        onClearFilters={handleClearFilters}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
      />

      {/* FAB */}
      <motion.button
        id="fab-book-appt"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCreate}
        className="fixed flex items-center justify-center rounded-full"
        style={{
          bottom: 28, right: 28, width: 56, height: 56,
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(79,70,229,0.45)',
          display: 'none',
        }}
      >
        <CalendarPlus size={22} color="#fff" />
      </motion.button>

      {/* Modals */}
      <AppointmentModal
        isOpen={isModalOpen}
        mode={modalMode}
        appointment={selectedAppointment}
        onClose={() => { setIsModalOpen(false); setSelectedAppointment(null); }}
        onSubmit={handleSubmit}
        loading={formLoading}
        doctors={doctors}
        patients={patients}
      />

      <AppointmentViewModal
        isOpen={isViewOpen}
        appointment={selectedAppointment}
        onClose={() => { setIsViewOpen(false); setSelectedAppointment(null); }}
        onEdit={handleEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setSelectedAppointment(null); }}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        title="Cancel Appointment"
        description="This appointment record will be permanently removed."
        itemName={selectedAppointment ? `Appointment #${String(selectedAppointment.id).padStart(4, '0')}` : ''}
        itemSubtitle={selectedAppointment ? `${selectedAppointment.patientName} → ${selectedAppointment.doctorName}` : ''}
      />
    </div>
  );
}
