# GA4 Consent

Status: backfilled, implemented.

## 1. Cel

Aplikacja mierzy podstawowe eventy produktowe w GA4 wyłącznie po zgodzie użytkownika.

## 2. Zakres

### Wchodzi w zakres

- Przechowanie decyzji użytkownika o analytics.
- Ładowanie GA4 dopiero po zgodzie.
- No-op tracking przed zgodą, po odrzuceniu lub bez `VITE_GA4_ID`.
- Eventy: `form_start`, `result_shown`, `feedback_helpful`.

### Nie wchodzi w zakres

- Wysyłanie pełnych odpowiedzi check-inu.
- Wysyłanie historii check-inów.
- Wysyłanie danych osobowych.
- Inne narzędzia analytics.
- Consent Management Platform poza prostym MVP.

## 3. Wymagania funkcjonalne

- Użytkownik może zaakceptować lub odrzucić analytics.
- Decyzja jest zapisana lokalnie.
- GA4 ładuje się dopiero po akceptacji.
- Jeśli `VITE_GA4_ID` nie istnieje, GA4 nie ładuje się.
- Eventy są wysyłane tylko, gdy `window.gtag` istnieje.

## 4. Wymagania niefunkcjonalne

- Minimalizacja danych.
- Brak pełnych odpowiedzi check-inu w GA4.
- Brak mikroakcji jako danych analitycznych, jeśli mogłoby to zwiększyć szczegółowość profilu użytkownika.
- Zewnętrzny skrypt GA4 jest jedynym dopuszczonym skryptem Etapu 1.

## 5. Kontekst techniczny

- Implementacja zgody: `src/hooks/useConsent.js`.
- Implementacja analytics: `src/lib/analytics.js`.
- Użycie w aplikacji: `src/App.jsx`, ekrany wyników.
- Konfiguracja: `.env.example`, Vercel env `VITE_GA4_ID`.
- Źródła: `README.md`, `AGENTS.md`, `docs/product/implementation-plan.md`.

## 6. Kroki implementacji

1. Dodać hook zgody analytics.
2. Dodać helper GA4 z lazy loadingiem.
3. Podłączyć inicjalizację po zgodzie.
4. Podłączyć minimalne eventy produktowe.
5. Sprawdzić brak ładowania GA4 przed zgodą i po odrzuceniu.
6. Udokumentować konfigurację `VITE_GA4_ID`.

## 7. Kryteria akceptacji

- Przed zgodą skrypt GA4 nie jest pobierany.
- Po odrzuceniu skrypt GA4 nie jest pobierany.
- Po akceptacji i przy ustawionym `VITE_GA4_ID` GA4 może zostać zainicjalizowane.
- Eventy nie zawierają pełnych odpowiedzi check-inu.

## 8. Testy

- Ręcznie: sprawdzić Network tab przed zgodą.
- Ręcznie: zaakceptować i sprawdzić inicjalizację GA4 przy ustawionym `VITE_GA4_ID`.
- Ręcznie: odrzucić i sprawdzić brak skryptu GA4.
- Automatycznie: `npm test`.
- Build: `npm run build`.
