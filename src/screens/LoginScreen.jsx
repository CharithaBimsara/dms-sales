import { useState } from 'react'
import { DEMO_CREDENTIALS } from '../data/mockData'
import Btn from '../components/ui/Btn'

export default function LoginScreen({ go }) {
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [err,     setErr]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw,  setShowPw]  = useState(false)

  const submit = () => {
    setErr('')
    if (!email || !pass) { setErr('Please enter your email and password'); return }
    if (email !== DEMO_CREDENTIALS.email || pass !== DEMO_CREDENTIALS.password) {
      setErr(`Invalid credentials. Use ${DEMO_CREDENTIALS.email} / ${DEMO_CREDENTIALS.password}`)
      return
    }
    setLoading(true)
    setTimeout(() => { setLoading(false); go('pin') }, 900)
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left branding panel — desktop only */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 xl:w-2/5 bg-slate-900 p-10 xl:p-16">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-2xl">🚚</div>
            <span className="text-white font-bold text-lg">DMS Sales</span>
          </div>
          <h2 className="text-white text-4xl xl:text-5xl font-extrabold leading-tight mb-4">
            Distribution<br />Management<br />System
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Manage your daily routes, capture orders, track visits and sync everything to Odoo in real time.
          </p>
        </div>
        <div className="space-y-3">
          {['Offline-first — works without internet', 'Real-time Odoo sync', 'GPS route tracking', 'Digital proof of delivery'].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-emerald-400">✓</span>
              <span className="text-slate-300 text-sm">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden text-center mb-10">
            <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">🚚</div>
            <h1 className="text-slate-800 text-2xl font-extrabold">DMS Sales</h1>
            <p className="text-slate-400 text-sm">Distribution Management System</p>
          </div>

          <h3 className="text-slate-800 text-2xl font-bold mb-1 hidden lg:block">Sign in</h3>
          <p className="text-slate-400 text-sm mb-8 hidden lg:block">Enter your credentials to continue</p>

          <div className="space-y-4">
            <div>
              <label className="text-slate-600 text-sm font-semibold block mb-1.5">Email Address</label>
              <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={DEMO_CREDENTIALS.email} type="email"
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all placeholder-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="text-slate-600 text-sm font-semibold block mb-1.5">Password</label>
              <div className="relative">
                <input
                  value={pass} onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••" type={showPw ? 'text' : 'password'}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all placeholder-slate-300 bg-white"
                />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg">
                  {showPw ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {err && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{err}</div>}

            <Btn full onClick={submit} disabled={loading} className="mt-2 py-3.5">
              {loading ? '⏳ Signing in…' : 'Sign In →'}
            </Btn>
          </div>

          {/* Demo hint */}
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-slate-500 text-xs font-semibold mb-2">DEMO CREDENTIALS</p>
            <p className="text-slate-600 text-sm"><span className="text-slate-400">Email:</span> {DEMO_CREDENTIALS.email}</p>
            <p className="text-slate-600 text-sm"><span className="text-slate-400">Password:</span> {DEMO_CREDENTIALS.password} · <span className="text-slate-400">PIN:</span> {DEMO_CREDENTIALS.pin}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
