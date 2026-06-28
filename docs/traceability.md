# Traceability Matrix

| Feature | Plan | Code | Tests | Status |
|---|---|---|---|---|
| Landing Page | `docs/plans/PLAN_landing_page.md` | `src/components/Landing.jsx`, `src/App.jsx`, `src/hooks/useConsent.js`, `src/lib/analytics.js` | Manual full flow, `npm run build` | DONE |
| Check-in Form | `docs/plans/PLAN_check_in_form.md` | `src/components/CheckInForm.jsx`, `src/components/MissingAnswersScreen.jsx`, `src/App.jsx` | Manual form flow, mobile check, `npm run build` | DONE |
| Analysis Logic | `docs/plans/PLAN_analysis_logic.md` | `src/utils/analysisLogic.js` | `src/utils/analysisLogic.test.js`, `npm test` | DONE |
| Result Screen | `docs/plans/PLAN_result_screen.md` | `src/components/DayTypeScreen.jsx`, `src/components/MicroActionScreen.jsx`, `src/App.jsx`, `src/lib/analytics.js` | Manual result flow, feedback check, `npm run build` | DONE |
| Local Storage | `docs/plans/PLAN_local_storage.md` | `src/hooks/useLocalStorage.js`, `src/hooks/useConsent.js`, `src/components/HistoryScreen.jsx` | Manual localStorage/history check, `npm run build` | DONE |
| GA4 Consent | `docs/plans/PLAN_ga4_consent.md` | `src/hooks/useConsent.js`, `src/lib/analytics.js`, `src/components/Landing.jsx`, `src/App.jsx` | Manual Network tab before/after consent, `npm run build` | DONE |
| Vercel Deploy | `docs/plans/PLAN_vercel_deploy.md` | `vite.config.js`, `vercel.json`, `.github/workflows/ci.yml`, `.github/dependabot.yml`, `.env.example` | `npm test`, `npm run build`, CI checks | DONE |
| Figma UI Alignment | `docs/plans/PLAN_figma_ui_alignment.md` | `src/components/Landing.jsx`, `src/components/CheckInForm.jsx`, `src/components/MissingAnswersScreen.jsx`, `src/components/DayTypeScreen.jsx`, `src/components/MicroActionScreen.jsx`, `src/components/MenuScreen.jsx`, `src/components/HistoryScreen.jsx`, `src/components/AboutScreen.jsx`, `src/components/SuggestionsScreen.jsx`, `src/components/PrivacyScreen.jsx`, `src/components/TermsScreen.jsx` | Manual 390 px UI comparison, `npm test`, `npm run build` | DONE |
| Supabase Auth + trwałe check-iny (model hybrydowy) | `docs/plans/PLAN_supabase_auth_and_checkins.md`, ADR `docs/architecture/adr_003_supabase_accounts.md` | `src/lib/supabaseClient.js`, `src/hooks/useAuth.js`, `src/lib/checkins.js`, `src/lib/checkinMapping.js`, `src/lib/accountPrompt.js`, `src/components/SignUpScreen.jsx`, `src/components/SignInScreen.jsx`, `src/components/AccountPromptScreen.jsx`, `src/components/SaveStatusScreens.jsx`, `src/App.jsx`, `supabase/migrations/0001_init_auth_and_checkins.sql`, `vercel.json` | `npm test` (`checkinMapping.test.js`, `accountPrompt.test.js`), testy RLS dwóch użytkowników (Supabase MCP, 2026-06-28), `npm run build` | DONE — wdrożone na produkcję (PR #10, 2026-06-28) |

## Notes

- Plans marked as implemented are backfilled for existing code unless created before implementation in future work.
- If a feature changes, update the relevant plan, code reference, tests and status in this matrix.
