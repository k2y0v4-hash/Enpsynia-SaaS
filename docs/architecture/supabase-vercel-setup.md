# Konfiguracja Supabase i Vercel + testy ręczne

Dokument operacyjny dla właściciela. Krok po kroku uruchomienie warstwy kont i trwałych check-inów
wdrożonej w `docs/plans/PLAN_supabase_auth_and_checkins.md` / `adr_003_supabase_accounts.md`.

> Część kroków wymaga ręcznego działania właściciela. Nie zapisujemy prawdziwych kluczy w repo.

### Status wdrożenia (2026-06-28) — WDROŻONE NA PRODUKCJĘ

Funkcja jest na produkcji (`https://checkin.enpsyneia.org`) po zmergowaniu PR #10 do `main`
(merge commit `9512b38`). Poniższe punkty opisują stan faktyczny; sekcje 1–3 niżej zachowano jako
instrukcję odtworzenia środowiska od zera.

- **Projekt Supabase:** `Enpsyneia checkin`, project_ref `zxqqeouwydseelbtcwmd`, region `eu-west-1`.
  Project URL: `https://zxqqeouwydseelbtcwmd.supabase.co`.
- **Migracja bazy:** ZASTOSOWANA i zweryfikowana przez Supabase MCP. Historia migracji w projekcie:
  `0001_init_auth_and_checkins`, `0002_minimal_grants`, `0003_revoke_execute_handle_new_user`.
  W repo te zmiany są skonsolidowane w jednym pliku `0001_init_auth_and_checkins.sql`. Zweryfikowano:
  tabele `profiles`/`check_ins`, kolumny i typy, indeks `(user_id, created_at desc)`, trigger
  `handle_new_user` (`security definer`, `search_path=''`, EXECUTE tylko dla `postgres`), RLS włączone,
  polityki SELECT/INSERT tylko dla `authenticated`, brak UPDATE/DELETE, brak dostępu `anon`,
  jawne minimalne granty (`authenticated`: SELECT `profiles`, SELECT+INSERT `check_ins`; `anon`: brak).
- **Auth (Site URL / Redirect / Confirm email / anonymous OFF):** skonfigurowane przez właściciela
  w panelu Supabase. **Źródło:** potwierdzenie właściciela + obserwacja produkcji (logowanie i funkcje
  konta działają), 2026-06-28. Ustawień Auth **nie da się odczytać przez Supabase MCP**, więc nie są
  one tu deklarowane jako niezależnie zweryfikowane przez audyt.
- **Vercel:** projekt `project-1pcvr` połączony z repo; auto-deploy z `main` (Production) oraz z PR
  (Preview). Zmienne `VITE_SUPABASE_URL` i `VITE_SUPABASE_PUBLISHABLE_KEY` ustawione dla Preview
  i Production — potwierdzone obecnością w bundlu produkcyjnym (`zxqqeouwydseelbtcwmd.supabase.co`
  oraz `sb_publishable_…` w `index-*.js`).
- **CSP:** `vercel.json` `connect-src` zawiera host Supabase — zweryfikowane na żywo w nagłówku
  odpowiedzi produkcji.
- **GitHub Actions `build`:** czerwony z powodu kroku `npm audit --audit-level=high` (prexystujący gate
  z commita `cd7bea9`), który zgłasza podatności w **dev-toolchain** (`vite`, `hono` przez `shadcn` CLI).
  Nie dotyczy bundla produkcyjnego ani warstwy Supabase; `main` nie ma branch protection, więc nie był
  to check blokujący merge. Do osobnej decyzji o aktualizacji zależności.

