/** Toast – floating notification that auto-dismisses */
export default function Toast({ msg, type }) {
  return (
    <div
      className={[
        'fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-sm w-[90vw]',
        'rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-2xl',
        'flex items-center gap-2',
        type === 'error' ? 'bg-red-500' : 'bg-emerald-600',
      ].join(' ')}
    >
      <span className="text-base">{type === 'error' ? '❌' : '✅'}</span>
      <span className="flex-1">{msg}</span>
    </div>
  )
}
