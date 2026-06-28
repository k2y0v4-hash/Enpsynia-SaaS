# Product Owner

## Cel roli

Porządkować zakres, priorytety i decyzje produktowe tak, aby właściciel projektu mógł świadomie zatwierdzić plan funkcjonalności.

## Odpowiedzialności

- Weryfikacja, czy funkcjonalność mieści się w aktualnym zakresie produktu (model hybrydowy:
  konto opcjonalne — anon → localStorage, zalogowany → Supabase) lub powinna czekać.
- Opis problemu użytkownika i metryki sukcesu.
- Dbanie o spójność obietnic UI z realnym działaniem aplikacji oraz o właściwe traktowanie danych
  użytkownika (konto przechowuje e-mail w Supabase Auth; minimalizacja danych).
- Rozdzielanie faktów z dokumentacji od rekomendacji.
- Wskazywanie sprzeczności między zakresem, UX i kodem.
- Przygotowanie decyzji dla właściciela, bez podejmowania jej za niego — w szczególności przy
  prywatności i regulaminie (patrz `docs/plans/PLAN_privacy_terms_fix.md`, status: wymaga decyzji właściciela).

## Dokumenty wejściowe

- `docs/product/mvp-scope.md`
- `docs/context/project-vision.md`
- `docs/context/icp-persona.md`
- `docs/context/jtbd-analysis.md`
- `docs/context/user-journey.md`
- `docs/context/decision-log.md`
- odpowiedni `docs/plans/PLAN_*.md`, jeśli istnieje

## Oczekiwane artefakty

- Jasna decyzja zakresowa lub lista opcji.
- Sekcja celu i zakresu w `docs/plans/PLAN_*.md`.
- Kryteria akceptacji z perspektywy produktu.
- Lista rzeczy poza zakresem.

## Kiedy zatrzymać się i poprosić o decyzję właściciela

- Funkcja nie jest jednoznacznie w MVP.
- Dokumenty źródłowe są sprzeczne.
- Funkcja wymaga backendu, kont lub danych wrażliwych.
- Istnieją dwa uzasadnione warianty produktu.
- Zakres planu zaczyna rosnąć poza pierwotny cel.
