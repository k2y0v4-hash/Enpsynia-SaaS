import { useEffect } from 'react'
import { Landing } from '@/components/Landing'
import { CheckInForm } from '@/components/CheckInForm'
import { AnalysisScreen } from '@/components/AnalysisScreen'
import { ResultScreen } from '@/components/ResultScreen'
import { ConsentBanner } from '@/components/ConsentBanner'
import { analyzeCheckIn } from '@/utils/analysisLogic'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useConsent } from '@/hooks/useConsent'
import { initGA4, trackEvent } from '@/lib/analytics'
import { useState } from 'react'

function App() {
  const [screen, setScreen] = useState('landing')
  const [result, setResult] = useState(null)
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
    setScreen('analysis')
  }

  function handleAnalysisComplete() {
    setScreen('result')
  }

  function handleReset() {
    setScreen('form')
  }

  return (
    <>
      {screen === 'landing' && <Landing onStart={handleStart} streak={streak} />}
      {screen === 'form' && <CheckInForm onComplete={handleFormComplete} />}
      {screen === 'analysis' && <AnalysisScreen onComplete={handleAnalysisComplete} />}
      {screen === 'result' && <ResultScreen result={result} streak={streak} onReset={handleReset} />}
      {consent === null && <ConsentBanner onAccept={accept} onReject={reject} />}
    </>
  )
}

export default App
