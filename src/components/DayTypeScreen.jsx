import { useEffect } from 'react'
import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'
import { DAY_TYPES } from '@/utils/analysisLogic'
import { trackEvent } from '@/lib/analytics'

const DAY_META = {
  [DAY_TYPES.DZIALANIA]:    { label: 'Dzień działania' },
  [DAY_TYPES.WYCISZENIA]:   { label: 'Dzień wyciszenia' },
  [DAY_TYPES.ODBUDOWY]:     { label: 'Dzień odbudowy' },
  [DAY_TYPES.KONTAKTU]:     { label: 'Dzień kontaktu' },
  [DAY_TYPES.PRZECIAZENIA]: { label: 'Dzień przeciążenia' },
}

export function DayTypeScreen({ result, onNext, onMenu }) {
  const { dayType, justificationText, microaction } = result
  const meta = DAY_META[dayType]

  useEffect(() => {
    trackEvent('result_shown', { day_type: dayType })
  }, [dayType])

  return (
    <div className="relative min-h-svh bg-[#F7F4EF] flex flex-col">

      <div className="absolute left-[22px] top-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-[54px] px-6">
        Twój typ dnia:
      </h1>

      {/* Karta wyniku */}
      <div className="mx-6 mt-[41px] bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 pt-11 pb-10">
        {/* Nazwa typu dnia */}
        <p className="text-[30px] font-bold text-[#1F2523] text-center leading-[38px]">
          {meta.label}
        </p>

        {/* Uzasadnienie */}
        <p className="text-[15px] text-[#66716C] text-center leading-[20px] mt-4 mx-2">
          {justificationText}
        </p>

        {/* Teaser mikroakcji */}
        <div
          className="rounded-[18px] px-5 py-[18px] mt-8 mx-2"
          style={{ backgroundColor: '#DDEDE8' }}
        >
          <p className="text-[14px] font-semibold text-[#1D6B5F] text-center leading-[18px]">
            Mikro-akcja: {microaction.title}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-[84px] mb-0">
        <ActionButton size="wide" variant="primary" onClick={onNext}>
          Zobacz mikro-akcję
        </ActionButton>
      </div>

      <div className="flex-1 min-h-[32px]" />
      <ScreenFooter />
    </div>
  )
}
