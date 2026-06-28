// Wspólne elementy powtarzające się na każdym ekranie

export function AppScreen({ children }) {
  return (
    <div className="min-h-svh bg-[#E8E1D8] flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-[844px] bg-[#F7F4EF] overflow-hidden sm:rounded-[34px]">
        {children}
      </div>
    </div>
  )
}

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
    <div className="absolute left-[24px] top-[776px] w-[342px] pt-0 pb-0">
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

// Pole tekstowe formularzy auth — spójne ze stylem aplikacji.
export function TextField({ id, label, type = 'text', value, onChange, autoComplete, placeholder, disabled = false }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-[13px] font-semibold text-[#1F2523] leading-[17px] mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        className="h-[46px] rounded-[14px] bg-[#FFFCF7] border border-[#D9D0C5] px-4 text-[15px] text-[#1F2523] outline-none focus:border-[#1D6B5F] disabled:opacity-50"
      />
    </div>
  )
}

// Komunikat błędu formularza.
export function FormError({ children }) {
  if (!children) return null
  return (
    <p className="text-[13px] text-[#A0674E] leading-[17px] text-center" role="alert">
      {children}
    </p>
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
