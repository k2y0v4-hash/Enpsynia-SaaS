# User stories

Dokument porządkujący — opisuje istniejące, wdrożone zachowania (nie dodaje nowych funkcji).
Źródła: `docs/product/mvp-scope.md`, `docs/context/jtbd-analysis.md`, `docs/context/user-journey.md`,
ADR 003.

## Stan wdrożony

- Jako **anonimowy użytkownik** chcę wykonać check-in bez zakładania konta, żeby szybko dostać wynik.
- Jako **użytkownik** chcę otrzymać jedną konkretną mikroakcję dopasowaną do mojego stanu.
- Jako **użytkownik** chcę widzieć typ dnia i krótkie uzasadnienie wyniku.
- Jako **anonimowy użytkownik** chcę mieć lokalną historię ostatnich check-inów (limit 5) na tym urządzeniu.
- Jako **użytkownik** chcę po 2. check-inie dostać nieblokującą propozycję konta i móc ją odrzucić
  („Nie teraz"), bez ponownego pokazywania.
- Jako **użytkownik** chcę założyć konto (nickname + e-mail + hasło) i potwierdzić e-mail.
- Jako **zalogowany użytkownik** chcę zapisywać check-iny trwale i zachować historię na różnych urządzeniach.
- Jako **zalogowany użytkownik** chcę widzieć wyłącznie własne check-iny (RLS).
- Jako **użytkownik** chcę móc korzystać z aplikacji bez zgody na analytics (GA4 ładuje się dopiero po zgodzie).
- Jako **użytkownik** chcę móc się wylogować, a moja lokalna historia ma pozostać nietknięta.
- Jako **właściciel** chcę mieć audytowalną dokumentację (plany, rejestry, ADR, traceability).

## Świadome ograniczenia (nie są historiami do implementacji)

Brak resetu hasła, brak migracji historii lokalnej do konta, brak edycji/usuwania check-inów,
brak OAuth/Magic Link/telefonu. Szczegóły: `docs/business/business_constraints.md`.
