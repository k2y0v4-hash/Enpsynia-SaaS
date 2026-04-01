# Workflow: Planowanie pracy dla Agenta AI Developera

## 📋 Opis workflowu

Ten workflow definiuje wzorzec planowania pracy dla Agenta AI Developera. Każdy plan dotyczy **jednej małej funkcjonalności**, którą można wdrożyć w jednej sesji agenta AI.

---

## 🎯 Zasady ogólne

### Zasada 1: Jedna funkcjonalność = jeden plan

- Plan musi dotyczyć **jednej małej funkcjonalności**
- Jeśli zadanie nie może być zaimplementowane w jednej sesji agenta AI, **odrzuć tworzenie planu**
- Podziel duże zadania na mniejsze, niezależne funkcjonalności

### Zasada 2: Struktura sekcji

- Każdy plan jest podzielony na **sekcje**
- Każda sekcja kończy się **ręcznym testowaniem**

### Zasada 3: Checklisty

- Każdy element planu jest **checkboxem** i jest **numerowany**
- Format: `- [ ] 1.1 Nazwa zadania`

### Zasada 4: Testowanie po każdej sekcji

- Po każdej sekcji dodaj **ręczne testowanie wdrożenia**
- Testowanie musi być konkretne i możliwe do wykonania

### Zasada 5: Weryfikacja końcowa

- Po wdrożeniu planu uruchom **testy**
- Uruchom **budowanie aplikacji**
- Sprawdź czy **wszystko działa**

### Zasada 6: Dokumentacja

- Zapisz plan w pliku `docs/zaimplementowane-plany.md`
- Dodaj datę i opis funkcjonalności

---

## 📝 Wzorzec planu

### Format pliku: `docs/zaimplementowane-plany.md`

```markdown
# Zaimplementowane plany

## [Data] - [Nazwa funkcjonalności]

**Status:** ✅ Zaimplementowane / 🔄 W trakcie / ❌ Odrzucone

**Opis:** Krótki opis funkcjonalności (1-2 zdania)

**Czas implementacji:** [szacowany czas w minutach]

**Powiązane dokumenty:**

- [Link do dokumentu biznesowego jeśli dotyczy]

---

### Plan implementacji

#### Sekcja 1: [Nazwa sekcji]

- [ ] 1.1 [Zadanie 1]
- [ ] 1.2 [Zadanie 2]
- [ ] 1.3 [Zadanie 3]

**🧪 Ręczne testowanie sekcji 1:**

- [ ] Otwórz aplikację w przeglądarce
- [ ] Sprawdź czy [element] jest widoczny
- [ ] Kliknij [przycisk] i sprawdź reakcję
- [ ] Sprawdź responsywność na mobile (375px)

---

#### Sekcja 2: [Nazwa sekcji]

- [ ] 2.1 [Zadanie 1]
- [ ] 2.2 [Zadanie 2]
- [ ] 2.3 [Zadanie 3]

**🧪 Ręczne testowanie sekcji 2:**

- [ ] [Krok testowy 1]
- [ ] [Krok testowy 2]
- [ ] [Krok testowy 3]

---

#### Sekcja 3: [Nazwa sekcji] (opcjonalna)

- [ ] 3.1 [Zadanie 1]
- [ ] 3.2 [Zadanie 2]

**🧪 Ręczne testowanie sekcji 3:**

- [ ] [Krok testowy 1]
- [ ] [Krok testowy 2]

---

### Weryfikacja końcowa

**Uruchom testy:**

- [ ] `npm test` - wszystkie testy przechodzą
- [ ] `npm run lint` - brak błędów lintowania
- [ ] `npm run build` - budowanie kończy się sukcesem

**Sprawdź aplikację:**

- [ ] Aplikacja uruchamia się bez błędów
- [ ] Wszystkie funkcjonalności działają zgodnie z planem
- [ ] Brak błędów w konsoli przeglądarki
- [ ] Responsywność działa poprawnie

**Dokumentacja:**

- [ ] Zaktualizowano `docs/zaimplementowane-funkcjonalnosci.md` (jeśli dotyczy)
- [ ] Dodano komentarze w kodzie (jeśli potrzebne)

---

### Podsumowanie

**Co zostało zaimplementowane:**

- [Krótki opis 1]
- [Krótki opis 2]
- [Krótki opis 3]

**Napotkane problemy:**

- [Problem 1 i rozwiązanie]
- [Problem 2 i rozwiązanie]

**Następne kroki:**

- [Co można zrobić dalej]
- [Ulepszenia do rozważenia]

---

**Zatwierdzone przez:** [Nazwa agenta/data]
**Czas implementacji:** [rzeczywisty czas]
```

