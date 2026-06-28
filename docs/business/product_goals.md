# Cele produktu

Dokument porządkujący, nie tworzy nowych wymagań. Źródła prawdy: `docs/product/mvp-scope.md`,
`docs/context/project-vision.md`, `docs/context/decision-log.md`.

## Cel aplikacji

Pomóc użytkownikowi w stanie zmęczenia, przeciążenia lub niepewności szybko nazwać aktualny stan
i wybrać jedno małe, adekwatne działanie na tu i teraz — zamiast bezrefleksyjnego scrollowania.

## Główna wartość dla użytkownika

W mniej niż 2 minuty: od otwarcia aplikacji do typu dnia i jednej konkretnej mikroakcji.

## Model szybkiego check-inu

6 pytań na suwakach (skala 1–5), pogrupowanych w 2 bloki. Deterministyczna logika analizy zwraca
jeden z 5 typów dnia (`docs/product/analysis-logic.md`).

## Mikroakcja

Każdy wynik kończy się jedną konkretną mikroakcją do wykonania od razu (po 2 warianty na typ dnia,
wybierane deterministycznie).

## Opcjonalne konto (model hybrydowy, ADR 003)

Konto nie jest wymagane. Anonimowy użytkownik → dane lokalne (`localStorage`). Zalogowany użytkownik
(e-mail + hasło) → trwałe check-iny w Supabase, dostępne na wielu urządzeniach. Jednorazowa,
nieblokująca propozycja konta po 2. anonimowym check-inie.

## Minimalizacja tarcia

Brak konieczności logowania na wejściu, jedna główna akcja na ekran, mobile-first, GA4 dopiero po
zgodzie użytkownika.

## Stan wdrożenia

Wdrożone na produkcję (`https://checkin.enpsyneia.org`). Metryki sukcesu: `docs/product/mvp-scope.md`.
