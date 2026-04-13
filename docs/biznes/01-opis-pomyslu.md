# Enpsyneia Check In

## Status dokumentu

Zaktualizowany: 2026-04-12. Podstawa: [`04-mvp-scope.md`](04-mvp-scope.md), [`03-decision.md`](03-decision.md).

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

### Główny cel aplikacji

Głównym celem aplikacji jest wspieranie użytkownika w odzyskiwaniu orientacji we własnym stanie, przerywaniu automatycznych reakcji i podejmowaniu małych, adekwatnych działań na tu i teraz. Na poziomie strategicznym aplikacja ma również pełnić funkcję praktycznego punktu wejścia do projektu Enpsyneia, wzmacniając jego rozpoznawalność i budując długofalową relację użytkownika z tą ideą.

---

### Mechanizm nawykowy — hipoteza do walidacji

**Kierunek:** Aplikacja może stać się nawykową alternatywą dla nawykowego sięgania po media społecznościowe, gry i inne destrukcyjne nawyki.

**Uzasadnienie:**
- Użytkownik sięga po telefon bezmyślnie (scrollowanie, sprawdzanie powiadomień)
- Zamiast "nic nie robienia" - aplikacja oferuje moment refleksji
- Z czasem użytkownik ZAMIAST odpalać Instagram odpala aplikację
- To hipoteza do walidacji na realnych użytkownikach — nie założenie produktowe.

**Jak to działa:**
1. Użytkownik odczuwa pustkę/nudę → automatycznie sięga po telefon
2. Zamiast social media → odpala Enpsyneia
3. 30 sekund check-in → otrzymuje mikroakcję
4. Wykonuje mikroakcję → wraca do pracy/życia z większą świadomością
5. Z czasem: "odpalać Enpsyneia" staje się nowym nawykiem

---

### Cel poboczny: Redukcja social media

Dla wielu użytkowników celem pobocznym (być może pierwszoplanowym z czasem) jest rezygnacja lub zmniejszenie zaangażowania w media społecznościowe.

**Mechanizm:**
- Aplikacja nie mówi "nie korzystaj z social media"
- Aplikacja oferuje lepszą alternatywę
- Z czasem użytkownik sam wybiera aplikację zamiast social media
- Nie walka z uzależnieniem, lecz zastąpienie zdrowszym nawykiem

---

## Problem, na który odpowiada projekt

### Problem pierwotny

W codziennym życiu wiele osób funkcjonuje pod wpływem przeciążenia informacyjnego, nadmiaru bodźców i stałej presji działania. W takich warunkach łatwo utracić orientację we własnym stanie i potrzebach. Człowiek często nie wie, czy bardziej potrzebuje ruchu, odpocznienia, wyciszenia, samotności, czy może lekkiego kontaktu z drugą osobą. Zamiast tego działa automatycznie, odkłada decyzje albo wpada w nadmierną analizę.

Wiele istniejących aplikacji skupia się głównie na śledzeniu nastroju, stresu lub objawów. Ten projekt odpowiada na inny problem. Nie koncentruje się na samym zapisie emocji, lecz na rozpoznawaniu napięć między potrzebami i na doborze jednej małej, realnej do wykonania interwencji. Dzięki temu aplikacja ma być bardziej praktyczna niż klasyczny dzienniczek samopoczucia.

### Problem nowy (mechanizm nawykowy)

Dodatkowy problem: Nawykowe sięganie po telefon bez konkretnego celu. Użytkownik:
- Odczuwa nudę/pustkę
- Automatycznie sięga po telefon
- Scrolluje social media lub gra
- Po 30 minutach: poczucie straty czasu, wina, zmęczenia

**Rozwiązanie:** Enpsyneia jako anchorski nawyk — zamiast bezmyślnego scrollowania, użytkownik wykonuje szybki check-in i otrzymuje konkretne działanie.

---

## Grupa docelowa

### Główna grupa

Aplikacja jest skierowana do osób, które:

1. **Czują się przebodźcowane lub przeciążone**
2. **Mają trudność z rozpoznaniem, czego w danym momencie potrzebują**
3. **Mają skłonność do nadmiernego analizowania zamiast przechodzenia do działania**
4. **Chcą w prosty sposób poprawić codzienną równowagę i samoregulację**
5. Chcą ograniczyć korzystanie z social media

