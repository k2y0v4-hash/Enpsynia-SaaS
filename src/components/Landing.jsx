import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

export function Landing({ onStart, streak = 0, consentPending, onAccept, onReject }) {
  return (
    <div className="min-h-svh bg-[#F7F4EF] flex flex-col">

      {/* Hamburger — disabled przed decyzją cookies */}
      <div className="px-[22px] pt-[18px]">
        <Hamburger disabled={consentPending} />
      </div>

      {/* Główna karta */}
      <div className="mx-6 mt-[52px] bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 pt-10 pb-10">
        <h1 className="text-[29px] font-bold text-[#1F2523] text-center leading-[36px]">
          Enpsyneia Check-In
        </h1>
        <p className="text-[16px] text-[#66716C] text-center leading-[20px] mt-4 mx-2">
          Zatrzymaj się na chwilę, nazwij aktualny stan i wybierz następny mały krok.
        </p>
        {streak > 0 && (
          <p className="text-[14px] text-[#1F2523] text-center font-medium mt-4">
            🔥 {streak} {streak === 1 ? 'dzień' : 'dni'} z rzędu
          </p>
        )}
        <div className="flex justify-center mt-8">
          <ActionButton
            size="wide"
            variant="primary"
            disabled={consentPending}
            onClick={onStart}
          >
            Zacznij check-in
          </ActionButton>
        </div>
      </div>

      {/* Karta cookies — widoczna tylko gdy brak decyzji */}
      {consentPending && (
        <div className="mx-6 mt-[34px] bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 pt-5 pb-6">
          <h2 className="text-[17px] font-bold text-[#1F2523] text-center leading-[21px]">
            Cookies
          </h2>
          <p className="text-[12px] text-[#66716C] text-center leading-[16px] mt-1 mx-4">
            Używamy cookies do ustawień i poprawy działania aplikacji.
          </p>
          <p className="text-center mt-2">
            <a
              href="#"
              onClick={e => e.preventDefault()}
              className="text-[12px] font-semibold text-[#1D6B5F]"
            >
              Polityka prywatności
            </a>
          </p>
          <div className="flex justify-between mt-5">
            <ActionButton variant="outline" size="small" onClick={onReject}>
              Odrzucam
            </ActionButton>
            <ActionButton variant="primary" size="small" onClick={onAccept}>
              Akceptuję
            </ActionButton>
          </div>
        </div>
      )}

      <div className="flex-1" />
      <ScreenFooter />
    </div>
  )
}
