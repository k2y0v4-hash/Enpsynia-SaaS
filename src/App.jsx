import { useState } from 'react'
import { Landing } from '@/components/Landing'
import { CheckInForm } from '@/components/CheckInForm'
import { AnalysisScreen } from '@/components/AnalysisScreen'
import { ResultScreen } from '@/components/ResultScreen'
import { analyzeCheckIn } from '@/utils/analysisLogic'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { trackEvent } from '@/lib/analytics'

function App() {
  const [screen, setScreen] = useState('landing')
  const [result, setResult] = useState(null)
  const { streak, saveCheckIn } = useLocalStorage()

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

  if (screen === 'landing') {
    return <Landing onStart={handleStart} streak={streak} />
  }

  if (screen === 'form') {
    return <CheckInForm onComplete={handleFormComplete} />
  }

  if (screen === 'analysis') {
    return <AnalysisScreen onComplete={handleAnalysisComplete} />
  }

  return <ResultScreen result={result} streak={streak} onReset={handleReset} />
}

export default App
