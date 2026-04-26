import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

// Ekran 0 — bramka cookies przed wejściem do aplikacji
// Decyzja produktowa (poza Figmą): cookies jako osobny ekran zamiast karty na Landing
export function CookiesScreen({ onAccept, onReject, onTerms }) {
  return (
    <div className="min-h-svh bg-[#F7F4EF] flex flex-col">

      {/* Hamburger widoczny, ale disabled — brak nawigacji do podjęcia decyzji */}
      <div className="px-[22px] pt-[18px]">
        <Hamburger disabled />
      </div>

      <div className="flex-1 flex items-center">
        <div className="w-full mx-6 bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 pt-5 pb-6">
          <h1 className="text-[17px] font-bold text-[#1F2523] text-center leading-[21px]">
            Cookies
          </h1>
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
      </div>

      <ScreenFooter />
    </div>
  )
}