### Podgrupa: użytkownicy szukający alternatywy dla social media

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

Dodatkowo, aplikacja ma być "anchor app" — aplikacja, którą użytkownik odpala automatycznie, gdy:
- Czuje nudę
- Chce "zabić czas"
- Odczuwa pustkę
- Potrzebuje "coś zrobić na telefonie"

Zamiast Instagram → Enpsyneia. Zamiast scrollowania → refleksja i działanie.

---

## Sposób działania

Użytkownik wypełnia krótki formularz lub ustawia suwak oparty na skali, na przykład od 1 do 5. Pytania dotyczą nie tylko samopoczucia, lecz także napięć między różnymi potrzebami. Mogą one obejmować poziom energii, stopień przeciążenia bodźcami, potrzebę ruchu lub odpocznienia, potrzebę samotności lub kontaktu, poczucie sprawczości oraz poziom utknięcia w analizie.

Po zapisaniu odpowiedzi aplikacja generuje trzy elementy wyniku.

Pierwszy element wyniku stanowi krótkie podsumowanie aktualnego stanu użytkownika. Jego zadaniem nie jest tworzenie rozbudowanego raportu ani psychologicznej interpretacji, lecz proste i zrozumiałe uchwycenie tego, co najprawdopodobniej dzieje się z użytkownikiem w danym momencie. Podsumowanie ma porządkować wynik check inu, zmniejszać chaos poznawczy i dawać użytkownikowi poczucie, że jego stan został trafnie rozpoznany. Powinno być sformułowane prostym, ludzkim językiem, bez tonu diagnostycznego i bez sztywnego kategoryzowania. Może wskazywać na dominujące napięcie, główną potrzebę albo najważniejszą cechę aktualnego momentu, na przykład że użytkownik jest bardziej przeciążony niż pozbawiony motywacji, że potrzebuje odbudowy zamiast dalszego nacisku albo że problemem nie jest brak chęci, lecz utknięcie w analizie. Taki element pełni funkcję pomostu między odpowiedziami w formularzu a dalszą rekomendacją, ponieważ pomaga użytkownikowi lepiej zrozumieć własny stan i zwiększa gotowość do przyjęcia sugerowanej mikroakcji.

Drugi element to przypisanie typu dnia, który ma bardziej ludzki i intuicyjny charakter niż suchy wynik liczbowy. Przykładowe typy dnia to dzień działania, dzień wyciszenia, dzień odbudowy, dzień kontaktu albo dzień przeciążenia.

Typ dnia nie powinien być traktowany jako ozdobna etykieta ani główny rezultat działania aplikacji. Jego sens polega na tym, że porządkuje złożony stan użytkownika i przekłada kilka rozproszonych sygnałów na jedno krótkie, intuicyjne rozpoznanie. Dzięki temu użytkownik nie musi interpretować osobno poziomu energii, przeciążenia, sprawczości czy utknięcia w analizie, lecz dostaje prostą informację o tym, jaki charakter ma jego aktualny stan. Taki element zmniejsza chaos poznawczy, zwiększa poczucie zrozumienia własnej sytuacji i sprawia, że rekomendowana mikroakcja wydaje się bardziej trafna i naturalna. W praktyce pełni więc funkcję pomocniczego mostu między check inem a działaniem. Jednocześnie w tym projekcie ważniejsze od samego pojęcia typu dnia jest rozpoznanie aktualnego momentu i dominującej potrzeby użytkownika. Dlatego ten element powinien być formułowany możliwie lekko i naturalnie, bardziej jako krótkie uchwycenie tego, co dzieje się teraz, niż jako sztywna klasyfikacja całego dnia. Jego zadaniem jest ułatwić użytkownikowi zatrzymanie automatyzmu, lepsze zrozumienie własnego stanu i przyjęcie jednego małego, adekwatnego kroku.

