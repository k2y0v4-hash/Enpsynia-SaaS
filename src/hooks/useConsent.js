import { useState } from 'react'

const CONSENT_KEY = 'enpsyneia_analytics_consent'

function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) // null | 'accepted' | 'rejected'
  } catch {
    return null
  }
}

export function useConsent() {
  const [consent, setConsent] = useState(readConsent)

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, 'accepted') } catch {
      // Consent state still updates in memory when localStorage is unavailable.
    }
    setConsent('accepted')
  }

  function reject() {
    try { localStorage.setItem(CONSENT_KEY, 'rejected') } catch {
      // Consent state still updates in memory when localStorage is unavailable.
    }
    setConsent('rejected')
  }

  return { consent, accept, reject }
}
