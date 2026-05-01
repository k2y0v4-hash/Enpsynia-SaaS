import { AppScreen, Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'
import { relativeDateLabel } from '@/hooks/useLocalStorage'

const DAY_TYPE_LABELS = {
  'Działania':    'Dzień działania',
  'Wyciszenia':   'Dzień wyciszenia',
  'Odbudowy':     'Dzień odbudowy',
  'Kontaktu':     'Dzień kontaktu',
  'Przeciążenia': 'Dzień przeciążenia',
}

export function HistoryScreen({ history, onMenu, onNewCheckIn }) {
  const isEmpty = history.length === 0

  return (
    <AppScreen>

      <div className="absolute left-[22px] top-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-[54px]">
        Historia
      </h1>
      <p className="text-[13px] text-[#66716C] text-center leading-[16px] mt-2">
        Ostatnie check-iny na tym urządzeniu.
      </p>

      {isEmpty ? (
        // Stan pusty — ekran 08b
        <div className="mx-6 mt-5 bg-[#FFFCF7] rounded-[12px] py-10 px-6 flex flex-col items-center">
          <div className="w-[84px] h-[84px] bg-[#F0EDE8] rounded-full flex items-center justify-center">
            <span className="text-[28px] text-[#D9D0C5]">○</span>
          </div>
          <p className="text-[15px] font-semibold text-[#1F2523] text-center leading-[22px] mt-6">
            Brak zapisanych check-inów.
          </p>
          <p className="text-[13px] text-[#66716C] text-center leading-[17px] mt-2">
            Wykonaj pierwszy check-in,<br />żeby tu zobaczyć historię.
          </p>
        </div>
      ) : (
        <div className="mx-6 mt-5 flex flex-col gap-[22px]">
          {history.map(entry => (
            <div key={entry.id} className="bg-[#FFFCF7] border border-[#D9D0C5] rounded-[24px] px-6 py-5">
              <div className="flex justify-between items-baseline">
                <span className="text-[13px] font-semibold text-[#1D6B5F] leading-[16px]">
                  {relativeDateLabel(entry.timestamp)}
                </span>
                <span className="text-[13px] font-semibold text-[#66716C] leading-[16px]">
                  {entry.score}/5
                </span>
              </div>
              <p className="text-[17px] font-bold text-[#1F2523] leading-[21px] mt-3">
                {DAY_TYPE_LABELS[entry.dayType] || entry.dayType}
              </p>
              <p className="text-[12px] text-[#66716C] leading-[15px] mt-2">
                Mikro-akcja: {entry.microactionTitle}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-[56px] mb-0">
        <ActionButton variant="primary" size="wide" onClick={onNewCheckIn}>
          Nowy check-in
        </ActionButton>
      </div>

      <ScreenFooter />
    </AppScreen>
  )
}
