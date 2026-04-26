import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

export function TermsScreen({ onMenu, onBackToPrivacy, onNewCheckIn }) {
  return (
    <div className="min-h-svh bg-[#F7F4EF] flex flex-col">

      <div className="px-[22px] pt-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-3 px-6">
        Regulamin i polityka prywatności
      </h1>

      <div className="mx-6 mt-5 bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 py-5">
        <h2 className="text-[15px] font-semibold text-[#1F2523] text-center leading-[19px]">
          Regulamin — zasady korzystania
        </h2>
        <p className="text-[12px] text-[#66716C] text-center leading-[16px] mt-3">
          Korzystasz z aplikacji na własną odpowiedzialność. Wyniki nie są diagnozą medyczną ani podstawą do decyzji terapeutycznych. Dzięki kontu możesz mieć dostęp do historii swoich check-inów.
        </p>
        <p className="text-[12px] text-[#66716C] text-center leading-[16px] mt-3">
          Korzystamy z Google Analytics aby udoskonalać aplikację.
        </p>

        <h2 className="text-[15px] font-semibold text-[#1F2523] text-center leading-[19px] mt-6">
          Czego nie robimy?
        </h2>
        <p className="text-[12px] text-[#66716C] text-center leading-[16px] mt-3">
          Nie gromadzimy danych osobowych, nie wykorzystujemy Twojej historii.
        </p>

        <h2 className="text-[15px] font-semibold text-[#1F2523] text-center leading-[19px] mt-6">
          Kontrola
        </h2>
        <p className="text-[12px] text-[#66716C] text-center leading-[16px] mt-3">
          Możesz korzystać bez konta oraz wyłączyć historię lub analitykę (cookies).
        </p>
      </div>

      <button
        onClick={onBackToPrivacy}
        className="text-[13px] font-semibold text-[#1D6B5F] text-center mt-5"
      >
        Wróć do ustawień prywatności
      </button>

      <div className="flex-1" />

      <div className="flex justify-center mb-6">
        <ActionButton variant="primary" size="wide" onClick={onNewCheckIn}>
          Nowy check-in
        </ActionButton>
      </div>

      <ScreenFooter />
    </div>
  )
}
