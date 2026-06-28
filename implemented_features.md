# Implemented Features

## Landing Page
- status: DONE
- plan: docs/plans/PLAN_landing_page.md
- opis: użytkownik widzi wartość aplikacji i może rozpocząć check-in

## Check-in Form
- status: DONE
- plan: docs/plans/PLAN_check_in_form.md
- opis: użytkownik odpowiada na 6 pytań na suwakach w dwóch blokach

## Analysis Logic
- status: DONE
- plan: docs/plans/PLAN_analysis_logic.md
- opis: aplikacja deterministycznie przypisuje typ dnia i mikroakcję

## Result Screen
- status: DONE
- plan: docs/plans/PLAN_result_screen.md
- opis: użytkownik widzi typ dnia, uzasadnienie, mikroakcję i feedback

## Local Storage
- status: DONE
- plan: docs/plans/PLAN_local_storage.md
- opis: aplikacja zapisuje historię ostatnich 5 check-inów lokalnie w przeglądarce

## GA4 Consent
- status: DONE
- plan: docs/plans/PLAN_ga4_consent.md
- opis: aplikacja ładuje GA4 dopiero po zgodzie użytkownika

## Vercel Deploy
- status: DONE
- plan: docs/plans/PLAN_vercel_deploy.md
- opis: aplikacja jest wdrożona na Vercel i dostępna produkcyjnie

## Figma UI Alignment
- status: DONE
- plan: docs/plans/PLAN_figma_ui_alignment.md
- opis: ekrany MVP są dopasowane wizualnie do aktualnego projektu Figma bez zmiany logiki aplikacji

## Supabase Auth + trwałe check-iny (model hybrydowy)
- status: DONE — wdrożone na produkcję (PR #10 zmergowany do `main` 2026-06-28; auto-deploy Vercel)
- plan: docs/plans/PLAN_supabase_auth_and_checkins.md
- adr: docs/architecture/adr_003_supabase_accounts.md
- opis: konto opcjonalne (e-mail + hasło + potwierdzenie e-maila); anon → localStorage, zalogowany → Supabase (PostgreSQL + RLS, SELECT/INSERT własnych check-inów); jednorazowa propozycja konta po 2. anonimowym check-inie; bez resetu hasła i bez migracji historii lokalnej
- wdrożenie: migracja zastosowana w projekcie Supabase `zxqqeouwydseelbtcwmd`; zmienne `VITE_SUPABASE_*` ustawione w Vercel (Preview + Production); CSP `connect-src` dopuszcza host Supabase
- testy: `npm test`/`lint`/`build` zielone; testy RLS dwóch użytkowników zweryfikowane przez Supabase MCP (2026-06-28); pełny flow produkcyjny (rejestracja → potwierdzenie e-maila → logowanie → zapis check-inu → trwała historia → wylogowanie) — zweryfikowane ręcznie przez właściciela 2026-06-28 na `https://checkin.enpsyneia.org`
- konfiguracja i status: docs/architecture/supabase-vercel-setup.md
