// ============================================================
// Appointment Table — TanStack Table v8
// ============================================================
import { useMemo, useState } from 'react';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender,
} from '@tanstack/react-table';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp, ChevronDown, ChevronsUpDown,
  Eye, Pencil, Trash2, Copy,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  AlertCircle, Clock, DollarSign,
} from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import { SkeletonRow } from '../../../components/ui/Skeleton';

// ---- Status Badge (colored) ----
const STATUS_STYLES = {
  Pending:   { bg: '#FFFBEB', color: '#D97706', dot: '#F59E0B' },
  Confirmed: { bg: '#EFF6FF', color: '#1D4ED8', dot: '#3B82F6' },
  Completed: { bg: '#F0FDF4', color: '#15803D', dot: '#22C55E' },
  Cancelled: { bg: '#FEF2F2', color: '#DC2626', dot: '#EF4444' },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { bg: '#F8FAFC', color: '#64748B', dot: '#94A3B8' };
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontSize: 11, fontWeight: 600, padding: '3px 10px',
        borderRadius: 99, background: s.bg, color: s.color,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block', flexShrink: 0 }} />
      {status}
    </span>
  );
}

// ---- Type Badge ----
const TYPE_STYLES = {
  Emergency:   { bg: '#FFF1F2', color: '#E11D48' },
  'Follow-up': { bg: '#EFF6FF', color: '#2563EB' },
  'Pre-op':    { bg: '#F5F3FF', color: '#7C3AED' },
  Therapy:     { bg: '#F0FDFA', color: '#0D9488' },
  Consultation:{ bg: '#F8FAFC', color: '#475569' },
  'Check-up':  { bg: '#FFFBEB', color: '#B45309' },
  Routine:     { bg: '#F0FDF4', color: '#15803D' },
};

function TypeBadge({ type }) {
  const s = TYPE_STYLES[type] || { bg: '#F8FAFC', color: '#64748B' };
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: s.bg, color: s.color }}>
      {type}
    </span>
  );
}

// ---- Sort Icon ----
function SortIcon({ sorted }) {
  if (sorted === 'asc')  return <ChevronUp size={13} color="#4F46E5" />;
  if (sorted === 'desc') return <ChevronDown size={13} color="#4F46E5" />;
  return <ChevronsUpDown size={13} color="#CBD5E1" />;
}

// ---- Action Btn ----
function ActionBtn({ icon: Icon, onClick, color = '#64748B', hoverBg = '#F1F5F9', title }) {
  return (
    <button
      onClick={onClick} title={title}
      className="flex items-center justify-center rounded-lg transition-all duration-150"
      style={{ width: 30, height: 30, background: 'transparent', border: 'none', cursor: 'pointer', color }}
      onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <Icon size={14} />
    </button>
  );
}

// ---- Empty State ----
function EmptyState({ hasFilters, onClear }) {
  return (
    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <td colSpan={9} style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <span style={{ fontSize: 28 }}>📅</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
          {hasFilters ? 'No appointments match your filters' : 'No appointments scheduled'}
        </div>
        <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
          {hasFilters ? 'Adjust your search or filter criteria.' : 'Book the first appointment to get started.'}
        </div>
        {hasFilters && <button onClick={onClear} className="btn btn-secondary btn-sm">Clear filters</button>}
      </td>
    </motion.tr>
  );
}

