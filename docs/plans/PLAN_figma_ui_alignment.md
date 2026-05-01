# Figma UI Alignment

Status: implemented.

## 1. Cel

Doprowadzić istniejące ekrany aplikacji do zgodności z aktualnym projektem Figma `Enpsyneia Check-In UX/UI Prototype`, bez zmiany logiki biznesowej, analizy, modelu danych ani integracji.

Źródło projektu:

- Figma file: `0jNDkYBrgz7qhu0hnCH48n`
- Page: `Enpsyneia Check-In mobile first`
- Link: `https://www.figma.com/design/0jNDkYBrgz7qhu0hnCH48n/Enpsyneia-Check-In-UX-UI-Prototype?node-id=0-1`

## 2. Zakres

### Wchodzi w zakres

- Porównanie istniejącego kodu UI z frame'ami Figma:
  - `01 Start natychmiastowy check-in` (`2:2`)
  - `02 Check-in blok 1 z 2` (`2:21`)
  - `03 Check-in blok 2 z 2` (`2:57`)
  - `04 Brak odpowiedzi — ekran warunkowy` (`2:94`)
  - `05 Wynik — typ dnia` (`2:119`)
  - `06 Mikro-akcja — szczegóły` (`2:144`)
  - `08 Historia` (`2:158`)
  - `08b Historia — stan pusty` (`170:35`)
  - `09 O projekcie` (`2:204`)
  - `10 Sugestie dla autora` (`2:222`)
  - `11 Prywatność` (`2:183`)
  - `12 Menu rozwinięte` (`105:2`)
  - `14 Regulamin i polityka prywatności` (`110:2`)
- Dopasowanie layoutu, spacingu, typografii, kolorów, promieni zaokrągleń i podstawowego copy do Figmy.
- Utrzymanie obecnego flow aplikacji: landing → check-in → brak odpowiedzi lub wynik → mikroakcja.
- Utrzymanie istniejących ekranów menu, historii, prywatności, sugestii, about i regulaminu.
- Utrzymanie aktualnego modelu zgody analytics z landing page.
- Zachowanie obecnej struktury komponentów, jeśli wystarczy do osiągnięcia zgodności z Figmą.

### Nie wchodzi w zakres

- Zmiana algorytmu `analyzeCheckIn`.
- Zmiana interpretacji skali suwaków lub odwracanie wartości odpowiedzi.
- Dodanie kont użytkowników, logowania, rejestracji albo Supabase.
- Implementacja ekranów Stage 2: `07 Logowanie` i `13 Zakładanie konta`.
- Dodanie backendu lub endpointu dla sugestii.
- Dodanie nowych zależności.
- Zmiana konfiguracji deployu.
- Zmiana eventów GA4 poza istniejącymi eventami MVP.
- Przebudowa architektury aplikacji.

## 3. Wymagania funkcjonalne

- Aplikacja nadal uruchamia się od landing page.
- Użytkownik nadal może zaakceptować albo odrzucić analytics przed rozpoczęciem check-inu.
- Użytkownik nadal może przejść przez dwa bloki check-inu.
- Jeśli mniej niż 3 suwaki mają `touched = true`, aplikacja pokazuje ekran brakujących odpowiedzi.
- Użytkownik nadal może zobaczyć typ dnia i mikroakcję.
- Użytkownik nadal może wysłać feedback mikroakcji w obecnym modelu bez backendu.
- Historia nadal pokazuje maksymalnie ostatnie 5 check-inów z localStorage.
- Menu nadal prowadzi do istniejących ekranów MVP.
- Ekrany Stage 2 widoczne w Figmie nie są implementowane jako aktywne flow.

## 4. Wymagania niefunkcjonalne

- UI ma być zgodne z projektem mobile-first 390 x 844 px.
- Tekst nie może wychodzić poza kontenery na mobile.
- Elementy dotykowe muszą pozostać wygodne na mobile.
- Zmiany nie mogą pogorszyć dostępności podstawowych kontrolek.
- Nie wolno wysyłać pełnych odpowiedzi check-inu do GA4.
- localStorage nie może być użyty do sekretów ani danych auth.
- Build produkcyjny musi przechodzić.

## 5. Kontekst techniczny

- Routing i stan flow: `src/App.jsx`.
- Wspólne elementy UI: `src/components/ScreenShell.jsx`.
- Ekrany:
  - `src/components/Landing.jsx`
  - `src/components/CheckInForm.jsx`
  - `src/components/MissingAnswersScreen.jsx`
  - `src/components/DayTypeScreen.jsx`
  - `src/components/MicroActionScreen.jsx`
  - `src/components/MenuScreen.jsx`
  - `src/components/HistoryScreen.jsx`
  - `src/components/AboutScreen.jsx`
  - `src/components/SuggestionsScreen.jsx`
  - `src/components/PrivacyScreen.jsx`
  - `src/components/TermsScreen.jsx`
- Style globalne: `src/index.css`.
- Logika, której ten plan nie zmienia:
  - `src/utils/analysisLogic.js`
  - `src/hooks/useLocalStorage.js`
  - `src/hooks/useConsent.js`
  - `src/lib/analytics.js`

## 6. Kroki implementacji

1. Pobrać kontekst docelowych frame'ów z Figmy i zapisać istotne różnice względem kodu.
2. Przejrzeć aktualne komponenty UI i wskazać, które ekrany wymagają zmian.
3. Ujednolicić wspólne tokeny UI w istniejących komponentach lub `src/index.css`.
4. Dopasować landing page do frame'u `01`.
5. Dopasować formularz check-in do frame'ów `02` i `03`.
6. Dopasować ekran brakujących odpowiedzi do frame'u `04`.
7. Dopasować wynik i mikroakcję do frame'ów `05` i `06`.
8. Dopasować historię, stan pusty historii, menu, about, sugestie, prywatność i regulamin do właściwych frame'ów.
9. Sprawdzić, że logika i model danych nie zmieniły się poza UI.
10. Uruchomić testy i build.
11. Zaktualizować rejestry SDD po implementacji.

## 7. Kryteria akceptacji

- Wszystkie ekrany MVP mają zgodne z Figmą główne copy, hierarchię, kolory i układ.
- Aplikacja zachowuje obecne działanie funkcjonalne.
- Nie ma zmian w `package.json`.
- Nie ma nowych zależności.
- Nie ma zmian w konfiguracji deployu.
- `npm test` przechodzi.
- `npm run build` przechodzi.
- Manualny full flow przechodzi na szerokości 390 px.
- GA4 nadal ładuje się dopiero po zgodzie.
- Historia nadal zapisuje i czyta dane z localStorage.

## 8. Testy

- `npm test` — regresja logiki analizy.
- `npm run build` — poprawność buildu produkcyjnego.
- Manualnie: landing → zgoda cookies → check-in blok 1 → blok 2 → wynik → mikroakcja → feedback → nowy check-in.
- Manualnie: flow z mniej niż 3 ruszonymi suwakami pokazuje ekran brakujących odpowiedzi.
- Manualnie: menu prowadzi do historii, about, sugestii, prywatności i regulaminu.
- Manualnie: Network tab potwierdza brak GA4 przed zgodą i po odrzuceniu.
- Manualnie: localStorage zawiera `enpsyneia_history` po check-inie i `enpsyneia_analytics_consent` po decyzji cookies.
