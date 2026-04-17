# AGENTS.md - Rules for AI Developer Agent

## 📋 Document Overview

**Project:** Enpsyneia Check In
**Owner:** Krzysztof Kowalski
**Last Updated:** 2026-04-12
**Purpose:** Define rules and guidelines for AI Developer Agent working on this project

---

## 🎯 Project Context & Goals

### What is Enpsyneia Check In?

Enpsyneia Check In is a lightweight web application that helps users:

1. **Quick self-assessment** - Answer 6 questions about their current state
2. **Get actionable recommendations** - Receive one concrete micro-action to take immediately
3. **Build healthy habits** - Replace mindless social media scrolling with mindful check-ins

### Core Value Proposition

> "In less than 2 minutes, get one concrete action to take right now - instead of scrolling Instagram for 30 minutes."

### Key Business Documents (READ BEFORE CODING)

| Document                | Path                                                                       | Purpose                                     |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------- |
| **MVP Scope**           | [`docs/product/mvp-scope.md`](docs/product/mvp-scope.md)               | Canonical spec: Tier 1/2, features, metrics |
| **Project Description** | [`docs/context/project-vision.md`](docs/context/project-vision.md)     | Full project vision, features, and goals    |
| **ICP & Personas**      | [`docs/context/icp-persona.md`](docs/context/icp-persona.md)           | Target users, pain points, jobs-to-be-done  |
| **JTBD Analysis**       | [`docs/context/jtbd-analysis.md`](docs/context/jtbd-analysis.md)       | Jobs-to-be-done, user motivations           |
| **User Journey Map**    | [`docs/context/user-journey.md`](docs/context/user-journey.md)         | User flow, friction points, success metrics |

---

## 📌 Source of Truth & Working Rules

### Source of truth for implementation

Implementację Etapu 1 należy prowadzić wyłącznie na podstawie:

- [`docs/product/mvp-scope.md`](docs/product/mvp-scope.md) — zakres, metryki, warunki przejścia do Etapu 2
- [`docs/product/analysis-logic.md`](docs/product/analysis-logic.md) — algorytm, typy dnia, mikroakcje, teksty UI
- [`docs/product/implementation-plan.md`](docs/product/implementation-plan.md) — fazy, zakres per faza, definicje ukończenia
- `AGENTS.md` — stack, architektura, reguły kodowania

Pozostałe dokumenty (`01`, `02`, `07`, `08`, `09`, `competitor-audit.md` itd.) mają charakter strategiczny, analityczny lub historyczny. Mogą dostarczać kontekstu, ale nie są źródłem bieżących decyzji implementacyjnych. W razie sprzeczności między nimi a powyższymi czterema — obowiązują powyższe cztery.

### Working rule before coding

Przed rozpoczęciem kodowania agent ma:

1. **Przygotować plan prac** dla aktualnej fazy na podstawie `docs/product/implementation-plan.md`
2. **Nie pisać kodu** przed zatwierdzeniem planu przez właściciela projektu
3. **Zgłosić każdą sprzeczność** między dokumentami source of truth przed implementacją — nie rozstrzygać samodzielnie

---

## 🏗️ Tech Stack & Architecture

### Current Stack (MVP - Tier 1)

| Layer        | Technology               | Version   | Notes                             |
| ------------ | ------------------------ | --------- | --------------------------------- |
| **Frontend** | React                    | Latest    | Fast development, component-based |
| **Styling**  | Tailwind CSS + Shadcn UI | Latest    | Modern UI, accessible components  |
| **State**    | localStorage             | -         | Tier 1: No backend needed         |
| **Hosting**  | Vercel                   | Free Tier | CI/CD, edge deployment            |
| **Cost**     | $0/month                 | -         | Free tier sufficient for MVP      |

### Future Stack (Tier 2 - After Validation)

