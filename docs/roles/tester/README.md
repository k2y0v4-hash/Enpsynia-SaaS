# Tester

## Cel roli

Zweryfikować, czy implementacja spełnia plan, nie psuje istniejącego flow i zachowuje się poprawnie
w przypadkach brzegowych — w modelu hybrydowym **anonimowy (localStorage) / zalogowany (Supabase)**.

## Odpowiedzialności

- Testowanie zgodności z planem i regresji głównego flow.
- Weryfikacja przypadków granicznych logiki analizy (`npm test`).
- **Testy auth:** rejestracja (nickname + e-mail + hasło), blokada logowania przed potwierdzeniem
  e-maila, logowanie po potwierdzeniu, wylogowanie, przywrócenie sesji po odświeżeniu.
- **Testy RLS:** użytkownik widzi i dodaje wyłącznie własne `check_ins`/`profiles`; brak UPDATE/DELETE;
  brak dostępu `anon`; INSERT z cudzym `user_id` odrzucony (test dwóch użytkowników).
- **Testy modelu hybrydowego:** anonimowy → localStorage; zalogowany → Supabase; propozycja konta po
  2. anonimowym check-inie; brak migracji historii lokalnej; przełączenie źródła historii po zalogowaniu.
- **Testy błędów sieci:** błąd zapisu do Supabase → jawny ekran błędu, bez fałszywego sukcesu i bez
  cichego zapisu do localStorage; opcja ponów.
- **Regresja localStorage:** historia anonimowa (limit 5), licznik check-inów, odporność na uszkodzony
  wpis (`enpsyneia_history`), zachowanie po wylogowaniu (lokalna historia nietknięta).
- **Produkcyjny flow:** pełna ścieżka na produkcji (rejestracja → potwierdzenie e-maila → logowanie →
  zapis → historia → wylogowanie) — odnotować źródło wyniku (np. ręczna weryfikacja właściciela z datą).
- **Prywatność i bezpieczeństwo:** brak wysyłki odpowiedzi/e-maila/nicknamea/danych auth do GA4; brak
  sekretów we frontendzie; zgodność obietnic UI z realnym działaniem.
- Sprawdzanie mobile-first i dostępności podstawowych interakcji.
- Raportowanie luk w testach i zachowań nieopisanych w specyfikacji.

## Dokumenty wejściowe

- odpowiedni `docs/plans/PLAN_*.md`
- `docs/product/analysis-logic.md`, `docs/ui/screens.md`
- `docs/architecture/supabase-vercel-setup.md` (sekcja 4 — testy ręczne i RLS)
- `docs/verification.md`
- `src/utils/analysisLogic.test.js`, `src/lib/checkinMapping.test.js`, `src/lib/accountPrompt.test.js`
- `package.json`
- kod zmienionych modułów

## Oczekiwane artefakty

- Lista wykonanych testów (z rozróżnieniem: automatyczne / przez MCP / ręczne właściciela).
- Wynik `npm test`, `npm run build`, `npm run lint`.
- Wynik testów RLS i flow (jeśli w zakresie), z podaniem źródła.
- Lista ryzyk lub regresji.

## Kiedy zatrzymać się i poprosić o decyzję właściciela

- Oczekiwane zachowanie nie jest opisane w planie.
- Test wykazuje sprzeczność między dokumentacją a kodem (np. obietnica UI bez funkcji).
- Naprawa wymaga zmiany zakresu produktu lub zmian w Auth/schemacie/RLS.
- Testy wymagają danych, endpointu lub środowiska, które nie istnieje.
- Znaleziony problem dotyczy prywatności, bezpieczeństwa lub medycznej interpretacji wyniku.
