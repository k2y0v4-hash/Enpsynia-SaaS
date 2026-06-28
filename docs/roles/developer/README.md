# Developer

## Cel roli

Implementować dokładnie zakres zatwierdzonego planu, zgodnie z wdrożonym modelem
**React + Supabase + Vercel**, bez rozszerzania funkcjonalności poza kontrakt planu.

## Odpowiedzialności

- Czytanie planu przed kodem; implementacja zgodna z istniejącymi wzorcami repo.
- **Frontend React** (Vite + Tailwind + Shadcn), funkcyjne komponenty i hooki.
- **Integracja z Supabase** przez `src/lib/supabaseClient.js` / `useAuth` / `checkins.js`:
  - dla anonimowego użytkownika → `localStorage` (`useLocalStorage`); dla zalogowanego → Supabase;
  - **respektowanie RLS** — nie obchodzić polityk, nie zakładać dostępu do cudzych danych;
  - błąd zapisu do Supabase prezentować jawnie, nie jako fałszywy sukces i bez cichego fallbacku do localStorage.
- **Zakaz sekretów we frontendzie:** używać wyłącznie `VITE_SUPABASE_URL` i `VITE_SUPABASE_PUBLISHABLE_KEY`;
  nigdy `service_role`, `sb_secret_*`, hasła bazy ani connection stringa. Nie commitować `.env.local`.
- **Migracje bazy:** zmiany schematu/polityk wyłącznie przez **nowe pliki migracyjne** w
  `supabase/migrations/` — nie edytować już zastosowanej migracji `0001`.
- **Testy:** `npm test`, `npm run lint`, `npm run build` przed zgłoszeniem ukończenia.
- Aktualizacja rejestrów (`implemented_plans.md`, `implemented_features.md`) po implementacji.
- Zgłaszanie sprzeczności zamiast samodzielnego rozstrzygania; brak rozszerzania zakresu.

## Dokumenty wejściowe

- odpowiedni `docs/plans/PLAN_*.md`
- `implemented_plans.md`, `implemented_features.md`
- `AGENTS.md`
- `docs/architecture/adr_003_supabase_accounts.md`, `docs/architecture/supabase-vercel-setup.md`,
  `docs/architecture/tech-stack.md` (gdy zmiana dotyka Supabase/architektury)
- `supabase/migrations/0001_init_auth_and_checkins.sql` (jako wzorzec dla nowych migracji)
- istniejący kod modułów objętych zmianą

## Oczekiwane artefakty

- Kod zgodny z planem.
- Nowy plik migracyjny (jeśli zmiana dotyka bazy).
- Aktualizacja `implemented_plans.md` i `implemented_features.md`.
- Krótki raport testów (`npm test`/`lint`/`build`).
- Informacja, czy README lub docs wymagają aktualizacji.

## Kiedy zatrzymać się i poprosić o decyzję właściciela

- Nie ma planu dla funkcjonalności, lub plan i kod są sprzeczne.
- Implementacja wymaga wyjścia poza zakres planu, nowych zależności, backendu lub konfiguracji deployu.
- Zmiana dotyka Auth, schematu, polityk RLS, grantów lub danych użytkownika.
- Wymagane byłoby użycie sekretu we frontendzie (niedozwolone).
- Testy ujawniają nieopisane zachowanie produktu.
