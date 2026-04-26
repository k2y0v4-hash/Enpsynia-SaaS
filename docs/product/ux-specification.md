# Specyfikacja UX/UI — Enpsyneia Check-In

**Wersja:** 1.7
**Data:** 2026-04-25
**Status:** Obowiązujący dokument uzupełniający Figmę

---

## 1. Zasada źródeł prawdy

| Warstwa | Źródło prawdy |
|---------|--------------|
| UX/UI — ekrany, układ, copy, kolory, typografia, flow | **Figma** |
| Logika analizy (algorytm, typy dnia, mikroakcje) | `docs/product/analysis-logic.md` |
| Decyzje produktowe, zakres MVP | Ten dokument |
| Materiał historyczny (bez mocy wiążącej) | `docs/product/mvp-scope.md`, `docs/ui/screens.md` |

Jeśli Figma i stara specyfikacja są sprzeczne — Figma wygrywa.
Ten dokument opisuje wyłącznie to, czego Figma nie pokazuje wprost.

---

## 2. Ekrany i ich rola

Plik Figma: `Enpsyneia Check-In UX/UI Prototype`
Strona: `Enpsyneia Check-In mobile first`
Ramka bazowa: 390 × 844 px (iPhone 14 / 390px)

### Ekrany głównego flow (MVP)

| Nr | Nazwa w Figmie | Rola |
|----|----------------|------|
| 0 | Cookies (bramka) | **Decyzja produktowa poza Figmą:** osobny ekran z pytaniem o cookies pokazywany przed Landing przy `consent === null` |
| 01 | Start natychmiastowy check-in | Landing — wejście do aplikacji (po zgodzie cookies) |
| 02 | Check-in blok 1 z 2 | Formularz — pytania 1–3 (Energia, Przeciążenie, Analiza) |
| 03 | Check-in blok 2 z 2 | Formularz — pytania 4–6 (Ruch, Kontakt, Sprawczość) |
| 04 | Brak odpowiedzi — ekran warunkowy | Ostrzeżenie gdy użytkownik nie dotknął co najmniej jednego suwaka |
| _(brak w Figmie)_ | Ekran przejściowy (analiza) | Animacja ładowania między formularzem a wynikiem |
| 05 | Wynik — typ dnia | Wynik check-inu: typ dnia + opis + teaser mikroakcji |
| 06 | Mikro-akcja — szczegóły | Pełna mikroakcja w krokach + feedback użytkownika |

### Ekrany dodatkowe (dostępne z menu, MVP)

| Nr | Nazwa w Figmie | Rola |
|----|----------------|------|
| 08 | Historia | Ostatnie check-iny na urządzeniu |
| 08b | Historia — stan pusty | Wyświetlany gdy `history.length === 0` |
| 09 | O projekcie | Krótki opis działania aplikacji |
| 10 | Sugestie dla autora | Formularz opinii o aplikacji |
| 11 | Prywatność | Trzy toggle: Historia lokalna / Analityka / Przypomnienie |
| 12 | Menu rozwinięte | Lista 5 pozycji menu — sekcja 5.13 |
| 14 | Regulamin i Polityka prywatności | Treść regulaminu + polityki prywatności — **jeden połączony ekran** (D22) |

### Ekrany Stage 2 (w Figmie jako plany, nie implementowane w MVP)

| Nr | Nazwa w Figmie | Rola |
|----|----------------|------|
| 07 | Logowanie | Magic link + „Kontynuuj bez konta" — Stage 2 |
| 13 | Zakładanie konta | Rejestracja emailem — Stage 2 |

Pełny zakres opisany w sekcji 7.

---

## 3. Flow użytkownika

### Ścieżka główna

