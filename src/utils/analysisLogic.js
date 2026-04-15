// Logika analizy — Enpsyneia Check In
// Specyfikacja: docs/product/analysis-logic.md
// Algorytm: sekcja 3 — kolejność KROK 1-5 jest nadrzędna wobec opisów profilów

// ─── Typy dnia ───────────────────────────────────────────────────────────────

export const DAY_TYPES = {
  DZIALANIA:   'Działania',
  WYCISZENIA:  'Wyciszenia',
  ODBUDOWY:    'Odbudowy',
  KONTAKTU:    'Kontaktu',
  PRZECIAZENIA:'Przeciążenia',
}

// ─── Mikroakcje (05-logika-analizy.md sekcja 5) ───────────────────────────────

const MICROACTIONS = {
  [DAY_TYPES.DZIALANIA]: {
    A: 'Idź na 15 minut szybkiego spaceru — bez słuchawek, bez telefonu w ręce. Wróć i zacznij jedno konkretne zadanie. Ruch wyostrzy koncentrację.',
    B: 'Wybierz jedno zadanie, które odkładasz od co najmniej 2 dni. Ustaw timer na 25 minut. Zacznij — nieważne jak małym krokiem. Nie kończ najpierw czegoś innego.',
  },
  [DAY_TYPES.WYCISZENIA]: {
    A: 'Odłóż telefon w inne pomieszczenie niż to, w którym jesteś. Usiądź przez 5 minut bez niczego. Nie rób nic — dosłownie. Obserwuj co się pojawia w głowie.',
    B: 'Wyjdź na 10 minut bez słuchawek i bez konkretnego celu. Skręć w pierwszą lepszą ulicę, idź, wróć. Zewnętrzne bodźce są zwykle cichsze niż wewnętrzne.',
  },
  [DAY_TYPES.ODBUDOWY]: {
    A: 'Połóż się na 10 minut z zamkniętymi oczami — nie żeby zasnąć, tylko żeby odpocząć ciałem. Ustaw budzik. Nic więcej nie rób.',
    B: 'Nalej szklankę wody i wypij ją powoli. Potem zrób 5 spokojnych skłonów lub stretchów — cokolwiek co rozluźni napięcie w karku i ramionach.',
  },
  [DAY_TYPES.KONTAKTU]: {
    A: 'Zadzwoń do jednej bliskiej osoby — na 5–10 minut, bez konkretnego powodu. Żeby po prostu usłyszeć jej głos i powiedzieć co słychać.',
    B: 'Napisz krótką wiadomość do jednej osoby, o której myślałeś ostatnio. Nie musi być długa — jedno zdanie i wyślij. Nie czekaj na idealny moment.',
  },
  [DAY_TYPES.PRZECIAZENIA]: {
    A: 'Zamknij oczy i policz 5 oddechów — wdech na 4 sekundy, wydech na 6. Nic więcej. Wróć do ciała zanim wrócisz do myśli.',
    B: 'Wstań, wyjdź z pokoju i zrób jedną prostą czynność fizyczną — umyj kubek, przewietrz pokój, wejdź po schodach. Przerwij spiralę ciałem, nie kolejną myślą.',
  },
}

// ─── Teksty UI (05-logika-analizy.md sekcje 6 i 7) ───────────────────────────

const SUMMARY_TEXTS = {
  [DAY_TYPES.DZIALANIA]:    'Masz dziś wyraźnie więcej energii i sprawczości niż zwykle.',
  [DAY_TYPES.WYCISZENIA]:   'Czujesz się teraz przebodźcowany — zbyt dużo bodźców, za mało ciszy.',
  [DAY_TYPES.ODBUDOWY]:     'Energia i sprawczość są dziś niskie — ciało i umysł potrzebują teraz zasilenia.',
  [DAY_TYPES.KONTAKTU]:     'Wyraźnie potrzebujesz dziś kontaktu z innymi — i masz na to zasoby.',
  [DAY_TYPES.PRZECIAZENIA]: 'Jesteś jednocześnie przebodźcowany i utknąłeś w analizie.',
  SPECIAL_FALLBACK:         'Nie widać dziś wyraźnych przeciążeń ani szczególnie wysokich zasobów — dzień bez wyraźnego charakteru.',
}

