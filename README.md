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
| Faza 5 — Ekran wyniku | Wyświetlenie wyniku, streak, feedback | Ukonczona |
| Faza 6 — localStorage | Historia 5 check-inów, streak counter | Ukonczona |
| Faza 7 — QA i deploy | Testy mobilne, GA4, Vercel produkcja | Do zrobienia |

---

## Architektura

```
src/
├── App.jsx                    # Routing między ekranami (landing → form → result)
├── components/
│   ├── Landing.jsx            # Ekran startowy z CTA
│   ├── CheckInForm.jsx        # Formularz 2 bloki po 3 pytania
│   ├── AnalysisScreen.jsx     # Ekran przejściowy "Analizuję..."
│   ├── ResultScreen.jsx       # Ekran wyniku z mikroakcją i feedbackiem
│   ├── ProgressBar.jsx        # Pasek postępu "Blok X z 2"
│   └── ui/button.jsx          # Komponent Shadcn
├── utils/
│   ├── analysisLogic.js       # Logika analizy — 5 typów dnia, mikroakcje
│   └── analysisLogic.test.js  # Testy jednostkowe logiki
└── hooks/                     # Hook useLocalStorage (Faza 6)
```

**Logika analizy** ([`src/utils/analysisLogic.js`](./src/utils/analysisLogic.js)) działa na drzewie priorytetów per [`docs/product/analysis-logic.md`](./docs/product/analysis-logic.md):

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

### Źródła prawdy (implementacja)

| Plik | Zawartość |
|------|-----------|
| [`docs/product/mvp-scope.md`](./docs/product/mvp-scope.md) | Zakres MVP — Tier 1/2, funkcje, metryki sukcesu |
| [`docs/product/analysis-logic.md`](./docs/product/analysis-logic.md) | Specyfikacja algorytmu analizy, mikroakcje, teksty UI |
| [`docs/product/implementation-plan.md`](./docs/product/implementation-plan.md) | Plan fazowy — zakres per faza, definicje ukończenia |

### UI i architektura

| Plik | Zawartość |
|------|-----------|
| [`docs/ui/screens.md`](./docs/ui/screens.md) | Opis ekranów, copy, zasady UI |
| [`docs/architecture/tech-stack.md`](./docs/architecture/tech-stack.md) | Stack, struktura src/, localStorage schema |

### Kontekst i materiały pomocnicze

| Plik | Zawartość |
|------|-----------|
| [`docs/context/project-vision.md`](./docs/context/project-vision.md) | Wizja projektu i mechanizm nawykowy |
| [`docs/context/icp-persona.md`](./docs/context/icp-persona.md) | Profil użytkownika (ICP) i persony |
| [`docs/context/decision-log.md`](./docs/context/decision-log.md) | Uzasadnienie decyzji o kontynuacji projektu |
| [`docs/context/jtbd-analysis.md`](./docs/context/jtbd-analysis.md) | Jobs-to-be-Done — motywacje i cele użytkownika |
| [`docs/context/user-journey.md`](./docs/context/user-journey.md) | Mapa podróży użytkownika i punkty tarcia |
| [`docs/context/brand-strategy.md`](./docs/context/brand-strategy.md) | Strategia budowania marki Enpsynea |
| [`docs/context/competitor-audit.md`](./docs/context/competitor-audit.md) | Audyt konkurencji i analiza rynku |

### Pliki pomocnicze

| Plik | Zawartość |
|------|-----------|
| [`AGENTS.md`](./AGENTS.md) | Reguły i wytyczne dla AI Developer Agent |

### Zasada tworzenia dokumentów

Nowy dokument tworzymy tylko wtedy, gdy nie da się sensownie rozszerzyć istniejącego pliku.

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
