# ADR 002 — GA4 After Consent

## Status

Accepted for Etap 1.

## Decyzja

Google Analytics 4 ładuje się dopiero po zgodzie użytkownika. Przed zgodą albo po odrzuceniu zgody helper analytics działa jako no-op.

## Kontekst

Etap 1 potrzebuje minimalnych metryk produktowych: start formularza, wyświetlenie wyniku i feedback. Jednocześnie aplikacja dotyczy subiektywnego stanu użytkownika, więc zakres danych analitycznych musi być ograniczony.

## Uzasadnienie

- Zgoda przed ładowaniem GA4 ogranicza ryzyko prywatności.
- MVP potrzebuje tylko kilku eventów produktowych.
- Brak pełnych odpowiedzi check-inu w analytics chroni użytkownika przed nadmiernym profilowaniem.
- `VITE_GA4_ID` pozostaje konfiguracją środowiskową, a nie sekretem w kodzie.

## Konsekwencje pozytywne

- Lepsza kontrola użytkownika nad analytics.
- Brak pobierania zewnętrznego skryptu przed zgodą.
- Prostszy model prywatności.
- Minimalny zakres danych w GA4.

## Konsekwencje negatywne

- Część użytkowników odrzuci analytics, więc metryki będą niepełne.
- Dane o pierwszym wejściu przed decyzją są ograniczone.
- Implementacja wymaga obsługi stanu zgody i no-op trackingu.

## Zakres wysyłanych eventów

- `form_start` — użytkownik rozpoczyna check-in.
- `result_shown` — użytkownik widzi wynik.
- `feedback_helpful` — użytkownik ocenia mikroakcję.

Parametry muszą być minimalne i produktowe. Przykładowo `day_type` może być użyte do oceny rozkładu wyników, ale nie wolno wysyłać pełnych odpowiedzi użytkownika.

## Czego nie wolno wysyłać do GA4

- Pełnych odpowiedzi check-inu.
- Historii check-inów.
- Danych osobowych.
- Emaili.
- Tokenów, sekretów, identyfikatorów auth.
- Treści wolnych komentarzy użytkownika.
- Danych pozwalających odtworzyć szczegółowy stan użytkownika.
