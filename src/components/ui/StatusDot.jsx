/** StatusDot – small coloured dot for route stop status */
export default function StatusDot({ status }) {
  const map = {
    done:    'bg-emerald-500',
    active:  'bg-teal-500 animate-pulse',
    pending: 'bg-slate-300',
    skipped: 'bg-red-400',
  }
  return (
    <span className={`block w-2.5 h-2.5 rounded-full flex-shrink-0 ${map[status] ?? 'bg-slate-300'}`} />
  )
}
