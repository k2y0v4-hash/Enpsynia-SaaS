# Enpsynea-SaaS

Enpsynea-SaaS to repozytorium projektów rozwijanych wokół idei Enpsynea, rozumianej jako praktyczne podejście do bardziej świadomego działania, samoregulacji i lepszego kontaktu z własnymi potrzebami.

Celem repozytorium jest tworzenie narzędzi cyfrowych, które nie tylko rozwiązują konkretne problemy użytkownika, ale także wspierają budowanie bardziej intencjonalnych nawyków i decyzji w codziennym życiu.

---

## Aktualnie rozwijany projekt: Enpsynea Check In

Aplikacja webowa wspierająca codzienną samoobserwację, rozpoznawanie aktualnego stanu oraz wybór małego, adekwatnego działania na tu i teraz.

Użytkownik wypełnia 6 pytań na suwakach (skala 1–5), a aplikacja zwraca typ dnia i jedną konkretną mikroakcję dopasowaną do jego stanu.

**Stack:** React 19 + Vite + Tailwind CSS v4 + Shadcn UI (Base UI)

---

## Status implementacji (Etap 1 — MVP)

| Faza | Zakres | Status |
|------|--------|--------|
| Faza 1 — Setup | Vite + React + Tailwind + Shadcn | Ukonczona |
| Faza 2 — Landing page | Nagłówek, value prop, CTA | Ukonczona |
| Faza 3 — Formularz check-in | 6 suwaków, progress bar, nawigacja | Ukonczona |
| Faza 4 — Logika analizy | 5 typów dnia, 10 mikroakcji, testy | Ukonczona |
| Faza 5 — Ekran wyniku | Wyświetlenie wyniku, streak, feedback | Do zrobienia |
| Faza 6 — localStorage | Historia 5 check-inów, streak counter | Do zrobienia |
| Faza 7 — QA i deploy | Testy mobilne, GA4, Vercel produkcja | Do zrobienia |

---

## Architektura

```
src/
├── App.jsx                    # Routing między ekranami (landing → form → result)
├── components/
│   ├── Landing.jsx            # Ekran startowy z CTA
│   ├── CheckInForm.jsx        # Formularz 6 pytań na suwakach
│   ├── ProgressBar.jsx        # Pasek postępu "Pytanie X z 6"
│   └── ui/button.jsx          # Komponent Shadcn
├── utils/
│   ├── analysisLogic.js       # Logika analizy — 5 typów dnia, mikroakcje
│   └── analysisLogic.test.js  # Testy jednostkowe logiki
└── hooks/                     # Hook useLocalStorage (Faza 6)
```

**Logika analizy** ([`src/utils/analysisLogic.js`](./src/utils/analysisLogic.js)) działa na drzewie priorytetów per [`docs/biznes/05-logika-analizy.md`](./docs/biznes/05-logika-analizy.md):

1. Przeciążenia — `overload >= 4` i `paralysis >= 4`
2. Wyciszenia — `overload >= 4`
3. Kontaktu — `social >= 4` i `overload <= 3`
4. Działania — `energy >= 4`, `agency >= 3`, `overload <= 3`
5. Odbudowy — fallback

Dla każdego typu dnia dostępne są 2 mikroakcje (A/B) wybierane deterministycznie na podstawie jednej zmiennej pomocniczej.

---

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

---

## Dokumentacja projektu

Pełny opis projektu, założenia, analizy i dokumentacja robocza w katalogu [`docs/biznes/`](./docs/biznes/):

| Plik | Zawartość |
|------|-----------|
| [`01-opis-pomyslu.md`](./docs/biznes/01-opis-pomyslu.md) | Opis koncepcji i wizja projektu |
| [`02-icp-persona.md`](./docs/biznes/02-icp-persona.md) | Profil użytkownika (ICP) i persony |
| [`03-decision.md`](./docs/biznes/03-decision.md) | Kluczowe decyzje projektowe i ich uzasadnienie |
| [`04-mvp-scope.md`](./docs/biznes/04-mvp-scope.md) | Zakres MVP — Tier 1/2, funkcje, metryki sukcesu |
| [`05-logika-analizy.md`](./docs/biznes/05-logika-analizy.md) | Specyfikacja algorytmu analizy, mikroakcje, teksty UI |
| [`06-plan-implementacji.md`](./docs/biznes/06-plan-implementacji.md) | Plan fazowy — zakres per faza, definicje ukończenia |
| [`07-jtbd-analysis.md`](./docs/biznes/07-jtbd-analysis.md) | Jobs-to-be-Done — motywacje i cele użytkownika |
| [`08-user-journey-map.md`](./docs/biznes/08-user-journey-map.md) | Mapa podróży użytkownika i punkty tarcia |
| [`09-brand-building-strategy.md`](./docs/biznes/09-brand-building-strategy.md) | Strategia budowania marki Enpsynea |
| [`competitor-audit.md`](./docs/biznes/competitor-audit.md) | Audyt konkurencji i analiza rynku |

### Pliki pomocnicze

| Plik | Zawartość |
|------|-----------|
| [`AGENTS.md`](./AGENTS.md) | Reguły i wytyczne dla AI Developer Agent |
| [`docs/zaimplementowane-plany.md`](./docs/zaimplementowane-plany.md) | Archiwalne plany implementacji (nieaktualne — zachowane historycznie) |

---

## Archiwum dokumentów

Wcześniejsze wersje dokumentów, zastąpione przez aktualną specyfikację. Zachowane jako materiał historyczny — nie używać jako źródła decyzji implementacyjnych.

| Plik | Zawartość |
|------|-----------|
| [`docs/archive/03-kill-the-idea-report.md`](./docs/archive/03-kill-the-idea-report.md) | Raport "Kill The Idea" v1 — wczesna walidacja pomysłu (2026-03-22) |
| [`docs/archive/03-kill-the-idea-report-v2.md`](./docs/archive/03-kill-the-idea-report-v2.md) | Raport "Kill The Idea" v2 — niezależna analiza ryzyk projektu |
| [`docs/archive/04-mvp-scoping-v2.md`](./docs/archive/04-mvp-scoping-v2.md) | MVP Scope v2 — wersja z kontami użytkowników (odrzucona) |
| [`docs/archive/04-mvp-scoping-v3.md`](./docs/archive/04-mvp-scoping-v3.md) | MVP Scope v3 — uproszczona wersja (poprzednia iteracja) |
| [`docs/archive/05-architektura.md`](./docs/archive/05-architektura.md) | Architektura systemu — poprzednia wersja przed decyzją localStorage-first |
| [`docs/archive/ICE_Ranking_Report.md`](./docs/archive/ICE_Ranking_Report.md) | Ranking ICE funkcji — priorytetyzacja na wczesnym etapie |
| [`docs/archive/Resource_Analysis.md`](./docs/archive/Resource_Analysis.md) | Analiza zasobów — czas, budżet, kompetencje dla MVP |
| [`docs/archive/auth-implementation-plan.md`](./docs/archive/auth-implementation-plan.md) | Plan implementacji autentykacji Supabase (dotyczy Etapu 2) |
| [`docs/archive/tech-stack-audit.md`](./docs/archive/tech-stack-audit.md) | Audyt tech stacku — analiza opcji autentykacji i hostingu |
