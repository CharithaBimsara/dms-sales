import { Card, Btn, Badge } from '../components/ui'
import { fmt } from '../utils/formatters'

export default function OrderSuccessScreen({ go, params }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">✅</div>
        <h2 className="text-slate-800 text-2xl font-extrabold mb-2">Order Submitted!</h2>
        <p className="text-slate-400 text-sm mb-6">Sent to Odoo · Pending manager approval</p>

        <Card className="p-5 mb-6 text-left space-y-3">
          {[
            ['Order ID', params.oid,            false],
            ['Total',    fmt(params.total),      false],
            ['Status',   'Pending Approval',     'amber'],
            ['Sync',     'Synced to Odoo ✓',     'teal'],
          ].map(([l, v, badge]) => (
            <div key={l} className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">{l}</span>
              {badge
                ? <Badge color={badge} sm>{v}</Badge>
                : <span className="font-bold text-slate-800 text-sm">{v}</span>}
            </div>
          ))}
        </Card>

        <div className="space-y-3">
          <Btn full onClick={() => go('pod', { cid: params.cid })}>📄 Go to Proof of Delivery</Btn>
          <Btn full variant="secondary" onClick={() => go('main', 'route')}>← Back to Route</Btn>
        </div>
      </div>
    </div>
  )
}
