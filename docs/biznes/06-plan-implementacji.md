# Plan implementacji MVP — Enpsyneia Check In (Etap 1)

**Dotyczy:** Etap 1 (localStorage, brak kont)
**Podstawa:** `03-decision.md`, `04-mvp-scope.md`, `AGENTS.md`
**Data:** 2026-04-12

---

## Fazy prac

### Faza 1 — Setup projektu

**Cel:** Działające środowisko deweloperskie gotowe do budowania komponentów.

**Zakres:**
- Inicjalizacja projektu React (Vite)
- Konfiguracja Tailwind CSS
- Instalacja i konfiguracja Shadcn UI
- Konfiguracja Vercel (połączenie z repozytorium, auto-deploy z main)

**Definicja ukończenia:**
- `npm run dev` uruchamia pustą aplikację lokalnie
- Deploy na Vercel działa automatycznie po pushu na main
- Tailwind i Shadcn działają (jeden komponent testowy Button renderuje się poprawnie)

---

### Faza 2 — Landing page

**Cel:** Użytkownik rozumie w 10 sekund czym jest aplikacja i może rozpocząć check-in.

**Zakres:**
- Nagłówek + 2-zdaniowy opis wartości
- Jeden przycisk CTA: "Rozpocznij check-in"
- Layout mobilny (mobile-first)

**Definicja ukończenia:**
- Strona ładuje się i jest czytelna na telefonie (375px)
- CTA przenosi do formularza
- Brak zbędnych elementów (brak menu, brak linków zewnętrznych)

---

### Faza 3 — Formularz check-in

**Cel:** Użytkownik wypełnia 6 pytań na suwakach i przechodzi do wyniku.

**Zakres:**
- 6 suwaków (skala 1–5), każdy z etykietami na obu końcach
- Pytania w kolejności: energy, overload, movement, social, agency, paralysis
- Suwaki domyślnie ustawione na 3
- Progress bar: "Pytanie X z 6"
- Przycisk "Dalej" / "Zobacz wynik" na końcu

**Definicja ukończenia:**
- Wszystkie 6 suwaków działają na dotyk i myszce
- Progress bar aktualizuje się przy każdym pytaniu
- Formularz przekazuje 6 wartości do logiki analizy
- Możliwość cofnięcia się do poprzedniego pytania

---

### Faza 4 — Logika analizy

**Cel:** Na podstawie 6 odpowiedzi aplikacja zwraca typ dnia i jedną mikroakcję.

**Zakres:**
- Implementacja reguł if/else w `src/utils/analysisLogic.js`
  (Projekt używa JavaScript z JSX — rozszerzenie `.js`, nie `.ts`)
- 5 typów dnia: Działania, Wyciszenia, Odbudowy, Kontaktu, Przeciążenia
- Minimum 2 mikroakcje na typ dnia (wybierana losowo lub pierwsza)
- Pełne pokrycie: każda kombinacja odpowiedzi zwraca wynik

**Ważne:** Typ dnia ma charakter pomocniczy — jest podpowiedzią dla użytkownika, nie diagnozą medyczną ani psychologiczną. Komunikacja w UI musi to odzwierciedlać (np. "Twój dzień wygląda jak…", nie "Masz typ dnia…").

**Uwaga przed implementacją:** Przed kodowaniem napisz reguły przypisania w komentarzu lub osobnym pliku. Logika musi być przetestowana ręcznie na skrajnych przypadkach (wszystkie 1, wszystkie 5, wartości mieszane).

**Definicja ukończenia:**
- Każda możliwa kombinacja suwaków zwraca jeden z 5 typów dnia
- Żadna kombinacja nie zwraca `undefined` ani błędu
- Logika jest w osobnym pliku `analysisLogic.js` (nie w komponencie)

---

### Faza 5 — Ekran wyniku

**Cel:** Użytkownik widzi typ dnia i mikroakcję w sposób czytelny na pierwszy rzut oka.

**Zakres:**
- Wyświetlenie: podsumowanie stanu (1 linia) + typ dnia (duży) + mikroakcja (konkretna)
- Streak counter: "🔥 X dni z rzędu" (dane z localStorage)
- Przycisk "Wykonaj ponownie"

**Definicja ukończenia:**
- Wynik jest czytelny na telefonie bez scrollowania
- Streak counter pokazuje aktualną wartość
- Przycisk "Wykonaj ponownie" resetuje formularz i wraca do pytania 1

---