Trzeci element wyniku stanowi jedna główna mikroakcja, czyli bardzo prosta sugestia działania możliwa do wykonania natychmiast i bez dużego wysiłku organizacyjnego. Jej celem nie jest rozwiązanie całego problemu użytkownika, lecz przerwanie automatyzmu, obniżenie chaosu decyzyjnego i ułatwienie wykonania pierwszego małego kroku adekwatnego do aktualnego stanu. Mikroakcja powinna być krótka, konkretna, łatwa do zrozumienia i możliwa do wykonania od razu w bieżących warunkach. Może dotyczyć ruchu, ograniczenia bodźców, prostego działania manualnego, krótkiego kontaktu z drugą osobą, zmiany otoczenia albo świadomego zatrzymania. Przykładami takich mikroakcji mogą być krótki spacer bez telefonu, kilka minut lekkiego ruchu, odłożenie ekranu na określony czas, wykonanie jednej bardzo prostej czynności fizycznej, przewietrzenie pokoju, napicie się wody albo napisanie krótkiej wiadomości do bezpiecznej osoby. Najważniejsze jest to, aby mikroakcja była dostosowana do rozpoznanej potrzeby użytkownika i stanowiła realny most między chwilowym rozpoznaniem stanu a bardziej intencjonalnym działaniem.

Użytkownik początkowo nie musi zakładać konta, aby skorzystać z aplikacji. Pierwsze użycie ma być możliwie szybkie, lekkie i pozbawione zbędnych barier, tak aby użytkownik mógł od razu przejść do check inu i otrzymać użyteczną wskazówkę. Dzięki temu aplikacja zachowuje niski próg wejścia i pozwala najpierw doświadczyć jej wartości w praktyce. Możliwość założenia konta może być dostępna od razu dla osób, które chcą rozpocząć pełniejsze korzystanie od początku, jednak nie powinna być wymagana na starcie. Dopiero po wielokrotnym skorzystaniu z aplikacji użytkownik może otrzymać sugestię utworzenia konta, jeśli wyraźnie widać, że wraca do narzędzia i czerpie z niego wartość. W takiej sytuacji konto staje się naturalnym kolejnym krokiem, umożliwiającym zachowanie historii, synchronizację danych, bardziej długofalowe śledzenie wzorców oraz stopniowe pogłębianie relacji z aplikacją i z samym projektem Enpsyneia.

| Moment | Co się dzieje |
|--------|---------------|
| Użytkownik sięga po telefon | (trigger) |
| Zamiast social media → Enpsyneia | (alternative) |
| 30 sekund check-in | (cue) |
| Mikroakcja | (response) |
| Wykonanie mikroakcji | (reward) |
| Powrót do pracy/życia | (continuation) |

---

## Element angażujący użytkownika

Projekt nie opiera się wyłącznie na zapisywaniu danych. Główną wartością dla użytkownika jest szybkie otrzymanie użytecznej wskazówki na tu i teraz. Korzystanie z aplikacji ma prowadzić do poczucia, że po krótkim check in wiadomo już, co warto ze sobą zrobić.

Dodatkowo po wykonaniu mikroakcji użytkownik może zaznaczyć, czy rekomendacja pomogła. Dzięki temu aplikacja buduje wrażenie prostego, osobistego systemu wspierania decyzji, a nie tylko formularza.

Po kilku dniach lub tygodniach użytkownik może też zobaczyć krótkie obserwacje dotyczące powtarzających się wzorców, na przykład częstego przeciążenia, częstej potrzeby ruchu albo tendencji do utknięcia w analizie. Zwiększa to poczucie sensu korzystania z aplikacji i wspiera autorefleksję. *(Planowane w Etapie 3 — poza zakresem MVP.)*

Dodatkowe elementy angażujące (hipoteza do walidacji):
- **Streak counter:** "Dni z rzędu — ile razy wybrałeś Enpsyneia zamiast social media"
- **"Zastąpione nawyki":** Licznik pokazujący ile razy użytkownik wybrał aplikację zamiast scrollowania
- **Poranna/wieczorna rutyna:** Sugestie kiedy używać aplikacji (trigger times)

---

## Najważniejsze funkcjonalności

Aktualny zakres MVP definiuje [`docs/biznes/04-mvp-scope.md`](04-mvp-scope.md).

### Etap 1 (MVP — localStorage, bez konta)

