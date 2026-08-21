// ============================================================
// Button Component
// ============================================================

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const variants = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    danger:    'btn-danger',
    ghost:     'btn-ghost',
  };
  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    icon: 'btn-icon',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn ${variants[variant] || ''} ${sizes[size] || ''} ${className}`}
      {...props}
    >
      {loading ? (
        <span className={`spinner ${variant === 'primary' || variant === 'danger' ? '' : 'spinner-primary'}`} />
      ) : Icon ? (
        <Icon size={15} />
      ) : null}
      {children}
      {!loading && IconRight && <IconRight size={15} />}
    </button>
  );
}
