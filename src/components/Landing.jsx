import { Button } from '@/components/ui/button'

export function Landing({ onStart, streak = 0, consentPending, onAccept, onReject }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight">
          Enpsyneia Check-In
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Zatrzymaj się na chwilę, nazwij aktualny stan i wybierz następny mały krok.
        </p>
        {streak > 0 && (
          <p className="text-sm font-medium">
            🔥 {streak} {streak === 1 ? 'dzień' : 'dni'} z rzędu
          </p>
        )}
        <Button
          size="lg"
          className="w-full"
          onClick={onStart}
          disabled={consentPending}
        >
          Zacznij check-in
        </Button>
      </div>

      {/* Baner cookies — wbudowany w ekran 01 (D14) */}
      {consentPending && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background px-6 py-4">
          <div className="mx-auto flex max-w-sm flex-col gap-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Chcemy mierzyć, czy aplikacja jest pomocna. Żadnych danych osobowych — tylko zdarzenia produktowe.{' '}
              <a href="#" className="underline underline-offset-2" onClick={e => e.preventDefault()}>
                Polityka prywatności
              </a>
            </p>
            <div className="flex gap-3">
              <Button size="sm" className="flex-1" onClick={onAccept}>
                Akceptuję
              </Button>
              <Button size="sm" variant="outline" className="flex-1" onClick={onReject}>
                Odrzucam
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