| Layer            | Technology               | Version   | Notes                        |
| ---------------- | ------------------------ | --------- | ---------------------------- |
| **Frontend**     | React                    | Latest    | Same as Tier 1               |
| **Styling**      | Tailwind CSS + Shadcn UI | Latest    | Same as Tier 1               |
| **Backend/Auth** | Supabase                 | Free Tier | Magic Link auth, PostgreSQL  |
| **Database**     | PostgreSQL (Supabase)    | Latest    | Relational data, RLS         |
| **Email**        | Resend                   | Free Tier | Transactional emails         |
| **Hosting**      | Vercel                   | Free Tier | Same as Tier 1               |
| **Cost**         | $0/month                 | -         | Free tier: 50k MAU, 500MB DB |

### Architecture Decision: localStorage-first

**Why localStorage for MVP?**

1. **Time-to-Market:** 1-2 weeks vs 2-3 weeks with Supabase
2. **Cost:** $0 vs potential future costs
3. **Simplicity:** No backend complexity for solo developer
4. **Requirements Fit:** "Data only in one browser" = perfect for localStorage
5. **Lean First:** Don't build infrastructure you don't need yet

**When to migrate to Supabase?**

- > 50 active users per week
- > 30% return rate after first use
- User feedback: "I want history on another device"

---

## 📊 Database Schema (Tier 2 only — nie budować w Tier 1)

> Ta sekcja dokumentuje schemat Supabase do użycia w Tier 2. W Tier 1 nie ma bazy danych.

### Tables

```sql
-- Users (managed by Supabase Auth)
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  streak_count INTEGER DEFAULT 0,
  last_check_in TIMESTAMP,
  total_social_replacements INTEGER DEFAULT 0
)

-- Check-ins
check_ins (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP,
  -- Answers (1-5 scale)
  energy_level INTEGER,
  sensory_overload INTEGER,
  movement_need INTEGER,
  social_need INTEGER,
  agency_level INTEGER,
  analysis_paralysis INTEGER,
  -- Result
  day_type TEXT,
  micro_action TEXT,
  micro_action_completed BOOLEAN DEFAULT FALSE
)

-- Daily streaks
daily_streaks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  date DATE,
  check_in_count INTEGER DEFAULT 0,
  social_media_replacements INTEGER DEFAULT 0
)
```

### Row Level Security (RLS)

```sql
-- Only owner can read their data
CREATE POLICY "Users can view own data"
ON check_ins FOR SELECT
USING (auth.uid() = user_id);

-- Only owner can insert
CREATE POLICY "Users can insert own data"
ON check_ins FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

---

## 🎨 UI/UX Guidelines

### Design Principles

1. **Speed First:** Time-to-value < 2 minutes
2. **Minimal Friction:** No unnecessary steps or screens
3. **Clear Hierarchy:** One primary action per screen
4. **Accessible:** WCAG 2.1 AA compliance
5. **Mobile-First:** 80%+ users will be on mobile

### Key UI Components

| Component          | Purpose                      | Implementation                     |
| ------------------ | ---------------------------- | ---------------------------------- |
| **Landing Page**   | Communicate value in <10 sec | Headline + 2-line value prop + CTA |
| **Check-in Form**  | Collect user state           | 6 sliders with labels              |
| **Progress Bar**   | Show completion              | "Question 2/6"                     |
| **Result Card**    | Display recommendation       | Day type + uzasadnienie + micro-action + streak |
| **Streak Counter** | Motivate return visits       | "🔥 7 days in a row!"              |

### Color Palette (Suggested)

- **Primary:** Calming blue/green (wellness vibe)
- **Accent:** Warm orange (action-oriented)
- **Neutral:** Gray scale for text/backgrounds
- **Success:** Green for streaks/completions

---

## 🔐 Authentication Rules

### Tier 1 (MVP): No Authentication

- Users can use app without account
- Data stored in localStorage only
- History limited to last 5 entries
- No cross-device sync

### Tier 2: Supabase Auth (Magic Link)

**Flow:**

1. User enters email
2. System sends Magic Link (Supabase)
3. User clicks link → automatically logged in
4. Session stored in localStorage
5. On other device: send Magic Link again

> ⚠️ **Przed implementacją Etapu 2:** model przechowywania sesji wymaga osobnego przeglądu bezpieczeństwa. `localStorage` nie może być automatycznie przyjęty jako domyślne miejsce dla tokenów auth — wymagana osobna decyzja przed wdrożeniem.

**Why Magic Link?**

- No password = less friction
- Secure (link expires in 1 hour)
- Built-in with Supabase
- Easy to implement

**Implementation:**

```javascript
// Auth with Supabase
const signInWithEmail = async (email) => {
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) throw error;
};

