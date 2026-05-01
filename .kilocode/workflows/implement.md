# Workflow: implement

## Cel

Zaimplementować funkcjonalność dokładnie zgodnie z zatwierdzonym planem SDD.

## Wejście

- Jeden zatwierdzony plik `docs/plans/PLAN_*.md`.

## Wyjście

- Kod zgodny z planem.
- Testy adekwatne do ryzyka zmiany.
- Aktualizacja dokumentacji, jeśli plan tego wymaga.
- Aktualizacja `implemented_plans.md`.
- Aktualizacja `implemented_features.md`.

## Zasady

1. Nie implementuj bez planu.
2. Plan jest kontraktem. Nie rozszerzaj zakresu bez decyzji właściciela.
3. Jeśli plan i kod są sprzeczne, zatrzymaj pracę i zgłoś sprzeczność.
4. Jeśli podczas implementacji pojawia się nowy wymóg, zapisz go jako osobny plan albo poproś o decyzję właściciela.
5. Nie dodawaj zależności, backendu ani konfiguracji deployu, jeśli plan tego nie przewiduje.
6. Nie zmieniaj dokumentów historycznych, jeśli wystarczy zaktualizować bieżący plan lub rejestry.
7. Po implementacji oznacz plan jako wykonany w `implemented_plans.md`.
8. Po implementacji opisz funkcjonalność w `implemented_features.md`.

## Proces

1. Przeczytaj cały plik `docs/plans/PLAN_*.md`.
2. Przeczytaj dokumenty wejściowe wskazane w sekcji "Kontekst techniczny".
3. Sprawdź aktualny kod przed edycją.
4. Zaimplementuj tylko kroki z sekcji "Kroki implementacji".
5. Dodaj lub zaktualizuj testy opisane w sekcji "Testy".
6. Uruchom wymagane komendy z planu, minimum:
   - `npm test`
   - `npm run build`
7. Jeśli zmiana dotyczy lintowania lub kodu współdzielonego, uruchom także:
   - `npm run lint`
8. Zaktualizuj rejestry:
   - w `implemented_plans.md` ustaw plan jako `[x]`,
   - w `implemented_features.md` dodaj lub zaktualizuj opis funkcjonalności.
9. Zakończ raportem:
   - zmienione pliki,
   - wykonane testy,
   - status build,
   - odstępstwa od planu,
   - elementy wymagające decyzji właściciela.

## Kiedy zatrzymać pracę

Zatrzymaj implementację i poproś właściciela o decyzję, jeśli:

- plan nie ma wymaganych sekcji,
- zakres planu jest sprzeczny z `AGENTS.md` lub `docs/product`,
- plan wymaga funkcji spoza MVP,
- implementacja wymaga nowych sekretów lub danych wrażliwych,
- testy ujawniają zachowanie nieopisane w planie,
- wymagane są zmiany architektoniczne bez ADR.

## Powiązane dokumenty

- `docs/plans/PLAN_template.md`
- `implemented_plans.md`
- `implemented_features.md`
- `AGENTS.md`
- `docs/roles/developer/README.md`
- `docs/roles/tester/README.md`
