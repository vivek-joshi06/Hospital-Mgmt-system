// ============================================================
// Departments Page — Main CRUD Orchestrator
// ============================================================
import { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Plus, Home, ChevronRight, Download } from 'lucide-react';

// Components
import DepartmentStatCards  from './components/DepartmentStatCards';
import DepartmentFilters    from './components/DepartmentFilters';
import DepartmentGrid       from './components/DepartmentGrid';
import DepartmentTable      from './components/DepartmentTable';
import DepartmentModal      from './components/DepartmentModal';
import DepartmentViewModal  from './components/DepartmentViewModal';
import DeleteConfirmModal   from '../patients/components/DeleteConfirmModal';

// Data
import {
  departments as initialDepts,
  doctors,
} from '../../data/dummyData';
import { departmentDefaultValues } from './departmentSchema';

// ---- Simulated delay ----
// const fakeDelay = (ms = 750) => new Promise((r) => setTimeout(r, ms));

// ---- CSV Export ----
function exportCSV(depts, doctors) {
  const headers = ['ID', 'Name', 'Description', 'Head Doctor', 'Location', 'Phone', 'Capacity', 'Doctors', 'Patients', 'Status'];
  const rows = depts.map((d) => {
    const doctorCount = doctors.filter((doc) => doc.department === d.name).length;
    return [
      d.id,
      `"${d.name}"`,
      `"${d.description || ''}"`,
      d.headDoctor || '',
      d.location   || '',
      d.phone      || '',
      d.capacity   || '',
      doctorCount,
      d.patients   || 0,
      d.isActive !== false ? 'Active' : 'Inactive',
    ];
  });
  const csv  = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `departments_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================
export default function DepartmentsPage() {
  const [departments,     setDepartments]     = useState(initialDepts);
  const [loading,         setLoading]         = useState(false);
  const [formLoading,     setFormLoading]     = useState(false);
  const [deleteLoading,   setDeleteLoading]   = useState(false);
  const [viewMode,        setViewMode]        = useState('grid'); // 'grid' | 'list'

  // Filters
  const [search,       setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [modalMode,       setModalMode]       = useState('create');
  const [isModalOpen,     setIsModalOpen]     = useState(false);
  const [isViewOpen,      setIsViewOpen]      = useState(false);
  const [isDeleteOpen,    setIsDeleteOpen]    = useState(false);
  const [selectedDept,    setSelectedDept]    = useState(null);

  // ---- Filtered Data ----
  const filtered = useMemo(() => {
    let list = [...departments];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          (d.description || '').toLowerCase().includes(q) ||
          (d.headDoctor  || '').toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') {
      const want = statusFilter === 'Active';
      list = list.filter((d) => (d.isActive !== false) === want);
    }
    return list;
  }, [departments, search, statusFilter]);

  const hasFilters = !!(search || statusFilter !== 'All');

  // ---- Handlers ----
  const handleClearFilters = useCallback(() => {
    setSearch('');
    setStatusFilter('All');
  }, []);

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    await fakeDelay(800);
    setDepartments(initialDepts);
    setLoading(false);
    toast.success('Departments refreshed');
  }, []);

  const handleExport = useCallback(() => {
    exportCSV(filtered, doctors);
    toast.success(`Exported ${filtered.length} departments to CSV`);
  }, [filtered]);

  const handleCreate = useCallback(() => {
    setSelectedDept(null);
    setModalMode('create');
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((dept) => {
    setSelectedDept(dept);
    setModalMode('edit');
    setIsModalOpen(true);
  }, []);

  const handleView = useCallback((dept) => {
    setSelectedDept(dept);
    setIsViewOpen(true);
  }, []);

  const handleDelete = useCallback((dept) => {
    setSelectedDept(dept);
    setIsDeleteOpen(true);
  }, []);

  const handleSubmit = useCallback(async (formData) => {
    setFormLoading(true);
    await fakeDelay(900);

    if (modalMode === 'create') {
      const newDept = {
        ...formData,
        id:       Date.now(),
        patients: 0,
      };
      setDepartments((prev) => [newDept, ...prev]);
      toast.success(`✅ Department "${formData.name}" created!`);
    } else {
      setDepartments((prev) =>
        prev.map((d) => d.id === selectedDept.id ? { ...d, ...formData } : d)
      );
      toast.success(`✏️ "${formData.name}" updated successfully!`);
    }

    setFormLoading(false);
    setIsModalOpen(false);
    setSelectedDept(null);
  }, [modalMode, selectedDept]);

  const handleConfirmDelete = useCallback(async () => {
    setDeleteLoading(true);
    await fakeDelay(700);
    setDepartments((prev) => prev.filter((d) => d.id !== selectedDept.id));
    toast.error(`🗑️ Department "${selectedDept.name}" deleted.`);
    setDeleteLoading(false);
    setIsDeleteOpen(false);
    setSelectedDept(null);
  }, [selectedDept]);

  // Get assigned doctors for view modal
  const assignedDoctors = useMemo(() => {
    if (!selectedDept || !isViewOpen) return [];
    return doctors.filter((d) => d.department === selectedDept.name);
  }, [selectedDept, isViewOpen]);

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
        <span style={{ color: '#4F46E5', fontWeight: 600 }}>Departments</span>
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
            Department Management
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
            Organize hospital divisions, assign doctors, and track department metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="export-depts-header"
            onClick={handleExport}
            className="flex items-center gap-1.5 btn btn-secondary"
          >
            <Download size={14} />
            Export CSV
          </button>
          <motion.button
            id="add-dept-btn"
            whileHover={{ scale: 1.03, boxShadow: '0 6px 20px rgba(79,70,229,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCreate}
            className="flex items-center gap-2 btn btn-primary"
          >
            <Plus size={15} />
            New Department
          </motion.button>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <DepartmentStatCards departments={departments} doctors={doctors} />

      {/* Filters */}
      <DepartmentFilters
        search={search}             onSearchChange={setSearch}
        statusFilter={statusFilter} onStatusChange={setStatusFilter}
        viewMode={viewMode}         onViewModeChange={setViewMode}
        onClearFilters={handleClearFilters}
        onExport={handleExport}
        onRefresh={handleRefresh}
        resultCount={filtered.length}
        totalCount={departments.length}
      />

      {/* Grid or List view */}
      {viewMode === 'grid' ? (
        <DepartmentGrid
          data={filtered}
          loading={loading}
          hasFilters={hasFilters}
          onClearFilters={handleClearFilters}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          doctors={doctors}
        />
      ) : (
        <DepartmentTable
          data={filtered}
          loading={loading}
          hasFilters={hasFilters}
          onClearFilters={handleClearFilters}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          doctors={doctors}
        />
      )}

      {/* FAB */}
      <motion.button
        id="fab-add-dept"
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
        <Plus size={22} color="#fff" />
      </motion.button>

      {/* Modals */}
      <DepartmentModal
        isOpen={isModalOpen}
        mode={modalMode}
        department={selectedDept}
        onClose={() => { setIsModalOpen(false); setSelectedDept(null); }}
        onSubmit={handleSubmit}
        loading={formLoading}
      />

      <DepartmentViewModal
        isOpen={isViewOpen}
        department={selectedDept}
        onClose={() => { setIsViewOpen(false); setSelectedDept(null); }}
        onEdit={handleEdit}
        assignedDoctors={assignedDoctors}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setSelectedDept(null); }}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        title="Delete Department"
        description="Doctors assigned to this department will not be deleted but will become unassigned."
        itemName={selectedDept?.name}
        itemSubtitle={selectedDept ? `${selectedDept.icon || '🏥'} ${doctors.filter((d) => d.department === selectedDept.name).length} doctors assigned` : ''}
      />
    </div>
  );
}
