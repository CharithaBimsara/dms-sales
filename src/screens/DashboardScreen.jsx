import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, Badge, ProgressBar, StatusDot } from '../components/ui'
import { Btn } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'
import { CUSTOMERS, ROUTE_STOPS, WEEKLY_STATS, USER } from '../data/mockData'
import { fmt } from '../utils/formatters'

const GRAD_COLORS = {
  teal:   'from-teal-500 to-teal-600',
  violet: 'from-violet-500 to-violet-600',
  amber:  'from-amber-400 to-amber-500',
  green:  'from-emerald-500 to-emerald-600',
}

export default function DashboardScreen({ go, setTab, visitSt, notifs }) {
  const done   = Object.values(visitSt).filter((s) => s === 'done').length
  const unread = notifs.filter((n) => !n.read).length

  const STATS = [
    { label: 'Visits Today',   val: `${done} / 5`,   icon: '📍', color: 'teal',   sub: done < 5 ? `${5 - done} remaining` : 'All done!' },
    { label: 'Orders Placed',  val: '1',              icon: '📦', color: 'violet', sub: 'This morning' },
    { label: 'Revenue Today',  val: 'Rs 18,500',      icon: '💰', color: 'amber',  sub: 'Cash + transfer' },
    { label: 'Commission MTD', val: fmt(USER.commission), icon: '🏆', color: 'green', sub: 'Month to date' },
  ]

  return (
    <div className="space-y-5 lg:space-y-6">
      <DesktopPageHeader
        title={`Good morning, ${USER.name.split(' ')[0]} 👋`}
        subtitle="Saturday, 21 February 2026 · Route A – South Colombo"
        right={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-700 text-xs font-semibold">Synced</span>
            </div>
            <button
              onClick={() => setTab('alerts')}
              className="relative w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              🔔
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
          </div>
        }
      />

      {/* Mobile greeting banner */}
      <div className="lg:hidden bg-gradient-to-br from-teal-700 to-teal-800 rounded-2xl p-5 text-white">
        <p className="text-teal-200 text-sm font-medium">Good morning 👋</p>
        <h2 className="text-xl font-extrabold mt-0.5">{USER.name}</h2>
        <p className="text-teal-200 text-xs mt-1">{USER.area} · {USER.team}</p>
        <div className="mt-4 flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-teal-100 text-xs font-semibold">Synced with Odoo · 2 min ago</span>
        </div>
      </div>

      {/* KPI stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {STATS.map((s, i) => (
          <Card key={i} className="p-4 lg:p-5">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${GRAD_COLORS[s.color]} flex items-center justify-center text-base shadow-sm mb-3`}>
              {s.icon}
            </div>
            <p className="text-slate-400 text-xs font-medium mb-0.5">{s.label}</p>
            <p className="text-slate-800 font-extrabold text-lg lg:text-xl leading-tight">{s.val}</p>
            <p className="text-slate-400 text-xs mt-0.5">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Route preview + Quick actions + Mini chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Route preview */}
        <Card className="lg:col-span-3 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Today's Route</p>
              <p className="text-slate-800 font-bold">Route A – South Colombo</p>
            </div>
            <Btn sm variant="ghost" onClick={() => setTab('route')}>View all →</Btn>
          </div>
          <div className="px-5 py-3 bg-slate-50 flex items-center gap-3">
            <ProgressBar pct={(done / 5) * 100} h="h-2" />
            <span className="text-xs font-bold text-slate-600 flex-shrink-0">{done}/5 stops</span>
          </div>
          <div className="divide-y divide-slate-50">
            {ROUTE_STOPS.map((s) => {
              const c  = CUSTOMERS.find((c) => c.id === s.cid)
              const st = visitSt[s.cid] || s.status
              return (
                <div
                  key={s.id}
                  className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => go('visit', { cid: s.cid })}
                >
                  <StatusDot status={st} />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 text-sm font-semibold truncate">{c.short}</p>
                    <p className="text-slate-400 text-xs">{s.time} · {c.type}</p>
                  </div>
                  <Badge color={st === 'done' ? 'green' : st === 'active' ? 'teal' : 'slate'} sm>
                    {st === 'done' ? 'Done' : st === 'active' ? 'Active' : 'Pending'}
                  </Badge>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quick actions */}
          <Card className="p-5">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide mb-3">Quick Actions</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: '📦', label: 'Order', fn: () => go('customer-pick', 'order') },
                { icon: '📍', label: 'Visit', fn: () => setTab('route') },
                { icon: '🗺️', label: 'Map',   fn: () => go('map') },
              ].map((a, i) => (
                <button
                  key={i} onClick={a.fn}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-slate-100 hover:border-teal-300 hover:bg-teal-50 active:scale-95 transition-all"
                >
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-xs font-semibold text-slate-600">{a.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Mini chart */}
          <Card className="p-5">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide mb-3">Visits This Week</p>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={WEEKLY_STATS}>
                <defs>
                  <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#0d9488" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="visits" stroke="#0d9488" strokeWidth={2} fill="url(#vg)" />
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 11 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* Monthly targets */}
      <Card className="p-5">
        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide mb-4">Monthly Targets</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {[
            { label: 'Visit Target',   done: 18, total: 25,  color: 'bg-teal-500',   pct: 72 },
            { label: 'Order Target',   done: 14, total: 20,  color: 'bg-violet-500', pct: 70 },
            { label: 'Revenue Target', done: 340,total: 500, color: 'bg-amber-500',  pct: 68 },
          ].map((t) => (
            <div key={t.label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-semibold">{t.label}</span>
                <span className="text-slate-400 text-xs font-medium">{t.done}/{t.total}</span>
              </div>
              <ProgressBar pct={t.pct} color={t.color} h="h-2.5" />
              <p className="text-slate-400 text-xs mt-1">{t.pct}% achieved</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
