/** ProgressBar – horizontal fill bar, percentage capped at 100 */
export default function ProgressBar({
  pct,
  color = 'bg-teal-500',
  h = 'h-2',
  track = 'bg-slate-100',
}) {
  return (
    <div className={`${track} rounded-full ${h} overflow-hidden`}>
      <div
        className={`${color} ${h} rounded-full transition-all duration-500`}
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  )
}
