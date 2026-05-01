import { useState } from 'react'
import { AppScreen, Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'
import { trackEvent } from '@/lib/analytics'

export function MicroActionScreen({ result, onReset, onMenu }) {
  const { microaction } = result
  const [feedback, setFeedback] = useState(null) // null | 'tak' | 'troche' | 'nie'

  function handleFeedback(value) {
    if (feedback !== null) return
    setFeedback(value)
    trackEvent('feedback_helpful', { value })
  }

  const feedbackOptions = [
    { key: 'tak',    label: 'Tak',    left: 'left-[18px]' },
    { key: 'troche', label: 'Trochę', left: 'left-[115px]' },
    { key: 'nie',    label: 'Nie',    left: 'left-[214px]' },
  ]

  return (
    <AppScreen>

      <div className="absolute left-[22px] top-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-[54px] px-6">
        Mikro-akcja
      </h1>

      {/* Karta z krokami */}
      <div className="absolute left-[24px] top-[118px] w-[342px] h-[344px] bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 pt-[32px]">
        <p className="text-[22px] font-bold text-[#1F2523] text-center leading-[28px] mb-8">
          {microaction.title}
        </p>

        <div className="flex flex-col gap-[38px]">
          {microaction.steps.map((step, i) => (
            <div key={i} className="flex gap-[10px]">
              <span className="text-[16px] font-bold text-[#1D6B5F] leading-[20px] w-[28px] flex-none text-left">
                {i + 1}.
              </span>
              <p className="text-[16px] font-semibold text-[#1F2523] leading-[20px]">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback lub "Nowy check-in" — zamiana po kliknięciu (D19) */}
      {feedback === null ? (
        <div className="absolute left-[24px] top-[512px] w-[342px]">
          <p className="text-[15px] font-semibold text-[#1F2523] text-center leading-[19px] mb-4">
            Czy ta propozycja była trafna?
          </p>
          <div className="relative h-[46px]">
            {feedbackOptions.map(({ key, label, left }) => (
              <button
                key={key}
                onClick={() => handleFeedback(key)}
                className={`absolute top-0 ${left} w-[113px] h-[46px] rounded-[23px] bg-[#FFFCF7] border border-[#D9D0C5] text-[#1D6B5F] text-[13px] font-semibold`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="absolute left-[72px] top-[548px]">
          <ActionButton size="wide" variant="primary" onClick={onReset}>
            Nowy check-in
          </ActionButton>
        </div>
      )}

      <ScreenFooter />
    </AppScreen>
  )
}