// Check session
const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};
```

---

## 📈 Success Metrics

### Primary Metrics (Track These)

| Metric                   | Target  | How to Measure                        |
| ------------------------ | ------- | ------------------------------------- |
| **Time-to-First-Value**  | < 2 min | Time from page load to result display |
| **First Use Completion** | > 70%   | % users who complete check-in         |
| **Day 7 Return Rate**    | > 20%   | % users returning after 7 days        |
| **Useful Feedback**      | > 60%   | % users who rate result as useful     |

### Habit Hypothesis (do weryfikacji w Tier 2)

> Mechanizm nawykowy jest hipotezą, którą testujemy po zebraniu pierwszych danych z Tier 1. Metryki poniżej są celami walidacyjnymi, nie założeniami.

| Metric                 | Target | How to Measure                                  |
| ---------------------- | ------ | ----------------------------------------------- |
| **Habit Rate**         | > 30%  | % users using app instead of social media       |
| **Streak Retention**   | > 40%  | % users with streak > 7 days                    |
| **Social Replacement** | > 40%  | Survey: "Do you use this instead of Instagram?" |

---

## 🚀 Development Workflow

### Before Starting Any Task

1. **Read relevant business docs** (see table above)
2. **Check MVP scope** ([`docs/product/mvp-scope.md`](docs/product/mvp-scope.md))
3. **Verify feature is in Tier 1** (Must-Have) or Tier 2 (Should-Have)
4. **If unsure, ask:** "Is this feature in MVP scope?"

### Code Quality Standards

#### General Rules

- **Keep it simple:** MVP = minimal complexity
- **No premature optimization:** Build for now, not for scale
- **Test critical paths:** Form submission, result generation
- **Document decisions:** Why, not just what
- **New doc only when necessary:** Create a new document only when an existing file cannot be sensibly extended

#### React Best Practices

- **Functional components only** (no class components)
- **Hooks for state management** (useState, useEffect)
- **Custom hooks for reusable logic** (useLocalStorage — Tier 1; useAuth dopiero w Tier 2)
- **Prop validation** with TypeScript or PropTypes
- **Component composition** over inheritance

#### Styling Rules

- **Tailwind CSS** for all styling (no custom CSS unless absolutely necessary)
- **Shadcn UI** for common components (Button, Card, Input)
- **Responsive design** mobile-first
- **Dark mode** not in MVP (cut feature)

#### State Management

- **Tier 1:** localStorage only
- **Tier 2:** Supabase + React Context for auth state
- **No Redux** (overkill for this project)
- **No Zustand** (localStorage is sufficient for MVP)

---

## 🎯 Feature Implementation Rules

### Tier 1 Features (MUST IMPLEMENT)

| Feature                     | Priority     | Notes                                   |
| --------------------------- | ------------ | --------------------------------------- |
| Landing page                | 🔴 Critical  | < 10 sec to understand value            |
| Check-in form (6 questions) | 🔴 Critical  | Sliders with labels                     |
| Analysis logic              | 🔴 Critical  | if/else rules → day type + micro-action |
| Result display              | 🔴 Critical  | Day type + micro-action                 |
| localStorage save           | 🔴 Critical  | Last result + history (5 entries)       |
| Streak counter              | 🔴 Critical  | localStorage-only, no account needed    |
| Progress bar                | 🟡 Important | "Question 2/6"                          |
| Mobile responsive           | 🔴 Critical  | 80%+ mobile users                       |

### Tier 2 Features (IMPLEMENT AFTER VALIDATION)

| Feature                    | Priority     | Notes                    |
| -------------------------- | ------------ | ------------------------ |
| Supabase Auth              | 🟡 Important | Magic Link flow          |
| Database storage           | 🟡 Important | PostgreSQL with RLS      |
| History view               | 🟢 Nice      | All past check-ins       |

### Tier 3 Features (NEVER IMPLEMENT IN MVP)

| Feature               | Reason                                |
| --------------------- | ------------------------------------- |
| Push notifications    | Complexity, not needed for validation |
| Dark mode             | Cut feature, adds complexity          |
| Mobile widget         | Platform-specific, not MVP            |
| Share buttons         | Not core to value prop                |
| Pattern observations  | Over-engineering for MVP              |
| Personalization       | Requires more data than MVP provides  |
| OAuth (Google/GitHub) | Magic Link is sufficient              |

---

## 🔧 Implementation Guidelines

### File Structure (Actual)

```
enpsyneia-check-in/
├── index.html                        # Entry point (Vite) — root HTML shell
├── src/
│   ├── components/
│   │   ├── Landing.jsx               # Ekran startowy z CTA i streak
│   │   ├── CheckInForm.jsx           # Formularz: 6 suwaków w 2 blokach
│   │   ├── AnalysisScreen.jsx        # Ekran przejściowy (2s)
│   │   ├── ResultScreen.jsx          # Ekran wyniku z mikroakcją i feedbackiem
│   │   ├── ProgressBar.jsx           # "Blok X z 2"
│   │   ├── ConsentBanner.jsx         # Baner zgody analytics (fixed bottom, jednorazowy)
│   │   └── ui/button.jsx             # Shadcn Button (nie edytować)
│   ├── hooks/
│   │   ├── useLocalStorage.js        # Odczyt/zapis localStorage: historia + streak
│   │   └── useConsent.js             # Stan zgody analytics (accepted/rejected/null)
│   ├── utils/
│   │   ├── analysisLogic.js          # Logika analizy — pure function
│   │   └── analysisLogic.test.js     # 16 przypadków testowych (npm test)
│   ├── lib/
│   │   ├── utils.js                  # cn() helper (Shadcn)
│   │   └── analytics.js              # GA4: initGA4() (po zgodzie) + trackEvent()
│   ├── App.jsx                       # Routing: landing → form → analysis → result
│   ├── main.jsx                      # React root
│   └── index.css                     # Tailwind + fonty
├── .env.example                      # Szablon zmiennych środowiskowych
├── package.json
└── README.md
```

### Analysis Logic (Core Business Logic)

**Questions (6 in MVP):**

1. Energy level (1-5)
2. Sensory overload (1-5)
3. Movement need (1-5)
4. Social need (1-5)
5. Agency level (1-5)
6. Analysis paralysis (1-5)

**Day Types (5 types) — triggery skrócone, specyfikacja nadrzędna w `docs/product/analysis-logic.md`:**

1. 🌟 **Dzień Działania** — `energy ≥ 4 AND agency ≥ 3 AND overload ≤ 3`
2. 🌿 **Dzień Wyciszenia** — `overload ≥ 4` (i `paralysis < 4`)
3. 💪 **Dzień Odbudowy** — fallback; lub `energy ≤ 2 AND agency ≤ 2 AND overload ≤ 3`
4. 👥 **Dzień Kontaktu** — `social ≥ 4 AND overload ≤ 3`
5. ⚡ **Dzień Przeciążenia** — `overload ≥ 4 AND paralysis ≥ 4`

> **Pełny algorytm (kolejność sprawdzania, konflikty, mikroakcje, teksty UI):** `docs/product/analysis-logic.md` — ta specyfikacja jest nadrzędna wobec skrótów powyżej. W razie sprzeczności obowiązuje `analysis-logic.md`.

**Micro-actions:** One concrete, immediate action based on day type — full texts in `docs/product/analysis-logic.md` section 5

**Function API (`analyzeCheckIn`):** Input: `{ energy, overload, movement, social, agency, paralysis }` (integers 1–5). Output: `{ dayType, summaryText, justificationText, microaction, microactionKey }`. Full spec in `docs/product/analysis-logic.md` section 9 (decision #6).

### localStorage Schema (Tier 1)

```javascript
// Check-in history (last 5 entries)
{
  "enpsyneia_history": [
    {
      "id": "uuid",
      "timestamp": "2026-04-12T10:00:00Z",
      "answers": {
        "energy": 3,
        "overload": 4,
        "movement": 2,
        "social": 3,
        "agency": 4,
        "paralysis": 5
      },
      "result": {
        "dayType": "overload",
        "microAction": "Take 10 minutes without screens"
      }
    }
  ]
}