1. Krótki formularz check-in
2. Analiza odpowiedzi na podstawie prostych reguł
3. Wyświetlenie typu dnia
4. Jedna główna rekomendacja działania
5. Streak counter (lokalny, przechowywany w przeglądarce)
6. Responsywność mobilna

Aplikacja w Etapie 1 działa bez konta. Dane są przechowywane lokalnie w przeglądarce — w tym historia ostatnich 5 wpisów jako element lokalnej pamięci między sesjami.

### Etap 2 (po walidacji Etapu 1 — Supabase)

1. System kont i synchronizacja danych (Supabase Auth)
2. Ocena rekomendacji (feedback loop)
3. Obserwacje wzorców (np. "często masz dzień przeciążenia")
4. "Zastąpione nawyki" licznik
5. Powiadomienia (trigger times)

### Etap 3 (Przyszłość)

1. Poranne/wieczorne rutyny
2. Widget na ekranie głównym
3. Więcej typów dnia
4. Personalizacja mikroakcji

Architektura i etapowanie techniczne są opisane w `AGENTS.md` oraz [`docs/biznes/04-mvp-scope.md`](04-mvp-scope.md).

---

## Oryginalność projektu

Na rynku istnieją aplikacje do śledzenia nastroju i dobrostanu, jednak ten projekt różni się od nich kilkoma cechami.

Po pierwsze nacisk nie jest położony na samo monitorowanie nastroju, lecz na rozpoznawanie aktualnych potrzeb.

Po drugie aplikacja opiera się na napięciach między różnymi stanami i potrzebami, takimi jak ruch i odpoczynek, samotność i kontakt czy energia i przeciążenie, a nie wyłącznie na emocjach.

Po trzecie najważniejszym rezultatem nie jest raport, lecz jedna konkretna mikroakcja, która ma pomóc użytkownikowi podjąć lepszą decyzję w danym momencie.

Po czwarte, aplikacja jest projektowana jako potencjalna nawykowa alternatywa dla social media — hipoteza wyróżnikowa do walidacji.

Dzięki temu projekt jest prosty technicznie, ale jednocześnie posiada własny, wyraźny punkt ciężkości i praktyczną użyteczność.

---

## Przykładowe zastosowanie

Użytkownik zaznacza, że ma niski poziom energii, wysokie przeciążenie bodźcami i niski poziom sprawczości. Aplikacja rozpoznaje dzień przeciążenia i proponuje jedną prostą mikroakcję, na przykład dziesięć minut bez ekranu oraz wykonanie jednej łatwej czynności fizycznej.

W innej sytuacji użytkownik może zaznaczyć średnią energię, niskie przeciążenie i wysoką potrzebę kontaktu. Aplikacja rozpoznaje dzień kontaktu i sugeruje wykonanie krótkiego telefonu lub napisanie do jednej przyjaznej osoby.

Przykład mechanizmu nawykowego:

Użytkownik siedzi wieczorem przed TV, sięga po telefon żeby "sprawdzić coś na Instagramie". Zamiast tego odpala Enpsyneia. Po 30 sekundach otrzymuje mikroakcję: "Zrób 5 minut stretchingu". Wstaje, robi stretching, wraca do TV z lepszym samopoczuciem. Następnym razem: może znów odpali Instagrama, ale pamięta że Enpsyneia daje mu więcej wartości.

---

## Możliwości rozwoju

W przyszłości projekt można rozwinąć o wykres historii wpisów, większą liczbę typów dnia, personalizację mikroakcji, tryb ciemny, wersję mobilną albo bardziej rozbudowany system obserwacji wzorców.

- Widget na ekranie głównym (mobile)
- Integracja z Apple Health/Google Fit
- Gamifikacja: achievementy za "zdrowe nawyki"
- Społeczność: forum użytkowników
- API dla developerów third-party

---

## Podsumowanie

Enpsyneia Check In to prosta aplikacja webowa, która pomaga użytkownikowi rozpoznać swój aktualny stan i wybrać jedno małe działanie wspierające równowagę psychofizyczną. Projekt łączy prostotę techniczną z realną użytecznością. Jego wartość nie polega na samym śledzeniu samopoczucia, lecz na szybkim przekładaniu samoobserwacji na praktyczną decyzję.
