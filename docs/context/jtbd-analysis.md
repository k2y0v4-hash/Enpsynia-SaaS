# JTBD Analysis — Enpsyneia Check In

**Data:** 2026-03-22 (zaktualizowana 2026-04-12)
**Projekt:** Enpsyneia Check In
**Właściciel:** Krzysztof Kowalski

> Ten dokument ma charakter badawczy i wspierający — opisuje użytkowników, ich motywacje i kontekst użycia. Nie definiuje zakresu produktu. Zakres produktu określa `docs/product/mvp-scope.md`.

---

## Summary

### Hipoteza problemu

Użytkownicy (pracownicy biurowi 18–45 lat) doświadczający chronicznego przeciążenia informacyjnego nie potrafią w momencie dezorientacji podjąć decyzji o tym, czego najbardziej potrzebują — ruchu, odpoczynku, ciszy czy kontaktu z drugą osobą. Dodatkowo nawykowo sięgają po telefon bez konkretnego celu i chcą znaleźć zdrowszą alternatywę.

### Hipoteza mechanizmu nawykowego

Aplikacja może stać się alternatywą dla nawykowego sięgania po telefon — zamiast scrollowania użytkownik wykonuje szybki check-in i otrzymuje konkretne działanie. To jest hipoteza, która wymaga walidacji na realnych użytkownikach. Jeśli się potwierdzi, będzie to wyróżnik trudny do szybkiego skopiowania przez konkurencję.

### Target ICP

Dorosłe osoby (18–45 lat) w trybie pracy biurowej, zdalnej lub studiów, z ciągłą dostępnością online. Odczuwają chroniczne przeciążenie bodźcami i mają trudność z rozpoznaniem własnych potrzeb w danym momencie. Chcą ograniczyć nawykowe korzystanie z social media.

### Top insight

Użytkownicy nie potrzebują kolejnej aplikacji do śledzenia nastroju — potrzebują zewnętrznego bodźca, który powie im co mają zrobić. Paraliż decyzyjny jest głównym blockerem, a wartość aplikacji polega na szybkim przełożeniu samoobserwacji na jedną konkretną akcję.

---

## Job Snapshots

### Snapshot 1: „Po maratonie spotkań"

| Element | Opis |
|---------|------|
| **Kontekst** | Użytkownik skończył 4-godzinny dzień spotkań online, czuje się „wyprany" z energii |
| **Motywacja** | Chce wiedzieć, czy potrzebuje przerwy, czy jeszcze może coś zrobić |
| **Desired Outcome** | Jedno konkretne działanie: „idź na spacer" lub „zrób 5 minut stretchingu" w mniej niż 1 minutę |
| **Aktualne rozwiązanie** | Scrolluje Instagram, pije kolejną kawę, lub „po prostu się zmusza" do dalszej pracy |
| **Bariery** | Nie ma czasu na długie aplikacje, potrzebuje <1 min |
| **Trigger** | Koniec serii spotkań, godzina 15–17 |
| **Wartość** | 15–30 min odzyskanego czasu, uniknięcie wypalenia |
| **Confidence** | 7/10 |

---

### Snapshot 2: „Wieczorna dezorientacja"

| Element | Opis |
|---------|------|
| **Kontekst** | Wieczór po pracy, użytkownik siedzi przed ekranem, nie może zasnąć |
| **Motywacja** | Chce się zrelaksować, ale nie wie co by pomogło — ruch czy odpoczynek? |
| **Desired Outcome** | Jasna odpowiedź: „teraz potrzebujesz ciszy" lub „potrzebujesz lekkiego ruchu" |
| **Aktualne rozwiązanie** | Ogląda Netflix, scrolluje social media, „jakoś minie" |
| **Bariery** | Aplikacje wellness są za długie, nudne, wymagają zaangażowania |
| **Trigger** | 21–23 wieczorem, przed snem |
| **Wartość** | Lepszy sen, 30–60 min mniej straconego czasu |
| **Confidence** | 6/10 |

---

### Snapshot 3: „Nawykowe scrollowanie" — kluczowy

| Element | Opis |
|---------|------|
| **Kontekst** | Użytkownik leży w łóżku przed snem, odpala telefon „żeby zasnąć", a scrolluje godzinę |
| **Motywacja** | Chce przestać scrollować, ale nie ma alternatywy, która by go zatrzymała |
| **Desired Outcome** | Aplikacja dająca wartość szybko — pozwala wrócić do snu lub zasnąć z lepszym samopoczuciem *(user-stated desire: "30 sekund"; kanoniczna obietnica produktu: < 2 minuty)* |
| **Aktualne rozwiązanie** | Instagram/TikTok → godzina scrollowania → zmęczenie + późne spanie + poczucie winy |
| **Bariery** | Potrzebuje czegoś „bezpiecznego" — co nie wciągnie go w kolejny rabbit hole |
| **Trigger** | Leżenie w łóżku, wieczór, nuda |
| **Wartość** | Wcześniejsze spanie (+30–60 min), lepszy sen |
| **Confidence** | 9/10 |

