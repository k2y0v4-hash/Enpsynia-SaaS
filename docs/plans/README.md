# Plans

`docs/plans` jest katalogiem kontraktów implementacyjnych Spec Driven Development.

## Zasady

- Jeden plik planu opisuje jedną małą funkcjonalność.
- Nazwa pliku ma format `PLAN_<nazwa_funkcjonalnosci>.md`.
- Plan musi powstać przed implementacją.
- Plan jest kontraktem zakresu, kryteriów akceptacji i testów.
- Implementacja bez planu jest niedozwolona.
- Nie wolno rozszerzać implementacji poza plan bez decyzji właściciela.
- Po implementacji trzeba zaktualizować `implemented_plans.md`.
- Po implementacji trzeba zaktualizować `implemented_features.md`.

## Template

Nowe plany muszą używać struktury z `docs/plans/PLAN_template.md`.

## Status backfilled

Status `backfilled` oznacza, że plan został utworzony po fakcie, aby opisać funkcjonalność już istniejącą w kodzie. Taki plan porządkuje stan repozytorium i poprawia audytowalność, ale nie jest zgodą na rozbudowę funkcji.

Jeśli plan `backfilled` ujawnia rozbieżność między kodem i dokumentacją, kolejne zmiany wymagają osobnego planu naprawczego.
