# Logika analizy — Enpsyneia Check In

**Status:** Specyfikacja — podstawa implementacji `src/utils/analysisLogic.js`
**Data:** 2026-04-13
**Podstawa:** `mvp-scope.md`, `implementation-plan.md` (Faza 4)

---

## Zasada projektowa

Logika Etapu 1 jest prosta, deterministyczna i ręcznie audytowalna.

- Te same wartości wejściowe zawsze zwracają ten sam typ dnia i tę samą mikroakcję.
- Brak uczenia maszynowego, brak losowości, brak pytań rozstrzygających.
- Całą logikę można prześledzić na kartce papieru w 2 minuty.
- Złożoność dopiero w Etapie 2 — tylko jeśli dane to uzasadnią.

---

## 1. Wejścia — 6 zmiennych

| Zmienna | Pytanie (skrót) | Wartość 1 | Wartość 5 | Kierunek interpretacji | Rola |
|---------|-----------------|-----------|-----------|------------------------|------|
| `energy` | Poziom energii | wyczerpany, nie mam siły | pełen energii, gotowy do działania | wysoka = więcej zasobów | **aktywujący** |
| `overload` | Przeciążenie bodźcami | spokojnie, bodźców mało | przebodźcowany, za dużo wszystkiego | wysoka = gorszy stan | **hamujący** |
| `movement` | Potrzeba ruchu vs odpoczynku | potrzebuję odpocząć | potrzebuję ruchu | wysoka = potrzeba fizycznej aktywności | **aktywujący** |
| `social` | Potrzeba samotności vs kontaktu | chcę być sam | chcę być z ludźmi | wysoka = potrzeba kontaktu | **społeczny** |
| `agency` | Poczucie sprawczości | nic nie mogę, bezradny | mogę wszystko, sprawczy | wysoka = więcej zasobów | **aktywujący** |
| `paralysis` | Utknięcie w analizie | działam, decyduję | myślę bez końca, nie decyduję | wysoka = gorszy stan | **hamujący** |

**Uwagi do ról:**

- `energy` i `agency` mierzą zasoby do działania — razem decydują o gotowości do Dnia Działania.
- `overload` i `paralysis` są blokadami — zewnętrzną (bodźce) i wewnętrzną (analiza). Razem identyfikują Dzień Przeciążenia.
- `movement` jest niezależne od ogólnej energii — można być zmęczonym i jednocześnie potrzebować ruchu.
- `social` jest niezależne od pozostałych — można być przebodźcowanym i jednocześnie potrzebować kontaktu (choć `overload` wtedy wygrywa — patrz sekcja 3).

---

## 2. Profile typów dnia

### Dzień Działania

**Sygnały główne:** `energy` ≥ 4 ORAZ `agency` ≥ 3 ORAZ `overload` ≤ 3
**Sygnały pomocnicze:** `paralysis` ≤ 2 (wzmacnia), `movement` ≥ 3 (wzmacnia)
**Typowy kontekst:** Użytkownik ma zasoby i poczucie sprawczości — rzadki moment gotowości do zrobienia czegoś wymagającego lub odkładanego.
**Czego ten typ dnia nie jest:** Nie jest "normalnym dobrym dniem". To dzień z wyraźnym oknem do działania. Nie zachęca do odpoczynku — to byłoby marnowanie zasobów w dobrej kondycji.

---

### Dzień Wyciszenia

**Sygnały główne:** `overload` ≥ 4 (przy `paralysis` < 4)
**Sygnały pomocnicze:** `social` ≤ 2 (wzmacnia), `movement` ≤ 2 (wzmacnia)
**Typowy kontekst:** Użytkownik jest przebodźcowany — za dużo spotkań, ekranów, decyzji, hałasu. Potrzebuje redukcji bodźców, nie nowych zadań.
**Czego ten typ dnia nie jest:** Nie jest dniem zmęczenia i wyczerpania zasobów (to Odbudowa — tam `overload` jest niskie). Nie jest paraliżem decyzyjnym (to Przeciążenie — tam zarówno `overload` jak i `paralysis` są wysokie). Wyciszenie to świadoma redukcja bodźców, nie pasywna kapitulacja.

