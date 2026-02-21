import { Card, Btn } from '../components/ui'
import { DesktopPageHeader } from '../components/layout/TopBar'

export default function NotificationsScreen({ notifs, markNotifRead, markAllNotifsRead }) {
  const unread = notifs.filter((n) => !n.read).length

  return (
    <div className="space-y-5">
      <DesktopPageHeader
        title="Notifications"
        right={
          unread > 0 && (
            <Btn sm variant="ghost" onClick={markAllNotifsRead}>
              Mark all read
            </Btn>
          )
        }
      />

      {unread > 0 && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-teal-600 text-lg">🔔</span>
          <p className="text-teal-700 text-sm font-semibold">
            {unread} unread notification{unread > 1 ? 's' : ''}
          </p>
          <button
            onClick={markAllNotifsRead}
            className="ml-auto text-teal-600 text-xs font-semibold hover:text-teal-700"
          >
            Mark all read
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {notifs.map((n) => (
          <Card
            key={n.id}
            className={`p-4 cursor-pointer transition-all ${!n.read ? 'border-l-4 border-l-teal-500' : ''}`}
            onClick={() => markNotifRead(n.id)}
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className={`text-sm font-bold leading-snug ${!n.read ? 'text-slate-800' : 'text-slate-500'}`}>
                    {n.title}
                  </p>
                  {!n.read && (
                    <div className="w-2.5 h-2.5 bg-teal-500 rounded-full flex-shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{n.body}</p>
                <p className="text-slate-300 text-[10px] mt-1.5 font-medium">{n.time}</p>
              </div>
            </div>
          </Card>
        ))}

        {notifs.length === 0 && (
          <div className="col-span-full text-center py-20 text-slate-300">
            <p className="text-5xl mb-3">🔔</p>
            <p className="font-semibold">All caught up!</p>
          </div>
        )}
      </div>
    </div>
  )
}
