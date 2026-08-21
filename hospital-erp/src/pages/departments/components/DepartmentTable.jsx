// ============================================================
// Department Table — TanStack Table v8 (List View)
// ============================================================
import { useMemo, useState } from 'react';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender,
} from '@tanstack/react-table';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp, ChevronDown, ChevronsUpDown,
  Eye, Pencil, Trash2,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Stethoscope, Users, MapPin,
} from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import { SkeletonRow } from '../../../components/ui/Skeleton';

function SortIcon({ sorted }) {
  if (sorted === 'asc')  return <ChevronUp size={13} color="#4F46E5" />;
  if (sorted === 'desc') return <ChevronDown size={13} color="#4F46E5" />;
  return <ChevronsUpDown size={13} color="#CBD5E1" />;
}

function ActionBtn({ icon: Icon, onClick, color, hoverBg, title }) {
  return (
    <button
      onClick={onClick} title={title}
      style={{ width: 30, height: 30, background: 'transparent', border: 'none', cursor: 'pointer', color, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <Icon size={14} />
    </button>
  );
}

function EmptyState({ hasFilters, onClear }) {
  return (
    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <td colSpan={7} style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏥</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
          {hasFilters ? 'No departments match your filters' : 'No departments yet'}
        </div>
        <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
          {hasFilters ? 'Try adjusting your search.' : 'Add the first hospital department.'}
        </div>
        {hasFilters && <button onClick={onClear} className="btn btn-secondary btn-sm">Clear filters</button>}
      </td>
    </motion.tr>
  );
}

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function DepartmentTable({
  data, loading, hasFilters, onClearFilters,
  onEdit, onDelete, onView,
  doctors,
}) {
  const [sorting,   setSorting]   = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize,  setPageSize]  = useState(10);

  const columns = useMemo(() => [
    {
      id: 'dept',
      header: 'Department',
      accessorFn: (row) => row.name,
      cell: ({ row }) => {
        const d = row.original;
        return (
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-xl text-xl shrink-0"
              style={{ width: 44, height: 44, background: (d.color || '#4F46E5') + '15', border: `1.5px solid ${d.color || '#4F46E5'}25` }}
            >
              {d.icon || '🏥'}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{d.name}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>ID #{String(d.id).padStart(3, '0')}</div>
            </div>
          </div>
        );
      },
      size: 220,
    },
    {
      id: 'description',
      header: 'Description',
      accessorFn: (row) => row.description,
      enableSorting: false,
      cell: ({ getValue }) => (
        <div
          style={{
            fontSize: 12, color: '#64748B', lineHeight: 1.5,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
            maxWidth: 220,
          }}
        >
          {getValue() || <span style={{ color: '#CBD5E1', fontStyle: 'italic' }}>No description</span>}
        </div>
      ),
      size: 250,
    },
    {
      id: 'doctors',
      header: 'Doctors',
      accessorFn: (row) => {
        return (doctors || []).filter((doc) => doc.department === row.name).length;
      },
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1.5">
          <Stethoscope size={13} color="#4F46E5" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{getValue()}</span>
        </div>
      ),
      size: 90,
    },
    {
      id: 'patients',
      header: 'Patients',
      accessorFn: (row) => row.patients || 0,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1.5">
          <Users size={13} color="#0D9488" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{getValue()}</span>
        </div>
      ),
      size: 90,
    },
    {
      id: 'location',
      header: 'Location',
      accessorFn: (row) => row.location,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1.5">
          {getValue() ? (
            <>
              <MapPin size={11} color="#94A3B8" />
              <span style={{ fontSize: 12, color: '#374151' }}>{getValue()}</span>
            </>
          ) : (
            <span style={{ fontSize: 12, color: '#CBD5E1', fontStyle: 'italic' }}>—</span>
          )}
        </div>
      ),
      size: 150,
    },
    {
      id: 'status',
      header: 'Status',
      accessorFn: (row) => row.isActive !== false,
      cell: ({ row }) => <Badge status={row.original.isActive !== false ? 'Active' : 'Inactive'} />,
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
            <ActionBtn icon={Eye}    onClick={() => onView(d)}   title="View"   color="#2563EB" hoverBg="#EFF6FF" />
            <ActionBtn icon={Pencil} onClick={() => onEdit(d)}   title="Edit"   color="#4F46E5" hoverBg="#EEF2FF" />
            <ActionBtn icon={Trash2} onClick={() => onDelete(d)} title="Delete" color="#DC2626" hoverBg="#FEF2F2" />
          </div>
        );
      },
      size: 110,
    },
  ], [onView, onEdit, onDelete, doctors]);

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
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} cols={7} />)
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
            of <span style={{ fontWeight: 600, color: '#374151' }}>{data.length}</span> departments
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
