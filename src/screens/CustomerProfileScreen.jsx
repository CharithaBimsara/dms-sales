import { useState } from 'react'
import { Card, Btn, Badge, ProgressBar } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'
import { CUSTOMERS, INITIAL_ORDERS, VISIT_HISTORY } from '../data/mockData'
import { fmt, creditBarColor, creditPct, typeBadgeClass, typeIcon } from '../utils/formatters'

export default function CustomerProfileScreen({ go, params, orders }) {
  const c = CUSTOMERS.find((c) => c.id === params.cid)
  const [tab, setTab] = useState('info')

  if (!c) return null

  const custOrders = orders.filter((o) => o.cid === c.id)
  const visits     = VISIT_HISTORY.filter((v) => v.cid === c.id)
  const balPct     = creditPct(c.balance, c.credit_limit)

  const TABS = [
    ['info',   `ℹ️ Info`],
    ['orders', `📦 Orders (${custOrders.length})`],
    ['visits', `📍 Visits (${visits.length})`],
  ]

  const INFO_ROWS = [
    ['Contact Person', c.contact],
    ['Phone Number',   c.phone],
    ['Email',          `info@${c.short.toLowerCase().replace(/\s/g, '')}.lk`],
    ['Area',           c.area],
    ['Full Address',   c.address],
    ['Last Visit',     c.last_visit],
  ]

  return (
    <div className="space-y-5">
      <DesktopPageHeader
        title={c.name}
        subtitle={`${c.type} · ${c.area}`}
        right={
          <div className="flex gap-2">
            <Btn sm onClick={() => go('order',  { cid: c.id })} icon="📦">New Order</Btn>
            <Btn sm variant="secondary" onClick={() => go('visit', { cid: c.id })}>📍 Visit</Btn>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Left: profile */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-5">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                  {typeIcon(c.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${typeBadgeClass(c.type)}`}>{c.type}</span>
                  <h3 className="text-white font-extrabold mt-1 leading-snug">{c.name}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{c.address}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {[['Contact', c.contact], ['Phone', c.phone]].map(([l, v]) => (
                  <div key={l} className="bg-white/10 rounded-xl p-2.5">
                    <p className="text-slate-400 text-[10px]">{l}</p>
                    <p className="text-white text-xs font-semibold mt-0.5 truncate">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit status */}
            <div className="p-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500 font-medium">Credit Used</span>
                <span className={`font-bold ${balPct > 80 ? 'text-red-500' : 'text-slate-600'}`}>{balPct}%</span>
              </div>
              <ProgressBar pct={balPct} color={creditBarColor(balPct)} h="h-2.5" />
              <div className="flex justify-between text-xs mt-2 text-slate-400">
                <span>Used: {fmt(c.balance)}</span>
                <span>Limit: {fmt(c.credit_limit)}</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            <Btn full onClick={() => go('order', { cid: c.id })} icon="📦">New Order</Btn>
            <Btn full variant="secondary" onClick={() => go('visit', { cid: c.id })}>📍 Log Visit</Btn>
            <Btn full variant="secondary" onClick={() => go('pod',   { cid: c.id })} className="col-span-2 lg:col-span-1">
              📄 Proof of Delivery
            </Btn>
          </div>
        </div>

        {/* Right: tabs */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="flex border-b border-slate-100">
              {TABS.map(([t, label]) => (
                <button
                  key={t} onClick={() => setTab(t)}
                  className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${tab === t ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-4 lg:p-5 space-y-3">
              {tab === 'info' && INFO_ROWS.map(([l, v]) => (
                <div key={l} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
                  <span className="text-slate-400 text-sm">{l}</span>
                  <span className="text-slate-700 text-sm font-semibold text-right max-w-xs">{v}</span>
                </div>
              ))}

              {tab === 'orders' && (custOrders.length
                ? custOrders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{o.id}</p>
                      <p className="text-slate-400 text-xs">{o.date} · {o.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">{fmt(o.total)}</p>
                      <Badge color={o.status === 'Delivered' ? 'green' : o.status === 'In Transit' ? 'teal' : 'amber'} sm>{o.status}</Badge>
                    </div>
                  </div>
                ))
                : <p className="text-slate-400 text-sm text-center py-8">No orders yet</p>
              )}

              {tab === 'visits' && (visits.length
                ? visits.map((v) => (
                  <div key={v.id} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-slate-800 text-sm">{v.date} · {v.time}</p>
                      <Badge color={v.outcome === 'Order Taken' ? 'green' : v.outcome === 'Follow-up' ? 'amber' : 'slate'} sm>
                        {v.outcome}
                      </Badge>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{v.notes}</p>
                  </div>
                ))
                : <p className="text-slate-400 text-sm text-center py-8">No visits recorded</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
