# Vercel Deploy

Status: backfilled, implemented.

## 1. Cel

Aplikacja jest budowana jako statyczna aplikacja Vite i wdrażana na Vercel.

## 2. Zakres

### Wchodzi w zakres

- Build Vite do katalogu `dist`.
- Hosting na Vercel.
- Konfiguracja nagłówków bezpieczeństwa.
- Zmienna środowiskowa `VITE_GA4_ID` w Vercel, jeśli GA4 ma działać.
- CI dla testów i buildu.

### Nie wchodzi w zakres

- Backend.
- Supabase.
- Server-side rendering.
- Zmiana konfiguracji deployu w ramach tego planu.

## 3. Wymagania funkcjonalne

- `npm run build` tworzy produkcyjny build.
- Aplikacja działa jako SPA hostowana statycznie.
- Produkcyjny adres jest opisany w README.
- GA4 działa tylko, jeśli ustawiono `VITE_GA4_ID` i użytkownik zaakceptował analytics.

## 4. Wymagania niefunkcjonalne

- Build musi kończyć się bez błędów.
- Konfiguracja nie może wymagać sekretów w repo.
- Nagłówki bezpieczeństwa powinny ograniczać zewnętrzne skrypty do GA4.
- Wdrożenie nie może wymagać backendu.

## 5. Kontekst techniczny

- Vite config: `vite.config.js`.
- Vercel headers: `vercel.json`.
- Scripts: `package.json`.
- CI: `.github/workflows/ci.yml`.
- Dependabot: `.github/dependabot.yml`.
- Źródła: `README.md`, `docs/architecture/tech-stack.md`, `docs/product/implementation-plan.md`.

## 6. Kroki implementacji

1. Skonfigurować projekt Vite.
2. Dodać build script.
3. Skonfigurować Vercel.
4. Dodać zmienne środowiskowe produkcji.
5. Dodać nagłówki bezpieczeństwa.
6. Uruchomić testy i build.

## 7. Kryteria akceptacji

- `npm run build` przechodzi lokalnie.
- Vercel potrafi zbudować aplikację.
- Produkcyjna aplikacja nie wymaga backendu.
- Sekrety nie są zapisane w repo.

## 8. Testy

- Lokalnie: `npm test`.
- Lokalnie: `npm run build`.
- CI: `npm audit --audit-level=high`, `npm test`, `npm run build`.
- Ręcznie: sprawdzić produkcyjny URL po deployu.