// Streak data
{
  "enpsyneia_streak": {
    "currentStreak": 7,
    "lastCheckIn": "2026-04-12"
  }
}
```

---

## 🔒 Security Assumptions — Etap 1

Minimalne zasady bezpieczeństwa dla bieżącego etapu:

- Etap 1 nie przechowuje sekretów, haseł ani tokenów dostępowych.
- `localStorage` służy wyłącznie do danych lokalnych użytkownika, takich jak historia check-inów i streak.
- `localStorage` nie może być traktowany jako miejsce dla autoryzacji ani sesji bezpieczeństwa.
- Do analytics nie wysyłamy pełnych odpowiedzi z check-inu ani innych danych pozwalających odtworzyć stan użytkownika.
- Jedynym zewnętrznym skryptem dopuszczonym w Etapie 1 jest GA4, ładowany przez `src/lib/analytics.js`.
- Każdy nowy input tekstowy od użytkownika wymaga osobnego przeglądu pod kątem XSS.
- Nie dodajemy `dangerouslySetInnerHTML` bez osobnej decyzji bezpieczeństwowej.
- Etap 2 wymaga osobnego przeglądu bezpieczeństwa przed wdrożeniem auth i trwałych danych użytkownika.

---

## ⚠️ Critical Rules

### DO's

✅ **Always read business docs** before implementing features
✅ **Keep MVP simple** - no over-engineering
✅ **Test on mobile** - 80%+ users are mobile
✅ **Use localStorage** for Tier 1 (no backend)
✅ **Follow Shadcn UI** patterns for components
✅ **Document decisions** in code comments
✅ **Ask if unsure** about scope or priority

### DON'Ts

❌ **Don't add features** not in MVP scope
❌ **Don't use Redux** or complex state management
❌ **Don't build backend** until Tier 2 validation
❌ **Don't optimize prematurely** - build for now
❌ **Don't skip mobile testing**
❌ **Don't ignore accessibility** (WCAG 2.1 AA)
❌ **Don't hardcode** values that might change

---

## 🔄 Workflow for AI Agent

### When Starting a New Task

1. **Understand the task** - What needs to be built?
2. **Check business context** - Read relevant docs
3. **Verify scope** - Is this Tier 1, 2, or 3?
4. **Plan implementation** - What files/components needed?
5. **Implement** - Follow coding standards
6. **Test** - Verify on mobile and desktop
7. **Document** - Update relevant docs if needed

### When Fixing Bugs

1. **Reproduce the bug** - Understand the issue
2. **Check business logic** - Is this expected behavior?
3. **Fix minimally** - Don't refactor unrelated code
4. **Test the fix** - Verify it works
5. **Update docs** - If behavior changed

### When Asked About Architecture

1. **Reference business docs** - Point to relevant files
2. **Explain rationale** - Why was this decision made?
3. **Suggest alternatives** - If applicable
4. **Consider scope** - Is this MVP or future?

---

## 📚 Quick Reference

### Key Files to Read First

1. [`docs/product/mvp-scope.md`](docs/product/mvp-scope.md) - What to build (canonical)
2. [`docs/context/project-vision.md`](docs/context/project-vision.md) - Project vision
3. [`docs/context/jtbd-analysis.md`](docs/context/jtbd-analysis.md) - Why we build it
4. [`docs/context/user-journey.md`](docs/context/user-journey.md) - How users experience it

### Common Questions

**Q: Should I add a backend?**
A: Not in Tier 1. Use localStorage. Add Supabase only after validation.

**Q: How many questions in the check-in?**
A: 6 questions in MVP. See `docs/product/mvp-scope.md` for the exact list.

**Q: What about user accounts?**
A: Tier 1 = no accounts. Tier 2 = Supabase Auth with Magic Link.

**Q: Should I add dark mode?**
A: No. It's a cut feature (Tier 3). Focus on core functionality.

**Q: How do I handle streaks?**
A: Tier 1 = localStorage streak (`enpsyneia_streak`). Tier 2 = daily_streaks table in Supabase.

---

## 🎯 Success Criteria for AI Agent

The AI Agent is successful when:

1. **Implements features** that match business requirements
2. **Stays within scope** - no over-engineering
3. **Writes clean code** - maintainable and testable
4. **Considers mobile** - responsive design
5. **Documents decisions** - clear reasoning
6. **Asks when unsure** - doesn't assume

---

## 📞 Contact & Escalation

**Project Owner:** Krzysztof Kowalski
**When to escalate:**

- Feature not in MVP scope
- Technical decision with long-term impact
- Security concerns
- Performance issues

**When to proceed:**

- Feature is in Tier 1 scope
- Bug fix in existing code
- UI/UX improvement within guidelines
- Documentation updates

---

## System ról

Praca może być prowadzona w trybie spec-driven AI development z rolami. Routing i lista ról: [`agents/ROUTING.md`](./agents/ROUTING.md)

---

## Context7 MCP — pomocnicza dokumentacja bibliotek

Projekt ma skonfigurowany Context7 MCP (`.mcp.json`). Służy wyłącznie jako pomocnicze źródło aktualnej dokumentacji zewnętrznych bibliotek.

**Kiedy używać:**
- React, Vite, Tailwind, Shadcn — API, opcje konfiguracji, wzorce użycia
- Vercel — deployment options, environment variables
- Supabase — przygotowanie do Etapu 2
- GA4 / gtag.js — parametry eventów

**Kiedy nie używać:**
- logika produktu, typy dnia, mikroakcje — źródło prawdy: `docs/product/`
- decyzje architektoniczne — źródło prawdy: `AGENTS.md` i `docs/architecture/`
- bieżący kod repo — czytaj pliki bezpośrednio

**Zasady bezpieczeństwa:**
- Context7 to pomocnicze źródło, nie nadrzędne — lokalny kod i specyfikacje mają zawsze pierwszeństwo
- nie dodawaj do `.mcp.json` innych serwerów MCP bez osobnej decyzji
- korzystaj tylko z zaufanych, znanych serwerów MCP

---

## Dependency Hygiene

- `package-lock.json` jest źródłem prawdy dla zależności npm i musi być śledzony w repo.
- Po każdej zmianie zależności uruchom: `npm audit`, `npm test`, `npm run build`.
- Alerty bezpieczeństwa zależności są obsługiwane przez GitHub Dependabot (konfiguracja: `.github/dependabot.yml`).
- CI (`npm audit --audit-level=high`) blokuje tylko podatności o poziomie high/critical.

---

_This document defines the rules for AI Developer Agent working on Enpsyneia Check In project. Implementation specs: `docs/product/`. Context and research: `docs/context/`._
