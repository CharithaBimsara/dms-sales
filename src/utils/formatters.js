/** Format number as Sri Lankan Rupees */
export const fmt = (n) => 'Rs ' + Number(n).toLocaleString()

/** Return Tailwind color classes for outlet type badges */
export const typeBadgeClass = (type) => {
  const map = {
    Supermarket: 'bg-blue-100 text-blue-700 border-blue-200',
    Pharmacy:    'bg-green-100 text-green-700 border-green-200',
    Wholesale:   'bg-violet-100 text-violet-700 border-violet-200',
    Hotel:       'bg-amber-100 text-amber-700 border-amber-200',
    Retailer:    'bg-rose-100 text-rose-700 border-rose-200',
  }
  return map[type] || 'bg-slate-100 text-slate-600 border-slate-200'
}

/** Return Tailwind color for credit bar based on percentage */
export const creditBarColor = (pct) => {
  if (pct > 80) return 'bg-red-400'
  if (pct > 60) return 'bg-amber-400'
  return 'bg-emerald-400'
}

/** Calculate credit used percentage */
export const creditPct = (balance, limit) => Math.round((balance / limit) * 100)

/** Return icon emoji for outlet type */
export const typeIcon = (type) => {
  const map = {
    Supermarket: '🏪',
    Pharmacy:    '💊',
    Wholesale:   '🏭',
    Hotel:       '🏨',
    Retailer:    '🏬',
  }
  return map[type] || '🏪'
}

/** Generate a new mock order ID */
export const generateOrderId = () => 'SO-' + (Math.floor(2025 + Math.random() * 100))
