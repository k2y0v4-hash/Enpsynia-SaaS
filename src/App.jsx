import { useEffect, useState } from 'react'
import { Landing } from '@/components/Landing'
import { CheckInForm } from '@/components/CheckInForm'
import { MissingAnswersScreen } from '@/components/MissingAnswersScreen'
import { DayTypeScreen } from '@/components/DayTypeScreen'
import { MicroActionScreen } from '@/components/MicroActionScreen'
import { MenuScreen } from '@/components/MenuScreen'
import { HistoryScreen } from '@/components/HistoryScreen'
import { AboutScreen } from '@/components/AboutScreen'
import { SuggestionsScreen } from '@/components/SuggestionsScreen'
import { PrivacyScreen } from '@/components/PrivacyScreen'
import { TermsScreen } from '@/components/TermsScreen'
import { analyzeCheckIn } from '@/utils/analysisLogic'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useConsent } from '@/hooks/useConsent'
import { initGA4, trackEvent } from '@/lib/analytics'

function App() {
  const [screen, setScreen] = useState('landing')
  const [menuReturn, setMenuReturn] = useState('landing')
  const [result, setResult] = useState(null)
  const [pendingAnswers, setPendingAnswers] = useState(null)
  const [pendingTouched, setPendingTouched] = useState(null)
  const { history, saveCheckIn } = useLocalStorage()
  const { consent, accept, reject } = useConsent()

  useEffect(() => {
    if (consent === 'accepted') initGA4()
  }, [consent])

  // Menu — hamburger zapamiętuje ekran wywołujący, „Wróć" do niego wraca
  function openMenu() {
    setMenuReturn(screen)
    setScreen('menu')
  }
  function closeMenu() {
    setScreen(menuReturn)
  }

  function startNewCheckIn() {
    setResult(null)
    setPendingAnswers(null)
    setPendingTouched(null)
    setScreen('form')
  }

  function handleStart() {
    trackEvent('form_start', {})
    setScreen('form')
  }

  function handleFormComplete(answers) {
    const r = analyzeCheckIn(answers)
    setResult(r)
    saveCheckIn(answers, r)
    setScreen('daytype')
  }

  function handleInsufficientAnswers(answers, touched) {
    setPendingAnswers(answers)
    setPendingTouched(touched)
    setScreen('missing')
  }

  function handleMissingContinue() {
    const r = analyzeCheckIn(pendingAnswers)
    setResult(r)
    saveCheckIn(pendingAnswers, r)
    setScreen('daytype')
  }

  return (
    <>
      {screen === 'landing' && (
        <Landing
          onStart={handleStart}
          consentPending={consent === null}
          onAccept={accept}
          onReject={reject}
          onTerms={() => setScreen('terms')}
        />
      )}
      {screen === 'form' && (
        <CheckInForm
          onComplete={handleFormComplete}
          onInsufficientAnswers={handleInsufficientAnswers}
          onMenu={openMenu}
        />
      )}
      {screen === 'missing' && (
        <MissingAnswersScreen
          values={pendingAnswers}
          touched={pendingTouched}
          onBack={() => setScreen('form')}
          onContinue={handleMissingContinue}
          onMenu={openMenu}
        />
      )}
      {screen === 'daytype' && result && (
        <DayTypeScreen
          result={result}
          onNext={() => setScreen('microaction')}
          onMenu={openMenu}
        />
      )}
      {screen === 'microaction' && result && (
        <MicroActionScreen
          result={result}
          onReset={startNewCheckIn}
          onMenu={openMenu}
        />
      )}
      {screen === 'menu' && (
        <MenuScreen
          onSelect={target => setScreen(target)}
          onBack={closeMenu}
        />
      )}
      {screen === 'history' && (
        <HistoryScreen
          history={history}
          onMenu={openMenu}
          onNewCheckIn={startNewCheckIn}
        />
      )}
      {screen === 'about' && (
        <AboutScreen
          onMenu={openMenu}
          onBack={startNewCheckIn}
        />
      )}
      {screen === 'suggestions' && (
        <SuggestionsScreen
          onMenu={openMenu}
          onSubmit={() => setScreen('landing')}
        />
      )}
      {screen === 'privacy' && (
        <PrivacyScreen
          onMenu={openMenu}
          onSave={() => setScreen(menuReturn)}
          onTermsLink={() => setScreen('terms')}
        />
      )}
      {screen === 'terms' && (
        <TermsScreen
          onMenu={openMenu}
          onBackToPrivacy={() => setScreen('privacy')}
          onNewCheckIn={startNewCheckIn}
        />
      )}
    </>
  )
}

export default App