const JUSTIFICATION_TEXTS = {
  [DAY_TYPES.DZIALANIA]:    'Twoja energia i poczucie sprawczości są dziś wyraźnie wysokie — to dobry moment, żeby zrobić coś, co od jakiegoś czasu odkładasz.',
  [DAY_TYPES.WYCISZENIA]:   'Twój poziom przeciążenia bodźcami jest wysoki — ciało i umysł potrzebują teraz spokoju, nie kolejnych zadań ani decyzji.',
  [DAY_TYPES.ODBUDOWY]:     'Twoje zasoby energii i sprawczości są dziś niskie — to sygnał do delikatnego odbudowania, a nie forsowania przez kolejne godziny.',
  [DAY_TYPES.KONTAKTU]:     'Twoja potrzeba bycia z ludźmi jest dziś wyraźna — warto ją zaspokoić, zamiast zostawać sam na sam z myślami.',
  [DAY_TYPES.PRZECIAZENIA]: 'Masz teraz dużo bodźców i jednocześnie utykasz w analizie — priorytet to przerwanie spirali, zanim dołożysz sobie kolejne decyzje.',
  SPECIAL_FALLBACK:         'Twój stan jest dziś wyrównany — nie ma wyraźnych sygnałów w żadną stronę. Delikatna odbudowa to bezpieczny krok.',
}

// ─── Wybór mikroakcji (05-logika-analizy.md sekcja 4) ────────────────────────

function selectMicroactionKey(dayType, { energy, movement, social, agency }) {
  switch (dayType) {
    case DAY_TYPES.DZIALANIA:    return movement >= 4 ? 'A' : 'B'
    case DAY_TYPES.WYCISZENIA:   return social   <= 2 ? 'A' : 'B'
    case DAY_TYPES.ODBUDOWY:     return (energy <= 2 && movement <= 3) ? 'A' : 'B'
    case DAY_TYPES.KONTAKTU:     return energy   >= 4 ? 'A' : 'B'
    case DAY_TYPES.PRZECIAZENIA: return agency   <= 2 ? 'A' : 'B'
  }
}

// ─── Główna funkcja API ───────────────────────────────────────────────────────

/**
 * analyzeCheckIn — drzewo priorytetów per 05-logika-analizy.md sekcja 3
 *
 * @param {{ energy, overload, movement, social, agency, paralysis }} answers
 *   Każda wartość: integer 1–5
 * @returns {{ dayType, summaryText, justificationText, microaction, microactionKey }}
 */
export function analyzeCheckIn({ energy, overload, movement, social, agency, paralysis }) {
  let dayType

  // KROK 1 — Dzień Przeciążenia (najostrzejszy stan — pierwszeństwo bezwzględne)
  if (overload >= 4 && paralysis >= 4) {
    dayType = DAY_TYPES.PRZECIAZENIA
  }
  // KROK 2 — Dzień Wyciszenia (wysokie overload dominuje nad wszystkim poza KROK 1)
  else if (overload >= 4) {
    dayType = DAY_TYPES.WYCISZENIA
  }
  // KROK 3 — Dzień Kontaktu (potrzeba kontaktu przy braku blokad)
  else if (social >= 4 && overload <= 3) {
    dayType = DAY_TYPES.KONTAKTU
  }
  // KROK 4 — Dzień Działania (okno do działania — rzadkie i warte wykorzystania)
  else if (energy >= 4 && agency >= 3 && overload <= 3) {
    dayType = DAY_TYPES.DZIALANIA
  }
  // KROK 5 — Fallback: Dzień Odbudowy
  else {
    dayType = DAY_TYPES.ODBUDOWY
  }

  const microactionKey = selectMicroactionKey(dayType, { energy, movement, social, agency })

  // Special fallback text — wyłącznie gdy dokładnie wszystkie 6 wartości = 3
  // (05-logika-analizy.md sekcja 9, decyzja #4)
  const isAllThree =
    energy === 3 && overload === 3 && movement === 3 &&
    social === 3 && agency === 3 && paralysis === 3

  const summaryText = isAllThree
    ? SUMMARY_TEXTS.SPECIAL_FALLBACK
    : SUMMARY_TEXTS[dayType]

  const justificationText = isAllThree
    ? JUSTIFICATION_TEXTS.SPECIAL_FALLBACK
    : JUSTIFICATION_TEXTS[dayType]

  return {
    dayType,
    summaryText,
    justificationText,
    microaction: MICROACTIONS[dayType][microactionKey],
    microactionKey,
  }
}
