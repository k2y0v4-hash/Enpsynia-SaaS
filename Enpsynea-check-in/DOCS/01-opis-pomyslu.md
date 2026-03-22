# Enpsyneia Check In

## Status dokumentu

**Wersja zaktualizowana:** 2026-03-22
**Zmiany:** Dodano założenia dotyczące kont użytkowników, budowania marki osobistej oraz mechanizmu nawykowego wykorzystania aplikacji jako alternatywy dla social media/gier.

---

## Nazwa projektu

Enpsyneia Check In

---

## Charakter projektu

Enpsyneia Check In to prosta aplikacja webowa wspierająca codzienną samoobserwację oraz wybór małego działania regulacyjnego adekwatnego do aktualnego stanu użytkownika. Projekt ma charakter praktyczny i użytkowy. Jego celem nie jest diagnozowanie ani terapia, lecz ułatwienie codziennego kontaktu z własnymi potrzebami i wspieranie prostych, korzystnych decyzji podejmowanych na bieżąco.

---

## Krótki opis

Projekt polega na stworzeniu lekkiej aplikacji webowej, która pomaga użytkownikowi w krótkim czasie określić, czego najbardziej potrzebuje w danym momencie. Użytkownik wypełnia krótki formularz oparty na kilku pytaniach dotyczących aktualnego funkcjonowania. Pytania odnoszą się między innymi do poziomu energii, przeciążenia bodźcami, potrzeby ruchu lub odpoczynku, potrzeby samotności lub kontaktu z ludźmi, poczucia sprawczości oraz skłonności do utknięcia w analizie.

Na podstawie odpowiedzi aplikacja generuje prosty wynik składający się z trzech elementów. Pierwszym jest krótkie podsumowanie aktualnego stanu użytkownika. Drugim jest przypisanie uproszczonego typu dnia, który ma intuicyjny i ludzki charakter. Trzecim jest jedna główna rekomendacja w postaci bardzo prostej mikroakcji możliwej do wykonania od razu.

Najważniejszą wartością aplikacji nie jest sam opis samopoczucia, lecz szybkie przełożenie samoobserwacji na praktyczne działanie. Dzięki temu użytkownik po kilku - kilkudziesięciu sekundach otrzymuje konkretną podpowiedź, co może zrobić tu i teraz.

---

## NOWE: Kluczowe Założenia (2026-03-22)

### 1. System kont użytkowników

**Zmiana:** Projekt będzie teraz umożliwiał zakładanie kont użytkowników.

**Uzasadnienie:**
- Kont = możliwość monetyzacji w przyszłości
- Kont = dostęp do danych z różnych urządzeń
- Kont = lepsza retencja i personalizacja
- Kont = budowanie bazy użytkowników dla przyszłych produktów

**Technologia:** Supabase (Free Tier wystarcza dla ~50k użytkowników)

---

### 2. Główny cel: Budowanie marki osobistej

**Zmiana:** Głównym celem projektu NIE jest monetyzacja użytkowników, lecz budowanie rozpoznawalności marki osobistej "Enpsyneia".

**Uzasadnienie:**
- Enpsyneia jako koncepcja filozoficzna ma potencjał edukacyjny i contentowy
- Marka osobista = dźwignia do przyszłych projektów, coaching, prelekcje
- Wartość projektu = w zasięgu, nie w bezpośrednich przychodach

**Model przychodów (pośredni):**
- Newsletter (lead magnet z aplikacji)
- Content marketing (blog, social media)
- Przyszły coaching/workshops
- B2B employee wellness (dla firm)

---

### 3. Mechanizm nawykowy (Anti-Social Media)

**Zmiana:** Aplikacja ma stać się NAWYKOWĄ alternatywą dla nawykowego sięgania po media społecznościowe, gry i inne destrukcyjne nawyki.

**Uzasadnienie:**
- Użytkownik sięga po telefon bezmyślnie (scrollowanie, sprawdzanie powiadomień)
- Zamiast "nic nie robienia" - aplikacja oferuje moment refleksji
- Z czasem użytkownik ZAMIAST odpalać Instagram odpala aplikację
- To nie jest "feature" - to CORE MECHANIC

