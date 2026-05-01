# Local Storage

Status: backfilled, implemented.

## 1. Cel

Aplikacja zachowuje lokalną historię check-inów i dane pomocnicze Etapu 1 bez backendu i bez konta użytkownika.

## 2. Zakres

### Wchodzi w zakres

- Zapis historii ostatnich 5 check-inów.
- Odczyt historii z localStorage.
- Odporność na brak lub uszkodzone dane localStorage.
- Aktualny kod nie implementuje streak countera; localStorage obejmuje historię check-inów i zgodę analytics.
- Zgoda analytics jako osobny klucz localStorage.

### Nie wchodzi w zakres

- Synchronizacja między urządzeniami.
- Supabase.
- Auth.
- Pełna historia długoterminowa.
- Przechowywanie sekretów, tokenów auth lub haseł.

## 3. Wymagania funkcjonalne

- Po ukończeniu check-inu aplikacja zapisuje wpis historii.
- Historia nie przekracza 5 wpisów.
- Aplikacja czyta historię przy starcie.
- Błąd localStorage nie blokuje głównego flow.
- Dane pozostają tylko w przeglądarce użytkownika.

## 4. Wymagania niefunkcjonalne

- Dane localStorage nie mogą być traktowane jako bezpieczne miejsce na sekrety.
- Brak danych auth w localStorage w Etapie 1.
- Format danych powinien być prosty i możliwy do migracji w Etapie 2.
- Aplikacja musi działać, gdy localStorage jest niedostępny.

## 5. Kontekst techniczny

- Implementacja: `src/hooks/useLocalStorage.js`.
- Zgoda analytics: `src/hooks/useConsent.js`.
- Źródła: `AGENTS.md`, `docs/architecture/tech-stack.md`, `docs/product/implementation-plan.md`, `docs/product/mvp-scope.md`, `README.md`.

## 6. Kroki implementacji

1. Zdefiniować klucze localStorage.
2. Dodać bezpieczny odczyt historii.
3. Dodać zapis nowego check-inu.
4. Ograniczyć historię do 5 wpisów.
5. Obsłużyć błędy odczytu/zapisu.
6. Zweryfikować zgodność schematu z dokumentacją.

## 7. Kryteria akceptacji

- Historia jest zachowana po odświeżeniu strony.
- Historia ma maksymalnie 5 wpisów.
- Uszkodzony JSON w localStorage nie wywraca aplikacji.
- Aplikacja nie zapisuje sekretów ani tokenów.

## 8. Testy

- Ręcznie: wykonać kilka check-inów i sprawdzić historię.
- Ręcznie: odświeżyć stronę i sprawdzić historię.
- Ręcznie: wyczyścić localStorage i sprawdzić działanie aplikacji.
- Automatycznie: `npm test`.
- Build: `npm run build`.
