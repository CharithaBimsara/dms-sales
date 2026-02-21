import { useState } from 'react'
import { Card, Btn, Badge, ProgressBar } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'
import { CUSTOMERS, ROUTE_STOPS } from '../data/mockData'
import { fmt, creditBarColor, creditPct, typeBadgeClass } from '../utils/formatters'

const OUTCOMES = ['Order Taken', 'Follow-up Needed', 'Visit Only', 'Customer Not Available']

export default function VisitScreen({ go, params, visitSt, updateVisit, showToast }) {
  const c = CUSTOMERS.find((c) => c.id === params.cid)
  const [checked,  setChecked]  = useState(visitSt[params?.cid] === 'active' || visitSt[params?.cid] === 'done')
  const [notes,    setNotes]    = useState('')
  const [outcome,  setOutcome]  = useState('')
  const [photo,    setPhoto]    = useState(false)
  const [isDone,   setIsDone]   = useState(visitSt[params?.cid] === 'done')

  if (!c) return null

  const balPct = creditPct(c.balance, c.credit_limit)
  const stop   = ROUTE_STOPS.find((s) => s.cid === c.id)

  const checkIn = () => {
    setChecked(true)
    updateVisit(c.id, 'active')
    showToast('Checked in · GPS captured ✓')
  }

  const checkOut = () => {
    if (!outcome) { showToast('Please select a visit outcome', 'error'); return }
    setIsDone(true)
    updateVisit(c.id, 'done')
    showToast('Visit logged & synced to Odoo ✅')
    setTimeout(() => go('main', 'route'), 1200)
  }

  return (
    <div className="space-y-4">
      <DesktopPageHeader
        title="Outlet Visit"
        subtitle={`Stop ${stop?.seq}/5 · ${c.name}`}
        right={<Btn sm variant="secondary" onClick={() => go('main', 'route')}>← Route</Btn>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Outlet info card */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${typeBadgeClass(c.type)}`}>{c.type}</span>
                  <h2 className="text-white font-extrabold text-base mt-1.5 leading-snug">{c.name}</h2>
                  <p className="text-slate-400 text-xs mt-1">📍 {c.address}</p>
                  <p className="text-slate-400 text-xs">👤 {c.contact} · 📞 {c.phone}</p>
                </div>
                {isDone && <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">✓</div>}
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                  <span>Credit Used</span><span className="font-bold">{balPct}%</span>
                </div>
                <div className="bg-white/20 rounded-full h-2">
                  <div className={`h-2 rounded-full ${creditBarColor(balPct)}`} style={{ width: `${balPct}%` }} />
                </div>
                <p className="text-slate-400 text-[10px] mt-1">{fmt(c.balance)} / {fmt(c.credit_limit)}</p>
              </div>
            </div>

            {/* Quick action links inside card header */}
            {checked && !isDone && (
              <div className="grid grid-cols-3 divide-x divide-slate-100">
                {[
                  { icon: '📦', label: 'Order',   fn: () => go('order',   { cid: c.id }) },
                  { icon: '👤', label: 'Profile',  fn: () => go('customer',{ cid: c.id }) },
                  { icon: '📄', label: 'POD',      fn: () => go('pod',     { cid: c.id }) },
                ].map((a, i) => (
                  <button key={i} onClick={a.fn} className="flex flex-col items-center gap-1 py-3 hover:bg-slate-50 transition-colors">
                    <span className="text-lg">{a.icon}</span>
                    <span className="text-[11px] font-semibold text-slate-500">{a.label}</span>
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Check-in status card */}
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isDone ? 'bg-emerald-100' : checked ? 'bg-teal-100' : 'bg-slate-100'}`}>
                {isDone ? '✅' : checked ? '📍' : '⚪'}
              </div>
              <div>
                <p className="font-bold text-slate-700 text-sm">
                  {isDone ? 'Visit Complete' : checked ? 'Checked In' : 'Not Yet Checked In'}
                </p>
                {checked && <p className="text-slate-400 text-xs">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
              </div>
            </div>
            {!checked && !isDone && <Btn full onClick={checkIn} icon="📍">Check In Now</Btn>}
          </Card>
        </div>

        {/* Actions (visible after check-in) */}
        {checked && !isDone && (
          <div className="lg:col-span-2 space-y-4">
            {/* Photo capture */}
            <Card className="p-5">
              <p className="text-slate-700 font-semibold text-sm mb-3">📸 Capture Photo</p>
              <button
                onClick={() => { setPhoto(true); showToast('Photo saved locally') }}
                className={`w-full h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${photo ? 'bg-emerald-50 border-emerald-300' : 'border-slate-200 hover:border-teal-300'}`}
              >
                {photo
                  ? <><span className="text-3xl">📸</span><span className="text-emerald-600 text-sm font-semibold">Photo captured ✓</span></>
                  : <><span className="text-3xl">📷</span><span className="text-slate-400 text-sm">Tap to capture outlet photo</span></>}
              </button>
            </Card>

            {/* Notes */}
            <Card className="p-5">
              <p className="text-slate-700 font-semibold text-sm mb-3">📝 Visit Notes</p>
              <textarea
                value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                placeholder="What happened? Any issues or feedback from the customer?"
                className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-teal-400 resize-none transition-colors"
              />
            </Card>

            {/* Outcome */}
            <Card className="p-5">
              <p className="text-slate-700 font-semibold text-sm mb-3">📊 Visit Outcome</p>
              <div className="grid grid-cols-2 gap-2">
                {OUTCOMES.map((o) => (
                  <button
                    key={o} onClick={() => setOutcome(o)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${outcome === o ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </Card>

            <Btn full onClick={checkOut} className="py-3.5">✅ Check Out & Complete Visit</Btn>
          </div>
        )}
      </div>
    </div>
  )
}