**Jak to działa:**
1. Użytkownik odczuwa pustkę/nudę → automatycznie sięga po telefon
2. Zamiast social media → odpala Enpsyneia
3. 30 sekund check-in → otrzymuje mikroakcję
4. Wykonuje mikroakcję → wraca do pracy/życia z większą świadomością
5. Z czasem: "odpalać Enpsyneia" staje się nowym nawykiem

---

### 4. Cel poboczny: Redukcja social media

**Zmiana:** Dla wielu użytkowników celem pobocznym (być może pierwszoplanowym z czasem) jest rezygnacja lub zmniejszenie zaangażowania w media społecznościowe.

**Mechanizm:**
- Aplikacja nie mówi "nie korzystaj z social media"
- Aplikacja oferuje LEPSZĄ alternatywę
- Z czasem użytkownik sam wybiera aplikację zamiast social media
- Nie walka z uzależnieniem, lecz zastąpienie zdrowszym nawykiem

---

## Problem, na który odpowiada projekt

### Problem pierwotny (bez zmian)

W codziennym życiu wiele osób funkcjonuje pod wpływem przeciążenia informacyjnego, nadmiaru bodźców i stałej presji działania. W takich warunkach łatwo utracić orientację we własnym stanie i potrzebach. Człowiek często nie wie, czy bardziej potrzebuje ruchu, odpocznienia, wyciszenia, samotności, czy może lekkiego kontaktu z drugą osobą. Zamiast tego działa automatycznie, odkłada decyzje albo wpada w nadmierną analizę.

Wiele istniejących aplikacji skupia się głównie na śledzeniu nastroju, stresu lub objawów. Ten projekt odpowiada na inny problem. Nie koncentruje się na samym zapisie emocji, lecz na rozpoznawaniu napięć między potrzebami i na doborze jednej małej, realnej do wykonania interwencji. Dzięki temu aplikacja ma być bardziej praktyczna niż klasyczny dzienniczek samopoczucia.

### Problem nowy (mechanizm nawykowy)

Dodatkowy problem: Nawykowe sięganie po telefon bez konkretnego celu. Użytkownik:
- Odczuwa nudę/pustkę
- Automatycznie sięga po telefon
- Scrolluje social media lub gra
- Po 30 minutach: poczucie straty czasu, wina, zmęczenia

**Rozwiązanie:** Enpsyneia jako anchorski nawyk - zamiast bezmyślnego scrollowania, użytkownik wykonuje szybki check-in i otrzymuje konkretne działanie.

---

## Cel projektu

### Cel główny (aktualizacja 2026-03-22)

**CEL #1: Budowanie marki osobistej i rozpoznawalności projektu Enpsyneia**

- Stworzenie rozpoznawalnej marki w niszy wellness/mindfulness
- Zbudowanie społeczności wokół koncepcji "enpsynei"
- Demonstracja kompetencji jako developer/coach
- Stworzenie fundamentu dla przyszłych projektów i inicjatyw

**CEL #2: Walidacja mechanizmu nawykowego**

- Udowodnienie, że aplikacja może zastąpić nawykowe korzystanie z social media
- Zbudowanie produktu, który użytkownicy otwierają NAWYKOWO zamiast Instagram/TikTok

### Cel pierwotny (bez zmian)

Celem projektu jest stworzenie intuicyjnej aplikacji webowej, która pomaga użytkownikowi lepiej zauważyć swój aktualny stan, nazwać dominujące potrzeby, otrzymać jedną konkretną rekomendację działania, budować prosty rytuał codziennego kontaktu ze sobą oraz obserwować w czasie powtarzające się wzorce funkcjonowania.

---

## Grupa docelowa

### Główna grupa (rozszerzona)

Aplikacja jest skierowana do osób, które:

