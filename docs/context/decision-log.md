# Decyzja projektu — Enpsyneia Check In

**Data decyzji:** 2026-04-12
**Status:** Obowiązujący

---

## Kontekst

W trakcie analizy projektu powstały dwa niezależne raporty oceniające zasadność kontynuacji:
- raport v1 — werdykt: kontynuuj (ICE Medium)
- raport v2 — werdykt: porzuć (3/5 red flags)

Oba raporty zostały zarchiwizowane jako materiał historyczny. Nie są dokumentami operacyjnymi.

---

## Decyzja

**Projekt jest kontynuowany.**

---

## Uzasadnienie

- Model brand-building istotnie obniża ryzyko finansowe — koszt MVP to $0/mies i czas developera.
- Zarzuty z raportu v2 (zero moat, niska retencja, problem typu vitamin) są trafne dla modelu SaaS z monetyzacją. Dla modelu brand-building są akceptowalne.
- Pivot na Anti-Distraction Tool zaproponowany w raporcie v2 nie jest wystarczająco rozwinięty, żeby go realizować zamiast obecnego pomysłu.
- Walidacja hipotezy na realnych użytkownikach jest tańsza niż dalsza analiza bez kodu.

---

## Aktualizacja 2026-06-28 — przejście do modelu hybrydowego (Supabase)

Właściciel zdecydował o wcześniejszym (przed progami walidacji) wprowadzeniu kont i trwałego
przechowywania check-inów w Supabase, w modelu hybrydowym: anonimowy → localStorage, zalogowany →
Supabase, z opcjonalną propozycją konta po 2. check-inie. Decyzje D1–D7 oraz pełny kontekst:
`docs/plans/PLAN_supabase_auth_and_checkins.md` i ADR 003 (`docs/architecture/adr_003_supabase_accounts.md`).
Auth: e-mail + hasło z potwierdzeniem (NIE Magic Link). Znane ograniczenia: brak resetu hasła,
brak migracji historii lokalnej.

---

## Aktualna wersja produktu

| Element | Decyzja |
|---------|---------|
| Model danych | Hybrydowy: anon → localStorage; zalogowany → Supabase (ADR 003) |
| Auth | Supabase Auth — e-mail + hasło + potwierdzenie e-maila; konto opcjonalne |
| Formularz | 6 pytań (energy, overload, movement, social, agency, paralysis) |
| Streak counter | Poza zakresem (nieobecny w kodzie) |
| Share buttons | Poza zakresem MVP |
| Mechanizm nawykowy | Hipoteza do walidacji — nie założenie |

Szczegółowy zakres: [`docs/product/mvp-scope.md`](../product/mvp-scope.md)

---

## Pliki archiwalne

Raporty kill zachowane jako materiał historyczny, nie operacyjny:

- [`docs/archive/03-kill-the-idea-report.md`](../archive/03-kill-the-idea-report.md) — raport v1, werdykt: kontynuuj
- [`docs/archive/03-kill-the-idea-report-v2.md`](../archive/03-kill-the-idea-report-v2.md) — raport v2, werdykt: porzuć
