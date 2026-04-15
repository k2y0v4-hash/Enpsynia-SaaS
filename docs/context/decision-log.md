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

## Aktualna wersja produktu

| Element | Decyzja |
|---------|---------|
| Etap 1 | React + localStorage, brak konta, brak backendu |
| Etap 2 | Supabase Auth + PostgreSQL, po walidacji Etapu 1 i potwierdzeniu potrzeby kont przez użytkowników |
| Formularz | 6 pytań (energy, overload, movement, social, agency, paralysis) |
| Streak counter | Etap 1 — localStorage, bez konta |
| Share buttons | Poza zakresem MVP |
| Mechanizm nawykowy | Hipoteza do walidacji — nie założenie |

Szczegółowy zakres: [`docs/product/mvp-scope.md`](../product/mvp-scope.md)

---

## Pliki archiwalne

Raporty kill zachowane jako materiał historyczny, nie operacyjny:

- [`docs/archive/03-kill-the-idea-report.md`](../archive/03-kill-the-idea-report.md) — raport v1, werdykt: kontynuuj
- [`docs/archive/03-kill-the-idea-report-v2.md`](../archive/03-kill-the-idea-report-v2.md) — raport v2, werdykt: porzuć