1. **Czują się przebodźcowane lub przeciążone** - główna grupa bez zmian
2. **Mają trudność z rozpoznaniem, czego w danym momencie potrzebują** - główna grupa bez zmian
3. **Mają skłonność do nadmiernego analizowania zamiast przechodzenia do działania** - główna grupa bez zmian
4. **Chcą w prosty sposób poprawić codzienną równowagę i samoregulację** - główna grupa bez zmian
5. **CHCĄ OGRANICZYĆ KORZYSTANIE Z SOCIAL MEDIA** - NOWA PODGRUPA

### NOWA PODGRUPA: "Social Media Detox Seekers"

| Element | Opis |
|---------|------|
| Wiek | 18-40 lat |
| Problem | Nawykowe sprawdzanie telefonu, poczucie straty czasu |
| Motywacja | Chcą przestać, ale nie wiedzą czym zastąpić |
| Rozwiązanie | Enpsyneia jako "zdrowy nawyk" |
| Trigger | "Znów scrollowałem 30 min bez powodu" |

---

## Główna idea projektu

Centralnym założeniem aplikacji jest odpowiedź na pytanie:

**Czego najbardziej potrzebuję dziś albo teraz**

Projekt opiera się na przekonaniu, że w wielu sytuacjach człowiek nie potrzebuje rozbudowanego raportu ani długiego opisu swojego stanu, lecz prostego rozpoznania i jednej sensownej sugestii działania. Dzięki temu korzystanie z aplikacji może stać się mikrorytuałem podejmowanym kilka razy dziennie, a nie tylko okazjonalnym wpisywaniem danych.

**NOWE - Warstwa nawykowa:**

Dodatkowo, aplikacja ma być "anchor app" - aplikacja, którą użytkownik odpala automatycznie, gdy:
- Czuje nudę
- Chce "zabić czas"
- Odczuwa pustkę
- Potrzebuje "coś zrobić na telefonie"

Zamiast Instagram → Enpsyneia. Zamiast scrollowania → refleksji i działania.

---

## Sposób działania

Użytkownik wypełnia krótki formularz lub ustawia suwak oparty na skali, na przykład od 1 do 5. Pytania dotyczą nie tylko samopoczucia, lecz także napięć między różnymi potrzebami. Mogą one obejmować poziom energii, stopień przeciążenia bodźcami, potrzebę ruchu lub odpocznienia, potrzebę samotności lub kontaktu, poczucie sprawczości oraz poziom utknięcia w analizie.

Po zapisaniu odpowiedzi aplikacja generuje trzy elementy wyniku.

Pierwszy element to krótkie podsumowanie aktualnego stanu użytkownika.

Drugi element to przypisanie typu dnia, który ma bardziej ludzki i intuicyjny charakter niż suchy wynik liczbowy. Przykładowe typy dnia to dzień działania, dzień wyciszenia, dzień odbudowy, dzień kontaktu albo dzień przeciążenia.

Trzeci element to jedna główna mikroakcja. Jest to bardzo prosta sugestia możliwa do wykonania natychmiast, na przykład krótki spacer bez telefonu, kilka minut ruchu, ograniczenie bodźców, wykonanie jednej prostej czynności manualnej albo nawiązanie lekkiego kontaktu z jedną osobą.

**NOWE - Integracja z mechanizmem nawykowym:**

| Moment | Co się dzieje |
|--------|---------------|
| Użytkownik sięga po telefon | (trigger) |
| Zamiast social media → Enpsyneia | (alternative) |
| 30 sekund check-in | (cue) |
| Mikroakcja | (response) |
| Wykonanie mikroakcji | (reward) |
| Powrót do pracy/życia | ( continuation) |

---

## Element angażujący użytkownika

Projekt nie opiera się wyłącznie na zapisywaniu danych. Główną wartością dla użytkownika jest szybkie otrzymanie użytecznej wskazówki na tu i teraz. Korzystanie z aplikacji ma prowadzić do poczucia, że po krótkim check in wiadomo już, co warto ze sobą zrobić.

