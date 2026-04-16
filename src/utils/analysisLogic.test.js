/* global process */
// Weryfikacja — 16 przypadków testowych z docs/product/analysis-logic.md sekcja 8
// Uruchom: npm test  lub  node src/utils/analysisLogic.test.js

import { analyzeCheckIn } from './analysisLogic.js'

const CASES = [
  { id:  1, energy:5, overload:2, movement:4, social:3, agency:4, paralysis:1, expectedType:'Działania',    expectedKey:'A' },
  { id:  2, energy:4, overload:2, movement:2, social:3, agency:4, paralysis:2, expectedType:'Działania',    expectedKey:'B' },
  { id:  3, energy:2, overload:5, movement:1, social:1, agency:2, paralysis:3, expectedType:'Wyciszenia',   expectedKey:'A' },
  { id:  4, energy:3, overload:4, movement:3, social:4, agency:3, paralysis:2, expectedType:'Wyciszenia',   expectedKey:'B' },
  { id:  5, energy:1, overload:2, movement:1, social:2, agency:1, paralysis:2, expectedType:'Odbudowy',     expectedKey:'A' },
  { id:  6, energy:2, overload:2, movement:2, social:2, agency:2, paralysis:2, expectedType:'Odbudowy',     expectedKey:'A' },
  { id:  7, energy:3, overload:2, movement:2, social:5, agency:3, paralysis:2, expectedType:'Kontaktu',     expectedKey:'B' },
  { id:  8, energy:4, overload:2, movement:3, social:5, agency:4, paralysis:2, expectedType:'Kontaktu',     expectedKey:'A' },
  { id:  9, energy:2, overload:5, movement:2, social:2, agency:2, paralysis:5, expectedType:'Przeciążenia', expectedKey:'A' },
  { id: 10, energy:3, overload:4, movement:3, social:2, agency:3, paralysis:4, expectedType:'Przeciążenia', expectedKey:'B' },
  { id: 11, energy:3, overload:3, movement:3, social:3, agency:3, paralysis:3, expectedType:'Odbudowy',     expectedKey:'B' },
  { id: 12, energy:5, overload:5, movement:5, social:5, agency:5, paralysis:5, expectedType:'Przeciążenia', expectedKey:'B' },
  { id: 13, energy:5, overload:4, movement:5, social:5, agency:5, paralysis:4, expectedType:'Przeciążenia', expectedKey:'B' },
  // #14 — social=5 wyzwala KROK 3 (Kontaktu) przed KROK 4 (Działania) — per algorytm sekcji 3
  { id: 14, energy:5, overload:2, movement:5, social:5, agency:5, paralysis:1, expectedType:'Kontaktu',     expectedKey:'A' },
  { id: 15, energy:1, overload:1, movement:1, social:1, agency:1, paralysis:1, expectedType:'Odbudowy',     expectedKey:'A' },
  // #16 — edge case: niskie zasoby, ale wysoka potrzeba ruchu → mikroakcja B (ruch zamiast odpoczynku)
  { id: 16, energy:1, overload:2, movement:5, social:3, agency:2, paralysis:1, expectedType:'Odbudowy',     expectedKey:'B' },
]

let passed = 0
let failed = 0

for (const c of CASES) {
  const result = analyzeCheckIn({
    energy: c.energy,
    overload: c.overload,
    movement: c.movement,
    social: c.social,
    agency: c.agency,
    paralysis: c.paralysis,
  })

  const typeOk = result.dayType === c.expectedType
  const keyOk  = result.microactionKey === c.expectedKey

  if (typeOk && keyOk) {
    console.log(`[PASS]    #${c.id}: ${result.dayType} ${result.microactionKey}`)
    passed++
  } else {
    console.log(`[FAIL]    #${c.id}: got ${result.dayType} ${result.microactionKey} | expected ${c.expectedType} ${c.expectedKey}`)
    failed++
  }
}

console.log(`\nWyniki: ${passed} PASS, ${failed} FAIL`)
if (failed > 0) process.exit(1)
