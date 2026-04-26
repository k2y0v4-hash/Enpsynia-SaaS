import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

export function Landing({ onStart, onMenu }) {
  return (
    <div className="min-h-svh bg-[#F7F4EF] flex flex-col">

      <div className="px-[22px] pt-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <div className="mx-6 mt-[52px] bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 pt-10 pb-10">
        <h1 className="text-[29px] font-bold text-[#1F2523] text-center leading-[36px]">
          Enpsyneia Check-In
        </h1>
        <p className="text-[16px] text-[#66716C] text-center leading-[20px] mt-4 mx-2">
          Zatrzymaj się na chwilę, nazwij aktualny stan i wybierz następny mały krok.
        </p>
        <div className="flex justify-center mt-8">
          <ActionButton size="wide" variant="primary" onClick={onStart}>
            Zacznij check-in
          </ActionButton>
        </div>
      </div>

      <div className="flex-1" />
      <ScreenFooter />
    </div>
  )
}