### Faza 6 — localStorage

**Cel:** Dane check-inu i streak są zapisywane i odczytywane między sesjami.

**Zakres:**
- Zapis ostatnich 5 check-inów do `enpsyneia_history`
- Zapis i aktualizacja streak do `enpsyneia_streak`
- Data ostatniego check-inu zapisywana w formacie `YYYY-MM-DD` (np. `"2026-04-12"`)
- Logika streak: jeśli ostatni check-in był wczoraj → streak +1; jeśli dziś → bez zmiany; jeśli dawniej → reset do 1
- Hook `useLocalStorage.js` do odczytu i zapisu

**Definicja ukończenia:**
- Po odświeżeniu strony streak i historia są zachowane
- Historia nie przekracza 5 wpisów (najstarszy usuwany automatycznie)
- Streak resetuje się poprawnie po przerwie dłuższej niż 1 dzień

---

### Faza 7 — QA i deploy

**Cel:** Aplikacja działa poprawnie na urządzeniach mobilnych i jest publicznie dostępna.

**Zakres:**
- Testy ręczne na telefonie (iOS Safari, Android Chrome)
- Sprawdzenie skrajnych przypadków formularza
- `npm run build` bez błędów
- Weryfikacja działania streak po symulacji kolejnych dni
- Deploy na Vercel (produkcja)

**Definicja ukończenia:**
- Aplikacja przechodzi pełny flow (landing → formularz → wynik → powrót) bez błędów na telefonie
- `npm run build` kończy się sukcesem
- URL produkcyjny działa i jest publicznie dostępny

---

## Poza zakresem tego etapu

- Supabase, baza danych, konta użytkowników, autentykacja
- Share buttons i udostępnianie wyników
- Powiadomienia push
- Feedback loop ("czy mikroakcja pomogła?")
- Obserwacje wzorców i wykresy historii
- Dark mode
- Pełna historia (więcej niż 5 wpisów)
- Logowanie błędów przez zewnętrzne narzędzia (np. Sentry)
- Zaawansowana analityka (Mixpanel, Plausible) — GA4 jest rekomendowana od Fazy 7, pozostałe narzędzia poza zakresem

---

## Integracje zewnętrzne

### Etap 1

| Integracja | Krytyczność | Trudność | Koszt | Szac. czas |
|------------|-------------|----------|-------|------------|
| Vercel | 🔴 Krytyczna | Niska | $0 | 0.25 d |
| Google Analytics 4 | 🟡 Opcjonalna, rekomendowana | Niska | $0 | 0.25 d |

> GA4 jest rekomendowana od Fazy 7 — metryki sukcesu Etapu 1 (completion rate, time-to-value, Day 7 return) są mierzone przez GA4.

### Etap 2 (po walidacji Etapu 1)

| Integracja | Krytyczność | Trudność | Koszt | Szac. czas | Ryzyka |
|------------|-------------|----------|-------|------------|--------|
| Supabase Auth | 🔴 Krytyczna dla Etapu 2 | Średnia | $0 | 1.5 d | Konfiguracja Magic Link, DKIM |
| Supabase Database | 🔴 Krytyczna dla Etapu 2 | Niska | $0 | 0.5 d | RLS wymaga konfiguracji |
| Resend (e-mail) | 🟡 Opcjonalna | Niska | $0 | 0.5 d | E-mail deliverability |
| Sentry | 🟢 Opcjonalna | Niska | $0 | 0.25 d | — |

---

## Ryzyka i miejsca wymagające walidacji

| Ryzyko | Gdzie | Co zrobić |
|--------|-------|-----------|
| Logika analizy nie pokrywa wszystkich kombinacji | Faza 4 | Napisać reguły przed kodowaniem, przetestować ręcznie na skrajnych wartościach |
| Suwaki trudne w obsłudze na dotyk (za małe, za wrażliwe) | Faza 3 | Przetestować na realnym telefonie przed Fazą 5 |
| Safari (iOS) czyści localStorage agresywnie | Faza 6 | Nie budować na tym żadnej krytycznej funkcji; streak to nice-to-have, nie blokuje wartości |
| Streak edge case: użytkownik robi 2 check-iny tego samego dnia | Faza 6 | Zdefiniować przed implementacją: ten sam dzień = streak bez zmiany |
| Mikroakcje brzmią generycznie | Faza 4 | Napisać co najmniej 2 konkretne mikroakcje na typ dnia przed implementacją |