// ============================================================
const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function AppointmentTable({
  data, loading, hasFilters, onClearFilters,
  onEdit, onDelete, onView, onDuplicate,
}) {
  const [sorting,   setSorting]   = useState([{ id: 'date', desc: true }]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize,  setPageSize]  = useState(10);

  const columns = useMemo(() => [
    {
      id: 'id',
      header: '#',
      accessorFn: (row) => row.id,
      cell: ({ getValue }) => (
        <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>
          #{String(getValue()).padStart(4, '0')}
        </span>
      ),
      size: 60,
    },
    {
      id: 'patient',
      header: 'Patient',
      accessorFn: (row) => row.patientName,
      cell: ({ row }) => {
        const a = row.original;
        return (
          <div className="flex items-center gap-2.5">
            <Avatar name={a.patientName} size={34} />
            <div>
              <div className="flex items-center gap-1.5">
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{a.patientName}</span>
                {a.isEmergency && <AlertCircle size={12} color="#E11D48" />}
              </div>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>{a.patientPhone || '—'}</span>
            </div>
          </div>
        );
      },
      size: 190,
    },
    {
      id: 'doctor',
      header: 'Doctor',
      accessorFn: (row) => row.doctorName,
      cell: ({ row }) => {
        const a = row.original;
        return (
          <div className="flex items-center gap-2.5">
            <Avatar name={a.doctorName} size={30} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{a.doctorName}</div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>{a.department}</div>
            </div>
          </div>
        );
      },
      size: 190,
    },
    {
      id: 'date',
      header: 'Date & Time',
      accessorFn: (row) => row.appointmentDate || row.date,
      cell: ({ row }) => {
        const a = row.original;
        const d = a.appointmentDate || a.date;
        const isToday = d === new Date().toISOString().slice(0, 10);
        return (
          <div>
            <div className="flex items-center gap-1.5">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>
                {formatDate(d)}
              </div>
              {isToday && (
                <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 99, background: '#EEF2FF', color: '#4F46E5' }}>
                  TODAY
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock size={10} color="#94A3B8" />
              <span style={{ fontSize: 11, color: '#94A3B8' }}>{a.appointmentTime || a.time || '—'}</span>
            </div>
          </div>
        );
      },
      size: 150,
    },
    {
      id: 'type',
      header: 'Type',
      accessorFn: (row) => row.type,
      cell: ({ getValue }) => <TypeBadge type={getValue() || 'Consultation'} />,
      size: 110,
    },
    {
      id: 'status',
      header: 'Status',
      accessorFn: (row) => row.appointmentStatus || row.status,
      cell: ({ getValue }) => <StatusBadge status={getValue()} />,
      size: 115,
    },
    {
      id: 'amount',
      header: 'Amount',
      accessorFn: (row) => row.totalConsultedAmount || row.amount || 0,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1">
          <DollarSign size={12} color="#7C3AED" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
            {(getValue() || 0).toLocaleString()}
          </span>
        </div>
      ),
      size: 90,
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => {
        const a = row.original;
        return (
          <div className="flex items-center gap-0.5">
            <ActionBtn icon={Eye}    onClick={() => onView(a)}      title="View"      color="#2563EB" hoverBg="#EFF6FF" />
            <ActionBtn icon={Pencil} onClick={() => onEdit(a)}      title="Edit"      color="#4F46E5" hoverBg="#EEF2FF" />
            <ActionBtn icon={Copy}   onClick={() => onDuplicate(a)} title="Duplicate" color="#0D9488" hoverBg="#F0FDFA" />
            <ActionBtn icon={Trash2} onClick={() => onDelete(a)}    title="Delete"    color="#DC2626" hoverBg="#FEF2F2" />
          </div>
        );
      },
      size: 130,
    },
  ], [onView, onEdit, onDelete, onDuplicate]);

  const pageCount = Math.ceil(data.length / pageSize);
  const paged     = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const table = useReactTable({
    data: paged, columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="table-container"
    >
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    style={{ width: header.getSize() }}
                  >
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && <SortIcon sorted={header.column.getIsSorted()} />}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} cols={9} />)
            ) : table.getRowModel().rows.length === 0 ? (
              <EmptyState hasFilters={hasFilters} onClear={onClearFilters} />
            ) : (
              <AnimatePresence>
                {table.getRowModel().rows.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.25 }}
                    style={{ background: row.original.isEmergency ? '#FFF8F8' : undefined }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && data.length > 0 && (
        <div
          className="flex items-center justify-between px-5 py-3 flex-wrap gap-3"
          style={{ borderTop: '1px solid #F1F5F9' }}
        >
          <div style={{ fontSize: 12, color: '#94A3B8' }}>
            Showing{' '}
            <span style={{ fontWeight: 600, color: '#374151' }}>
              {pageIndex * pageSize + 1}–{Math.min((pageIndex + 1) * pageSize, data.length)}
            </span>{' '}
            of <span style={{ fontWeight: 600, color: '#374151' }}>{data.length}</span> appointments
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPageIndex(0)} disabled={pageIndex === 0} className="btn btn-ghost btn-sm"><ChevronsLeft size={14} /></button>
            <button onClick={() => setPageIndex((p) => Math.max(0, p - 1))} disabled={pageIndex === 0} className="btn btn-ghost btn-sm"><ChevronLeft size={14} /></button>
            {Array.from({ length: pageCount }, (_, i) => i).filter((i) => Math.abs(i - pageIndex) <= 2).map((i) => (
              <button key={i} onClick={() => setPageIndex(i)}
                style={{ width: 32, height: 32, borderRadius: 8, fontSize: 13, fontWeight: i === pageIndex ? 700 : 500, border: '1.5px solid', borderColor: i === pageIndex ? '#4F46E5' : '#E2E8F0', background: i === pageIndex ? '#EEF2FF' : '#fff', color: i === pageIndex ? '#4F46E5' : '#64748B', cursor: 'pointer', transition: 'all 0.15s' }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))} disabled={pageIndex >= pageCount - 1} className="btn btn-ghost btn-sm"><ChevronRight size={14} /></button>
            <button onClick={() => setPageIndex(pageCount - 1)} disabled={pageIndex >= pageCount - 1} className="btn btn-ghost btn-sm"><ChevronsRight size={14} /></button>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Rows per page:</span>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPageIndex(0); }} style={{ padding: '4px 8px', borderRadius: 8, fontSize: 12, border: '1.5px solid #E2E8F0', background: '#fff', color: '#374151', cursor: 'pointer', outline: 'none' }}>
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}
    </motion.div>
  );
}
