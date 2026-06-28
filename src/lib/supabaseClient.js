// Klient Supabase — Enpsyneia Check In (Etap 2, model hybrydowy)
// Konfiguracja: ustaw VITE_SUPABASE_URL i VITE_SUPABASE_PUBLISHABLE_KEY
//   - dev: .env.local
//   - produkcja: Vercel → Project Settings → Environment Variables
//
// Frontend korzysta WYŁĄCZNIE z klucza publishable (sb_publishable_...).
// Nigdy nie umieszczaj tu service_role, sb_secret_*, hasła bazy ani connection stringa.
//
// Klient jest null-safe: gdy zmienne nie są ustawione, eksportujemy `null`.
// Dzięki temu anonimowy flow (localStorage) działa nawet bez konfiguracji Supabase,
// a funkcje konta są wtedy nieaktywne (patrz isSupabaseConfigured).

import { createClient } from '@supabase/supabase-js'

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}

const SUPABASE_URL = env.VITE_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)

// Domyślne utrzymywanie sesji przez supabase-js (localStorage) — decyzja właściciela D5.
// Ryzyko XSS opisane w docs/architecture/adr_003_supabase_accounts.md i AGENTS.md.
// Nie tworzymy własnego mechanizmu przechowywania tokenów.
export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  : null
