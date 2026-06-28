// Logika jednorazowej, nieblokującej propozycji założenia konta.
// Decyzja właściciela D7: po ukończeniu 2. anonimowego check-inu pokazujemy propozycję;
// po jej zamknięciu (dowolnym z trzech działań) nie pokazujemy jej ponownie.
//
// shouldShowAccountPrompt jest czystą funkcją — testowalną w `npm test`.

export const ACCOUNT_PROMPT_DISMISSED_KEY = 'enpsyneia_account_prompt_dismissed'

// Czysta reguła decyzyjna.
// Pokazujemy propozycję gdy: użytkownik nie jest zalogowany, Supabase jest skonfigurowany
// (inaczej konto nie ma sensu), propozycja nie została jeszcze zamknięta,
// a liczba ukończonych anonimowych check-inów osiągnęła próg (2).
export function shouldShowAccountPrompt({ checkinCount, dismissed, isLoggedIn, supabaseConfigured }) {
  if (isLoggedIn) return false
  if (!supabaseConfigured) return false
  if (dismissed) return false
  return checkinCount >= 2
}

export function getPromptDismissed() {
  try {
    return localStorage.getItem(ACCOUNT_PROMPT_DISMISSED_KEY) === 'true'
  } catch {
    return false
  }
}

export function setPromptDismissed() {
  try {
    localStorage.setItem(ACCOUNT_PROMPT_DISMISSED_KEY, 'true')
  } catch {
    // Brak dostępu do localStorage nie blokuje flow — propozycja po prostu może pojawić się ponownie.
  }
}
