# Ekrany — Enpsyneia Check In

**Dotyczy:** Etap 1 (MVP)
**Podstawa:** `docs/product/mvp-scope.md`, `docs/product/implementation-plan.md`

---

## Zasady UI

- Mobile-first (375px jako baza)
- Jeden główny element akcji na ekran — brak rozgałęzień
- Brak menu, brak nawigacji globalnej, brak logowania
- Wynik czytelny bez scrollowania na telefonie
- Typ dnia to podpowiedź, nie diagnoza — komunikacja w UI musi to odzwierciedlać

---

## Ekran 1 — Landing

**Cel:** Użytkownik rozumie w 10 sekund czym jest aplikacja i klika CTA.

**Elementy:**
- Nagłówek: „Czego teraz najbardziej potrzebujesz?"
- Value prop: „Wypełnij 6 prostych pytań i otrzymaj jedną konkretną mikroakcję. W mniej niż 2 minuty."
- Przycisk CTA: „Rozpocznij check-in"
- Streak counter pod CTA (tylko jeśli `enpsyneia_streak.currentStreak > 0`): „🔥 Twoja seria: X dni z rzędu"

**Zasady:**
- Brak linków zewnętrznych, brak menu
- Maksymalnie 3 linie tekstu przed CTA
- GA4 event: `form_start` przy kliknięciu CTA
- Streak pod CTA pojawia się dopiero po pierwszym check-inie (Faza 6) — nie wymaga osobnego ekranu ani zmiany flow

---

## Ekran 2 — Formularz check-in

**Cel:** Użytkownik odpowiada na 6 pytań w 2 blokach i przechodzi do wyniku.

**Elementy:**
- Progress bar: „Blok X z 2"
- 3 suwaki (skala 1–5) z etykietami na obu końcach — widoczne jednocześnie
- Przycisk „Dalej" na Bloku 1 / „Zobacz wynik" na Bloku 2
- Możliwość cofnięcia do poprzedniego bloku

**Podział na bloki:**

### Blok 1 — aktualny stan i przeciążenie

| # | Pytanie | Lewa etykieta (1) | Prawa etykieta (5) | Help text |
|---|---------|-------------------|-------------------|-----------|
| 1 | Poziom energii | wyczerpany | pełen energii | Chodzi o energię fizyczną i umysłową — nie o nastrój ani motywację. |
| 2 | Przeciążenie bodźcami | spokojnie | przebodźcowany | Ile rzeczy na ciebie działa: dźwięki, ekrany, rozmowy, decyzje, wiadomości. |
| 3 | Utknięcie w analizie | działam | myślę bez końca | Czy działasz i decydujesz, czy kręcisz się w kółko w głowie bez decyzji? |

### Blok 2 — kierunek regulacji

| # | Pytanie | Lewa etykieta (1) | Prawa etykieta (5) | Help text |
|---|---------|-------------------|-------------------|-----------|
| 4 | Potrzeba ruchu vs odpoczynku | potrzebuję odpocząć | potrzebuję ruchu | Czy ciało prosi teraz o aktywność fizyczną, czy raczej o spokój i bezruch? |
| 5 | Potrzeba samotności vs kontaktu | chcę być sam | chcę być z ludźmi | Chodzi o kontakt z ludźmi — nie o pracę ani obowiązki zawodowe. |
| 6 | Poczucie sprawczości | nic nie mogę | mogę wszystko | Czy masz teraz poczucie, że możesz coś realnie zrobić i na coś wpłynąć? |

**Uwaga:** Nazwy bloków („aktualny stan", „kierunek regulacji") są wewnętrzne — nie wyświetlane w UI. Użytkownik widzi tylko „Blok 1 z 2".

**Wygląd suwaków:**
- Track: 4px, kolor nieaktywny `#e2e2e2`, kolor aktywny (lewa część do kciuka) `var(--primary)`; wypełnienie przez inline `background: linear-gradient`
- Thumb: 22px, `var(--primary)`, border 2px biały, cień `0 1px 3px rgba(0,0,0,0.2)` — bez zewnętrznego ringa
- Markery skali: 5 subtelnych kresek pod trackiem w pozycjach 1–5 — sygnalizują dyskretność skali bez technicznego wyglądu
- Brak centralnej wartości liczbowej — skala czytelna z markerów i etykiet

**Zasady:**
- Suwaki domyślnie na środku (3)
- Suwaki działają na dotyk i myszce
- Help text widoczny zawsze — nie ukryty za ikoną
- Układ przewijalny — priorytet to wygoda i odstępy, nie upychanie na jednym ekranie

---

## Ekran 3 — Analiza (przejściowy)

**Cel:** Użytkownik nie widzi białego ekranu.

**Elementy:**
- Komunikat: „Analizuję Twoje potrzeby…"
- Prosta animacja lub progress indicator

**Czas trwania:** 2–5 sekund

---

## Ekran 4 — Wynik

**Cel:** Użytkownik natychmiast wie co zrobić.

**Elementy (kolejność od góry):**
1. Podsumowanie stanu — 1 zdanie (teksty w `docs/product/analysis-logic.md` sekcja 6)
2. Typ dnia — duży, wyróżniony (emoji + nazwa)
3. Uzasadnienie wyniku — 1 zdanie pod typem dnia (teksty w `docs/product/analysis-logic.md` sekcja 7)
4. Mikroakcja — konkretna, wykonalna natychmiast
5. Streak counter: „🔥 X dni z rzędu"
6. Przycisk „Wykonaj ponownie"
7. Przycisk „Czy to pomogło?" (👍 / 👎)

**Stan przycisku „Czy to pomogło?":**
- Domyślnie: dwa przyciski 👍 i 👎 aktywne
- Po kliknięciu: kliknięty przycisk zostaje wyróżniony (aktywny), drugi wyszarzony (nieaktywny), oba nieklikalnie — stan nie jest zapisywany lokalnie, reset przy „Wykonaj ponownie"

**Zasady:**
- Wynik czytelny bez scrollowania na telefonie
- Mikroakcja na teraz — nie ogólna rada
- „Czy to pomogło?" wysyła GA4 event: `feedback_helpful: true/false` — brak zapisu lokalnego
- GA4 event: `result_shown` z parametrem `day_type`
- „Wykonaj ponownie" resetuje formularz do pytania 1
