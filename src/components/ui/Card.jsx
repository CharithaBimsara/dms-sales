/** Card – white rounded container with optional click handler */
export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={[
        'bg-white rounded-2xl border border-slate-100 shadow-sm',
        onClick ? 'cursor-pointer hover:border-teal-200 hover:shadow-md transition-all' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
