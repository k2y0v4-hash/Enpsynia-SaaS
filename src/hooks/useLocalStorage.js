import { useState } from 'react'

const HISTORY_KEY = 'enpsyneia_history'
const MAX_ENTRIES = 5

function readHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function avgScore(answers) {
  const values = Object.values(answers)
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}

const POLISH_DAYS = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']

export function relativeDateLabel(timestamp) {
  const now = new Date()
  const past = new Date(timestamp)
  const today = now.toISOString().split('T')[0]
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]
  const pastStr = past.toISOString().split('T')[0]

  if (pastStr === today) return 'Dziś'
  if (pastStr === yesterdayStr) return 'Wczoraj'
  return POLISH_DAYS[past.getDay()]
}

export function useLocalStorage() {
  const [history, setHistory] = useState(readHistory)

  function saveCheckIn(answers, result) {
    try {
      const entry = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        answers,
        score: avgScore(answers),
        dayType: result.dayType,
        microactionTitle: result.microaction.title,
      }
      const newHistory = [entry, ...readHistory()].slice(0, MAX_ENTRIES)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
      setHistory(newHistory)
    } catch {
      // Historia to nice-to-have — błąd zapisu nie blokuje flow
    }
  }

  return { history, saveCheckIn }
}
