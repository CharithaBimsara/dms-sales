import { useState } from 'react'
import { USER, DEMO_CREDENTIALS } from '../data/mockData'

export default function PinScreen({ go }) {
  const [pin,   setPin]   = useState('')
  const [shake, setShake] = useState(false)

  const press = (v) => {
    if (pin.length >= 4) return
    const np = pin + v
    setPin(np)
    if (np.length === 4) {
      if (np === DEMO_CREDENTIALS.pin) {
        setTimeout(() => go('main'), 400)
      } else {
        setTimeout(() => {
          setShake(true)
          setPin('')
          setTimeout(() => setShake(false), 500)
        }, 200)
      }
    }
  }

  const del = () => setPin((p) => p.slice(0, -1))
  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫']

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        {/* Avatar */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-4 shadow-xl">
            {USER.avatar}
          </div>
          <h2 className="text-white text-xl font-bold">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-0.5">{USER.name}</p>
        </div>

        <p className="text-slate-400 text-sm text-center mb-6">Enter your PIN to continue</p>

        {/* PIN dots */}
        <div className={`flex justify-center gap-4 mb-8 ${shake ? 'animate-bounce' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={[
                'w-4 h-4 rounded-full border-2 transition-all duration-150',
                i < pin.length ? 'bg-teal-400 border-teal-400 scale-110' : 'border-slate-600',
              ].join(' ')}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {keys.map((k, i) => (
            <button
              key={i}
              onClick={() => (k === '⌫' ? del() : k ? press(k) : null)}
              className={[
                'h-14 sm:h-16 rounded-2xl text-xl font-bold transition-all duration-100 active:scale-90',
                k
                  ? k === '⌫'
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                  : 'pointer-events-none',
              ].join(' ')}
            >
              {k}
            </button>
          ))}
        </div>

        <p className="text-slate-600 text-xs text-center">PIN hint: {DEMO_CREDENTIALS.pin}</p>
      </div>
    </div>
  )
}
