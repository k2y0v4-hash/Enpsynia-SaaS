# WF_Resource_Analysis - Enpsyneia Check In

**Data:** 2026-03-22  
**Projekt:** Enpsyneia Check In  
**Właściciel:** Krzysztof Kowalski  
**Etap:** MVP  

---

## 1. Preflight (Wejściowe Założenia)

| Parametr | Wartość |
|----------|---------|
| **Krótki opis (1-liner)** | Webowa aplikacja do codziennej samoobserwacji i wyboru mikroakcji na podstawie 6 pytań |
| **Stage** | MVP |
| **Horyzont planowania** | 90 dni |
| **Główny cel audytu** | Oszacować minimalny budżet MVP, zidentyfikować krytyczne integracje |

---

## 2. Audyt Czasu (Time Audit)

### Podział na Kategorie (osobo-dni, 1 dzień = 6-8h)

| Kategoria | Minimalne (MVP) | Optymalne (PMF) | Bufor 25% |
|-----------|-----------------|-----------------|-----------|
| **Core Development** | | | |
| - Setup React + Vercel | 0.5 d | 0.5 d | +0.1 d |
| - Landing page | 0.5 d | 0.5 d | +0.1 d |
| - Formularz check-in (6 pytań) | 0.5 d | 0.75 d | +0.2 d |
| - Logika analizy (reguły if/else) | 0.75 d | 1 d | +0.2 d |
| - Typ dnia + mikroakcja | 0.5 d | 0.75 d | +0.2 d |
| - Supabase setup | 0.5 d | 0.5 d | +0.1 d |
| - Auth implementation | 1 d | 1.5 d | +0.3 d |
| - Integracja frontend-backend | 0.5 d | 0.75 d | +0.2 d |
| - localStorage fallback | 0.25 d | 0.25 d | +0.1 d |
| **Core Dev subtotal** | **5 d** | **6.5 d** | **+1.5 d** |
| **Design & UX** | | | |
| - UI components (Tailwind/Shadcn) | 0.5 d | 0.75 d | +0.2 d |
| - Responsive design | 0.25 d | 0.5 d | +0.1 d |
| - Animacje micro-interactions | 0.25 d | 0.5 d | +0.1 d |
| **Design subtotal** | **1 d** | **1.75 d** | **+0.4 d** |
| **QA & Testing** | | | |
| - Testy manualne | 0.5 d | 0.75 d | +0.2 d |
| - Bug fixes | 0.5 d | 1 d | +0.3 d |
| **QA subtotal** | **1 d** | **1.75 d** | **+0.5 d** |
| **DevOps / Infra** | | | |
| - CI/CD setup | 0.25 d | 0.25 d | +0.1 d |
| - Monitoring (opcjonalnie) | 0.25 d | 0.5 d | +0.1 d |
| **DevOps subtotal** | **0.5 d** | **0.75 d** | **+0.2 d** |
| **Growth & Ops** | | | |
| - Landing page copy | 0.25 d | 0.25 d | +0.1 d |
| - SEO basics | 0.25 d | 0.5 d | +0.1 d |
| **Growth subtotal** | **0.5 d** | **0.75 d** | **+0.2 d** |
| **TOTAL MVP** | **8 d** | **11.5 d** | **+2.8 d** |

### Podsumowanie Czasu

| Metryka | Wartość |
|---------|---------|
| Minimalny czas MVP | 8 osobo-dni (~2 tygodnie przy 4h/dzień) |
| Optymalny czas MVP | 11.5 osobo-dni (~3 tygodnie przy 4h/dzień) |
| Z buforem 25% | ~14 osobo-dni |

---

## 3. Audyt Budżetu (Budget Audit)

### Koszty Miesięczne

| Usługa | Plan | Koszt | Uzasadnienie |
|--------|------|-------|--------------|
| **Supabase** | Free Tier | $0 | 50k MAU, 500MB DB, 1GB Storage |
| **Vercel** | Free Tier | $0 | Hosting frontend, CI/CD |
| **Domena** | .com/.pl | $1.50/mies | Opcjonalnie |
| **Resend** (e-mail) | Free Tier | $0 | 3000 e-maili/mies |
| **Analytics** | Plausible/Mixpanel | $0 | lub GA4 (free) |
| **Monitoring** | Sentry | $0 | Free tier 5k errors/mies |
| **SUMA miesięczna** | | **$0-1.50** | |

### Koszty Jednorazowe

