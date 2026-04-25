// Logika analizy — Enpsyneia Check In
// Specyfikacja: docs/product/analysis-logic.md
// Algorytm: sekcja 3 — kolejność KROK 1-5 jest nadrzędna wobec opisów profilów

export const DAY_TYPES = {
  DZIALANIA:   'Działania',
  WYCISZENIA:  'Wyciszenia',
  ODBUDOWY:    'Odbudowy',
  KONTAKTU:    'Kontaktu',
  PRZECIAZENIA:'Przeciążenia',
}

// Mikroakcje: title + steps (docs/product/ux-specification.md sekcja 5.6)
// Odbudowy A — treść z Figmy (zatwierdzona); pozostałe — DRAFT z analysis-logic.md
const MICROACTIONS = {
  [DAY_TYPES.DZIALANIA]: {
    A: {
      title: '15 minut spaceru na start',
      steps: [
        'Idź na 15 minut szybkiego spaceru — bez słuchawek, bez telefonu w ręce.',
        'Wróć i zacznij jedno konkretne zadanie.',
        'Ruch wyostrzy koncentrację.',
      ],
    },
    B: {
      title: 'Timer 25 minut — jedno zadanie',
      steps: [
        'Wybierz jedno zadanie, które odkładasz od co najmniej 2 dni.',
        'Ustaw timer na 25 minut i zacznij — nieważne jak małym krokiem.',
        'Nie kończ najpierw czegoś innego.',
      ],
    },
  },
  [DAY_TYPES.WYCISZENIA]: {
    A: {
      title: '5 minut bez niczego',
      steps: [
        'Odłóż telefon w inne pomieszczenie niż to, w którym jesteś.',
        'Usiądź przez 5 minut bez niczego — nie rób nic, dosłownie.',
        'Obserwuj co się pojawia w głowie.',
      ],
    },
    B: {
      title: '10 minut spaceru bez celu',
      steps: [
        'Wyjdź na 10 minut bez słuchawek i bez konkretnego celu.',
        'Skręć w pierwszą lepszą ulicę, idź, wróć.',
        'Zewnętrzne bodźce są zwykle cichsze niż wewnętrzne.',
      ],
    },
  },
  [DAY_TYPES.ODBUDOWY]: {
    A: {
      // Treść zatwierdzona przez Figmę (screen 06 — Odbudowy A)
      title: '3 minuty resetu ciała',
      steps: [
        'Oprzyj stopy o podłogę.',
        'Rozluźnij szczękę i barki.',
        'Oddychaj wolniej przez minutę.',
      ],
    },
    B: {
      title: 'Szklanka wody i stretching',
      steps: [
        'Nalej szklankę wody i wypij ją powoli.',
        'Zrób 5 spokojnych skłonów lub stretchów.',
        'Rozluźnij napięcie w karku i ramionach.',
      ],
    },
  },
  [DAY_TYPES.KONTAKTU]: {
    A: {
      title: 'Zadzwoń do kogoś bliskiego',
      steps: [
        'Zadzwoń do jednej bliskiej osoby — na 5–10 minut, bez konkretnego powodu.',
        'Żeby po prostu usłyszeć jej głos.',
        'I powiedzieć co słychać.',
      ],
    },
    B: {
      title: 'Jedna wiadomość bez okazji',
      steps: [
        'Napisz krótką wiadomość do jednej osoby, o której myślałeś ostatnio.',
        'Nie musi być długa — jedno zdanie wystarczy.',
        'Wyślij. Nie czekaj na idealny moment.',
      ],
    },
  },
  [DAY_TYPES.PRZECIAZENIA]: {
    A: {
      title: '5 oddechów — reset',
      steps: [
        'Zamknij oczy i policz 5 oddechów — wdech na 4 sekundy, wydech na 6.',
        'Nic więcej.',
        'Wróć do ciała zanim wrócisz do myśli.',
      ],
    },
    B: {
      title: 'Wstań i zrób coś fizycznego',
      steps: [
        'Wstań, wyjdź z pokoju i zrób jedną prostą czynność fizyczną.',
        'Umyj kubek, przewietrz pokój, wejdź po schodach.',
        'Przerwij spiralę ciałem, nie kolejną myślą.',
      ],
    },
  },
}

const JUSTIFICATION_TEXTS = {
  [DAY_TYPES.DZIALANIA]:    'Twoja energia i poczucie sprawczości są dziś wyraźnie wysokie — to dobry moment, żeby zrobić coś, co od jakiegoś czasu odkładasz.',
  [DAY_TYPES.WYCISZENIA]:   'Twój poziom przeciążenia bodźcami jest wysoki — ciało i umysł potrzebują teraz spokoju, nie kolejnych zadań ani decyzji.',
  [DAY_TYPES.ODBUDOWY]:     'Twoje zasoby energii i sprawczości są dziś niskie — to sygnał do delikatnego odbudowania, a nie forsowania przez kolejne godziny.',
  [DAY_TYPES.KONTAKTU]:     'Twoja potrzeba bycia z ludźmi jest dziś wyraźna — warto ją zaspokoić, zamiast zostawać sam na sam z myślami.',
  [DAY_TYPES.PRZECIAZENIA]: 'Masz teraz dużo bodźców i jednocześnie utykasz w analizie — priorytet to przerwanie spirali, zanim dołożysz sobie kolejne decyzje.',
  SPECIAL_FALLBACK:         'Twój stan jest dziś wyrównany — nie ma wyraźnych sygnałów w żadną stronę. Delikatna odbudowa to bezpieczny krok.',
}

function selectMicroactionKey(dayType, { energy, movement, social, agency }) {
  switch (dayType) {
    case DAY_TYPES.DZIALANIA:    return movement >= 4 ? 'A' : 'B'
    case DAY_TYPES.WYCISZENIA:   return social   <= 2 ? 'A' : 'B'
    case DAY_TYPES.ODBUDOWY:     return (energy <= 2 && movement <= 3) ? 'A' : 'B'
    case DAY_TYPES.KONTAKTU:     return energy   >= 4 ? 'A' : 'B'
    case DAY_TYPES.PRZECIAZENIA: return agency   <= 2 ? 'A' : 'B'
  }
}

/**
 * analyzeCheckIn — drzewo priorytetów per docs/product/analysis-logic.md sekcja 3
 *
 * @param {{ energy, overload, movement, social, agency, paralysis }} answers
 * @returns {{ dayType, justificationText, microaction: { title, steps }, microactionKey }}
 */
export function analyzeCheckIn({ energy, overload, movement, social, agency, paralysis }) {
  let dayType

  if (overload >= 4 && paralysis >= 4) {
    dayType = DAY_TYPES.PRZECIAZENIA
  } else if (overload >= 4) {
    dayType = DAY_TYPES.WYCISZENIA
  } else if (social >= 4 && overload <= 3) {
    dayType = DAY_TYPES.KONTAKTU
  } else if (energy >= 4 && agency >= 3 && overload <= 3) {
    dayType = DAY_TYPES.DZIALANIA
  } else {
    dayType = DAY_TYPES.ODBUDOWY
  }

  const microactionKey = selectMicroactionKey(dayType, { energy, movement, social, agency })

  const isAllThree =
    energy === 3 && overload === 3 && movement === 3 &&
    social === 3 && agency === 3 && paralysis === 3

  const justificationText = isAllThree
    ? JUSTIFICATION_TEXTS.SPECIAL_FALLBACK
    : JUSTIFICATION_TEXTS[dayType]

  return {
    dayType,
    justificationText,
    microaction: MICROACTIONS[dayType][microactionKey],
    microactionKey,
  }
}
