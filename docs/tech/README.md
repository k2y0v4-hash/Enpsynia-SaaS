# Technical Documentation Index

Ten katalog jest indeksem dokumentów technicznych i konfiguracji. Nie duplikuje pełnej treści dokumentów.

## Stack (stan aktualny — wdrożony)

- **React 19 + Vite** — frontend, komponenty funkcyjne i hooki.
- **Tailwind CSS v4 + Shadcn UI (Base UI)** — stylowanie, mobile-first.
- **Supabase Auth (e-mail + hasło)** — konta opcjonalne, potwierdzenie e-maila.
- **PostgreSQL + RLS** — tabele `profiles` i `check_ins`; dostęp tylko do własnych rekordów
  (SELECT/INSERT), brak UPDATE/DELETE, brak dostępu `anon`.
- **Model hybrydowy** — anonimowy użytkownik → `localStorage`; zalogowany → Supabase.
- **Vercel** — hosting, auto-deploy z `main` (produkcja) i z PR (preview).
- **GA4 po zgodzie** — analytics ładowane wyłącznie po akceptacji w banerze zgody (ADR 002).
- **CSP** — `vercel.json` `connect-src` dopuszcza host Supabase (inaczej żądania Auth/REST są blokowane).
- **Sekrety i zmienne środowiskowe** — frontend używa wyłącznie `VITE_SUPABASE_URL` i
  `VITE_SUPABASE_PUBLISHABLE_KEY` (oraz `VITE_GA4_ID`). Zakaz `service_role`/`sb_secret_*`/hasła
  bazy/connection stringa w kodzie i repo.

## Źródła (aktualne)

- `docs/architecture/tech-stack.md` — stack, struktura `src/`, schemat localStorage, schemat Supabase.
- `docs/architecture/system_overview.md` — przegląd systemu, komponenty, przepływy i granice.
- `docs/architecture/adr_002_ga4_after_consent.md` — decyzja: GA4 po zgodzie.
- `docs/architecture/adr_003_supabase_accounts.md` — **aktualna główna decyzja**: model hybrydowy
  (konta Supabase obok localStorage); zastępuje ADR 001 w części trwałości danych.
- `docs/architecture/supabase-vercel-setup.md` — konfiguracja Supabase + Vercel, status wdrożenia, testy ręczne.
- `supabase/migrations/0001_init_auth_and_checkins.sql` — migracja: tabele, indeks, RLS, polityki,
  granty, trigger profilu.
- `vercel.json` — nagłówki bezpieczeństwa i CSP (w tym host Supabase).
- `.env.example` — szablon zmiennych `VITE_GA4_ID`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.
- `package.json` — skrypty npm i zależności projektu.
- `AGENTS.md` — reguły pracy AI, stack i zasady implementacji.
- `.github/dependabot.yml` — konfiguracja Dependabot dla npm i GitHub Actions.

## Materiał historyczny (nie jako aktualna decyzja)

- `docs/architecture/adr_001_local_storage_first.md` — decyzja localStorage-first, **Superseded by ADR 003**.

## Zasada użycia

Zmiany techniczne powinny wynikać z zatwierdzonego planu w `docs/plans/PLAN_*.md`. Jeśli zmiana wpływa
na architekturę, dodaj lub zaktualizuj ADR. Zmiany schematu bazy/polityk wprowadzaj wyłącznie przez
nowe pliki migracyjne w `supabase/migrations/` (nie edytuj już zastosowanej migracji `0001`).
