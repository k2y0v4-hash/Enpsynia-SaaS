# ADR 003 — Hybrydowy model danych: konta Supabase obok localStorage

## Status

Accepted (2026-06-28). **Zastępuje ADR 001 (Local Storage First)** w części dotyczącej trwałości danych.
ADR 001 pozostaje w repo jako materiał historyczny, oznaczony jako Superseded.

## Kontekst

ADR 001 zakładał localStorage-first do czasu osiągnięcia progów walidacji (>50 użytkowników/tydzień,
>30% powrotów, prośby o synchronizację). Właściciel projektu podjął decyzję (decyzje D1–D7,
patrz `docs/plans/PLAN_supabase_auth_and_checkins.md`) o wcześniejszym wprowadzeniu kont i trwałego
przechowywania danych w Supabase, przy zachowaniu możliwie małego i bezpiecznego zakresu.

## Decyzja

Aplikacja działa w modelu **hybrydowym**:

- **Użytkownik anonimowy** — check-iny zapisywane lokalnie przez istniejący `useLocalStorage`
  (historia ograniczona do 5 wpisów). Konto nie jest wymagane do korzystania z aplikacji.
- **Użytkownik zalogowany** — nowe check-iny zapisywane do Supabase (PostgreSQL + RLS);
  historia pobierana z Supabase, dostępna na różnych urządzeniach.
- **Propozycja konta** — po ukończeniu 2. anonimowego check-inu pojawia się jednorazowa,
  nieblokująca propozycja założenia konta (Utwórz konto / Zaloguj się / Nie teraz). Decyzja
  o jej zamknięciu jest zapisywana lokalnie i propozycja nie pojawia się ponownie.

### Decyzje właściciela odwzorowane w architekturze

| ID | Decyzja |
|----|---------|
| D1 | Przejście do Supabase przed progami walidacji; ten ADR zastępuje ADR 001 |
| D2 | Klucz główny check-inów: `bigint generated always as identity` |
| D3 | Zapis wyniku w bazie: co najmniej `day_type` i `microaction_title` |
| D4 | Brak resetu hasła i odzyskiwania konta — świadome ograniczenie etapu |
| D5 | Sesja utrzymywana domyślnym mechanizmem `supabase-js` (localStorage); bez własnego magazynu tokenów |
| D6 | Klucz `enpsyneia_history` pozostaje nietknięty; brak automatycznej migracji i usuwania |
| D7 | Konto opcjonalne; pierwsze check-iny bez logowania; jednorazowa propozycja po 2. check-inie |

## Auth (zakres)

W zakresie: rejestracja (nickname + e-mail + hasło), potwierdzenie e-maila, logowanie, wylogowanie,
przywracanie sesji, czytelne stany ładowania i błędów.

Poza zakresem: reset hasła, magic link, OAuth, logowanie telefonem, anonymous sign-in Supabase,
account linking, edycja i usuwanie konta, edycja nickname.

## Model danych

`profiles`: `id` (uuid, FK → auth.users), `nickname` (text), `created_at`. Bez e-maila i hasła
(są w `auth.users`). Profil tworzony przez trigger `handle_new_user` (security definer) z metadanych
rejestracji — nieedytowalny przez klienta.

`check_ins`: `id` (bigint identity), `user_id` (uuid, FK → auth.users), 6 odpowiedzi
(`energy, overload, paralysis, movement, social, agency`, smallint, CHECK 1–5), `day_type`,
`microaction_title`, `created_at`. Indeks `(user_id, created_at desc)`.

Migracja: `supabase/migrations/0001_init_auth_and_checkins.sql`.

## Bezpieczeństwo

- RLS włączone na `profiles` i `check_ins`.
- `profiles`: tylko SELECT własnego profilu; brak INSERT/UPDATE/DELETE dla klienta.
- `check_ins`: tylko SELECT i INSERT własnych rekordów; brak UPDATE/DELETE; brak dostępu dla `anon`.
- `user_id` wymuszony przez `with check (auth.uid() = user_id)`.
- Frontend używa wyłącznie `VITE_SUPABASE_URL` i `VITE_SUPABASE_PUBLISHABLE_KEY`. Zakaz `service_role`,
  `sb_secret_*`, hasła bazy i connection stringa we frontendzie.
- Do GA4 nie trafiają odpowiedzi check-inu, e-mail, nickname ani dane auth.

### Ryzyko sesji (D5)

`supabase-js` domyślnie utrzymuje sesję w `localStorage`. Token jest wtedy czytelny dla skryptu
działającego w stronie, co stanowi ryzyko eksfiltracji w razie XSS. Środki ograniczające:

- brak `dangerouslySetInnerHTML`,
- brak nowych zewnętrznych skryptów poza GA4,
- przegląd każdego nowego inputu pod kątem XSS,
- minimalna powierzchnia kodu auth.

Wariant cookie-based (`@supabase/ssr`) wymagałby backendu i jest poza zakresem tego etapu.
Właściciel zaakceptował domyślny mechanizm wraz z opisanym ryzykiem.

## Konsekwencje

### Pozytywne

- Trwała historia i dostęp na wielu urządzeniach dla zalogowanych.
- Zachowane time-to-value: check-in bez logowania, bez tarcia na wejściu.
- Minimalny, audytowalny schemat i polityki RLS.

### Negatywne

- Brak odzyskiwania konta po zapomnieniu hasła (D4).
- Brak migracji historii lokalnej do konta (D6) — historia anonimowa i kontowa są rozłączne.
- Ryzyko XSS względem tokenów sesji w localStorage (D5) — ograniczane, nie eliminowane.
- Większy bundle frontendu o klienta Supabase.

## Powiązania

- Plan: `docs/plans/PLAN_supabase_auth_and_checkins.md`
- Migracja: `supabase/migrations/0001_init_auth_and_checkins.sql`
- Instrukcja wdrożenia i testy ręczne: `docs/architecture/supabase-vercel-setup.md`
- Zastępuje: `docs/architecture/adr_001.md` oraz `docs/architecture/adr_001_local_storage_first.md`
