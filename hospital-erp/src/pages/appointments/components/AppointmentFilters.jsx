// ============================================================
// Appointment Filters — Search + Status + Type + Date Range
// ============================================================
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Download, RefreshCw } from 'lucide-react';
import { debounce } from '../../../utils/helpers';
import { APPOINTMENT_STATUSES, APPOINTMENT_TYPES } from '../appointmentSchema';

export default function AppointmentFilters({
  search, onSearchChange,
  statusFilter, onStatusChange,
  typeFilter, onTypeChange,
  dateFrom, onDateFromChange,
  dateTo, onDateToChange,
  onClearFilters, onExport, onRefresh,
  resultCount, totalCount,
}) {
  const hasFilters = !!(search || statusFilter !== 'All' || typeFilter !== 'All' || dateFrom || dateTo);

  const debouncedSearch = useRef(
    debounce((val) => onSearchChange(val), 300)
  ).current;

  const selectStyle = {
    padding: '7px 28px 7px 10px', borderRadius: 8, fontSize: 12, fontWeight: 500,
    border: '1.5px solid #E2E8F0', background: '#fff', color: '#374151',
    cursor: 'pointer', outline: 'none', appearance: 'none', WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      className="card p-4 mb-5"
    >
      {/* Row 1: Search + Status + Type */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="search-wrapper" style={{ flex: '1 1 220px', minWidth: 180 }}>
          <Search size={15} className="search-icon" />
          <input
            id="appt-search"
            type="text"
            placeholder="Search patient, doctor, department…"
            defaultValue={search}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="search-input"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ width: 1, height: 32, background: '#E2E8F0', flexShrink: 0 }} />

        {/* Status pills */}
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Status:</span>
          <div className="flex gap-1 flex-wrap">
            {['All', ...APPOINTMENT_STATUSES].map((s) => {
              const colors = {
                All:       { active: '#4F46E5', bg: '#EEF2FF', border: '#4F46E5' },
                Pending:   { active: '#D97706', bg: '#FFFBEB', border: '#FCD34D' },
                Confirmed: { active: '#1D4ED8', bg: '#EFF6FF', border: '#93C5FD' },
                Completed: { active: '#15803D', bg: '#F0FDF4', border: '#86EFAC' },
                Cancelled: { active: '#DC2626', bg: '#FEF2F2', border: '#FCA5A5' },
              }[s] || { active: '#4F46E5', bg: '#EEF2FF', border: '#4F46E5' };
              const isActive = statusFilter === s;
              return (
                <button
                  key={s}
                  id={`appt-status-${s.toLowerCase()}`}
                  onClick={() => onStatusChange(s)}
                  style={{
                    padding: '4px 11px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', border: '1.5px solid', transition: 'all 0.15s',
                    borderColor: isActive ? colors.border : '#E2E8F0',
                    background:  isActive ? colors.bg   : '#fff',
                    color:       isActive ? colors.active : '#64748B',
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <span style={{ fontSize: 12, color: '#94A3B8', whiteSpace: 'nowrap' }}>
          {resultCount} of {totalCount}
        </span>
        {hasFilters && (
          <button id="clear-appt-filters" onClick={onClearFilters} className="flex items-center gap-1.5 btn btn-ghost btn-sm">
            <X size={13} /> Clear
          </button>
        )}
        <button id="refresh-appts" onClick={onRefresh} className="btn btn-secondary btn-sm" title="Refresh">
          <RefreshCw size={13} />
        </button>
        <button id="export-appts" onClick={onExport} className="flex items-center gap-1.5 btn btn-secondary btn-sm">
          <Download size={13} /> Export
        </button>
      </div>

      {/* Row 2: Type + Date range */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Type:</span>
          <select id="appt-type-filter" value={typeFilter} onChange={(e) => onTypeChange(e.target.value)} style={selectStyle}>
            <option value="All">All Types</option>
            {APPOINTMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div style={{ width: 1, height: 24, background: '#E2E8F0' }} />

        <div className="flex items-center gap-2">
          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>From:</span>
          <input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            style={{ ...selectStyle, padding: '6px 10px', backgroundImage: 'none' }}
          />
          <span style={{ fontSize: 12, color: '#94A3B8' }}>To:</span>
          <input
            id="date-to"
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            style={{ ...selectStyle, padding: '6px 10px', backgroundImage: 'none' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
