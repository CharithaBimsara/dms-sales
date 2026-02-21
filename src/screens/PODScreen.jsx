import { useState, useRef } from 'react'
import { Card, Btn, Badge } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'
import { CUSTOMERS, DEMO_DELIVERY_ITEMS } from '../data/mockData'
import { fmt } from '../utils/formatters'

export default function PODScreen({ go, params, showToast }) {
  const c = CUSTOMERS.find((c) => c.id === params.cid)
  const [photo,      setPhoto]      = useState(false)
  const [signed,     setSigned]     = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const canvasRef  = useRef()
  const isDrawing  = useRef(false)

  if (!c) return null

  // ─── Canvas drawing helpers ───────────────────────────────
  const getXY = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const src  = e.touches ? e.touches[0] : e
    return [src.clientX - rect.left, src.clientY - rect.top]
  }

  const startDraw = (e) => {
    isDrawing.current = true
    const ctx = canvasRef.current.getContext('2d')
    const [x, y] = getXY(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing.current) return
    e.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth   = 2
    ctx.lineCap     = 'round'
    const [x, y] = getXY(e)
    ctx.lineTo(x, y)
    ctx.stroke()
    setSigned(true)
  }

  const stopDraw = () => { isDrawing.current = false }

  const clearSignature = () => {
    canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setSigned(false)
  }

  const confirm = () => {
    if (!photo)  { showToast('Capture a delivery photo first', 'error'); return }
    if (!signed) { showToast('Customer signature required', 'error');    return }
    setSubmitting(true)
    setTimeout(() => {
      showToast('POD uploaded to Odoo! ✅')
      go('pod-success', { cid: params.cid })
    }, 1200)
  }

  const deliveryTotal = DEMO_DELIVERY_ITEMS.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div className="space-y-5">
      <DesktopPageHeader
        title="Proof of Delivery"
        subtitle={c.name}
        right={<Btn sm variant="secondary" onClick={() => go('main', 'route')}>← Route</Btn>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        {/* Left column */}
        <div className="space-y-4">
          {/* Delivery summary */}
          <Card className="overflow-hidden">
            <div className="bg-slate-800 px-5 py-4">
              <p className="text-slate-400 text-xs">Delivering to</p>
              <p className="text-white font-bold">{c.name}</p>
              <p className="text-slate-400 text-xs">{c.address}</p>
            </div>
            <div className="p-4 space-y-1">
              {DEMO_DELIVERY_ITEMS.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-slate-700 text-sm font-semibold">{item.name}</p>
                    <p className="text-slate-400 text-xs">Qty: {item.qty}</p>
                  </div>
                  <p className="font-bold text-slate-700">{fmt(item.price * item.qty)}</p>
                </div>
              ))}
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-600">Total Delivered</span>
                <span className="font-extrabold text-teal-700 text-lg">{fmt(deliveryTotal)}</span>
              </div>
            </div>
          </Card>

          {/* Photo capture */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-slate-700 text-sm">📸 Delivery Photo</p>
              {photo && <Badge color="green" sm>Captured ✓</Badge>}
            </div>
            <button
              onClick={() => { setPhoto(true); showToast('Photo captured!') }}
              className={`w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${photo ? 'bg-emerald-50 border-emerald-300' : 'border-slate-200 hover:border-teal-300'}`}
            >
              {photo
                ? <><span className="text-4xl">📸</span><span className="text-emerald-600 text-sm font-semibold">Photo captured ✓</span></>
                : <><span className="text-4xl">📷</span><span className="text-slate-400 text-sm">Tap to capture photo of delivered goods</span></>}
            </button>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Signature pad */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-slate-700 text-sm">✍️ Customer Signature</p>
              <div className="flex gap-2 items-center">
                {signed && <button onClick={clearSignature} className="text-xs text-red-500 font-semibold">Clear</button>}
                {signed && <Badge color="green" sm>Signed ✓</Badge>}
              </div>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-xl bg-white overflow-hidden">
              <canvas
                ref={canvasRef} width={400} height={150}
                className="w-full touch-none cursor-crosshair block"
                onMouseDown={startDraw}  onMouseMove={draw}  onMouseUp={stopDraw}  onMouseLeave={stopDraw}
                onTouchStart={startDraw} onTouchMove={draw}  onTouchEnd={stopDraw}
              />
            </div>
            {!signed && <p className="text-slate-400 text-xs text-center mt-2">Ask customer to sign above</p>}
          </Card>

          {/* Checklist */}
          <Card className="p-4 space-y-2.5">
            {[['Photo', photo], ['Signature', signed]].map(([l, done]) => (
              <div key={l} className="flex items-center justify-between">
                <span className="text-slate-600 text-sm">{l}</span>
                <Badge color={done ? 'green' : 'slate'} sm>{done ? '✓ Ready' : 'Pending'}</Badge>
              </div>
            ))}
          </Card>

          <Btn full onClick={confirm} disabled={submitting} className="py-3.5">
            {submitting ? 'Uploading to Odoo…' : '✅ Confirm Delivery'}
          </Btn>
        </div>
      </div>
    </div>
  )
}