---

### Dzień Odbudowy

**Sygnały główne:** `energy` ≤ 2 ORAZ `agency` ≤ 2 ORAZ `overload` ≤ 3
**Sygnały pomocnicze:** `movement` ≤ 2 (wzmacnia), `paralysis` ≤ 3 (wzmacnia — użytkownik nie utknął, po prostu nie ma zasobów)
**Typowy kontekst:** Użytkownik jest wyeksploatowany — zasoby są wyczerpane, ale nie jest zalewany bodźcami z zewnątrz. Potrzebuje spokojnego, delikatnego odbudowania.
**Czego ten typ dnia nie jest:** Nie jest dniem bierności z wyboru (to Wyciszenie — tam `overload` jest wysokie, tu niskie). Nie jest paraliżem (to Przeciążenie). Odbudowa to czas na zasilenie baterii, nie izolację.

---

### Dzień Kontaktu

**Sygnały główne:** `social` ≥ 4 ORAZ `overload` ≤ 3
**Sygnały pomocnicze:** `energy` ≥ 2 (minimum zasobów do autentycznego kontaktu)
**Typowy kontekst:** Użytkownik wyraźnie potrzebuje kontaktu z innymi — i ma wystarczające zasoby, żeby ten kontakt był autentyczny, a nie wymuszony.
**Czego ten typ dnia nie jest:** Nie jest dniem towarzyskiego działania pod presją ani Dniem Działania z wątkiem społecznym. Nie pojawia się przy wysokim `overload` — przebodźcowanie przy kontakcie z ludźmi pogłębia przeciążenie.

---

### Dzień Przeciążenia

**Sygnały główne:** `overload` ≥ 4 ORAZ `paralysis` ≥ 4
**Sygnały pomocnicze:** `agency` ≤ 2 (wzmacnia), `energy` ≤ 2 (wzmacnia)
**Typowy kontekst:** Użytkownik jest jednocześnie przebodźcowany i zablokowany analitycznie — podwójna blokada. Każda próba "rozwiązania" przez analizę tylko pogłębia spiralę.
**Czego ten typ dnia nie jest:** Nie jest zwykłym zmęczeniem (to Odbudowa — tam `paralysis` jest niskie). Nie jest tylko przebodźcowaniem bez paraliżu (to Wyciszenie). Przeciążenie to stan ostry — priorytet to przerwanie spirali, nie planowanie.

---

## 3. Algorytm przypisania typu dnia

### Zasada

Typy są sprawdzane w kolejności od najbardziej ostrego do najbardziej neutralnego. Pierwsze dopasowanie wygrywa. Brak wcześniejszego dopasowania oznacza Dzień Odbudowy (domyślny fallback).

### Kolejność sprawdzania i warunki

```
KROK 1 — Sprawdź Dzień Przeciążenia:
  IF overload >= 4 AND paralysis >= 4
  → Dzień Przeciążenia

KROK 2 — Sprawdź Dzień Wyciszenia:
  IF overload >= 4
  → Dzień Wyciszenia

KROK 3 — Sprawdź Dzień Kontaktu:
  IF social >= 4 AND overload <= 3
  → Dzień Kontaktu

KROK 4 — Sprawdź Dzień Działania:
  IF energy >= 4 AND agency >= 3 AND overload <= 3
  → Dzień Działania

KROK 5 — Fallback:
  → Dzień Odbudowy
```

### Uzasadnienie kolejności

