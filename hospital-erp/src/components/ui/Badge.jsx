// ============================================================
// Badge Component
// ============================================================
import { getStatusBadge } from '../../utils/helpers';

export default function Badge({ status, dot = true, className = '' }) {
  const config = getStatusBadge(status);
  return (
    <span className={`badge ${config.className} ${className}`}>
      {dot && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: 'currentColor', opacity: 0.7 }}
        />
      )}
      {config.label}
    </span>
  );
}
