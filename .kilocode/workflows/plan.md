# Workflow: plan

## Cel

Utworzyć kompletny plan funkcjonalności SDD przed implementacją.

## Wejście

- Krótki opis funkcjonalności od właściciela projektu.
- Istniejące źródła prawdy repozytorium.

## Wyjście

- Jeden plik `docs/plans/PLAN_<nazwa_funkcjonalnosci>.md`.
- Plan zgodny ze strukturą `docs/plans/PLAN_template.md`.

## Zasady

1. Jedna funkcjonalność = jeden plan.
2. Plan musi być mały i możliwy do wdrożenia jako samodzielny zakres.
3. Plan jest kontraktem implementacji.
4. Nie wolno wpisywać funkcji, których nie da się potwierdzić w dokumentacji lub kodzie.
5. Jeśli wymaganie jest niejasne, wpisz pytanie do właściciela zamiast zgadywać.
6. Jeśli funkcjonalność wykracza poza Etap 1, oznacz to w sekcji "Nie wchodzi w zakres" albo zatrzymaj pracę.
7. Nie aktualizuj `implemented_plans.md` ani `implemented_features.md` na etapie samego planowania, chyba że plan porządkuje już istniejący kod jako `backfilled`.

## Obowiązkowa struktura planu

```markdown
# Nazwa funkcjonalności

## 1. Cel

## 2. Zakres

### Wchodzi w zakres

### Nie wchodzi w zakres

## 3. Wymagania funkcjonalne

## 4. Wymagania niefunkcjonalne

## 5. Kontekst techniczny

## 6. Kroki implementacji

## 7. Kryteria akceptacji

## 8. Testy
```

## Proces

1. Przeczytaj wymaganie właściciela.
2. Sprawdź właściwe dokumenty:
   - `README.md`
   - `AGENTS.md`
   - `docs/product/*`
   - `docs/business/README.md`
   - `docs/tech/README.md`
   - `docs/architecture/*`, jeśli funkcja dotyka architektury
3. Zweryfikuj, czy zakres jest jedną małą funkcjonalnością.
4. Utwórz plik w `docs/plans/PLAN_<nazwa>.md`.
5. Wypełnij wszystkie sekcje.
6. W sekcji testów wskaż konkretne testy automatyczne i ręczne.
7. Zakończ statusem:
   - `gotowe do review`,
   - `wymaga decyzji właściciela`,
   - `zablokowane`.

## Kryteria odrzucenia planu

Odrzuć lub zatrzymaj planowanie, jeśli:

- funkcjonalność jest zbyt duża,
- brak źródeł do potwierdzenia wymagań,
- zakres wymaga backendu w Etapie 1,
- zakres narusza ograniczenia MVP,
- plan wymaga decyzji właściciela przed opisaniem.

## Rejestry

Po zatwierdzeniu planu można dodać go do `implemented_plans.md` jako:

```markdown
- [ ] docs/plans/PLAN_<nazwa>.md
```

Po implementacji workflow `implement` zmienia status na `[x]` i aktualizuje `implemented_features.md`.

## Powiązane dokumenty

- `docs/plans/PLAN_template.md`
- `implemented_plans.md`
- `implemented_features.md`
- `AGENTS.md`
