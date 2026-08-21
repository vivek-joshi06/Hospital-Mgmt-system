// ============================================================
// Doctor Filters — Search + Specialization + Status + Dept
// ============================================================
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Download, RefreshCw, ChevronDown } from 'lucide-react';
import { debounce } from '../../../utils/helpers';
import { SPECIALIZATIONS } from '../doctorSchema';

const STATUS_OPTIONS = ['All', 'Active', 'Inactive'];

export default function DoctorFilters({
  search, onSearchChange,
  statusFilter, onStatusChange,
  deptFilter, onDeptChange,
  specFilter, onSpecChange,
  onClearFilters, onExport, onRefresh,
  resultCount, totalCount,
  departments,
}) {
  const hasFilters = !!(search || statusFilter !== 'All' || deptFilter !== 'All' || specFilter !== 'All');

  const debouncedSearch = useRef(
    debounce((val) => onSearchChange(val), 300)
  ).current;

  const selectStyle = {
    padding: '7px 28px 7px 10px',
    borderRadius: 8, fontSize: 12, fontWeight: 500,
    border: '1.5px solid #E2E8F0', background: '#fff',
    color: '#374151', cursor: 'pointer', outline: 'none',
    appearance: 'none', WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      className="card p-4 mb-5"
    >
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="search-wrapper" style={{ flex: '1 1 220px', minWidth: 180 }}>
          <Search size={15} className="search-icon" />
          <input
            id="doctor-search"
            type="text"
            placeholder="Search by name, email, specialization…"
            defaultValue={search}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="search-input"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ width: 1, height: 32, background: '#E2E8F0', flexShrink: 0 }} />

        {/* Department */}
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Dept:</span>
          <select
            id="dept-filter"
            value={deptFilter}
            onChange={(e) => onDeptChange(e.target.value)}
            style={selectStyle}
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Specialization */}
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Spec:</span>
          <select
            id="spec-filter"
            value={specFilter}
            onChange={(e) => onSpecChange(e.target.value)}
            style={selectStyle}
          >
            <option value="All">All Specializations</option>
            {SPECIALIZATIONS.slice(0, 10).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Status:</span>
          <div className="flex gap-1">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                id={`doctor-status-${s.toLowerCase()}`}
                onClick={() => onStatusChange(s)}
                style={{
                  padding: '5px 11px', borderRadius: 8,
                  fontSize: 12, fontWeight: 500, cursor: 'pointer', border: '1.5px solid',
                  transition: 'all 0.15s',
                  borderColor: statusFilter === s ? '#4F46E5' : '#E2E8F0',
                  background:  statusFilter === s ? '#EEF2FF' : '#fff',
                  color:       statusFilter === s ? '#4F46E5' : '#64748B',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <span style={{ fontSize: 12, color: '#94A3B8', whiteSpace: 'nowrap' }}>
          {resultCount} of {totalCount} doctors
        </span>

        {hasFilters && (
          <button id="clear-doctor-filters" onClick={onClearFilters} className="flex items-center gap-1.5 btn btn-ghost btn-sm">
            <X size={13} /> Clear
          </button>
        )}
        <button id="refresh-doctors" onClick={onRefresh} className="btn btn-secondary btn-sm" title="Refresh">
          <RefreshCw size={13} />
        </button>
        <button id="export-doctors" onClick={onExport} className="flex items-center gap-1.5 btn btn-secondary btn-sm">
          <Download size={13} /> Export
        </button>
      </div>
    </motion.div>
  );
}
