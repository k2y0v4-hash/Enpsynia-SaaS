import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

const QUESTION_LABELS = {
  energy:    'Energia',
  overload:  'Przeciążenie bodźcami',
  paralysis: 'Utknięcie w analizie',
  movement:  'Potrzeba ruchu',
  social:    'Potrzeba kontaktu',
  agency:    'Sprawczość',
}
const QUESTION_ORDER = ['energy', 'overload', 'paralysis', 'movement', 'social', 'agency']

export function MissingAnswersScreen({ values, touched, onBack, onContinue }) {
  return (
    <div className="min-h-svh bg-[#F7F4EF] flex flex-col">

      <div className="px-[22px] pt-[18px]">
        <Hamburger />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-3 px-6">
        Brakuje odpowiedzi
      </h1>

      <div className="mx-6 mt-5 flex flex-col gap-3 flex-1">
        {/* Karta z listą pytań */}
        <div className="bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 pt-6 pb-6">
          <h2 className="text-[20px] font-bold text-[#1F2523] text-center leading-[25px] mb-4">
            Twój obraz na teraz
          </h2>
          {QUESTION_ORDER.map(id => (
            <div key={id} className="flex justify-between items-baseline py-[9px]">
              <span className="text-[14px] text-[#66716C] leading-[18px]">
                {QUESTION_LABELS[id]}
              </span>
              <span
                className="text-[14px] font-semibold leading-[18px]"
                style={{ color: touched[id] ? '#1F2523' : '#A66A2C' }}
              >
                {touched[id] ? `${values[id]}/5` : 'brak'}
              </span>
            </div>
          ))}
        </div>

        {/* Amber warning box */}
        <div className="border border-[#E7D3B0] rounded-[22px] px-6 py-5" style={{ backgroundColor: '#FFF7E8' }}>
          <p className="text-[15px] font-semibold text-[#A66A2C] text-center leading-[19px]">
            Zaznacz jeszcze kilka suwaków, żeby wynik był bardziej trafny.
          </p>
          <p className="text-[13px] text-[#66716C] text-center leading-[17px] mt-2">
            Wynik będzie mniej pewny, jeśli przejdziesz dalej.
          </p>
        </div>
      </div>

      {/* Przyciski */}
      <div className="flex justify-between px-[42px] mt-10 mb-6">
        <ActionButton variant="outline" size="small" onClick={onBack}>
          Wróć
        </ActionButton>
        <ActionButton variant="primary" size="small" onClick={onContinue}>
          Wynik
        </ActionButton>
      </div>

      <ScreenFooter />
    </div>
  )
}
