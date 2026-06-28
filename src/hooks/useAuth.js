import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

// Warstwa auth — e-mail + hasło (Supabase Auth). Decyzje właściciela:
//   D4 — brak resetu hasła i odzyskiwania konta (świadome ograniczenie etapu)
//   D5 — sesja utrzymywana domyślnym mechanizmem supabase-js (localStorage)
// Zakres: signUp (z nickname), signIn, signOut, przywracanie sesji.
// Bez: reset hasła, magic link, OAuth, telefon, anonymous, account linking, edycja/usuwanie konta.
//
// Hook jest używany raz w App.jsx, a potrzebne dane przekazujemy w dół przez propsy —
// dzięki temu nie wprowadzamy globalnego state managera ani routera.

export function useAuth() {
  const [user, setUser] = useState(null)
  // authReady = zakończono pierwszą próbę przywrócenia sesji (zanim wiemy, czy jesteśmy zalogowani).
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured)

  useEffect(() => {
    if (!supabase) return

    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setUser(data.session?.user ?? null)
      setAuthReady(true)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  // Rejestracja. nickname trafia do metadanych — trigger handle_new_user tworzy z nich profil.
  // Zwraca { needsConfirmation } — true gdy Supabase wymaga potwierdzenia e-maila przed logowaniem.
  async function signUp({ nickname, email, password }) {
    if (!supabase) throw new Error('Konta są chwilowo niedostępne (brak konfiguracji Supabase).')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname },
        emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    })
    if (error) throw error
    // Przy włączonym potwierdzaniu e-maila Supabase nie zwraca sesji do czasu potwierdzenia.
    return { needsConfirmation: !data.session }
  }

  async function signIn({ email, password }) {
    if (!supabase) throw new Error('Logowanie jest chwilowo niedostępne (brak konfiguracji Supabase).')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return {
    user,
    isLoggedIn: Boolean(user),
    authReady,
    supabaseConfigured: isSupabaseConfigured,
    signUp,
    signIn,
    signOut,
  }
}
