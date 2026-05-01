# Analysis Logic

Status: backfilled, implemented.

## 1. Cel

Aplikacja deterministycznie przypisuje użytkownikowi typ dnia i mikroakcję na podstawie 6 odpowiedzi.

## 2. Zakres

### Wchodzi w zakres

- Pure function `analyzeCheckIn`.
- 5 typów dnia: Działania, Wyciszenia, Odbudowy, Kontaktu, Przeciążenia.
- Deterministyczny wybór jednej mikroakcji.
- Testy przypadków z dokumentacji.

### Nie wchodzi w zakres

- Uczenie maszynowe.
- Losowość.
- Personalizacja na podstawie historii.
- Diagnoza medyczna lub psychologiczna.

## 3. Wymagania funkcjonalne

- Funkcja przyjmuje `{ energy, overload, movement, social, agency, paralysis }`.
- Funkcja zwraca typ dnia, uzasadnienie, mikroakcję i klucz mikroakcji.
- Każda kombinacja wartości 1-5 musi zwrócić wynik.
- Kolejność priorytetów ma być zgodna z `docs/product/analysis-logic.md`.
- Aktualny kod nie zwraca `summaryText`; ekran wyniku używa `justificationText`, `dayType`, `microaction` i `microactionKey`.

## 4. Wymagania niefunkcjonalne

- Logika ma być prosta i ręcznie audytowalna.
- Brak zależności od UI.
- Brak efektów ubocznych.
- Wyniki mają być powtarzalne dla tych samych danych wejściowych.

## 5. Kontekst techniczny

- Implementacja: `src/utils/analysisLogic.js`.
- Testy: `src/utils/analysisLogic.test.js`.
- Źródło prawdy: `docs/product/analysis-logic.md`.

## 6. Kroki implementacji

1. Zdefiniować stałe typów dnia.
2. Zaimplementować drzewo priorytetów.
3. Zaimplementować deterministyczny wybór mikroakcji A/B.
4. Dodać teksty uzasadnienia i mikroakcje.
5. Dodać testy dla przypadków z dokumentacji.
6. Uruchomić testy.

## 7. Kryteria akceptacji

- 16 przypadków testowych z dokumentacji przechodzi.
- Brak kombinacji wejściowej zwracającej `undefined`.
- Logika jest oddzielona od komponentów React.
- Funkcja nie wysyła danych do analytics ani localStorage.

## 8. Testy

- Automatycznie: `npm test`.
- Ręcznie: sprawdzić wartości skrajne: wszystkie 1, wszystkie 3, wszystkie 5.
- Ręcznie: sprawdzić konflikty opisane w `analysis-logic.md`.
