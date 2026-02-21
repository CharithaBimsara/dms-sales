const NAV_ITEMS = [
  { id: 'home',    label: 'Home',    emoji: '🏠' },
  { id: 'route',   label: 'Route',   emoji: '🗺️' },
  { id: 'reports', label: 'Reports', emoji: '📊' },
  { id: 'alerts',  label: 'Alerts',  emoji: '🔔' },
  { id: 'settings',label: 'More',    emoji: '⚙️' },
]

/** Mobile bottom navigation bar. Hidden on desktop (lg:hidden). */
export default function BottomNav({ tab, setTab, notifs }) {
  const unread = notifs.filter((n) => !n.read).length

  return (
    // make the nav fixed at the bottom and only hide it on very wide (desktop) viewports
    // `xl:hidden` keeps it visible on phones even if the browser reports >1024px width
    // add a small bottom padding in addition to safe-area inset for Android nav bars
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 flex bg-white border-t border-slate-100 safe-bottom pb-2">
      {NAV_ITEMS.map((n) => (
        <button
          key={n.id}
          onClick={() => setTab(n.id)}
          className={[
            'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative transition-colors',
            tab === n.id ? 'text-teal-600' : 'text-slate-400',
          ].join(' ')}
        >
          <span className="text-xl leading-none">{n.emoji}</span>
          {n.id === 'alerts' && unread > 0 && (
            <span className="absolute top-1.5 right-[calc(50%-14px)] bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
          <span className={`text-[10px] font-semibold leading-none ${tab === n.id ? 'text-teal-600' : 'text-slate-400'}`}>
            {n.label}
          </span>
          {tab === n.id && (
            <span className="absolute bottom-0 inset-x-4 h-0.5 bg-teal-500 rounded-full" />
          )}
        </button>
      ))}
    </nav>
  )
}
