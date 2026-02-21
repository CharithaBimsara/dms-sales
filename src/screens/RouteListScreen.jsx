import { Card, Badge, ProgressBar, StatusDot } from '../components/ui'
import { Btn } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'
import { CUSTOMERS, ROUTE_STOPS } from '../data/mockData'
import { fmt, creditBarColor, creditPct, typeBadgeClass } from '../utils/formatters'

export default function RouteListScreen({ go, visitSt, setVisitSt }) {
  const done = Object.values(visitSt).filter((s) => s === 'done').length

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="Today's Route" subtitle="Route A – South Colombo · Saturday, 21 Feb" />

      {/* Route summary card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-5 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs font-medium">Route A – South Colombo</p>
              <p className="text-white font-extrabold text-lg">5 Outlets Today</p>
            </div>
            <Btn sm variant="secondary" onClick={() => go('map')} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              🗺️ Map
            </Btn>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/20 rounded-full h-2.5">
              <div className="bg-emerald-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(done / 5) * 100}%` }} />
            </div>
            <span className="text-white text-sm font-bold flex-shrink-0">{done}/5</span>
          </div>
          <div className="flex gap-4 mt-3">
            <span className="text-emerald-300 text-xs font-medium">✅ {done} Completed</span>
            <span className="text-slate-300 text-xs font-medium">⏳ {5 - done} Remaining</span>
          </div>
        </div>
      </Card>

      {/* Stop cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {ROUTE_STOPS.map((s) => {
          const c    = CUSTOMERS.find((c) => c.id === s.cid)
          const st   = visitSt[s.cid] || s.status
          const isDone   = st === 'done'
          const isActive = st === 'active'
          const balPct   = creditPct(c.balance, c.credit_limit)

          return (
            <Card key={s.id} className={`overflow-hidden ${isActive ? 'ring-2 ring-teal-400 ring-offset-2' : ''}`}>
              <div className="p-4 lg:p-5">
                <div className="flex items-start gap-3">
                  {/* Sequence / check */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0 ${isDone ? 'bg-emerald-100 text-emerald-700' : isActive ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-400'}`}>
                    {isDone ? '✓' : s.seq}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-slate-800 font-bold leading-tight">{c.name}</p>
                      {isActive && <Badge color="teal" sm>● Active</Badge>}
                    </div>
                    <p className="text-slate-400 text-xs">{c.address}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${typeBadgeClass(c.type)}`}>{c.type}</span>
                      <span className="text-slate-400 text-xs">⏰ {s.time}</span>
                    </div>
                  </div>
                </div>

                {/* Credit bar */}
                <div className="mt-3 px-1">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Credit: {fmt(c.balance)} / {fmt(c.credit_limit)}</span>
                    <span className={balPct > 80 ? 'text-red-500 font-semibold' : ''}>{balPct}%</span>
                  </div>
                  <ProgressBar pct={balPct} color={creditBarColor(balPct)} h="h-1.5" />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
                  {isDone ? (
                    <>
                      <Btn sm variant="secondary" full onClick={() => go('customer', { cid: s.cid })}>View Profile</Btn>
                      <Btn sm variant="secondary" onClick={() => go('pod', { cid: s.cid })}>📄 POD</Btn>
                    </>
                  ) : (
                    <>
                      <Btn sm full onClick={() => {
                        if (st === 'pending') setVisitSt((p) => ({ ...p, [s.cid]: 'active' }))
                        go('visit', { cid: s.cid })
                      }}>
                        {isActive ? 'Continue Visit →' : 'Check In →'}
                      </Btn>
                      <Btn sm variant="secondary" onClick={() => go('customer', { cid: s.cid })}>👤</Btn>
                      <Btn sm variant="secondary" onClick={() => go('order', { cid: s.cid })}>📦</Btn>
                    </>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
