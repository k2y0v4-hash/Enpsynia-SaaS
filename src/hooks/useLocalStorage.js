import { useState } from 'react'

const HISTORY_KEY = 'enpsyneia_history'
const STREAK_KEY = 'enpsyneia_streak'

function toDateStr(date) {
  return date.toISOString().split('T')[0]
}

function readStreak() {
  try {
    const raw = localStorage.getItem(STREAK_KEY)
    if (!raw) return 0
    const data = JSON.parse(raw)
    return typeof data?.currentStreak === 'number' ? data.currentStreak : 0
  } catch {
    return 0
  }
}

function computeAndSaveStreak() {
  const today = toDateStr(new Date())
  try {
    const raw = localStorage.getItem(STREAK_KEY)
    const data = raw ? JSON.parse(raw) : {}
    const lastCheckIn = data?.lastCheckIn ?? null
    const current = typeof data?.currentStreak === 'number' ? data.currentStreak : 0

    // Ten sam dzień — streak bez zmiany
    if (lastCheckIn === today) return current

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = toDateStr(yesterday)

    const newStreak = lastCheckIn === yesterdayStr ? current + 1 : 1

    localStorage.setItem(STREAK_KEY, JSON.stringify({ currentStreak: newStreak, lastCheckIn: today }))
    return newStreak
  } catch {
    return 1
  }
}

function saveHistory(answers, result) {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    let history = []
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) history = parsed
    }

    const entry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      answers,
      result: { dayType: result.dayType, microAction: result.microaction },
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...history].slice(0, 5)))
  } catch {
    // Historia to nice-to-have — błąd zapisu nie blokuje działania aplikacji
  }
}

export function useLocalStorage() {
  const [streak, setStreak] = useState(readStreak)

  function saveCheckIn(answers, result) {
    saveHistory(answers, result)
    const newStreak = computeAndSaveStreak()
    setStreak(newStreak)
  }

  return { streak, saveCheckIn }
}
