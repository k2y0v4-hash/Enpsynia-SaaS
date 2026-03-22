# 🎯 MVP Scope: Enpsyneia Check In (v2 - z kontami)

**Data:** 2026-03-22  
**Projekt:** Enpsyneia Check In  
**Właściciel:** Krzysztof Kowalski  
**Wersja:** v2 (z Supabase i kontami użytkowników)

---

## ⚠️ Kontekst (z WF_Kill_The_Idea)

Projekt przeszedł przez `WF_Kill_The_Idea` z następującymi uwagami:

| Kryterium | Ocena | Uwaga |
|-----------|-------|-------|
| Distribution | ⚠️ Yellow | Content marketing wymaga czasu |
| Feature Not Product | 🔴 Red | "Feature, not product" - jedna funkcja w innych apkach |
| Support Trap | 🟢 Green | Prosty produkt, niskie ryzyko |
| Nice-to-Have | 🔴 Red | "Nie wiem czego potrzebuję" to nie palący ból |
| Zero Moat | 🔴 Red | Każdy może skopiować |

**Decyzja użytkownika:** Kontynuować jako projekt Brand Building (budowanie marki).

**Konsekwencja dla MVP:** 
- Nie walidujemy monetyzacji (brak płatności)
- Walidujemy: engagement, retention, time-to-value, habit formation

---

## 🎯 Target Metrics (Co chcesz walidować?)

| Metryka | Cel | Uwagi |
|---------|-----|-------|
| Time-to-First-Value | < 2 minuty | Od wejścia do otrzymania mikroakcji |
| Day 7 Return Rate | > 20% | % użytkowników wracających po tygodniu |
| Day 30 Return Rate | > 10% | Długoterminowa retencja |
| Sign-up Completion Rate | > 60% | % użytkowników kończących rejestrację |
| Habit Rate | > 20% | % użytkowników raportujących "używam zamiast social media" |

**NOTA:** Bez monetyzacji nie walidujemy conversion-to-paid.

---

## 🛤️ Core Loop (User Journey w MVP)

```

1. Landing Page → użytkownik rozumie w kilka sekund, do czego służy aplikacja
2. Start check inu bez konta → brak bariery wejścia przed pierwszą wartością
3. First Check-in (6 pytań na suwakach) → 1-2 minuty
4. Wyświetlenie wyniku → krótkie rozpoznanie stanu i jedna mikroakcja
5. Opcjonalny zapis wyniku → użytkownik może zachować wynik
6. Sugestia założenia konta → dla historii, streaków i dalszego korzystania
7. Opcjonalny Sign-up (Magic Link) → szybka rejestracja po doświadczeniu wartości
8. Zapis do Supabase → po założeniu konta

Time-to-First-Value: ~1-2 minuty bez konieczności rejestracji
```

---

## ✅ Tier 1 Features (Must-Have) - 0-4 tygodnie

### Onboarding & Auth
- [ ] **Landing page:** Prosta strona z instrukcją (max 3 linie tekstu)
- [ ] **Supabase Auth:** Magic Link (email → link → zalogowany)
- [ ] **Session management:** Obsługa sesji w localStorage

### Core Feature (Check-in)
- [ ] **Formularz check-in:** 6 pytań na suwakach (1-5)
  - Poziom energii
  - Przeciążenie bodźcami
  - Potrzeba ruchu vs odpocznienia
  - Potrzeba samotności vs kontaktu
  - Poczucie sprawczości
  - Utknięcie w analizie
- [ ] **Logika analizy:** Proste reguły if/else → typ dnia + mikroakcja
- [ ] **Typ dnia:** 5 typów (dzień działania, dzień wyciszenia, dzień odbudowy, dzień kontaktu, dzień przeciążenia)
- [ ] **Rekomendacja:** Jedna mikroakcja (np. "10 min spaceru bez telefonu")

### Dane
- [ ] **Zapis check-in:** PostgreSQL (Supabase)
- [ ] **Historia:** Lista ostatnich 10 wpisów (prosta, bez wykresów)

### UI/UX
- [ ] **Progress bar:** "Pytanie 3/6"
- [ ] **Suwaki z etykietami:** "1=Zupełnie nie" | "5=Bardzo"
- [ ] **Podpowiedzi pod pytaniami:** Krótkie wyjaśnienia

**Total szacowany czas Tier 1: 40-50 godzin**

---

## 📦 Tier 2 Features (Should-Have) - 4-8 tygodni

Po zebraniu feedbacku od użytkowników:

- [ ] **Streak counter:** "Dni z rzędu" - widoczny na dashboard
- [ ] **Feedback loop:** "Czy rekomendacja pomogła?" → zapis do DB
- [ ] **Proste obserwacje:** "Zauważyłem, że często masz dzień przeciążenia"
- [ ] **Responsive design:** Poprawa na mobile (nie native app)
- [ ] **Więcej mikroakcji:** Rozszerzenie bazy rekomendacji

**Total szacowany czas Tier 2: 20-30 godzin**

---

## 🚨 Tier 3 Features (Intentionally Cut)

- ❌ Powiadomienia push (wymaga większej złożoności)
- ❌ "Zastąpione nawyki" counter (za wcześnie)
- ❌ Share buttons (nice-to-have)
- ❌ Tryb ciemny (może być w v2)
- ❌ Widget mobilny (wymaga native app)
- ❌ Obserwacje wzorców (wymaga danych)
- ❌ Personalizacja mikroakcji (wymaga danych)
- ❌ Więcej typów dnia (5 wystarczy)
- ❌ OAuth (Google/GitHub) - Magic Link wystarcza

