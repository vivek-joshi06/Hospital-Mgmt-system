// ============================================================
// UTILITY HELPERS
// ============================================================

/**
 * Calculate age from date of birth string
 */
export function calcAge(dob) {
  if (!dob) return '—';
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

/**
 * Format currency
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date string nicely
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

/**
 * Get initials from full name
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .filter((n) => n.length > 0)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

/**
 * Get avatar background color (deterministic from string)
 */
const AVATAR_COLORS = [
  '#4F46E5', '#7C3AED', '#2563EB', '#0891B2',
  '#0D9488', '#16A34A', '#CA8A04', '#DC2626',
  '#DB2777', '#9333EA',
];

export function getAvatarColor(name) {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/**
 * Debounce function
 */
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Status badge config
 */
export const STATUS_CONFIG = {
  Active:    { label: 'Active',     className: 'badge-active'    },
  Inactive:  { label: 'Inactive',   className: 'badge-inactive'  },
  Pending:   { label: 'Pending',    className: 'badge-pending'   },
  Confirmed: { label: 'Confirmed',  className: 'badge-confirmed' },
  Completed: { label: 'Completed',  className: 'badge-completed' },
  Cancelled: { label: 'Cancelled',  className: 'badge-cancelled' },
  Emergency: { label: 'Emergency',  className: 'badge-emergency' },
};

export function getStatusBadge(status) {
  return STATUS_CONFIG[status] || { label: status, className: 'badge-inactive' };
}

/**
 * Number with + sign if positive
 */
export function formatDelta(n) {
  return n > 0 ? `+${n}` : `${n}`;
}

/**
 * Truncate text
 */
export function truncate(str, max = 40) {
  if (!str || str.length <= max) return str;
  return str.slice(0, max) + '…';
}
