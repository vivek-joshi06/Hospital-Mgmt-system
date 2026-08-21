// ============================================================
// Avatar Component
// ============================================================
import { getInitials, getAvatarColor } from '../../utils/helpers';

export default function Avatar({ name, size = 36, className = '' }) {
  const initials = getInitials(name);
  const bg = getAvatarColor(name);

  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold text-white select-none shrink-0 ${className}`}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.36 }}
      title={name}
    >
      {initials}
    </div>
  );
}