---

### Snapshot 4: „Kryzys w pracy"

| Element | Opis |
|---------|------|
| **Kontekst** | Środek dnia pracy, atak paniki lub lęku, potrzeba „złapania oddechu" |
| **Motywacja** | Chce szybko się uspokoić bez wychodzenia z biura, dyskretnie |
| **Desired Outcome** | Prosta technika: „weź 3 głębokie oddechy" lub „wyjdź na 2 min" |
| **Aktualne rozwiązanie** | Idzie do łazienki, pije wodę, próbuje „przeczekać" |
| **Bariery** | Nie może wyjść z budynku, potrzebuje dyskretnego rozwiązania |
| **Trigger** | 10–14 w pracy, w trakcie stresogennego zadania |
| **Wartość** | Uniknięcie kryzysu, kontynuacja pracy |
| **Confidence** | 8/10 |

---

### Snapshot 5: „Nadmierna analiza"

| Element | Opis |
|---------|------|
| **Kontekst** | Użytkownik „myśli za dużo", nie może podjąć prostej decyzji co ze sobą zrobić |
| **Motywacja** | Chce „wyłączyć głowę" i pozwolić sobie na prostą akcję |
| **Desired Outcome** | Ktoś lub coś mu powie co ma zrobić, zamiast samemu decydować |
| **Aktualne rozwiązanie** | Decyduje się na „nic" albo robi przypadkową rzecz |
| **Bariery** | Paraliż decyzyjny, potrzebuje zewnętrznego bodźca |
| **Trigger** | Kiedykolwiek, wiele razy dziennie |
| **Wartość** | Oszczędność 10–30 min, mniej stresu |
| **Confidence** | 7/10 |

---

### Snapshot 6: „Nuda w ciągu dnia"

| Element | Opis |
|---------|------|
| **Kontekst** | Użytkownik siedzi w pracy lub na uczelni, ma 5 minut przerwy, sięga po telefon |
| **Motywacja** | Chce „zabić czas", ale nie chce tracić go na scrollowanie |
| **Desired Outcome** | Coś dającego wartość w 1 minutę, co nie wciągnie go na godzinę |
| **Aktualne rozwiązanie** | Instagram → 30 min znika |
| **Bariery** | Potrzebuje czegoś szybkiego i „bezpiecznego" |
| **Trigger** | Przerwa w pracy, czekanie, nuda |
| **Wartość** | Odzyskane 30 min, lepsze wykorzystanie przerwy |
| **Confidence** | 8/10 |

---

## Synthetic Analysis

### Top 3 Jobs

| # | Job | Częstotliwość |
|---|-----|---------------|
| 1 | Szybkie rozpoznanie stanu po okresie przeciążenia (po meetingach, po pracy) | 3–5x/dzień |
| 2 | Nawykowe sięganie po telefon bez celu — szukanie alternatywy | 5–10x/dzień |
| 3 | Podjęcie decyzji wieczorem (odpoczynek vs aktywność) | 1x/dzień |

### Top 3 Desired Outcomes

| # | Desired Outcome | Kryterium mierzalne |
|---|-----------------|---------------------|
| 1 | Jedna konkretna mikroakcja w mniej niż 2 minuty od otwarcia | Time-to-first-action < 120 sek |
| 2 | Jasna odpowiedź na „czego teraz potrzebuję" (ruch/odpoczynek/cisza/kontakt) | 100% użytkowników otrzymuje jednoznaczną rekomendację |
| 3 | Szybka wartość bez wciągania w kolejny rabbit hole | Użytkownik zamyka aplikację po maks. 2 minutach |

### Primary Pain Drivers

| # | Pain Driver | Symptom |
|---|-------------|---------|
| 1 | Paraliż decyzyjny | „Nie wiem czego potrzebuję" |
| 2 | Nawykowe scrollowanie | „Znów straciłem godzinę na Instagramie" |
| 3 | Poczucie winy | Po scrollowaniu: „powinienem był coś produktywnego zrobić" |
| 4 | Brak czasu | Aplikacje wellness są za długie (5+ min) |
| 5 | Zmęczenie decyzjami | Po serii meetingów użytkownik jest „wyprany" |

### Variability — różnice w zależności od kontekstu

| Segment | Specyfika |
|---------|-----------|
| Praca zdalna | Więcej triggerów w ciągu dnia, mniejsza struktura |
| Praca biurowa | Potrzeba dyskrecji, wyraźniejsze granice dnia |
| Wieczór | Dezorientacja odpoczynkowa + scrollowanie przed snem |
| Rano | Potrzeba „ustawienia tonu dnia", szybkość krytyczna |
| „Scroll seeker" | Główny trigger = nuda, chęć „zabicia czasu" |

---

## Core Job-to-be-Done

**„W momencie dezorientacji lub gdy nawykowo sięgam po telefon, chcę w mniej niż 2 minuty otrzymać jedną konkretną mikroakcję dopasowaną do mojego obecnego stanu — żebym zamiast analizować lub scrollować mógł teraz zrobić jedną prostą rzecz."**