Dodatkowo po wykonaniu mikroakcji użytkownik może zaznaczyć, czy rekomendacja pomogła. Dzięki temu aplikacja buduje wrażenie prostego, osobistego systemu wspierania decyzji, a nie tylko formularza.

Po kilku dniach lub tygodniach użytkownik może też zobaczyć krótkie obserwacje dotyczące powtarzających się wzorców, na przykład częstego przeciążenia, częstej potrzeby ruchu albo tendencji do utknięcia w analizie. Zwiększa to poczucie sensu korzystania z aplikacji i wspiera autorefleksję.

**NOWE - Warstwa nawykowa:**

Dodatkowe elementy angażujące:
- **Streak counter:** "Dni z rzędu - ile razy wybrałeś Enpsyneia zamiast social media"
- **"Zastąpione nawyki":** Licznik pokazujący ile razy użytkownik wybrał aplikację zamiast scrollowania
- **Poranna/wieczorna rutyna:** Sugestie kiedy używać aplikacji (trigger times)

---

## Najważniejsze funkcjonalności

### Tier 1 (MVP - Must Have)

1. Krótki formularz check in
2. Analiza odpowiedzi na podstawie prostych reguł
3. Wyświetlenie typu dnia
4. Jedna główna rekomendacja działania
5. System kont użytkowników (Supabase Auth)
6. Zapisywanie wpisów na koncie
7. Historia wyników

### Tier 2 (Rozszerzenie - Should Have)

1. Ocena rekomendacji (feedback loop)
2. Obserwacje wzorców (np. "często masz dzień przeciążenia")
3. Mechanizm nawykowy - Streak counter
4. "Zastąpione nawyki" licznik
5. Powiadomienia (trigger times)

### Tier 3 (Przyszłość - Nice to Have)

1. Poranne/wieczorne rutyny
2. Widget na ekranie głównym
3. Dark mode
4. Więcej typów dnia
5. Personalizacja mikroakcji

---

## NOWA Warstwa Techniczna: System Kont

### Architektura (Supabase)

| Component | Wybór | Koszt |
|-----------|-------|-------|
| Frontend | React + Vercel | $0 |
| Styling | Tailwind CSS + Shadcn UI | $0 |
| Backend/Auth | Supabase | $0 (Free Tier) |
| Baza danych | Supabase PostgreSQL | $0 (Free Tier) |
| Hosting | Vercel | $0 |

### Flow Autentykacji

1. Użytkownik wpisuje e-mail
2. System wysyła Magic Link (Supabase)
3. Kliknięcie linka = automatycznie zalogowany
4. Na innym urządzeniu: ponownie Magic Link

**Zalety:**
- Bez hasła (mniej friction)
- Bezpieczne
- Gotowe rozwiązanie Supabase
- Możliwość przyszłej synchronizacji

---

## NOWA Warstwa Biznesowa: Brand Building

### Model wartości (zmiana paradygmatu)

Tradycyjny SaaS: monetyzacja użytkowników (per seat/feature/usage)

**Enpsyneia: monetyzacja uwagi i rozpoznawalności**

```
┌─────────────────────────────────────────────────────────────┐
│                    REVENUE → BRAND                          │
├─────────────────────────────────────────────────────────────┤
│  SaaS: Użytkownik płaci za produkt                        │
│  Enpsyneia: Użytkownik POMAGA rozprzestrzeniać ideę        │
│                                                             │
│  Zarabiamy NA Marku, Nie Na Produkt                        │
└─────────────────────────────────────────────────────────────┘
```

### Brand Building Metrics (zamiast MRR)

| Metryka | Cel (6 miesięcy) |
|---------|-------------------|
| Total Users | 1,000+ |
| Weekly Active Users | 200+ |
| Shares/Virality Rate | 10%+ |
| Social Mentions | 50+ |
| Email Subscribers | 100+ |

### Przyszłe ścieżki monetyzacji

