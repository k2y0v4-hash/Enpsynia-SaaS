export function ProgressBar({ current, total }) {
  return (
    <div className="space-y-1.5">
      <p className="text-center text-sm text-muted-foreground">
        Blok {current} z {total}
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  )
}
