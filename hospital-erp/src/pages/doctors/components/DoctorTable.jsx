// ============================================================
// Doctor Table — TanStack Table v8
// ============================================================
import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp, ChevronDown, ChevronsUpDown,
  Eye, Pencil, Trash2, Copy,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Phone, Mail, Star, Activity,
} from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import { SkeletonRow } from '../../../components/ui/Skeleton';

// ---- Specialization Badge ----
function SpecBadge({ label }) {
  return (
    <span
      style={{
        fontSize: 11, fontWeight: 500,
        padding: '2px 9px', borderRadius: 99,
        background: '#EEF2FF', color: '#4F46E5',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

// ---- Department chip ----
function DeptChip({ label }) {
  return (
    <span
      style={{
        fontSize: 10.5, fontWeight: 600,
        padding: '2px 8px', borderRadius: 99,
        background: '#F0FDFA', color: '#0D9488',
        border: '1px solid #CCFBF1',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

// ---- Experience bar ----
function ExpBar({ years }) {
  const pct = Math.min((years / 20) * 100, 100);
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{years} yrs</div>
      <div style={{ width: 64, height: 4, background: '#F1F5F9', borderRadius: 99, marginTop: 4 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg,#4F46E5,#7C3AED)', borderRadius: 99 }} />
      </div>
    </div>
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
      <td colSpan={8} style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <span style={{ fontSize: 28 }}>🩺</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
          {hasFilters ? 'No doctors match your search' : 'No doctors registered yet'}
        </div>
        <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
          {hasFilters ? 'Try adjusting your filters.' : 'Add your first doctor to get started.'}
        </div>
        {hasFilters && <button onClick={onClear} className="btn btn-secondary btn-sm">Clear filters</button>}
      </td>
    </motion.tr>
  );
}

// ============================================================
const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function DoctorTable({
  data, loading, hasFilters, onClearFilters,
  onEdit, onDelete, onView, onDuplicate,
}) {
  const [sorting,   setSorting]   = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize,  setPageSize]  = useState(10);

  const columns = useMemo(() => [
    {
      id: 'doctor',
      header: 'Doctor',
      accessorFn: (row) => row.name,
      cell: ({ row }) => {
        const d = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar name={d.name} size={38} />
              {d.isActive && (
                <div
                  style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 10, height: 10, borderRadius: '50%',
                    background: '#22C55E',
                    border: '2px solid #fff',
                  }}
                />
              )}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{d.name}</div>
              <SpecBadge label={d.specialization} />
            </div>
          </div>
        );
      },
      size: 240,
    },
    {
      id: 'qualification',
      header: 'Qualification',
      accessorFn: (row) => row.qualification,
      cell: ({ getValue }) => (
        <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', fontStyle: 'italic' }}>
          {getValue()}
        </span>
      ),
      size: 120,
    },
    {
      id: 'department',
      header: 'Department',
      accessorFn: (row) => row.department,
      cell: ({ getValue }) => <DeptChip label={getValue()} />,
      size: 150,
    },
    {
      id: 'contact',
      header: 'Contact',
      enableSorting: false,
      cell: ({ row }) => {
        const d = row.original;
        return (
          <div>
            <div className="flex items-center gap-1.5">
              <Phone size={11} color="#94A3B8" />
              <span style={{ fontSize: 12, color: '#374151' }}>{d.phone}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Mail size={11} color="#94A3B8" />
              <span style={{ fontSize: 11, color: '#94A3B8' }}>{d.email}</span>
            </div>
          </div>
        );
      },
      size: 200,
    },
    {
      id: 'experience',
      header: 'Experience',
      accessorFn: (row) => row.experience,
      cell: ({ getValue }) => <ExpBar years={getValue()} />,
      size: 110,
    },
    {
      id: 'consultations',
      header: 'Consultations',
      accessorFn: (row) => row.consultations,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1.5">
          <Activity size={12} color="#7C3AED" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
            {(getValue() || 0).toLocaleString()}
          </span>
        </div>
      ),
      size: 110,
    },
    {
      id: 'status',
      header: 'Status',
      accessorFn: (row) => row.isActive,
      cell: ({ row }) => <Badge status={row.original.isActive ? 'Active' : 'Inactive'} />,
      size: 90,
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => {
        const d = row.original;
        return (
          <div className="flex items-center gap-0.5">
            <ActionBtn icon={Eye}    onClick={() => onView(d)}      title="View"      color="#2563EB" hoverBg="#EFF6FF" />
            <ActionBtn icon={Pencil} onClick={() => onEdit(d)}      title="Edit"      color="#4F46E5" hoverBg="#EEF2FF" />
            <ActionBtn icon={Copy}   onClick={() => onDuplicate(d)} title="Duplicate" color="#0D9488" hoverBg="#F0FDFA" />
            <ActionBtn icon={Trash2} onClick={() => onDelete(d)}    title="Delete"    color="#DC2626" hoverBg="#FEF2F2" />
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
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} cols={8} />)
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
            of <span style={{ fontWeight: 600, color: '#374151' }}>{data.length}</span> doctors
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => setPageIndex(0)} disabled={pageIndex === 0} className="btn btn-ghost btn-sm"><ChevronsLeft size={14} /></button>
            <button onClick={() => setPageIndex((p) => Math.max(0, p - 1))} disabled={pageIndex === 0} className="btn btn-ghost btn-sm"><ChevronLeft size={14} /></button>
            {Array.from({ length: pageCount }, (_, i) => i).filter((i) => Math.abs(i - pageIndex) <= 2).map((i) => (
              <button
                key={i} onClick={() => setPageIndex(i)}
                style={{
                  width: 32, height: 32, borderRadius: 8, fontSize: 13,
                  fontWeight: i === pageIndex ? 700 : 500, border: '1.5px solid',
                  borderColor: i === pageIndex ? '#4F46E5' : '#E2E8F0',
                  background: i === pageIndex ? '#EEF2FF' : '#fff',
                  color: i === pageIndex ? '#4F46E5' : '#64748B',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >{i + 1}</button>
            ))}
            <button onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))} disabled={pageIndex >= pageCount - 1} className="btn btn-ghost btn-sm"><ChevronRight size={14} /></button>
            <button onClick={() => setPageIndex(pageCount - 1)} disabled={pageIndex >= pageCount - 1} className="btn btn-ghost btn-sm"><ChevronsRight size={14} /></button>
          </div>

          <div className="flex items-center gap-2">
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPageIndex(0); }}
              style={{ padding: '4px 8px', borderRadius: 8, fontSize: 12, border: '1.5px solid #E2E8F0', background: '#fff', color: '#374151', cursor: 'pointer', outline: 'none' }}
            >
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}
    </motion.div>
  );
}
