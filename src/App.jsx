import { useState } from 'react'

// Layout
import { SidebarNav, BottomNav, Toast }    from './components/layout'
import TopBar, { DesktopPageHeader }       from './components/layout/TopBar'
import { Btn }                             from './components/ui'

// Screens
import LoginScreen          from './screens/LoginScreen'
import PinScreen            from './screens/PinScreen'
import DashboardScreen      from './screens/DashboardScreen'
import RouteListScreen      from './screens/RouteListScreen'
import MapScreen            from './screens/MapScreen'
import VisitScreen          from './screens/VisitScreen'
import CustomerProfileScreen from './screens/CustomerProfileScreen'
import CustomerPickerScreen from './screens/CustomerPickerScreen'
import OrderTakingScreen    from './screens/OrderTakingScreen'
import OrderSuccessScreen   from './screens/OrderSuccessScreen'
import PODScreen            from './screens/PODScreen'
import PODSuccessScreen     from './screens/PODSuccessScreen'
import ReportsScreen        from './screens/ReportsScreen'
import NotificationsScreen  from './screens/NotificationsScreen'
import SettingsScreen       from './screens/SettingsScreen'

// State hook
import { useAppState } from './hooks/useAppState'

// ─── Tab names for mobile top bar ────────────────────────────────────────────
const TAB_LABELS = {
  home:     'Dashboard',
  route:    'My Route',
  reports:  'Reports',
  alerts:   'Alerts',
  settings: 'Settings',
}

// ─── Main tabbed shell (shown after login) ────────────────────────────────────
function MainShell({ initTab, go, visitSt, updateVisit, orders, addOrder, notifs, markNotifRead, markAllNotifsRead, showToast }) {
  const [tab, setTab] = useState(initTab || 'home')

  const unread = notifs.filter((n) => !n.read).length

  const TAB_CONTENT = {
    home: (
      <DashboardScreen
        go={go} setTab={setTab}
        visitSt={visitSt} notifs={notifs}
      />
    ),
    route: (
      <RouteListScreen
        go={go}
        visitSt={visitSt}
        setVisitSt={(fn) => {
          // RouteListScreen expects setVisitSt to be a setter; bridge it
          const next = typeof fn === 'function' ? fn(visitSt) : fn
          Object.entries(next).forEach(([cid, status]) => {
            if (visitSt[+cid] !== status) updateVisit(+cid, status)
          })
        }}
      />
    ),
    reports:  <ReportsScreen />,
    alerts:   <NotificationsScreen notifs={notifs} markNotifRead={markNotifRead} markAllNotifsRead={markAllNotifsRead} />,
    settings: <SettingsScreen go={go} showToast={showToast} />,
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <SidebarNav tab={tab} setTab={setTab} notifs={notifs} go={go} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <TopBar
          title={TAB_LABELS[tab]}
          right={
            tab === 'home' && (
              <button
                onClick={() => setTab('alerts')}
                className="relative w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                🔔
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>
            )
          }
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-6xl mx-auto px-4 py-4 lg:px-8 lg:py-8">
            {TAB_CONTENT[tab]}
          </div>
        </main>

        {/* Mobile bottom nav */}
        <BottomNav tab={tab} setTab={setTab} notifs={notifs} />
      </div>
    </div>
  )
}

// ─── Sub-screen wrapper (full-screen with mobile top bar) ─────────────────────
function SubScreen({ title, onBack, right, children, maxWidth = 'max-w-4xl' }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <TopBar title={title} onBack={onBack} right={right} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className={`${maxWidth} mx-auto px-4 py-4 lg:px-8 lg:py-8`}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const {
    screen, params, go,
    visitSt, updateVisit,
    orders,  addOrder,
    notifs, markNotifRead, markAllNotifsRead,
    toast, showToast,
  } = useAppState()

  // Shared props passed to many screens
  const shared = { go, showToast, visitSt, updateVisit, orders, addOrder, notifs, markNotifRead, markAllNotifsRead }

  // setVisitSt compatibility shim for screens that use the setter pattern
  const setVisitStCompat = (fn) => {
    const next = typeof fn === 'function' ? fn(visitSt) : fn
    Object.entries(next).forEach(([cid, status]) => {
      if (visitSt[+cid] !== status) updateVisit(+cid, status)
    })
  }

  const SCREENS = {
    // ── Auth ──────────────────────────────────────────────────────────────────
    login: <LoginScreen go={go} />,
    pin:   <PinScreen   go={go} />,

    // ── Main tabbed shell ─────────────────────────────────────────────────────
    main: (
      <MainShell
        initTab={typeof params === 'string' ? params : 'home'}
        {...shared}
      />
    ),

    // ── Route sub-screens ─────────────────────────────────────────────────────
    map: (
      <SubScreen title="Route Map" onBack={() => go('main', 'route')} right={<span className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full font-semibold">📍 Live</span>}>
        <MapScreen go={go} visitSt={visitSt} />
      </SubScreen>
    ),

    visit: (
      <SubScreen title="Outlet Visit" onBack={() => go('main', 'route')} maxWidth="max-w-5xl">
        <VisitScreen go={go} params={params} visitSt={visitSt} updateVisit={updateVisit} showToast={showToast} />
      </SubScreen>
    ),

    customer: (
      <SubScreen
        title="Customer Profile" onBack={() => go('main', 'route')}
        right={<Btn sm onClick={() => go('order', { cid: params.cid })}>+ Order</Btn>}
        maxWidth="max-w-5xl"
      >
        <CustomerProfileScreen go={go} params={params} orders={orders} />
      </SubScreen>
    ),

    'customer-pick': (
      <SubScreen title="Select Customer" onBack={() => go('main', 'home')} maxWidth="max-w-5xl">
        <CustomerPickerScreen go={go} params={params} />
      </SubScreen>
    ),

    order: (
      <SubScreen title="Take Order" onBack={() => go('visit', { cid: params.cid })} maxWidth="max-w-6xl">
        <OrderTakingScreen go={go} params={params} showToast={showToast} addOrder={addOrder} />
      </SubScreen>
    ),

    'order-success': (
      <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
        <div className="flex-1 overflow-y-auto">
          <OrderSuccessScreen go={go} params={params} />
        </div>
      </div>
    ),

    pod: (
      <SubScreen title="Proof of Delivery" onBack={() => go('main', 'route')} maxWidth="max-w-5xl">
        <PODScreen go={go} params={params} showToast={showToast} />
      </SubScreen>
    ),

    'pod-success': (
      <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
        <div className="flex-1 overflow-y-auto">
          <PODSuccessScreen go={go} params={params} />
        </div>
      </div>
    ),
  }

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      {SCREENS[screen] ?? SCREENS.login}
    </>
  )
}
