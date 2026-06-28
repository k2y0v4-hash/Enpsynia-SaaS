/* global process */
// Testy mapowania danych check-inu (czyste funkcje) — plan sekcja 8.
// Uruchom: node src/lib/checkinMapping.test.js  (lub npm test)

import { toCheckinRow, toHistoryEntry, avgScore, ANSWER_KEYS } from './checkinMapping.js'

let passed = 0
let failed = 0

function check(name, cond) {
  if (cond) { console.log(`[PASS]    ${name}`); passed++ }
  else { console.log(`[FAIL]    ${name}`); failed++ }
}

const answers = { energy: 3, overload: 4, paralysis: 5, movement: 2, social: 3, agency: 4 }
const result = { dayType: 'Wyciszenia', microaction: { title: '5 minut bez niczego', steps: ['a', 'b'] } }

// --- toCheckinRow ---
const row = toCheckinRow('user-123', answers, result)
check('toCheckinRow: user_id', row.user_id === 'user-123')
check('toCheckinRow: 6 odpowiedzi 1:1', ANSWER_KEYS.every(k => row[k] === answers[k]))
check('toCheckinRow: day_type z wyniku', row.day_type === 'Wyciszenia')
check('toCheckinRow: microaction_title z wyniku', row.microaction_title === '5 minut bez niczego')
check('toCheckinRow: nie zapisuje steps/microactionKey', !('steps' in row) && !('microactionKey' in row))
check('toCheckinRow: nie zapisuje score', !('score' in row))

// --- avgScore ---
check('avgScore: 3,4,5,2,3,4 → round(21/6)=4', avgScore(answers) === 4)
check('avgScore: same 3 → 3', avgScore({ energy: 3, overload: 3, paralysis: 3, movement: 3, social: 3, agency: 3 }) === 3)

// --- toHistoryEntry ---
const dbRow = {
  id: 42,
  energy: 3, overload: 4, paralysis: 5, movement: 2, social: 3, agency: 4,
  day_type: 'Wyciszenia',
  microaction_title: '5 minut bez niczego',
  created_at: '2026-06-28T10:00:00.000Z',
}
const entry = toHistoryEntry(dbRow)
check('toHistoryEntry: id jako string', entry.id === '42')
check('toHistoryEntry: timestamp = created_at', entry.timestamp === '2026-06-28T10:00:00.000Z')
check('toHistoryEntry: dayType', entry.dayType === 'Wyciszenia')
check('toHistoryEntry: microactionTitle', entry.microactionTitle === '5 minut bez niczego')
check('toHistoryEntry: score policzony', entry.score === 4)
check('toHistoryEntry: answers odtworzone', ANSWER_KEYS.every(k => entry.answers[k] === answers[k]))

// --- round-trip: answers przetrwają zapis i odczyt ---
// Wiersz w bazie ma te same kolumny co toCheckinRow + id/created_at nadane przez bazę.
const rt = toHistoryEntry({ id: 1, created_at: 'x', ...toCheckinRow('u', answers, result) })
check('round-trip: answers zachowane', ANSWER_KEYS.every(k => rt.answers[k] === answers[k]))

console.log(`\nWyniki: ${passed} PASS, ${failed} FAIL`)
if (failed > 0) process.exit(1)
