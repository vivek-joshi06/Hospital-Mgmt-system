// ============================================================
// Department Filters
// ============================================================
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Download, RefreshCw, LayoutGrid, List } from 'lucide-react';
import { debounce } from '../../../utils/helpers';

const STATUS_OPTIONS = ['All', 'Active', 'Inactive'];

export default function DepartmentFilters({
  search, onSearchChange,
  statusFilter, onStatusChange,
  viewMode, onViewModeChange,
  onClearFilters, onExport, onRefresh,
  resultCount, totalCount,
}) {
  const hasFilters = !!(search || statusFilter !== 'All');

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
        <div className="search-wrapper" style={{ flex: '1 1 220px', minWidth: 180 }}>
          <Search size={15} className="search-icon" />
          <input
            id="dept-search"
            type="text"
            placeholder="Search department name or description…"
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
          <div className="flex gap-1">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                id={`dept-status-${s.toLowerCase()}`}
                onClick={() => onStatusChange(s)}
                style={{
                  padding: '5px 11px', borderRadius: 8, fontSize: 12, fontWeight: 500,
                  cursor: 'pointer', border: '1.5px solid', transition: 'all 0.15s',
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
          {resultCount} of {totalCount} departments
        </span>

        {hasFilters && (
          <button id="clear-dept-filters" onClick={onClearFilters} className="flex items-center gap-1.5 btn btn-ghost btn-sm">
            <X size={13} /> Clear
          </button>
        )}

        {/* View mode toggle */}
        <div
          className="flex items-center rounded-lg overflow-hidden"
          style={{ border: '1.5px solid #E2E8F0', background: '#fff' }}
        >
          <button
            id="view-grid"
            onClick={() => onViewModeChange('grid')}
            style={{
              padding: '6px 10px', border: 'none', cursor: 'pointer',
              background: viewMode === 'grid' ? '#EEF2FF' : 'transparent',
              color: viewMode === 'grid' ? '#4F46E5' : '#94A3B8',
              transition: 'all 0.15s',
            }}
            title="Grid view"
          >
            <LayoutGrid size={14} />
          </button>
          <button
            id="view-list"
            onClick={() => onViewModeChange('list')}
            style={{
              padding: '6px 10px', border: 'none', cursor: 'pointer',
              background: viewMode === 'list' ? '#EEF2FF' : 'transparent',
              color: viewMode === 'list' ? '#4F46E5' : '#94A3B8',
              transition: 'all 0.15s',
            }}
            title="List view"
          >
            <List size={14} />
          </button>
        </div>

        <button id="refresh-depts" onClick={onRefresh} className="btn btn-secondary btn-sm" title="Refresh">
          <RefreshCw size={13} />
        </button>
        <button id="export-depts" onClick={onExport} className="flex items-center gap-1.5 btn btn-secondary btn-sm">
          <Download size={13} /> Export
        </button>
      </div>
    </motion.div>
  );
}
