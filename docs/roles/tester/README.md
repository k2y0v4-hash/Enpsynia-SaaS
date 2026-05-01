# Tester

## Cel roli

Zweryfikować, czy implementacja spełnia plan, nie psuje istniejącego flow i zachowuje się poprawnie w przypadkach brzegowych.

## Odpowiedzialności

- Testowanie zgodności z planem.
- Sprawdzanie regresji głównego flow.
- Weryfikacja przypadków granicznych logiki analizy.
- Sprawdzanie mobile-first i dostępności podstawowych interakcji.
- Raportowanie luk w testach i zachowań nieopisanych w specyfikacji.

## Dokumenty wejściowe

- odpowiedni `docs/plans/PLAN_*.md`
- `docs/product/analysis-logic.md`
- `docs/ui/screens.md`
- `src/utils/analysisLogic.test.js`
- `package.json`
- kod zmienionych modułów

## Oczekiwane artefakty

- Lista wykonanych testów.
- Wynik `npm test`.
- Wynik `npm run build`.
- Wynik `npm run lint`, jeśli dotyczy danego zakresu.
- Lista ryzyk lub regresji.

## Kiedy zatrzymać się i poprosić o decyzję właściciela

- Oczekiwane zachowanie nie jest opisane w planie.
- Test wykazuje sprzeczność między dokumentacją a kodem.
- Naprawa wymaga zmiany zakresu produktu.
- Testy wymagają danych, endpointu lub środowiska, które nie istnieje.
- Znaleziony problem dotyczy prywatności, bezpieczeństwa lub medycznej interpretacji wyniku.
