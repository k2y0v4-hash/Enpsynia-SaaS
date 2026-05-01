# Check-in Form

Status: backfilled, implemented.

## 1. Cel

Użytkownik odpowiada na 6 pytań dotyczących aktualnego stanu, aby aplikacja mogła obliczyć typ dnia i mikroakcję.

## 2. Zakres

### Wchodzi w zakres

- 6 pytań na suwakach w skali 1-5.
- Dwa bloki formularza po 3 pytania.
- Domyślne wartości na środku skali.
- Etykiety na krańcach skali.
- Stan dotknięcia suwaka (`touched`) dla każdego pytania.
- Przejście do wyniku po drugim bloku.

### Nie wchodzi w zakres

- Konta użytkowników.
- Walidacja po stronie backendu.
- Więcej niż 6 pytań.
- Personalizacja formularza.

## 3. Wymagania funkcjonalne

- Formularz zbiera wartości: `energy`, `overload`, `movement`, `social`, `agency`, `paralysis`.
- Każda wartość jest liczbą całkowitą od 1 do 5.
- Użytkownik może przejść z bloku 1 do bloku 2.
- Użytkownik może wrócić do poprzedniego bloku.
- Formularz przekazuje odpowiedzi do logiki analizy.
- Jeśli mniej niż 3 suwaki mają `touched = true` po kliknięciu wyniku, użytkownik trafia na ekran brakujących odpowiedzi i może wrócić albo kontynuować.

## 4. Wymagania niefunkcjonalne

- Suwaki muszą działać na dotyk i myszkę.
- UI musi być mobile-first.
- Teksty mają być krótkie i zrozumiałe.
- Formularz nie może wymagać konta ani połączenia z backendem.

## 5. Kontekst techniczny

- Implementacja: `src/components/CheckInForm.jsx`.
- Routing i przekazanie danych: `src/App.jsx`.
- Logika wyniku: `src/utils/analysisLogic.js`.
- Źródła: `docs/product/mvp-scope.md`, `docs/product/implementation-plan.md`, `docs/ui/screens.md`, `docs/product/analysis-logic.md`.

## 6. Kroki implementacji

1. Zdefiniować 6 pytań i klucze odpowiedzi.
2. Utworzyć suwaki ze skalą 1-5.
3. Podzielić pytania na dwa bloki.
4. Dodać nawigację dalej/wstecz.
5. Przekazać komplet odpowiedzi do `analyzeCheckIn`.
6. Zweryfikować przypadki brzegowe wartości 1, 3 i 5.

## 7. Kryteria akceptacji

- Użytkownik może odpowiedzieć na 6 pytań.
- Każda odpowiedź trafia do obiektu zgodnego z API `analyzeCheckIn`.
- Formularz działa na mobile.
- Brak backendu i auth.

## 8. Testy

- Ręcznie: przejść pełny flow formularza.
- Ręcznie: zmienić wartości suwaków i wrócić między blokami.
- Ręcznie: sprawdzić mobile 375px.
- Automatycznie: `npm test`.
- Build: `npm run build`.
