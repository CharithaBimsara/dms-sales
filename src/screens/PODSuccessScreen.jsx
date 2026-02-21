import { Card, Btn, Badge } from '../components/ui'
import { CUSTOMERS } from '../data/mockData'

export default function PODSuccessScreen({ go, params }) {
  const c = CUSTOMERS.find((c) => c.id === params.cid)

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl">🚚</div>
        <h2 className="text-emerald-800 text-2xl font-extrabold mb-2">Delivery Confirmed!</h2>
        <p className="text-emerald-600 text-sm mb-6">POD uploaded · Customer WhatsApp notification sent</p>

        <Card className="p-5 mb-6 text-left space-y-3">
          {[
            ['Customer',   c?.short || '—',   null],
            ['Photo',      'Uploaded ✓',      'green'],
            ['Signature',  'Captured ✓',      'green'],
            ['Odoo Status','Synced ✓',         'teal'],
            ['WhatsApp',   'Sent ✓',           'green'],
          ].map(([l, v, color]) => (
            <div key={l} className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">{l}</span>
              {color
                ? <Badge color={color} sm>{v}</Badge>
                : <span className="font-bold text-slate-800 text-sm">{v}</span>}
            </div>
          ))}
        </Card>

        <Btn full onClick={() => go('main', 'route')}>← Back to Route</Btn>
      </div>
    </div>
  )
}
