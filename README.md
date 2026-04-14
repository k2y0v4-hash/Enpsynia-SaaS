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

**Logika analizy** (`src/utils/analysisLogic.js`) działa na drzewie priorytetów per `docs/biznes/05-logika-analizy.md`:

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
| `01-opis-pomyslu.md` | Opis koncepcji |
| `02-icp-persona.md` | Profil użytkownika (ICP) |
| `03-decision.md` | Decyzje projektowe |
| `04-mvp-scope.md` | Zakres MVP |
| `05-logika-analizy.md` | Specyfikacja logiki analizy |
| `06-plan-implementacji.md` | Plan fazowy |
| `07-jtbd-analysis.md` | Jobs-to-be-Done |
| `08-user-journey-map.md` | Mapa podróży użytkownika |
| `09-brand-building-strategy.md` | Strategia marki |
| `competitor-audit.md` | Audyt konkurencji |
