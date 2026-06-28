# PLAN — naprawa ekranów Prywatność i Regulamin (zgodność z faktycznym działaniem)

**Status:** PROPOZYCJA — **wymaga decyzji właściciela**. Nie implementować bez zatwierdzenia.
**Data:** 2026-06-28
**Autor audytu:** System Architect (audyt powdrożeniowy dokumentacji)
**Powiązania:** `src/components/PrivacyScreen.jsx`, `src/components/TermsScreen.jsx`,
`src/App.jsx`, ADR 003, `docs/architecture/system_overview.md`

> Ten plan powstał, bo audyt powdrożeniowy wykrył rozbieżności między treścią/UI ekranów
> Prywatność i Regulamin a faktycznym działaniem aplikacji. Zgodnie z zasadą „nie maskuj problemu
> samą zmianą dokumentacji repo" — problemy NIE zostały ukryte poprawą innych dokumentów; wymagają
> realnej decyzji i zmiany kodu (osobny zakres, poza audytem dokumentacji).

## Potwierdzone problemy

### P1 — Przełączniki prywatności nie wpływają na zachowanie aplikacji
`PrivacyScreen.jsx` ma 3 przełączniki (`localHistory`, `analytics`, `reminder`) trzymane wyłącznie
w lokalnym `useState`. W `App.jsx`: `onSave={() => setScreen(menuReturn)}` — argument `toggles`
jest **ignorowany**. Skutki:
- „Historia lokalna" (domyślnie ON) — wyłączenie NIE wyłącza zapisu `enpsyneia_history`.
- „Analityka" (domyślnie OFF) — nie steruje GA4; realna zgoda jest w banerze `useConsent`
  (Landing). Przełącznik wprowadza w błąd (sugeruje osobną kontrolę).

**Dowód:** `src/components/PrivacyScreen.jsx` (TOGGLES, `onSave(toggles)`); `src/App.jsx:318`.

### P2 — UI obiecuje funkcję, której nie ma (przypomnienia)
Przełącznik „Przypomnienie — Jedno delikatne przypomnienie dziennie" sugeruje powiadomienia/
przypomnienia. W kodzie **nie istnieje** żaden mechanizm przypomnień (grep `reminder|notification`
→ tylko ten przełącznik). Powiadomienia push są jawnie poza zakresem MVP (`mvp-scope.md`).

**Dowód:** brak implementacji w `src/`; `docs/product/mvp-scope.md` („Powiadomienia push" poza zakresem).

### P3 — Regulamin zawiera nieprawdziwe stwierdzenie dla użytkownika z kontem
`TermsScreen.jsx`: „Nie gromadzimy danych osobowych". Po założeniu konta Supabase Auth przechowuje
**e-mail** (dane osobowe) oraz nickname. README (sekcja Prywatność) i `system_overview.md` to
potwierdzają. Zdanie jest więc nieprawdziwe dla ścieżki z kontem.

**Dowód:** `src/components/TermsScreen.jsx` vs `README.md` („Supabase Auth przechowuje e-mail…").

## Proponowane kierunki naprawy (do wyboru przez właściciela)

Dla P1/P2 — wariant A (rekomendowany): **dostosować UI do rzeczywistości**
- Usunąć przełącznik „Przypomnienie" (brak funkcji).
- Zastąpić przełącznik „Analityka" linkiem/akcją otwierającą realną zgodę (`useConsent`) lub
  usunąć i odsyłać do banera.
- „Historia lokalna": albo podłączyć realne wyłączanie zapisu w `useLocalStorage`, albo zmienić
  na informację, że historia jest lokalna i jak ją wyczyścić.

Dla P1/P2 — wariant B: **zaimplementować obiecane funkcje** (większy zakres: realny opt-out historii,
mechanizm przypomnień). Przypomnienia = nowy, znaczący zakres poza obecnym MVP.

Dla P3: **skorygować copy** Regulaminu, np. „Bez konta nie gromadzimy danych osobowych. Z kontem
przechowujemy e-mail na potrzeby logowania (Supabase Auth)." — zgodnie z faktycznym przetwarzaniem.

## Zakres i tryb
- Każda z powyższych zmian dotyka **kodu ekranów** — poza zakresem audytu dokumentacji.
- Wymaga decyzji właściciela: wariant A vs B oraz finalne brzmienie copy (treść prawna).
- Po zatwierdzeniu: utworzyć właściwy PLAN wykonawczy, zaktualizować `implemented_features.md`,
  `traceability.md`, testy.

## Kryteria akceptacji (po wyborze wariantu)
- Żaden przełącznik/elem. UI nie obiecuje działania, którego aplikacja nie wykonuje.
- Treść Regulaminu/Prywatności zgodna z faktycznym przetwarzaniem danych (anon vs konto).
- Zachowania prywatności (zgoda GA4, lokalność historii) opisane zgodnie z `system_overview.md`.

**Status wyjścia:** wymaga decyzji właściciela.
