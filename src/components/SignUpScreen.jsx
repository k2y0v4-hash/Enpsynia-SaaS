import { useState } from 'react'
import { AppScreen, Hamburger, ScreenFooter, ActionButton, TextField, FormError } from '@/components/ScreenShell'

// Rejestracja: nickname + e-mail + hasło. Po sukcesie z włączonym potwierdzaniem e-maila
// pokazujemy ekran „sprawdź skrzynkę". Brak resetu hasła (decyzja właściciela D4).
export function SignUpScreen({ onSignUp, onGoSignIn, onAuthed, onBack, onMenu }) {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [confirmSent, setConfirmSent] = useState(false)

  async function handleSubmit() {
    if (submitting) return
    setError(null)

    if (!nickname.trim()) return setError('Podaj nickname.')
    if (!email.trim()) return setError('Podaj adres e-mail.')
    if (password.length < 6) return setError('Hasło musi mieć co najmniej 6 znaków.')

    setSubmitting(true)
    try {
      const { needsConfirmation } = await onSignUp({ nickname: nickname.trim(), email: email.trim(), password })
      if (needsConfirmation) {
        setConfirmSent(true)
      } else {
        onAuthed()
      }
    } catch (e) {
      setError(e?.message || 'Nie udało się założyć konta. Spróbuj ponownie.')
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
        Załóż konto
      </h1>

      {confirmSent ? (
        <div className="mx-6 mt-6 flex flex-col gap-4">
          <p className="text-[15px] font-semibold text-[#1F2523] text-center leading-[21px]">
            Sprawdź swoją skrzynkę
          </p>
          <p className="text-[13px] text-[#66716C] text-center leading-[18px]">
            Wysłaliśmy link potwierdzający na <span className="font-semibold">{email.trim()}</span>.
            Potwierdź adres, a potem zaloguj się. Bez potwierdzenia logowanie nie zadziała.
          </p>
          <div className="flex justify-center mt-2">
            <ActionButton variant="primary" size="wide" onClick={onGoSignIn}>
              Przejdź do logowania
            </ActionButton>
          </div>
        </div>
      ) : (
        <>
          <p className="text-[13px] text-[#66716C] text-center leading-[17px] mt-2 px-8">
            Konto pozwala zachować historię poza tą przeglądarką i korzystać z niej na innym urządzeniu.
          </p>

          <div className="mx-6 mt-6 flex flex-col gap-4">
            <TextField id="nickname" label="Nickname" value={nickname} onChange={setNickname}
              autoComplete="nickname" placeholder="np. Kasia" disabled={submitting} />
            <TextField id="email" label="E-mail" type="email" value={email} onChange={setEmail}
              autoComplete="email" placeholder="ty@example.com" disabled={submitting} />
            <TextField id="password" label="Hasło" type="password" value={password} onChange={setPassword}
              autoComplete="new-password" placeholder="min. 6 znaków" disabled={submitting} />
            <FormError>{error}</FormError>
          </div>

          <div className="flex justify-center mt-6">
            <ActionButton variant="primary" size="wide" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Zakładam konto…' : 'Załóż konto'}
            </ActionButton>
          </div>

          <p className="text-center mt-4">
            <button onClick={onGoSignIn} className="text-[13px] font-semibold text-[#1D6B5F]">
              Masz już konto? Zaloguj się
            </button>
          </p>
        </>
      )}

      <div className="flex justify-center mt-6">
        <ActionButton variant="outline" size="small" onClick={onBack}>
          Wróć
        </ActionButton>
      </div>

      <ScreenFooter />
    </AppScreen>
  )
}
