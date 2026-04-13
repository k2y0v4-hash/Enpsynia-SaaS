# WF_Competitor_Audit: Enpsyneia Check In

**Data:** 2026-03-22  
**Projekt:** Enpsyneia Check In  
**Właściciel:** Krzysztof Kowalski  
**Etap produktu:** MVP (w fazie walidacji)

---

> **Nota archiwalna:** Sugestie stacku technicznego i modelu MVP w tym dokumencie (sekcje "Recommendations", "Priority 2", "Tech suggestions", "MVP Scope") mają charakter porównawczy i historyczny. **Obowiązujący stack projektu** (React + Vite + Tailwind + Shadcn + Vercel) oraz zakres MVP są zdefiniowane w `AGENTS.md` i `docs/biznes/04-mvp-scope.md`. W razie sprzeczności — tamte dokumenty są nadrzędne.

---

## Summary

### Problem
Krótka hipoteza rynkowa: Osoby przebodźcowane potrzebują szybkiego (<2 min) sposobu na rozpoznanie swoich potrzeb i otrzymanie jednej konkretnej mikroakcji do wykonania.

### Target ICP
Dorośli 25-45 lat, pracownicy biurowi i zdalni, którzy czują przeciążenie informacyjne i mają trudność z rozpoznaniem czego potrzebują w danym momencie (ruchu, odpoczynku, ciszy, kontaktu).

### Top Insight
Rynek wellness jest nasycony aplikacjami darmowymi (Daylio 5M+ pobrań, Headspace/Calm freemium). Enpsyneia nie oferuje unikalnej funkcji - jest to "jedna funkcja" w istniejących ekosystemach. Bez kont użytkowników (brak Supabase/Firebase) monetyzacja jest niemożliwa.

---

## Competitor List

### Primary competitors

| Nazwa | URL | Kategoria | Pozycja |
|-------|-----|-----------|---------|
| Daylio | https://daylio.net | SaaS (Mobile App) | Leader - 5M+ pobrań |
| Moodfit | https://moodfit.org | SaaS (Mobile App) | Mid-tier |
| Headspace | https://headspace.com | SaaS (Meditation) | Giant - $3B valuation |
| Calm | https://calm.com | SaaS (Meditation) | Giant - $2B valuation |
| Sanvello | https://sanvello.com | SaaS (Mental Health) | Mid-tier |
| Wysa | https://wysa.com | SaaS (AI Mental Health) | Emerging |

### Category
- **Główne:** SaaS / Mobile Apps (Wellness/Mental Health)
- **Secondary:** Open-source (Brak godnych uwagi open-source w tej niszy)
- **Trzeciorzędne:** Agency (terapeuci, coachowie)

---

## Per-Competitor Analysis

### 1. Daylio

**Name & URL:** Daylio — https://daylio.net

**Primary proposition:** Mikro-dziennik nastroju (mood tracking) z automatycznymi mikroakcjami. Użytkownik wybiera nastrój (5 emoji), dodaje tag (praca, zdrowie, relacje), otrzymuje spersonalizowaną radę.

**Price & monetization:**
- **Model:** Freemium
- **Darmowy:** Pełny mood tracking + micro-actions
- **Premium:** $4.99/miesiąc - zaawansowane statystyki, brak reklam, export danych
- **Trial:** Brak trial (freemium od początku)

**Time-to-value:**
- ⏱️ **< 30 sekund** do pierwszej wartości (wybierz emoji + tag = получишь radę)
- Natychmiastowa gratyfikacja

**Onboarding & UX:**
- Rejestracja: Opcjonalna (można używać bez konta)
- First success: Natychmiast po pierwszym wejściu
- Friction: Minimalny - tylko wybór nastroju
- UI: Bardzo prosty, piękne kolory, mikrointerakcje

**Automatyzacja vs Manual Work:**
- Automatyczne: Rady generowane algorytmicznie na podstawie tagów
- Manualne: Brak (wszystko flow jest zautomatyzowane)
- Powiadomienia: Automatyczne przypomnienia (opcjonalne)

**Integrations & Ecosystem:**
- Brak głównych integracji (Zapier, Google, Slack)
- Export: CSV, PDF
- Apple Health: Nie
- Widgety: Brak

**Support & SLA:**
- Email support (odpowiedź ~24-48h)
- FAQ/Help Center: Podstawowe
- Community: Nie

