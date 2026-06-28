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
import { SignUpScreen } from '@/components/SignUpScreen'
import { SignInScreen } from '@/components/SignInScreen'
import { AccountPromptScreen } from '@/components/AccountPromptScreen'
import { SavingScreen, SaveErrorScreen } from '@/components/SaveStatusScreens'
import { analyzeCheckIn } from '@/utils/analysisLogic'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useConsent } from '@/hooks/useConsent'
import { useAuth } from '@/hooks/useAuth'
import { initGA4, trackEvent } from '@/lib/analytics'
import { insertCheckIn, fetchMyCheckIns } from '@/lib/checkins'
import { avgScore } from '@/lib/checkinMapping'
import { shouldShowAccountPrompt, getPromptDismissed, setPromptDismissed } from '@/lib/accountPrompt'

function App() {
  const [screen, setScreen] = useState('landing')
  const [menuReturn, setMenuReturn] = useState('landing')
  const [termsReturn, setTermsReturn] = useState('landing')
  const [authReturn, setAuthReturn] = useState('landing')
  const [result, setResult] = useState(null)
  const [pendingAnswers, setPendingAnswers] = useState(null)
  const [pendingTouched, setPendingTouched] = useState(null)
  const [pendingSave, setPendingSave] = useState(null) // { answers, result } oczekujące na zapis Supabase
  const [saveError, setSaveError] = useState(null)
  const [promptDismissed, setPromptDismissedState] = useState(getPromptDismissed)

  const { history: localHistory, checkinCount, saveCheckIn } = useLocalStorage()
  const { consent, accept, reject } = useConsent()
  const { user, isLoggedIn, supabaseConfigured, signUp, signIn, signOut } = useAuth()

  // Historia konta (Supabase) — wyłącznie dla zalogowanego użytkownika.
  const [remoteHistory, setRemoteHistory] = useState([])
  const [remoteLoading, setRemoteLoading] = useState(false)
  const [remoteError, setRemoteError] = useState(null)

  useEffect(() => {
    if (consent === 'accepted') initGA4()
  }, [consent])

  // Po zalogowaniu pobierz własną historię z Supabase (czyszczenie po wylogowaniu: handleSignOut).
  useEffect(() => {
    if (!isLoggedIn) return
    let active = true
    async function load() {
      setRemoteLoading(true)
      setRemoteError(null)
      try {
        const rows = await fetchMyCheckIns()
        if (active) setRemoteHistory(rows)
      } catch (e) {
        if (active) setRemoteError(e?.message || 'Nie udało się pobrać historii.')
      } finally {
        if (active) setRemoteLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [isLoggedIn])

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
    setPendingSave(null)
    setSaveError(null)
    setScreen(consent === null ? 'landing' : 'form')
  }

  function handleStart() {
    trackEvent('form_start', {})
    setScreen('form')
  }

  // Wspólna ścieżka zapisu wyniku check-inu — jawnie rozróżnia zapis lokalny (anon)
  // od zapisu w Supabase (zalogowany). Błąd Supabase NIE jest prezentowany jako sukces
  // i NIE jest po cichu zapisywany do localStorage.
  async function persistAndShowResult(answers) {
    const r = analyzeCheckIn(answers)
    setResult(r)

    if (isLoggedIn) {
      setPendingSave({ answers, result: r })
      setSaveError(null)
      setScreen('saving')
      try {
        await insertCheckIn(user.id, answers, r)
        prependRemote(answers, r)
        setPendingSave(null)
        setScreen('daytype')
      } catch (e) {
        setSaveError(e?.message || 'Błąd połączenia.')
        setScreen('saveError')
      }
    } else {
      saveCheckIn(answers, r) // zapis lokalny użytkownika anonimowego
      setScreen('daytype')
    }
  }

  // Optymistyczne dodanie wpisu do historii konta po udanym zapisie (do końca sesji).
  function prependRemote(answers, r) {
    const optimistic = {
      id: `pending-${Date.now()}`,
      timestamp: new Date().toISOString(),
      answers,
      score: avgScore(answers),
      dayType: r.dayType,
      microactionTitle: r.microaction.title,
    }
    setRemoteHistory(prev => [optimistic, ...prev])
  }

  async function retrySave() {
    if (!pendingSave) return startNewCheckIn()
    setSaveError(null)
    setScreen('saving')
    try {
      await insertCheckIn(user.id, pendingSave.answers, pendingSave.result)
      prependRemote(pendingSave.answers, pendingSave.result)
      setPendingSave(null)
      setScreen('daytype')
    } catch (e) {
      setSaveError(e?.message || 'Błąd połączenia.')
      setScreen('saveError')
    }
  }

  function continueWithoutSave() {
    setPendingSave(null)
    setScreen('daytype')
  }

  function handleFormComplete(answers) {
    persistAndShowResult(answers)
  }

  function handleInsufficientAnswers(answers, touched) {
    setPendingAnswers(answers)
    setPendingTouched(touched)
    setScreen('missing')
  }

  function handleMissingContinue() {
    persistAndShowResult(pendingAnswers)
  }

  // Po ukończeniu check-inu (z ekranu mikroakcji). Tu — i tylko tu — może pojawić się
  // jednorazowa propozycja konta po 2. anonimowym check-inie (decyzja właściciela D7).
  function handleCheckinDone() {
    if (shouldShowAccountPrompt({ checkinCount, dismissed: promptDismissed, isLoggedIn, supabaseConfigured })) {
      setScreen('accountPrompt')
    } else {
      startNewCheckIn()
    }
  }

  function dismissPrompt() {
    setPromptDismissed()
    setPromptDismissedState(true)
  }

  function openAuth(target, returnTo) {
    setAuthReturn(returnTo)
    setScreen(target)
  }

  function handleMenuSelect(target) {
    if (target === 'signin' || target === 'signup') openAuth(target, 'menu')
    else setScreen(target)
  }

  async function handleSignOut() {
    await signOut()
    setRemoteHistory([])
    setRemoteError(null)
    setScreen('landing')
  }

  function openTermsFromLanding() {
    setTermsReturn('landing')
    setScreen('terms')
  }
  function openTermsFromPrivacy() {
    setTermsReturn('privacy')
    setScreen('terms')
  }
  function backFromTerms() {
    setScreen(termsReturn)
  }

  return (
    <>
      {screen === 'landing' && (
        <Landing
          onStart={handleStart}
          consentPending={consent === null}
          onAccept={accept}
          onReject={reject}
          onTerms={openTermsFromLanding}
          onMenu={openMenu}
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
      {screen === 'saving' && <SavingScreen onMenu={openMenu} />}
      {screen === 'saveError' && (
        <SaveErrorScreen
          message={saveError}
          onRetry={retrySave}
          onContinueWithoutSave={continueWithoutSave}
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
          onReset={handleCheckinDone}
          onMenu={openMenu}
        />
      )}
      {screen === 'accountPrompt' && (
        <AccountPromptScreen
          onCreateAccount={() => { dismissPrompt(); openAuth('signup', 'landing') }}
          onSignIn={() => { dismissPrompt(); openAuth('signin', 'landing') }}
          onNotNow={() => { dismissPrompt(); startNewCheckIn() }}
          onMenu={openMenu}
        />
      )}
      {screen === 'signup' && (
        <SignUpScreen
          onSignUp={signUp}
          onGoSignIn={() => setScreen('signin')}
          onAuthed={() => setScreen('landing')}
          onBack={() => setScreen(authReturn)}
          onMenu={openMenu}
        />
      )}
      {screen === 'signin' && (
        <SignInScreen
          onSignIn={signIn}
          onGoSignUp={() => setScreen('signup')}
          onAuthed={() => setScreen('landing')}
          onBack={() => setScreen(authReturn)}
          onMenu={openMenu}
        />
      )}
      {screen === 'menu' && (
        <MenuScreen
          onSelect={handleMenuSelect}
          onBack={closeMenu}
          isLoggedIn={isLoggedIn}
          supabaseConfigured={supabaseConfigured}
          onSignOut={handleSignOut}
        />
      )}
      {screen === 'history' && (
        <HistoryScreen
          history={isLoggedIn ? remoteHistory : localHistory}
          loading={isLoggedIn ? remoteLoading : false}
          error={isLoggedIn ? remoteError : null}
          isLoggedIn={isLoggedIn}
          onMenu={openMenu}
          onNewCheckIn={startNewCheckIn}
        />
      )}
      {screen === 'about' && (
        <AboutScreen onMenu={openMenu} onBack={startNewCheckIn} />
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
          onTermsLink={openTermsFromPrivacy}
        />
      )}
      {screen === 'terms' && (
        <TermsScreen
          onMenu={openMenu}
          onBackToPrivacy={backFromTerms}
          onNewCheckIn={startNewCheckIn}
          backLabel={termsReturn === 'privacy' ? 'Wróć do ustawień prywatności' : 'Wróć'}
        />
      )}
    </>
  )
}

export default App
