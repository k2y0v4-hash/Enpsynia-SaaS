# Tech Stack — Enpsyneia Check In

**Dotyczy:** Etap 1 (MVP)

---

## Stack

| Warstwa | Technologia | Uwagi |
|---------|-------------|-------|
| Framework | React 19 + Vite | Functional components, hooks |
| Stylowanie | Tailwind CSS v4 + Shadcn UI (Base UI) | Mobile-first |
| Stan | localStorage | Brak backendu w Etapie 1 |
| Hosting | Vercel | Auto-deploy z main |
| Analityka | Google Analytics 4 | Wymagana od Fazy 7 |

Brak backendu, brak kont użytkowników, koszt $0/mies.

---

## Struktura src/

```
src/
├── App.jsx                    # Routing: landing → form → result
├── components/
│   ├── Landing.jsx            # Ekran startowy
│   ├── CheckInForm.jsx        # Formularz 6 pytań
│   ├── ProgressBar.jsx        # Pasek postępu
│   └── ui/                    # Komponenty Shadcn (biblioteczne, nie edytować)
│       └── button.jsx
├── utils/
│   ├── analysisLogic.js       # Logika analizy — 5 typów dnia, mikroakcje
│   └── analysisLogic.test.js  # Testy jednostkowe
├── hooks/                     # useLocalStorage.js (Faza 6)
└── lib/
    └── utils.js               # Helpery Shadcn
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
```

Logika streak: wczoraj → streak +1 · dziś ponownie → bez zmiany · dawniej → reset do 1.

---

## Etap 2 (po walidacji)

Supabase (Auth + PostgreSQL) + Resend. Schemat bazy i plan migracji w `AGENTS.md`.
