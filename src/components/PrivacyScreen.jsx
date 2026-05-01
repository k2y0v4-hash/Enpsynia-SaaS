import { useState } from 'react'
import { AppScreen, Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

const TOGGLES = [
  { id: 'localHistory', title: 'Historia lokalna', subtitle: 'Zapisuj check-iny na tym urządzeniu.', defaultValue: true },
  { id: 'analytics',    title: 'Analityka',        subtitle: 'Pomóż ulepszać aplikację.',           defaultValue: false },
  { id: 'reminder',     title: 'Przypomnienie',    subtitle: 'Jedno delikatne przypomnienie dziennie.', defaultValue: false },
]

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-[42px] h-[24px] rounded-[12px] transition-colors flex-none ${
        value ? 'bg-[#1D6B5F]' : 'bg-[#EAE5DE]'
      }`}
      aria-pressed={value}
    >
      <span
        className="absolute top-[2px] w-[20px] h-[20px] rounded-full bg-white shadow transition-all"
        style={{ left: value ? '20px' : '2px' }}
      />
    </button>
  )
}

export function PrivacyScreen({ onMenu, onSave, onTermsLink }) {
  const [toggles, setToggles] = useState(() => {
    const initial = {}
    TOGGLES.forEach(t => { initial[t.id] = t.defaultValue })
    return initial
  })

  function setToggle(id, value) {
    setToggles(prev => ({ ...prev, [id]: value }))
  }

  return (
    <AppScreen>

      <div className="absolute left-[22px] top-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-[54px]">
        Prywatność
      </h1>
      <p className="text-[13px] text-[#66716C] text-center leading-[16px] mt-2">
        Minimum danych, maksimum kontroli.
      </p>

      <div className="mx-6 mt-[41px] flex flex-col gap-[22px]">
        {TOGGLES.map(t => (
          <div key={t.id} className="bg-[#FFFCF7] border border-[#D9D0C5] rounded-[24px] px-6 py-5 flex items-center gap-4">
            <div className="flex-1">
              <p className="text-[16px] font-bold text-[#1F2523] leading-[20px]">
                {t.title}
              </p>
              <p className="text-[13px] text-[#66716C] leading-[16px] mt-2">
                {t.subtitle}
              </p>
            </div>
            <Toggle value={toggles[t.id]} onChange={v => setToggle(t.id, v)} />
          </div>
        ))}
      </div>

      <button
        onClick={onTermsLink}
        className="text-[13px] font-semibold text-[#1D6B5F] text-center mt-6"
      >
        Polityka prywatności
      </button>

      <div className="flex justify-center mt-[38px] mb-0">
        <ActionButton variant="primary" size="wide" onClick={() => onSave(toggles)}>
          Zapisz ustawienia
        </ActionButton>
      </div>

      <ScreenFooter />
    </AppScreen>
  )
}
