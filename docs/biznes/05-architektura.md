# Architektura: Enpsyneia Check In

**Data:** 2026-03-22 (zaktualizowana wersja)
**Projekt:** Enpsyneia Check In

---

## Zmiana paradygmatu

| Aspekt | Wersja poprzednia | Wersja aktualna |
|--------|-------------------|-----------------|
| Model | localStorage | Supabase |
| Konta | Brak | Supabase Auth |
| Dane | Przeglądarka użytkownika | Cloud (Supabase) |
| Monetyzacja | Brak | Model pośredni |

---

## Architektura Systemu

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ENPSYNEIA ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐         ┌──────────────┐         ┌───────────┐ │
│  │   Frontend   │         │    Backend   │         │  External │ │
│  │   (React)    │◄───────►│  (Supabase)  │◄───────►│  Services │ │
│  └──────────────┘         └──────────────┘         └───────────┘ │
│         │                        │                        │        │
│         │                        │                        │        │
│    ┌────▼────┐            ┌─────▼─────┐           ┌────▼─────┐ │
│    │  Shadcn  │            │ PostgreSQL │           │ Resend   │ │
│    │   UI     │            │           │           │ (Email)  │ │
│    └──────────┘            └───────────┘           └──────────┘ │
│                                                                     │
│    ┌──────────┐            ┌───────────┐           ┌──────────┐ │
│    │ Tailwind │            │  Supabase  │           │ Google   │ │
│    │   CSS    │            │   Auth     │           │Analytics │ │
│    └──────────┘            └───────────┘           └──────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Stack Technologiczny

| Component | Wybór | Wersja | Uzasadnienie |
|-----------|-------|--------|--------------|
| **Frontend** | React + Vercel | Latest | Szybki development, darmowy hosting |
| **Styling** | Tailwind CSS + Shadcn UI | Latest | Nowoczesny UI, components |
| **Backend** | Supabase | Free Tier | Auth + Database + Functions |
| **Baza danych** | PostgreSQL (Supabase) | Latest | Relacyjne dane, RLS |
| **Auth** | Supabase Auth | Latest | Magic Link, Email |
| **Email** | Resend | Free Tier | Transakcyjne e-maile |
| **Hosting** | Vercel | Free Tier | CI/CD, edge |
| **Analytics** | Google Analytics 4 | Free | Podstawowe metryki |

---

## Struktura Bazy Danych

### Tabele

```sql
-- Users (zarządzane przez Supabase Auth)
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
  -- Odpowiedzi na pytania (1-5)
  energy_level INTEGER,
  sensory_overload INTEGER,
  movement_need INTEGER,
  social_need INTEGER,
  agency_level INTEGER,
  analysis_paralysis INTEGER,
  -- Wynik
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

---

## Supabase Features wykorzystane

| Feature | Zastosowanie | Status |
|---------|--------------|--------|
| **Auth** | Konta użytkowników (Magic Link) | ✅ Plan |
| **Database** | Przechowywanie check-inów | ✅ Plan |
| **Row Level Security** | Bezpieczeństwo danych | ✅ Plan |
| **Realtime** | Opcjonalne powiadomienia | ⏭️ v2 |
| **Edge Functions** | Logika rekomendacji | ⏭️ v2 |
| **Storage** | Avatary użytkowników | ⏭️ v2 |

---

## Auth Flow

### Magic Link (Rekomendowany)

```
1. Użytkownik wpisuje e-mail
2. System wysyła Magic Link (Supabase)
3. Użytkownik klika link
4. Automatycznie zalogowany
5. Sesja zapisana w localStorage
```

**Zalety:**
- Bez hasła (mniej friction)
- Bezpieczne
- Gotowe rozwiązanie Supabase
- Możliwość przyszłej synchronizacji

---

## API Endpoints (Supabase Client)

```javascript
// Auth
supabase.auth.signInWithOtp({ email })
supabase.auth.signOut()
supabase.auth.getSession()

// Profiles
supabase.from('profiles').select('*')
supabase.from('profiles').update({ streak_count: newCount })

// Check-ins
supabase.from('check_ins').insert(checkInData)
supabase.from('check_ins').select('*').eq('user_id', userId)

// Streaks
supabase.from('daily_streaks').select('*').eq('date', today)
```

---

## Bezpieczeństwo

### Row Level Security (RLS)

```sql
-- Tylko właściciel może czytać swoje dane
CREATE POLICY "Users can view own data"
ON check_ins FOR SELECT
USING (auth.uid() = user_id);

-- Tylko właściciel może dodawać
CREATE POLICY "Users can insert own data"
ON check_ins FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

---

## Deployment

### Vercel

| Setting | Wartość |
|---------|---------|
| Framework | Next.js lub React |
| Build Command | npm run build |
| Output Directory | dist |
| Environment | Production |

### Supabase

| Setting | Wartość |
|---------|---------|
| Plan | Free Tier |
| Region | Europe ( Frankfurt ) |
| Database | PostgreSQL |
| Auth | Magic Link enabled |

---

## Koszty

| Usługa | Plan | Koszt miesięczny |
|--------|------|------------------|
| Supabase | Free | $0 |
| Vercel | Free | $0 |
| Resend | Free | $0 |
| Google Analytics | Free | $0 |
| **SUMA** | | **$0** |

---

## Skalowalność

### Free Tier Limits (Supabase)

| Resource | Limit |
|----------|-------|
| MAU | 50,000 |
| Database | 500 MB |
| Storage | 1 GB |
| Bandwidth | 5 GB |

### Kiedy potrzebujesz upgrade?

| Trigger | Action |
|---------|--------|
| > 50,000 użytkowników | Upgrade do Pro ($25/mies) |
| > 500 MB danych | Upgrade storage |
| Problemy z performance | Dodaj caching |

---

## Backup i Recovery

### Supabase Automatic Backups

- Codziennie: automatyczne backup
- Retention: 7 dni
- Point-in-time recovery (Pro)

---

## Monitoring

| Narzędzie | Cel |
|-----------|-----|
| Supabase Dashboard | Database metrics |
| Vercel Analytics | Performance |
| Google Analytics 4 | User behavior |
| Sentry | Error tracking |

---

## Następne kroki

1. ✅ Utwórz konto Supabase
2. ⏳ Skonfiguruj Auth (Magic Link)
3. ⏳ Utwórz tabele i RLS
4. ⏳ Połącz z frontend (React)
5. ⏳ Deploy na Vercel

---

*Architektura wygenerowana 2026-03-22*
