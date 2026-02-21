import { useState } from 'react'
import { Card, Btn, Toggle } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'
import { USER } from '../data/mockData'

export default function SettingsScreen({ go, showToast }) {
  const [syncing,      setSyncing]      = useState(false)
  const [notifRoute,   setNotifRoute]   = useState(true)
  const [notifOrder,   setNotifOrder]   = useState(true)
  const [notifCredit,  setNotifCredit]  = useState(true)
  const [autoSync,     setAutoSync]     = useState(true)

  const doSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      showToast('Sync complete! All data up to date.')
    }, 2000)
  }

  const PROFILE_STATS = [
    ['Rep ID',  USER.repId],
    ['Team',    'South'],
    ['Grade',   USER.grade],
  ]

  const NOTIF_TOGGLES = [
    ['Route Assignments',   notifRoute,  setNotifRoute],
    ['Order Updates',       notifOrder,  setNotifOrder],
    ['Credit Limit Alerts', notifCredit, setNotifCredit],
  ]

  const APP_INFO = [
    ['Version',     'v2.1.0 · Build 2026.02'],
    ['Server',      'dms.yourcompany.lk'],
    ['Environment', 'Production'],
  ]

  return (
    <div className="space-y-5">
      <DesktopPageHeader title="Settings" subtitle="Account, preferences & sync" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile card */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-4 shadow-lg">
                {USER.avatar}
              </div>
              <p className="text-white font-extrabold text-lg">{USER.name}</p>
              <p className="text-slate-400 text-sm">{USER.email}</p>
              <p className="text-slate-400 text-xs mt-1">{USER.team} · {USER.area}</p>
            </div>
            <div className="p-4 grid grid-cols-3 divide-x divide-slate-100">
              {PROFILE_STATS.map(([l, v]) => (
                <div key={l} className="text-center px-2">
                  <p className="text-slate-400 text-[10px]">{l}</p>
                  <p className="text-slate-700 font-bold text-sm mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Settings panels */}
        <div className="lg:col-span-2 space-y-4">
          {/* Sync */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-slate-700">Data Sync</p>
                <p className="text-slate-400 text-xs">Last synced 2 minutes ago · All records current</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-600 text-xs font-semibold">Synced</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-slate-50 mb-4">
              <span className="text-slate-600 text-sm">Auto Offline Sync</span>
              <Toggle val={autoSync} set={setAutoSync} />
            </div>
            <Btn variant="secondary" full onClick={doSync} disabled={syncing}>
              {syncing ? '⏳ Syncing…' : '🔄 Sync Now'}
            </Btn>
          </Card>

          {/* Notifications */}
          <Card className="p-5">
            <p className="font-bold text-slate-700 mb-4">Notifications</p>
            <div className="space-y-1">
              {NOTIF_TOGGLES.map(([l, val, set]) => (
                <div key={l} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <span className="text-slate-600 text-sm">{l}</span>
                  <Toggle val={val} set={set} />
                </div>
              ))}
            </div>
          </Card>

          {/* App info */}
          <Card className="p-5">
            <p className="font-bold text-slate-700 mb-4">App Info</p>
            {APP_INFO.map(([l, v]) => (
              <div key={l} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
                <span className="text-slate-500 text-sm">{l}</span>
                <span className="text-slate-600 text-sm font-semibold">{v}</span>
              </div>
            ))}
          </Card>

          {/* Sign out */}
          <button
            onClick={() => go('login')}
            className="w-full py-3 bg-red-50 text-red-500 font-bold rounded-xl border border-red-100 hover:bg-red-100 active:scale-[0.98] transition-all text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
