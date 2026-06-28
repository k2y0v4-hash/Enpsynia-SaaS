# Business Documentation Index

Ten katalog jest indeksem źródeł biznesowych projektu. Nie duplikuje pełnej treści dokumentów.

## Dokumenty biznesowe (porządkujące, w tym katalogu)

- `docs/business/product_goals.md` — cele produktu, wartość, model check-inu, mikroakcja, konto opcjonalne.
- `docs/business/user_stories.md` — krótkie user stories (stan wdrożony).
- `docs/business/use_cases.md` — przypadki użycia (anon check-in, propozycja konta, rejestracja,
  potwierdzenie e-maila, logowanie, zapis do Supabase, historia, wylogowanie, odrzucenie analytics).
- `docs/business/business_constraints.md` — ograniczenia biznesowe (konto opcjonalne, brak resetu hasła,
  brak migracji historii, minimalizacja danych, produkcja Vercel, zależność od Supabase, znany
  niewdrożony problem Prywatność/Regulamin).

Powyższe pliki nie tworzą nowych wymagań — porządkują i wskazują źródła prawdy poniżej.

## Źródła

- `docs/product/mvp-scope.md` — zakres MVP, Etap 1/2, metryki sukcesu i ograniczenia.
- `docs/context/project-vision.md` — wizja projektu i szerszy kontekst Enpsyneia.
- `docs/context/icp-persona.md` — profil użytkownika, persony i potrzeby.
- `docs/context/jtbd-analysis.md` — Jobs To Be Done i motywacje użytkownika.
- `docs/context/user-journey.md` — ścieżka użytkownika, punkty tarcia i oczekiwane efekty.
- `docs/context/decision-log.md` — decyzje i uzasadnienia produktowe.

## Zasada użycia

Dla nowych funkcjonalności najpierw powstaje plan w `docs/plans/PLAN_*.md`. Powyższe dokumenty dostarczają kontekstu i zakresu, a plan jest kontraktem implementacji.
