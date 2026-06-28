import { AppScreen, Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

// Ekran widoczny podczas zapisu check-inu zalogowanego użytkownika do Supabase.
export function SavingScreen({ onMenu }) {
  return (
    <AppScreen>
      <div className="absolute left-[22px] top-[18px]">
        <Hamburger onClick={onMenu} />
      </div>
      <div className="flex flex-col items-center justify-center mt-[300px] px-8">
        <p className="text-[17px] font-semibold text-[#1F2523] text-center leading-[22px]">
          Zapisuję check-in…
        </p>
        <p className="text-[13px] text-[#66716C] text-center leading-[18px] mt-2">
          Chwila — zapisujemy go na Twoim koncie.
        </p>
      </div>
      <ScreenFooter />
    </AppScreen>
  )
}

// Ekran błędu zapisu do Supabase. Decyzja właściciela: nie udawać sukcesu,
// nie zapisywać po cichu do localStorage. Dajemy ponowienie albo świadome
// przejście do wyniku BEZ zapisu (jasno zakomunikowane).
export function SaveErrorScreen({ message, onRetry, onContinueWithoutSave, onMenu }) {
  return (
    <AppScreen>
      <div className="absolute left-[22px] top-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-[54px] px-6">
        Nie udało się zapisać
      </h1>
      <p className="text-[13px] text-[#66716C] text-center leading-[18px] mt-3 px-8">
        Twój check-in <span className="font-semibold">nie został zapisany</span> na koncie.
        {message ? ` (${message})` : ''}
      </p>

      <div className="mx-6 mt-8 flex flex-col items-center gap-3">
        <ActionButton variant="primary" size="wide" onClick={onRetry}>
          Spróbuj ponownie
        </ActionButton>
        <ActionButton variant="outline" size="wide" onClick={onContinueWithoutSave}>
          Zobacz wynik bez zapisu
        </ActionButton>
      </div>

      <ScreenFooter />
    </AppScreen>
  )
}