```
[0 Cookies — bramka]  ← pokazywany tylko gdy `consent === null`
  — Hamburger widoczny, disabled (D17)
  — link „Polityka prywatności" → [14 Regulamin]
  ↓ klik „Akceptuję" / „Odrzucam"
[01 Start]
  — link „Polityka prywatności" już niewidoczny (cookies załatwione)
  ↓ klik „Zacznij check-in"
[02 Blok 1 — pytania 1–3]
  ↓ klik „Dalej" → zawsze przechodzi do bloku 2
[03 Blok 2 — pytania 4–6]
  ↓ klik „Wynik"
    → jeśli mniej niż 3 suwaki ruszone łącznie w obu blokach → [04 Brak odpowiedzi]
      → klik „Wróć" → zawsze wraca do bloku 1 (ekran 02)
      → klik „Wynik" → kontynuacja mimo braku
    → w przeciwnym razie → bezpośrednio do
[05 Wynik — typ dnia]
  ↓ klik „Zobacz mikro-akcję"
[06 Mikro-akcja — szczegóły]
  ↓ klik Tak / Trochę / Nie (feedback)
  — Po kliknięciu feedbacku pojawia się przycisk „Nowy check-in" (dynamicznie)
  ↓ klik „Nowy check-in"
[02 Blok 1] (reset)
```

### Nawigacja przez menu

```
[Hamburger] (dostępny z ekranów 02, 03, 04, 05, 06, 08, 09, 10, 11, 14)
  → [12 Menu rozwinięte]
       ├── Logowanie [Stage 2 — disabled w MVP]
       ├── Historia → [08] (lub [08b] gdy pusta)
       │     └── „Nowy check-in" → [02] (reset)
       ├── O projekcie → [09]
       │     └── „Wróć do check-inu" → [02] (reset)
       ├── Sugestie dla autora → [10]
       │     └── „Wyślij sugestię" → [01 Landing]
       ├── Prywatność → [11]
       │     ├── „Polityka prywatności" → [14]
       │     └── „Zapisz ustawienia" → ekran wywołujący menu (Wróć)
       └── „Wróć" → ekran wywołujący menu

[14 Regulamin i polityka prywatności]
  ├── „Wróć do ustawień prywatności" → [11]
  └── „Nowy check-in" → [02] (reset)
```

### Ścieżka cookies (pierwsze wejście)

```
[0 Cookies — bramka] (pełnoekranowa karta z pytaniem o cookies)
  ├── klik „Akceptuję" → cookies zapisane, GA4 włączone, → [01 Start]
  ├── klik „Odrzucam" → cookies funkcjonalne (historia), GA4 nie inicjalizowane, → [01 Start]
  └── klik „Polityka prywatności" → [14 Regulamin] → „Wróć" → [0]
```

Ekran 0 nie wyświetla się ponownie dopóki zgoda jest w localStorage (`enpsyneia_analytics_consent`).

**Stage 2 — „Kontynuuj bez konta"** (ekran 07 Logowanie): klik → zawsze przechodzi do bloku 1 check-inu (ekran 02).

---

## 4. Decyzje UX wynikające z Figmy

Elementy rozstrzygnięte przez projekt — nie wymagają dyskusji przed implementacją.