---

## 🛠️ Tech Stack (Solo-Dev Optimized)

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| Frontend | React + Vercel | Szybki dev, darmowy hosting |
| Styling | Tailwind CSS + Shadcn UI | Nowoczesny UI, gotowe komponenty |
| Backend | Supabase | Free Tier wystarcza |
| Auth | Supabase Auth (Magic Link) | Bez hasła, niski friction |
| Database | PostgreSQL (Supabase) | Relacyjne dane, RLS |
| Email | Resend (opcjonalnie) | Transakcyjne e-maile |

---

## ⏱️ Szacowany Czas Budowy

| Etap | Czas | Status |
|------|------|--------|
| Setup (React + Supabase) | 4h | |
| Landing page | 3h | |
| Auth flow (Magic Link) | 4h | |
| Formularz check-in (6 pytań) | 5h | |
| Logika analizy (reguły if/else) | 6h | |
| Typ dnia + mikroakcja | 4h | |
| Supabase DB + RLS | 4h | |
| Historia wyników | 4h | |
| UI/UX polish | 8h | |
| Testing + bug fixes | 8h | |
| **TOTAL Tier 1** | **~50h** | |

**Uwaga:** 50h = ok. 4 tygodnie pracy (2-3h/dzień) lub 1-2 tygodnie przy pełnym etacie

---

## 📋 Checklist Gotowości do Startu

- [ ] Całkowity time estimate nie przekracza 200 godzin (✅ 50h Tier 1)
- [ ] 60%+ czasu pójdzie na core feature, nie infrastructure (✅ ~35h / 50h = 70%)
- [ ] Masz plan, jak pozyskać 10-20 beta-testers bez budżetu (✅ sieć kontaktowa, social media)
- [ ] Umiesz wyjaśnić, co robi Twój produkt w 1 zdaniu (✅ "Aplikacja, która w 30 sekund mówi ci, co teraz potrzebujesz zrobić")
- [ ] Wiesz, za co ludzie będą płacić ($X/miesiąc) → **NIE DOTYCZY** (Brand Building)
- [ ] Masz Plan B, jeśli hipoteza się nie potwierdzi (✅ pivot lub porzucenie projektu)

---

## 🎯 Core Feature Definition (The Law of MVP)

> **MVP to nie "wersja 0.1" Twojego marzenia. To najmniejsza możliwa instancja, która pozwala Ci odpowiedzieć na jedno konkretne pytanie biznesowe: "Czy ludzie uznają to za wartościowe i będą wracać?"**

### Wartość #1 (dla użytkownika):
**"W mniej niż 2 minuty od wejścia otrzymam konkretną mikroakcję, która pasuje do mojego obecnego stanu i od razu będę wiedział, co mam zrobić."**

### Co jest niezbędne do dostarczenia Wartości #1:
1. Formularz (6 pytań na suwakach)
2. Logika analizy (reguły)
3. Typ dnia + mikroakcja
4. Wyświetlenie wyniku

**WSZYSTKO inne jest POST-MVP.**

---

## 🚩 Red Lines (Co NIE MOŻE być cięte)

Mimo brutalnego cięcia, TE elementy MUSZĄ być w MVP:

1. ✅ **Działający core feature** – Check-in + rekomendacja muszą działać
2. ✅ **Prawidłowa walidacja danych** – Suwaki 1-5, input sanitization
3. ✅ **Bezpieczeństwo danych** – HTTPS, Supabase RLS, hashed sesje
4. ✅ **Działająca autentykacja** – Magic Link musi działać
5. ✅ **Darmowy hosting** – Vercel + Supabase Free Tier

---

## 🔄 Co zostało Zmienione vs v1

| Element | v1 (localStorage) | v2 (Supabase) |
|---------|-------------------|----------------|
| Konta | ❌ BRAK | ✅ Supabase Auth |
| Dane | localStorage | PostgreSQL |
| Historia | localStorage | DB query |
| Streak | ❌ BRAK | ✅ Tier 2 |
| Monetyzacja | ❌ | ❌ (Brand Building) |
| Szacowany czas | ~30h | ~50h |

---

## 📝 Następne Kroki

1. **Zatwierdź zakres MVP** - Czy zgadzasz się z tym podziałem?
2. **Start budowy Tier 1** - przejdź do trybu Code
3. **Testuj z 5-10 użytkownikami** - walidacja time-to-value
4. **Iteruj na podstawie feedbacku** - dodaj Tier 2 jeśli retention jest dobre

---

## ⚠️ Ostrzeżenie (Realność Projektu)

**Ten projekt NIE pozwala na monetyzację bezpośrednią.** Możesz:

- ✅ Budować rozpoznawalność marki (Brand Building)
- ✅ Walidować engagement i retention
- ✅ Zebrać feedback na UX
- ✅ Sprawdzić time-to-value (<2 min)
- ❌ Sprzedać subskrypcję (brak modelu)
- ❌ Zbudować biznes SaaS (zero moat)

Jeśli chcesz **biznesu** → rozważ pivot na Anti-Distraction Tool (z blockerem social media) lub inny model z monetyzacją.

---

*N dokument wygenerowany w ramach workflow WF_MVP_Scoping v2*
*Wersja z kontami użytkowników (Supabase)*
