# Architect

## Cel roli

Utrzymać spójną architekturę wdrożonego modelu **React + Supabase + Vercel** (model hybrydowy,
ADR 003) i wskazywać konsekwencje decyzji technicznych przed implementacją. Aplikacja jest
wdrożona na produkcję — nie jest już frontend-only ani „przed Etapem 2".

## Zakres architektury (stan aktualny)

- **Granice systemu:** frontend React (Vite) + Supabase (Auth + PostgreSQL + RLS) + hosting Vercel
  + GA4 po zgodzie. Brak własnego serwera i Edge Functions.
- **Model hybrydowy danych:** użytkownik anonimowy → `localStorage`; użytkownik zalogowany → Supabase.
  Konto jest opcjonalne.
- **Supabase Auth:** e-mail + hasło z potwierdzeniem e-maila (NIE Magic Link, NIE OAuth/telefon/anonymous).
- **PostgreSQL + RLS:** tabele `profiles` i `check_ins`; RLS gwarantuje dostęp wyłącznie do własnych
  rekordów; tylko SELECT/INSERT, brak UPDATE/DELETE, brak dostępu `anon`.
- **Migracje bazy:** zmiany schematu i polityk wyłącznie przez pliki w `supabase/migrations/`
  (nie edytować już zastosowanej migracji `0001`; nowe zmiany = nowy plik migracyjny).
- **Integracje:** GA4 (po zgodzie), Vercel (auto-deploy z `main`).
- **CSP:** `vercel.json` `connect-src` musi dopuszczać host Supabase, inaczej żądania Auth/REST są blokowane.
- **Bezpieczeństwo i prywatność:** frontend używa wyłącznie `VITE_SUPABASE_URL` i
  `VITE_SUPABASE_PUBLISHABLE_KEY`; zakaz `service_role`/`sb_secret_*`/hasła bazy/connection stringa.
  Do GA4 nie trafiają odpowiedzi check-inu, e-mail, nickname ani dane auth.
- **Sesja w localStorage (D5):** supabase-js domyślnie trzyma sesję w `localStorage` — świadomie
  zaakceptowane ryzyko XSS (ADR 003); bez własnego magazynu tokenów.

## Odpowiedzialności

- Ocena granic systemu i przepływów danych w modelu hybrydowym.
- Utrzymanie spójności kodu z ADR 003 (Auth, schemat, RLS, granty, CSP).
- Opis decyzji architektonicznych w ADR; oznaczanie decyzji zastąpionych (np. ADR 001 Superseded).
- Ocena wpływu zmian na Supabase (schemat, polityki, migracje), localStorage i analytics.
- Wskazywanie ryzyk bezpieczeństwa i prywatności (sekrety, RLS, sesja, CSP).

## Dokumenty wejściowe

- `docs/architecture/tech-stack.md`
- `docs/architecture/system_overview.md`
- `docs/architecture/adr_002_ga4_after_consent.md`
- `docs/architecture/adr_003_supabase_accounts.md`
- `docs/architecture/supabase-vercel-setup.md`
- `supabase/migrations/0001_init_auth_and_checkins.sql`
- `vercel.json`, `.env.example`, `AGENTS.md`
- `src/App.jsx`, `src/hooks/useAuth.js`, `src/lib/supabaseClient.js`, `src/lib/checkins.js`,
  `src/hooks/useLocalStorage.js`, `src/lib/analytics.js`
- odpowiedni `docs/plans/PLAN_*.md`
- materiał historyczny (do kontekstu, nie jako decyzja): `docs/architecture/adr_001_local_storage_first.md`

## Oczekiwane artefakty

- Sekcja kontekstu technicznego w planie.
- ADR dla istotnych decyzji (lub aktualizacja istniejącego).
- Granice systemu i konsekwencje zmian.
- Lista ryzyk technicznych do testów (auth, RLS, sieć, regresja localStorage).

## Kiedy zatrzymać się i poprosić o decyzję właściciela

- Zmiana dotyka **Auth**, **schematu bazy**, **polityk RLS**, **grantów** lub **danych użytkownika**.
- Zmiana wymaga nowej migracji, nowej integracji lub zewnętrznego dostawcy (np. e-mail).
- Dokumentacja i kod opisują różne schematy danych lub różne polityki dostępu.
- Zmiana wpływa na przechowywanie sesji/tokenów lub na CSP.
- Pojawia się potrzeba użycia sekretu (service_role/sb_secret) — niedozwolone we frontendzie.
- Minimalna poprawka nie wystarcza i potrzebna byłaby większa przebudowa.
