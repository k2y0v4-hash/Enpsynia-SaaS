// Wspólne elementy powtarzające się na każdym ekranie

export function Hamburger({ disabled = false, onClick }) {
  const lineColor = disabled ? '#D9D0C5' : '#1F2523'
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className="w-[42px] h-[42px] rounded-[21px] bg-[#FFFCF7] border border-[#D9D0C5] flex flex-col items-center justify-center gap-[6px]"
      aria-label="Menu"
    >
      <span className="block w-[22px] h-[2px] rounded-[1px]" style={{ backgroundColor: lineColor }} />
      <span className="block w-[22px] h-[2px] rounded-[1px]" style={{ backgroundColor: lineColor }} />
      <span className="block w-[22px] h-[2px] rounded-[1px]" style={{ backgroundColor: lineColor }} />
    </button>
  )
}

export function ScreenFooter() {
  return (
    <div className="mx-6 pt-4 pb-5">
      <div className="h-px bg-[#D9D0C5]" />
      <p
        className="text-[11px] text-[#66716C] text-center mt-[17px]"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
      >
        © Krzysztof Kowalski
      </p>
    </div>
  )
}

// Przyciski akcji na dole ekranu
// variant="primary" → teal; variant="outline" → białe z obramowaniem
export function ActionButton({ children, onClick, variant = 'primary', size = 'small', disabled = false }) {
  const widths = { small: 'w-[113px]', wide: 'w-[246px]' }
  const styles = {
    primary: disabled
      ? 'bg-[#D9D0C5] text-[#66716C]'
      : 'bg-[#1D6B5F] text-white',
    outline: 'bg-[#FFFCF7] border border-[#D9D0C5] text-[#1D6B5F]',
  }
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`h-[46px] rounded-[23px] text-[13px] font-semibold ${widths[size]} ${styles[variant]}`}
    >
      {children}
    </button>
  )
}
