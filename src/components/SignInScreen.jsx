import { useState } from 'react'
import { AppScreen, Hamburger, ScreenFooter, ActionButton, TextField, FormError } from '@/components/ScreenShell'

// Logowanie: e-mail + hasło. Bez resetu hasła (decyzja właściciela D4) — link odzyskiwania
// świadomie nie istnieje; ograniczenie opisane w UI ekranu i w dokumentacji.
export function SignInScreen({ onSignIn, onGoSignUp, onAuthed, onBack, onMenu }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit() {
    if (submitting) return
    setError(null)

    if (!email.trim()) return setError('Podaj adres e-mail.')
    if (!password) return setError('Podaj hasło.')

    setSubmitting(true)
    try {
      await onSignIn({ email: email.trim(), password })
      onAuthed()
    } catch (e) {
      setError(e?.message || 'Nie udało się zalogować. Sprawdź dane i potwierdzenie e-maila.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppScreen>
      <div className="absolute left-[22px] top-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-[54px] px-6">
        Zaloguj się
      </h1>
      <p className="text-[13px] text-[#66716C] text-center leading-[17px] mt-2 px-8">
        Zaloguj się, żeby zobaczyć swoją historię na tym i innych urządzeniach.
      </p>

      <div className="mx-6 mt-6 flex flex-col gap-4">
        <TextField id="email" label="E-mail" type="email" value={email} onChange={setEmail}
          autoComplete="email" placeholder="ty@example.com" disabled={submitting} />
        <TextField id="password" label="Hasło" type="password" value={password} onChange={setPassword}
          autoComplete="current-password" placeholder="Twoje hasło" disabled={submitting} />
        <FormError>{error}</FormError>
      </div>

      <div className="flex justify-center mt-6">
        <ActionButton variant="primary" size="wide" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Loguję…' : 'Zaloguj się'}
        </ActionButton>
      </div>

      <p className="text-[12px] text-[#66716C] text-center leading-[16px] mt-4 px-8">
        Na tym etapie nie ma odzyskiwania hasła — zapamiętaj swoje hasło.
      </p>

      <p className="text-center mt-3">
        <button onClick={onGoSignUp} className="text-[13px] font-semibold text-[#1D6B5F]">
          Nie masz konta? Załóż konto
        </button>
      </p>

      <div className="flex justify-center mt-6">
        <ActionButton variant="outline" size="small" onClick={onBack}>
          Wróć
        </ActionButton>
      </div>

      <ScreenFooter />
    </AppScreen>
  )
}
