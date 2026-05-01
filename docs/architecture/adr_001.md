# ADR 001 — Local Storage First

## Status

Accepted for Etap 1.

## Decyzja

Etap 1 działa bez backendu i bez kont użytkowników. Dane check-inów są przechowywane lokalnie w przeglądarce z użyciem `localStorage`.

## Kontekst

MVP ma zwalidować, czy użytkownik rozumie i kończy check-in oraz czy mikroakcja jest dla niego użyteczna. W Etapie 1 najważniejsze są szybkość wdrożenia, prostota i brak kosztów infrastruktury.

## Uzasadnienie

- `localStorage` wystarcza do historii ostatnich kilku check-inów.
- Brak backendu skraca czas wdrożenia MVP.
- Brak kont zmniejsza tarcie pierwszego użycia.
- Etap 1 nie wymaga synchronizacji między urządzeniami.
- Dane są lokalne i nie wymagają utrzymania bazy.

## Konsekwencje pozytywne

- Prostsza architektura.
- Niższy koszt utrzymania.
- Szybsze wdrożenie.
- Mniejsza powierzchnia bezpieczeństwa po stronie serwera.
- Użytkownik może użyć aplikacji bez konta.

## Konsekwencje negatywne

- Dane są dostępne tylko w jednej przeglądarce.
- Dane mogą zostać utracone po wyczyszczeniu danych przeglądarki.
- Safari iOS może usuwać dane po okresie braku aktywności.
- Brak synchronizacji historii między urządzeniami.
- `localStorage` nie nadaje się do sekretów, tokenów ani danych auth.

## Warunki przejścia do Supabase

Przejście do Supabase rozważyć, gdy wystąpi co najmniej jeden warunek:

- ponad 50 aktywnych użytkowników tygodniowo,
- ponad 30% użytkowników wraca po pierwszym użyciu,
- użytkownicy proszą o historię na innym urządzeniu,
- produkt wymaga kont, synchronizacji lub trwałej historii.

Przed wdrożeniem Etapu 2 wymagany jest osobny przegląd bezpieczeństwa modelu auth i przechowywania sesji.
