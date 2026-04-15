import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DAY_TYPES } from '@/utils/analysisLogic'

// Metadane wyświetlania typów dnia — emoji i etykieta
const DAY_META = {
  [DAY_TYPES.DZIALANIA]:    { emoji: '⚡', label: 'Dzień Działania' },
  [DAY_TYPES.WYCISZENIA]:   { emoji: '🌿', label: 'Dzień Wyciszenia' },
  [DAY_TYPES.ODBUDOWY]:     { emoji: '🌱', label: 'Dzień Odbudowy' },
  [DAY_TYPES.KONTAKTU]:     { emoji: '🤝', label: 'Dzień Kontaktu' },
  [DAY_TYPES.PRZECIAZENIA]: { emoji: '🌀', label: 'Dzień Przeciążenia' },
}

// GA4 — bezpieczna funkcja, nie rzuca błędem gdy gtag niedostępny
function trackEvent(name, params) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

// Odczyt streaka z localStorage — zwraca 0 jeśli brak lub błąd
function readStreak() {
  try {
    const raw = localStorage.getItem('enpsyneia_streak')
    if (!raw) return 0
    const data = JSON.parse(raw)
    return data?.currentStreak ?? 0
  } catch {
    return 0
  }
}

export function ResultScreen({ result, onReset }) {
  const { dayType, summaryText, justificationText, microaction } = result
  const meta = DAY_META[dayType]
  const streak = readStreak()

  // null = brak odpowiedzi | 'up' = pomogło | 'down' = nie pomogło
  const [feedback, setFeedback] = useState(null)

  // GA4: result_shown przy pierwszym renderze
  useEffect(() => {
    trackEvent('result_shown', { day_type: dayType })
  }, [dayType])

  function handleFeedback(helpful) {
    if (feedback !== null) return
    const value = helpful ? 'up' : 'down'
    setFeedback(value)
    trackEvent('feedback_helpful', { helpful })
  }

  function handleReset() {
    setFeedback(null)
    onReset()
  }

  return (
    <main className="flex min-h-screen flex-col px-6 py-10">
      <div className="mx-auto w-full max-w-sm space-y-6">

        {/* 1. Podsumowanie stanu */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {summaryText}
        </p>

        {/* 2 + 3. Typ dnia + uzasadnienie */}
        <div>
          <p className="text-4xl leading-none">{meta.emoji}</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight">
            {meta.label}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {justificationText}
          </p>
        </div>

        {/* 4. Mikroakcja */}
        <div className="rounded-xl border border-border bg-muted/40 px-5 py-4">
          <p className="text-sm leading-relaxed">{microaction}</p>
        </div>

        {/* 5. Streak counter — tylko gdy > 0 */}
        {streak > 0 && (
          <p className="text-center text-sm font-medium">
            🔥 {streak} {streak === 1 ? 'dzień' : 'dni'} z rzędu
          </p>
        )}

        {/* 6. Wykonaj ponownie */}
        <Button className="w-full" onClick={handleReset}>
          Wykonaj ponownie
        </Button>

        {/* 7. Czy to pomogło? */}
        <div className="space-y-2">
          <p className="text-center text-xs text-muted-foreground">Czy to pomogło?</p>
          <div className="flex gap-3">
            <FeedbackButton
              emoji="👍"
              label="Pomogło"
              state={feedback === 'up' ? 'active' : feedback !== null ? 'dimmed' : 'idle'}
              onClick={() => handleFeedback(true)}
            />
            <FeedbackButton
              emoji="👎"
              label="Nie pomogło"
              state={feedback === 'down' ? 'active' : feedback !== null ? 'dimmed' : 'idle'}
              onClick={() => handleFeedback(false)}
            />
          </div>
        </div>

      </div>
    </main>
  )
}

// Stan: 'idle' | 'active' | 'dimmed'
function FeedbackButton({ emoji, label, state, onClick }) {
  const base = 'flex flex-1 items-center justify-center rounded-xl border py-3 text-xl transition-colors'
  const styles = {
    idle:   'border-border hover:border-primary/40',
    active: 'border-primary bg-primary/8',
    dimmed: 'border-border opacity-25 cursor-default',
  }
  return (
    <button
      onClick={state === 'idle' ? onClick : undefined}
      disabled={state === 'dimmed'}
      className={`${base} ${styles[state]}`}
      aria-label={label}
    >
      {emoji}
    </button>
  )
}
