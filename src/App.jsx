import { useState } from 'react'
import { Landing } from '@/components/Landing'
import { CheckInForm } from '@/components/CheckInForm'
import { AnalysisScreen } from '@/components/AnalysisScreen'
import { ResultScreen } from '@/components/ResultScreen'
import { analyzeCheckIn } from '@/utils/analysisLogic'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// GA4 — bezpieczna funkcja, nie rzuca błędem gdy gtag niedostępny
function trackEvent(name, params) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

function App() {
  const [screen, setScreen] = useState('landing')
  const [result, setResult] = useState(null)
  const { streak, saveCheckIn } = useLocalStorage()

  function handleStart() {
    trackEvent('form_start', {})
    setScreen('form')
  }

  function handleFormComplete(answers) {
    setResult(analyzeCheckIn(answers))
    setScreen('analysis')
  }

  function handleAnalysisComplete() {
    setScreen('result')
  }

  function handleReset() {
    setScreen('form')
  }

  if (screen === 'landing') {
    return <Landing onStart={handleStart} />
  }

  if (screen === 'form') {
    return <CheckInForm onComplete={handleFormComplete} />
  }

  if (screen === 'analysis') {
    return <AnalysisScreen onComplete={handleAnalysisComplete} />
  }

  return <ResultScreen result={result} onReset={handleReset} />
}

export default App
