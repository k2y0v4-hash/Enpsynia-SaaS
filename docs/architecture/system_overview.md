# System Overview — Enpsyneia Check In

## Cel systemu

Enpsyneia Check In pomaga użytkownikowi wykonać krótki check-in, nazwać aktualny stan i otrzymać jedną mikroakcję do wykonania od razu.

Etap 1 jest aplikacją frontendową bez kont użytkowników i bez backendu. Dane użytkownika są przechowywane lokalnie w przeglądarce.

## Główne komponenty

- `src/App.jsx` — routing ekranów i orkiestracja flow.
- `src/components/Landing.jsx` — ekran startowy i zgoda analytics.
- `src/components/CheckInForm.jsx` — formularz 6 suwaków.
- `src/utils/analysisLogic.js` — deterministyczna logika typu dnia i mikroakcji.
- `src/components/DayTypeScreen.jsx` — ekran typu dnia.
- `src/components/MicroActionScreen.jsx` — ekran mikroakcji i feedbacku.
- `src/components/HistoryScreen.jsx` — lokalna historia check-inów.
- `src/hooks/useLocalStorage.js` — zapis i odczyt historii.
- `src/hooks/useConsent.js` — stan zgody analytics.
- `src/lib/analytics.js` — inicjalizacja GA4 i wysyłka eventów.

## Przepływ użytkownika

1. Użytkownik otwiera landing page.
2. Użytkownik podejmuje decyzję dotyczącą analytics, jeśli nie zrobił tego wcześniej.
3. Użytkownik rozpoczyna check-in.
4. Użytkownik odpowiada na 6 pytań w dwóch blokach.
5. Aplikacja oblicza typ dnia i mikroakcję.
6. Użytkownik widzi typ dnia i uzasadnienie.
7. Użytkownik przechodzi do mikroakcji.
8. Użytkownik może przekazać feedback i rozpocząć nowy check-in.
9. Użytkownik może przejść do menu, historii, informacji o projekcie, sugestii, prywatności i regulaminu.

## Przepływ danych

- Odpowiedzi formularza pozostają w stanie React do momentu obliczenia wyniku.
- `analyzeCheckIn` otrzymuje 6 wartości liczbowych i zwraca wynik.
- Po ukończeniu check-inu aplikacja zapisuje wpis historii w `localStorage`.
- Decyzja analytics jest zapisywana w `localStorage`.
- GA4 otrzymuje tylko minimalne eventy produktowe po zgodzie użytkownika.

## Granice systemu

- System działa w jednej przeglądarce i na jednym urządzeniu.
- System nie ma backendu.
- System nie synchronizuje danych między urządzeniami.
- System nie ma kont użytkowników.
- System nie przechowuje sekretów ani tokenów dostępowych.

## Czego system nie robi w Etapie 1

- Nie diagnozuje medycznie ani psychologicznie.
- Nie zastępuje specjalistycznego wsparcia.
- Nie wysyła pełnych odpowiedzi check-inu do GA4.
- Nie zapisuje danych w bazie danych.
- Nie ma Supabase, auth ani Resend.
- Nie ma push notifications.
- Nie ma dark mode.
- Nie ma share buttons.
- Nie ma personalizacji rekomendacji.
- Nie ma pattern observations ani wykresów.
