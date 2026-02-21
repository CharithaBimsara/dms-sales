import { useState } from 'react'
import { Card } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'
import { CUSTOMERS } from '../data/mockData'
import { typeBadgeClass } from '../utils/formatters'

export default function CustomerPickerScreen({ go, params }) {
  const [search, setSearch] = useState('')
  const destination = params // 'order' | 'visit'

  const filtered = CUSTOMERS.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <DesktopPageHeader title="Select Customer" subtitle="Choose an outlet to proceed" />

      <input
        value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Search outlet name…"
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-400 transition-colors"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((c) => (
          <Card
            key={c.id}
            className="p-4"
            onClick={() => go(destination === 'order' ? 'order' : 'visit', { cid: c.id })}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🏪</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-sm truncate">{c.name}</p>
                <p className="text-slate-400 text-xs">{c.type} · {c.area}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
