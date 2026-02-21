/** Toggle – iOS-style on/off switch */
export default function Toggle({ val, set }) {
  return (
    <button
      onClick={() => set(!val)}
      className={[
        'relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0',
        val ? 'bg-teal-500' : 'bg-slate-200',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200',
          val ? 'translate-x-5' : '',
        ].join(' ')}
      />
    </button>
  )
}