| Priorytet | Typ | Dlaczego wygrywa |
|-----------|-----|------------------|
| 1 | Przeciążenia | Stan najostrzejszy — podwójna blokada wymaga innej mikroakcji niż samo przebodźcowanie |
| 2 | Wyciszenia | Wysokie `overload` dominuje nad wszystkim poza Przeciążeniem — kontakt i działanie przy przebodźcowaniu zaszkodzą |
| 3 | Kontaktu | Potrzeba kontaktu jest specyficzna i łatwo ją zagłuszyć przez "produktywność" — warto ją respektować, jeśli nie ma blokad |
| 4 | Działania | Okno do działania — rzadkie i warte wykorzystania, ale mniej pilne niż stany przeciążenia |
| 5 | Odbudowy | Domyślny fallback — bezpieczny dla wszystkich nieostrych stanów |

### Reguły rozstrzygania konfliktów

| Konflikt | Wynik | Uzasadnienie |
|----------|-------|--------------|
| `overload` ≥ 4 ORAZ `social` ≥ 4 | Wyciszenia | Przebodźcowanie blokuje zdolność do autentycznego kontaktu |
| `overload` ≥ 4 ORAZ `energy` ≥ 4 | Wyciszenia lub Przeciążenia | Wysoka energia nie przebija przebodźcowania |
| `energy` ≥ 4 ORAZ `paralysis` ≥ 4 ORAZ `overload` ≥ 4 | Przeciążenia | Paralysis + overload ≥ 4 uruchamiają KROK 1 |
| `social` ≥ 4 ORAZ `energy` ≤ 2 ORAZ `overload` ≤ 3 | Kontaktu | Niska energia nie wyklucza Kontaktu — mikroakcja uwzględnia niski zasób |

### Przypadki brzegowe

| Sytuacja | Wynik | Uzasadnienie |
|----------|-------|--------------|
| Wszystkie = 3 | Odbudowy | Brak wyraźnych sygnałów → bezpieczny, wspierający fallback |
| Wszystkie = 1 | Odbudowy | Głębokie wyczerpanie, niskie `overload` i `paralysis` → delikatna odbudowa, nie interwencja |
| Wszystkie = 5 | Przeciążenia | `energy=5` nie zmienia faktu, że `overload=5` i `paralysis=5` — spirala przebija zasoby |
| `energy=5`, `paralysis=5`, `overload=4` | Przeciążenia | Paradoks: mam energię, ale utknąłem — KROK 1 wygrywa |
| `social=5`, `overload=4` | Wyciszenia | Chcę kontaktu, ale jestem przebodźcowany — KROK 2 wyprzedza KROK 3 |
| `energy=1`, `overload=1`, `paralysis=1` | Odbudowy | Wyczerpanie bez przebodźcowania i bez blokady → delikatna odbudowa |

---

## 4. Algorytm wyboru mikroakcji

### Zasada

Dla każdego typu dnia dostępne są 2 mikroakcje z realnym tekstem (gotowym do wyświetlenia w UI). Wybór jest deterministyczny i oparty na jednej zmiennej pomocniczej charakterystycznej dla danego typu.

Ewentualna trzecia mikroakcja to rezerwa dla Etapu 2 lub rotacji przez dewelopera.

### Reguły wyboru per typ

| Typ dnia | Zmienna pomocnicza | Warunek → mikroakcja A | Warunek → mikroakcja B |
|----------|--------------------|------------------------|------------------------|
| Działania | `movement` | `movement` ≥ 4 | `movement` ≤ 3 |
| Wyciszenia | `social` | `social` ≤ 2 | `social` ≥ 3 |
| Odbudowy | `energy`, `movement` | `energy` ≤ 2 **i** `movement` ≤ 3 | w pozostałych przypadkach |
| Kontaktu | `energy` | `energy` ≥ 4 | `energy` ≤ 3 |
| Przeciążenia | `agency` | `agency` ≤ 2 | `agency` ≥ 3 |

