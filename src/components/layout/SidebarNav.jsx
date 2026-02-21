import { USER } from '../../data/mockData'

const NAV_ITEMS = [
  { id: 'home',    label: 'Dashboard', emoji: '🏠' },
  { id: 'route',   label: 'My Route',  emoji: '🗺️' },
  { id: 'reports', label: 'Reports',   emoji: '📊' },
  { id: 'alerts',  label: 'Alerts',    emoji: '🔔' },
  { id: 'settings',label: 'Settings',  emoji: '⚙️' },
]

/** Desktop dark sidebar navigation. Hidden on mobile (lg:flex). */
export default function SidebarNav({ tab, setTab, notifs, go }) {
  const unread = notifs.filter((n) => !n.read).length

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-slate-900 h-screen flex-shrink-0">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🚚</div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">DMS Sales</p>
            <p className="text-slate-400 text-xs">Sales Rep Portal</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            className={[
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left relative',
              tab === n.id
                ? 'bg-teal-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white',
            ].join(' ')}
          >
            <span className="text-lg">{n.emoji}</span>
            <span>{n.label}</span>
            {n.id === 'alerts' && unread > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* User profile strip */}
      <div className="px-4 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {USER.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold truncate">{USER.name}</p>
            <p className="text-slate-400 text-xs truncate">{USER.team}</p>
          </div>
          <button
            onClick={() => go('login')}
            title="Sign out"
            className="text-slate-500 hover:text-red-400 transition-colors text-sm"
          >
            →
          </button>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <p className="text-slate-500 text-[10px]">Synced · 2 min ago</p>
        </div>
      </div>
    </aside>
  )
}
