import { Button } from '@/components/ui/button'

export function Landing({ onStart }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight">
          Czego teraz najbardziej potrzebujesz?
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Wypełnij 6 prostych pytań i otrzymaj jedną konkretną mikroakcję.{' '}
          W mniej niż 2 minuty.
        </p>
        <Button size="lg" className="w-full" onClick={onStart}>
          Rozpocznij check-in
        </Button>
      </div>
    </main>
  )
}