**Uwaga do Odbudowy:** Mikroakcja A zawiera fizyczne zatrzymanie ("połóż się"). Jeśli użytkownik jednocześnie ma wysoką potrzebę ruchu (`movement` ≥ 4), wybierana jest mikroakcja B — która zawiera ruch (stretching). Unika to rekomendacji odwrotnej do deklarowanej potrzeby.

---

## 5. Mikroakcje

Tekst mikroakcji jest gotowy do wyświetlenia w UI — bez przeróbek. Konkretny, natychmiastowy, wykonalny bez przygotowania.

---

### Dzień Działania

**Mikroakcja A** (gdy `movement` ≥ 4):
> „Idź na 15 minut szybkiego spaceru — bez słuchawek, bez telefonu w ręce. Wróć i zacznij jedno konkretne zadanie. Ruch wyostrzy koncentrację."

**Mikroakcja B** (gdy `movement` ≤ 3):
> „Wybierz jedno zadanie, które odkładasz od co najmniej 2 dni. Ustaw timer na 25 minut. Zacznij — nieważne jak małym krokiem. Nie kończ najpierw czegoś innego."

---

### Dzień Wyciszenia

**Mikroakcja A** (gdy `social` ≤ 2):
> „Odłóż telefon w inne pomieszczenie niż to, w którym jesteś. Usiądź przez 5 minut bez niczego. Nie rób nic — dosłownie. Obserwuj co się pojawia w głowie."

**Mikroakcja B** (gdy `social` ≥ 3):
> „Wyjdź na 10 minut bez słuchawek i bez konkretnego celu. Skręć w pierwszą lepszą ulicę, idź, wróć. Zewnętrzne bodźce są zwykle cichsze niż wewnętrzne."

---

### Dzień Odbudowy

**Mikroakcja A** (gdy `energy` ≤ 2):
> „Połóż się na 10 minut z zamkniętymi oczami — nie żeby zasnąć, tylko żeby odpocząć ciałem. Ustaw budzik. Nic więcej nie rób."

**Mikroakcja B** (gdy `energy` ≥ 3):
> „Nalej szklankę wody i wypij ją powoli. Potem zrób 5 spokojnych skłonów lub stretchów — cokolwiek co rozluźni napięcie w karku i ramionach."

---

### Dzień Kontaktu

**Mikroakcja A** (gdy `energy` ≥ 4):
> „Zadzwoń do jednej bliskiej osoby — na 5–10 minut, bez konkretnego powodu. Żeby po prostu usłyszeć jej głos i powiedzieć co słychać."

**Mikroakcja B** (gdy `energy` ≤ 3):
> „Napisz krótką wiadomość do jednej osoby, o której myślałeś ostatnio. Nie musi być długa — jedno zdanie i wyślij. Nie czekaj na idealny moment."

---

### Dzień Przeciążenia

**Mikroakcja A** (gdy `agency` ≤ 2):
> „Zamknij oczy i policz 5 oddechów — wdech na 4 sekundy, wydech na 6. Nic więcej. Wróć do ciała zanim wrócisz do myśli."

**Mikroakcja B** (gdy `agency` ≥ 3):
> „Wstań, wyjdź z pokoju i zrób jedną prostą czynność fizyczną — umyj kubek, przewietrz pokój, wejdź po schodach. Przerwij spiralę ciałem, nie kolejną myślą."

---

## 6. Podsumowanie stanu (tekst do UI)

Jedno zdanie wyświetlane jako **pierwszy element ekranu wyniku**, bezpośrednio nad typem dnia. Opisuje co aktualnie dzieje się z użytkownikiem. Nie wyjaśnia dlaczego dostał dany typ (to robi sekcja 7). Nie jest diagnozą.

**Forma:** krótka, adresowana bezpośrednio ("Czujesz się…", "Twoja…", "Jesteś…"), opisowa i neutralna.