**Trust & Compliance:**
- Polityka prywatności: Standardowa ( zbiera dane)
- Serwery: Nie sprecyzowane (app mobile)
- GDPR: Prawdopodobnie zgodna

**Growth Channels (visible):**
- ASO (App Store Optimization) - główny kanał
- Social media: Aktywny Instagram, TikTok
- Partnerships: Preinstalacje na urządzeniach
- Featured: Wielokrotnie featured w App Store

**Observed Weaknesses:**
1. ⚠️ Micro-actions są generyczne ("have a cup of tea", "take a deep breath")
2. ⚠️ Brak głębszej analizy wzorców w wersji darmowej
3. ⚠️ Języki: Ograniczona liczba (EN, DE, ES, FR, PT, PL, CZ)
4. ⚠️ Brak webhook/API - nie można zintegrować z innymi narzędziami
5. ⚠️ Monetyzacja słaba - mało kto płaci za premium

---

### 2. Moodfit

**Name & URL:** Moodfit — https://moodfit.org

**Primary proposition:** Śledzenie nastroju z elementami terapii poznawczo-behawioralnej (CBT). Oferuje ćwiczenia, narzędzia i statystyki dla osób chcących pracować nad zdrowiem psychicznym.

**Price & monetization:**
- **Model:** Freemium
- **Darmowy:** Podstawowe śledzenie + ograniczone ćwiczenia CBT
- **Premium:** $9.99/miesiąc - pełne ćwiczenia CBT, zaawansowane statystyki
- **Trial:** 7 dni premium za darmo

**Time-to-value:**
- ⏱️ **1-2 minuty** do pierwszej wartości (wybierz nastrój + dodaj notatkę)
- Zajmuje więcej czasu niż Daylio

**Onboarding & UX:**
- Rejestracja: Wymagana (email)
- First success: Po pierwszym wpisie (1-2 min)
- Friction: Średni - wymaga założenia konta
- UI: Czysty, profesjonalny, ale mniej "fun"

**Automatyzacja vs Manual Work:**
- Automatyczne: Przypomnienia (konfigurowalne)
- Manualne: Wpisowanie notatek wymaga czasu
- Ćwiczenia CBT: Interaktywne, wymagają zaangażowania

**Integrations & Ecosystem:**
- Brak głównych integracji
- Export: Nie widoczne
- Apple Health: Nie

**Support & SLA:**
- Email support
- Help Center: Rozbudowane (artykuły o CBT)

**Trust & Compliance:**
- Polityka prywatności: Zgodna z HIPAA (częściowo)
- Bezpieczeństwo: Podstawowe

**Growth Channels (visible):**
- SEO: Silne (keywords: "mood tracking", "CBT app")
- Content marketing: Blog o zdrowiu psychicznym
- Partnerships: Brak widocznych

**Observed Weaknesses:**
1. ⚠️ Zbyt "kliniczny" - nie dla casual users
2. ⚠️ Time-to-value dłuższy niż konkurencja
3. ⚠️ Wymaga konta = bariera wejścia
4. ⚠️ Brak innowacji w micro-actions
5. ⚠️ Słabszy marketing niż giganci

---

### 3. Headspace

**Name & URL:** Headspace — https://headspace.com

**Primary proposition:** Platforma medytacji i mindfulness z rozbudowanym contentem (medytacje, kursy, sleep sounds). Oferuje również mood tracking jako część ekosystemu.

**Price & monetization:**
- **Model:** Freemium (bardzo ograniczony)
- **Darmowy:** Medytacje " Basics" (10 medytacji), 2 kursy
- **Premium:** $69.99/rok lub $12.99/miesiąc
- **Family:** $99.99/rok (do 6 osób)
- **Trial:** 7 dni premium za darmo

**Time-to-value:**
- ⏱️ **5-10 minut** do pierwszej wartości (pierwsza medytacja)
- Wymaga czasu na "naukę" medytacji

**Onboarding & UX:**
- Rejestracja: Wymagana
- First success: Po pierwszej medytacji (~3-10 min)
- Friction: Średni - wymaga konta + czasu na medytację
- UI: Bardzo dopracowany, animacje, przyjemne doświadczenie

**Automatyzacja vs Manual Work:**
- Automatyczne: Sleep sounds, ambient
- Manualne: Medytacje wymagają czasu i uwagi
- Powiadomienia: Konfigurowalne

**Integrations & Ecosystem:**
- Apple Health: Tak (eksport danych)
- Google Fit: Tak
- Wearables: Apple Watch, Garmin
- Spotify: Tak (współpraca)