| Pozycja | Koszt | Uzasadnienie |
|---------|-------|--------------|
| Ikona aplikacji (opcjonalnie) | $0 | Canva/Figma free |
| Licencja stock photos | $0 | Pexels/Unsplash free |
| Konsultacje prawne | $0 | Nie potrzebne na MVP |
| **SUMA jednorazowa** | **$0** | |

### Koszty Pracy (Alternatywne)

| Rola | Stawka/h | Dni | Koszt |
|------|----------|-----|-------|
| Solo Dev (Ty) | $0 | 14 dni | $0 |
| Freelancer Dev (alternatywa) | $50-100/h | 14 dni × 6h = 84h | $4,200-8,400 |
| Freelancer Designer | $40-80/h | 1.5 dnia × 6h = 9h | $360-720 |

### Budżet 3-miesięczny vs 12-miesięczny

| Okres | Minimalny | Rozszerzony |
|-------|-----------|-------------|
| **3 miesiące** | $0-5 | $50-100 (domeny, ewentualne upgrade'y) |
| **12 miesięcy** | $18 (domena) | $200-500 (płatne narzędzia marketingowe) |

---

## 4. Integracje Zewnętrzne (External Integrations)

### Lista Integracji

| Integracja | Krytyczność | Trudność | Koszt | Czas | Ryzyka |
|------------|-------------|----------|-------|------|--------|
| **Supabase Auth** | 🔴 KRYTYCZNA | Średnia | $0 | 1.5 d | Rate limits na free tier |
| **Supabase Database** | 🔴 KRYTYCZNA | Niska | $0 | 0.5 d | Database design |
| **Vercel Hosting** | 🔴 KRYTYCZNA | Niska | $0 | 0.25 d | Build limits |
| **Resend (e-mail)** | 🟡 OPCJONALNA | Niska | $0 | 0.5 d | E-mail deliverability |
| **Google Analytics** | 🟢 NICE-TO-HAVE | Niska | $0 | 0.25 d | Privacy compliance |
| **Sentry (errors)** | 🟢 NICE-TO-HAVE | Niska | $0 | 0.25 d | - |
| **Stripe Payments** | ❌ BRAK (MVP) | Wysoka | $0+ | 2 d+ | Wymaga konta bankowego |

### Szczegóły Krytycznych Integracji

**Supabase Auth:**
- Scope: Rejestracja e-mail, Magic Link, Password Reset
- Koszty: $0 (Free Tier - nieograniczone)
- Czas: 1.5 dnia implementacji
- Ryzyka: Brak (free tier wystarczający)

**Supabase Database:**
- Schema: users, check_ins, micro_actions, feedback
- Koszty: $0 (500MB wystarcza)
- Czas: 0.5 dnia
- Ryzyka: RLS (Row Level Security) - wymaga konfiguracji

---

## 5. Macierz Priorytetów (Prioritization Matrix)

| Funkcja/Integracja | Wartość Biznesowa (1-5) | Trudność (1-5) | Wynik | Priorytet |
|-------------------|-------------------------|----------------|-------|-----------|
| Check-in form (6 pytań) | 5 | 2 | 10 | 🔴 MVP |
| Logika analizy → typ dnia | 5 | 2 | 10 | 🔴 MVP |
| Mikroakcja rekomendacja | 5 | 2 | 10 | 🔴 MVP |
| Supabase Auth | 5 | 3 | 15 | 🔴 MVP |
| Supabase Database | 5 | 2 | 10 | 🔴 MVP |
| Historia wpisów | 4 | 3 | 12 | 🟡 PO MVP |
| Feedback loop (czy pomogło) | 3 | 2 | 6 | 🟡 PO MVP |
| Responsive mobile | 3 | 2 | 6 | 🟡 PO MVP |
| Dark mode | 2 | 2 | 4 | 🟢 NICE |
| Wykresy historii | 2 | 4 | 8 | 🟢 CUT |
| Płatności Stripe | 1 | 5 | 5 | ❌ CUT (MVP) |

### Podział MVP vs. Po Uruchomieniu

**MVP (8 osobo-dni):**
- [x] Check-in form
- [x] Logika analizy
- [x] Mikroakcje
- [x] Supabase Auth
- [x] Supabase Database
- [x] Landing page

**Po MVP (faza 2):**
- [ ] Historia wpisów
- [ ] Feedback loop
- [ ] Responsive mobile
- [ ] Proste obserwacje wzorców

---

## 6. Estymacje i Alokacja Zasobów

### Alokacja Ról

| Rola | FTE | Osobo-dni | Zadania |
|------|-----|-----------|---------|
| Full-stack Dev (Ty) | 0.5 FTE | 14 dni | Wszystko |

### Harmonogram MVP (30 dni)

| Dzień | Zadanie | Status |
|-------|---------|--------|
| 1-2 | Setup React + Vercel + Supabase | |
| 3-4 | Auth implementation | |
| 5-6 | Check-in form + logika | |
| 7-8 | Typ dnia + mikroakcje | |
| 9-10 | UI/UX polish | |
| 11-12 | QA + bug fixes | |
| 13-14 | Launch + monitoring | |

### Bufor na Nieprzewidziane

| Kategoria | Bufor |
|-----------|-------|
| Integracje | +25% |
| Bug fixes | +15% |
| Design changes | +20% |

---

## 7. Ryzyka i Mitigacje

| ID | Ryzyko | Wpływ | Prawdopodobieństwo | Plan Mitigacji |
|----|--------|-------|-------------------|----------------|
| R1 | Supabase rate limits | Średnie | Niskie | Plan upgrade na Pro ($25/mies) |
| R2 | Utrata danych użytkownika | Wysokie | Średnie | Backup strategy, export danych |
| R3 | Problemy z e-mail deliverability | Średnie | Średnie | Użyć Resend z weryfikacją DKIM |
| R4 | Krzywa uczenia Supabase | Średnie | Średnie | Dokumentacja + kurs Prima |
| R5 | Brak czasu (1 dev) | Wysokie | Wysokie | Priorytetyzacja, cut features |

### Alternatywy / Workarounds

| Krytyczny Punkt | Backup |
|-----------------|--------|
| Supabase down | localStorage fallback |
| E-mail nie działa | Weryfikacja przez social login (Google) |
| Brak płatności | MVP bez monetyzacji, validacja PMF |

---

## 8. Plan Finansowy Krótkoterminowy

### Runway (Ile miesięcy działania)

| Scenariusz | Burn Rate | Runway |
|------------|-----------|--------|
| Minimalny (tylko domena) | $1.50/mies | ∞ (przy założeniu $0 przychodu) |
| Z płatnymi narzędziami | $25/mies | 12 miesięcy = $300 budżetu |

### Break-even Target

⚠️ **UWAGA:** Ten projekt NIE MA monetyzacji w MVP (brak Stripe).

| Metryka | Wartość | Uzasadnienie |
|---------|---------|--------------|
| Koszt miesięczny | $0-1.50 | Free tier wystarcza |
| Break-even | N/A | Nie monetyzujesz w MVP |
| Cel walidacji | 100 użytkowników | Time-to-value < 2 min |

---

## 9. Checklista Wdrożeniowa (MVP-Ready)

### Krytyczne (Must Have)

- [ ] Supabase project utworzony
- [ ] Auth flow działa (rejestracja + login)
- [ ] Check-in form z 6 pytaniami
- [ ] Logika analizy → typ dnia + mikroakcja
- [ ] Zapis do bazy danych
- [ ] Landing page z CTA

### Monitoring

- [ ] Uptime monitoring (UptimeRobot - free)
- [ ] Error reporting (Sentry - free)
- [ ] Analytics podstawowy (GA4 lub Plausible)

### Operacyjne

- [ ] Backup database (Supabase automated)
- [ ] Dokumentacja setupu
- [ ] Contact/support e-mail

---

## 10. Podsumowanie i Rekomendacje

### Kluczowe Wnioski

| Aspekt | Ocena |
|--------|-------|
| **Budżet MVP** | $0 (Free tier wystarcza) |
| **Czas MVP** | 8-14 osobo-dni |
| **Krytyczne integracje** | Supabase Auth + Database |
| **Ryzyko** | Średnie (1 dev, learning curve) |

### Rekomendacje

1. ✅ **Idź w Supabase** - Free tier wystarcza dla MVP
2. ✅ **Zacznij od Tier 1** (bez historii, bez feedback loop)
3. ✅ **Użyj Shadcn UI** - szybszy development
4. ⚠️ **Nie planuj monetyzacji** w MVP - brak Stripe
5. ⚠️ **Miej backup localStorage** - jako fallback

### Następne Kroki

1. ✅ Zatwierdź ten audyt
2. ✅ Utwórz Supabase project
3. ✅ Setup React + Vercel
4. ✅ Zacznij implementację Auth
5. ✅ Zbuduj MVP w 2-3 tygodnie

---

*Audyt wygenerowany w ramach workflow WF_Resource_Analysis*
