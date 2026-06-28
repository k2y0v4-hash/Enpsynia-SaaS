import { AppScreen, Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

// Jednorazowa, nieblokująca propozycja konta po 2. anonimowym check-inie (decyzja właściciela D7).
// Bez paywalla, bez blokowania kolejnego check-inu, bez sugerowania, że konto jest obowiązkowe.
// Każde z trzech działań zamyka propozycję (App zapisuje decyzję lokalnie).
const BENEFITS = [
  'Zachowasz historię poza tą przeglądarką.',
  'Skorzystasz z historii na innym urządzeniu.',
  'Nie stracisz zapisów po wyczyszczeniu danych przeglądarki.',
]

export function AccountPromptScreen({ onCreateAccount, onSignIn, onNotNow, onMenu }) {
  return (
    <AppScreen>
      <div className="absolute left-[22px] top-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-[54px] px-6">
        Chcesz zachować swoje check-iny?
      </h1>
      <p className="text-[13px] text-[#66716C] text-center leading-[18px] mt-3 px-8">
        Konto jest opcjonalne — możesz dalej korzystać z aplikacji bez logowania.
        Twoje dotychczasowe check-iny zostają na tym urządzeniu.
      </p>

      <div className="mx-6 mt-6 bg-[#FFFCF7] border border-[#D9D0C5] rounded-[24px] px-6 py-5 flex flex-col gap-3">
        {BENEFITS.map((b, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-[15px] font-bold text-[#1D6B5F] leading-[20px]">✓</span>
            <p className="text-[14px] text-[#1F2523] leading-[20px]">{b}</p>
          </div>
        ))}
      </div>

      <div className="mx-6 mt-7 flex flex-col items-center gap-3">
        <ActionButton variant="primary" size="wide" onClick={onCreateAccount}>
          Utwórz konto
        </ActionButton>
        <ActionButton variant="outline" size="wide" onClick={onSignIn}>
          Zaloguj się
        </ActionButton>
        <button onClick={onNotNow} className="text-[13px] font-semibold text-[#66716C] mt-1">
          Nie teraz
        </button>
      </div>

      <ScreenFooter />
    </AppScreen>
  )
}
