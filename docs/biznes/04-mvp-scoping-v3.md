# 🎯 MVP Scope: Enpsyneia Check In (v3 - uproszczony)

**Data:** 2026-03-22  
**Projekt:** Enpsyneia Check In  
**Właściciel:** Krzysztof Kowalski  
**Wersja:** v3 (konta w Tier 2)

---

## ⚠️ Zmiana paradygmatu

| Element | v2 | v3 (uproszczony) |
|---------|-----|------------------|
| Konta | Tier 1 (od razu) | **Tier 2** (później) |
| Dane | Supabase DB | **localStorage** (Tier 1) |
| Auth | Magic Link | **BRAK** (Tier 1) |
| Historia | DB query | **localStorage** (Tier 1) |
| Szacowany czas | ~50h | **~20-25h** |

---

## 🎯 Target Metrics (Co walidujemy?)

| Metryka | Cel |
|---------|-----|
| Time-to-First-Value | < 2 minuty |
| First Use Completion Rate | > 70% |
| Day 7 Return Rate | > 15% |
| "Użyteczne" feedback | > 60% |

---

## ✅ Tier 1 Features (Must-Have) - 0-2 tygodnie

### Core Feature (BEZ KONTA)
- [ ] **Landing page:** Prosta strona z instrukcją (max 3 linie)
- [ ] **Formularz check-in:** 4 pytania na suwakach (zredukowane z 6)
  - Poziom energii (1-5)
  - Przeciążenie bodźcami (1-5)
  - Potrzeba ruchu vs odpocznienia (1-5)
  - Utknięcie w analizie (1-5)
- [ ] **Logika analizy:** Proste reguły if/else → typ dnia + mikroakcja
- [ ] **Typ dnia:** 5 typów (dzień działania, dzień wyciszenia, dzień odbudowy, dzień kontaktu, dzień przeciążenia)
- [ ] **Rekomendacja:** Jedna mikroakcja
- [ ] **Zapis:** localStorage (ostatni wynik)
- [ ] **Historia:** Ostatnie 5 wpisów w localStorage

### UI/UX
- [ ] **Progress bar:** "Pytanie 2/4"
- [ ] **Suwaki z etykietami:** "1=Zupełnie nie" | "5=Bardzo"
- [ ] **Wynik:** Typ dnia + mikroakcja (prosta karta)

**Total szacowany czas Tier 1: ~20-25 godzin**

---

## 📦 Tier 2 Features (Konta użytkowników) - 4-8 tygodni

Po walidacji Tier 1:

- [ ] **Supabase Auth:** Magic Link (email → link → zalogowany)
- [ ] **迁移 danych:** z localStorage do Supabase DB
- [ ] **Historia:** Trwałe przechowywanie w PostgreSQL
- [ ] **Streak counter:** "Dni z rzędu"
- [ ] **Więcej pytań:** Powrót do 6 pytań (opcjonalnie)

---

## 🚨 Tier 3 Features (Intentionally Cut - Na zawsze)

- ❌ Powiadomienia push
- ❌ Tryb ciemny
- ❌ Widget mobilny
- ❌ Share buttons
- ❌ Obserwacje wzorców
- ❌ Personalizacja mikroakcji
- ❌ OAuth (Google/GitHub)

---

## 🛠️ Tech Stack (v3 - Uproszczony)

| Warstwa | Technologia |
|---------|-------------|
| Frontend | Vanilla HTML/CSS/JS lub React |
| Dane | localStorage |
| Hosting | Vercel / Netlify (darmowe) |

---

## ⏱️ Szacowany Czas Budowy (v3)

| Etap | Czas |
|------|------|
| Landing page | 2h |
| Formularz (4 pytania) | 3h |
| Logika analizy | 4h |
| Typ dnia + mikroakcja | 3h |
| localStorage zapis/odczyt | 2h |
| Historia (5 wpisów) | 2h |
| UI/UX polish | 4h |
| **TOTAL** | **~20h** |

**20h = ok. 1-2 tygodnie pracy (2-3h/dzień)**

---

## 🔄 Flow Użytkownika (v3)

```
1. Landing Page → 10 sekund
2. Check-in (4 pytania) → 1-2 minuty  
3. Wynik (typ dnia + mikroakcja) → <5 sekund
4. Zapis do localStorage → automatycznie

Time-to-First-Value: ~2 minuty

OPCJONALNIE: Po 3-4 użyciach → prompt "Chcesz zapisać historię? Załóż konto"
```

---

## 📋 Checklist Gotowości do Startu

- [ ] Time estimate < 30h (✅ ~20h)
- [ ] 70%+ czasu na core feature (✅ ~15h / 20h = 75%)
- [ ] Plan pozyskania beta-testers
- [ ] Jednozdaniowy opis produktu
- [ ] Plan B jeśli hipoteza się nie potwierdzi

---

## ⚠️ Ograniczenia v3

| Element | Konsekwencja |
|---------|--------------|
| Brak kont | Nie można śledzić retention na wielu urządzeniach |
| localStorage | Dane giną przy czyszczeniu przeglądarki |
| Brak monetyzacji | Nadal Brand Building, nie biznes |
| 4 pytania | Mniej precyzyjne rekomendacje |

---

## 🎯 Kiedy przejść do Tier 2?

Warunki przejścia do kont użytkowników:

- [ ] > 50 aktywnych użytkowników tygodniowo
- [ ] > 30% wraca po pierwszym użyciu
- [ ] Feedback: "chcę historię na innym urządzeniu"

---

*N dokument wygenerowany w ramach workflow WF_MVP_Scoping v3*
*Wersja uproszczona - konta w Tier 2*
