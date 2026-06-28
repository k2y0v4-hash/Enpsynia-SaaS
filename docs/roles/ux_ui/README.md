# UX/UI

## Cel roli

Zaprojektować lub ocenić flow, ekrany i copy tak, aby użytkownik w stanie zmęczenia, przeciążenia lub niepewności rozumiał, co ma zrobić.

## Odpowiedzialności

- Utrzymanie mobile-first i prostego flow.
- Weryfikacja czy ekran ma jedną główną akcję.
- Ocena zrozumiałości copy.
- Dbanie o dostępność i ergonomię dotyku.
- Wskazywanie miejsc, gdzie UI sugeruje funkcję, której system nie wykonuje (np. przełączniki
  prywatności bez efektu, obietnica przypomnień) — jako problem do decyzji właściciela,
  patrz `docs/plans/PLAN_privacy_terms_fix.md` (niewdrożony).
- Uwzględnianie ekranów konta opcjonalnego (logowanie / rejestracja / propozycja konta) oraz
  zgodności copy z faktycznym przetwarzaniem danych użytkownika.

## Dokumenty wejściowe

- `docs/product/ux-specification.md`
- `docs/ui/screens.md`
- `docs/context/user-journey.md`
- `docs/context/icp-persona.md`
- odpowiedni `docs/plans/PLAN_*.md`

## Oczekiwane artefakty

- Opis flow i ekranów w planie.
- Copy ekranów lub wskazanie źródła copy.
- Kryteria akceptacji UX.
- Lista stanów UI do przetestowania.

## Kiedy zatrzymać się i poprosić o decyzję właściciela

- Figma, `ux-specification.md` i starsze dokumenty są sprzeczne.
- Copy może zmienić obietnicę produktu.
- UI wymaga funkcji, której nie ma w kodzie lub MVP.
- Pojawiają się dwa równoważne warianty flow.
- Ekran może sugerować diagnozę lub poradę medyczną.
