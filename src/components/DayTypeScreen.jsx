import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DAY_TYPES } from '@/utils/analysisLogic'
import { trackEvent } from '@/lib/analytics'

const DAY_META = {
  [DAY_TYPES.DZIALANIA]:    { emoji: '⚡', label: 'Dzień Działania' },
  [DAY_TYPES.WYCISZENIA]:   { emoji: '🌿', label: 'Dzień Wyciszenia' },
  [DAY_TYPES.ODBUDOWY]:     { emoji: '🌱', label: 'Dzień Odbudowy' },
  [DAY_TYPES.KONTAKTU]:     { emoji: '🤝', label: 'Dzień Kontaktu' },
  [DAY_TYPES.PRZECIAZENIA]: { emoji: '🌀', label: 'Dzień Przeciążenia' },
}

export function DayTypeScreen({ result, onNext }) {
  const { dayType, justificationText, microaction } = result
  const meta = DAY_META[dayType]

  useEffect(() => {
    trackEvent('result_shown', { day_type: dayType })
  }, [dayType])

  return (
    <main className="flex min-h-screen flex-col px-6 py-10">
      <div className="mx-auto w-full max-w-sm flex flex-col space-y-6 pb-28">
        <div>
          <p className="text-5xl leading-none">{meta.emoji}</p>
          <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight">
            {meta.label}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {justificationText}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card px-5 py-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            Mikro-akcja
          </p>
          <p className="text-base font-semibold leading-snug">{microaction.title}</p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-background pt-3 pb-6">
        <Button className="w-full" onClick={onNext}>
          Zobacz mikro-akcję
        </Button>
      </div>
    </main>
  )
}