| Pathway | Opis | Timing |
|---------|------|--------|
| Content & Newsletter | Newsletter jako lead magnet | Rok 1-2 |
| Coaching | Reputacja jako ekspert | Rok 2 |
| B2B Wellness | Employee wellness benefits | Rok 2-3 |
| Premium Course | "Enpsyneia Masterclass" | Rok 2 |

---

## Oryginalność projektu

Na rynku istnieją aplikacje do śledzenia nastroju i dobrostanu, jednak ten projekt różni się od nich kilkoma cechami.

Po pierwsze nacisk nie jest położony na samo monitorowanie nastroju, lecz na rozpoznawanie aktualnych potrzeb.

Po drugie aplikacja opiera się na napięciach między różnymi stanami i potrzebami, takimi jak ruch i odpoczynek, samotność i kontakt czy energia i przeciążenie, a nie wyłącznie na emocjach.

Po trzecie najważniejszym rezultatem nie jest raport, lecz jedna konkretna mikroakcja, która ma pomóc użytkownikowi podjąć lepszą decyzję w danym momencie.

Po czwarte (NOWE) aplikacja jest zaprojektowana jako NAWYKOWA alternatywa dla social media - to unikalny mechanizm na rynku.

Dzięki temu projekt jest prosty technicznie, ale jednocześnie posiada własny, wyraźny punkt ciężkości i praktyczną użyteczność.

---

## Przykładowe zastosowanie

Użytkownik zaznacza, że ma niski poziom energii, wysokie przeciążenie bodźcami i niski poziom sprawczości. Aplikacja rozpoznaje dzień przeciążenia i proponuje jedną prostą mikroakcję, na przykład dziesięć minut bez ekranu oraz wykonanie jednej łatwej czynności fizycznej.

W innej sytuacji użytkownik może zaznaczyć średnią energię, niskie przeciążenie i wysoką potrzebę kontaktu. Aplikacja rozpoznaje dzień kontaktu i sugeruje wykonanie krótkiego telefonu lub napisanie do jednej bezpiecznej osoby.

**NOWE - Przykład mechanizmu nawykowego:**

Użytkownik siedzi wieczorem przed TV, sięga po telefon żeby "sprawdzić coś na Instagramie". Zamiast tego odpala Enpsyneia. Po 30 sekundach otrzymuje mikroakcję: "Zrób 5 minut stretchingu". Wstaje, robi stretching, wraca do TV z lepszym samopoczuciem. Następnym razem: może znów odpali Instagrama, ale pamięta że Enpsyneia daje mu więcej wartości.

---

## Możliwości rozwoju

W przyszłości projekt można rozwinąć o wykres historii wpisów, większą liczbę typów dnia, personalizację mikroakcji, tryb ciemny, wersję mobilną albo bardziej rozbudowany system obserwacji wzorców.

**NOWE:**

- Widget na ekranie głównym (mobile)
- Integracja z Apple Health/Google Fit
- Gamifikacja: achievementy za "zdrowe nawyki"
- Społeczność: forum użytkowników
- API dla developerów third-party

---

## Podsumowanie

Enpsyneia Check In to prosta aplikacja webowa, która pomaga użytkownikowi rozpoznać swój aktualny stan i wybrać jedno małe działanie wspierające równowagę psychofizyczną. Projekt łączy prostotę techniczną z realną użytecznością. Jego wartość nie polega na samym śledzeniu samopoczucia, lecz na szybkim przekładaniu samoobserwacji na praktyczną decyzję.

**NOWE - kluczowe zmiany:**

1. **System kont:** Umożliwia budowanie bazy użytkowników i przyszłą monetyzację
2. **Brand Building jako cel główny:** Wartość projektu = w rozpoznawalności, nie w bezpośrednich przychodach
3. **Mechanizm nawykowy:** Aplikacja jako alternatywa dla social media - unikalna propozycja wartości na rynku

Dzięki temu projekt dobrze nadaje się jako projekt zaliczeniowy, ale również jako fundament do budowania marki osobistej i przyszłych inicjatyw w niszy wellness.
