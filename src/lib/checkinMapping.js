// Mapowanie danych check-inu — czyste funkcje (bez React, bez Supabase).
// Wydzielone, żeby były testowalne w `npm test` i wspólne dla zapisu lokalnego i Supabase.
//
// Kształt wpisu historii jest zgodny z tym, czego oczekuje HistoryScreen.jsx:
//   { id, timestamp, answers, score, dayType, microactionTitle }
// dzięki czemu historia anonimowa (localStorage) i zalogowana (Supabase) renderują się tak samo.

export const ANSWER_KEYS = ['energy', 'overload', 'paralysis', 'movement', 'social', 'agency']

// Zaokrąglona średnia 6 odpowiedzi — identyczna z dotychczasową logiką useLocalStorage.
export function avgScore(answers) {
  const values = ANSWER_KEYS.map(key => answers[key])
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}

// answers + wynik analizy → wiersz tabeli public.check_ins (do INSERT w Supabase).
// Zapisujemy 6 odpowiedzi oraz wynik (day_type, microaction_title) — decyzja właściciela D3.
export function toCheckinRow(userId, answers, result) {
  return {
    user_id: userId,
    energy: answers.energy,
    overload: answers.overload,
    paralysis: answers.paralysis,
    movement: answers.movement,
    social: answers.social,
    agency: answers.agency,
    day_type: result.dayType,
    microaction_title: result.microaction.title,
  }
}

// Wiersz z Supabase → wpis historii w kształcie oczekiwanym przez HistoryScreen.
export function toHistoryEntry(row) {
  const answers = {
    energy: row.energy,
    overload: row.overload,
    paralysis: row.paralysis,
    movement: row.movement,
    social: row.social,
    agency: row.agency,
  }
  return {
    id: String(row.id),
    timestamp: row.created_at,
    answers,
    score: avgScore(answers),
    dayType: row.day_type,
    microactionTitle: row.microaction_title,
  }
}
