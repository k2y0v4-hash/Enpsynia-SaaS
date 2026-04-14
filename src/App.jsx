import { useState } from 'react'
import { Landing } from '@/components/Landing'
import { CheckInForm } from '@/components/CheckInForm'

function App() {
  const [screen, setScreen] = useState('landing')
  const [answers, setAnswers] = useState(null)

  if (screen === 'landing') {
    return <Landing onStart={() => setScreen('form')} />
  }

  if (screen === 'form') {
    return (
      <CheckInForm
        onComplete={(a) => {
          setAnswers(a)
          setScreen('result')
        }}
      />
    )
  }

  // Placeholder — Faza 4/5
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <p className="text-center text-muted-foreground">
        Wynik — Faza 4/5
        <br />
        <span className="text-xs">{JSON.stringify(answers)}</span>
      </p>
    </main>
  )
}

export default App
