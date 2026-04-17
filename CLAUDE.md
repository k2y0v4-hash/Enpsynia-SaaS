# CLAUDE.md — Reguły dla Claude Code

## Aktualizacja README

Przy każdej zmianie stanu projektu zaktualizuj `README.md`.

## Zasady pracy w repo

To repozytorium rozwijamy zgodnie z ustaloną strukturą i dokumentacją.
Najpierw czytaj dokumenty, potem zmieniaj kod.

## Kolejność czytania na początku sesji

1. CLAUDE.md
2. AGENTS.md
3. README.md
4. docs/product/mvp-scope.md
5. docs/product/analysis-logic.md
6. docs/product/implementation-plan.md

## Mapa odpowiedzialności katalogów

- docs/product  
  Aktualne źródła prawdy: zakres MVP, logika analizy, plan implementacji

- docs/ui  
  Prosty opis ekranów i flow użytkownika

- docs/architecture  
  Krótki opis stacku technicznego i struktury src/

- docs/context  
  Materiały pomocnicze: wizja projektu, ICP, JTBD, user journey, brand strategy

- docs/archive  
  Materiały historyczne i wcześniejsze wersje, nie są źródłem aktualnych decyzji

- src/components  
  Ekrany i komponenty UI aplikacji

- src/components/ui  
  Komponenty Shadcn UI, traktowane jako warstwa biblioteczna

- src/utils  
  Logika biznesowa niezależna od UI, transformacje, analiza, testy logiki

- src/hooks  
  Własne hooki React wielokrotnego użytku

- src/lib  
  Helpery techniczne i narzędzia bibliotek

## Hierarchia źródeł prawdy

Przy konflikcie informacji obowiązuje kolejność:

1. docs/product/mvp-scope.md
2. docs/product/analysis-logic.md
3. docs/product/implementation-plan.md
4. AGENTS.md
5. README.md
6. pozostałe dokumenty

## Zasady implementacji

1. Przed zmianą w kodzie sprawdź, czy temat nie jest już opisany w dokumentacji.
2. Nie twórz nowych plików ani katalogów bez uzasadnienia.
3. Każdy nowy plik musi mieć jasno wskazaną lokalizację i powód, dlaczego trafia właśnie tam.
4. Nowy dokument tworzymy tylko wtedy, gdy nie da się sensownie rozszerzyć istniejącego pliku.
5. Dokumentacja opisuje decyzje i architekturę. Kod jest implementacją tych ustaleń.
6. Nie zgaduj zawartości plików. Opieraj się tylko na tym, co rzeczywiście istnieje.
7. Jeśli struktura robi się niespójna, najpierw zaproponuj porządek, potem koduj.

## System ról

Praca może być prowadzona w trybie spec-driven AI development z rolami.  
Pełna specyfikacja i routing: [`agents/ROUTING.md`](./agents/ROUTING.md)

**Zasada nadrzędna:** jedna rola główna + opcjonalnie jedna pomocnicza. Nigdy więcej niż dwie jednocześnie.

---

## Wymagany sposób raportowania pracy

Przed implementacją podaj krótko:
1. które pliki przeczytałeś
2. które pliki chcesz zmienić
3. dlaczego właśnie tam

Po implementacji podaj:
1. co zostało zmienione
2. jak to odpowiada dokumentacji
3. czy trzeba zaktualizować README lub docs