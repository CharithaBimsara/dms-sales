import { useState } from 'react'
import { Card, Btn } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'
import { CUSTOMERS, PRODUCTS } from '../data/mockData'
import { fmt, generateOrderId } from '../utils/formatters'

export default function OrderTakingScreen({ go, params, showToast, addOrder }) {
  const c = CUSTOMERS.find((c) => c.id === params.cid)
  const [search,     setSearch]     = useState('')
  const [catFilter,  setCatFilter]  = useState('All')
  const [cart,       setCart]       = useState({})
  const [discount,   setDiscount]   = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!c) return null

  const categories = ['All', ...[...new Set(PRODUCTS.map((p) => p.cat))]]
  const filtered   = PRODUCTS.filter((p) => {
    const matchCat = catFilter === 'All' || p.cat === catFilter
    const matchQ   = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchQ
  })

  const setQty = (id, qty) => setCart((prev) => {
    if (qty <= 0) { const n = { ...prev }; delete n[id]; return n }
    return { ...prev, [id]: qty }
  })

  const cartItems  = Object.entries(cart).map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === +id), qty }))
  const subtotal   = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const discAmt    = discount ? subtotal * Math.min(+discount, 30) / 100 : 0
  const total      = Math.round(subtotal - discAmt)
  const cartCount  = Object.values(cart).reduce((s, q) => s + q, 0)
  const available  = c.credit_limit - c.balance
  const overCredit = total > available

  const submit = () => {
    if (!cartCount) { showToast('Add at least one product', 'error'); return }
    if (overCredit) { showToast('Order exceeds available credit limit!', 'error'); return }
    setSubmitting(true)
    setTimeout(() => {
      const id = generateOrderId()
      addOrder({ id, cid: c.id, date: '21 Feb', total, status: 'Pending', items: cartItems.length })
      showToast(`Order ${id} submitted!`)
      go('order-success', { oid: id, total, cid: c.id })
    }, 1200)
  }

  return (
    <div className="space-y-4">
      <DesktopPageHeader
        title="Take Order"
        subtitle={`${c.name} · ${c.type}`}
        right={<Btn sm variant="secondary" onClick={() => go('visit', { cid: c.id })}>← Back</Btn>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Product list */}
        <div className="lg:col-span-2 space-y-3">
          {/* Search + categories */}
          <Card className="p-3 sm:p-4">
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search product or SKU…"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-400 transition-colors mb-3"
            />
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat} onClick={() => setCatFilter(cat)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${catFilter === cat ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Card>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((p) => (
              <Card key={p.id} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{p.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 font-semibold text-sm leading-tight truncate">{p.name}</p>
                    <p className="text-slate-400 text-xs">{p.sku}</p>
                  </div>
                  <p className="text-slate-800 font-bold text-sm flex-shrink-0">Rs {p.price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-slate-400 text-xs">{p.cat} · per {p.unit}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQty(p.id, (cart[p.id] || 0) - 1)}
                      className="w-7 h-7 bg-slate-100 rounded-lg text-slate-600 font-bold flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors">−</button>
                    <span className="w-8 text-center text-sm font-extrabold text-slate-700">{cart[p.id] || 0}</span>
                    <button onClick={() => setQty(p.id, (cart[p.id] || 0) + 1)}
                      className="w-7 h-7 bg-teal-100 rounded-lg text-teal-700 font-bold flex items-center justify-center hover:bg-teal-200 transition-colors">+</button>
                  </div>
                </div>
                {cart[p.id] > 0 && (
                  <p className="mt-2 pt-2 border-t border-slate-50 text-teal-600 text-xs font-bold">
                    Subtotal: Rs {(p.price * cart[p.id]).toLocaleString()}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Cart sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-4 space-y-4">
            <Card className="p-5">
              <p className="text-slate-700 font-bold text-sm mb-4">🛒 Order Summary</p>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-3xl mb-2">🛒</p>
                  <p className="text-slate-400 text-sm">No items added yet</p>
                </div>
              ) : (
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {cartItems.map((i) => (
                    <div key={i.id} className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 truncate flex-1 mr-2">{i.emoji} {i.name} <span className="text-slate-400">×{i.qty}</span></span>
                      <span className="font-semibold text-slate-700 flex-shrink-0">Rs {(i.price * i.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div>
                  <label className="text-slate-500 text-xs font-semibold block mb-1.5">Discount % (max 30)</label>
                  <input
                    value={discount} onChange={(e) => setDiscount(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="0" type="number"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-400"
                  />
                </div>

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>Rs {subtotal.toLocaleString()}</span></div>
                  {discAmt > 0 && <div className="flex justify-between text-emerald-600 font-semibold"><span>Discount {discount}%</span><span>−Rs {Math.round(discAmt).toLocaleString()}</span></div>}
                  <div className="flex justify-between text-slate-800 font-extrabold text-base border-t border-slate-100 pt-2">
                    <span>Total</span><span>Rs {total.toLocaleString()}</span>
                  </div>
                </div>

                {cartCount > 0 && (
                  <div className={`rounded-xl p-3 text-xs ${overCredit ? 'bg-red-50 border border-red-200 text-red-600' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'}`}>
                    {overCredit
                      ? `⚠️ Exceeds credit! Available: ${fmt(available)}`
                      : `✓ Within credit limit · Available: ${fmt(available)}`}
                  </div>
                )}

                <Btn full onClick={submit} disabled={submitting || !cartCount} className="py-3">
                  {submitting ? 'Submitting…' : 'Submit Order →'}
                </Btn>
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-slate-500 text-xs font-semibold mb-2">CUSTOMER</p>
              <p className="font-bold text-slate-800 text-sm">{c.short}</p>
              <p className="text-slate-400 text-xs">{c.type}</p>
              <p className="text-slate-400 text-xs mt-1">Credit available: <span className="font-semibold text-slate-600">{fmt(available)}</span></p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