**Support & SLA:**
- 24/7 chat support (dla premium)
- Help Center: Rozbudowane
- Community: Aktywne (forums, events)

**Trust & Compliance:**
- Certyfikaty: B Corp, multiple awards
- GDPR: Zgodna
- Serwery: AWS (bezpieczne)

**Growth Channels (visible):**
- Influencer marketing: Bardzo silny
- Brand partnerships: Netflix, Nike, others
- Content marketing: Blog, podcast
- ASO: Dominujący

**Observed Weaknesses:**
1. ⚠️ Płatna medytacja vs darmowe YouTube - trudno uzasadnić cenę
2. ⚠️ Mood tracking jest marginalny (nie core feature)
3. ⚠️ Nie oferuje "micro-actions" w stylu Enpsyneia
4. ⚠️ Subscription fatigue - ludzie mają już Calm, Netflix, etc.
5. ⚠️ Zbyt "mainstream" - nie dla osób szukających prostoty

---

### 4. Calm

**Name & URL:** Calm — https://calm.com

**Primary proposition:** Platforma do medytacji, snu i relaksu. Oferuje sleep stories, medytacje prowadzone, muzykę do koncentracji i mass media content (celebrity partnerships).

**Price & monetization:**
- **Model:** Freemium
- **Darmowy:** 7 medytacji + 1 sleep story + reklamy
- **Premium:** $69.99/rok lub $14.99/miesiąc
- **Family:** $89.99/rok
- **Trial:** 7 dni premium za darmo

**Time-to-value:**
- ⏱️ **3-5 minut** do pierwszej wartości (pierwsza medytacja)
- Szybciej niż Headspace, ale wymaga czasu

**Onboarding & UX:**
- Rejestracja: Wymagana
- First success: Po pierwszej medytacji
- Friction: Średni
- UI: Bardzo dopracowany, "luxury" feel

**Automatyzacja vs Manual Work:**
- Automatyczne: Sleep sounds (loop)
- Manualne: Wymaga czasu na medytację

**Integrations & Ecosystem:**
- Apple Health: Tak
- Wearables: Apple Watch, Fitbit, Garmin
- Amazon Alexa: Tak

**Support & SLA:**
- Email support
- Help Center: Rozbudowane

**Trust & Compliance:**
- GDPR: Zgodna
- Certyfikaty: Multiple

**Growth Channels (visible):**
- Celebrity partnerships: Matthew McConaughey, Idris Elba
- Super Bowl ads
- Strong social media presence

**Observed Weaknesses:**
1. ⚠️ Podobne problemy jak Headspace - płatna vs darmowe alternatywy
2. ⚠️ Mood tracking jest marginalny
3. ⚠️ Brak micro-actions
4. ⚠️ Skupienie na śnie nie na codziennej regulacji
5. ⚠️ Subscription fatigue

---

### 5. Sanvello

**Name & URL:** Sanvello — https://sanvello.com

**Primary proposition:** Apka łącząca śledzenie nastroju, techniki CBT i wsparcie społecznościowe. Skierowana do osób z łagodnymi problemami zdrowia psychicznego.

**Price & monetization:**
- **Model:** Freemium
- **Darmowy:** Śledzenie nastroju, podstawowe ćwiczenia CBT
- **Premium:** $8.99/miesiąc lub $59.99/rok
- **Trial:** 7 dni premium za darmo

**Time-to-value:**
- ⏱️ **1-2 minuty** do pierwszej wartości

**Onboarding & UX:**
- Rejestracja: Wymagana
- UI: Przeciętny, mniej dopracowany niż giganci

**Automatyzacja vs Manual Work:**
- Automatyczne: Przypomnienia
- Community: Forum dostępne dla wszystkich

**Integrations & Ecosystem:**
- Apple Health: Nie widoczne
- Brak integracji

**Support & SLA:**
- Email support
- Community support (peer-to-peer)

**Observed Weaknesses:**
1. ⚠️ Mniej dopracowany UI niż konkurencja
2. ⚠️ Brak widocznych integracji
3. ⚠️ Micro-actions są ograniczone
4. ⚠️ Słabszy marketing
5. ⚠️ Community może generować toksyczność

---

### 6. Wysa

**Name & URL:** Wysa — https://wysa.com

