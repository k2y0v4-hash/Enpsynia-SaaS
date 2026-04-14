/* global process */
// Weryfikacja ręczna — 15 przypadków testowych z 05-logika-analizy.md sekcja 8
// Uruchom: node src/utils/analysisLogic.test.js

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
  // UWAGA: przypadek #14 — sprzeczność w spec (patrz komentarz poniżej)
  { id: 14, energy:5, overload:2, movement:5, social:5, agency:5, paralysis:1, expectedType:'Działania',    expectedKey:'A' },
  { id: 15, energy:1, overload:1, movement:1, social:1, agency:1, paralysis:1, expectedType:'Odbudowy',     expectedKey:'A' },
]

// Przypadek #14 — SPRZECZNOŚĆ W SPEC:
// Algorytm z sekcji 3: KROK 3 (social=5 ≥ 4 AND overload=2 ≤ 3) → Kontaktu
// Tabela testowa z sekcji 8: oczekiwany wynik = Działania
// Implementacja stosuje algorytm z sekcji 3 (Kontaktu) — sekcja 3 jest nadrzędna.
// Faktyczny wynik: Kontaktu A (energy=5 ≥ 4 → A)
// Do rozstrzygnięcia przez właściciela projektu.

let passed = 0
let failed = 0
let flagged = 0

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

  if (c.id === 14) {
    // Znana sprzeczność — nie liczymy jako FAIL, ale flagujemy
    console.log(`[FLAGGED] #${c.id}: algorytm → ${result.dayType} ${result.microactionKey} | spec tabela → ${c.expectedType} ${c.expectedKey}`)
    flagged++
  } else if (typeOk && keyOk) {
    console.log(`[PASS]    #${c.id}: ${result.dayType} ${result.microactionKey}`)
    passed++
  } else {
    console.log(`[FAIL]    #${c.id}: got ${result.dayType} ${result.microactionKey} | expected ${c.expectedType} ${c.expectedKey}`)
    failed++
  }
}

console.log(`\nWyniki: ${passed} PASS, ${failed} FAIL, ${flagged} FLAGGED`)
if (failed > 0) process.exit(1)
