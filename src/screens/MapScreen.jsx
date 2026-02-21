import { useState } from 'react'
import { Btn, Badge } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'
import { CUSTOMERS, ROUTE_STOPS } from '../data/mockData'

const AREA_LABELS = [
  { t: 'Colombo 9', x: '68%', y: '18%' },
  { t: 'Dehiwala',  x: '14%', y: '55%' },
  { t: 'Mt Lavinia',x: '40%', y: '65%' },
  { t: 'Ratmalana', x: '72%', y: '80%' },
]

const LEGEND = [
  ['bg-emerald-500', 'Done'],
  ['bg-teal-500 animate-pulse', 'Active'],
  ['bg-slate-400', 'Pending'],
  ['bg-blue-600', 'You'],
]

export default function MapScreen({ go, visitSt }) {
  const [selected, setSelected] = useState(null)
  const sel = selected ? CUSTOMERS.find((c) => c.id === selected) : null

  const markerColor = (status) => {
    if (status === 'done')   return '#10b981'
    if (status === 'active') return '#0d9488'
    return '#94a3b8'
  }

  return (
    <div className="space-y-4">
      <DesktopPageHeader
        title="Route Map"
        subtitle="Live GPS · Route A – South Colombo"
        right={<Btn sm variant="secondary" onClick={() => go('main', 'route')}>← Back to List</Btn>}
      />

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Map canvas */}
        <div className="relative bg-teal-50 overflow-hidden" style={{ height: 'clamp(320px, 45vh, 560px)' }}>
          {/* SVG roads + route path */}
          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,30 Q25,28 50,45 T100,52" stroke="#94a3b8" strokeWidth="2.5" fill="none" />
            <path d="M20,0 L22,100" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <path d="M0,65 Q40,62 70,68 L100,70" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <path d="M62,0 Q63,45 65,100" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
            {ROUTE_STOPS.map((s, i) => {
              if (i === ROUTE_STOPS.length - 1) return null
              const c1  = CUSTOMERS.find((c) => c.id === s.cid)
              const c2  = CUSTOMERS.find((c) => c.id === ROUTE_STOPS[i + 1].cid)
              const st  = visitSt[s.cid] || s.status
              return (
                <line key={i} x1={c1.mx} y1={c1.my} x2={c2.mx} y2={c2.my}
                  stroke={st === 'done' ? '#10b981' : '#cbd5e1'}
                  strokeWidth={st === 'done' ? '1.5' : '1'}
                  strokeDasharray={st === 'done' ? '' : '4,3'}
                />
              )
            })}
          </svg>

          {/* Area labels */}
          {AREA_LABELS.map((l) => (
            <span key={l.t} className="absolute text-[10px] font-semibold text-slate-400 pointer-events-none" style={{ left: l.x, top: l.y }}>{l.t}</span>
          ))}

          {/* Legend */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 shadow space-y-1">
            {LEGEND.map(([col, lab]) => (
              <div key={lab} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${col}`} />
                <span className="text-[10px] font-medium text-slate-600">{lab}</span>
              </div>
            ))}
          </div>

          {/* Outlet markers */}
          {CUSTOMERS.map((c) => {
            const stop       = ROUTE_STOPS.find((s) => s.cid === c.id)
            const st         = visitSt[c.id] || stop?.status || 'pending'
            const isSelected = selected === c.id
            return (
              <button
                key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all"
                style={{ left: `${c.mx}%`, top: `${c.my}%` }}
              >
                <div className={`flex flex-col items-center gap-1 transition-transform ${isSelected ? 'scale-125' : ''}`}>
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[3px] border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: markerColor(st) }}
                  >
                    {stop?.seq}
                  </div>
                  {isSelected && (
                    <div className="bg-white rounded-xl px-2.5 py-1 shadow-lg whitespace-nowrap">
                      <p className="text-xs font-bold text-slate-800">{c.short}</p>
                    </div>
                  )}
                </div>
              </button>
            )
          })}

          {/* Rep GPS dot */}
          <div className="absolute z-20" style={{ left: '65%', top: '30%', transform: 'translate(-50%,-50%)' }}>
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-60" />
            </div>
          </div>
        </div>

        {/* Selected outlet panel */}
        <div className="p-4 border-t border-slate-50 bg-slate-50">
          {sel ? (
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-800">{sel.name}</p>
                <p className="text-slate-400 text-xs">{sel.address}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Btn sm onClick={() => go('visit', { cid: sel.id })}>Check In</Btn>
                <Btn sm variant="secondary" onClick={() => go('customer', { cid: sel.id })}>Profile</Btn>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center">Tap a marker to select an outlet</p>
          )}
        </div>
      </div>
    </div>
  )
}
