# Ograniczenia biznesowe

Dokument porządkujący — zbiera świadome ograniczenia produktu. Źródła: `docs/product/mvp-scope.md`,
`docs/architecture/adr_003_supabase_accounts.md`, `docs/architecture/system_overview.md`,
`docs/context/decision-log.md`.

## Zakres i konto

- **Konto opcjonalne** — aplikacja działa bez logowania (anon → localStorage); konto daje trwałą,
  cross-device historię (zalogowany → Supabase).
- **Brak resetu hasła / odzyskiwania konta** — utrata hasła = utrata dostępu do konta (D4).
- **Brak migracji historii lokalnej do konta** — historia anonimowa i kontowa są rozłączne (D6).
- **Brak edycji i usuwania check-inów** oraz edycji nickname.
- **Brak OAuth, Magic Link, logowania telefonem, anonymous sign-in, account linkingu.**

## Dane i prywatność

- **Minimalizacja danych** — do GA4 nie trafiają odpowiedzi check-inu, e-mail, nickname ani dane auth.
- Konto: Supabase Auth przechowuje e-mail i hash hasła; `profiles` przechowuje tylko `id`, `nickname`,
  `created_at` (bez e-maila i hasła).
- GA4 ładowane wyłącznie po zgodzie użytkownika.

## Infrastruktura i zależności

- **Produkcja na Vercel** (auto-deploy z `main`), domena `https://checkin.enpsyneia.org`.
- **Zależność od Supabase** (Auth + PostgreSQL + RLS) — Free Tier; brak własnego serwera/Edge Functions.
- Frontend bez sekretów backendowych (tylko klucz publishable).

## Charakter produktu

- **Brak diagnozy medycznej ani psychologicznej** — wynik jest podpowiedzią, nie diagnozą.

## Znany, niewdrożony problem

- **Prywatność / Regulamin** — przełączniki na ekranie Prywatność nie wpływają na zachowanie,
  toggle „Przypomnienie" obiecuje nieistniejącą funkcję, a Regulamin zawiera stwierdzenie
  niezgodne z faktycznym przetwarzaniem danych przy koncie. Plan naprawczy istnieje, ale jest
  **niewdrożony i wymaga decyzji właściciela**: `docs/plans/PLAN_privacy_terms_fix.md`.
