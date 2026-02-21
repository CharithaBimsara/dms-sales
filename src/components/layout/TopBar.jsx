/** MobileTopBar – shown on mobile for sub-screens with optional back arrow + right slot */
export default function TopBar({ title, onBack, right }) {
  return (
    <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 flex-shrink-0">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        )}
        <span className="font-bold text-slate-800">{title}</span>
      </div>
      <div>{right}</div>
    </header>
  )
}

/** DesktopPageHeader – page-level heading shown only on desktop */
export function DesktopPageHeader({ title, subtitle, right }) {
  return (
    <div className="hidden lg:flex items-center justify-between mb-6 xl:mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-slate-400 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </div>
  )
}
