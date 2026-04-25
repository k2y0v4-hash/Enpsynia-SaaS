import { Button } from '@/components/ui/button'

const QUESTION_LABELS = {
  energy:    'Poziom energii',
  overload:  'Przeciążenie bodźcami',
  paralysis: 'Utknięcie w analizie',
  movement:  'Potrzeba ruchu vs odpoczynku',
  social:    'Potrzeba samotności vs kontaktu',
  agency:    'Poczucie sprawczości',
}

const QUESTION_ORDER = ['energy', 'overload', 'paralysis', 'movement', 'social', 'agency']

export function MissingAnswersScreen({ values, touched, onBack, onContinue }) {
  return (
    <main className="flex min-h-screen flex-col px-6 py-8">
      <div className="flex flex-col space-y-6 pb-28">
        <div className="space-y-1">
          <h1 className="text-xl font-bold leading-tight">Brakuje kilku odpowiedzi</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Przesuń co najmniej 3 suwaki, żeby wynik był miarodajny. Możesz też kontynuować bez nich.
          </p>
        </div>

        <div className="space-y-2">
          {QUESTION_ORDER.map(id => (
            <div
              key={id}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm"
            >
              <span className={touched[id] ? 'text-foreground' : 'text-muted-foreground'}>
                {QUESTION_LABELS[id]}
              </span>
              <span className={touched[id] ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                {touched[id] ? `${values[id]}/5` : 'brak'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-background pt-3 pb-6 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          Wróć
        </Button>
        <Button className="flex-1" onClick={onContinue}>
          Wynik
        </Button>
      </div>
    </main>
  )
}