Produkt realizuje ten job w danym momencie — nie obiecuje trwałej zmiany nawyków ani długoterminowego efektu. Wartość jest tu i teraz: jedna jasna odpowiedź zamiast paraliżu.

---

## Habit Loop — hipoteza do walidacji

Aplikacja może działać jako nawykowa alternatywa dla social media. To hipoteza — nie założenie produktowe.

```
CUE (bodziec)      →   ROUTINE (rutyna)      →   REWARD (nagroda)
Nuda, pustka           Enpsyneia check-in         Mikroakcja
„coś zrobię            (30 sek – 2 min)           + poczucie że
 na telefonie"                                       zrobiłem coś
                                                     dla siebie
```

**Warunki, które hipoteza musi spełnić:**
1. Aplikacja musi dawać wartość szybciej niż otwarcie Instagrama
2. Mikroakcja musi być na tyle satysfakcjonująca, żeby zastąpić dopaminę ze scrollowania
3. Użytkownik musi pamiętać o aplikacji jako opcji — bez powiadomień jest to trudne

Walidacja hipotezy odbywa się w Etapie 2 na podstawie danych z realnych użytkowników.

---

## Metryki sukcesu

### Etap 1 — mierzalne od pierwszego dnia

Metryki możliwe do śledzenia bez kont i backendu:

| Metryka | Cel | Jak mierzyć |
|---------|-----|-------------|
| Time-to-first-value | < 2 minuty | Czas od otwarcia strony do wyświetlenia wyniku |
| First use completion rate | > 70% | % użytkowników którzy kończą formularz (GA4 events) |
| Day 7 return rate | > 20% | % użytkowników wracających po 7 dniach (GA4) |
| Useful rating | > 60% | % oceniających wynik jako użyteczny (jeden przycisk na ekranie wyniku) |

### Hipotezy do walidacji w Etapie 2

Metryki niemierzalne bez kont i danych z backendu. Weryfikowane po wdrożeniu Supabase:

| Hipoteza | Cel | Metoda |
|----------|-----|--------|
| Habit Rate — użytkownicy używają aplikacji zamiast social media | > 30% | Ankieta w aplikacji |
| Streak Retention — użytkownicy utrzymują streak > 7 dni | > 40% | Dane z bazy (daily_streaks) |
| Social Replacement — deklarowane zastąpienie social media | > 40% | Ankieta jednorazowa po 30 dniach użycia |

---

## Ryzyka

| Ryzyko | Poziom | Uwaga |
|--------|--------|-------|
| Deklarowana potrzeba vs faktyczne użycie — użytkownicy mówią „tak, tego potrzebuję", ale nie wracają | Wysoki | Mierzalne przez Day 7 return rate w Etapie 1 |
| Mechanizm nawykowy nie zadziała — aplikacja używana raz, nie staje się nawykiem | Średni | Hipoteza do walidacji, nie blokuje Etapu 1 |
| Użytkownicy wracają do social media zamiast do aplikacji | Średni | Wymaga silnego reward loop — weryfikacja w Etapie 2 |
| Niska wartość bez powiadomień — użytkownik zapomina o aplikacji | Średni | Streak counter (Etap 1) częściowo mityguje, ale nie rozwiązuje |
| Mikroakcje są zbyt generyczne — użytkownik nie czuje się rozumiany | Średni | Wymaga starannego projektowania treści przed Fazą 4 implementacji |

---

## Interview Script (9 pytań JTBD)

Do użycia przy walidacji z realnymi użytkownikami:

1. **„Opowiedz mi o ostatnim razie, kiedy nie wiedziałeś co ze sobą zrobić po pracy."**
   Kontekst: gdzie byłeś, co robiłeś, jak się czułeś?

2. **„Co dokładnie robiłeś krok po kroku?"**
   Jak rozwiązałeś problem — lub nie?

3. **„Co w tym procesie jest najbardziej frustrujące?"**
   Co przeszkadza najbardziej?

4. **„Jak rozpoznasz, że problem został rozwiązany?"**
   Jaki jest Twój ideał?

5. **„Ile czasu zajmuje Ci to teraz?"**
   Ile minut lub godzin tracisz?

6. **„Co byś zapłacił za prostsze rozwiązanie?"**
   Nawet $0 jest informacją.

7. **„Czy próbowałeś już czegoś innego? Dlaczego to nie zadziałało?"**
   Jakie alternatywy już testowałeś?

8. **„Opowiedz mi o swoim nawyku korzystania z telefonu."**
   Jak często sprawdzasz telefon bez konkretnego powodu? Kiedy najczęściej? Co czujesz po godzinie scrollowania?

9. **„Gdyby istniała aplikacja, która mogłaby zastąpić nawykowe sięganie po telefon, co byś chciał żeby robiła?"**
   Czas: ile minut dziennie zaoszczędziłaby? Co konkretnie by oferowała?
