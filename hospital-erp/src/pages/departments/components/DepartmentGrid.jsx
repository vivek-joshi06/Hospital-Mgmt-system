// ============================================================
// Department Grid View — Bento-style cards
// ============================================================
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Pencil, Trash2, Users, Stethoscope, MapPin, Phone } from 'lucide-react';
import Badge from '../../../components/ui/Badge';

function EmptyState({ hasFilters, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="card flex flex-col items-center justify-center py-16 text-center"
      style={{ gridColumn: '1 / -1' }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>🏥</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
        {hasFilters ? 'No departments match your search' : 'No departments yet'}
      </div>
      <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
        {hasFilters ? 'Try adjusting your filters.' : 'Add the first department to get started.'}
      </div>
      {hasFilters && <button onClick={onClear} className="btn btn-secondary btn-sm">Clear filters</button>}
    </motion.div>
  );
}

// ---- Individual Department Card ----
function DeptCard({ dept, doctorCount, onView, onEdit, onDelete, index }) {
  const isActive = dept.isActive !== false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="card group relative overflow-hidden"
      style={{ cursor: 'default' }}
    >
      {/* Color accent top bar */}
      <div
        style={{
          height: 4,
          background: `linear-gradient(90deg, ${dept.color || '#4F46E5'}, ${dept.color || '#4F46E5'}88)`,
        }}
      />

      {/* Actions — appear on hover */}
      <div
        className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <button
          onClick={() => onView(dept)}
          title="View"
          className="flex items-center justify-center rounded-lg"
          style={{ width: 28, height: 28, background: '#EFF6FF', border: 'none', cursor: 'pointer', color: '#2563EB' }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#DBEAFE'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#EFF6FF'}
        >
          <Eye size={13} />
        </button>
        <button
          onClick={() => onEdit(dept)}
          title="Edit"
          className="flex items-center justify-center rounded-lg"
          style={{ width: 28, height: 28, background: '#EEF2FF', border: 'none', cursor: 'pointer', color: '#4F46E5' }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#E0E7FF'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#EEF2FF'}
        >
          <Pencil size={13} />
        </button>
        <button
          onClick={() => onDelete(dept)}
          title="Delete"
          className="flex items-center justify-center rounded-lg"
          style={{ width: 28, height: 28, background: '#FEF2F2', border: 'none', cursor: 'pointer', color: '#DC2626' }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#FEE2E2'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#FEF2F2'}
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Icon + Name */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className="flex items-center justify-center rounded-2xl text-2xl shrink-0"
            style={{
              width: 52, height: 52,
              background: (dept.color || '#4F46E5') + '18',
              border: `1.5px solid ${dept.color || '#4F46E5'}28`,
            }}
          >
            {dept.icon || '🏥'}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3
              style={{
                fontSize: 14, fontWeight: 700, color: '#0F172A',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}
            >
              {dept.name}
            </h3>
            <Badge status={isActive ? 'Active' : 'Inactive'} className="mt-1" />
          </div>
        </div>

        {/* Description */}
        {dept.description && (
          <p
            style={{
              fontSize: 12, color: '#64748B', lineHeight: 1.6,
              marginBottom: 14,
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}
          >
            {dept.description}
          </p>
        )}

        {/* Stats row */}
        <div
          className="grid"
          style={{ gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}
        >
          <div
            className="rounded-xl p-3 text-center"
            style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: dept.color || '#4F46E5' }}>
              {doctorCount}
            </div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Stethoscope size={10} color="#94A3B8" />
              <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600 }}>Doctors</span>
            </div>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: dept.color || '#4F46E5' }}>
              {dept.patients || 0}
            </div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Users size={10} color="#94A3B8" />
              <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600 }}>Patients</span>
            </div>
          </div>
        </div>

        {/* Extra info */}
        <div className="space-y-1.5">
          {dept.location && (
            <div className="flex items-center gap-2">
              <MapPin size={11} color="#94A3B8" />
              <span style={{ fontSize: 11, color: '#64748B' }}>{dept.location}</span>
            </div>
          )}
          {dept.phone && (
            <div className="flex items-center gap-2">
              <Phone size={11} color="#94A3B8" />
              <span style={{ fontSize: 11, color: '#64748B' }}>{dept.phone}</span>
            </div>
          )}
          {dept.headDoctor && (
            <div className="flex items-center gap-2">
              <Stethoscope size={11} color="#94A3B8" />
              <span style={{ fontSize: 11, color: '#64748B' }}>Head: {dept.headDoctor}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
export default function DepartmentGrid({
  data, loading, hasFilters, onClearFilters,
  onView, onEdit, onDelete,
  doctors,
}) {
  if (loading) {
    return (
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="skeleton" style={{ height: 4 }} />
            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="skeleton rounded-2xl" style={{ width: 52, height: 52, flexShrink: 0 }} />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="skeleton" style={{ height: 14, width: '70%' }} />
                  <div className="skeleton" style={{ height: 18, width: 60, borderRadius: 99 }} />
                </div>
              </div>
              <div className="skeleton mb-1.5" style={{ height: 11 }} />
              <div className="skeleton mb-4" style={{ height: 11, width: '80%' }} />
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div className="skeleton rounded-xl" style={{ height: 56 }} />
                <div className="skeleton rounded-xl" style={{ height: 56 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        <EmptyState hasFilters={hasFilters} onClear={onClearFilters} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 16,
      }}
    >
      <AnimatePresence>
        {data.map((dept, i) => {
          const doctorCount = (doctors || []).filter((d) => d.department === dept.name).length;
          return (
            <DeptCard
              key={dept.id}
              dept={dept}
              doctorCount={doctorCount}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              index={i}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