**Primary proposition:** AI-powered chatbot do wsparcia zdrowia psychicznego. Łączy rozmowy z AI z ćwiczeniami i technikami terapii behawioralnej.

**Price & monetization:**
- **Model:** Freemium
- **Darmowy:** Nieograniczony chatbot + ograniczone ćwiczenia
- **Premium:** $9.99/miesiąc lub $79.99/rok
- **B2B:** Wersja dla pracodawców i ubezpieczycieli
- **Trial:** 7 dni premium

**Time-to-value:**
- ⏱️ **< 1 minuta** - chatbot odpowiada natychmiast

**Onboarding & UX:**
- Rejestracja: Wymagana
- First success: Natychmiast po pierwszej rozmowie z chatbotem
- UI: Chat-based, intymny

**Automatyzacja vs Manual Work:**
- **W pełni zautomatyzowany:** AI chatbot odpowiada 24/7
- Brak limitów rozmów w darmowej wersji

**Integrations & Ecosystem:**
- Apple Watch: Tak
- Wearables: Ograniczone
- B2B: Silne (employers, insurers)

**Support & SLA:**
- AI: Natychmiastowe odpowiedzi
- Human support: Dostępne dla premium

**Trust & Compliance:**
- HIPAA compliant
- GDPR: Zgodna
- Regulowane (regulowany jako medical device w niektórych jurysdykcjach)

**Growth Channels (visible):**
- B2B2C (przez pracodawców)
- Clinical trials
- Partnerships z NHS (UK)

**Observed Weaknesses:**
1. ⚠️ AI chatbot może dawać złe rady (ryzyko)
2. ⚠️ Nie oferuje micro-actions w stylu Enpsyneia
3. ⚠️ Zbyt "terapeutyczny" - nie dla casual users
4. ⚠️ Monetyzacja słaba (ludzie nie chcą płacić za "bot")
5. ⚠️ Dependence na AI - bez ludzkiego touch

---

## Competitive Matrix (szybkie porównanie)

| Kryterium | Daylio | Moodfit | Headspace | Calm | Sanvello | Wysa | **Enpsyneia (proponowane)** |
|-----------|--------|---------|-----------|------|----------|------|-------------------------------|
| **Price** | Low | Med | High | High | Med | Med | **Free (localStorage)** |
| **Time-to-Value** | <30s | 1-2min | 5-10min | 3-5min | 1-2min | <1min | **<30s** |
| **Automation** | High | Med | Med | High | Med | **Very High** | **High** |
| **Integrations** | None | None | Many | Many | None | Few | **None (MVP)** |
| **Support** | Low | Med | High | High | Med | Med | **None** |
| **GTM Reach** | High | Med | Very High | Very High | Low | Med | **Very Low** |
| **Micro-actions** | ✅ Basic | ❌ | ❌ | ❌ | ✅ Basic | ❌ | **✅ Core Feature** |
| **Need-based** | ❌ Mood | ❌ Mood | ❌ Mood | ❌ Sleep | ❌ Mood | ❌ CBT | **✅ Needs (tension)** |
| **No Login** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | **✅** |

---

## Gaps & Opportunities

### Immediate gaps (quick wins)

| # | Luka | Opis | Enpsyneia advantage |
|---|------|------|---------------------|
| 1 | **Szybkość** | Wszystkie aplikacje wymagają >= 1 minuty | ✅ <30 sekund (formularz 6 pytań) |
| 2 | **No-login** | Wszystkie wymagają konta (poza Daylio częściowo) | ✅ localStorage = zero bariery |
| 3 | **Need-based vs Mood** | Konkurencja śledzi nastrój, nie potrzeby | ✅ Unikalne podejście do napięć między potrzebami |

### Differentiation angles

| Angle | Opis | Risk |
|-------|------|------|
| **Speed** | Najszybszy check-in na rynku | Niska wartość - konkurencja może dodać "quick mode" |
| **No-login** | Zero bariery wejścia | Niemożliwa monetyzacja (bez kont) |
| **Needs-based** | Unikalne podejście (napięcia między potrzebami) | ✅ Potencjalnie unikalne - trudne do skopiowania |
| **Privacy-first** | Dane w przeglądarce, nie na serwerze | ⚠️ Trudno monetyzować |
| **Niche: Overwhelmed** | Skupienie na "przebodźcowanych" | ⚠️ Trudny ICP do dotarcia |

### Monetization openings

