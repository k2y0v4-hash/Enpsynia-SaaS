# Landing Page

Status: backfilled, implemented.

## 1. Cel

Użytkownik ma zrozumieć wartość aplikacji i rozpocząć check-in bez konta oraz bez dodatkowych kroków poza decyzją dotyczącą zgody analytics.

## 2. Zakres

### Wchodzi w zakres

- Ekran startowy z jasnym opisem wartości aplikacji.
- Jeden główny CTA rozpoczynający check-in.
- Informacja/stan zgody analytics przed rozpoczęciem flow, jeśli zgoda nie została jeszcze podjęta.
- Mobile-first layout.

### Nie wchodzi w zakres

- Logowanie użytkownika.
- Backend.
- Newsletter lub email capture.
- Dashboard.
- Dark mode.

## 3. Wymagania funkcjonalne

- Użytkownik widzi nazwę lub headline aplikacji.
- Użytkownik widzi krótki opis wartości check-inu.
- Użytkownik może rozpocząć check-in przyciskiem CTA.
- Jeśli zgoda analytics nie została podjęta, aplikacja wymaga decyzji przed uruchomieniem check-inu.
- Kliknięcie CTA uruchamia event `form_start`, jeśli GA4 jest aktywne.

## 4. Wymagania niefunkcjonalne

- Ekran ma być czytelny na mobile.
- Ekran ma mieć jeden główny kierunek działania.
- Brak konta i backendu w Etapie 1.
- GA4 nie może ładować się przed zgodą użytkownika.

## 5. Kontekst techniczny

- Implementacja: `src/components/Landing.jsx`.
- Routing: `src/App.jsx`.
- Zgoda analytics: `src/hooks/useConsent.js`.
- Tracking: `src/lib/analytics.js`.
- Źródła: `README.md`, `AGENTS.md`, `docs/product/implementation-plan.md`, `docs/product/mvp-scope.md`, `docs/ui/screens.md`.

## 6. Kroki implementacji

1. Utworzyć komponent landing page.
2. Dodać headline/value prop/CTA.
3. Podłączyć CTA do przejścia do formularza.
4. Podłączyć event `form_start`.
5. Uwzględnić stan zgody analytics.
6. Zweryfikować layout mobile.

## 7. Kryteria akceptacji

- Landing page renderuje się jako pierwszy ekran.
- CTA prowadzi do formularza check-in.
- Przed zgodą analytics GA4 nie jest ładowane.
- Użytkownik rozumie, że aplikacja służy do krótkiego check-inu.

## 8. Testy

- Ręcznie: otworzyć aplikację na szerokości mobile i desktop.
- Ręcznie: kliknąć CTA po zaakceptowaniu lub odrzuceniu zgody.
- Automatycznie: `npm test`.
- Build: `npm run build`.
