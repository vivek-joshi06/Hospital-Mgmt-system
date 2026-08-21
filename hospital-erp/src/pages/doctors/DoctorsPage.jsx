// ============================================================
// Doctors Page — Main CRUD Orchestrator
// ============================================================
import { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { UserPlus, Home, ChevronRight, Download } from 'lucide-react';

// Components
import DoctorStatCards   from './components/DoctorStatCards';
import DoctorFilters     from './components/DoctorFilters';
import DoctorTable       from './components/DoctorTable';
import DoctorModal       from './components/DoctorModal';
import DoctorViewModal   from './components/DoctorViewModal';
import DeleteConfirmModal from '../patients/components/DeleteConfirmModal';

// Data
import { doctors as initialDoctors, departments } from '../../data/dummyData';
import { doctorDefaultValues } from './doctorSchema';

// ---- Simulated delay ----
const fakeDelay = (ms = 750) => new Promise((res) => setTimeout(res, ms));

// ---- CSV Export ----
function exportDoctorsCSV(doctors) {
  const headers = ['ID', 'Name', 'Specialization', 'Department', 'Qualification', 'Phone', 'Email', 'Experience', 'Consultations', 'Status'];
  const rows = doctors.map((d) => [
    d.id,
    `"${d.name}"`,
    d.specialization,
    d.department,
    d.qualification,
    d.phone,
    d.email,
    d.experience,
    d.consultations || 0,
    d.isActive ? 'Active' : 'Inactive',
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `doctors_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================
export default function DoctorsPage() {
  const [doctors,       setDoctors]       = useState(initialDoctors);
  const [loading,       setLoading]       = useState(false);
  const [formLoading,   setFormLoading]   = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filters
  const [search,       setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter,   setDeptFilter]   = useState('All');
  const [specFilter,   setSpecFilter]   = useState('All');

  // Modals
  const [modalMode,       setModalMode]       = useState('create');
  const [isModalOpen,     setIsModalOpen]     = useState(false);
  const [isViewOpen,      setIsViewOpen]      = useState(false);
  const [isDeleteOpen,    setIsDeleteOpen]    = useState(false);
  const [selectedDoctor,  setSelectedDoctor]  = useState(null);

  // ---- Filtered Data ----
  const filtered = useMemo(() => {
    let list = [...doctors];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.email.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q) ||
          d.department.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') {
      const want = statusFilter === 'Active';
      list = list.filter((d) => d.isActive === want);
    }
    if (deptFilter !== 'All') {
      list = list.filter((d) => d.department === deptFilter);
    }
    if (specFilter !== 'All') {
      list = list.filter((d) => d.specialization === specFilter);
    }
    return list;
  }, [doctors, search, statusFilter, deptFilter, specFilter]);

  const hasFilters = !!(search || statusFilter !== 'All' || deptFilter !== 'All' || specFilter !== 'All');

  // ---- Handlers ----
  const handleClearFilters = useCallback(() => {
    setSearch('');
    setStatusFilter('All');
    setDeptFilter('All');
    setSpecFilter('All');
  }, []);

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    await fakeDelay(800);
    setDoctors(initialDoctors);
    setLoading(false);
    toast.success('Doctor list refreshed');
  }, []);

  const handleExport = useCallback(() => {
    exportDoctorsCSV(filtered);
    toast.success(`Exported ${filtered.length} doctors to CSV`);
  }, [filtered]);

  const handleCreate = useCallback(() => {
    setSelectedDoctor(null);
    setModalMode('create');
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((doctor) => {
    setSelectedDoctor(doctor);
    setModalMode('edit');
    setIsModalOpen(true);
  }, []);

  const handleView = useCallback((doctor) => {
    setSelectedDoctor(doctor);
    setIsViewOpen(true);
  }, []);

  const handleDelete = useCallback((doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteOpen(true);
  }, []);

  const handleDuplicate = useCallback((doctor) => {
    const dup = {
      ...doctor,
      id:           Date.now(),
      name:         `${doctor.name} (Copy)`,
      consultations: 0,
    };
    setDoctors((prev) => [dup, ...prev]);
    toast.success(`Duplicated — ${doctor.name}`);
  }, []);

  const handleSubmit = useCallback(async (formData) => {
    setFormLoading(true);
    await fakeDelay(900);

    if (modalMode === 'create') {
      const newDoc = {
        ...formData,
        id:            Date.now(),
        consultations: 0,
        avatar:        formData.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      };
      setDoctors((prev) => [newDoc, ...prev]);
      toast.success(`✅ Dr. ${formData.name} added successfully!`);
    } else {
      setDoctors((prev) =>
        prev.map((d) => d.id === selectedDoctor.id ? { ...d, ...formData } : d)
      );
      toast.success(`✏️ ${formData.name}'s profile updated!`);
    }

    setFormLoading(false);
    setIsModalOpen(false);
    setSelectedDoctor(null);
  }, [modalMode, selectedDoctor]);

  const handleConfirmDelete = useCallback(async () => {
    setDeleteLoading(true);
    await fakeDelay(700);
    setDoctors((prev) => prev.filter((d) => d.id !== selectedDoctor.id));
    toast.error(`🗑️ ${selectedDoctor.name} removed from system.`);
    setDeleteLoading(false);
    setIsDeleteOpen(false);
    setSelectedDoctor(null);
  }, [selectedDoctor]);

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
        <span style={{ color: '#4F46E5', fontWeight: 600 }}>Doctors</span>
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
            Doctor Management
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
            Manage physician profiles, specializations, departments, and availability.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="export-doctors-header"
            onClick={handleExport}
            className="flex items-center gap-1.5 btn btn-secondary"
          >
            <Download size={14} />
            Export CSV
          </button>
          <motion.button
            id="add-doctor-btn"
            whileHover={{ scale: 1.03, boxShadow: '0 6px 20px rgba(79,70,229,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCreate}
            className="flex items-center gap-2 btn btn-primary"
          >
            <UserPlus size={15} />
            Add Doctor
          </motion.button>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <DoctorStatCards doctors={doctors} departments={departments} />

      {/* Filters */}
      <DoctorFilters
        search={search}                 onSearchChange={setSearch}
        statusFilter={statusFilter}     onStatusChange={setStatusFilter}
        deptFilter={deptFilter}         onDeptChange={setDeptFilter}
        specFilter={specFilter}         onSpecChange={setSpecFilter}
        onClearFilters={handleClearFilters}
        onExport={handleExport}
        onRefresh={handleRefresh}
        resultCount={filtered.length}
        totalCount={doctors.length}
        departments={departments}
      />

      {/* Table */}
      <DoctorTable
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
        id="fab-add-doctor"
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
        <UserPlus size={22} color="#fff" />
      </motion.button>

      {/* Modals */}
      <DoctorModal
        isOpen={isModalOpen}
        mode={modalMode}
        doctor={selectedDoctor}
        onClose={() => { setIsModalOpen(false); setSelectedDoctor(null); }}
        onSubmit={handleSubmit}
        loading={formLoading}
        departments={departments}
      />

      <DoctorViewModal
        isOpen={isViewOpen}
        doctor={selectedDoctor}
        onClose={() => { setIsViewOpen(false); setSelectedDoctor(null); }}
        onEdit={handleEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setSelectedDoctor(null); }}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        title="Remove Doctor Profile"
        description="This will remove the doctor from all future appointments."
        itemName={selectedDoctor?.name}
        itemSubtitle={`${selectedDoctor?.specialization || ''} · ${selectedDoctor?.department || ''}`}
      />
    </div>
  );
}
