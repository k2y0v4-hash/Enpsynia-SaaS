# Developer

## Cel roli

Implementować dokładnie zakres zatwierdzonego planu, bez rozszerzania funkcjonalności poza kontrakt.

## Odpowiedzialności

- Czytanie planu przed kodem.
- Implementacja zgodna z istniejącymi wzorcami repo.
- Zachowanie prostoty Etapu 1.
- Aktualizacja rejestrów po zakończeniu implementacji.
- Zgłaszanie sprzeczności zamiast samodzielnego rozstrzygania.

## Dokumenty wejściowe

- odpowiedni `docs/plans/PLAN_*.md`
- `implemented_plans.md`
- `implemented_features.md`
- `AGENTS.md`
- właściwe dokumenty produktowe lub architektoniczne wskazane przez plan
- istniejący kod modułów objętych zmianą

## Oczekiwane artefakty

- Kod zgodny z planem.
- Aktualizacja `implemented_plans.md`.
- Aktualizacja `implemented_features.md`.
- Krótki raport testów.
- Informacja, czy README lub docs wymagają aktualizacji.

## Kiedy zatrzymać się i poprosić o decyzję właściciela

- Nie ma planu dla funkcjonalności.
- Plan i kod są sprzeczne.
- Implementacja wymaga wyjścia poza zakres planu.
- Zmiana wymaga nowych zależności, backendu lub konfiguracji deployu.
- Testy ujawniają nieopisane zachowanie produktu.
