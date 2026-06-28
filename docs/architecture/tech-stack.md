# Tech Stack — Enpsyneia Check In

**Dotyczy:** Etap 1 (MVP) + Etap 2 (konta, model hybrydowy — ADR 003)

---

## Stack

| Warstwa | Technologia | Uwagi |
|---------|-------------|-------|
| Framework | React 19 + Vite | Functional components, hooks |
| Stylowanie | Tailwind CSS v4 + Shadcn UI (Base UI) | Mobile-first |
| Stan | localStorage (anon) + Supabase (zalogowany) | Model hybrydowy — ADR 003 |
| Auth + DB | Supabase Auth (e-mail+hasło) + PostgreSQL + RLS | Konto opcjonalne |
| Hosting | Vercel | Auto-deploy z main |
| Analityka | Google Analytics 4 | Ładowana po zgodzie użytkownika (baner przy pierwszej wizycie) |

Model hybrydowy: anonimowy użytkownik → localStorage; zalogowany → Supabase. Konto nie jest wymagane.
Koszt: $0/mies (Supabase Free Tier).

---

## Struktura src/

```
src/
├── App.jsx                    # Routing: landing → form → analysis → result
├── main.jsx                   # React root
├── index.css                  # Tailwind + fonty
├── components/
│   ├── Landing.jsx            # Ekran startowy
│   ├── CheckInForm.jsx        # Formularz 6 pytań
│   ├── AnalysisScreen.jsx     # Ekran przejściowy (2s)
│   ├── ResultScreen.jsx       # Ekran wyniku z mikroakcją
│   ├── ProgressBar.jsx        # Pasek postępu
│   └── ui/                    # Komponenty Shadcn (biblioteczne, nie edytować)
│       └── button.jsx
├── utils/
│   ├── analysisLogic.js       # Logika analizy — 5 typów dnia, mikroakcje
│   └── analysisLogic.test.js  # Testy jednostkowe (npm test)
├── components/
│   ├── SignUpScreen.jsx       # Rejestracja: nickname + e-mail + hasło
│   ├── SignInScreen.jsx       # Logowanie: e-mail + hasło
│   ├── AccountPromptScreen.jsx# Jednorazowa propozycja konta po 2. anon check-inie
│   └── SaveStatusScreens.jsx  # SavingScreen + SaveErrorScreen (zapis do Supabase)
├── hooks/
│   ├── useLocalStorage.js     # Anon: historia (limit 5) + licznik check-inów
│   ├── useAuth.js             # Supabase Auth: signUp/signIn/signOut + sesja
│   └── useConsent.js          # Stan zgody analytics (accepted/rejected/null)
└── lib/
    ├── utils.js               # cn() helper (Shadcn)
    ├── analytics.js           # GA4: initGA4() (po zgodzie) + trackEvent()
    ├── supabaseClient.js      # Klient Supabase (null-safe; klucz publishable)
    ├── checkinMapping.js      # Czyste mapowanie answers↔wiersz↔wpis historii
    ├── checkins.js            # Supabase: insertCheckIn / fetchMyCheckIns (zalogowany)
    └── accountPrompt.js       # Logika propozycji konta (próg 2, zapis decyzji)
```

---

## localStorage schema

```javascript
// Historia ostatnich 5 check-inów
"enpsyneia_history": [
  {
    "id": "uuid",
    "timestamp": "2026-04-14T10:00:00Z",
    "answers": {
      "energy": 3, "overload": 4, "movement": 2,
      "social": 3, "agency": 4, "paralysis": 5
    },
    "result": {
      "dayType": "overload",
      "microAction": "..."
    }
  }
]

// Streak
"enpsyneia_streak": {
  "currentStreak": 7,
  "lastCheckIn": "2026-04-14"
}

// Zgoda analytics
"enpsyneia_analytics_consent": "accepted" | "rejected"
```

Logika streak: wczoraj → streak +1 · dziś ponownie → bez zmiany · dawniej → reset do 1.

---

## Produkcja

- URL: `checkin.enpsyneia.org` (Vercel)
- GA4: zmienna środowiskowa `VITE_GA4_ID` ustawiona w Vercel Project Settings

---

## Supabase — schemat (zalogowany użytkownik)

Migracja: `supabase/migrations/0001_init_auth_and_checkins.sql`. Pełny opis: ADR 003.

```sql
profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null,
  created_at timestamptz not null default now()
)

check_ins (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  energy smallint, overload smallint, paralysis smallint,
  movement smallint, social smallint, agency smallint,   -- CHECK 1..5
  day_type text not null,
  microaction_title text not null,
  created_at timestamptz not null default now()
)
-- index: (user_id, created_at desc)
-- RLS: profiles SELECT own; check_ins SELECT/INSERT own; brak UPDATE/DELETE; brak anon
-- profil tworzy trigger handle_new_user (security definer) z metadanych rejestracji
```

## Zmienne środowiskowe

| Zmienna | Zakres |
|---------|--------|
| `VITE_GA4_ID` | GA4 (opcjonalne) |
| `VITE_SUPABASE_URL` | Supabase Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key (NIE sekret) |

Konfiguracja i testy ręczne: `docs/architecture/supabase-vercel-setup.md`.
Resend (e-mail transakcyjny) — poza zakresem; potwierdzenie e-maila obsługuje domyślny mailer Supabase.
