# DMS Sales App — Mock Demo

A fully responsive React demo for the Distribution Management System sales rep mobile app. Uses mock data to demonstrate all workflows for project manager review.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🔐 Demo Credentials
| Field    | Value           |
|----------|-----------------|
| Email    | kasun@dms.lk    |
| Password | dms123          |
| PIN      | 1234            |

## 📁 Folder Structure

```
src/
├── components/
│   ├── ui/           # Reusable atoms: Btn, Card, Badge, Toggle, etc.
│   └── layout/       # Shell: SidebarNav, BottomNav, TopBar, Toast
├── screens/          # One file per screen/page
│   ├── LoginScreen.jsx
│   ├── PinScreen.jsx
│   ├── DashboardScreen.jsx
│   ├── RouteListScreen.jsx
│   ├── MapScreen.jsx
│   ├── VisitScreen.jsx
│   ├── CustomerProfileScreen.jsx
│   ├── OrderTakingScreen.jsx
│   ├── OrderSuccessScreen.jsx
│   ├── PODScreen.jsx
│   ├── PODSuccessScreen.jsx
│   ├── CustomerPickerScreen.jsx
│   ├── ReportsScreen.jsx
│   ├── NotificationsScreen.jsx
│   └── SettingsScreen.jsx
├── data/
│   └── mockData.js   # All mock data (customers, products, orders, etc.)
├── hooks/
│   └── useAppState.js  # Central app state (navigation, orders, visits, toasts)
├── utils/
│   └── formatters.js   # fmt(), creditColor(), typeBadge(), etc.
├── styles/
│   └── index.css       # Tailwind base + custom utilities
├── App.jsx             # Root: wires screens to navigation state
└── main.jsx            # React DOM entry point
```

## 📱 Responsive Breakpoints
- **Mobile** `< 768px` — Full screen, bottom nav, single column
- **Tablet** `768–1279px` — 2-column cards, bottom nav
- **Desktop** `≥ 1280px` — Dark sidebar nav, multi-column layouts

## 🗺️ Complete Flows
1. **Login → PIN → Dashboard**
2. **Route List → Check-In → Log Visit → Check-Out**
3. **Order Taking** with cart, discount, credit limit check
4. **Proof of Delivery** with live signature canvas + photo
5. **Customer Profile** with orders & visit history tabs
6. **Reports** with bar/area charts and target progress
7. **Notifications** with unread badge and mark-all-read
8. **Settings** with sync, notifications toggles, logout
