import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Card, ProgressBar } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'
import { WEEKLY_STATS, USER } from '../data/mockData'
import { fmt } from '../utils/formatters'

const TARGETS = [
  { label: 'Visit Target',   done: 18, total: 25,  color: 'bg-teal-500'   },
  { label: 'Order Target',   done: 14, total: 20,  color: 'bg-violet-500' },
  { label: 'Revenue Target', done: 340,total: 500, color: 'bg-amber-500'  },
]

const KPI_CARDS = [
  { label: 'Visits Today',   val: '2/5',     icon: '📍', sub: '3 remaining'      },
  { label: 'Orders Today',   val: '1',        icon: '📦', sub: 'Pending approval' },
  { label: 'Revenue Today',  val: 'Rs 18.5K', icon: '💰', sub: 'This morning'     },
  { label: 'Commission MTD', val: 'Rs 28.4K', icon: '🏆', sub: 'Month to date'    },
]

export default function ReportsScreen() {
  const [chartKey, setChartKey] = useState('visits')

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="My Reports" subtitle="Week of 17–21 February 2026" />

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
        {KPI_CARDS.map((s, i) => (
          <Card key={i} className="p-4 lg:p-5">
            <span className="text-2xl block mb-2">{s.icon}</span>
            <p className="text-slate-400 text-xs">{s.label}</p>
            <p className="text-slate-800 font-extrabold text-lg lg:text-xl mt-0.5">{s.val}</p>
            <p className="text-slate-400 text-xs mt-0.5">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Bar chart */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-5">
          <p className="font-bold text-slate-700">Weekly Performance</p>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {[['visits', 'Visits'], ['rev', 'Revenue']].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setChartKey(k)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${chartKey === k ? 'bg-white shadow text-slate-700' : 'text-slate-500'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={WEEKLY_STATS} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={28} />
            <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 12 }} />
            <Bar
              dataKey={chartKey}
              fill={chartKey === 'visits' ? '#0d9488' : '#f59e0b'}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Commission card */}
        <Card className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">Commission MTD</p>
              <p className="text-teal-700 text-3xl font-extrabold mt-1">{fmt(USER.commission)}</p>
              <p className="text-slate-400 text-xs mt-1">Based on confirmed sales</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl">🏆</div>
          </div>
          <ProgressBar pct={57} color="bg-amber-500" h="h-2.5" />
          <p className="text-slate-400 text-xs mt-1.5">57% of monthly commission target</p>
        </Card>

        {/* Monthly targets */}
        <Card className="p-5">
          <p className="font-bold text-slate-700 mb-4">Monthly Targets</p>
          <div className="space-y-4">
            {TARGETS.map((t) => (
              <div key={t.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-600 font-medium">{t.label}</span>
                  <span className="text-slate-400">
                    {t.done}/{t.total} · {Math.round((t.done / t.total) * 100)}%
                  </span>
                </div>
                <ProgressBar pct={(t.done / t.total) * 100} color={t.color} h="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