| Model | Opportunity | Risk |
|-------|-------------|------|
| **Freemium + Accounts** | Przejście na Supabase/Firebase + konta | Wymaga refakturowania MVP |
| **B2B Employee Wellness** | Sprzedaż firmom jako benefit pracowniczy | Wymaga Enterprise features (SSO, SLA) |
| **Donations** | Open-source model z donate button | Mało prawdopodobne |
| **Affiliate** | Polecenie produktów wellness | Niska wartość |
| **Ads** | Reklamy w darmowej wersji | ⚠️ Zniszczy UX |

---

## Risks [RISKS]

### Market risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Niska palącość problemu** | 🔴 Wysoka | Wellness to "vitamin", nie "painkiller" |
| **Brak willingness-to-pay** | 🔴 Wysoka | Rynek darmowy - Daylio, Calm, Headspace uczyli użytkowników, że wellness = free |
| **Paradoks grupy docelowej** | 🔴 Wysoka | "Przebodźcowani" instalują MNIEJ aplikacji, nie więcej |

### Execution risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Wymagana duża ręczna obsługa** | 🟢 Niska | Prosty produkt = niski support |
| **Brak automatyzacji** | 🟢 Niska | W pełni zautomatyzowany (formuła → rekomendacja) |
| **Retention** | 🟡 Średnia | Po tygodniu użytkownik zna wszystkie typy dnia |

### Operational costs

| Cost | Estimation |
|------|------------|
| Hosting | $5-10/miesiąc (static site) |
| Domain | $10-15/rok |
| Support | Minimalny (brak kont = brak supportu) |

### Competitor response risk

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Łatwe skopiowanie funkcji** | 🔴 Wysoka | Daylio może dodać "needs-based" w tydzień |
| **Feature parity** | 🟡 Średnia | Trzeba budować moat (dane, community) |

### Regulatory risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Dane wrażliwe** | 🟢 Niska | localStorage = dane użytkownika, nie firmy |
| **GDPR/CCPA** | 🟢 Niska | Brak zbierania danych = zgodność |

---

## Recommendations (dla Solo-Deva)

### Priority 1 (validate)
**Landing page + pricing test:**
- Stwórz prosty landing page z live demo formularza
- Dodaj CTA: "Get early access" lub "Notify me"
- Testuj CTR i pre-signups
- **Metric:** >30% conversion na demo, >50 emaili w 7 dni
- **Kanały:** Twitter/X threads, LinkedIn, wellness subreddits

### Priority 2 (build MVP)
**1 core flow z automatyzacją:**
- Formularz 6 pytań (suwaki 1-5)
- Algorytm → typ dnia + mikroakcja
- localStorage dla zapisu historii
- **NIE dodawaj:** kont, integracji, powiadomień
- **Tech:** Plain HTML/CSS/JS, hosting na GitHub Pages/Netlify

### Priority 3 (distribution)
**3-kanalowy test:**
1. Cold outreach: 20 leadów na LinkedIn (pracownicy korpo, 25-45 lat)
2. Targetowane ads: $50 budżet na Instagram (wellness, mindfulness)
3. Reddit: Posty w r/wellness, r/MentalHealth, r/productivity
4. **Metric:** 20 pre-signups w 7 dni

### Tech suggestions
- **Prototyp:** No-code (Carrd + Typeform) - szybka walidacja
- **MVP:** Plain HTML/CSS/JS (github pages)
- **Onboarding:** Automatyczny email sequence (Mailchimp free)
- **Analytics:** Plausible (privacy-first) lub Google Analytics

---

## MVP Scope (konkretne funkcje)

### Essential (MVP)
| Funkcja | Opis | Priority |
|---------|------|----------|
| Check-in form | 6 pytań z suwakami 1-5 | ✅ Must have |
| Algorytm rekomendacji | Reguły if/else → typ dnia + mikroakcja | ✅ Must have |
| Historia wpisów | Zapis w localStorage, widok historii | ✅ Must have |
| Feedback loop | "Czy pomogło?" po mikroakcji | ✅ Must have |
| Podstawowa analityka | Liczba wpisów, najczęstszy typ dnia | ✅ Should have |

### Nice-to-have (v2)
| Funkcja | Opis | Priority |
|---------|------|----------|
| Typy dnia | Więcej niż 5 (aktualnie: action, quiet, recovery, contact, overload) | Could have |
| Personalizacja mikroakcji | Użytkownik wybiera typy aktywności | Could have |
| Tryb ciemny | Dark mode | Could have |
| Export danych | CSV/PDF | Could have |

