import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

// Ekran 01 — Landing zgodny z Figmą.
// Stan „cookies" (ekran zero) = pierwsze wejście, gdy `consentPending`:
//   - karta główna z disabled CTA (#D9D0C5 bg, #66716C text)
//   - karta cookies poniżej z Odrzucam / Akceptuję
//   - hamburger widoczny, ale disabled
// Po decyzji: karta cookies znika, CTA aktywny (teal), hamburger aktywny.
export function Landing({ onStart, consentPending, onAccept, onReject, onTerms, onMenu }) {
  return (
    <div className="relative min-h-svh bg-[#F7F4EF] flex flex-col">

      <div className="absolute left-[22px] top-[18px]">
        <Hamburger disabled={consentPending} onClick={onMenu} />
      </div>

      {/* Karta główna */}
      <div className="mx-6 mt-[88px] bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 pt-10 pb-10">
        <h1 className="text-[29px] font-bold text-[#1F2523] text-center leading-[36px]">
          Enpsyneia Check-In
        </h1>
        <p className="text-[16px] text-[#66716C] text-center leading-[20px] mt-4 mx-2">
          Zatrzymaj się na chwilę, nazwij aktualny stan i wybierz następny mały krok.
        </p>
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

      {/* Karta cookies — widoczna tylko gdy brak decyzji (ekran zero) */}
      {consentPending && (
        <div className="mx-6 mt-[34px] bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 pt-5 pb-6">
          <h2 className="text-[17px] font-bold text-[#1F2523] text-center leading-[21px]">
            Cookies
          </h2>
          <p className="text-[12px] text-[#66716C] text-center leading-[16px] mt-1 mx-4">
            Używamy cookies do ustawień i poprawy działania aplikacji.
          </p>
          <p className="text-center mt-2">
            <button
              onClick={onTerms}
              className="text-[12px] font-semibold text-[#1D6B5F]"
            >
              Polityka prywatności
            </button>
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

      <div className="flex-1 min-h-[32px]" />
      <ScreenFooter />
    </div>
  )
}
