# Result Screen

Status: backfilled, implemented.

## 1. Cel

Użytkownik po check-inie widzi wynik, uzasadnienie i konkretną mikroakcję do wykonania od razu.

## 2. Zakres

### Wchodzi w zakres

- Prezentacja typu dnia.
- Uzasadnienie wyniku.
- Prezentacja mikroakcji.
- Feedback użytkownika po mikroakcji.
- Możliwość rozpoczęcia nowego check-inu.
- Streak: Do potwierdzenia w kodzie.

### Nie wchodzi w zakres

- Dashboard.
- Wykresy historii.
- Udostępnianie wyniku.
- Medyczna lub psychologiczna diagnoza.
- Trwały feedback w backendzie.

## 3. Wymagania funkcjonalne

- Ekran wyniku przyjmuje rezultat z `analyzeCheckIn`.
- Użytkownik widzi nazwę typu dnia.
- Użytkownik widzi uzasadnienie wyniku.
- Użytkownik widzi mikroakcję.
- Użytkownik może ocenić trafność mikroakcji.
- Event `result_shown` jest wysyłany po pokazaniu wyniku, jeśli GA4 jest aktywne.
- Event `feedback_helpful` jest wysyłany po feedbacku, jeśli GA4 jest aktywne.

## 4. Wymagania niefunkcjonalne

- Wynik ma być czytelny na mobile.
- Copy nie może sugerować diagnozy.
- Feedback nie wymaga konta.
- Nie wysyłać pełnych odpowiedzi check-inu do GA4.

## 5. Kontekst techniczny

- Aktualny kod: `src/components/DayTypeScreen.jsx`, `src/components/MicroActionScreen.jsx`.
- Routing: `src/App.jsx`.
- Analytics: `src/lib/analytics.js`.
- Źródła: `docs/product/implementation-plan.md`, `docs/product/analysis-logic.md`, `docs/ui/screens.md`, `README.md`.

## 6. Kroki implementacji

1. Odebrać wynik z logiki analizy.
2. Wyświetlić typ dnia i uzasadnienie.
3. Wyświetlić mikroakcję.
4. Dodać feedback użytkownika.
5. Dodać możliwość nowego check-inu.
6. Podłączyć eventy GA4 bez wysyłania pełnych odpowiedzi.

## 7. Kryteria akceptacji

- Użytkownik po formularzu widzi wynik.
- Użytkownik rozumie, co ma zrobić dalej.
- Feedback działa bez backendu.
- Ekran nie komunikuje diagnozy.

## 8. Testy

- Ręcznie: przejść landing -> formularz -> wynik -> mikroakcja.
- Ręcznie: kliknąć każdą opcję feedbacku.
- Ręcznie: sprawdzić czy nowy check-in resetuje flow.
- Automatycznie: `npm test`.
- Build: `npm run build`.
