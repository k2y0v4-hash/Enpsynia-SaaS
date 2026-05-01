# Workflow: implement

## Cel

Zaimplementować funkcjonalność dokładnie zgodnie z zatwierdzonym planem SDD.

## Wejście

- Zatwierdzony plik `docs/plans/PLAN_*.md`.

## Wyjście

- Kod zgodny z planem.
- Testy zgodne z sekcją "Testy" w planie.
- Aktualizacja dokumentacji, jeśli plan tego wymaga.
- Aktualizacja `implemented_plans.md`.
- Aktualizacja `implemented_features.md`.

## Wymagania

- Implementacja musi być zgodna z planem.
- Nie wolno rozszerzać zakresu poza plan bez decyzji właściciela.
- Nie wolno dodawać zależności, backendu ani zmian deployu, jeśli plan tego nie przewiduje.
- Jeśli kod i plan są sprzeczne, praca musi zostać zatrzymana.
- Po implementacji plan musi być oznaczony jako wykonany w `implemented_plans.md`.
- Po implementacji funkcjonalność musi być opisana w `implemented_features.md`.

## Proces

1. Przeczytaj cały plan.
2. Przeczytaj dokumenty wskazane w sekcji "Kontekst techniczny".
3. Sprawdź aktualny kod przed edycją.
4. Wykonaj wyłącznie kroki z planu.
5. Dodaj lub zaktualizuj testy.
6. Uruchom wymagane komendy, minimum `npm test` i `npm run build`.
7. Zaktualizuj rejestry.
8. Zakończ raportem zmian, testów, buildu i ewentualnych odstępstw.

## Warunki stopu

- Brak planu.
- Plan nie ma wymaganych sekcji.
- Plan wymaga funkcji poza zakresem MVP.
- Implementacja wymaga decyzji produktowej, bezpieczeństwowej lub architektonicznej.
- Testy ujawniają zachowanie nieopisane w planie.
