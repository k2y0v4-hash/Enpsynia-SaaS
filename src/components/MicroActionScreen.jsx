import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'

// Stany przycisku feedbacku: 'idle' | 'active' | 'dimmed'
function FeedbackButton({ label, state, onClick }) {
  const base = 'flex-1 rounded-xl border py-3 text-sm font-medium transition-colors'
  const styles = {
    idle:   'border-border hover:border-primary/50 text-foreground',
    active: 'border-primary bg-primary text-primary-foreground',
    dimmed: 'border-border text-muted-foreground opacity-40 cursor-default',
  }
  return (
    <button
      onClick={state === 'idle' ? onClick : undefined}
      disabled={state === 'dimmed'}
      className={`${base} ${styles[state]}`}
    >
      {label}
    </button>
  )
}

export function MicroActionScreen({ result, onReset }) {
  const { microaction } = result
  const [feedback, setFeedback] = useState(null) // null | 'tak' | 'troche' | 'nie'

  function handleFeedback(value) {
    if (feedback !== null) return
    setFeedback(value)
    trackEvent('feedback_helpful', { value })
  }

  function handleReset() {
    setFeedback(null)
    onReset()
  }

  const feedbackOptions = [
    { key: 'tak',    label: 'Tak' },
    { key: 'troche', label: 'Trochę' },
    { key: 'nie',    label: 'Nie' },
  ]

  return (
    <main className="flex min-h-screen flex-col px-6 py-10">
      <div className="mx-auto w-full max-w-sm flex flex-col space-y-6 pb-28">
        <h1 className="text-xl font-bold leading-tight tracking-tight">
          {microaction.title}
        </h1>

        <ol className="space-y-3">
          {microaction.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-none w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-foreground">{step}</p>
            </li>
          ))}
        </ol>

        <div className="space-y-2 pt-2">
          <p className="text-xs text-muted-foreground text-center">Czy to pomogło?</p>
          <div className="flex gap-2">
            {feedbackOptions.map(({ key, label }) => (
              <FeedbackButton
                key={key}
                label={label}
                state={
                  feedback === null ? 'idle'
                  : feedback === key ? 'active'
                  : 'dimmed'
                }
                onClick={() => handleFeedback(key)}
              />
            ))}
          </div>
        </div>

        {/* Przycisk „Nowy check-in" pojawia się dynamicznie po feedbacku (D19) */}
        {feedback !== null && (
          <Button className="w-full" onClick={handleReset}>
            Nowy check-in
          </Button>
        )}
      </div>
    </main>
  )
}
