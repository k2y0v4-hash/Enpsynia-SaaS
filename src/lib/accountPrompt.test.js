/* global process */
// Testy logiki jednorazowej propozycji konta (czysta funkcja) — plan sekcja 8, decyzja D7.
// Uruchom: node src/lib/accountPrompt.test.js  (lub npm test)

import { shouldShowAccountPrompt } from './accountPrompt.js'

let passed = 0
let failed = 0

function check(name, cond) {
  if (cond) { console.log(`[PASS]    ${name}`); passed++ }
  else { console.log(`[FAIL]    ${name}`); failed++ }
}

const base = { isLoggedIn: false, supabaseConfigured: true, dismissed: false }

// Pierwszy anonimowy check-in — brak propozycji.
check('1. check-in anon → brak propozycji',
  shouldShowAccountPrompt({ ...base, checkinCount: 1 }) === false)

// Drugi anonimowy check-in — propozycja się pojawia.
check('2. check-in anon → propozycja',
  shouldShowAccountPrompt({ ...base, checkinCount: 2 }) === true)

// Po zamknięciu (Nie teraz / inne działanie) — nie pokazujemy ponownie.
check('zamknięta → brak ponownego pokazania (count 2)',
  shouldShowAccountPrompt({ ...base, dismissed: true, checkinCount: 2 }) === false)
check('zamknięta → brak ponownego pokazania (count 3)',
  shouldShowAccountPrompt({ ...base, dismissed: true, checkinCount: 3 }) === false)

// Zalogowany użytkownik — nigdy nie pokazujemy propozycji.
check('zalogowany → brak propozycji',
  shouldShowAccountPrompt({ ...base, isLoggedIn: true, checkinCount: 5 }) === false)

// Supabase nieskonfigurowany — konto nie ma sensu, brak propozycji.
check('brak konfiguracji Supabase → brak propozycji',
  shouldShowAccountPrompt({ ...base, supabaseConfigured: false, checkinCount: 2 }) === false)

console.log(`\nWyniki: ${passed} PASS, ${failed} FAIL`)
if (failed > 0) process.exit(1)
