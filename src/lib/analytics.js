// GA4 analytics helper — Enpsyneia Check In
// Konfiguracja: ustaw VITE_GA4_ID w .env.local (dev) lub w zmiennych środowiskowych Vercel (produkcja)
// Format: VITE_GA4_ID=G-XXXXXXXXXX
//
// GA4 jest ładowany tylko po wyrażeniu zgody przez użytkownika (initGA4).
// Przed zgodą lub po odrzuceniu — GA4 nie jest ładowany, trackEvent jest no-op.
// Brak zmiennej VITE_GA4_ID → GA4 nigdy nie jest ładowany.

const GA4_ID = import.meta.env.VITE_GA4_ID

export function initGA4() {
  if (!GA4_ID) return
  if (window.__ga4Loaded) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA4_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(script)

  window.__ga4Loaded = true
}

export function trackEvent(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