### Don't build yet
| Funkcja | Reason |
|---------|--------|
| Konta użytkowników | Wymaga backendu, monetyzacji (v2+) |
| Integracje (Zapier, Google) | Niepotrzebne w MVP |
| SSO (Enterprise) | Za wcześnie |
| Powiadomienia | Wymaga kont, złożoności |
| AI-generated actions | Over-engineering, proste reguły wystarczą |

---

## Metrics to Track

### Acquisition
| Metric | Target |
|--------|--------|
| Landing page CTR | >30% |
| Signups/day (pre-launch) | >5 |
| Total pre-signups | >50 w 30 dni |

### Activation
| Metric | Target |
|--------|--------|
| Time-to-first-value | <30 sekund |
| % who complete first check-in | >70% |
| % who rate recommendation helpful | >50% |

### Revenue
| Metric | Target |
|--------|--------|
| Conversion to paid | N/A (MVP free) |
| ARPU | $0 (MVP) |

### Efficiency
| Metric | Target |
|--------|--------|
| Support tickets per 100 users | <1 |
| Manual hours per customer | 0 (zautomatyzowane) |

---

## Template: Quick Audit Row

### Daylio
- **Name:** Daylio — https://daylio.net
- **Proposition:** "Mikro-dziennik nastroju z automatycznymi radami"
- **Price:** Free + $4.99/mies premium
- **Onboarding:** <30 sekund, nie wymaga konta
- **Weaknesses:** Generyczne rady, brak głębszej analizy, micro-actions powierzchowne
- **Opportunity:** Enpsyneia może oferować bardziej "needs-based" podejście zamiast mood-based

### Headspace
- **Name:** Headspace — https://headspace.com
- **Proposition:** "Medytacja i mindfulness z rozbudowanym contentem"
- **Price:** Free + $69.99/rok premium
- **Onboarding:** 5-10 minut, wymaga konta
- **Weaknesses:** Zbyt drogi, mood tracking marginalny, nie oferuje micro-actions
- **Opportunity:** Enpsyneia może być "quick fix" dla osób, które nie mają czasu na medytację

---

## Checklista audytu (what to capture quickly)

- [x] URL i charakterystyka konkurencji
- [x] Cennik i model biznesowy
- [x] Onboarding i first success flow
- [x] Lista integracji (lub ich brak)
- [x] Widoczne kanały marketingowe
- [x] Warunki supportu
- [x] Wymierne słabe punkty (konkretne obserwacje)

---

## Next Steps

### Sugerowany kolejny workflow
1. **WF_ICP_Persona** (ponownie) — po competitor audit zawęź ICP do konkretnej niszy:
   - Studenci w sesji (naturalne triggery, deadline = motywacja)
   - Osoby z ADHD (potrzeba zewnętrznego bodźca do działania)
   - Pracownicy korpo (employee wellness benefit)

2. **WF_Monetization_Strategy** — jeśli ICP zostanie zawężony:
   - Model freemium z kontami (Supabase/Firebase)
   - B2B employee wellness
   - Jednorazowa płatność ($2.99) - "Enpsyneia Pro"

### Szybki eksperyment
- **Landing page na Carrd** ($19/rok) z embedowanym Typeform jako "demo"
- **Budżet:** $0 (Carrd + Typeform free tier)
- **Cel:** 20 pre-signup emaili w 7 dni
- **Kanały:** 1 post na Twitter/X, 1 na LinkedIn, 1 na Reddit

---

## Podsumowanie

| Element | Enpsyneia vs Konkurencja |
|---------|--------------------------|
| **Szybkość** | ✅ Najszybszy (<30s) |
| **No-login** | ✅ Unikalny (Daylio częściowo) |
| **Needs-based** | ✅ Unikalny (napięcia między potrzebami) |
| **Monetyzacja** | ❌ Brak (bez kont) |
| **GTM** | ❌ Brak widocznego kanału |
| **Moat** | ❌ Zero (łatwy do skopiowania) |

**Werdykt:** Enpsyneia ma unikalne podejście (needs-based, szybkość, no-login), ale bez kont użytkowników monetyzacja jest niemożliwa. Rekomendacja: Testuj z MVP, zbieraj dane, a potem decyduj o pivocie (konta lub B2B) lub kontynuuj jako projekt portfolio.

---

*Audyt przeprowadzony w ramach workflow WF_Competitor_Audit*
