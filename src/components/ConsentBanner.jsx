import { Button } from '@/components/ui/button'

export function ConsentBanner({ onAccept, onReject }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background px-6 py-4">
      <div className="mx-auto flex max-w-sm flex-col gap-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Chcemy mierzyć, czy aplikacja jest pomocna. Żadnych danych osobowych — tylko zdarzenia produktowe.
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
  )
}
