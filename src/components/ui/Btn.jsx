/**
 * Btn – reusable button component.
 * Variants: primary | secondary | danger | ghost | dark
 */
export default function Btn({
  children, onClick,
  variant = 'primary',
  sm = false, full = false,
  disabled = false, icon,
  className = '',
}) {
  const base = [
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
    'transition-all duration-150 active:scale-[0.97] select-none cursor-pointer',
    full ? 'w-full' : '',
    sm   ? 'px-3 py-2 text-sm' : 'px-4 py-3 text-sm',
    className,
  ].join(' ')

  const variants = {
    primary:   'bg-teal-600 text-white hover:bg-teal-700 shadow-sm shadow-teal-200',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300 hover:text-teal-700',
    danger:    'bg-red-500 text-white hover:bg-red-600',
    ghost:     'text-teal-600 hover:bg-teal-50',
    dark:      'bg-slate-800 text-white hover:bg-slate-700',
  }

  return (
    <button
      className={`${base} ${variants[variant] ?? variants.primary} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}
