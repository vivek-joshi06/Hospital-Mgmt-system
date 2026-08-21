// ============================================================
// Patients Page — Main CRUD Orchestrator
// ============================================================
import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  UserPlus, Users, ChevronRight,
  Home, Download,
} from 'lucide-react';

// Components
import PatientStatCards    from './components/PatientStatCards';
import PatientFilters      from './components/PatientFilters';
import PatientTable        from './components/PatientTable';
import PatientModal        from './components/PatientModal';
import PatientViewModal    from './components/PatientViewModal';
import DeleteConfirmModal  from './components/DeleteConfirmModal';

// Data & Utilities
import { patients as initialPatients } from '../../data/dummyData';
import { calcAge } from '../../utils/helpers';

// ---- Simulated API delay ----
const fakeDelay = (ms = 700) => new Promise((res) => setTimeout(res, ms));

// ---- CSV Export ----
function exportToCSV(patients) {
  const headers = ['ID', 'Name', 'Age', 'Gender', 'Email', 'Phone', 'City', 'Status', 'Last Visit', 'Total Visits'];
  const rows = patients.map((p) => [
    p.id,
    `"${p.name}"`,
    calcAge(p.dateOfBirth || p.dob),
    p.gender,
    p.email,
    p.phone,
    p.city,
    p.isActive ? 'Active' : 'Inactive',
    p.lastVisit || '',
    p.totalVisits || 0,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `patients_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================
export default function PatientsPage() {
  // ---- State ----
  const [patients,       setPatients]       = useState(initialPatients);
  const [loading,        setLoading]        = useState(false);
  const [formLoading,    setFormLoading]    = useState(false);
  const [deleteLoading,  setDeleteLoading]  = useState(false);

  // Filters
  const [search,        setSearch]        = useState('');
  const [genderFilter,  setGenderFilter]  = useState('All');
  const [statusFilter,  setStatusFilter]  = useState('All');

  // Modal state
  const [modalMode,      setModalMode]      = useState('create'); // 'create' | 'edit'
  const [isModalOpen,    setIsModalOpen]    = useState(false);
  const [isViewOpen,     setIsViewOpen]     = useState(false);
  const [isDeleteOpen,   setIsDeleteOpen]   = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // ---- Filtered Data ----
  const filtered = useMemo(() => {
    let list = [...patients];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q)  ||
          p.email.toLowerCase().includes(q) ||
          p.phone.includes(q)               ||
          p.city.toLowerCase().includes(q)
      );
    }
    if (genderFilter !== 'All') {
      list = list.filter((p) => p.gender === genderFilter);
    }
    if (statusFilter !== 'All') {
      const want = statusFilter === 'Active';
      list = list.filter((p) => p.isActive === want);
    }
    return list;
  }, [patients, search, genderFilter, statusFilter]);

  const hasFilters = !!(search || genderFilter !== 'All' || statusFilter !== 'All');

  // ---- Handlers ----
  const handleClearFilters = useCallback(() => {
    setSearch('');
    setGenderFilter('All');
    setStatusFilter('All');
  }, []);

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    await fakeDelay(800);
    setPatients(initialPatients);
    setLoading(false);
    toast.success('Patient list refreshed');
  }, []);

  const handleExport = useCallback(() => {
    exportToCSV(filtered);
    toast.success(`Exported ${filtered.length} patients to CSV`);
  }, [filtered]);

  // Open Create
  const handleCreate = useCallback(() => {
    setSelectedPatient(null);
    setModalMode('create');
    setIsModalOpen(true);
  }, []);

  // Open Edit
  const handleEdit = useCallback((patient) => {
    setSelectedPatient(patient);
    setModalMode('edit');
    setIsModalOpen(true);
  }, []);

  // Open View
  const handleView = useCallback((patient) => {
    setSelectedPatient(patient);
    setIsViewOpen(true);
  }, []);

  // Open Delete
  const handleDelete = useCallback((patient) => {
    setSelectedPatient(patient);
    setIsDeleteOpen(true);
  }, []);

  // Duplicate
  const handleDuplicate = useCallback((patient) => {
    const dup = {
      ...patient,
      id:   Date.now(),
      name: `${patient.name} (Copy)`,
    };
    setPatients((prev) => [dup, ...prev]);
    toast.success(`Duplicated — ${patient.name}`);
  }, []);

  // Submit Create / Edit
  const handleSubmit = useCallback(async (formData) => {
    setFormLoading(true);
    await fakeDelay(900);

    if (modalMode === 'create') {
      const newPatient = {
        ...formData,
        id:         Date.now(),
        lastVisit:  null,
        totalVisits: 0,
      };
      setPatients((prev) => [newPatient, ...prev]);
      toast.success(`✅ Patient "${formData.name}" registered successfully!`);
    } else {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === selectedPatient.id ? { ...p, ...formData } : p
        )
      );
      toast.success(`✏️ Patient "${formData.name}" updated successfully!`);
    }

    setFormLoading(false);
    setIsModalOpen(false);
    setSelectedPatient(null);
  }, [modalMode, selectedPatient]);

  // Confirm Delete
  const handleConfirmDelete = useCallback(async () => {
    setDeleteLoading(true);
    await fakeDelay(700);
    setPatients((prev) => prev.filter((p) => p.id !== selectedPatient.id));
    toast.error(`🗑️ Patient "${selectedPatient.name}" deleted.`);
    setDeleteLoading(false);
    setIsDeleteOpen(false);
    setSelectedPatient(null);
  }, [selectedPatient]);

  // ============================================================
  return (
    <div>
      {/* ---- Breadcrumb ---- */}
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
        <span style={{ color: '#4F46E5', fontWeight: 600 }}>Patients</span>
      </motion.div>

      {/* ---- Page Header ---- */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="flex items-start justify-between mb-6 flex-wrap gap-4"
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Patient Management
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
            Register, manage, and track all hospital patients in one place.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            id="export-btn-header"
            onClick={handleExport}
            className="flex items-center gap-1.5 btn btn-secondary"
          >
            <Download size={14} />
            Export CSV
          </button>
          <motion.button
            id="add-patient-btn"
            whileHover={{ scale: 1.03, boxShadow: '0 6px 20px rgba(79,70,229,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCreate}
            className="flex items-center gap-2 btn btn-primary"
          >
            <UserPlus size={15} />
            Register Patient
          </motion.button>
        </div>
      </motion.div>

      {/* ---- Stat Cards ---- */}
      <PatientStatCards patients={patients} />

      {/* ---- Filters ---- */}
      <PatientFilters
        search={search}
        onSearchChange={setSearch}
        genderFilter={genderFilter}
        onGenderChange={setGenderFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
        onExport={handleExport}
        onRefresh={handleRefresh}
        resultCount={filtered.length}
        totalCount={patients.length}
      />

      {/* ---- Table ---- */}
      <PatientTable
        data={filtered}
        loading={loading}
        hasFilters={hasFilters}
        onClearFilters={handleClearFilters}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
      />

      {/* ---- FAB (Mobile) ---- */}
      <motion.button
        id="fab-add-patient"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCreate}
        className="fixed flex items-center justify-center rounded-full shadow-xl"
        style={{
          bottom: 28, right: 28,
          width: 56, height: 56,
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(79,70,229,0.45)',
          display: 'none',
        }}
      >
        <UserPlus size={22} color="#fff" />
      </motion.button>

      {/* ---- Modals ---- */}
      <PatientModal
        isOpen={isModalOpen}
        mode={modalMode}
        patient={selectedPatient}
        onClose={() => { setIsModalOpen(false); setSelectedPatient(null); }}
        onSubmit={handleSubmit}
        loading={formLoading}
      />

      <PatientViewModal
        isOpen={isViewOpen}
        patient={selectedPatient}
        onClose={() => { setIsViewOpen(false); setSelectedPatient(null); }}
        onEdit={handleEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setSelectedPatient(null); }}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        title="Delete Patient Record"
        description="All appointment history will be de-linked."
        itemName={selectedPatient?.name}
        itemSubtitle={`${selectedPatient?.gender || ''} · ${selectedPatient?.city || ''}`}
      />
    </div>
  );
}
