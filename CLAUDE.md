# CLAUDE.md — Reguły dla Claude Code

## Aktualizacja README

Przy każdej zmianie stanu projektu zaktualizuj `README.md`:

- **Nowa faza ukończona** → zmień status w tabeli "Status implementacji" z `Do zrobienia` na `Ukonczona`
- **Nowy plik w `src/`** → dodaj go do sekcji "Architektura" z krótkim opisem
- **Nowy dokument w `docs/biznes/`** → dodaj wiersz do tabeli "Dokumentacja projektu" z linkiem i opisem
- **Nowy plik w `docs/archive/`** → dodaj wiersz do tabeli "Archiwum dokumentów" z linkiem i opisem
- **Zmiana stacku lub zależności** → zaktualizuj linię `**Stack:**` oraz tabele w `AGENTS.md`

Linki do plików w README muszą być klikalne — format: `[nazwa](./ścieżka/do/pliku.md)`.

## Źródło prawdy dla implementacji

Przed każdą zmianą w kodzie przeczytaj:

1. [`docs/biznes/04-mvp-scope.md`](docs/biznes/04-mvp-scope.md) — zakres MVP
2. [`docs/biznes/05-logika-analizy.md`](docs/biznes/05-logika-analizy.md) — algorytm analizy
3. [`docs/biznes/06-plan-implementacji.md`](docs/biznes/06-plan-implementacji.md) — fazy i definicje ukończenia
4. [`AGENTS.md`](AGENTS.md) — reguły kodowania i architektura

Szczegółowe reguły dla AI Developer Agent: [`AGENTS.md`](AGENTS.md).
