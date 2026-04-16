// GA4 analytics helper — Enpsyneia Check In
// Konfiguracja: ustaw VITE_GA4_ID w .env.local (dev) lub w zmiennych środowiskowych Vercel (produkcja)
// Format: VITE_GA4_ID=G-XXXXXXXXXX
//
// GA4 jest ładowany tylko gdy VITE_GA4_ID jest ustawiony.
// Brak zmiennej → GA4 nie jest ładowany, eventy są cicho pomijane.

const GA4_ID = import.meta.env.VITE_GA4_ID

if (GA4_ID) {
  // Inicjalizacja dataLayer i gtag przed załadowaniem skryptu,
  // żeby eventy wysłane przed ładowaniem skryptu trafiły do kolejki.
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA4_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(script)
}

export function trackEvent(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
