import { useState } from 'react'
import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

// Kolory per pytanie (ux-specification.md sekcja 5.3)
const QUESTION_COLORS = {
  energy:    { active: '#1D6B5F', track: '#DDEDE8' },
  overload:  { active: '#2D6F8F', track: '#E2EDF3' },
  paralysis: { active: '#7A6A43', track: '#EDE7D8' },
  movement:  { active: '#6F7D3B', track: '#E8ECD8' },
  social:    { active: '#A0674E', track: '#F0E2D9' },
  agency:    { active: '#7156A3', track: '#E8E0F2' },
}

const BLOCKS = [
  {
    questions: [
      { id: 'energy',    text: 'Energia',                 leftLabel: 'wyczerpany',       rightLabel: 'pełen energii' },
      { id: 'overload',  text: 'Przeciążenie bodźcami',   leftLabel: 'przebodźcowany',   rightLabel: 'wyciszenie' },
      { id: 'paralysis', text: 'Utknięcie w analizie',    leftLabel: 'myślę bez końca',  rightLabel: 'działam' },
    ],
  },
  {
    questions: [
      { id: 'movement', text: 'Potrzeba ruchu',    leftLabel: 'potrzebuję odpocząć', rightLabel: 'chcę ruchu' },
      { id: 'social',   text: 'Potrzeba kontaktu', leftLabel: 'chcę samotności',     rightLabel: 'chcę kontaktu' },
      { id: 'agency',   text: 'Sprawczość',        leftLabel: 'nic nie mogę',        rightLabel: 'mogę wszystko' },
    ],
  },
]

const DEFAULT_VALUES  = { energy: 3, overload: 3, paralysis: 3, movement: 3, social: 3, agency: 3 }
const DEFAULT_TOUCHED = { energy: false, overload: false, paralysis: false, movement: false, social: false, agency: false }

function fillPercent(value) {
  return ((value - 1) / 4) * 100
}

function SliderQuestion({ question, value, touched, onChange }) {
  const { active, track } = QUESTION_COLORS[question.id]
  const pct = fillPercent(value)

  // Nieruszony → szary track; ruszony → kolor aktywny + tło tracka (D21)
  const trackStyle = touched
    ? { background: `linear-gradient(to right, ${active} ${pct}%, ${track} ${pct}%)` }
    : { background: '#D9D0C5' }

  return (
    <div>
      <p className="text-[15px] font-semibold text-[#1F2523] text-center leading-[19px] mb-4">
        {question.text}
      </p>
      <div className="px-0">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={e => onChange(question.id, Number(e.target.value))}
          className="w-full"
          style={{ '--thumb-color': active, ...trackStyle }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[11px] text-[#66716C] leading-[14px] max-w-[48%]">
          {question.leftLabel}
        </span>
        <span className="text-[11px] text-[#66716C] leading-[14px] text-right max-w-[48%]">
          {question.rightLabel}
        </span>
      </div>
    </div>
  )
}

export function CheckInForm({ onComplete, onInsufficientAnswers }) {
  const [block, setBlock]   = useState(0)
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [touched, setTouched] = useState(DEFAULT_TOUCHED)

  const currentBlock = BLOCKS[block]
  const isLast = block === BLOCKS.length - 1

  function handleChange(id, value) {
    setValues(prev  => ({ ...prev,  [id]: value }))
    setTouched(prev => ({ ...prev,  [id]: true  }))
  }

  function countTouched() {
    return Object.values(touched).filter(Boolean).length
  }

  function handleNext() {
    if (isLast) {
      countTouched() < 3
        ? onInsufficientAnswers(values, touched)
        : onComplete(values)
    } else {
      setBlock(b => b + 1)
    }
  }

  function handleBack() {
    setBlock(b => b - 1)
  }

  return (
    <div className="min-h-svh bg-[#F7F4EF] flex flex-col">

      {/* Hamburger */}
      <div className="px-[22px] pt-[18px]">
        <Hamburger />
      </div>

      {/* Tytuł */}
      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-3 px-6">
        Check-in
      </h1>

      {/* Podtytuł */}
      <p className="text-[13px] text-[#66716C] text-center leading-[17px] mt-2 px-6">
        Oceń swój stan przesuwając suwak.
      </p>

      {/* Suwaki */}
      <div className="px-[30px] mt-6 flex flex-col gap-[64px] flex-1">
        {currentBlock.questions.map(question => (
          <SliderQuestion
            key={question.id}
            question={question}
            value={values[question.id]}
            touched={touched[question.id]}
            onChange={handleChange}
          />
        ))}
      </div>

      {/* Przyciski akcji */}
      <div className={`flex mt-10 mb-6 ${block > 0 ? 'justify-between px-[42px]' : 'justify-end pr-[39px]'}`}>
        {block > 0 && (
          <ActionButton variant="outline" size="small" onClick={handleBack}>
            Wstecz
          </ActionButton>
        )}
        <ActionButton variant="primary" size="small" onClick={handleNext}>
          {isLast ? 'Wynik' : 'Dalej'}
        </ActionButton>
      </div>

      <ScreenFooter />
    </div>
  )
}
