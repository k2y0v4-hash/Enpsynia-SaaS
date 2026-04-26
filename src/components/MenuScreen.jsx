import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

const MENU_ITEMS = [
  { id: 'login',       title: 'Logowanie',          subtitle: 'dostęp do konta i synchronizacji', stage2: true },
  { id: 'history',     title: 'Historia',           subtitle: 'ostatnie zapisane check-iny' },
  { id: 'about',       title: 'O projekcie',        subtitle: 'krótki opis działania aplikacji' },
  { id: 'suggestions', title: 'Sugestie dla autora', subtitle: 'formularz opinii o aplikacji' },
  { id: 'privacy',     title: 'Prywatność',         subtitle: 'ustawienia danych i przypomnień' },
]

export function MenuScreen({ onSelect, onBack }) {
  return (
    <div className="min-h-svh bg-[#F7F4EF] flex flex-col">

      <div className="px-[22px] pt-[18px]">
        <Hamburger onClick={onBack} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-3">
        Menu
      </h1>
      <p className="text-[13px] text-[#66716C] text-center leading-[16px] mt-2">
        Wybierz sekcję aplikacji.
      </p>

      <div className="mx-6 mt-5 flex flex-col gap-[16px]">
        {MENU_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={item.stage2 ? undefined : () => onSelect(item.id)}
            disabled={item.stage2}
            className="bg-[#FFFCF7] border border-[#D9D0C5] rounded-[22px] h-[60px] px-6 flex items-center justify-between text-left disabled:opacity-50"
          >
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-[#1F2523] leading-[19px]">
                {item.title}
              </p>
              <p className="text-[11px] text-[#66716C] leading-[14px] mt-1">
                {item.subtitle}
              </p>
            </div>
            <span className="text-[18px] font-semibold text-[#66716C] leading-[23px] ml-3">›</span>
          </button>
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex justify-center mb-6">
        <ActionButton variant="outline" size="wide" onClick={onBack}>
          Wróć
        </ActionButton>
      </div>

      <ScreenFooter />
    </div>
  )
}
