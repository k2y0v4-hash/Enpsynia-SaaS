# MVP Scope — Enpsyneia Check In

**Wersja:** 1.0 (kanoniczna)
**Data:** 2026-04-12
**Status:** Obowiązujący

---

## Cel MVP

Zwalidować, czy użytkownicy uznają check-in za użyteczny i wracają po pierwszym użyciu.

**Definicja sukcesu:**
Użytkownik otwiera aplikację, wypełnia 6 pytań i w mniej niż 2 minuty otrzymuje typ dnia oraz jedną konkretną mikroakcję.

---

## Etap 1 — localStorage

### Co wchodzi

| Element | Opis |
|---------|------|
| Landing page | Nagłówek + 2-zdaniowa wartość + jeden CTA |
| Formularz check-in | 6 pytań na suwakach (skala 1–5) |
| Logika analizy | Reguły if/else → typ dnia + mikroakcja |
| 5 typów dnia | Działania, Wyciszenia, Odbudowy, Kontaktu, Przeciążenia |
| Wynik | Typ dnia + jedna mikroakcja (czytelne, bez dashboardu) |
| Zapis historii | localStorage, ostatnie 5 wyników |
| Progress bar | "Blok 1 z 2" |
| Streak counter | Licznik dni z rzędu — localStorage, bez konta |
| Responsywność | Mobile-first |

> **Ograniczenie streak countera na Safari iOS:** Safari stosuje Intelligent Tracking Prevention (ITP), które czyści localStorage po 7 dniach braku aktywności. Użytkownicy na iOS Safari mogą stracić licznik po tygodniu nieużywania aplikacji. Streak jest elementem wspierającym doświadczenie — nie jest kryterium sukcesu Etapu 1 i nie blokuje wdrożenia. Rozwiązanie (konto użytkownika + backend) wchodzi w Etap 2.

### Tech stack

React + Tailwind CSS + Shadcn UI + Vercel + localStorage.
Brak backendu. Brak konta użytkownika. Koszt: $0/mies.

### Szacowany czas

~20–25 godzin pracy.

---

## Etap 2 — Supabase

Etap 2 startuje gdy spełniony jest co najmniej jeden z warunków:
- >50 aktywnych użytkowników tygodniowo
- >30% użytkowników wraca po pierwszym użyciu
- Pojawia się feedback: "chcę historię na innym urządzeniu"

### Co wchodzi

| Element | Opis |
|---------|------|
| Supabase Auth | Magic Link — bez hasła |
| Baza danych | PostgreSQL + RLS, zapis check-inów |
| Historia pełna | Wszystkie check-iny przypisane do konta |
| Cross-device sync | Historia dostępna na każdym urządzeniu |
| Feedback loop | Zapis odpowiedzi "Czy mikroakcja pomogła?" do bazy (Supabase) — odrębny od Etap 1 GA4 feedback event; w Etapie 2 dane są trwałe i przypisane do konta |
| Email (Resend) | Magic Link delivery |

### Tech stack

Jak Etap 1 + Supabase (Auth + PostgreSQL) + Resend.

---

## 6 pytań formularza

Kolejność i brzmienie obowiązujące:

| # | Pytanie | Skala |
|---|---------|-------|
| 1 | Poziom energii | 1 = wyczerpany → 5 = pełen energii |
| 2 | Przeciążenie bodźcami | 1 = spokojnie → 5 = przebodźcowany |
| 3 | Potrzeba ruchu vs odpoczynku | 1 = potrzebuję odpocząć → 5 = potrzebuję ruchu |
| 4 | Potrzeba samotności vs kontaktu | 1 = chcę być sam → 5 = chcę być z ludźmi |
| 5 | Poczucie sprawczości | 1 = nic nie mogę → 5 = mogę wszystko |
| 6 | Utknięcie w analizie | 1 = działam → 5 = myślę bez końca |

Suwaki domyślnie ustawione na środku (3). Etykiety widoczne przy obu końcach skali.

---

## Poza zakresem MVP (oba etapy)

Poniższe elementy nie wchodzą do MVP. Decyzja nie podlega negocjacji bez zmiany tego dokumentu.

- Powiadomienia push
- Dark mode
- Share buttons / udostępnianie wyniku — planowane po Etapie 2, nie wchodzą ani do Etapu 1, ani do Etapu 2
- Obserwacje wzorców i wykresy
- Personalizacja rekomendacji
- OAuth (Google, GitHub)
- Więcej niż 5 typów dnia
- Widget mobilny

---

## Metryki sukcesu Etapu 1

| Metryka | Cel |
|---------|-----|
| Landing → start formularza | > 60% użytkowników klika CTA |
| Time-to-first-value | < 2 minuty od otwarcia do wyniku |
| First use completion rate | > 70% użytkowników kończy formularz |
| Day 7 return rate | > 20% użytkowników wraca po 7 dniach |
| Useful rating | > 60% użytkowników którzy widzą ekran wyniku ocenia go jako użyteczny (mianownik: `result_shown` events w GA4) |

Metryki mierzone przez Google Analytics 4 + przycisk "Czy to pomogło?" na ekranie wyniku (Faza 5).

> **Uwaga do Day 7 Return Rate:** GA4 nie rozróżnia niezalogowanych użytkowników niezawodnie na iOS Safari — mechanizm ITP może czyścić identyfikatory, zaniżając wynik. Metrykę należy traktować jako sygnał orientacyjny, a nie precyzyjny pomiar indywidualnych powrotów. Przy pierwszych 20–30 użytkownikach warto uzupełnić ją ręczną ankietą (1 pytanie: "czy wróciłeś po pierwszym użyciu?").

---

## Ten dokument zastępuje wcześniejsze wersje scopingu

Niniejszy plik zastępuje:
- `docs/archive/04-mvp-scoping-v2.md`
- `docs/archive/04-mvp-scoping-v3.md`

Tamte pliki są archiwalne. W razie sprzeczności między nimi a tym dokumentem — obowiązuje ten.