| Typ dnia | Tekst podsumowania stanu |
|----------|--------------------------|
| **Działania** | „Masz dziś wyraźnie więcej energii i sprawczości niż zwykle." |
| **Wyciszenia** | „Czujesz się teraz przebodźcowany — zbyt dużo bodźców, za mało ciszy." |
| **Odbudowy** | „Energia i sprawczość są dziś niskie — ciało i umysł potrzebują teraz zasilenia." |
| **Kontaktu** | „Wyraźnie potrzebujesz dziś kontaktu z innymi — i masz na to zasoby." |
| **Przeciążenia** | „Jesteś jednocześnie przebodźcowany i utknąłeś w analizie." |

**Przypadek szczególny — Odbudowy jako fallback (wszystkie = 3):**
> „Nie widać dziś wyraźnych przeciążeń ani szczególnie wysokich zasobów — dzień bez wyraźnego charakteru."

**Relacja do sekcji 7:**
- **Podsumowanie stanu** (ta sekcja) = co się z Tobą teraz dzieje — opisowe
- **Uzasadnienie wyniku** (sekcja 7) = dlaczego dostałeś ten konkretny typ dnia — wyjaśniające
- Oba elementy pojawiają się na ekranie wyniku jeden pod drugim, podsumowanie stanu pierwsze

---

## 7. Uzasadnienie wyniku (tekst do UI)

Jedno zdanie wyświetlane bezpośrednio pod typem dnia. Wyjaśnia dlaczego użytkownik dostał ten wynik. Nie diagnoza — podpowiedź w ludzkim języku. Brak sformułowań diagnostycznych ("masz", "cierpisz", "problem").

| Typ dnia | Tekst uzasadnienia |
|----------|--------------------|
| **Działania** | „Twoja energia i poczucie sprawczości są dziś wyraźnie wysokie — to dobry moment, żeby zrobić coś, co od jakiegoś czasu odkładasz." |
| **Wyciszenia** | „Twój poziom przeciążenia bodźcami jest wysoki — ciało i umysł potrzebują teraz spokoju, nie kolejnych zadań ani decyzji." |
| **Odbudowy** | „Twoje zasoby energii i sprawczości są dziś niskie — to sygnał do delikatnego odbudowania, a nie forsowania przez kolejne godziny." |
| **Kontaktu** | „Twoja potrzeba bycia z ludźmi jest dziś wyraźna — warto ją zaspokoić, zamiast zostawać sam na sam z myślami." |
| **Przeciążenia** | „Masz teraz dużo bodźców i jednocześnie utykasz w analizie — priorytet to przerwanie spirali, zanim dołożysz sobie kolejne decyzje." |

**Przypadek szczególny — Odbudowa jako fallback (wszystkie = 3):**
> „Twój stan jest dziś wyrównany — nie ma wyraźnych sygnałów w żadną stronę. Delikatna odbudowa to bezpieczny krok."

---

## 8. Przypadki testowe

Do ręcznej weryfikacji przed wdrożeniem i po każdej zmianie logiki.

