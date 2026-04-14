import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ProgressBar'

// Kolejność i brzmienie per 04-mvp-scope.md
const QUESTIONS = [
  {
    id: 'energy',
    text: 'Poziom energii',
    leftLabel: 'wyczerpany',
    rightLabel: 'pełen energii',
  },
  {
    id: 'overload',
    text: 'Przeciążenie bodźcami',
    leftLabel: 'spokojnie',
    rightLabel: 'przebodźcowany',
  },
  {
    id: 'movement',
    text: 'Potrzeba ruchu vs odpoczynku',
    leftLabel: 'potrzebuję odpocząć',
    rightLabel: 'potrzebuję ruchu',
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
  {
    id: 'paralysis',
    text: 'Utknięcie w analizie',
    leftLabel: 'działam',
    rightLabel: 'myślę bez końca',
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

export function CheckInForm({ onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(DEFAULT_ANSWERS)

  const question = QUESTIONS[step]
  const value = answers[question.id]
  const isLast = step === QUESTIONS.length - 1

  function handleChange(e) {
    setAnswers(prev => ({ ...prev, [question.id]: Number(e.target.value) }))
  }

  function handleNext() {
    if (isLast) {
      onComplete(answers)
    } else {
      setStep(s => s + 1)
    }
  }

  function handleBack() {
    setStep(s => s - 1)
  }

  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      <div className="mb-8">
        <ProgressBar current={step + 1} total={QUESTIONS.length} />
      </div>

      <div className="flex flex-1 flex-col justify-center space-y-10">
        <h2 className="text-center text-2xl font-bold leading-tight">
          {question.text}
        </h2>

        <div className="space-y-3">
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={value}
            onChange={handleChange}
            className="w-full cursor-pointer accent-primary"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="max-w-[35%]">{question.leftLabel}</span>
            <span className="text-base font-semibold text-foreground">{value}</span>
            <span className="max-w-[35%] text-right">{question.rightLabel}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        {step > 0 && (
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
