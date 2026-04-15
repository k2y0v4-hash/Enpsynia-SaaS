import { useEffect } from 'react'

export function AnalysisScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="space-y-4">
        <div className="mx-auto h-7 w-7 animate-pulse rounded-full bg-primary opacity-50" />
        <p className="text-base text-muted-foreground">Analizuję Twoje potrzeby…</p>
      </div>
    </main>
  )
}
