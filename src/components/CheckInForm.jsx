import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ProgressBar'

// Kolejność i brzmienie per docs/product/mvp-scope.md
// Grupowanie per docs/ui/screens.md — Ekran 2
const BLOCKS = [
  {
    label: 'Blok 1',
    questions: [
      {
        id: 'energy',
        text: 'Poziom energii',
        leftLabel: 'wyczerpany',
        rightLabel: 'pełen energii',
        helpText: 'Chodzi o energię fizyczną i umysłową — nie o nastrój ani motywację.',
      },
      {
        id: 'overload',
        text: 'Przeciążenie bodźcami',
        leftLabel: 'spokojnie',
        rightLabel: 'przebodźcowany',
        helpText: 'Ile rzeczy na ciebie działa: dźwięki, ekrany, rozmowy, decyzje, wiadomości.',
      },
      {
        id: 'paralysis',
        text: 'Utknięcie w analizie',
        leftLabel: 'działam',
        rightLabel: 'myślę bez końca',
        helpText: 'Czy działasz i decydujesz, czy kręcisz się w kółko w głowie bez decyzji?',
      },
    ],
  },
  {
    label: 'Blok 2',
    questions: [
      {
        id: 'movement',
        text: 'Potrzeba ruchu vs odpoczynku',
        leftLabel: 'potrzebuję odpocząć',
        rightLabel: 'potrzebuję ruchu',
        helpText: 'Czy ciało prosi teraz o aktywność fizyczną, czy raczej o spokój i bezruch?',
      },
      {
        id: 'social',
        text: 'Potrzeba samotności vs kontaktu',
        leftLabel: 'chcę być sam',
        rightLabel: 'chcę być z ludźmi',
        helpText: 'Chodzi o kontakt z ludźmi — nie o pracę ani obowiązki zawodowe.',
      },
      {
        id: 'agency',
        text: 'Poczucie sprawczości',
        leftLabel: 'nic nie mogę',
        rightLabel: 'mogę wszystko',
        helpText: 'Czy masz teraz poczucie, że możesz coś realnie zrobić i na coś wpłynąć?',
      },
    ],
  },
]

const DEFAULT_ANSWERS = {
  energy: 3,
  overload: 3,
  movement: 3,
  social: 3,
  agency: 3,
  paralysis: 3,
}

// Przelicza wartość (1–5) na procent wypełnienia tracka (0–100%)
function fillPercent(value) {
  return ((value - 1) / 4) * 100
}

function SliderQuestion({ question, value, onChange }) {
  const pct = fillPercent(value)
  const trackStyle = {
    background: `linear-gradient(to right, var(--primary) ${pct}%, #e2e2e2 ${pct}%)`,
  }

  // Pozycje markerów dla wartości 1–5
  const markers = [0, 25, 50, 75, 100]

  return (
    <div className="space-y-2">
      <div>
        <p className="text-base font-semibold leading-snug">{question.text}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{question.helpText}</p>
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
            style={trackStyle}
          />
          {/* Markery skali — 5 subtelnych kresek */}
          <div className="relative mt-0.5 flex justify-between px-[11px]">
            {markers.map(pos => (
              <span
                key={pos}
                className="h-1 w-px bg-border"
                aria-hidden="true"
              />
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

export function CheckInForm({ onComplete }) {
  const [block, setBlock] = useState(0)
  const [answers, setAnswers] = useState(DEFAULT_ANSWERS)

  const currentBlock = BLOCKS[block]
  const isLast = block === BLOCKS.length - 1

  function handleChange(id, value) {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  function handleNext() {
    if (isLast) {
      onComplete(answers)
    } else {
      setBlock(b => b + 1)
    }
  }

  function handleBack() {
    setBlock(b => b - 1)
  }

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      <div className="mb-8">
        <ProgressBar current={block + 1} total={BLOCKS.length} />
      </div>

      <div className="flex flex-1 flex-col space-y-8">
        {currentBlock.questions.map(question => (
          <SliderQuestion
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={handleChange}
          />
        ))}
      </div>

      <div className="mt-10 flex gap-3">
        {block > 0 && (
          <Button variant="outline" className="flex-1" onClick={handleBack}>
            Wstecz
          </Button>
        )}
        <Button className="flex-1" onClick={handleNext}>
          {isLast ? 'Zobacz wynik' : 'Dalej'}
        </Button>
      </div>
    </main>
  )
}
