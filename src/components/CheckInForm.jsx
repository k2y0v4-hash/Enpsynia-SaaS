import { useState } from 'react'
import { Button } from '@/components/ui/button'

// Kolory per pytanie (docs/product/ux-specification.md sekcja 5.3)
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
      {
        id: 'energy',
        text: 'Poziom energii',
        leftLabel: 'wyczerpany',
        rightLabel: 'pełen energii',
      },
      {
        id: 'overload',
        text: 'Przeciążenie bodźcami',
        leftLabel: 'przebodźcowany',
        rightLabel: 'wyciszenie',
      },
      {
        id: 'paralysis',
        text: 'Utknięcie w analizie',
        leftLabel: 'myślę bez końca',
        rightLabel: 'działam',
      },
    ],
  },
  {
    questions: [
      {
        id: 'movement',
        text: 'Potrzeba ruchu vs odpoczynku',
        leftLabel: 'potrzebuję odpocząć',
        rightLabel: 'chcę ruchu',
      },
      {
        id: 'social',
        text: 'Potrzeba samotności vs kontaktu',
        leftLabel: 'chcę być sam',
        rightLabel: 'chcę być z ludźmi',
      },
      {
        id: 'agency',
        text: 'Poczucie sprawczości',
        leftLabel: 'nic nie mogę',
        rightLabel: 'mogę wszystko',
      },
    ],
  },
]

const DEFAULT_VALUES = {
  energy: 3, overload: 3, paralysis: 3,
  movement: 3, social: 3, agency: 3,
}

const DEFAULT_TOUCHED = {
  energy: false, overload: false, paralysis: false,
  movement: false, social: false, agency: false,
}

const HELP_TEXT = 'Oceń swój stan przesuwając suwak.'

function fillPercent(value) {
  return ((value - 1) / 4) * 100
}

function SliderQuestion({ question, value, touched, onChange }) {
  const colors = QUESTION_COLORS[question.id]
  const pct = fillPercent(value)

  // Nieruszony: tylko szary track; ruszony: kolor aktywny + tło tracka (D21)
  const trackStyle = touched
    ? { background: `linear-gradient(to right, ${colors.active} ${pct}%, ${colors.track} ${pct}%)` }
    : { background: '#D9D0C5' }

  const markers = [0, 25, 50, 75, 100]

  return (
    <div className="space-y-2">
      <div>
        <p className="text-base font-semibold leading-snug">{question.text}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{HELP_TEXT}</p>
      </div>

      <div className="space-y-1.5 pt-1">
        <div className="relative">
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={value}
            onChange={e => onChange(question.id, Number(e.target.value))}
            className="w-full"
            style={{ '--thumb-color': colors.active, ...trackStyle }}
          />
          <div className="relative mt-0.5 flex justify-between px-[11px]">
            {markers.map(pos => (
              <span key={pos} className="h-1 w-px bg-border" aria-hidden="true" />
            ))}
          </div>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="max-w-[42%] leading-tight">{question.leftLabel}</span>
          <span className="max-w-[42%] text-right leading-tight">{question.rightLabel}</span>
        </div>
      </div>
    </div>
  )
}

export function CheckInForm({ onComplete, onInsufficientAnswers }) {
  const [block, setBlock] = useState(0)
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [touched, setTouched] = useState(DEFAULT_TOUCHED)

  const currentBlock = BLOCKS[block]
  const isLast = block === BLOCKS.length - 1

  function handleChange(id, value) {
    setValues(prev => ({ ...prev, [id]: value }))
    setTouched(prev => ({ ...prev, [id]: true }))
  }

  function countTouched() {
    return Object.values(touched).filter(Boolean).length
  }

  function handleNext() {
    if (isLast) {
      if (countTouched() < 3) {
        onInsufficientAnswers(values, touched)
      } else {
        onComplete(values)
      }
    } else {
      setBlock(b => b + 1)
    }
  }

  function handleBack() {
    setBlock(b => b - 1)
  }

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      <div className="flex flex-col space-y-8 pb-28">
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

      <div className="sticky bottom-0 bg-background pt-3 pb-6 flex gap-3">
        {block > 0 && (
          <Button variant="outline" className="flex-1" onClick={handleBack}>
            Wstecz
          </Button>
        )}
        <Button className="flex-1" onClick={handleNext}>
          {isLast ? 'Wynik' : 'Dalej'}
        </Button>
      </div>
    </main>
  )
}
