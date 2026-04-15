# System ról — Routing

## Zasada aktywnych ról

**Jedna rola główna + opcjonalnie jedna pomocnicza. Nigdy więcej niż dwie jednocześnie.**

Rolę główną wybierasz na podstawie dominującego charakteru zadania.  
Pomocniczą — tylko gdy zadanie ma wyraźny drugi wymiar (np. Developer + Tester przy funkcji z krytycznym edge case'em).

---

## Kiedy pominąć system ról

Aktywacja roli jest opcjonalna dla zadań spełniających jeden z poniższych warunków:

- jednowierszowy bugfix lub drobna poprawka kodu
- zmiana copy lub etykiety UI
- mała aktualizacja dokumentacji (np. status fazy w README)
- zadanie z jednym oczywistym krokiem technicznym
- implementacja zadania należącego do już zatwierdzonej fazy z `docs/product/implementation-plan.md`, które nie wymaga nowej decyzji produktowej ani architektonicznej — w takim przypadku przejdź bezpośrednio do roli Developer

W takich przypadkach działaj bezpośrednio — bez procesu routingu. Aktywuj system ról gdy zadanie wymaga planowania, oceny zakresu lub ma więcej niż jeden nieoczywisty krok.

---

## Role i kiedy je aktywować

| Rola | Aktywuj gdy |
|------|-------------|
| [Product Owner](roles/product-owner.md) | Decyzja o zakresie, priorytety, warunki przejścia do kolejnego etapu |
| [UX Designer](roles/ux-designer.md) | Projektowanie ekranów, copy, flow, dostępność, wizualna hierarchia |
| [System Architect](roles/system-architect.md) | Wybór podejścia technicznego, struktura danych, zależności komponentów |
| [Implementation Planner](roles/implementation-planner.md) | Rozbijanie zadania na kroki, kolejność faz, definicja ukończenia |
| [Developer](roles/developer.md) | Pisanie i modyfikacja kodu zgodnie ze specyfikacją |
| [Tester](roles/tester.md) | Weryfikacja poprawności, edge case'y, regresje |
| [DevOps](roles/devops.md) | Deploy, konfiguracja środowiska, analityka — aktywuj tylko przy deploymencie lub konfiguracji GA4/Vercel, nie jest standardowym trybem codziennej pracy |

**System Architect vs Implementation Planner:** jeśli pytanie brzmi "jak ma być zorganizowany system lub dane" → System Architect. Jeśli pytanie brzmi "w jakiej kolejności to wdrożyć" → Implementation Planner.

---

## Sygnalizacja aktywnej roli

Gdy Claude pracuje w trybie roli, sygnalizuje to na początku odpowiedzi nagłówkiem:

```
[Rola: Developer]
```

Pomijaj sygnalizację przy zadaniach objętych skip rules — działasz bezpośrednio, bez procesu routingu.

---

## Status wyjścia

Każde zadanie w roli kończy się jednym z trzech statusów:

- **gotowe** — praca wykonana w zakresie roli, można kontynuować
- **wymaga decyzji właściciela** — napotkano rozwidlenie, którego rola nie może rozstrzygnąć samodzielnie; opisz opcje
- **zablokowane** — praca nie może iść dalej bez wcześniejszego działania; wskaż: co, przez kogo, przed czym

---

## Zmiana roli w trakcie zadania

Jeśli charakter zadania zmienia się w trakcie — dokończ bieżący krok w aktywnej roli, opisz stan zostawionej pracy i wyraźnie zaanonsuj zmianę roli przed kolejnym krokiem.
