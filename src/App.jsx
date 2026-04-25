import { useEffect } from 'react'
import { useState } from 'react'
import { Landing } from '@/components/Landing'
import { CheckInForm } from '@/components/CheckInForm'
import { MissingAnswersScreen } from '@/components/MissingAnswersScreen'
import { DayTypeScreen } from '@/components/DayTypeScreen'
import { MicroActionScreen } from '@/components/MicroActionScreen'
import { analyzeCheckIn } from '@/utils/analysisLogic'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useConsent } from '@/hooks/useConsent'
import { initGA4, trackEvent } from '@/lib/analytics'

function App() {
  const [screen, setScreen] = useState('landing')
  const [result, setResult] = useState(null)
  const [pendingAnswers, setPendingAnswers] = useState(null)
  const [pendingTouched, setPendingTouched] = useState(null)
  const { streak, saveCheckIn } = useLocalStorage()
  const { consent, accept, reject } = useConsent()

  useEffect(() => {
    if (consent === 'accepted') {
      initGA4()
    }
  }, [consent])

  function handleStart() {
    trackEvent('form_start', {})
    setScreen('form')
  }

  function handleFormComplete(answers) {
    const analysisResult = analyzeCheckIn(answers)
    setResult(analysisResult)
    saveCheckIn(answers, analysisResult)
    setScreen('daytype')
  }

  function handleInsufficientAnswers(answers, touched) {
    setPendingAnswers(answers)
    setPendingTouched(touched)
    setScreen('missing')
  }

  function handleMissingBack() {
    setScreen('form')
  }

  function handleMissingContinue() {
    const analysisResult = analyzeCheckIn(pendingAnswers)
    setResult(analysisResult)
    saveCheckIn(pendingAnswers, analysisResult)
    setScreen('daytype')
  }

  function handleDayTypeNext() {
    setScreen('microaction')
  }

  function handleReset() {
    setResult(null)
    setPendingAnswers(null)
    setPendingTouched(null)
    setScreen('form')
  }

  return (
    <>
      {screen === 'landing' && (
        <Landing
          onStart={handleStart}
          streak={streak}
          consentPending={consent === null}
          onAccept={accept}
          onReject={reject}
        />
      )}
      {screen === 'form' && (
        <CheckInForm
          onComplete={handleFormComplete}
          onInsufficientAnswers={handleInsufficientAnswers}
        />
      )}
      {screen === 'missing' && (
        <MissingAnswersScreen
          values={pendingAnswers}
          touched={pendingTouched}
          onBack={handleMissingBack}
          onContinue={handleMissingContinue}
        />
      )}
      {screen === 'daytype' && result && (
        <DayTypeScreen result={result} onNext={handleDayTypeNext} />
      )}
      {screen === 'microaction' && result && (
        <MicroActionScreen result={result} onReset={handleReset} />
      )}
    </>
  )
}

export default App
