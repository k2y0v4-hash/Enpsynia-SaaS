# 🎯 MVP Scope: Enpsyneia Check In

**Data:** 2026-03-15  
**Projekt:** Enpsyneia Check In  
**Właściciel:** Krzysztof Kowalski  

---

## ⚠️ Kontekst (z Kill-The-Idea)

Projekt przeszedł przez `WF_Kill_The_Idea` z następującymi uwagami:
- ❌ Brak monetyzacji (localStorage bez kont)
- ❌ Słaba dystrybucja (wellness to trudny rynek)
- ❌ Zero moat
- ⚠️ Krytyka: to "tylko jedna funkcja" w istniejących aplikacjach

**Decyzja użytkownika:** Kontynuować mimo krytyki.

---

## 📊 Analiza Funkcji (Feature Execution Order)

### Funkcje zidentyfikowane z dokumentacji:

| Funkcja | P1: Niezbędna do Wartości #1? | P2: <4h? | P3: Onboarding critical? | P4: Walidacja bez budowy? | Wynik |
|---------|-------------------------------|----------|--------------------------|---------------------------|-------|
| Formularz check-in (suwaki 1-5) | ✅ TAK | ✅ TAK | ✅ TAK | ❌ NIE | **TIER 1** |
| Logika analizy odpowiedzi (reguły) | ✅ TAK | ✅ TAK | ✅ TAK | ❌ NIE | **TIER 1** |
| Typ dnia (podsumowanie) | ✅ TAK | ✅ TAK | ❌ NIE | ❌ NIE | **TIER 1** |
| Rekomendacja mikroakcji | ✅ TAK | ✅ TAK | ✅ TAK | ❌ NIE | **TIER 1** |
| Zapisywanie wpisów (localStorage) | ✅ TAK | ✅ TAK | ❌ NIE | ❌ NIE | **TIER 1** |
| Historia wyników (lista) | ⚠️ SHOULD | ✅ TAK | ❌ NIE | ❌ NIE | **TIER 2** |
| Ocena rekomendacji (helpfulness) | ⚠️ SHOULD | ✅ TAK | ❌ NIE | ❌ NIE | **TIER 2** |
| Dodatkowa wskazówka/ostrzeżenie | ❌ CUT | - | ❌ NIE | ❌ NIE | **TIER 3** |
| Wykres historii | ❌ CUT | ❌ NIE | ❌ NIE | ✅ TAK (mockup) | **CUT** |
| Więcej typów dnia | ❌ CUT | ❌ NIE | ❌ NIE | ✅ TAK | **CUT** |
| Personalizacja mikroakcji | ❌ CUT | ❌ NIE | ❌ NIE | ❌ NIE | **CUT** |
| Tryb ciemny | ❌ CUT | ✅ TAK | ❌ NIE | ❌ NIE | **CUT** |
| Wersja mobilna | ❌ CUT | ❌ NIE | ❌ NIE | ❌ NIE | **CUT** |
| System obserwacji wzorców | ❌ CUT | ❌ NIE | ❌ NIE | ❌ NIE | **CUT** |

---

## 🎯 Target Metrics (Co chcesz walidować?)

⚠️ **PROBLEM:** Bez kont użytkowników i płatności, te metryki nie mają sensu biznesowego:
- [ ] Czy 10 użytkowników zapłaci $29/miesiąc? → **NIE VALIDUJESZ** (brak płatności)
- [ ] Czy time-to-value wynosi <5 minut? → ✅ Można walidować
- [ ] Czy churn to <10% miesięcznie? → ✅ Można walidować (ale bez kont to ślizganie się)

**Rekomendacja:** Waliduj czas do first-value i retencję, ale nie rób się na monetyzację.

---

## 🛤️ Core Loop (User Journey w MVP)

```
1. Otwarcie strony → Landing page z instrukcją → 30 sekund
2. Wypełnienie formularza (6 pytań na suwakach) → 1-2 minuty
3. Wyświetlenie wyniku (typ dnia + mikroakcja) → <5 sekund
4. Opcjonalnie: ocena rekomendacji → 10 sekund
5. Zapis do localStorage → automatycznie

Time-to-First-Value: ~2-3 minuty
```

---

## ✅ Tier 1 Features (Must-Have) - 0-4 tygodnie

