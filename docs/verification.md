# Verification

## Automated checks

### Unit tests

Run:

```bash
npm test
```

Expected result:

- `src/utils/analysisLogic.test.js` runs.
- All documented analysis logic cases pass.

### Production build

Run:

```bash
npm run build
```

Expected result:

- Vite build completes successfully.
- `dist/` is generated locally.

## Manual full flow

1. Start the app locally with `npm run dev`.
2. Open the app in a browser.
3. Accept or reject analytics consent.
4. Start check-in from the landing page.
5. Complete both form blocks.
6. Confirm that the day type screen appears.
7. Continue to the micro-action screen.
8. Click one feedback option.
9. Start a new check-in.
10. Open the menu and verify History, About, Suggestions, Privacy and Terms screens are reachable.

## GA4 consent verification

### Before consent

1. Clear localStorage for the app origin.
2. Open DevTools Network tab.
3. Load the app.
4. Confirm that `https://www.googletagmanager.com/gtag/js` is not requested before consent.

### After rejection

1. Click reject on the consent card.
2. Confirm that GA4 script is still not requested.
3. Confirm the app remains usable.

### After acceptance

1. Set `VITE_GA4_ID` in the environment.
2. Click accept on the consent card.
3. Confirm that GA4 can be initialized.
4. Confirm that only minimal product events are sent.

## localStorage verification

1. Complete a check-in.
2. Inspect localStorage for `enpsyneia_history`.
3. Confirm that history contains at most 5 entries.
4. Confirm each entry contains answers, score, day type and micro-action title.
5. Inspect localStorage for `enpsyneia_analytics_consent` after accepting or rejecting analytics.
6. Corrupt `enpsyneia_history` manually and reload the app.
7. Confirm the app does not crash and treats history as empty.

## Privacy checks

- Do not send full check-in answers to GA4.
- Do not store auth tokens in localStorage.
- Do not add new external scripts without an ADR and owner decision.