---

## 🔄 Proces tworzenia planu

### Krok 1: Analiza zadania

1. Przeczytaj zadanie użytkownika
2. Oceń czy zadanie jest **wystarczająco małe** na jedną sesję
3. Jeśli nie - **odrzuć** i poproś o podział na mniejsze zadania

### Krok 2: Weryfikacja zakresu

1. Sprawdź dokumenty biznesowe (`docs/biznes/`)
2. Sprawdź MVP scope (`docs/biznes/04-mvp-scoping-v3.md`)
3. Upewnij się że funkcjonalność jest w **Tier 1** (Must-Have) lub **Tier 2** (Should-Have)

### Krok 3: Tworzenie planu

1. Utwórz sekcje planu
2. Dodaj zadania jako checkboxy z numeracją
3. Dodaj ręczne testowanie po każdej sekcji
4. Dodaj weryfikację końcową

### Krok 4: Zapisz plan

1. Odczytaj istniejący plik `docs/zaimplementowane-plany.md`
2. Dodaj nowy plan na końcu pliku
3. Zachowaj format zgodny z wzorcem

### Krok 5: Wdrożenie

1. Wykonuj zadania sekcja po sekcji
2. Po każdej sekcji wykonaj ręczne testowanie
3. Na końcu wykonaj weryfikację końcową

---

## ⚠️ Kryteria odrzucenia planu

Odrzuć tworzenie planu jeśli:

1. **Zadanie jest za duże** - nie można zaimplementować w jednej sesji
2. **Brak dokumentacji** - nie ma jasnych wymagań
3. **Poza zakresem MVP** - funkcjonalność nie jest w Tier 1 lub Tier 2
4. **Wymaga backendu** - a jesteśmy w Tier 1 (localStorage only)
5. **Złożoność wysoka** - wymaga wielu zmian w wielu plikach

---

## 📊 Przykłady małych funkcjonalności

### ✅ Dobre przykłady (jedna sesja):

- Dodanie nowego pola formularza
- Zmiana koloru przycisku
- Dodanie walidacji formularza
- Utworzenie nowego komponentu UI
- Dodanie nowej strony (landing, about)
- Implementacja localStorage dla jednej funkcji

### ❌ Złe przykłady (za duże):

- Implementacja całego systemu autentykacji
- Stworzenie całej bazy danych
- Przepisanie całej aplikacji
- Dodanie wielu nowych funkcjonalności naraz

---

## 🛠️ Narzędzia do testowania

### Testy automatyczne:

```bash
npm test              # Uruchom testy jednostkowe
npm run test:e2e      # Uruchom testy end-to-end
npm run lint          # Sprawdź linting
npm run build         # Zbuduj aplikację
```

### Testy ręczne:

- Otwórz aplikację w przeglądarce
- Sprawdź responsywność (DevTools → Toggle device toolbar)
- Sprawdź konsolę przeglądarki (F12 → Console)
- Sprawdź Network tab (F12 → Network)
- Testuj na różnych przeglądarkach (Chrome, Firefox, Safari)

---

## 📝 Szablon szybkiego planu

Jeśli potrzebujesz szybkiego planu, użyj tego skróconego formatu:

```markdown
## [Data] - [Nazwa funkcjonalności]

**Opis:** [Krótki opis]

### Zadania:

- [ ] 1.1 [Zadanie 1]
- [ ] 1.2 [Zadanie 2]
- [ ] 1.3 [Zadanie 3]

### Testowanie:

- [ ] [Test 1]
- [ ] [Test 2]
- [ ] [Test 3]

### Weryfikacja:

- [ ] `npm test`
- [ ] `npm run build`
- [ ] Sprawdź aplikację
```

---

## 🔗 Powiązane dokumenty

- [`AGENTS.md`](../../AGENTS.md) - Zasady dla Agenta AI
- [`docs/biznes/04-mvp-scoping-v3.md`](../biznes/04-mvp-scoping-v3.md) - MVP Scope
- [`docs/biznes/05-architektura.md`](../biznes/05-architektura.md) - Architektura
- [`docs/zaimplementowane-plany.md`](../zaimplementowane-plany.md) - Zaimplementowane plany

---

**Ostatnia aktualizacja:** 2026-03-31
**Wersja:** 1.0
