// ============================================================
// Patient Filters — Search + Filter Bar
// ============================================================
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Download, RefreshCw } from 'lucide-react';
import { debounce } from '../../../utils/helpers';

const GENDER_OPTIONS = ['All', 'Male', 'Female', 'Other'];
const STATUS_OPTIONS = ['All', 'Active', 'Inactive'];

export default function PatientFilters({
  search,
  onSearchChange,
  genderFilter,
  onGenderChange,
  statusFilter,
  onStatusChange,
  onClearFilters,
  onExport,
  onRefresh,
  resultCount,
  totalCount,
}) {
  const hasFilters = search || genderFilter !== 'All' || statusFilter !== 'All';

  const debouncedSearch = useRef(
    debounce((val) => onSearchChange(val), 300)
  ).current;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      className="card p-4 mb-5"
    >
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="search-wrapper" style={{ flex: '1 1 240px', minWidth: 200 }}>
          <Search size={15} className="search-icon" />
          <input
            id="patient-search"
            type="text"
            placeholder="Search by name, email, phone, city…"
            defaultValue={search}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="search-input"
            style={{ width: '100%' }}
          />
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 32, background: '#E2E8F0', flexShrink: 0 }} />

        {/* Gender Filter */}
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500, whiteSpace: 'nowrap' }}>Gender:</span>
          <div className="flex gap-1">
            {GENDER_OPTIONS.map((g) => (
              <button
                key={g}
                id={`gender-filter-${g.toLowerCase()}`}
                onClick={() => onGenderChange(g)}
                style={{
                  padding: '5px 11px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1.5px solid',
                  transition: 'all 0.15s',
                  borderColor: genderFilter === g ? '#4F46E5' : '#E2E8F0',
                  background: genderFilter === g ? '#EEF2FF' : '#fff',
                  color: genderFilter === g ? '#4F46E5' : '#64748B',
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Status:</span>
          <div className="flex gap-1">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                id={`status-filter-${s.toLowerCase()}`}
                onClick={() => onStatusChange(s)}
                style={{
                  padding: '5px 11px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1.5px solid',
                  transition: 'all 0.15s',
                  borderColor: statusFilter === s ? '#4F46E5' : '#E2E8F0',
                  background: statusFilter === s ? '#EEF2FF' : '#fff',
                  color: statusFilter === s ? '#4F46E5' : '#64748B',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Result count */}
        <span style={{ fontSize: 12, color: '#94A3B8', whiteSpace: 'nowrap' }}>
          {resultCount} of {totalCount} patients
        </span>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            id="clear-filters-btn"
            onClick={onClearFilters}
            className="flex items-center gap-1.5 btn btn-ghost btn-sm"
          >
            <X size={13} />
            Clear
          </button>
        )}

        {/* Refresh */}
        <button
          id="refresh-patients-btn"
          onClick={onRefresh}
          className="btn btn-secondary btn-sm"
          title="Refresh"
        >
          <RefreshCw size={13} />
        </button>

        {/* Export */}
        <button
          id="export-patients-btn"
          onClick={onExport}
          className="flex items-center gap-1.5 btn btn-secondary btn-sm"
        >
          <Download size={13} />
          Export
        </button>
      </div>
    </motion.div>
  );
}
