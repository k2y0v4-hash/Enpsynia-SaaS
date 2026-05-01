# Workflow: plan

## Cel

Utworzyć kompletny plan funkcjonalności przed implementacją.

## Wejście

- Opis funkcjonalności od właściciela projektu.
- Istniejące źródła prawdy: `docs/product/*`, `docs/business`, `docs/tech`, `docs/architecture`, aktualny kod repo.

## Wyjście

- Kompletny plik `docs/plans/PLAN_*.md`.
- Plan gotowy do review i zatwierdzenia przez właściciela projektu.

## Wymagania

- Plan ma używać 8 obowiązkowych sekcji z `docs/plans/PLAN_template.md`.
- Zakres ma być mały: jedna funkcjonalność, jeden plan.
- Plan ma być jednoznaczny: bez placeholderów, warunkowych domysłów i niezweryfikowanych wymagań.
- Plan ma rozdzielać zakres od rzeczy poza zakresem.
- Plan ma zawierać kryteria akceptacji i testy.
- Workflow `plan` nie implementuje kodu.
- Jeśli wymaganie jest sprzeczne z dokumentacją lub kodem, praca zatrzymuje się do decyzji właściciela.

## Proces

1. Przeczytaj opis funkcjonalności.
2. Sprawdź, czy funkcjonalność mieści się w aktualnym etapie produktu.
3. Sprawdź istniejące plany, żeby nie duplikować zakresu.
4. Utwórz `docs/plans/PLAN_<nazwa>.md`.
5. Wypełnij wszystkie sekcje planu.
6. Wskaż dokumenty i moduły kodu, których dotyczy plan.
7. Zakończ statusem: gotowe do review / wymaga decyzji / zablokowane.

## Rejestry

Nowy plan można dodać do `implemented_plans.md` jako `[ ]` dopiero po akceptacji planu. Plan opisujący istniejący kod może być oznaczony jako `backfilled`.
