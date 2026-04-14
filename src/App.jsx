import { useState } from 'react'
import { Landing } from '@/components/Landing'

function App() {
  const [screen, setScreen] = useState('landing')

  if (screen === 'landing') {
    return <Landing onStart={() => setScreen('form')} />
  }

  // Placeholder — Faza 3
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Formularz — Faza 3</p>
    </main>
  )
}

export default App