> **Migracja a powtarzalność:** plik `0001` został już zastosowany do żywego projektu i **nie jest
> idempotentny** — używa `create policy` (bez `if not exists`). Ponowne uruchomienie na istniejącej
> bazie zakończy się błędem („policy already exists"). Sekcja 2 niżej dotyczy **świeżego środowiska**
> (uruchom raz). Na działającej produkcji migracji nie uruchamiamy ponownie.

---

## 1. Projekt Supabase

1. Utwórz projekt na https://supabase.com (Free Tier wystarcza).
2. **Auth → Providers → Email**: włączony.
3. **Auth → Email**: włącz „Confirm email" (potwierdzanie e-maila wymagane).
4. **Auth → URL Configuration → Site URL**: ustaw produkcyjny adres `https://checkin.enpsyneia.org`.
   W „Redirect URLs" dodaj też ten adres (oraz `http://localhost:5173` na czas dev, jeśli potrzebne).

## 2. Migracja bazy

1. Otwórz **SQL Editor** w Supabase.
2. Wklej całą zawartość `supabase/migrations/0001_init_auth_and_checkins.sql` i uruchom (Run).
3. Sprawdź w **Table Editor**, że istnieją tabele `profiles` i `check_ins`.
4. Sprawdź w **Authentication → Policies**, że RLS jest włączone i widoczne są polityki:
   `profiles_select_own`, `check_ins_select_own`, `check_ins_insert_own`.
   (UPDATE/DELETE i polityki dla `anon` celowo NIE istnieją.)

Alternatywnie, z Supabase CLI: `supabase db push`.

## 3. Klucze i zmienne środowiskowe

Z **Project Settings → API** odczytaj:

- Project URL → `VITE_SUPABASE_URL`
- Publishable key (`sb_publishable_...`) → `VITE_SUPABASE_PUBLISHABLE_KEY`

> NIGDY nie używaj we frontendzie `service_role` / `sb_secret_*` / hasła bazy / connection stringa.

### Lokalnie (dev)

```bash
cp .env.example .env.local
# uzupełnij VITE_SUPABASE_URL i VITE_SUPABASE_PUBLISHABLE_KEY (oraz VITE_GA4_ID jeśli używasz)
```

### Vercel (produkcja + preview)

Vercel jest podłączony do repo i sam tworzy deploymenty z gałęzi i PR-ów (nie używamy Vercel CLI).
Ręcznie ustaw tylko zmienne: **Project `project-1pcvr` → Settings → Environment Variables → Add**:
- `VITE_SUPABASE_URL` = `https://zxqqeouwydseelbtcwmd.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY` = klucz publishable z Project Settings → API

Zaznacz oba środowiska: **Preview** i **Production**. Po zapisaniu wykonaj **Redeploy** (zmienne
build-time `VITE_*` są wczytywane podczas builda, więc istniejący preview ich nie ma do czasu redeployu).

Adres preview (gałąź `feat/supabase-auth-and-checkins`):
`https://project-1pcvr-git-feat-supabase-au-2e300d-k2y0v4-hashs-projects.vercel.app`
— dodaj go (lub jego wzorzec) do **Supabase → Auth → Redirect URLs**, gdy konfigurujesz Auth.

> Bez tych zmiennych aplikacja nadal działa anonimowo (localStorage). Funkcje konta są wtedy
> ukryte (`isSupabaseConfigured = false`).

### CSP (`vercel.json`) — wymagane dla Supabase

`vercel.json` musi zezwalać przeglądarce na połączenia do hosta Supabase, inaczej CSP zablokuje
wszystkie żądania Auth/REST. W dyrektywie `connect-src` znajduje się host projektu:
`https://zxqqeouwydseelbtcwmd.supabase.co`. Przy zmianie projektu Supabase zaktualizuj ten wpis.

---

## 4. Testy ręczne (akceptacyjne)

### Status testów (2026-06-28)

Rozdzielone wg dowodu:

- **Zweryfikowane automatycznie / przez audyt:**
  - `npm test`, `npm run lint`, `npm run build` — zielone (uruchomione lokalnie).
  - **Testy RLS dwóch użytkowników** — zweryfikowane przez Supabase MCP (impersonacja ról
    `authenticated`/`anon`, fixture dwóch użytkowników w `auth.users`, dane testowe usunięte):
    A czyta tylko swoje `profiles`/`check_ins`; INSERT z cudzym `user_id` odrzucony; UPDATE/DELETE
    odrzucone (brak grantu i polityki); `anon` bez dostępu. Wynik: zgodny z założeniami.
- **Zweryfikowane ręcznie przez właściciela (2026-06-28):** logowanie i pojawianie się funkcji konta
  w produkcji (źródło: właściciel).
- **Do ręcznego testu końcowego właściciela (wymaga skrzynki e-mail):** pełny flow rejestracja →
  potwierdzenie e-maila → logowanie → zapis check-inu → historia z Supabase → wylogowanie.
  Poniższe checklisty pozostają jako procedura tego testu.

### Auth

- [ ] Rejestracja (nickname + e-mail + hasło) → pojawia się ekran „Sprawdź swoją skrzynkę".
- [ ] Logowanie PRZED potwierdzeniem e-maila → odrzucone (czytelny błąd).
- [ ] Klik w link potwierdzający w e-mailu → następnie logowanie działa.
- [ ] Wylogowanie z menu → wraca do landing, historia konta znika.
- [ ] Odświeżenie strony po zalogowaniu → sesja przywrócona (nadal zalogowany).

### Check-iny zalogowanego

- [ ] Zapis check-inu zalogowanego → po sukcesie ekran typu dnia; wpis widoczny w „Historia".
- [ ] Po odświeżeniu i ponownym wejściu (lub na innym urządzeniu) → check-in nadal w historii.
- [ ] Symulacja błędu sieci (np. tryb offline) przy zapisie → ekran „Nie udało się zapisać"
      (BEZ fałszywego sukcesu), z opcją „Spróbuj ponownie".

### Model hybrydowy / propozycja konta

- [ ] 1. anonimowy check-in → brak propozycji konta.
- [ ] 2. anonimowy check-in → po przejściu do „Nowy check-in" pojawia się propozycja konta.
- [ ] Klik „Nie teraz" → wraca do flow; kolejne check-iny NIE pokazują propozycji ponownie.
- [ ] Historia anonimowa działa lokalnie (limit 5); po zalogowaniu historia pochodzi z Supabase.
- [ ] Po zalogowaniu stary `enpsyneia_history` pozostaje w przeglądarce nietknięty (DevTools →
      Application → Local Storage) i NIE jest scalany z kontem.

### RLS — test dwóch użytkowników (krytyczny)

Wykonaj w Supabase SQL Editor lub przez dwie sesje aplikacji (użytkownik A i B):

- [ ] A i B zakładają konta i dodają po check-inie.
- [ ] A widzi tylko swoje check-iny; B widzi tylko swoje.
- [ ] Próba SELECT cudzych rekordów zwraca pusty wynik (RLS).
- [ ] Próba UPDATE własnego check-inu → odrzucona (brak polityki UPDATE).
- [ ] Próba DELETE własnego check-inu → odrzucona (brak polityki DELETE).
- [ ] Wywołanie API jako `anon` (bez sesji) na `check_ins` → brak dostępu do danych.

Przykład negatywnego testu RLS (jako zalogowany A, podstaw realne ID B):

```sql
-- powinno zwrócić 0 wierszy (RLS odcina cudze dane)
select * from public.check_ins where user_id = '<UUID_uzytkownika_B>';

-- powinno zakończyć się błędem/zero zmian (brak polityki UPDATE/DELETE)
update public.check_ins set day_type = 'X' where user_id = auth.uid();
delete from public.check_ins where user_id = auth.uid();
```

---

## 5. Znane ograniczenia (świadome, ten etap)

- Brak resetu hasła / odzyskiwania konta (D4) — utrata hasła = utrata dostępu do konta.
- Brak migracji historii lokalnej do konta (D6) — historia anonimowa zostaje lokalnie.
- Sesja w localStorage (D5) — ryzyko XSS ograniczane środkami z ADR 003, nie eliminowane.
- Brak edycji i usuwania check-inów oraz edycji nickname (z założenia).
