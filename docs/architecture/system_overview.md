# System Overview — Enpsyneia Check In

## Cel systemu

Enpsyneia Check In pomaga użytkownikowi wykonać krótki check-in, nazwać aktualny stan i otrzymać jedną mikroakcję do wykonania od razu.

Aplikacja działa w modelu hybrydowym (ADR 003): użytkownik anonimowy przechowuje dane lokalnie
w przeglądarce, a użytkownik zalogowany — trwale w Supabase (PostgreSQL + RLS). Konto jest opcjonalne
i nie jest wymagane do korzystania z aplikacji.

## Główne komponenty

- `src/App.jsx` — routing ekranów i orkiestracja flow.
- `src/components/Landing.jsx` — ekran startowy i zgoda analytics.
- `src/components/CheckInForm.jsx` — formularz 6 suwaków.
- `src/utils/analysisLogic.js` — deterministyczna logika typu dnia i mikroakcji.
- `src/components/DayTypeScreen.jsx` — ekran typu dnia.
- `src/components/MicroActionScreen.jsx` — ekran mikroakcji i feedbacku.
- `src/components/HistoryScreen.jsx` — lokalna historia check-inów.
- `src/hooks/useLocalStorage.js` — zapis i odczyt historii anonimowej (limit 5) + licznik check-inów.
- `src/hooks/useAuth.js` — Supabase Auth: rejestracja, logowanie, wylogowanie, sesja.
- `src/hooks/useConsent.js` — stan zgody analytics.
- `src/lib/supabaseClient.js` — klient Supabase (null-safe).
- `src/lib/checkins.js` + `src/lib/checkinMapping.js` — zapis/odczyt check-inów konta i mapowanie danych.
- `src/lib/accountPrompt.js` — logika jednorazowej propozycji konta.
- `src/components/SignUpScreen.jsx`, `SignInScreen.jsx`, `AccountPromptScreen.jsx`, `SaveStatusScreens.jsx` — ekrany auth i statusu zapisu.
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
- Po ukończeniu check-inu: anonimowy → zapis do `localStorage`; zalogowany → INSERT do Supabase.
- Błąd zapisu do Supabase nie jest prezentowany jako sukces i nie jest po cichu zapisywany lokalnie.
- Historia: anonimowy → `localStorage` (limit 5); zalogowany → SELECT własnych rekordów z Supabase.
- Po 2. anonimowym check-inie pojawia się jednorazowa, nieblokująca propozycja konta.
- Decyzja analytics jest zapisywana w `localStorage`.
- GA4 otrzymuje tylko minimalne eventy produktowe po zgodzie użytkownika — bez odpowiedzi check-inu, e-maila, nicknamea i danych auth.

## Granice systemu

- Użytkownik anonimowy: dane tylko w jednej przeglądarce, bez synchronizacji.
- Użytkownik zalogowany: dane trwałe w Supabase, dostępne na wielu urządzeniach.
- Backend ogranicza się do Supabase (Auth + PostgreSQL + RLS) — brak własnego serwera i Edge Functions.
- RLS gwarantuje dostęp wyłącznie do własnych danych; brak UPDATE/DELETE i brak dostępu dla `anon`.
- Frontend przechowuje sesję domyślnym mechanizmem supabase-js (localStorage) — bez własnego magazynu tokenów; bez sekretów (service_role/sb_secret_*) w kodzie.
- Brak migracji historii lokalnej do konta; brak resetu hasła (świadome ograniczenia etapu).

## Czego system nie robi

- Nie diagnozuje medycznie ani psychologicznie.
- Nie zastępuje specjalistycznego wsparcia.
- Nie wysyła pełnych odpowiedzi check-inu (ani danych auth) do GA4.
- Nie umożliwia edycji ani usuwania check-inów i nicknamea.
- Nie resetuje hasła ani nie odzyskuje konta.
- Nie migruje historii lokalnej do konta.
- Nie ma OAuth, magic linku, logowania telefonem, anonymous sign-in, account linkingu, Resend.
- Nie ma ról, panelu admina, streaków w bazie, Edge Functions ani własnego serwera.
- Nie ma push notifications, dark mode, share buttons, personalizacji, wykresów historii.
