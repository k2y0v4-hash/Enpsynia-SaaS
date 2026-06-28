# Przypadki użycia

Dokument porządkujący — opisuje wdrożone przepływy. Źródła: `docs/architecture/system_overview.md`,
ADR 003, `docs/architecture/supabase-vercel-setup.md`, `docs/product/mvp-scope.md`.

## UC1 — Anonimowy check-in
Użytkownik bez konta wypełnia 6 pytań → aplikacja liczy typ dnia i mikroakcję → wynik zapisywany
lokalnie (`localStorage`, historia limit 5).

## UC2 — Propozycja konta po drugim check-inie
Po ukończeniu 2. anonimowego check-inu pojawia się jednorazowa, nieblokująca propozycja konta
(Utwórz konto / Zaloguj się / Nie teraz). Zamknięcie zapisywane lokalnie — brak ponownego pokazania.

## UC3 — Rejestracja
Użytkownik podaje nickname + e-mail + hasło. Trigger `handle_new_user` tworzy profil z metadanych.
Pojawia się ekran „Sprawdź swoją skrzynkę".

## UC4 — Potwierdzenie e-maila
Użytkownik klika link potwierdzający. Logowanie przed potwierdzeniem jest zablokowane.

## UC5 — Logowanie
Użytkownik loguje się e-mailem i hasłem; sesja utrzymywana domyślnym mechanizmem supabase-js.

## UC6 — Zapis check-inu do Supabase (zalogowany)
Po ukończeniu check-inu wynik jest zapisywany do `check_ins` (INSERT własnego rekordu, RLS).
Błąd zapisu → jawny ekran błędu z opcją ponów; brak fałszywego sukcesu i cichego zapisu lokalnego.

## UC7 — Odczyt historii
Zalogowany: historia z Supabase (własne rekordy, RLS). Anonimowy: historia z `localStorage` (limit 5).

## UC8 — Wylogowanie
Użytkownik się wylogowuje → wraca do landing, historia konta znika z widoku; lokalna historia
pozostaje nietknięta (brak migracji).

## UC9 — Odrzucenie analytics
Użytkownik odrzuca zgodę w banerze → GA4 nie jest ładowane; aplikacja działa normalnie.
Decyzja zapisywana w `localStorage`.