- [ ] **Onboarding:** Prosta strona startowa z instrukcją (1 minuta)
- [ ] **Formularz check-in:** 6 pytań na suwakach (energia, przeciążenie, ruch/odpoczynek, samotność/kontakt, sprawczość, utknięcie)
- [ ] **Logika analizy:** Proste reguły if/else → typ dnia + mikroakcja
- [ ] **Typ dnia:** 5 typów (dzień działania, dzień wyciszenia, dzień odbudowy, dzień kontaktu, dzień przeciążenia)
- [ ] **Rekomendacja:** Jedna mikroakcja (np. "10 min spaceru bez telefonu")
- [ ] **Zapis:** localStorage (history, last entry, feedback)
- [ ] **Historia:** Lista ostatnich 10 wpisów (prosta, bez wykresów)

**Total szacowany czas: 20-30 godzin**

---

## 📦 Tier 2 Features (Should-Have) - 4-8 tygodni

Po zebraniu feedbacku od użytkowników:
- [ ] Feedback loop: "Czy rekomendacja pomogła?" → zapis do localStorage
- [ ] Proste obserwacje: "Zauważyłem, że często masz dzień przeciążenia"
- [ ] Więcej mikroakcji: Rozszerzenie bazy rekomendacji
- [ ] Responsive design: Poprawa na mobile (nie native app)

---

## 🚨 Tier 3 Features (Intentionally Cut)

- ❌ Konta użytkowników (brak backendu = brak monetyzacji)
- ❌ Płatności/Stripe (nie ma gdzie podpiąć)
- ❌ Tryb ciemny (nice-to-have, nie blockujący)
- ❌ Wersja mobilna (web wystarczy na MVP)
- ❌ Wykresy historii (za wcześnie na analytics)
- ❌ Personalizacja mikroakcji (wymaga danych = wymaga kont)
- ❌ Powiadomienia/push (brak backendu)
- ❌ Community/social features (brak backendu)
- ❌ OAuth/Google Login (bez sensu bez konta)
- ❌ Export danych (PDF/CSV) - nie ma gdzie eksportować

---

## 💰 Brakujące Elementy Krytyczne (dla biznesu)

| Element | Status | Co jest potrzebne |
|---------|--------|-------------------|
| Konta użytkowników | ❌ BRAK | Firebase lub Supabase |
| Backend | ❌ BRAK | Node.js/Next.js API |
| Baza danych | ❌ BRAK | PostgreSQL lub Firestore |
| Płatności | ❌ BRAK | Stripe Checkout |
| Auth | ❌ BRAK | NextAuth lub Firebase Auth |

**⚠️ Bez tych elementów projekt to "hobby project" - nie biznes.**

---

## 🛠️ Tech Stack (Solo-Dev Optimized dla obecnej wersji)

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| Frontend | Vanilla HTML/CSS/JS | Prosty, szybki start |
| Dane | localStorage | Brak backendu |
| Hosting | Vercel / Netlify | Darmowy tier |
| Formularze | Plain HTML forms | Brak frameworka potrzebnego |
| CSS | Tailwind CDN lub plain CSS | Prosty styling |

**Ale警告:** To NIE jest stack do monetyzacji. Do monetyzacji potrzeba Supabase + Next.js.

---

## ⏱️ Szacowany Czas Budowy

| Etap | Czas | Status |
|------|------|--------|
| Setup projektu (HTML/CSS/JS) | 2h | |
| Landing page | 3h | |
| Formularz check-in (6 pytań) | 4h | |
| Logika analizy (reguły if/else) | 5h | |
| Typ dnia + mikroakcja | 4h | |
| Zapis do localStorage | 3h | |
| Historia wyników | 4h | |
| UI/UX polish | 5h | |
| **TOTAL** | **~30h** | |

**Uwaga:** 30h = ok. 2 tygodnie pracy (2-3h/dzień)

---

## 📋 Następne Kroki

1. **Zatwierdź zakres MVP** - Czy zgadzasz się z tym podziałem?
2. **Decyduj o backendzie** - Czy dodajesz Supabase/Firebase dla kont i płatności?
3. **Start budowy** - przejdź do trybu Code jeśli chcesz implementować

---

## 🎓 Nota dla Solo-Deva

To MVP **NIE pozwala na monetyzację**. Możesz:
- ✅ Pokazać w portfolio
- ✅ Zebrać feedback na UX
- ✅ Sprawdzić time-to-value (<5 min)
- ❌ Sprzedać subskrypcję (brak kont)
- ❌ Budować biznes (zero moat + localStorage)

Jeśli chcesz **biznesu** → musisz wrócić do etapu fundamentów (konta + backend).

---

*Dokument wygenerowany w ramach workflow WF_MVP_Scoping*