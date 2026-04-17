# Plan implementacji MVP — Enpsyneia Check In (Etap 1)

**Dotyczy:** Etap 1 (localStorage, brak kont)
**Podstawa:** `../context/decision-log.md`, `mvp-scope.md`, `AGENTS.md`
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

**Kanoniczny copy (obowiązujący):**
- Headline: „Czego teraz najbardziej potrzebujesz?"
- Value prop: „Wypełnij 6 prostych pytań i otrzymaj jedną konkretną mikroakcję. W mniej niż 2 minuty."
- CTA: „Rozpocznij check-in"

**Definicja ukończenia:**
- Strona ładuje się i jest czytelna na telefonie (375px)
- CTA przenosi do formularza
- Brak zbędnych elementów (brak menu, brak linków zewnętrznych)

---

### Faza 3 — Formularz check-in

**Cel:** Użytkownik wypełnia 6 pytań na suwakach i przechodzi do wyniku.

**Zakres:**
- 6 suwaków (skala 1–5), każdy z etykietami na obu końcach, pogrupowanych w 2 bloki po 3
- Blok 1 (aktualny stan): energy, overload, paralysis
- Blok 2 (kierunek regulacji): movement, social, agency
- Help text pod każdym pytaniem (szary, mały font) — treści w `docs/ui/screens.md` sekcja Ekran 2
- Suwaki domyślnie ustawione na 3
- Markery skali: 5 subtelnych kresek pod trackiem — bez centralnej wartości liczbowej
- Progress bar: "Blok X z 2"
- Przycisk "Dalej" na Bloku 1 / "Zobacz wynik" na Bloku 2
- Układ przewijalny — nie wymagane upychanie na jednym ekranie

**Definicja ukończenia:**
- Wszystkie 6 suwaków działają na dotyk i myszce
- Help text wyświetlany pod każdym pytaniem, zawsze widoczny
- Progress bar aktualizuje się przy zmianie bloku
- Formularz przekazuje 6 wartości do logiki analizy
- Możliwość cofnięcia się do poprzedniego bloku

---

### Faza 4 — Logika analizy

**Cel:** Na podstawie 6 odpowiedzi aplikacja zwraca typ dnia i jedną mikroakcję.

**Zakres:**
- Implementacja reguł if/else w `src/utils/analysisLogic.js`
  (Projekt używa JavaScript z JSX — rozszerzenie `.js`, nie `.ts`)
- 5 typów dnia: Działania, Wyciszenia, Odbudowy, Kontaktu, Przeciążenia
- Minimum 2 mikroakcje na typ dnia (wybierana deterministycznie na podstawie jednej zmiennej pomocniczej — per reguły z `docs/product/analysis-logic.md`)
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
- Wyświetlenie: podsumowanie stanu (1 linia) + typ dnia (duży) + uzasadnienie wyniku (1 zdanie pod typem dnia) + mikroakcja (konkretna)
- Uzasadnienie wyniku (1 zdanie pod typem dnia) — teksty per typ w `docs/product/analysis-logic.md` sekcja 7
- Streak counter: "🔥 X dni z rzędu" (dane z localStorage)
- Przycisk "Wykonaj ponownie"
- Przycisk "Czy to pomogło?" (dwie opcje: 👍 / 👎) — wysyła event do GA4; brak zapisu lokalnego, brak backendu

**Definicja ukończenia:**
- Wynik jest czytelny na telefonie bez scrollowania
- Uzasadnienie wyniku wyświetlane pod typem dnia
- Streak counter pokazuje aktualną wartość
- Przycisk "Wykonaj ponownie" resetuje formularz i wraca do pytania 1
- Przycisk "Czy to pomogło?" jest widoczny i wysyła event do GA4 (`feedback_helpful: true/false`)
- Po kliknięciu 👍 lub 👎: kliknięty przycisk wyróżniony, drugi wyszarzony, oba nieklikalnie — reset przy "Wykonaj ponownie"

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
- Streak counter na Landing page pojawia się dopiero gdy `enpsyneia_streak.currentStreak > 0`

---

### Faza 7 — QA i deploy

**Cel:** Aplikacja działa poprawnie na urządzeniach mobilnych i jest publicznie dostępna.

**Zakres:**
- Testy ręczne na telefonie (iOS Safari, Android Chrome)
- Sprawdzenie skrajnych przypadków formularza
- `npm run build` bez błędów
- Weryfikacja działania streak po symulacji kolejnych dni (brak backendu — symulacja przez mocking `Date` w testach jednostkowych lub ręczną edycję klucza `lastCheckIn` w localStorage DevTools)
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
- Rozbudowany feedback loop (historia odpowiedzi, analiza trendów) — prosty przycisk "Czy to pomogło?" jest w Fazie 5
- Obserwacje wzorców i wykresy historii
- Dark mode
- Pełna historia (więcej niż 5 wpisów)
- Logowanie błędów przez zewnętrzne narzędzia (np. Sentry)
- Zaawansowana analityka (Mixpanel, Plausible) — GA4 jest wymagana od Fazy 7, pozostałe narzędzia poza zakresem
- Newsletter signup (email capture) — element marketingowy, nie produktowy; poza zakresem implementacji Etapu 1; dodawany post-launch jako aktywność dystrybucyjna (patrz `09-brand-building-strategy.md`)

---

## Integracje zewnętrzne

### Etap 1

| Integracja | Krytyczność | Trudność | Koszt | Szac. czas |
|------------|-------------|----------|-------|------------|
| Vercel | 🔴 Krytyczna | Niska | $0 | 0.25 d |
| Google Analytics 4 | 🔴 Krytyczna | Niska | $0 | 0.25 d |

> GA4 jest wymagana — bez niej nie można zmierzyć żadnej primary metric Etapu 1 (completion rate, time-to-value, Day 7 return). Wdrożenie: Faza 7.
>
> **Wymagane eventy GA4 dla Etapu 1:**
> | Event | Kiedy triggerować | Parametry |
> |-------|-------------------|-----------|
> | `form_start` | Użytkownik klika CTA na landing page | — |
> | `result_shown` | Ekran wyniku wyświetlony | `day_type: string` |
> | `feedback_helpful` | Użytkownik klika 👍 lub 👎 | `helpful: true/false` |

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
| ~~Mikroakcje brzmią generycznie~~ | Faza 4 | Rozwiązane — pełne teksty 10 mikroakcji (2 per typ dnia) zdefiniowane w `docs/product/analysis-logic.md` |
