# Technical Documentation Index

Ten katalog jest indeksem dokumentów technicznych i konfiguracji. Nie duplikuje pełnej treści dokumentów.

## Źródła

- `docs/architecture/tech-stack.md` — stack, struktura `src/`, schemat localStorage.
- `docs/architecture/system_overview.md` — przegląd systemu, komponenty, przepływy i granice.
- `docs/architecture/adr_001_local_storage_first.md` — decyzja localStorage-first.
- `docs/architecture/adr_002_ga4_after_consent.md` — decyzja GA4 po zgodzie.
- `AGENTS.md` — reguły pracy AI, stack i zasady implementacji.
- `package.json` — skrypty npm i zależności projektu.
- `.env.example` — szablon zmiennej `VITE_GA4_ID`.
- `.github/dependabot.yml` — konfiguracja Dependabot dla npm i GitHub Actions.

## Zasada użycia

Zmiany techniczne powinny wynikać z zatwierdzonego planu w `docs/plans/PLAN_*.md`. Jeśli zmiana wpływa na architekturę, dodaj lub zaktualizuj ADR.