| # | Temat | Decyzja |
|---|-------|---------|
| D1 | Font | **Inter** (UI); **DM Sans Light** używany wyłącznie w stopce copyright (komponent „Stopka / Copyright") |
| D2 | Paleta kolorów | Ciepła, ziemska — szczegóły w sekcji 5.1 |
| D3 | Nagłówek ekranu 01 | „Enpsyneia Check-In" — brand-first, celowo większy niż na innych ekranach |
| D4 | Value prop ekranu 01 | „Zatrzymaj się na chwilę, nazwij aktualny stan i wybierz następny mały krok." |
| D5 | CTA ekranu 01 | „Zacznij check-in" |
| D6 | Help text suwaków | Jeden wspólny: „Oceń swój stan przesuwając suwak." — brak per-pytanie |
| D7 | Etykiety suwaków | Ustalone per Figma; zob. sekcja 5.2 |
| D8 | Kolory suwaków | 6 unikalnych par (aktywny + tło tracka) per pytanie — zob. sekcja 5.3 |
| D9 | Progress bar | Brak elementu „Blok X z 2" w UI — świadome uproszczenie layoutu |
| D10 | Struktura wyniku | Dwa osobne ekrany: **05 Typ dnia** → **06 Mikro-akcja** |
| D11 | Feedback mikroakcji | 3 opcje: **Tak / Trochę / Nie** |
| D12 | Streak counter | **Nie istnieje** — nigdzie w Figmie ani w kodzie. Element wycięty z zakresu MVP definitywnie |
| D13 | Nawigacja | Hamburger menu obecne w ekranach poza Landing |
| D14 | Cookies | **Osobny ekran 0 (bramka)** — decyzja produktowa poza Figmą. Figma pokazuje cookies jako kartę na ekranie 01; w MVP zdecydowano o wydzieleniu na osobny ekran dla czytelniejszego flow (decyzja 2026-04-26) |
| D15 | Przycisk restartu | Etykieta: **„Nowy check-in"** (nie „Wykonaj ponownie") |
| D16 | CTA na ekranie 01 przed cookies | **N/A** — Landing dostępny dopiero po decyzji cookies (D14: bramka 0). CTA zawsze aktywny |
| D17 | Hamburger przed cookies | Hamburger widoczny, ale **disabled** wyłącznie na ekranie 0 (bramka cookies). Po decyzji aktywny na wszystkich ekranach |
| D18 | Przycisk „Wróć" na ekranie 04 | Zawsze wraca do **bloku 1** (ekran 02) — niezależnie od bloku z problemem |
| D19 | „Nowy check-in" na ekranie 06 | Przycisk pojawia się **dynamicznie po kliknięciu feedbacku** — niewidoczny przed wyborem |
| D20 | Wynik w historii („3/5") | Średnia arytmetyczna wszystkich 6 suwaków, zaokrąglona do **pełnej liczby** |
| D21 | Stan nieruszonego suwaka | Szary jest wyłącznie **track** — thumb pozostaje w kolorze pytania (nie szarzy się) |
| D22 | Regulamin + Polityka prywatności | **Jeden połączony ekran** (nie dwa osobne) |
| D23 | Link „Wróć do ustawień prywatności" | Celowe rozwiązanie — link tekstowy, nie przycisk; tak ma być |
| D24 | Copyright („©") | Docelowo link do profilu autora na LinkedIn; w MVP element statyczny. W Figmie zaimplementowany jako komponent **„Stopka / Copyright"** (separator + tekst DM Sans Light 11px) — każdy nowy ekran wymaga ręcznego wstawienia instancji z panelu komponentów |
| D25 | Stan ustawień prywatności | Zachowuje się przy nawigacji wstecz (user nie traci wprowadzonych wyborów) |
| D26 | Próg minimalny odpowiedzi | Wymagane co najmniej **3 ruszone suwaki** (z 6) żeby uzyskać wynik; poniżej → ekran 04 |

---

## 5. Funkcjonalności niewidoczne w Figmie

### 5.1 Tokeny kolorów

Obowiązująca paleta (do użycia jako CSS custom properties):

| Token | Wartość hex | Zastosowanie |
|-------|-------------|-------------|
| `--color-bg` | `#F7F4EF` | Tło aplikacji |
| `--color-card` | `#FFFCF7` | Tło kart i paneli |
| `--color-text` | `#1F2523` | Tekst główny |
| `--color-text-muted` | `#66716C` | Tekst pomocniczy, etykiety |
| `--color-primary` | `#1D6B5F` | CTA, aktywne elementy |
| `--color-border` | `#D9D0C5` | Linie, obrysy |

### 5.2 Etykiety suwaków

Ostateczne brzmienie etykiet (zgodne z Figmą):

| Pytanie | Lewa (1) | Prawa (5) |
|---------|----------|-----------|
| Energia | wyczerpany | pełen energii |
| Przeciążenie bodźcami | przebodźcowany | wyciszenie |
| Utknięcie w analizie | myślę bez końca | działam |
| Potrzeba ruchu | potrzebuję odpocząć | chcę ruchu |
| Potrzeba kontaktu | chcę samotności | chcę kontaktu |
| Sprawczość | nic nie mogę | mogę wszystko |

**Uwaga:** Przeciążenie i Utknięcie mają odwróconą skalę względem pozostałych pytań (wysoka wartość = mniej problemu). Algorytm w `analysis-logic.md` musi to uwzględniać przy obliczaniu typów dnia.

### 5.3 Kolory suwaków per pytanie

| Pytanie | Kolor aktywny (thumb + wypełniona część) | Kolor tła tracka |
|---------|------------------------------------------|-----------------|
| Energia | `#1D6B5F` | `#DDEDE8` |
| Przeciążenie bodźcami | `#2D6F8F` | `#E2EDF3` |
| Utknięcie w analizie | `#7A6A43` | `#EDE7D8` |
| Potrzeba ruchu | `#6F7D3B` | `#E8ECD8` |
| Potrzeba kontaktu | `#A0674E` | `#F0E2D9` |
| Sprawczość | `#7156A3` | `#E8E0F2` |

### 5.4 Stany suwaków

Suwak ma dwa stany istotne dla logiki aplikacji:

| Stan | Wizualia | Znaczenie |
|------|---------|-----------|
| **Nieruszony** | Track **szary** (brak koloru aktywnego), thumb w kolorze pytania (nie szarzy się) | Brak odpowiedzi — może triggerować ekran 04 |
| **Ruszony** | Track z wypełnieniem w kolorze pytania, thumb w kolorze pytania | Odpowiedź zarejestrowana (nawet jeśli wartość = 3) |

**Implementacja:** Osobna flaga `touched: boolean` per pytanie, niezależna od wartości. Domyślnie `false`. Ustawia się na `true` przy pierwszym `onChange` suwaka. Powrót do wartości 3 po wcześniejszym ruchu nie resetuje flagi.

Markery skali: 5 pionowych kresek pod trackiem, pozycje 0% / 25% / 50% / 75% / 100% szerokości tracka. Wizualnie subtelne (`#D9D0C5`), tylko sygnalizacja dyskretności skali.

### 5.5 Ekran 04 — logika triggera

Ekran 04 wyświetla się gdy użytkownik próbuje przejść dalej (klik „Dalej" lub „Wynik"), a łącznie mniej niż **3 suwaki** spośród wszystkich 6 mają stan `touched = true`.

**Próg:** `countTouched(allQuestions) < 3` → trigger ekranu 04. Jeśli 3 lub więcej suwaków ruszonych — flow kontynuuje normalnie.

Ekran pokazuje:
- Listę wszystkich 6 pytań z wartościami lub „brak" dla nieruszonych
- Komunikat ostrzegawczy
- Dwie opcje: **„Wróć"** (zawsze wraca do **bloku 1**, ekran 02) lub **„Wynik"** (kontynuacja mimo braku)

### 5.6 Treść ekranów 05–06 — mikroakcje

#### Format wymagany przez Figmę

Ekran 05 wyświetla teaser (krótki tytuł). Ekran 06 wyświetla mikroakcję jako **3 numerowane kroki** + tytuł.

Każda mikroakcja wymaga:
- **Tytuł** (krótki, maks. ~30 znaków) — wyświetlany na ekranie 05 jako teaser i jako nagłówek ekranu 06
- **Krok 1** — jedno zdanie, konkretna czynność
- **Krok 2** — jedno zdanie
- **Krok 3** — jedno zdanie

**To jest content blocker** — ekrany 05–06 nie mogą być zaimplementowane bez tej treści.

#### Tabela mikroakcji — 10 wariantów

Warianty A i B są wybierane deterministycznie per `analysis-logic.md` sekcja 4. Warunek wyboru podany w kolumnie „Warunek".

Figma zawiera **jeden potwierdzony wariant** (Odbudowy A — screen 06). Pozostałe 9 wariantów pochodzi z `analysis-logic.md` sekcja 5 jako **DRAFT** — treść wymaga zatwierdzenia przez właściciela produktu przed implementacją (E7 🔴).

**Odbudowy A** — `energy ≤ 2 AND movement ≤ 3`
- **Tytuł (Figma):** 3 minuty resetu ciała
- **K1:** Oprzyj stopy o podłogę.
- **K2:** Rozluźnij szczękę i barki.
- **K3:** Oddychaj wolniej przez minutę.
- _⚠️ Tekst w Figmie różni się od `analysis-logic.md` („Połóż się na 10 minut…"). Figma wygrywa — wymaga uzgodnienia z autorem._

**Odbudowy B** — pozostałe przypadki Odbudowy *(DRAFT)*
- **Tytuł:** Szklanka wody i stretching
- **K1:** Nalej szklankę wody i wypij ją powoli.
- **K2:** Zrób 5 spokojnych skłonów lub stretchów.
- **K3:** Rozluźnij napięcie w karku i ramionach.

**Działania A** — `movement ≥ 4` *(DRAFT)*
- **Tytuł:** 15 minut spaceru na start
- **K1:** Idź na 15 minut szybkiego spaceru — bez słuchawek, bez telefonu w ręce.
- **K2:** Wróć i zacznij jedno konkretne zadanie.
- **K3:** Ruch wyostrzy koncentrację.

**Działania B** — `movement ≤ 3` *(DRAFT)*
- **Tytuł:** Timer 25 minut — jedno zadanie
- **K1:** Wybierz jedno zadanie, które odkładasz od co najmniej 2 dni.
- **K2:** Ustaw timer na 25 minut i zacznij — nieważne jak małym krokiem.
- **K3:** Nie kończ najpierw czegoś innego.

**Wyciszenia A** — `social ≤ 2` *(DRAFT)*
- **Tytuł:** 5 minut bez niczego
- **K1:** Odłóż telefon w inne pomieszczenie niż to, w którym jesteś.
- **K2:** Usiądź przez 5 minut bez niczego — nie rób nic, dosłownie.
- **K3:** Obserwuj co się pojawia w głowie.

**Wyciszenia B** — `social ≥ 3` *(DRAFT)*
- **Tytuł:** 10 minut spaceru bez celu
- **K1:** Wyjdź na 10 minut bez słuchawek i bez konkretnego celu.
- **K2:** Skręć w pierwszą lepszą ulicę, idź, wróć.
- **K3:** Zewnętrzne bodźce są zwykle cichsze niż wewnętrzne.

**Kontaktu A** — `energy ≥ 4` *(DRAFT)*
- **Tytuł:** Zadzwoń do kogoś bliskiego
- **K1:** Zadzwoń do jednej bliskiej osoby — na 5–10 minut, bez konkretnego powodu.
- **K2:** Żeby po prostu usłyszeć jej głos.
- **K3:** I powiedzieć co słychać.

**Kontaktu B** — `energy ≤ 3` *(DRAFT)*
- **Tytuł:** Jedna wiadomość bez okazji
- **K1:** Napisz krótką wiadomość do jednej osoby, o której myślałeś ostatnio.
- **K2:** Nie musi być długa — jedno zdanie wystarczy.
- **K3:** Wyślij. Nie czekaj na idealny moment.

**Przeciążenia A** — `agency ≤ 2` *(DRAFT)*
- **Tytuł:** 5 oddechów — reset
- **K1:** Zamknij oczy i policz 5 oddechów — wdech na 4 sekundy, wydech na 6.
- **K2:** Nic więcej.
- **K3:** Wróć do ciała zanim wrócisz do myśli.

**Przeciążenia B** — `agency ≥ 3` *(DRAFT)*
- **Tytuł:** Wstań i zrób coś fizycznego
- **K1:** Wstań, wyjdź z pokoju i zrób jedną prostą czynność fizyczną.
- **K2:** Umyj kubek, przewietrz pokój, wejdź po schodach.
- **K3:** Przerwij spiralę ciałem, nie kolejną myślą.

**Uwaga:** Tekst podsumowania stanu (`summaryText` z `analysis-logic.md` sekcja 6) nie jest pokazany w aktualnej Figmie — nie dodawać bez osobnej decyzji.

### 5.7 Stany feedbacku na ekranie 06

Po kliknięciu jednej z opcji (Tak / Trochę / Nie):
- Kliknięty przycisk: wyróżniony (aktywny styl)
- Pozostałe przyciski: wyszarzone, nieklikalnie
- Stan nie jest zapisywany lokalnie, reset przy „Nowy check-in"

Po kliknięciu feedbacku pojawia się przycisk **„Nowy check-in"** (dynamicznie — niewidoczny przed wyborem feedbacku). Klik „Nowy check-in" → przejście do ekranu 02 i reset formularza.

### 5.8 Historia — format wpisu i stan pusty

Ekran 08 pokazuje wpisy z polami: data (relatywna: Dziś / Wczoraj / nazwa dnia), wynik, typ dnia, tytuł mikroakcji.

Pole „wynik" (widoczne w Figmie jako „3/5", „4/5") — **średnia arytmetyczna wszystkich 6 suwaków, zaokrąglona do pełnej liczby całkowitej** (mianownik: 5). ~~E3 zamknięte~~.

Liczba wyświetlanych wpisów: Figma pokazuje 3 przykłady. Docelowa maksymalna liczba wpisów w localStorage: **5**.

**Stan pusty** (pierwsze użycie lub wyczyszczona historia): wyświetla kartę z komunikatem „Brak zapisanych check-inów. Wykonaj pierwszy check-in, żeby tu zobaczyć historię." + przycisk CTA „Nowy check-in". Projekt stanu pustego dostępny w Figmie jako ramka `08b Historia — stan pusty`.

### 5.9 Ustawienia prywatności — stany domyślne

Ekran 11 zawiera 3 toggle'e. Stany widoczne w Figmie są **wartościami makiety**, nie domyślnymi wartościami aplikacji — Figma służy tu wyłącznie jako ilustracja layoutu.

Stany domyślne przy pierwszym uruchomieniu (obowiązujące):

| Toggle | Stan domyślny | Uwaga |
|--------|--------------|-------|
| Historia lokalna | ON | Podstawowa funkcjonalność — lokalny zapis |
| Analityka (GA4) | OFF | Wymaga aktywnej zgody (RODO) |
| Przypomnienie | OFF | Stage 2 — nieaktywne w MVP |

**Stan ekranu prywatności jest zachowywany** przy nawigacji wstecz — użytkownik nie traci wprowadzonych zmian.

### 5.10 Zachowanie cookies / zgody

- Przy pierwszym wejściu baner jest widoczny; CTA „Zacznij check-in" i hamburger menu są **nieaktywne (disabled)** do czasu decyzji
- „Akceptuję" → zapisuje zgody w localStorage, włącza GA4, aktywuje CTA i hamburger
- „Odrzucam" → zapisuje brak zgody w localStorage, GA4 nie inicjalizowane, aktywuje CTA i hamburger
- Baner nie pojawia się ponownie dopóki zgoda jest w localStorage
- Stan zgody: `enpsyneia_consent: { analytics: boolean, timestamp: ISO string }`

### 5.11 Sugestie dla autora — feedback oceniający (ekran 10)

Ekran 10 zawiera:
1. Pole tekstowe — wolny komentarz
2. Przyciski oceny ogólnej: **Tak / Częściowo / Nie** (ratują do pola `appRating`)
3. Pole e-mail (opcjonalne)
4. CTA „Wyślij sugestię"

**Mechanizm feedbacku oceniającego:** Kliknięcie jednego z przycisków (Tak / Częściowo / Nie) dołącza wartość do wiadomości jako informację — np. „[Ocena: Tak]" — na końcu pola komentarza. Nie nawiguje. Wysyłka następuje po kliknięciu „Wyślij sugestię". Endpoint wysyłki: do ustalenia (E11 otwarte).

**Zachowanie placeholderów:** Tekst podpowiedzi w polu komentarza („Wpisz komentarz…") oraz w polu e-mail („E-mail opcjonalnie") znika **przy fokusie** (kliknięcie/tap na pole), nie tylko przy pisaniu. Wraca po blur z pustym polem. Decyzja produktowa 2026-04-26 — czytelniejsze UX niż natywne zachowanie HTML.

### 5.12 Copyright

Każdy ekran zawiera stopkę „© Krzysztof Kowalski". W MVP to element statyczny. Docelowo (Stage 2+) będzie to link prowadzący do profilu autora na LinkedIn.

### 5.13 Menu (ekran 12) — pełna specyfikacja zgodna z Figmą

**Tytuł ekranu:** „Menu"
**Podtytuł:** „Wybierz sekcję aplikacji."

**Pozycje menu** (kolejność z Figmy, każda jako karta `bg #FFFCF7` border `#D9D0C5` `rounded-22px` `h=60px` z chevronem `›`):

| # | Tytuł | Podtytuł (11px regular #66716C) | Cel | Status |
|---|-------|-----------------------------------|------|--------|
| 1 | Logowanie | dostęp do konta i synchronizacji | ekran 07 | **Stage 2** — nieklikalny w MVP (przezroczystość) |
| 2 | Historia | ostatnie zapisane check-iny | ekran 08 / 08b | aktywny |
| 3 | O projekcie | krótki opis działania aplikacji | ekran 09 | aktywny |
| 4 | Sugestie dla autora | formularz opinii o aplikacji | ekran 10 | aktywny |
| 5 | Prywatność | ustawienia danych i przypomnień | ekran 11 | aktywny |

**Przycisk u dołu:** „Wróć" (wide 246px, outline biały z tekstem teal `#1D6B5F`) → wraca do ekranu, z którego użytkownik otworzył menu.

**Hamburger:** Otwiera menu. Widoczny na ekranach 01–11 i 14. Na ekranie 01 **nieaktywny** (disabled, linie `#D9D0C5`) do czasu decyzji cookies (D17).

---

## 6. Otwarte pytania przed implementacją

Wymagają decyzji przed rozpoczęciem kodowania.

| # | Pytanie | Kontekst | Status |
|---|---------|---------|--------|
| ~~E1~~ | ~~Czy przycisk „Nowy check-in" widoczny zawsze czy po feedbacku?~~ | Zamknięte: pojawia się dynamicznie po kliknięciu feedbacku (D19) | ✅ |
| ~~E2~~ | ~~Czy ekran 04 pojawia się w zależności od aktualnego bloku czy sumarycznie?~~ | Zamknięte: trigger gdy mniej niż 3 suwaki ruszone łącznie (D26) | ✅ |
| ~~E3~~ | ~~Co oznacza wynik „3/5"?~~ | Zamknięte: średnia 6 suwaków, zaokrąglona do pełnej liczby (D20) | ✅ |
| E4 | Jaka jest pełna kolejność pozycji menu? | Figma (screen 12) pokazuje: Logowanie / Historia / O projekcie / Sugestie / Prywatność. MVP: bez Logowania — „Nowy check-in" wchodzi na miejsce 1 (spec 5.13). Kolejność MVP do potwierdzenia przed implementacją. | otwarte |
| ~~E5~~ | ~~Czy „Nowy check-in" resetuje formularz czy nawiguje do ekranu 01?~~ | Zamknięte: przechodzi do ekranu 02 (blok 1) | ✅ |
| ~~E6~~ | ~~Jak wygląda ekran przejściowy?~~ | Zamknięte: rezygnujemy z ekranu przejściowego — bezpośrednie przejście 03→05 | ✅ |
| E7 | Jakie są treści 9 brakujących mikroakcji (tytuł + 3 kroki)? | Content blocker. Struktura formatu w sekcji 5.6. Jeden wariant (Odbudowy A) jest w Figmie. | **🔴 blokuje implementację** |
| ~~E8~~ | ~~Czy baner cookies blokuje CTA?~~ | Zamknięte: CTA i hamburger są disabled do decyzji cookies (D16/D17) | ✅ |
| ~~E9~~ | ~~Co wyświetla się na ekranie 08 gdy historia jest pusta?~~ | Zamknięte: projekt w Figmie jako ramka `08b Historia — stan pusty` (sekcja 5.8) | ✅ |
| E10 | Czy animacja przejścia między blokami jest wymagana? | Wpływ na implementację nawigacji | otwarte |
| E11 | Jak działa wysyłka sugestii na ekranie 10? | Brak endpointu. Opcje: e-mail, Formspree, własny backend. | otwarte |
| ~~E12~~ | ~~Jak wygląda ekran Regulamin + Polityka?~~ | Zamknięte: screen 14 zaktualizowany w Figmie — 4 sekcje (Regulamin + 3 × Polityka) | ✅ |

---

## 7. Elementy Stage 2

Zaprojektowane w Figmie, nie wchodzą do aktualnego MVP.

| Ekran / Element | Opis | Warunek wejścia do produktu |
|-----------------|------|-----------------------------|
| **07 Logowanie** | Logowanie przez magic link — ekran zaprojektowany w Figmie, **nie implementować w MVP** | Etap 2: >50 aktywnych użytkowników tygodniowo lub >30% powrotów |
| **13 Zakładanie konta** | Rejestracja emailem — ekran zaprojektowany w Figmie, **nie implementować w MVP** | Jw. |
| **Toggle „Przypomnienie"** (ekran 11) | Push notyfikacja raz dziennie | Etap 2 lub po weryfikacji technicznej |
| Historia cross-device | Synchronizacja między urządzeniami | Etap 2 z Supabase |

---

## 8. Poza zakresem MVP

Elementy jawnie wykluczone — nie implementować bez zmiany tego dokumentu.

| Element | Uzasadnienie |
|---------|-------------|
| Dark mode | Nie w zakresie MVP |
| Push notyfikacje | Stage 2 |
| **Streak counter** | Definitywnie wycięte — nie istnieje w Figmie ani w kodzie (D12) |
| Udostępnianie wyników | Stage 2+ |
| Wykresy i wzorce historyczne | Stage 2+ |
| Personalizacja rekomendacji | Stage 2+ |
| OAuth (Google, GitHub) | Stage 2+ |
| Widget mobilny | Poza zakresem |
| Więcej niż 5 typów dnia | Poza zakresem |
| Tekst podsumowania stanu (`summaryText`) na ekranie 05 | Bez decyzji projektowej — nie dodawać |

---

## Changelog

| Data | Zmiana |
|------|--------|
| 2026-04-25 | Wersja 1.0 — pierwsza specyfikacja uzupełniająca Figmę po audycie UX/UI |
| 2026-04-25 | Wersja 1.1 — decyzje produktowe z przeglądu audytu (D16–D26): próg 3 suwaków, cookies blokuje CTA, suwak szary tylko track, Nowy check-in dynamicznie, wynik = średnia zaokrąglona, B7 jeden ekran, C6 link LinkedIn, C5 makieta prywatności |
| 2026-04-25 | Wersja 1.2 — aktualizacja po audycie II + poprawki Figmy: etykiety suwaków zgodne z Figmą (Przeciążenie/Utknięcie — odwrócona skala), usunięto ekran przejściowy (E1/E6), dodano tabele mikroakcji (5.6), stan pusty historii (5.8), opis feedbacku oceniającego (5.11), zamknięto E2/E5/E6/E9/E12 |
| 2026-04-25 | Wersja 1.3 — sekcja 5.6 uzupełniona draftem 9 brakujących wariantów mikroakcji (źródło: analysis-logic.md); warianty jako Figma ekrany usunięte — dokumentacja zamiast ekranów; adnotacja 06 poprawiona (klon screen 06 zamiast ręcznej adnotacji); audyt III przeprowadzony — brak otwartych błędów |
| 2026-04-25 | Wersja 1.4 — audyt IV: poprawki dokumentacji po pełnym audycie Figmy: hamburger dostępny na ekranach 04 i 14 (dodane do sekcji 3); D1 uzupełnione o DM Sans Light dla stopki; D24 uzupełnione o info o komponencie „Stopka / Copyright" |
| 2026-04-25 | Wersja 1.5 — audyt V: mapa przepływu zgodna z Figmą: usunięto ekran przejściowy (E6 było zamknięte, ale linia pozostała); wyjaśniono że 04 triggeruje tylko z bloku 2, nie bloku 1; dodano link „Polityka prywatności" → 14 na ekranie 01 |
| 2026-04-26 | Wersja 1.6 — definitywne usunięcie streak counter z dokumentacji (D12 uściślone, sekcja 8 uzupełniona); ekran 12 Menu udokumentowany w pełni (sekcja 5.13) z 5 pozycjami zgodnymi z Figmą; zaktualizowana mapa nawigacji menu; dodane ekrany 08b, 12 do tabeli sekcji 2 |
| 2026-04-26 | Wersja 1.7 — dodany ekran 0 (bramka cookies) jako decyzja produktowa poza Figmą; zaktualizowane D14, D16, D17 i flow cookies; dodana notka o zachowaniu placeholderów w sekcji 5.11 (focus zamiast natywnego HTML) |
