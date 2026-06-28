# Supabase Auth i trwałe check-iny

> **Status planu:** ZATWIERDZONY i ZAIMPLEMENTOWANY (2026-06-28) na gałęzi `feat/supabase-auth-and-checkins`.
> Decyzje D1–D7 zatwierdzone przez właściciela; szczegóły i doprecyzowanie modelu hybrydowego — ADR 003.
> **Stan po wdrożeniu (2026-06-28):** WDROŻONE NA PRODUKCJĘ — PR #10 zmergowany do `main`; Supabase
> skonfigurowany, zmienne Vercel ustawione (Preview + Production). Status i dowody:
> `docs/architecture/supabase-vercel-setup.md` (sekcja „Status wdrożenia"). Treść planu poniżej
> zachowano bez zmian jako kontrakt zakresu.
> **Role:** System Architect (główna) + Implementation Planner (pomocnicza)
> **Data:** 2026-06-28
> **Podstawa:** decyzja właściciela o przejściu z localStorage do kont użytkowników i trwałego przechowywania w Supabase.
> **Etap:** uruchamia Etap 2 wcześniej niż zakładały progi walidacyjne (patrz sekcja 11 — sprzeczności).
>
> **Zatwierdzone decyzje właściciela (finalne):** D1 tak (ADR 003 zastępuje ADR 001) · D2 `bigint identity` ·
> D3 zapis `day_type`+`microaction_title` · D4 brak resetu hasła · D5 sesja w localStorage (zaakceptowane ryzyko) ·
> D6 `enpsyneia_history` nietknięty, brak migracji · D7 konto opcjonalne, propozycja po 2. anonimowym check-inie.

Ten plan jest zgodny ze strukturą `docs/plans/PLAN_template.md` (sekcje 1–8) i rozszerza ją o sekcje wymagane przez zlecenie właściciela (model danych, bezpieczeństwo, zachowanie danych, kolejność, dokumentacja, sprzeczności, decyzje właściciela).

---

## 1. Cel

Minimalna integracja Supabase Auth (e-mail + hasło) i PostgreSQL, która umożliwia:

- zakładanie kont (nickname + e-mail + hasło) z potwierdzeniem e-maila,
- logowanie, wylogowanie i przywracanie sesji,
- trwały zapis własnych check-inów,
- pobieranie i wyświetlanie wyłącznie własnych check-inów.

Zakres ma być możliwie mały, prosty i bezpieczny. Logika analizy check-inu i UX wyniku pozostają bez zmian. Zmiana dotyczy warstwy trwałości i tożsamości, nie produktu.

---

## 2. Zakres

### Wchodzi w zakres

- Auth przez e-mail i hasło (Supabase Auth).
- Wymagane potwierdzenie e-maila przed pierwszym zalogowaniem.
- Nickname ustawiany jednorazowo przy rejestracji (przekazany jako metadane do Supabase Auth).
- Logowanie, wylogowanie i przywracanie sesji przy starcie aplikacji.
- Minimalny ekran/flow auth zgodny z istniejącym UI (`ScreenShell`/`AppScreen`).
- Tabela `profiles` (nickname).
- Tabela check-inów odpowiadająca **rzeczywistemu** modelowi danych aplikacji (sekcja 3).
- RLS na obu tabelach.
- Dla check-inów wyłącznie polityki SELECT i INSERT własnych rekordów.
- Integracja zapisu i odczytu z istniejącym flow (`App.jsx`, `HistoryScreen`).
- Konfiguracja zmiennych Vite/Vercel (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`).
- Obsługa stanów ładowania i błędów (auth + zapis/odczyt).
- Aktualizacja dokumentacji (sekcja 10).
- Testy (sekcja 8).

### Nie wchodzi w zakres

- Reset hasła — **patrz decyzja D4** (poza zakresem, chyba że Supabase wymaga minimalnej obsługi dla poprawnego działania potwierdzenia e-maila; obecnie nie wymaga).
- Edycja i usuwanie check-inów.
- Edycja profilu i nickname po utworzeniu konta.
- OAuth, magic link, logowanie telefonem, anonymous sign-in, account linking.
- Role, uprawnienia administracyjne, panel admina, audyt.
- Streaki w bazie (i jakiekolwiek streaki — nie istnieją też w obecnym kodzie).
- Sugestie personalizowane.
- Migracja danych localStorage niezwiązanych z historią; automatyczna migracja anonimowej historii (patrz sekcja 5).
- Rozbudowany backend, Edge Functions, własny serwer.
- Przechowywanie sekretnego klucza Supabase (`service_role`, `sb_secret_*`) we frontendzie.
- Dodanie routera, biblioteki formularzy ani globalnego state managera, jeśli nie są konieczne (sekcja 5 kontekstu technicznego uzasadnia brak).
- Zmiana logiki analizy (`analysisLogic.js`) i przeprojektowanie UI poza minimum dla auth.
- Resend / zewnętrzny dostawca e-mail — wystarcza domyślny mailer Supabase (sprzeczność #6).

---

## 3. Model danych

Model dopasowany do faktycznego kodu (`useLocalStorage.js`, `HistoryScreen.jsx`, `analysisLogic.js`), **nie** do historycznego schematu z `AGENTS.md`. Nazwy pól odpowiadają nazwom wejść w kodzie (`energy`, `overload`, `paralysis`, `movement`, `social`, `agency`) — nie nazwom z `AGENTS.md` (`energy_level`, `sensory_overload`, ...).

### Tabela `profiles`

| Kolumna | Typ | Uwagi |
|---|---|---|
| `id` | `uuid` PK | `references auth.users(id) on delete cascade` |
| `nickname` | `text not null` | ustawiany raz, przy rejestracji |
| `created_at` | `timestamptz not null default now()` | |

- **Bez kolumny `email`** — e-mail jest w `auth.users`; aplikacja nie potrzebuje go poza Supabase Auth (zgodnie z poleceniem).
- Bez `updated_at`, `streak_count`, `last_check_in`, `total_social_replacements` — pola z historycznego schematu `AGENTS.md` nieuzasadnione aktualnym kodem.

### Tabela check-inów `check_ins`

| Kolumna | Typ | Uwagi |
|---|---|---|
| `id` | `bigint generated always as identity` PK | **decyzja D2** — patrz uzasadnienie niżej |
| `user_id` | `uuid not null` | `references auth.users(id) on delete cascade` |
| `energy` | `smallint not null` | `check (energy between 1 and 5)` |
| `overload` | `smallint not null` | `check (overload between 1 and 5)` |
| `paralysis` | `smallint not null` | `check (paralysis between 1 and 5)` |
| `movement` | `smallint not null` | `check (movement between 1 and 5)` |
| `social` | `smallint not null` | `check (social between 1 and 5)` |
| `agency` | `smallint not null` | `check (agency between 1 and 5)` |
| `day_type` | `text not null` | wynik — wymagany przez `HistoryScreen` (`entry.dayType`) |
| `microaction_title` | `text not null` | wynik — wymagany przez `HistoryScreen` (`entry.microactionTitle`) |
| `created_at` | `timestamptz not null default now()` | mapuje obecny `timestamp` |

- Indeks: `create index on check_ins (user_id, created_at desc);` — wspiera odczyt własnej historii od najnowszej.
- **Pól nieprzechowywanych (świadomie):**
  - `score` — pochodna (zaokrąglona średnia 6 odpowiedzi); liczona po stronie klienta jak dziś (`avgScore`), nie utrwalana.
  - `justificationText`, `microaction.steps`, `microactionKey` — odtwarzalne deterministycznie z 6 odpowiedzi przez `analyzeCheckIn`; `HistoryScreen` ich nie pokazuje, a ekrany `DayTypeScreen`/`MicroActionScreen` działają na żywym wyniku w trakcie sesji, nie z bazy.
  - `summaryText` — nie jest nawet zwracany przez obecny kod (rozbieżność spec↔kod, sekcja 11 #8).
  - `micro_action_completed`, `daily_streaks` — z historycznego schematu, poza zakresem.

**Decyzja D2 — `bigint identity` vs `uuid`:** rekomendacja `bigint generated always as identity`. Uzasadnienie: identyfikator nie jest generowany po stronie klienta (INSERT zwraca rekord), nie jest eksponowany publicznie ani współdzielony między systemami, a monotoniczny porządek dobrze współgra z indeksem `created_at desc`. `uuid` byłby uzasadniony tylko przy generowaniu ID po stronie klienta lub rozproszonego — co tu nie zachodzi. (Obecny `crypto.randomUUID()` w localStorage to artefakt klienta, nie wymóg modelu.)

**Decyzja D3 — denormalizacja wyniku vs ponowne liczenie przy odczycie:** rekomendacja **denormalizacja** (`day_type` + `microaction_title` zapisywane). Uzasadnienie: (a) odpowiada dokładnie obecnemu kształtowi wpisu w localStorage; (b) zachowuje prawdę historyczną — część tekstów mikroakcji jest w kodzie oznaczona jako DRAFT; gdyby liczyć przy odczycie, historia pokazywałaby przyszłe brzmienia zamiast tego, co użytkownik faktycznie zobaczył. Alternatywa (przechowywać tylko 6 odpowiedzi i liczyć przy odczycie) daje minimalnie mniejszy schemat, ale wiąże historię z bieżącą wersją logiki — odrzucona.

---

## 4. Bezpieczeństwo

### RLS i polityki

- RLS **włączone** na `profiles` i `check_ins` (wszystkie tabele publiczne w schemacie `public`).
- `profiles`:
  - SELECT: tylko własny profil (`auth.uid() = id`).
  - **Brak** polityk UPDATE i DELETE (nickname nieedytowalny przez klienta).
  - INSERT: **nie** przez klienta — profil tworzony bezpiecznym triggerem (niżej).
- `check_ins`:
  - SELECT: tylko własne rekordy (`auth.uid() = user_id`).
  - INSERT: tylko własny rekord (`with check (auth.uid() = user_id)`).
  - **Brak** polityk UPDATE i DELETE.
- Brak jakiegokolwiek dostępu roli `anon` do danych użytkowników (brak polityk dla `anon`).
- `user_id` zawsze zgodny z `auth.uid()` — wymuszone przez `with check`.

### Tworzenie profilu

- Profil tworzony przez trigger `on auth.users` po `insert`, funkcją `security definer` (np. `handle_new_user`), która czyta `nickname` z `new.raw_user_meta_data->>'nickname'`.
- Nickname trafia do metadanych przy `supabase.auth.signUp({ email, password, options: { data: { nickname } } })`.
- Dzięki temu nickname nie jest zapisywany przez klienta i nie ma ścieżki edycji.

### Sekrety i zmienne środowiskowe

- Frontend używa **wyłącznie**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.
- **Zakaz** umieszczania we frontendzie: `service_role`, `sb_secret_*`, hasła bazy, connection stringa.
- `.env*` z rzeczywistymi wartościami nie trafia do repo (`.gitignore` już ignoruje `.env`, `.env.*`, `.env.local`, dopuszczając `!.env.example` — zweryfikowane).
- `.env.example` zawiera wyłącznie nazwy zmiennych i bezpieczne placeholdery (bez prawdziwych wartości).

### Sesja, analytics, logi

- **Ryzyko sesji (decyzja D5):** `supabase-js` domyślnie utrwala sesję w `localStorage`. To standard dla SPA bez backendu, ale token jest czytelny dla skryptu w stronie → ryzyko eksfiltracji przy XSS. Mitigacja: brak `dangerouslySetInnerHTML` (już obowiązuje w `AGENTS.md`), brak nowych zewnętrznych skryptów poza GA4, przegląd każdego nowego inputu pod XSS. Alternatywa cookie-based (`@supabase/ssr`) wymaga backendu — poza zakresem. `AGENTS.md` wymaga osobnego przeglądu bezpieczeństwa modelu sesji przed Etapem 2 — ten przegląd jest częścią decyzji D5.
- Zakaz logowania pełnych odpowiedzi użytkownika do analytics i do konsoli produkcyjnej (spójne z ADR 002).
- Do GA4 nadal trafiają tylko `form_start`, `result_shown`, `feedback_helpful` — bez zmian, bez e-maila/nicknamea/ID auth.

---

## 5. Zachowanie istniejących danych (localStorage)

**Rekomendacja (decyzja D6):**

- Po zalogowaniu nowe check-iny zapisywane są do Supabase; historia pobierana z Supabase.
- **Brak automatycznej migracji** anonimowej historii z `enpsyneia_history` — wymaga osobnej decyzji właściciela (nie podejmowana w tym planie).
- Stary klucz `enpsyneia_history`: rekomendacja **pozostawić nietknięty / ignorowany** po wdrożeniu (nie czytać, nie usuwać). Uzasadnienie: usuwanie cudzych danych lokalnych bez potrzeby jest ryzykowne i zbędne; pozostawienie nie wpływa na nowy flow. Ewentualne czyszczenie można dodać później jako osobna, świadoma decyzja.
- Klucz zgody analytics `enpsyneia_analytics_consent` pozostaje bez zmian.

To jest rekomendacja, nie decyzja wykonana po cichu — wymaga potwierdzenia (D6).

**Otwarta kwestia flow (decyzja D7):** czy check-in i ekran wyniku pozostają dostępne bez logowania (gość dostaje wynik, ale bez zapisu/historii), czy całość wymaga konta? Polecenie właściciela mówi o tym, co zalogowany użytkownik może/nie może, ale nie gatuje samej analizy. Rekomendacja: **zachować check-in + wynik bez logowania** (chroni time-to-value < 2 min, minimalna zmiana UI), a za auth schować wyłącznie trwały zapis i historię. Wymaga potwierdzenia.

---

## 6. Kontekst techniczny (dla template §5)

- Stack bez zmian: React 19 + Vite 8 + Tailwind v4 + Shadcn/Base UI. Dodawana jedyna zależność: `@supabase/supabase-js`.
- **Bez routera:** obecny `App.jsx` używa stanu `screen` (string) do przełączania ekranów. Auth dodajemy jako kolejne stany/ekrany w tym samym wzorcu — router niepotrzebny.
- **Bez biblioteki formularzy:** formularze auth (rejestracja/logowanie) to 2–3 pola; `useState` wystarcza, jak w `CheckInForm`.
- **Stan auth:** lekki kontekst React lub hook `useAuth` (np. `src/hooks/useAuth.js` + opcjonalny `src/context/AuthProvider`) — minimalny, bez Redux/Zustand (spójne z `AGENTS.md`).
- **Klient Supabase:** `src/lib/supabaseClient.js` (warstwa `lib/` zgodnie z mapą katalogów w `CLAUDE.md`).
- **Warstwa danych check-inów:** `src/lib/checkins.js` lub hook `src/hooks/useCheckins.js` — `insertCheckIn(...)`, `fetchMyCheckIns()`; mapowanie 6 odpowiedzi + `day_type` + `microaction_title`.
- Punkty integracji w istniejącym kodzie: `App.jsx` (`handleFormComplete`, `handleMissingContinue`, render `HistoryScreen`), `HistoryScreen.jsx` (źródło `history`), wygaszenie `useLocalStorage` jako źródła historii.

---

## 7. Kryteria akceptacji (template §7)

- Niepotwierdzony e-mailowo użytkownik **nie może** się zalogować.
- Zalogowany użytkownik zapisuje check-in do Supabase.
- Check-in pozostaje po odświeżeniu i jest widoczny po zalogowaniu na innym urządzeniu.
- Użytkownik A **nie widzi** danych użytkownika B (weryfikacja RLS).
- Użytkownik **nie może** zaktualizować ani usunąć check-inu przez API (brak polityk UPDATE/DELETE).
- Niezalogowany użytkownik **nie pobiera i nie zapisuje** danych w bazie.
- Nickname powstaje przy rejestracji i **nie może** być edytowany przez klienta (brak UPDATE na `profiles`).
- Aplikacja **nie zawiera** kluczy `service_role` / `sb_secret_*` ani connection stringa.
- Brak regresji logiki 6 pytań i obliczania wyniku (`npm test` na `analysisLogic.test.js` przechodzi bez zmian).
- `npm test`, `npm run lint`, `npm run build` przechodzą.
- UI auth działa mobilnie (375px), spójnie z `ScreenShell`.
- Błędy sieciowe nie powodują utraty kontroli nad flow ani fałszywego komunikatu „zapisano" — przy nieudanym zapisie użytkownik dostaje czytelny błąd, nie sukces.

---

## 8. Testy (template §8)

- **Jednostkowe:** mapowanie danych check-inu (obiekt odpowiedzi + wynik → wiersz `check_ins` i z powrotem), zgodne z istniejącym stylem `node`-owych testów (`npm test`).
- **Integracyjne (mock):** warstwa auth/data z zamockowanym klientem Supabase — happy path i błędy.
- **Ręczne dwóch użytkowników:** A i B; A nie widzi danych B.
- **Negatywne testy RLS w Supabase:** próby SELECT/INSERT/UPDATE/DELETE cudzych i własnych rekordów; UPDATE/DELETE odrzucone; SELECT/INSERT tylko własne; `anon` bez dostępu.
- **Rejestracja + potwierdzenie e-maila:** logowanie przed potwierdzeniem zablokowane; po potwierdzeniu działa.
- **Odświeżenie sesji:** sesja przywracana po reloadzie.
- **Build produkcyjny Vite:** `npm run build` + sprawdzenie, że w buildzie nie ma sekretów.

---

## 9. Kolejność implementacji (Implementation Planner)

1. **Decyzje architektoniczne i dokumentacja** — zatwierdzenie planu; nowy ADR zastępujący decyzję localStorage-first (sekcja 10); aktualizacja `AGENTS.md` (sprostowanie Magic Link → e-mail+hasło i schematu).
2. **Migracja SQL/Supabase** (jako plik migracji, uruchamiany przez właściciela): tabele `profiles`, `check_ins`, CHECK 1–5, indeks, RLS + polityki, trigger `handle_new_user`.
3. **Instalacja klienta** — `@supabase/supabase-js` (+ `package-lock.json`, `npm audit`).
4. **Konfiguracja klienta i env** — `src/lib/supabaseClient.js`; `.env.example` z nazwami zmiennych; instrukcja Vercel.
5. **Warstwa auth** — `useAuth`/`AuthProvider`: signUp (z nickname), signIn, signOut, przywracanie sesji, stany ładowania/błędów.
6. **Ekran/flow rejestracji i logowania** — minimalne ekrany w stylu `ScreenShell`.
7. **Warstwa zapisu/odczytu check-inów** — `insertCheckIn`, `fetchMyCheckIns`, mapowanie danych.
8. **Integracja z `App.jsx`** — zapis po check-inie do Supabase; historia z Supabase.
9. **Wygaszenie `useLocalStorage`** jako źródła historii (zależnie od D7 — pełne usunięcie lub pozostawienie jako fallback gościa).
10. **Testy** (sekcja 8).
11. **Aktualizacja rejestrów** — `implemented_plans.md`, `implemented_features.md`.
12. **Instrukcja konfiguracji Supabase + Vercel** (zmienne, potwierdzanie e-maili, redirect URL na produkcyjną domenę).

---

## 10. Dokumentacja do aktualizacji po implementacji

- `AGENTS.md` — sprostować: Magic Link → e-mail+hasło; historyczny schemat Tier 2 → odesłać do tego planu/ADR; tabela stacku „State: localStorage".
- `README.md` — status, stack, sekcja prywatności/danych, opis auth.
- `.env.example` — dodać `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (placeholdery).
- `docs/product/mvp-scope.md` — Etap 2: Magic Link → e-mail+hasło; korekta progów (Etap 2 uruchomiony decyzją właściciela).
- `docs/product/implementation-plan.md` — dodać fazy Etapu 2 zgodne z sekcją 9.
- `docs/architecture/tech-stack.md` — stack, struktura `src/`, schemat bazy zamiast/obok localStorage.
- `docs/architecture/system_overview.md` — granice systemu (jest backend/konta/sync), przepływ danych.
- **Nowy ADR** (np. `adr_003_supabase_accounts.md`) zastępujący decyzję localStorage-first; ADR 001 oznaczyć jako **Superseded by ADR 003** — bez usuwania. Uwaga: istnieją dwa identyczne pliki ADR 001 (`adr_001.md` i `adr_001_local_storage_first.md`) — oba oznaczyć.
- `docs/context/decision-log.md` — wpis o decyzji właściciela i jej dacie.
- `implemented_plans.md`, `implemented_features.md` — po implementacji.
- Ewentualna dokumentacja wdrożenia Vercel/Supabase (może być sekcją w README, bez nowego pliku jeśli się da — zgodnie z zasadą „nowy dokument tylko gdy konieczne").

Historycznych ADR-ów **nie usuwać** — oznaczyć jako zastąpione.

---

## 11. Wykryte sprzeczności (do rozstrzygnięcia, nie po cichu)

1. **Tier 1 / localStorage-first vs Supabase teraz.** `ADR 001`, `mvp-scope.md`, `implementation-plan.md`, `AGENTS.md` warunkują Etap 2 progami walidacji (>50 użytk./tydz., >30% powrotów, prośby o sync). Decyzja właściciela uruchamia Etap 2 wcześniej → ADR 001 do zastąpienia.
2. **Magic Link vs e-mail+hasło.** `AGENTS.md`, `mvp-scope.md`, `project-vision.md`, `docs/archive/auth-implementation-plan.md`, `05-architektura.md` zakładają Magic Link / passwordless. Właściciel wybiera e-mail+hasło i wprost wyklucza magic link → dokumenty do sprostowania.
3. **Historyczny schemat bazy vs minimalny.** `AGENTS.md` (Tier 2) ma `profiles` z `email`, `streak_count`, `last_check_in`, `total_social_replacements`; `check_ins` z `micro_action_completed`; osobną tabelę `daily_streaks`. Wszystko sprzeczne z minimalnym zakresem → użyć modelu z sekcji 3.
4. **Historia 5 rekordów vs trwała.** `mvp-scope.md`, `implementation-plan.md`, `useLocalStorage.js` (`MAX_ENTRIES=5`) vs trwała pełna historia w Supabase → limit znika dla danych z bazy.
5. **Rozbieżność nazw pól.** `AGENTS.md` używa `energy_level`, `sensory_overload`, `movement_need`, `social_need`, `agency_level`, `analysis_paralysis`, `day_type`, `micro_action`; kod używa `energy`, `overload`, `movement`, `social`, `agency`, `paralysis`, `dayType`, `microactionTitle`. Plan przyjmuje nazwy z **kodu**.
6. **Resend / dostawca e-mail.** Dokumenty wiążą e-mail z Resend (dla Magic Link). Dla e-mail+hasło wystarcza domyślny mailer Supabase → Resend poza zakresem.
7. **Streak w dokumentach vs brak w kodzie.** README/mvp-scope/tech-stack/implementation-plan mówią o streaku; `useLocalStorage.js` go nie implementuje (`PLAN_local_storage.md` to przyznaje). Bez wpływu na ten plan (streaki poza zakresem), ale to istniejąca niespójność dokumentacji.
8. **Spec `analyzeCheckIn` vs kod.** `analysis-logic.md` (sekcja 9, decyzja #6) wymaga `summaryText` w wyjściu; kod go nie zwraca. Rozbieżność istniejąca, poza zakresem tej zmiany (nie ruszamy logiki) — zgłoszona do wiadomości.
9. **Duplikaty ADR.** `adr_001.md` ≡ `adr_001_local_storage_first.md` oraz `adr_002.md` ≡ `adr_002_ga4_after_consent.md` (identyczne pary). Do uporządkowania przy aktualizacji ADR.

---

## 12. Decyzje wymagające zatwierdzenia właściciela

- **D1** — Zatwierdzenie samej zmiany architektonicznej i zastąpienia ADR 001 (uruchomienie Etapu 2 przed progami walidacji).
- **D2** — Typ PK check-inów: `bigint identity` (rekomendowane) vs `uuid`.
- **D3** — Denormalizacja wyniku (`day_type` + `microaction_title`, rekomendowane) vs liczenie przy odczycie.
- **D4** — Reset hasła poza zakresem ⇒ brak odzyskiwania konta po zapomnieniu hasła. Akceptacja, czy dodać minimalny reset.
- **D5** — Akceptacja domyślnego utrwalania sesji `supabase-js` w `localStorage` wraz z opisanym ryzykiem XSS (to jest wymagany przez `AGENTS.md` przegląd bezpieczeństwa sesji).
- **D6** — Los starego klucza `enpsyneia_history`: pozostawić nietknięty (rekomendowane) / ignorować / usunąć po wdrożeniu; brak auto-migracji.
- **D7** — Czy check-in + wynik pozostają dostępne bez logowania (rekomendowane), a auth gatuje tylko zapis i historię — czy cała aplikacja wymaga konta.

---

## 13. Lista plików do zmiany podczas implementacji (orientacyjnie)

**Nowe:**
- `src/lib/supabaseClient.js`
- `src/hooks/useAuth.js` (+ ewentualnie `src/context/AuthProvider.jsx`)
- `src/lib/checkins.js` lub `src/hooks/useCheckins.js`
- Ekrany auth: np. `src/components/SignUpScreen.jsx`, `src/components/SignInScreen.jsx` (w stylu `ScreenShell`)
- Migracja SQL (np. `supabase/migrations/*.sql` lub `docs/architecture/` jeśli repo nie ma katalogu `supabase/` — do ustalenia przy implementacji)
- `docs/architecture/adr_003_supabase_accounts.md`

**Modyfikowane:**
- `src/App.jsx` (integracja auth + zapis/odczyt z Supabase)
- `src/components/HistoryScreen.jsx` (źródło danych z Supabase, stany ładowania/błędu)
- `src/hooks/useLocalStorage.js` (wygaszenie / fallback zależnie od D7)
- `package.json`, `package-lock.json`
- `.env.example`
- `AGENTS.md`, `README.md`, `docs/product/mvp-scope.md`, `docs/product/implementation-plan.md`, `docs/architecture/tech-stack.md`, `docs/architecture/system_overview.md`, `docs/architecture/adr_001.md`, `docs/architecture/adr_001_local_storage_first.md`, `docs/context/decision-log.md`, `implemented_plans.md`, `implemented_features.md`

---

## 14. Ograniczenia wykonawcze

- Nie implementować kodu do czasu zatwierdzenia planu.
- Nie uruchamiać migracji w zewnętrznym projekcie Supabase.
- Nie zapisywać prawdziwych kluczy.
- Nie rozszerzać funkcji produktu, nie zmieniać logiki analizy, nie przebudowywać UI poza minimum dla auth.
- Nie dodawać routera/biblioteki formularzy/globalnego state managera bez konieczności.
- Nie tworzyć backendu poza Supabase ani zbędnych tabel (streaki, ustawienia, role, audyt).
- Pracę implementacyjną prowadzić na gałęzi roboczej, nie bezpośrednio na `main`.

---

**Status wyjścia (per `agents/ROUTING.md`): wymaga decyzji właściciela.**
