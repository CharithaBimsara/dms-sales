/** Badge – coloured pill label. Colors: teal | green | red | amber | blue | slate | violet */
export default function Badge({ children, color = 'teal', sm = false }) {
  const colorMap = {
    teal:   'bg-teal-50 text-teal-700 border-teal-200',
    green:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    red:    'bg-red-50 text-red-600 border-red-200',
    amber:  'bg-amber-50 text-amber-700 border-amber-200',
    blue:   'bg-blue-50 text-blue-700 border-blue-200',
    slate:  'bg-slate-100 text-slate-500 border-slate-200',
    violet: 'bg-violet-50 text-violet-700 border-violet-200',
  }

  return (
    <span
      className={[
        'inline-flex items-center border rounded-full font-semibold',
        sm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs',
        colorMap[color] ?? colorMap.slate,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