| # | energy | overload | movement | social | agency | paralysis | Oczekiwany typ | Mikroakcja |
|---|--------|----------|----------|--------|--------|-----------|----------------|------------|
| 1 | 5 | 2 | 4 | 3 | 4 | 1 | Działania | A (movement=4) |
| 2 | 4 | 2 | 2 | 3 | 4 | 2 | Działania | B (movement=2) |
| 3 | 2 | 5 | 1 | 1 | 2 | 3 | Wyciszenia | A (social=1) |
| 4 | 3 | 4 | 3 | 4 | 3 | 2 | Wyciszenia | B (social=4) |
| 5 | 1 | 2 | 1 | 2 | 1 | 2 | Odbudowy | A (energy=1 ≤ 2, movement=1 ≤ 3) |
| 6 | 2 | 2 | 2 | 2 | 2 | 2 | Odbudowy | A (energy=2 ≤ 2, movement=2 ≤ 3) |
| 7 | 3 | 2 | 2 | 5 | 3 | 2 | Kontaktu | B (energy=3) |
| 8 | 4 | 2 | 3 | 5 | 4 | 2 | Kontaktu | A (energy=4) |
| 9 | 2 | 5 | 2 | 2 | 2 | 5 | Przeciążenia | A (agency=2) |
| 10 | 3 | 4 | 3 | 2 | 3 | 4 | Przeciążenia | B (agency=3) |
| 11 | 3 | 3 | 3 | 3 | 3 | 3 | Odbudowy (fallback) | B (energy=3 ≥ 3, reguła ruch nieistotna przy movement=3) |
| 12 | 5 | 5 | 5 | 5 | 5 | 5 | Przeciążenia | B (agency=5 ≥ 3) |
| 13 | 5 | 4 | 5 | 5 | 5 | 4 | Przeciążenia | B (agency=5) |
| 14 | 5 | 2 | 5 | 5 | 5 | 1 | Kontaktu | A (energy=5 ≥ 4 → A) |
| 15 | 1 | 1 | 1 | 1 | 1 | 1 | Odbudowy (fallback) | A (energy=1 ≤ 2, movement=1 ≤ 3) |
| 16 | 1 | 2 | 5 | 3 | 2 | 1 | Odbudowy | B (energy=1 ≤ 2, ale movement=5 ≥ 4 → override do B) |

*Uwaga do przypadku #6:* `energy=2` i `movement=2` → oba warunki mikroakcji A spełnione → A.
*Uwaga do przypadku #12:* `overload=5` i `paralysis=5` → KROK 1 → Przeciążenie. `agency=5 ≥ 3` → mikroakcja B.
*Uwaga do przypadku #14:* `social=5 ≥ 4 AND overload=2 ≤ 3` → KROK 3 (Kontaktu) wyprzedza KROK 4 (Działania). Wysoka energia nie przebija potrzeby kontaktu przy braku blokad.
*Uwaga do przypadku #16:* edge case — niskie zasoby, ale wysoka potrzeba ruchu. `movement=5 ≥ 4` override'uje regułę energii → mikroakcja B (stretching zamiast "połóż się").

---

## 9. Decyzje otwarte przed implementacją

| # | Pytanie | Opcja domyślna (jeśli brak decyzji) |
|---|---------|--------------------------------------|
| 1 | Czy mikroakcja A/B wybierana jest przy każdym check-inie na nowo na podstawie bieżących wartości? | Tak — każdy check-in liczy od nowa |
| 2 | Jeśli użytkownik robi dwa check-iny tego samego dnia z tym samym wynikiem — tę samą mikroakcję czy alternatywną? | Tę samą (deterministycznie) — rotacja dopiero w Etapie 2 z historią |
| 3 | Czy tekst uzasadnienia (sekcja 6) jest widoczny od razu pod typem dnia, czy schowany za "dlaczego ten wynik"? | Od razu — jedno zdanie bezpośrednio pod typem |
| 4 | Kiedy używany jest special fallback text Odbudowy (sekcje 6 i 7)? | Wyłącznie gdy dokładnie wszystkie 6 wartości wejściowych = 3. Każde inne Odbudowy-via-KROK-5 (np. energy=3, agency=1, pozostałe różne) używa standardowego tekstu Odbudowy z sekcji 6 i 7. |
| 5 | Czy funkcja zwraca też nazwę zmiennej pomocniczej użytej do wyboru mikroakcji (np. do console.log w trybie dev)? | Tak — do debugowania logiki |
| 6 | Jaki jest interfejs funkcji `analyzeCheckIn()` w `analysisLogic.js`? | Wejście: `{ energy, overload, movement, social, agency, paralysis }` (każda wartość: integer 1–5). Wyjście: `{ dayType, summaryText, justificationText, microaction, microactionKey }` — gdzie `microactionKey` to `'A'` lub `'B'`. Funkcja obsługuje special fallback text wewnętrznie (sekcja 4 powyżej). |
